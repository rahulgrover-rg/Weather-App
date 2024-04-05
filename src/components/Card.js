import React, { useEffect, useState } from "react";
import axios from "axios";
import './Card.css' ;
import toast from "react-hot-toast";
import Loader from "./Loader";

const Card = ( {city,currentCard}) => {
    const[cssData,setCssData] = useState({
        scale : 100 ,
        cardName : 'center' ,
        minWidth : 350 ,

    })
    const [weatherData , setWeatherData] = useState(null) ;
    const [loading , setLoading] = useState(true) ;
    const API_KEY = "c3bad88f9390b4157c2dfa1f3b1211f1" ;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}` ;

    async function fetchWeatherData() {
    setLoading(true) ;
        try {
            const response = await axios.get(url) ;
            const data = response.data ;
            setWeatherData(prev => data) ;
        }
        catch(error){
            toast.error("Such City name might not exist") ;
        }
    setLoading(false) ;
    }

    useEffect(()=>{
        fetchWeatherData() ;
        console.log(weatherData) ;
        currentCard === 'left' ? (
            setCssData(prev => ({scale : 75 , cardName:'left' , minWidth:300}))
        ) : ( currentCard === 'center' ? (
            setCssData(prev => ({scale : 100 , cardName:'center' , minWidth:380}))
        ) : (
            setCssData(prev => ({scale : 75 , cardName:'right' , minWidth:300}))
        )
    )
        
    },[city,currentCard]) ;

    return (
         <div className="flex justify-center items-center mx-5 ">{
            loading ? <Loader/> :  (
            <div>
            <div className={`${cssData.cardName}-card min-w-[${cssData.minWidth}px] w-10/12 max-w-[500px] flex flex-col justify-between items-center bg-blue-400 text-white h-[550px] rounded-3xl mx-auto scale-${cssData.scale}`}>
                <div className="top-card h-2/6 w-10/12">
                <div className="city max-w-[200px] truncate text-xl font-semibold tracking-wide">{weatherData.name}</div>
                <div className="temparature text-[3rem] font-bold leading-16">{(weatherData.main.temp - 273.15).toFixed(2)}&deg; <span className="text-xl font-semibold">C</span></div>
                <div className="weather text-lg tracking-wider font-semibold">{weatherData.weather[0].description}</div>
                </div>
                <div className="flex flex-col w-10/12 justify-evenly border-[2px] border-white rounded-lg py-3 mb-16 text-center gap-y-5">
                    <div className="flex flex-row justify-evenly gap-x-5">
                        <p className="flex flex-col">
                            <span className="font-semibold text-lg">{weatherData.main.humidity}%</span>
                            <span className="text-sm font-thin">Humidity</span>
                        </p>
                        <p className="flex flex-col">
                            <span className="font-semibold text-lg">{(weatherData.main.temp_max - 273.15).toFixed(2)}&deg;C</span>
                            <span className="text-sm font-thin">Max Temp.</span>
                        </p>
                        <p className="flex flex-col">
                            <span className="font-semibold text-lg">{(weatherData.wind.speed*3.6).toFixed(2)}</span>
                            <span className="text-sm font-thin">Wind Speed<br/>(Km/h)</span>
                        </p>
                    </div>
                    <div className="flex flex-row justify-evenly gap-x-5">
                        <p className="flex flex-col">
                            <span className="font-semibold text-lg">{(weatherData.main.pressure * 0.00098692).toFixed(2)}</span>
                            <span className="text-sm font-thin">Pressure<br/>(atm)</span>
                        </p>
                        <p className="flex flex-col">
                            <span className="font-semibold text-lg">{(weatherData.main.temp_min - 273.15).toFixed(2)}&deg;C</span>
                            <span className="text-sm font-thin">Min Temp.</span>
                        </p>
                        <p className="flex flex-col">
                            <span className="font-semibold text-lg">{weatherData.visibility/1000}</span>
                            <span className="text-sm font-thin">Visibility<br/>(Km)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        )
        }</div>
    ) ;
}

export default Card ;