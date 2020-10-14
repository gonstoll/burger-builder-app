import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
};

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    };
};

const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return async dispatch => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post(`/orders.json?auth=${token}`, orderData);
            const orderId = response.data.name;
			dispatch(purchaseBurgerSuccess(orderId, orderData));
		} catch (error) {
			dispatch(purchaseBurgerFail(error));
		}
    };
};

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrders = (token, userId) => {
    return async dispatch => {
        dispatch(fetchOrdersStart());
        try {
            const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
            const request = await axios.get(`/orders.json?${queryParams}`);
            const fetchedOrders = request.data;
            const orders = [];
            for (const order in fetchedOrders) {
                orders.push({
                    ...fetchedOrders[order],
                    id: order
                });
            }
            dispatch(fetchOrdersSuccess(orders));
        } catch (error) {
            dispatch(fetchOrdersFail(error));
        }
    };
};
