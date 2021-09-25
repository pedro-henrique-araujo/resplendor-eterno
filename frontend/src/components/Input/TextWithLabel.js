import React from 'react';

export default function TextWithLabel(props) { 
    let { label, validationMessage, ...inputProps } = props;
    return (
        <div className="input-with-label">
            <label>{props.label}</label>
            <input {...inputProps }/>
            <p className="validation-message">
                {props.validationMessage}
            </p>
        </div>
    );
}