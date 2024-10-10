import React, { useState } from 'react'
import '../Pages/CSS/Home.css'
import Clock from '../clock';
import img from '../Images/biggest-hits-and-news-sport-icons-png-22.png'
import Swal from 'sweetalert2';

function Home() {
  const [currentWeather, setcurrentWeather] = useState([]);
  const [city, setCity] = useState('');
  const [render, setRender] = useState(false);

  let fetchData = async () => {
    let fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=35c712ff6dea02ba5d9855a4ade20f1f`);
    let jsonData = await fetchData.json();
    if (jsonData!=undefined){
      setcurrentWeather(jsonData);
      setRender(true);
      alert("reached")
    }
    else{
    }
  }
  
  function citytosearch(e) {
    setCity(e.target.value)
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
              <div className='cityName'><h1>{currentWeather.name ? currentWeather.name + "," : ""} <span>{currentWeather.sys ? currentWeather.sys.country : ""}</span></h1></div>
              <div className='space'>
                {render ?
                  <div className="searchData2">
                    <li>
                      Feels Like
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.main.feels_like) + "°c" : ""}
                      </span>
                    </li>
                    <li>
                      Humidity
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.main.humidity) + "%" : ""}
                      </span>
                    </li>
                    <li>
                      Visibility
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.visibility) + "mi" : ""}

                      </span>
                    </li>
                    <li>
                      Wind Speed
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.wind.speed) + "Km/h" : ""}
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
                  <h1>{currentWeather.main ? Math.round(currentWeather.main.temp) + "°c" : ""}</h1>
                </div>
              </div>
            </div>

            {/* search section */}
            <div className="search">
              <div className='searchanddata'>
                <div className="searchInput">
                  <input type="text" placeholder='Search any city' onChange={citytosearch} />
                  <button onClick={fetchData}><i class="ri-search-line"></i></button>
                </div>
                {render ?
                  <div className="searchData">
                    <li>
                      Feels Like
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.main.feels_like) + "°c" : ""}
                      </span>
                    </li>
                    <li>
                      Humidity
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.main.humidity) + "%" : ""}
                      </span>
                    </li>
                    <li>
                      Visibility
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.visibility) + "mi" : ""}

                      </span>
                    </li>
                    <li>
                      Wind Speed
                      <span className="temp">
                        {currentWeather.main ? Math.round(currentWeather.wind.speed) + "Km/h" : ""}
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
    </div>
  )
}

export default Home