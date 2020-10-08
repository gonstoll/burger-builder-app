import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    toggleSideDrawerHandler = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render() {
        return (
			<Aux>
				<Toolbar
                    isAuth={this.props.isAuth}
                    toggleSideDrawer={this.toggleSideDrawerHandler} />
				<SideDrawer
                    isAuth={this.props.isAuth}
                    showBackdrop={this.state.showSideDrawer}
                    toggleSideDrawer={this.toggleSideDrawerHandler} />
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);