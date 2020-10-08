import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    let authLink = <NavigationItem link="/auth">Authenticate</NavigationItem>;
    let ordersLink = null;
    if (props.isAuth) {
        ordersLink = <NavigationItem link="/orders">My Orders</NavigationItem>;
        authLink = <NavigationItem link="/logout">Logout</NavigationItem>;
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {ordersLink}
            {authLink}
        </ul>
    );
}

export default navigationItems;