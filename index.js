const zipCode = document.getElementById("zip_code"); 
const zipBtn = document.getElementById('btn-zip');
const info = document.getElementById("current_weather_information");

const forecast1 = document.getElementById("forecasted_weather_1");
const forecast1_1 = document.getElementById("forecasted_weather_1_1");
const forecast1_2 = document.getElementById("forecasted_weather_1_2");
const forecast1_3 = document.getElementById("forecasted_weather_1_3");
const forecast1_4 = document.getElementById("forecasted_weather_1_4");
const forecast1_5 = document.getElementById("forecasted_weather_1_5");
const forecast1_6 = document.getElementById("forecasted_weather_1_6");

const forecast2 = document.getElementById("forecasted_weather_2");
const forecast2_1 = document.getElementById("forecasted_weather_2_1");
const forecast2_2 = document.getElementById("forecasted_weather_2_2");
const forecast2_3 = document.getElementById("forecasted_weather_2_3");
const forecast2_4 = document.getElementById("forecasted_weather_2_4");
const forecast2_5 = document.getElementById("forecasted_weather_2_5");
const forecast2_6 = document.getElementById("forecasted_weather_2_6");

const forecast3 = document.getElementById("forecasted_weather_3");
const forecast3_1 = document.getElementById("forecasted_weather_3_1");
const forecast3_2 = document.getElementById("forecasted_weather_3_2");
const forecast3_3 = document.getElementById("forecasted_weather_3_3");
const forecast3_4 = document.getElementById("forecasted_weather_3_4");
const forecast3_5 = document.getElementById("forecasted_weather_3_5");
const forecast3_6 = document.getElementById("forecasted_weather_3_6");

const forecast4 = document.getElementById("forecasted_weather_4");
const forecast4_1 = document.getElementById("forecasted_weather_4_1");
const forecast4_2 = document.getElementById("forecasted_weather_4_2");
const forecast4_3 = document.getElementById("forecasted_weather_4_3");
const forecast4_4 = document.getElementById("forecasted_weather_4_4");
const forecast4_5 = document.getElementById("forecasted_weather_4_5");
const forecast4_6 = document.getElementById("forecasted_weather_4_6");

const forecast5 = document.getElementById("forecasted_weather_5");
const forecast5_1 = document.getElementById("forecasted_weather_5_1");
const forecast5_2 = document.getElementById("forecasted_weather_5_2");
const forecast5_3 = document.getElementById("forecasted_weather_5_3");
const forecast5_4 = document.getElementById("forecasted_weather_5_4");
const forecast5_5 = document.getElementById("forecasted_weather_5_5");
const forecast5_6 = document.getElementById("forecasted_weather_5_6");

const weatherAlerts = document.getElementById("weather-alerts");

