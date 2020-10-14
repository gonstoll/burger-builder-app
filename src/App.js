import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Components
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';
const LazyCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const LazyOrders = React.lazy(() => import('./containers/Orders/Orders'));
const LazyAuth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = () => (
    <Suspense fallback={<Spinner />}>
        <LazyCheckout />
    </Suspense>
);
const Orders = () => (
    <Suspense fallback={<Spinner />}>
        <LazyOrders />
    </Suspense>
);
const Auth = () => (
    <Suspense fallback={<Spinner />}>
        <LazyAuth />
    </Suspense>
);

const App = props => {
    const { onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = (
		<AnimatedSwitch
			atEnter={{ opacity: 0 }}
			atLeave={{ opacity: 0 }}
			atActive={{ opacity: 1 }}
			className="route-wrapper">
			<Route path="/auth" render={Auth} />
			<Route path="/" component={BurgerBuilder} />
			<Redirect to="/" />
		</AnimatedSwitch>
	);
    if (props.isAuth) {
        routes = (
			<AnimatedSwitch
				atEnter={{ opacity: 0 }}
				atLeave={{ opacity: 0 }}
				atActive={{ opacity: 1 }}
				className="route-wrapper">
				<Route path="/checkout" render={Checkout} />
				<Route path="/orders" render={Orders} />
				<Route path="/logout" component={Logout} />
				<Route path="/auth" render={Auth} />
				<Route path="/" component={BurgerBuilder} />
				<Redirect to="/" />
			</AnimatedSwitch>
		);
    }

    return (
        <Layout>
            {routes}
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.checkAuthState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
