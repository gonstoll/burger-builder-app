import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Containers
import ContactData from './ContactData/ContactData';

// Components
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props => {
    // State
    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const purchased = useSelector(state => state.order.purchased);

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.push(`${props.match.path}/contact-data`);
    };

    let checkoutSummary = <Redirect to="/" />;
    if (ingredients && !purchased) {
        checkoutSummary = (
            <>
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler} />
                <Route
                    path={`${props.match.path}/contact-data`}
                    component={ContactData} />
            </>
        );
    }

    return checkoutSummary;
};

export default withRouter(Checkout);
