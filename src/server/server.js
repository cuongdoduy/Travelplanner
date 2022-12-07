var path = require('path')
const express = require('express')
const app = require("./app.js")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const project={};
// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
const { resolveSoa } = require('dns');
app.use(cors());


app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
// async function GeolocationCoordinates(baseURL,req,key) {
//     const baseURL="http://api.geonames.org/searchJSON?style=full&maxRows=12&name_startsWith=Paris&username=cuong.doduy"

// }
const GeolocationCoordinates = async(baseURL,userZip,personalAPI) => {
    const url=`${baseURL}${userZip}&username=${personalAPI}`;
    const response= await fetch(url);
    try 
    {
        const data= await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);

    }
}
const GetWeather = async(baseURL,userZip,personalAPI) => {
    const url=`${baseURL}${userZip.lat}&lon=${userZip.lon}&key=${personalAPI}&include=minutely`;
    const response= await fetch(url);
    try 
    {
        const data= await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);

    }
}
const GetPicture = async(baseURL,userZip,personalAPI) => {
    const url=`${baseURL}${personalAPI}${userZip}&image_type=photo&pretty=true`;
    console.log(url);
    const response= await fetch(url);
    try 
    {
        const data= await response.json();
        return data;
    }
    catch(error)
    {
        console.log(error);

    }    
}
app.post('/add',function(req,res)
{
    const place=req.body.place;
    const baseURL="http://api.geonames.org/searchJSON?style=full&maxRows=12&name_startsWith=";
    const personalAPI=process.env.API_KEY1;
    GeolocationCoordinates(baseURL,place,personalAPI)
    .then((data)=>{
        console.log(data.geonames[0].lat);
        console.log(data.geonames[0].lng);
        return {lat:data.geonames[0].lat,lon:data.geonames[0].lng};
    })
    .then((data)=>{
        const baseURL="https://api.weatherbit.io/v2.0/current?lat=";
        const location={lat:data.lat,lon:data.lon};
        const personalAPI=process.env.API_KEY2;
        GetWeather(baseURL,location,personalAPI)
    .then((data)=>{
        const weather={temp:data.data[0].temp,clouds:data.data[0].clouds,describe:data.data[0].weather.description};
        return weather;
    })
    .then((weather)=>{
        const baseURL="https://pixabay.com/api/?key=";
        const userplace=`&q=${req.body.place}`;
        const personalAPI=process.env.API_KEY3;
         project.temp=weather.temp;
         project.clouds=weather.clouds;
         project.describe=weather.describe;
        GetPicture(baseURL,userplace,personalAPI)
    .then((data)=>{
        project.url=data.hits[0].webformatURL;
        res.send(project);
    })        
    })
    })
})  
