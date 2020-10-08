import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    const ingredientsArray = Object.keys(props.ingredients);
    let ingredients = ingredientsArray
		.map(ingredient => {
            if (ingredient !== 'price') {
                return [...Array(props.ingredients[ingredient])].map((_, i) => {
                    return <BurgerIngredient key={ingredient + i} type={ingredient} />
                });
            }
            return ingredient;
		})
        .reduce((arr, el) => arr.concat(el), []);

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

burger.propTypes = {
    ingredients: PropTypes.object
};

export default burger;