import axiosJWT from "../axiosJWT";
import { API_VERSION } from "../utils";

const api = `/api/${API_VERSION}/report`

const getMonthlyRevenueService = (year) => {
    return axiosJWT.get(`${api}/month?year=${year}`)
}

const getDailyRevenueService = (day) => {
    return axiosJWT.get(`${api}/day?day=${day}`)
}

const getWeeklyRevenueService = (startDate, endDate) => {
    return axiosJWT.get(`${api}/week?startDate=${startDate}&endDate=${endDate}`)
}

const getYearRevenueService = () => {
    return axiosJWT.get(`${api}/year`)
}

const getTotalRevenueService = () => {
    return axiosJWT.get(`${api}/revenue`)
}

const getTopTenBestSellingProductsYearService = (year) => {
    return axiosJWT.get(`${api}/product/sell/top/${year}`)
}

export {
    getMonthlyRevenueService,
    getDailyRevenueService,
    getWeeklyRevenueService,
    getTotalRevenueService,
    getYearRevenueService,
    getTopTenBestSellingProductsYearService
}
