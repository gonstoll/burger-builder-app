import React from 'react';

import classes from './Modal.module.css';
import Aux from './../../../hoc/Aux';
import Backdrop from './../Backdrop/Backdrop';

const modal = props => {
    const modalClasses = [classes.Modal];
    if (props.show) {
        modalClasses.push(classes.Show);
    } else {
        modalClasses.push(classes.Hide);
    }

    return (
        <Aux>
            <div className={modalClasses.join(' ')}>
                {props.children}
            </div>
            <Backdrop show={props.show} click={props.closeModal} />
        </Aux>
    );
};

export default modal;