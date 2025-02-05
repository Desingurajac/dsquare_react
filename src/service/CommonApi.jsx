import React from "react";
import { apiService } from "./Service";
import { jwtDecode } from 'jwt-decode';
const CommonUrl = process.env.REACT_APP_COMMON_API;

const getCountryUrl = `${CommonUrl}/common/country-list`;
const getStateUrl = `${CommonUrl}/common/state-list`;
const getCityUrl = `${CommonUrl}/common/city-list`;
export const getCountry = async () => {
    try {
        const response =  await apiService.get(getCountryUrl)
        return response;
    } catch (error) {
        return error
    }
}

export const getState = async (payload) => {
    try {
        const response =  await apiService.get(getStateUrl,payload)
        return response;
    } catch (error) {
        return error
    }
}

export const getCity = async (payload) => {
    try {
        const response =  await apiService.get(getCityUrl,payload)
        return response;
    } catch (error) {
        return error
    }

}

