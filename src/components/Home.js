import React, { useState,useEffect } from "react";
import Card from "./Card.js";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";

const Home = () => {

    const [searchedCities, setSearchedCities] = useState([]);
    const [city, setCity] = useState('');
    const [cityIndex , setCityIndex] = useState(0) ;

    function changeHandler(event) {
        setCity(event.target.value) ;
    }

    function searchHandler() {
        if (city.trim() !== '') {
            if(!(searchedCities.includes(city))) {
                setSearchedCities(prevCities => {
                    const updatedCities = [...prevCities, city];
                    if (updatedCities.length > 5) {
                        updatedCities.shift();
                    }
                    return updatedCities;
                });
            }
        }
        
    }
    useEffect(() => {
        setCityIndex(prevCity => {
            return searchedCities.indexOf(city) === -1 ? prevCity : searchedCities.indexOf(city)} );
    }, [searchedCities, city]) ;


    return (
        <div>
            <div className="relative mx-auto my-5 w-10/12 max-w-[380px]">

                <label htmlFor="city-name">

                    <input
                        id="city-name"
                        type="text"
                        name="city"
                        value={city}
                        onChange={changeHandler}
                        placeholder="Enter city name here"
                        className="px-5 py-3 w-full rounded-3xl border-[2px] border-slate-500 hover:border-b-slate-400 transition-all duration-50 text-slate-700 tracking-wide text-xl selection:border-slate-300"></input>

                    <span className="absolute top-3 right-4 cursor-pointer text-slate-500 hover:bg-gray-700 hover:text-white transition-all duration-100 p-2 rounded-full" onClick={searchHandler}>
                        <IoSearchSharp/>
                    </span>

                </label>
            </div>

            {
                searchedCities.length === 0 ? (
                    <div className="text-center">Your searched city's weather results will appear here.</div>
                ) : 
                (
                <div className="flex w-screen justify-center items-center">
                {
                cityIndex>0 &&  searchedCities.length > 1 &&
                (
                    <div className="relative">
                        <span onClick={() => setCityIndex(prevIndex => prevIndex - 1)}><FaChevronLeft  className="absolute top-[230px] right-[190px] text-gray-600 text-[3rem] z-50"/></span>
                        <Card city={searchedCities[cityIndex - 1]} currentCard="left"/>
                    </div>
                ) 
                }
                <Card city={searchedCities[cityIndex]} currentCard='center' />
                {
                cityIndex>-1 && searchedCities.length > 1 && cityIndex < searchedCities.length-1 &&
                (
                    <div className="relative">
                        <Card city={searchedCities[cityIndex + 1]} currentCard="right"/>
                        <span><FaChevronRight onClick={() => setCityIndex(prevIndex => prevIndex + 1)} className="absolute bottom-[270px] left-[200px] text-gray-600 text-[3rem]"/></span>
                    </div>
                ) 
                }
            </div>)
            }
        </div>
    );
}

export default Home;