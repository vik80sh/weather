import axios from 'axios'
import constValue from './../constant';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

export const HelpersFunction = {
    getGeoLocation: async (lang, lat) => {
        let url = constValue.currentLocation;
        url = url + lang + "," + lat + constValue.APIKeyForCurrentLocationAPI + "&pretty=1";

        const observable = new Observable(subscriber => {
            subscriber.next(axios.get(url))
        })
        let result = ""
        observable.subscribe({
            next(x) { result = x },
            error(err) { result = "fail" },
            complete() { console.log('done'); }
        });
        try {
            const res = await axios.get(url);
            return res.data;
        }
        catch (err) {
            return "fail";
        }
    },
    weatherInfo: async (city) => {
        let url = constValue.weatherAPI + city + constValue.weatherAPIKey
        try {
            const res = await axios.get(url);
            return res.data;
        }
        catch (err) {
            return "fail";
        }
    },
    getCityList: async () => {
        let url = constValue.CityListURL;
        try {
            const res = await axios.get(url);
            return res.data;
        }
        catch (err) {
            return "fail";
        }
    },
    userLogin: async (username, password, type) => {
        let body = {
            username: username,
            password: password,
            type: type
        }
        let url = constValue.nodeServerLogin;
        try {
            const res = await axios.post(url, body);
            let status = {
                statusCode: "success",
                data: res.data
            }
            return status;
        }
        catch (err) {
            let status = {
                statusCode: "fail",
                message: err.response.data.message
            }
            return status
        }

    },
    addTocartAPI: async (data) => {
        let url = constValue.nodeServerAddToCart;
        try {
            const res = await axios.post(url, data);
            let status = {
                statusCode: "success",
                data: res.data
            }
            return status;
        }
        catch (err) {
            let status = {
                statusCode: "fail",
                message: err.response.data.message
            }
            return status
        }
    },
    getCartData: async (token) => {
        let url = constValue.nodeServerViewCart;
        try {
            const res = await axios.get(url, {
                params: {
                    token: token
                }
            });
            let status = {
                statusCode: "success",
                data: res.data
            }
            return status;
        }
        catch (err) {
            let status = {
                statusCode: "fail",
                message: err.response.data.message
            }
            return status
        }
    },
    removeFromCart: async(data,token)=>{
        let body = {
            city:data.city,
            country:data.country,
            token:token
        }
        console.log("- - - -- ",data)
        let url = constValue.nodeServerRemoveFromCart;
        try {
            const res = await axios.post(url,body);
            let status = {
                statusCode: "success",
                data: res.data
            }
            return status;
        }
        catch (err) {
            let status = {
                statusCode: "fail",
                message: err.response.data.message
            }
            return status
        }
    }
}