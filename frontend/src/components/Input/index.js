
import React, { useState } from 'react';
import './style.css';

export function SearchInput(props) {
    return <input 
        value={props.value}
        onChange={props.onChange}
        type="search" 
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