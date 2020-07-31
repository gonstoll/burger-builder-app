import React from 'react';

import Aux from './../../../hoc/Aux';
import Button from './../../UI/Button/Button';

const orderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients).map(ing => (
		<li key={ing}>
			<span>{ing}:</span> {props.ingredients[ing]}
		</li>
	));

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <b>Total price: $ {props.price.toFixed(2)}</b>
            <p>Proceed to checkout?</p>
            <Button btnType="Danger" click={props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" click={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;