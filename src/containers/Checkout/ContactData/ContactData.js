import React, { useState } from 'react';
import axios from '../../../axios-orders';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { purchaseBurger } from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

// Shared
import checkValidity from '../../../shared/validation';

// Components
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import FormField from '../../../components/UI/Form/FormField/FormField';

// Styles
import classes from './ContactData.module.css';

const ContactData = props => {
    // State
    const [ orderForm, setOrderForm ] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your street',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your ZIP code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'mail',
                placeholder: 'Your E-mail',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ],
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });
    const [ isFormValid, setIsFormValid ] = useState(false);

    // Redux state
    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const loading = useSelector(state => state.order.loading);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);

    // Redux dispatch
    const dispatch = useDispatch();
    const onOrderCreated = (order, token) => dispatch(purchaseBurger(order, token));

	const orderHandler = async event => {
		event.preventDefault();
        const orderData = {};
        for (const formElId in orderForm) {
            orderData[formElId] = orderForm[formElId].value;
        }
		const order = {
            userId: userId,
			ingredients: ingredients,
            price: totalPrice,
            orderData
		};
		onOrderCreated(order, token);
    };

    const onChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isFormValid = true;
        for (const inputIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
        }
        setOrderForm(updatedOrderForm);
        setIsFormValid(isFormValid);
    };

    const formFieldsArray = [];
    for (const key in orderForm) {
        formFieldsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = <Spinner />;
    if (!loading) {
        form = (
            <form onSubmit={orderHandler}>
                {formFieldsArray.map(formField => (
                    <FormField
                        key={formField.id}
                        elementType={formField.config.elementType}
                        elementConfig={formField.config.elementConfig}
                        value={formField.config.value}
                        shouldValidate={formField.config.validation}
                        touched={formField.config.touched}
                        invalid={!formField.config.valid}
                        change={(event) => onChangeHandler(event, formField.id)} />
                ))}
                <Button btnType="Success" disabled={!isFormValid}>ORDER NOW</Button>
            </form>
        );
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

export default withErrorHandler(ContactData, axios);
