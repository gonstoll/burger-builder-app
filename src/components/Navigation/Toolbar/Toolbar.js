import React from 'react';

import classes from './Toolbar.module.css';
import Toggler from './Toggler/Toggler';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';

const toolbar = props => (
	<header className={classes.Toolbar}>
		<div className={classes.Toggler}>
			<Toggler click={props.toggleSideDrawer} />
		</div>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav>
			<NavigationItems isAuth={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;