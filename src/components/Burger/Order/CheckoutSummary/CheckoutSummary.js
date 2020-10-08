import React from 'react';

// Components
import Burger from '../../Burger';
import Button from '../../../UI/Button/Button';

// Styles
import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!</h1>
			<div className={classes.BurgerHolder}>
				<Burger ingredients={props.ingredients} />
				<Button btnType="Danger" click={props.checkoutCancelled}>CANCEL</Button>
				<Button btnType="Success" click={props.checkoutContinued}>CONTINUE</Button>
			</div>
		</div>
	);
}

export default checkoutSummary;