import React from 'react';
import { DefaultButton } from '../Button';
import { TextWithLabel } from '.';

export default function SelectWithSideValue(props) {
    let { itemButton, sideLabel, sideValue, onSideValueChange } = props;
    return (
        <div className="select-with-side-value">
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
            <TextWithLabel
                label={sideLabel}
                value={sideValue} 
                onChange={onSideValueChange} />
        </div>
    );
}