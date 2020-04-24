<template>
  <div class="home-component conatiner">
    <div class="input-search-field">
      <input
        type="text"
        placeholder="Search City"
        class="input"
        v-model="inputText"
        @keydown="fetchAutoSearch"
      />
      <button @click="findWeather" class="btn btn-primary search-btn">Search</button>
    </div>

    <ul class="drop-donw-list" v-show="autoSearchCityList.length">
      <li
        @click="selectCity(autoSearchCity)"
        class="city-list"
        v-for="(autoSearchCity,index) in autoSearchCityList"
        :key="index"
        v-html="autoSearchCity.name"
      ></li>
    </ul>

    <div class="spinner-loading">
      <div
        :class="[ this.countryName && this.weatherArray  || this.iserrorMessage ? '' : 'loader' ]"
      ></div>
    </div>
    <div class="error-message message" v-if="this.iserrorMessage">{{this.errorMessage}}</div>

    <div
      class="maintain-height"
      v-if="!(this.countryName && this.weatherArray  || this.iserrorMessage)"
    ></div>

    <div class="wether-info" v-show="this.countryName && this.weatherArray">
      <div class="location-details" v-if="this.countryName">
        <p class="location-title">
          <span class="material-icons">location_on</span>
          {{this.weatherInfo.name}} , {{this.countryName}}
        </p>
        <span @click="addtocard(weatherInfo.name , countryName , weatherInfo.coord)">+Add-City</span>
        <span>{{this.cartMessage}}</span>
      </div>

      <div id="wether-id" class="weather-report row">
        <div class="col-sm-12 col-md-6 xyzz">
          <div class="tempeture">
            <div class="current-temp" v-if="this.weatherInfo && this.weatherInfo.main">
              <div class="now-temp" v-if="this.weatherInfo.main.temp">
                <p>Now</p>
                {{this.weatherInfo.main.temp}}°C
              </div>
              <p
                class="now-min-temp"
                v-if="this.weatherInfo.main.temp_min"
              >Min Temp : {{this.weatherInfo.main.temp_min}}°C</p>
              <p
                class="now-max-temp"
                v-if="this.weatherInfo.main.temp_max"
              >Max Temp : {{this.weatherInfo.main.temp_max}}°C</p>
              <p
                class="feel-like-temp"
                v-if="this.weatherInfo.main.feels_like"
              >Feel Like : {{this.weatherInfo.main.feels_like}}°C</p>
            </div>
          </div>
          <div class="row wind">
            <div class="col-xs-5 left-side">
              <div
                class="weather-type"
                v-if="this.weatherArray.length && this.weatherArray[0].main"
              >Weather Cycles : {{this.weatherArray[0].main}}</div>
              <div
                class="weather-type-des"
                v-if="this.weatherArray.length && this.weatherArray[0].description"
              >Weather Description: {{this.weatherArray[0].description}}</div>
              <div
                class="wind-speed"
                v-if="this.weatherInfo && this.weatherInfo.wind && this.weatherInfo.wind.speed"
              >Wind Speed : {{this.weatherInfo.wind.speed}} M/Sec</div>
            </div>
            <div class="col-xs-5 right-side">
              <div class="img" v-if="this.image">
                <img v-bind:src="this.image" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-6 location-n-air"
          v-if="this.weatherInfo && this.weatherInfo.sys"
        >
          <div class="location-name">Location : {{this.weatherInfo.name}} , {{this.countryName}}</div>
          <div
            class="sun-rise"
          >Sunrise :{{new Date(this.weatherInfo.sys.sunrise).toString("hh:mm tt").substring(16,25)}}</div>
          <div
            class="suns-et"
          >Sunset : {{new Date(this.weatherInfo.sys.sunset).toString("hh:mm tt").substring(16,25)}}</div>

          <div class="air-deatils" v-if="this.weatherInfo && this.weatherInfo.main">
            <div class="air-pressure">Air Pressure :{{this.weatherInfo.main.pressure}}</div>
            <div class="humidity">Humadity : {{this.weatherInfo.main.humidity}}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HelpersFunction } from "./../../HelperFunctions/index";
