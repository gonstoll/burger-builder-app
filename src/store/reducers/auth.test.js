import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
			token: null,
			userId: null,
			error: null,
			loading: false,
			redirectPath: '/',
		};
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should login with a token', () => {
        const authData = {
			idToken: 'token',
			localId: 'localId',
        };
        const action = {
			type: actionTypes.AUTH_SUCCESS,
			authData: { ...authData },
        };
        const expectedState = {
			...initialState,
			token: authData.idToken,
			userId: authData.localId,
		};
        expect(reducer(initialState, action)).toEqual(expectedState);
    });
});
