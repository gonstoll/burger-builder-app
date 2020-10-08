import React from 'react';

// Styles
import classes from './FormField.module.css';

const formField = props => {
    let errorMessage = null;
    if (props.invalid && props.touched) {
        errorMessage = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }
	const inputClasses = [classes.FieldElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />;
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />;
            break;
        case 'select':
            inputElement = (
				<select className={inputClasses.join(' ')} value={props.value} onChange={props.change}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change} />;
    }

    return (
        <div className={classes.Field}>
            <label className={classes.FieldLabel}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );
};

export default formField;