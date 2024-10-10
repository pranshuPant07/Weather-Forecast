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
    isLoading: false
  });

  const updateState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const handleCity = (e) => {
    updateState({ city: e.target.value })
  }

  const fetchData = async () => {
    updateState({ isLoading: true })
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${state.city}&appid=35c712ff6dea02ba5d9855a4ade20f1f`);
      if (response.status === 200) {
        setTimeout(() => {
          updateState({ currentWeather: response.data })
          updateState({ isRender: true });
          updateState({ isLoading: false });
        }, 2000)
      }
    } catch (error) {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter a valid city",
        });
        updateState({ isLoading: false })
      }, 2000)
    }

  }


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
                    <button onClick={fetchData}><i class="ri-search-line"></i></button>
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