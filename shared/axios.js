const { default: axios } = require("axios");
// const { response } = require("express");

const HttpService=(baseUrl)=>{
    const ins = axios.create({
        baseURL:baseUrl,
        timeout:10000,
        headers:{
            'Content-Type':"application/json"
        }
    });
    ins.interceptors.request.use(
        (config)=>{
            return config;
        },
        (error)=>{
            return error;
        }
    )

    ins.interceptors.response.use(
        (response)=>{
            return response.data
        },
        (error)=>{
            return Promise.reject(error)
        }
    )

    return ins
}

const authService = HttpService("http://localhost:5000/api/v1")
const orderServiceService = HttpService("http://localhost:5001/api/v1")
module.exports={
    authService,
    orderServiceService
}