async function fetchData(zip) {

  try {
    if(!zip) {
        info.textContent = "Please enter a zip code. "
        return;
    }

    const locationResponse = await fetch(`/api/weather?zip=${zip}`);
    const geoData = await locationResponse.json();
    

    if (!locationResponse.ok) {
      throw new Error(
        `Error in fetching data. Status code: ${locationResponse.status} ${locationResponse.statusText}`,
      );
    }

    info.innerHTML = `
    <h2>${geoData.location.name}, ${geoData.state}</h2>
    <p> Current Temperature: ${Math.trunc(geoData.current.main.temp)} F</p>
    <p> Feels like: ${Math.trunc(geoData.current.main.feels_like)} F</p>
    <p> High: ${Math.trunc(geoData.current.main.temp_max)} F</p>
    <p> Low: ${Math.trunc(geoData.current.main.temp_min)} F</p>
    <p>Condition: ${geoData.current.weather[0].description}</p>
    `;

    const alerts = geoData.alert?.features ?? [];

    weatherAlerts.innerHTML = alerts.length
      ? alerts
          .map(({ properties }, index) => `
    <div class="weather-alert">
      <h3>Alert ${index + 1}</h3>
      <p>Status: ${properties?.status ?? "N/A"}</p>
      <p>Severity: ${properties?.severity ?? "N/A"}</p>
      <p>Event: ${properties?.event ?? "N/A"}</p>
      <p>Headline: ${properties?.headline ?? "N/A"}</p>
      <p>Description: ${properties?.description ?? "N/A"}</p>
      <p>Area: ${properties?.areaDesc ?? "N/A"}</p>
      <p>Onset: ${properties?.onset ?? "N/A"}</p>
      <p>Ends: ${properties?.ends ?? "N/A"}</p>
    </div>
    `)
          .join("")
      : geoData.alertStatus === "error"
        ? `<p>Weather alerts are temporarily unavailable.</p>
           <p>${geoData.alertError ?? "Unable to load alerts."}</p>`
        : `<p>No active alerts for this area.</p>`; 

    forecast1_1.innerHTML = `<p>Date: ${geoData.forecast.list[1].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[1].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[1].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[1].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[1].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[1].main.feels_like)} F</p>
    `;
    forecast1_2.innerHTML = `<p>Date: ${geoData.forecast.list[2].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[2].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[2].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[2].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[2].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[2].main.feels_like)} F</p>
    `;
    forecast1_3.innerHTML = `<p>Date: ${geoData.forecast.list[3].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[3].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[3].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[3].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[3].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[3].main.feels_like)} F</p>
    `;
    forecast1_4.innerHTML = `<p>Date: ${geoData.forecast.list[4].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[4].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[4].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[4].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[4].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[4].main.feels_like)} F</p>
    `;
    forecast1_5.innerHTML = `<p>Date: ${geoData.forecast.list[5].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[5].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[5].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[5].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[5].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[5].main.feels_like)} F</p>
    `;
    forecast1_6.innerHTML = `<p>Date: ${geoData.forecast.list[6].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[6].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[6].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[6].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[6].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[6].main.feels_like)} F</p>
    `;

    forecast2_1.innerHTML = `<p>Date: ${geoData.forecast.list[7].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[7].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[7].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[7].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[7].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[7].main.feels_like)} F</p>
    `;
    forecast2_2.innerHTML = `<p>Date: ${geoData.forecast.list[8].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[8].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[8].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[8].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[8].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[8].main.feels_like)} F</p>
    `;
    forecast2_3.innerHTML = `<p>Date: ${geoData.forecast.list[9].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[9].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[9].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[9].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[9].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[9].main.feels_like)} F</p>
    `;
    forecast2_4.innerHTML = `<p>Date: ${geoData.forecast.list[10].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[10].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[10].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[10].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[10].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[10].main.feels_like)} F</p>
    `;
    forecast2_5.innerHTML = `<p>Date: ${geoData.forecast.list[11].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[11].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[11].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[11].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[11].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[11].main.feels_like)} F</p>
    `;
    forecast2_6.innerHTML = `<p>Date: ${geoData.forecast.list[12].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[12].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[12].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[12].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[12].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[12].main.feels_like)} F</p>
    `;

    forecast3_1.innerHTML = `<p>Date: ${geoData.forecast.list[13].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[13].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[13].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[13].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[13].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[13].main.feels_like)} F</p>
    `;
    forecast3_2.innerHTML = `<p>Date: ${geoData.forecast.list[14].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[14].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[14].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[14].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[14].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[14].main.feels_like)} F</p>
    `;
    forecast3_3.innerHTML = `<p>Date: ${geoData.forecast.list[15].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[15].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[15].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[15].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[15].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[15].main.feels_like)} F</p>
    `;
    forecast3_4.innerHTML = `<p>Date: ${geoData.forecast.list[16].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[16].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[16].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[16].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[16].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[16].main.feels_like)} F</p>
    `;
    forecast3_5.innerHTML = `<p>Date: ${geoData.forecast.list[17].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[17].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[17].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[17].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[17].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[17].main.feels_like)} F</p>
    `;
    forecast3_6.innerHTML = `<p>Date: ${geoData.forecast.list[18].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[18].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[18].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[18].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[18].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[18].main.feels_like)} F</p>
    `;

    forecast4_1.innerHTML = `<p>Date: ${geoData.forecast.list[19].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[19].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[19].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[19].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[19].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[19].main.feels_like)} F</p>
    `;
    forecast4_2.innerHTML = `<p>Date: ${geoData.forecast.list[20].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[20].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[20].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[20].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[20].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[20].main.feels_like)} F</p>
    `;
    forecast4_3.innerHTML = `<p>Date: ${geoData.forecast.list[21].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[21].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[21].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[21].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[21].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[21].main.feels_like)} F</p>
    `;
    forecast4_4.innerHTML = `<p>Date: ${geoData.forecast.list[22].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[22].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[22].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[22].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[22].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[22].main.feels_like)} F</p>
    `;
    forecast4_5.innerHTML = `<p>Date: ${geoData.forecast.list[23].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[23].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[23].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[23].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[23].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[23].main.feels_like)} F</p>
    `;
    forecast4_6.innerHTML = `<p>Date: ${geoData.forecast.list[24].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[24].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[24].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[24].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[24].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[24].main.feels_like)} F</p>
    `;

    forecast5_1.innerHTML = `<p>Date: ${geoData.forecast.list[25].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[25].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[25].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[25].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[25].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[25].main.feels_like)} F</p>
    `;
    forecast5_2.innerHTML = `<p>Date: ${geoData.forecast.list[26].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[26].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[26].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[26].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[26].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[26].main.feels_like)} F</p>
    `;
    forecast5_3.innerHTML = `<p>Date: ${geoData.forecast.list[27].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[27].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[27].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[27].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[27].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[27].main.feels_like)} F</p>
    `;
    forecast5_4.innerHTML = `<p>Date: ${geoData.forecast.list[28].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[28].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[28].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[28].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[28].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[28].main.feels_like)} F</p>
    `;
    forecast5_5.innerHTML = `<p>Date: ${geoData.forecast.list[29].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[29].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[29].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[29].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[29].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[29].main.feels_like)} F</p>
    `;
    forecast5_6.innerHTML = `<p>Date: ${geoData.forecast.list[30].dt_txt}</p>
    <p>Forecast: ${geoData.forecast.list[30].weather[0].description}</p>
    <p>Temperature: ${Math.trunc(geoData.forecast.list[30].main.temp)} F</p>
    <p>High: ${Math.trunc(geoData.forecast.list[30].main.temp_max)} F</p>
    <p>Low: ${Math.trunc(geoData.forecast.list[30].main.temp_min)} F</p>
    <p>Feels like: ${Math.trunc(geoData.forecast.list[30].main.feels_like)} F</p>
    `;
  

  } catch (error) {
    console.error(error);
    info.textContent = "Unable to load weather information right now.";
    weatherAlerts.textContent = "";
  }
}

zipBtn.addEventListener('click', () => {
    fetchData(zipCode.value);
});
