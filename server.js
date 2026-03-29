import express from 'express'
import dotenv from 'dotenv'
import OpenAI from "openai";

//loads content of .env to process.env
dotenv.config();

const openai = new OpenAI ({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 3000;
const api_key = process.env.API_KEY;
const weatherGovUserAgent =
  process.env.WEATHER_GOV_USER_AGENT ||
  "weather-project/1.0 (contact: example@example.com)";

if (!api_key) {
    console.error(`Missing API key`);
    process.exit(1);
}

app.use(express.static("."));

app.get(`/api/weather`, async (req, res) =>{
    try{
        const zip = req.query.zip;
        if(!zip) {
            return res.status(400).json({ message: "Error Please enter a zip code!" });
        }

        //Geolocator API- gets our longitude and latitude
        const locationURL = new URL(`https://api.openweathermap.org/geo/1.0/zip`);
        locationURL.searchParams.set("zip", `${zip},US`);
        locationURL.searchParams.set("appid", api_key);
        const locationResponse = await fetch(locationURL);
        const locationData = await locationResponse.json();

        if (!locationResponse.ok) {
          return res.status(locationResponse.status).json({
            message:
              locationData.message || "Error, could not pull location data.",
          });
        }

        //gets out longitude and latitude
        const longData = locationData.lon;
        const latData = locationData.lat;


        //Zip code to state for the weather alert API
        const stateCodeURL = new URL(`https://api.zippopotam.us/us/${zip}`);
        const stateCodeResponse = await fetch(stateCodeURL);
        const stateCodeResult = await stateCodeResponse.json();

        if (!stateCodeResponse.ok) {
          return res.status(stateCodeResponse.status).json({
            message: "Error, could not pull state code data.",
          });
        }


        const stateCode = stateCodeResult.places[0]["state abbreviation"];


        //current weather data API
        const weatherCurrentURL = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latData}&lon=${longData}`);
        weatherCurrentURL.searchParams.set("units", "imperial");
        weatherCurrentURL.searchParams.set("appid", api_key);
        const weatherCurrentResponse = await fetch(weatherCurrentURL);
        const weatherCurrentData = await weatherCurrentResponse.json();

        if (!weatherCurrentResponse.ok) {
          return res.status(weatherCurrentResponse.status).json({
            message:
              weatherCurrentData.message ||
              "Error, could not pull current weather data.",
          });
        }


        //Forcast API
        const weatherForcastURL = new URL(`https://api.openweathermap.org/data/2.5/forecast?lat=${latData}&lon=${longData}`);
        weatherForcastURL.searchParams.set("units", "imperial");
        weatherForcastURL.searchParams.set("appid", api_key);
        const weatherForcastResponse = await fetch(weatherForcastURL);
        const weatherForcastData = await weatherForcastResponse.json();

        if (!weatherForcastResponse.ok) {
          return res.status(weatherForcastResponse.status).json({
            message:
              weatherForcastData.message ||
              "Error, could not pull forecast data.",
          });
        }


        //weather alerts
        const weatherAlertURL = new URL(`https://api.weather.gov/alerts/active?area=${stateCode}`);
        let weatherAlertData = { features: [] };

        try {
          const weatherAlertResponse = await fetch(weatherAlertURL, {
            headers: {
              "User-Agent": weatherGovUserAgent,
              Accept: "application/geo+json",
            },
          });

          if (weatherAlertResponse.ok) {
            weatherAlertData = await weatherAlertResponse.json();
          } else {
            console.error(
              `Weather alerts request failed with status ${weatherAlertResponse.status}`,
            );
          }
        } catch (alertErr) {
          console.error("Weather alerts request failed:", alertErr);
        }
        
      let llmResponseText = null;
        try {
          const llmResponse = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: `This is a weather assistant.
        
        Current weather:
        ${JSON.stringify(weatherCurrentData)}
        
        Forecast:
        ${JSON.stringify(weatherForcastData.list.slice(0, 5))}
        
        Alerts:
        ${JSON.stringify(weatherAlertData.features)}
        
        Give a short summary of:
        - current weather
        - what to expect today
        - any warnings and affected areas
        - provide safety adivce for the wearther alert`
        });

          llmResponseText = llmResponse.output_text;
        } catch (error) {
          console.error("LLM error:", error);

          llmResponseText = "Weather unavailable at the moment.";
        }

        //top-level keys
        return res.json({
            location: locationData,
            current: weatherCurrentData,
            forecast: weatherForcastData,
            state: stateCode,
            alert: weatherAlertData,
            summary: llmResponseText,

        });

    } catch(err) {
        return res.status(500).json({message: 'Internal server error'})
    }

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)});
