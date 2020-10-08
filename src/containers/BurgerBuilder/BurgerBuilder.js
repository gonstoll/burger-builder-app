import React, { Component } from 'react';
import axios from '../../axios-orders';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Aux from './../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/Order/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';

export class BurgerBuilder extends Component {
	state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

	updatePurchasableState(ingredients) {
		const sum = Object.keys(ingredients) // ['salad', 'bacon', 'cheese', 'meat']
			.map(ing => ingredients[ing]) // [0, 0, 0, 0]
			.reduce((sum, el) => sum + el, 0); // [0]
		return sum > 0;
	}

	purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => this.setState({ purchasing: false })

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

	render() {
		const ingredients = { ...this.props.ingredients };
		for (const key in ingredients) {
			ingredients[key] = ingredients[key] <= 0; // True if < or = 0, false if > 0
        }

        let orderSummary = null;
        let burgerAndBuildControls = <Spinner />;

        if (this.props.error) {
            burgerAndBuildControls = <p>Something went wrong!</p>;
        }
        if (this.props.ingredients) {
            burgerAndBuildControls = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						price={this.props.totalPrice}
						addIngredient={this.props.onIngredientAdded}
						removeIngredient={this.props.onIngredientRemoved}
						disabled={ingredients}
                        orderNow={this.purchaseHandler}
                        isAuth={this.props.isAuth}
						purchasable={this.updatePurchasableState(this.props.ingredients)} />
				</Aux>
            );
            orderSummary = (
				<OrderSummary
					cancelPurchase={this.purchaseCancelHandler}
					continuePurchase={this.purchaseContinueHandler}
					price={this.props.totalPrice}
					ingredients={this.props.ingredients} />
			);
        }

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					closeModal={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
                {burgerAndBuildControls}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.getIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
        onSetAuthRedirectPath: path => dispatch(actions.authSetRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
