import React, { useState } from 'react'
import '../CSS/Home.css'
import Clock from '../clock';
import img from '../Images/biggest-hits-and-news-sport-icons-png-22.png'
import axios from 'axios';
import Loader from '../Loader';
import Swal from 'sweetalert2';

function Home() {
  const [state, setState] = useState({
    currentWeather: [],
    city: '',
    isRender: false,
    isLoading: false,
    pollution: "",
    index: "",
    quality: "",
  });
  const api_KEY = process.env.REACT_APP_API_KEY;

  console.log(api_KEY)



  function calculateAQI(pollutants) {
    const aqiValues = {};

    // Function to calculate AQI for PM2.5
    const calculatePM25AQI = (pm25) => {
      if (pm25 <= 12) return (50 / 12) * pm25;
      if (pm25 <= 35.4) return (50 / 23.3) * (pm25 - 12) + 51;
      if (pm25 <= 55.4) return (50 / 20) * (pm25 - 35.4) + 101;
      if (pm25 <= 150.4) return (100 / 94.9) * (pm25 - 55.4) + 151;
      return 301; // Assuming higher categories are > 300
    };

    // Function to calculate AQI for PM10
    const calculatePM10AQI = (pm10) => {
      if (pm10 <= 54) return (50 / 54) * pm10;
      if (pm10 <= 154) return (100 / 100) * (pm10 - 54) + 51;
      return 201; // Assuming higher categories are > 150
    };

    // Function to calculate AQI for O3
    const calculateO3AQI = (o3) => {
      if (o3 <= 54) return (50 / 54) * o3;
      if (o3 <= 70) return (100 / 16) * (o3 - 54) + 51;
      return 201; // Assuming higher categories are > 70
    };

    // Function to calculate AQI for NO2
    const calculateNO2AQI = (no2) => {
      if (no2 <= 53) return (50 / 53) * no2;
      if (no2 <= 100) return (100 / 47) * (no2 - 53) + 51;
      return 201; // Assuming higher categories are > 100
    };

    // Function to calculate AQI for SO2
    const calculateSO2AQI = (so2) => {
      if (so2 <= 35) return (50 / 35) * so2;
      if (so2 <= 75) return (100 / 40) * (so2 - 35) + 51;
      return 201; // Assuming higher categories are > 75
    };

    // Function to calculate AQI for CO
    const calculateCOAQI = (co) => {
      if (co <= 4.4) return (50 / 4.4) * co;
      if (co <= 9.4) return (100 / 5) * (co - 4.4) + 51;
      return 201; // Assuming higher categories are > 9.4
    };

    // Calculate AQI for each pollutant
    aqiValues.pm2_5 = calculatePM25AQI(pollutants.pm2_5);
    aqiValues.pm10 = calculatePM10AQI(pollutants.pm10);
    aqiValues.o3 = calculateO3AQI(pollutants.o3);
    aqiValues.no2 = calculateNO2AQI(pollutants.no2);
    aqiValues.so2 = calculateSO2AQI(pollutants.so2);
    aqiValues.co = calculateCOAQI(pollutants.co);

    // Find the maximum AQI value
    const overallAQI = Math.max(...Object.values(aqiValues));


    return overallAQI;
  }



  const updateState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const handleCity = (e) => {
    updateState({ city: e.target.value })
  }

  const fetchData = async () => {
    updateState({ isLoading: true, index: "", quality: "" });

    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${state.city}&appid=${api_KEY}`);
      console.log('Weather Response:', weatherResponse.data); // Debug log

      if (weatherResponse.status === 200) {
        const { lat, lon } = weatherResponse.data.coord;
        const pollutionResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_KEY}`);
        console.log('Pollution Response:', pollutionResponse.data); // Debug log

        const components = pollutionResponse.data.list[0].components;
        const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = components;
        console.log('Pollutants:', { co, nh3, no, no2, o3, pm2_5, pm10, so2 }); // Debug log

        const OverallAQI = calculateAQI({ co, nh3, no, no2, o3, pm2_5, pm10, so2 });
        console.log('Calculated AQI:', OverallAQI); // Debug log

        let quality = '';
        if (OverallAQI <= 50) quality = "GOOD";
        else if (OverallAQI <= 100) quality = "MODERATE";
        else if (OverallAQI <= 150) quality = "UNHEALTHY FOR SENSITIVE GROUPS";
        else if (OverallAQI <= 200) quality = "UNHEALTHY";
        else if (OverallAQI <= 300) quality = "VERY UNHEALTHY";
        else quality = "HAZARDOUS";

        updateState({
          currentWeather: weatherResponse.data,
          isRender: true,
          isLoading: false,
          pollution: pollutionResponse.data.list[0].main.aqi,
          index: OverallAQI,
          quality: quality,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error); // Debug log
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter a valid city",
      });
      updateState({ isLoading: false });
    }
  };





  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
  const day = days[currentDate.getDay()];
  const month = monthNames[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  return (
    <div className="main">

      {state.isLoading ? (
        <Loader />) : (
        <div className="weatherStart">
          <div className="navBar">
            <h1><img src={img} alt='logo' /></h1>
            <div className="lastNav">
              <h3>HOME</h3>
              <h3>ABOUT US</h3>
              <h3>CONTACT US</h3>
            </div>
          </div>
          <div className="content">
            <div className="weather">

              {/* data section */}
              <div className="data">
                <div className='cityName'><h1>{state.currentWeather.name ? state.currentWeather.name + "," : ""} <span>{state.currentWeather.sys ? state.currentWeather.sys.country : ""}</span></h1></div>
                <div className='space'>
                  <h1>AQI:{state.index}</h1>
                  <h4>{state.quality}</h4>
                  {state.isRender ?
                    <div className="searchData2">
                      <li>
                        Feels Like
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.main.feels_like) + "°c" : ""}
                        </span>
                      </li>
                      <li>
                        Humidity
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.main.humidity) + "%" : ""}
                        </span>
                      </li>
                      <li>
                        Visibility
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.visibility) + "mi" : ""}

                        </span>
                      </li>
                      <li>
                        Wind Speed
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.wind.speed) + "Km/h" : ""}
                        </span>
                      </li>
                    </div> : <div className='searchhh2'>
                      <h3>SEARCH ANY CITY FROM ABOVE</h3>
                    </div>
                  }
                </div>
                <div className='timeAndTemp'>
                  <div className='time'>
                    <p><Clock /></p>
                    <p>{day}, {date} {month} {year}</p>
                  </div>

                  <div className='temperature'>
                    <h1>{state.currentWeather.main ? Math.round(state.currentWeather.main.temp) + "°c" : ""}</h1>
                  </div>
                </div>
              </div>

              {/* search section */}
              <div className="search">
                <div className='searchanddata'>
                  <div className="searchInput">
                    <input type="text" placeholder='Search any city' onChange={handleCity} />
                    <button onClick={fetchData}><i className="ri-search-line"></i></button>
                  </div>
                  {state.isRender ?
                    <div className="searchData">
                      <li>
                        Feels Like
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.main.feels_like) + "°c" : ""}
                        </span>
                      </li>
                      <li>
                        Humidity
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.main.humidity) + "%" : ""}
                        </span>
                      </li>
                      <li>
                        Visibility
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.visibility) + "mi" : ""}

                        </span>
                      </li>
                      <li>
                        Wind Speed
                        <span className="temp">
                          {state.currentWeather.main ? Math.round(state.currentWeather.wind.speed) + "Km/h" : ""}
                        </span>
                      </li>
                    </div> : <div className='searchhh'>
                      <h3>SEARCH ANY CITY FROM ABOVE</h3>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Home