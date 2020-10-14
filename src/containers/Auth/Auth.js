import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

// Shared
import checkValidity from '../../shared/validation';

// Components
import FormField from '../../components/UI/Form/FormField/FormField';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

// Styles
import classes from './Auth.module.css';

const Auth = props => {
    // State
    const [ controls, setControls ] = useState({
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
    });
    const [ isSignup, setIsSignup ] = useState(true);

    // Redux state
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuth = useSelector(state => state.auth.token !== null);
    const redirectPath = useSelector(state => state.auth.redirectPath);
    const building = useSelector(state => state.burgerBuilder.building);

    // Redux actions
    const dispatch = useDispatch();
    const onAuth = (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup));
    const onSetAuthRedirectPath = useCallback(path => dispatch(actions.authSetRedirectPath(path)), [dispatch]);

    useEffect(() => {
        if (!building) {
            onSetAuthRedirectPath('/');
        }
    }, [building, onSetAuthRedirectPath]);

    const onChangeHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...controls,
            [inputIdentifier]: {
                ...controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputIdentifier].validation),
                touched: true
            }
        };
        setControls(updatedControls);
    };

    const submitHandler = event => {
        event.preventDefault();
        onAuth(controls.email.value, controls.password.value, isSignup);
    };

    const switchAuthModeHandler = () => setIsSignup(prevState => !prevState);

    const formFieldsArray = [];
    for (const key in controls) {
        formFieldsArray.push({
            id: key,
            config: controls[key],
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
            change={event => onChangeHandler(event, formField.id)} />
    ));
    if (loading) form = <Spinner />;

    let errorMessage = null;
    if (error) errorMessage = <p>{error.message}</p>;

    let redirect = null;
    if (isAuth) {
        redirect = <Redirect to={redirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {redirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                click={switchAuthModeHandler}
                btnType="Danger">
                SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
            </Button>
        </div>
    );
};

export default Auth;
