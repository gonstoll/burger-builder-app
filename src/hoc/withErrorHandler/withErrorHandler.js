import React, { useState, useEffect } from 'react';

import Aux from './../Aux/Aux';
import Modal from './../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [ error, setError ] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(req => req, error => {
            setError(error);
        });

        // componentWillUnmount
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmHandler = () => setError(null);

        return (
            <Aux>
                {error && (
                    <Modal
                        show={error}
                        closeModal={errorConfirmHandler}>
                        {error ? error.message : null}
                    </Modal>
                )}
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;
