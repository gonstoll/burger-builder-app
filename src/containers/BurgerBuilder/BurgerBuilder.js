import React, { Component } from 'react';

import Aux from './../../hoc/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
	salad: 0.3,
	bacon: 0.7,
	cheese: 0.5,
	meat: 1.3,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4.99
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const updatedPrice = INGREDIENTS_PRICES[type] + this.state.totalPrice;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
    }

    removeIngredientHandler = type => {}

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;