
import React from 'react';
import { DefaultButton } from '../Button';
import './style.css';

export function SearchInput(props) {
    return <input 
        value={props.value}
        onChange={props.onChange}
        type="search"
        className="search-input"
        placeholder={props.placeholder || 'Pesquisar'} />
}

export function TextWithLabel(props) { 

    return (
        <div className="input-with-label">
            <label>{props.label}</label>
            <input
                disabled={props.disabled}
                value={props.value}                
                onChange={props.onChange}
                />
            <p className="validation-message">
                {props.validationMessage}
            </p>
        </div>
    );
}

export function SelectWithLabel(props) {

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