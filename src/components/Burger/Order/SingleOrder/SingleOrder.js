import React from 'react';

// Styles
import classes from './SingleOrder.module.css';

const singleOrder = props => {
    const ingredients = [];
    for (const ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ing => <span className={classes.Ingredient} key={ing.name}>{ing.name} ({ing.amount})</span>);

    return (
        <div className={classes.SingleOrder}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Total price: <b>USD {props.price.toFixed(2)}</b></p>
        </div>
    );
};

export default singleOrder;