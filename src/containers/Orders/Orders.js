import React, { useEffect, useCallback } from 'react';
import axios from '../../axios-orders';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import SingleOrder from '../../components/Burger/Order/SingleOrder/SingleOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = props => {
    // State
    const orders = useSelector(state => state.order.orders);
    const loading = useSelector(state => state.order.loading);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);

    // Dispatch
    const dispatch = useDispatch();
    const onFetchOrders = useCallback((token, userId) => dispatch(actions.fetchOrders(token, userId)), [dispatch]);

    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);

    let ordersEl = <Spinner />
    if (!loading) {
        ordersEl = orders.map(order => {
            return <SingleOrder key={order.id} ingredients={order.ingredients} price={+order.price} />;
        });
    }

    return ordersEl;
}

export default withErrorHandler(Orders, axios);
