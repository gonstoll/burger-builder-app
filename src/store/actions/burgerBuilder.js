import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = name => {
    return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const getIngredients = () => {
    return async dispatch => {
        try {
            const request = await axios.get('https://react-burger-builder-4276d.firebaseio.com/ingredients.json');
            const ingredients = request.data;
            dispatch(setIngredients(ingredients));
        } catch(error) {
            dispatch(fetchIngredientsFailed());
        }
    };
};