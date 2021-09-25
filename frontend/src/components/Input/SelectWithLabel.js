import React from 'react';
import { DefaultButton } from '../Button';

export default function SelectWithLabel(props) {

    let { itemButton } = props;

    return (
        <div className="select-with-label">
            <div className="children-inline">
                <label>{props.label}</label>
                <DefaultButton 
                    onClick={itemButton?.onClick} 
                    icon={itemButton?.src} />
            </div>

            <select onChange={props.onChange} disabled={props.disabled}>
                {props.children}
            </select>
            <p className="validation-message">
                {props.validationMessage}
            </p>
        </div>
    );
}