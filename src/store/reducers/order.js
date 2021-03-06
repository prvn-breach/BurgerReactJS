import * as actionTypes from "../actions/actionTypes";

const initialState = {
    orders: [],
    error: false,
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            }
        case actionTypes.INIT_ORDERS:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;