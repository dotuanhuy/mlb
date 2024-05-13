import {
    getMonthlyRevenueService,
    getDailyRevenueService,
    getWeeklyRevenueService,
    getTotalRevenueService,
    getYearRevenueService,
    getTopTenBestSellingProductsYearService
} from '../../services/reportService'
import actionTypes from './actionTypes'

export const getMonthlyRevenue = (year) => {
    return async (dispatch, getState) => {
        try {
            const res = await getMonthlyRevenueService(year)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_MONTHLY_REVENUE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_MONTHLY_REVENUE_FAILED,
                })
            }
        } catch (e) {
            console.log('getMonthlyRevenue error: ', e)
            dispatch({
                type: actionTypes.GET_MONTHLY_REVENUE_FAILED,
            })
        }
    }
}

export const getDailyRevenue = (day) => {
    return async (dispatch, getState) => {
        try {
            const res = await getDailyRevenueService(day)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DAILY_REVENUE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_DAILY_REVENUE_FAILED,
                })
            }
        } catch (e) {
            console.log('getDailyRevenue error: ', e)
            dispatch({
                type: actionTypes.GET_DAILY_REVENUE_FAILED,
            })
        }
    }
}

export const getWeeklyRevenue = (startDate, endDate) => {
    return async (dispatch, getState) => {
        try {
            const res = await getWeeklyRevenueService(startDate, endDate)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_WEEK_REVENUE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_WEEK_REVENUE_FAILED,
                })
            }
        } catch (e) {
            console.log('getDailyRevenue error: ', e)
            dispatch({
                type: actionTypes.GET_WEEK_REVENUE_FAILED,
            })
        }
    }
}

export const getYearRevenue = (day) => {
    return async (dispatch, getState) => {
        try {
            const res = await getYearRevenueService(day)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_YEAR_REVENUE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_YEAR_REVENUE_FAILED,
                })
            }
        } catch (e) {
            console.log('getYearRevenue error: ', e)
            dispatch({
                type: actionTypes.GET_YEAR_REVENUE_FAILED,
            })
        }
    }
}

export const getTotalRevenue = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getTotalRevenueService()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_TOTAL_REVENUE_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_TOTAL_REVENUE_FAILED,
                })
            }
        } catch (e) {
            console.log('getTotalRevenue error: ', e)
            dispatch({
                type: actionTypes.GET_TOTAL_REVENUE_FAILED,
            })
        }
    }
}

export const getTopTenBestSellingProductsYear = (year) => {
    return async (dispatch, getState) => {
        try {
            const res = await getTopTenBestSellingProductsYearService(year)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_TOP_10_BEST_SELLING_PRODUCTS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_TOP_10_BEST_SELLING_PRODUCTS_FAILED,
                })
            }
        } catch (e) {
            console.log('getTotalRevenue error: ', e)
            dispatch({
                type: actionTypes.GET_TOP_10_BEST_SELLING_PRODUCTS_FAILED,
            })
        }
    }
}
