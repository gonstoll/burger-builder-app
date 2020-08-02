import React from 'react';

import classes from './Toggler.module.css';

const toggler = props => (
    <div className={classes.Toggler} onClick={props.click}>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default toggler;