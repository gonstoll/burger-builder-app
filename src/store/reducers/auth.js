import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/'
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.authData.idToken,
        userId: action.authData.localId,
        error: null,
        loading: false
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: false
    };
};

const authSetRedirectPath = (state, action) => {
    return {
        ...state,
        redirectPath: action.path
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_SET_REDIRECT_PATH: return authSetRedirectPath(state, action);
        default: return state;
    }
};

export default reducer;