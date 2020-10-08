import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from './../../../hoc/Aux/Aux';
import Backdrop from './../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        const modalClasses = [classes.Modal];
		if (this.props.show) {
			modalClasses.push(classes.Show);
		} else {
			modalClasses.push(classes.Hide);
        }

        return (
            <Aux>
                <div className={modalClasses.join(' ')}>
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} click={this.props.closeModal} />
            </Aux>
        );
    }
}

export default Modal;