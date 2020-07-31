import React from 'react';

import Aux from './../../../hoc/Aux';

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
            <p>Proceed to checkout?</p>
        </Aux>
    );
};

export default orderSummary;