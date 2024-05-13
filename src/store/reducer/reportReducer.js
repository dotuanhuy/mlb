const initState = {
    revenueMonth: [],
    revenueToday: [],
    revenueWeek: [],
    revenueYear: [],
    bestSellProducts: [],
    totalRevenue: 0,
    totalPrefitRevenue: 0
}

const reportReducer = (state=initState, action) => {
    switch (action.type) {
        case 'GET_MONTHLY_REVENUE_SUCCESS': 
            state.revenueMonth = action.data
            return {
                ...state
            }
        case 'GET_MONTHLY_REVENUE_FAILED': 
            state.revenueMonth = []
            return {
                ...state
            }
        case 'GET_DAILY_REVENUE_SUCCESS': 
            state.revenueToday = action.data
            return {
                ...state
            }
        case 'GET_DAILY_REVENUE_FAILED': 
            state.revenueToday = []
            return {
                ...state
            }
        case 'GET_WEEK_REVENUE_SUCCESS': 
            state.revenueWeek = action.data
            return {
                ...state
            }
        case 'GET_WEEK_REVENUE_FAILED': 
            state.revenueWeek = []
            return {
                ...state
            }
        case 'GET_YEAR_REVENUE_SUCCESS': 
            state.revenueYear = action.data
            return {
                ...state
            }
        case 'GET_YEAR_REVENUE_FAILED': 
            state.revenueYear = []
            return {
                ...state
            }
        case 'GET_TOTAL_REVENUE_SUCCESS': 
            state.totalRevenue = action.data?.totalRevenue
            state.totalPrefitRevenue = action.data?.totalPrefitRevenue
            return {
                ...state
            }
        case 'GET_TOTAL_REVENUE_FAILED': 
            state.totalRevenue = 0
            state.totalPrefitRevenue = 0
            return {
                ...state
            }
        case 'GET_TOP_10_BEST_SELLING_PRODUCTS_SUCCESS':
            state.bestSellProducts = action.data
            return {
                ...state
            }
        case 'GET_TOP_10_BEST_SELLING_PRODUCTS_FAILED':
            state.bestSellProducts = []
            return {
                ...state
            }
        default:
            return state
    }
}

export default reportReducer
