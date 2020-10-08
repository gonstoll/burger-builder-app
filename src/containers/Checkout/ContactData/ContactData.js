import React, { Component } from 'react';
import axios from '../../../axios-orders';

// Redux
import { connect } from 'react-redux';
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

class ContactData extends Component {
	state = {
		orderForm: {
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
        },
        isFormValid: false
	};

	orderHandler = async event => {
		event.preventDefault();
        const orderData = {};
        for (const formElId in this.state.orderForm) {
            orderData[formElId] = this.state.orderForm[formElId].value;
        }
		const order = {
            userId: this.props.userId,
			ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData
		};
		this.props.onOrderCreated(order, this.props.token);
    };

    onChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isFormValid = true;
        for (const inputIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            isFormValid
        });
    };

	render() {
        const formFieldsArray = [];
        for (const key in this.state.orderForm) {
            formFieldsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

		let form = <Spinner />;
		if (!this.props.loading) {
			form = (
				<form onSubmit={this.orderHandler}>
                    {formFieldsArray.map(formField => (
                        <FormField
                            key={formField.id}
                            elementType={formField.config.elementType}
                            elementConfig={formField.config.elementConfig}
                            value={formField.config.value}
                            shouldValidate={formField.config.validation}
                            touched={formField.config.touched}
                            invalid={!formField.config.valid}
                            change={(event) => this.onChangeHandler(event, formField.id)} />
                    ))}
					<Button btnType="Success" disabled={!this.state.isFormValid}>ORDER NOW</Button>
				</form>
			);
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderCreated: (order, token) => dispatch(purchaseBurger(order, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
