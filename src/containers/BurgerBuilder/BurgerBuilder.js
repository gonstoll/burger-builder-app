import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-orders';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

// Components
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Aux from './../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/Order/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';

export const BurgerBuilder = props => {
    // State
    const [ purchasing, setPurchasing ] = useState(false);

    // Redux state
    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => state.auth.token !== null);

    // Redux actions
    const dispatch = useDispatch();
    const onIngredientAdded = ingredientName => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = ingredientName => dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(() => dispatch(actions.getIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseBurgerInit());
    const onSetAuthRedirectPath = path => dispatch(actions.authSetRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

	const updatePurchasableState = ingredients => {
		const sum = Object.keys(ingredients) // ['salad', 'bacon', 'cheese', 'meat']
			.map(ing => ingredients[ing]) // [0, 0, 0, 0]
			.reduce((sum, el) => sum + el, 0); // [0]
		return sum > 0;
	};

	const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => setPurchasing(false);

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const ingredientsAmount = { ...ingredients };
    for (const key in ingredientsAmount) {
		ingredientsAmount[key] = ingredientsAmount[key] <= 0; // True if < or = 0, false if > 0
	}

    let orderSummary = null;
    let burgerAndBuildControls = <Spinner />;

    if (error) {
        burgerAndBuildControls = <p>Something went wrong!</p>;
    }
    if (ingredients) {
		burgerAndBuildControls = (
			<Aux>
				<Burger ingredients={ingredients} />
				<BuildControls
					price={totalPrice}
					addIngredient={onIngredientAdded}
					removeIngredient={onIngredientRemoved}
					disabled={ingredientsAmount}
					orderNow={purchaseHandler}
					isAuth={isAuth}
					purchasable={updatePurchasableState(ingredients)} />
			</Aux>
		);
		orderSummary = (
			<OrderSummary
				cancelPurchase={purchaseCancelHandler}
				continuePurchase={purchaseContinueHandler}
				price={totalPrice}
				ingredients={ingredients} />
		);
	}

    return (
        <Aux>
            <Modal
                show={purchasing}
                closeModal={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burgerAndBuildControls}
        </Aux>
    );
};

export default withErrorHandler(BurgerBuilder, axios);
