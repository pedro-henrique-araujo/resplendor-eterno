import React from 'react';
import './style.css';

function Button(props) {
    return (
        <button 
            disabled={props.disabled} 
            className={props.className + ' button'}
            onClick={props.onClick}>
            <img src={props.icon} />
        </button>
    );
}

export function SuccessButton(props) {
    return <Button 
            className="success" 
            disabled={props.disabled} 
            icon={props.icon}
            onClick={props.onClick} 
            />
}

export function PrimaryButton(props) {
    return <Button 
            className="primary" 
            disabled={props.disabled}  
            icon={props.icon} 
            onClick={props.onClick}/>;
}


export function MutedButton(props) {
    return <Button 
            className="muted" 
            disabled={props.disabled}  
            icon={props.icon} 
            onClick={props.onClick}/>;
}


export function DefaultButton(props) {
    return <Button 
            className="default" 
            disabled={props.disabled}  
            icon={props.icon} 
            onClick={props.onClick}/>;
}
