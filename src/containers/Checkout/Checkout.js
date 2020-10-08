import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Containers
import ContactData from './ContactData/ContactData';

// Components
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push(`${this.props.match.path}/contact-data`);
    }

	render() {
        let checkoutSummary = <Redirect to="/" />;
        if (this.props.ingredients && !this.props.purchased) {
            checkoutSummary = (
				<>
					<CheckoutSummary
						ingredients={this.props.ingredients}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler} />
					<Route
						path={`${this.props.match.path}/contact-data`}
						component={ContactData} />
				</>
			);
        }

		return checkoutSummary;
	}
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);