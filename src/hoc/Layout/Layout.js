import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [ showSideDrawer, setShowSideDrawer ] = useState(false);

    const toggleSideDrawerHandler = () => {
        setShowSideDrawer(prevState => !prevState);
    };

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuth}
                toggleSideDrawer={toggleSideDrawerHandler} />
            <SideDrawer
                isAuth={props.isAuth}
                showBackdrop={showSideDrawer}
                toggleSideDrawer={toggleSideDrawerHandler} />
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
