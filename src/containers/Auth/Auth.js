import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// Shared
import checkValidity from '../../shared/validation';

// Components
import FormField from '../../components/UI/Form/FormField/FormField';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

// Styles
import classes from './Auth.module.css';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'mail',
					placeholder: 'Email address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
        },
        isSignup: true
    };

    componentDidMount() {
        if (!this.props.building) {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        });
    };

	render() {
        const formFieldsArray = [];
		for (const key in this.state.controls) {
			formFieldsArray.push({
				id: key,
				config: this.state.controls[key],
			});
        }
        let form = formFieldsArray.map(formField => (
			<FormField
				key={formField.id}
				elementType={formField.config.elementType}
				elementConfig={formField.config.elementConfig}
				value={formField.config.value}
				shouldValidate={formField.config.validation}
				touched={formField.config.touched}
				invalid={!formField.config.valid}
				change={event => this.onChangeHandler(event, formField.id)} />
        ));
        if (this.props.loading) form = <Spinner />;

        let errorMessage = null;
        if (this.props.error) errorMessage = <p>{this.props.error.message}</p>;

        let redirect = null;
        if (this.props.isAuth) {
            redirect = <Redirect to={this.props.redirectPath} />
        }

		return (
			<div className={classes.Auth}>
                {redirect}
                {errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
                <Button
                    click={this.switchAuthModeHandler}
                    btnType="Danger">
                    SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.redirectPath,
        building: state.burgerBuilder.building
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: path => dispatch(actions.authSetRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
