import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyCcUzmP42rsup9vmFfKr4jYCdfo_wn2hBo';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkTokenTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
			email: email,
			password: password,
			returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if (!isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        try {
            const request = await axios.post(url, authData);
            const expirationDate = new Date(new Date().getTime() + request.data.expiresIn * 1000);
            localStorage.setItem('token', request.data.idToken);
            localStorage.setItem('userId', request.data.localId);
            localStorage.setItem('expirationTime', expirationDate);
            dispatch(authSuccess(request.data));
            dispatch(checkTokenTimeout(request.data.expiresIn))
        } catch (error) {
            dispatch(authFail(error.response.data.error));
        }
    };
};

export const authSetRedirectPath = path => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime <= new Date()) {
                dispatch(logout());
            } else {
                const authData = {
                    idToken: token,
                    localId: localStorage.getItem('userId'),
                    expiresIn: expirationTime
                };
                const expirationCalculation = (expirationTime.getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(authData));
                dispatch(checkTokenTimeout(expirationCalculation));
            }
        }
    };
};