import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from './../../Logo/Logo';
import Aux from './../../../hoc/Aux/Aux';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    const sideDrawerClasses = [classes.SideDrawer];
    if (props.showBackdrop) {
        sideDrawerClasses.push(classes.Open);
    } else {
        sideDrawerClasses.push(classes.Close);
    }

    return (
		<Aux>
            <Backdrop show={props.showBackdrop} click={props.toggleSideDrawer} />
			<div className={sideDrawerClasses.join(' ')} onClick={props.toggleSideDrawer}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={props.isAuth} />
				</nav>
			</div>
		</Aux>
	);
};

export default sideDrawer;