import countryList from "./../../CountryCodeList";
import cities from "./../../citiesList";
export default {
  name: "Home",
  data() {
    return {
      cityNameList: cities,
      autoSearchCityList: [],
      inputText: "",
      index: 0,
      cityHaveToSearch: "",
      weatherInfo: "",
      countryName: "",
      weatherArray: [],
      image: "",
      iserrorMessage: false,
      errorMessage:
        "API status is failed , please select check network or search other city ",
      errorInCityList: false,
      errorCityMessage:
        "City List API failed , please check network connection and refresh",
      cartMessage: ""
    };
  },
  beforeCreate() {},
  async created() {
    let refVariable = this;
    let localStorageCity = localStorage.getItem("city")
      ? localStorage.getItem("city")
      : "Bengaluru";
    navigator.geolocation.getCurrentPosition(
      async function(letGeoPosition) {
        let lat = letGeoPosition.coords.latitude || "";
        let lang = letGeoPosition.coords.longitude || "";
        let data = await HelpersFunction.getGeoLocation(lat, lang);
        let city = "";
        if (data !== "fail") city = city ? city : localStorageCity;
        city =
          data.results[0] &&
          data.results[0].components &&
          data.results[0].components.city
            ? data.results[0].components.city
            : city;
        refVariable.weatherFunction(refVariable, city);
      },
      async function(error) {
        refVariable.weatherFunction(refVariable, localStorageCity);
      }
    );
    let cityListdata = await HelpersFunction.getCityList();
    if (cityListdata === "fail") this.errorInCityList = true;
    else this.cityNameList = cityListdata;
  },
  methods: {
    fetchAutoSearch() {
      this.cartMessage=""
      this.debounce(this.autoSearch, 500);
    },
    debounce(fn, delay) {
      let timer;
      let x = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        x.autoSearch();
      }, 600);
    },
    autoSearch() {
      this.autoSearchCityList = [];
      if (this.inputText.length > 1)
        for (let i = 0; i < this.cityNameList.length; i++) {
          let cityName = this.cityNameList[i].name.toLowerCase();
          let index = cityName.indexOf(this.inputText.toLowerCase());
          if (index !== -1) {
            this.autoSearchCityList.push(this.cityNameList[i]);
          }
        }
      else this.autoSearchCityList = [];
    },
    async findWeather() {
      this.cartMessage=""
      if (this.inputText) {
        localStorage.setItem("city", this.inputText);
        this.countryName = "";
        this.weatherArray = [];
        let weatherReport = await HelpersFunction.weatherInfo(this.inputText);
        if (weatherReport === "fail") {
          this.iserrorMessage = true;
        } else {
          this.iserrorMessage = false;
          this.weatherInfo = weatherReport;
          this.countryName = countryList[this.weatherInfo.sys.country];
          this.weatherArray = this.weatherInfo.weather;
          this.image =
            "http://openweathermap.org/img/wn/" +
            this.weatherInfo.weather[0].icon +
            "@2x.png";
        }
      }
    },
    selectCity(city) {
      this.inputText = city.name;
      this.autoSearchCityList = [];
    },
    async weatherFunction(refVariable, localStorageCity) {
      this.cartMessage="";
      let weather = await HelpersFunction.weatherInfo(localStorageCity);
      if (weather === "fail") refVariable.iserrorMessage = true;
      else {
        refVariable.iserrorMessage = false;
        refVariable.weatherInfo = weather;
        refVariable.countryName = countryList[weather.sys.country];
        refVariable.weatherArray = weather.weather;
        refVariable.image =
          "http://openweathermap.org/img/wn/" +
          weather.weather[0].icon +
          "@2x.png";
      }
    },
    async addtocard(city, country, weatherInfo) {
      let token = localStorage.getItem("userToken");
      let dataSet = {
        cityname: city,
        country: country,
        lon: weatherInfo.lon,
        lat: weatherInfo.lat,
        token: token
      };
      if (token) {
        let res = await HelpersFunction.addTocartAPI(dataSet);
        if (res.statusCode === "fail") {
          this.cartMessage = res.message;
        } else {
          this.cartMessage = "City is added in your fav list";
        }
      } else {
        this.$router.push("/form");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "./Home.scss";
</style>