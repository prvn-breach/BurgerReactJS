import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(error => dispatch(purchaseBurgerFail(error)))
    }
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.INIT_ORDERS
    }
};

export const getOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('orders.json')
        .then(response => {
            let fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    'id': key
                });
            }
            dispatch({
                type: actionTypes.SET_ORDERS,
                orders: fetchedOrders
            })
        })
        .catch(error => dispatch({
            type: actionTypes.SET_ORDERS,
            orders: null
        }))
    }
};