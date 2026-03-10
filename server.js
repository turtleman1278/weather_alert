import express, { response } from 'express'
import dotenv from 'dotenv'
import { url } from 'node:inspector';

dotenv.config();

const app = express(); 
const port = process.env.PORT || 3000; 
const api_key = process.env.API_key; 

if (!api_key) {
    console.error(`Missing API key`);
    process.exit(1); 
}

app.use(express.static(".")); 

app.get(`/api/weather`, async (req, res) =>{
    try{
        const zip = req.query.zip;
        if(!zip) {
            console.error(`Status: ${res.status}. Please enter a zip code!`);
        } 
        
        //Geolocator API- gets our longitude and latitude 
        const locationURL = new url(  
          `http://api.openweathermap.org/geo/1.0/zip?zip=${#}`
        );
        const locationResponse = await fetch(locationURL);
        const locationData = await locationResponseresponse.json();
        if(!locationResponse.ok){
            console.error(`Status: ${locationResponse.status}. Error, could not pull data.`)
        } 

        const longData = locationData.lon;
        const latData = locationData.lat; 

        //current weather data API 
        const weatherCurrentURL = new url(`https://api.openweathermap.org/data/2.5/weather?lat=${latData}&lon=${longData}`);
        weatherCurrentURL.searchParams.set("units", "imperial");
        weatherCurrentURL.searchParams.set("appid", api_key);
        const weatherCurrentResponse = await fetch(weatherCurrentURL);
        if(!weatherCurrentResponse.ok){
            console.error(`Status: ${weatherCurrentResponse.status}. Error, could not pull data.`)
        } 

        


        //Forcast API
        const weatherForcastURL = new url(`https://api.openweathermap.org/data/2.5/forecast?lat=${latData}&lon=${longData}`);
        weatherForcastURL.searchParams.set("units", "imperial");
        weatherForcastURL.searchParams.set("appid", api_key);
        const weatherForcastResponse = await fetch(weatherForcastURL);
        if(!weatherForcastResponse.ok){
            console.error(`Status: ${weatherForcastResponse.status}. Error, could not pull data.`)
        } 

        

    } catch(err) {

    }
});
