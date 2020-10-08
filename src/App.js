import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

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

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
			<Switch>
				<Route path="/auth" render={Auth} />
				<Route path="/" component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
        if (this.props.isAuth) {
            routes = (
				<Switch>
					<Route path="/checkout" render={Checkout} />
					<Route path="/orders" render={Orders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" render={Auth} />
					<Route path="/" component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			);
        }

        return (
            <Layout>
                {routes}
            </Layout>
		);
    }
}

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
