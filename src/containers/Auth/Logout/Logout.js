import React, { useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Logout = props => {
    // Redux actions
    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch]);

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/" />;
};

export default Logout;
