import React from 'react';
import './style.css';

function Button(props) {
    return (
        <button 
            type={props.type || 'button'}
            disabled={props.disabled} 
            className={props.className + ' button'}
            onClick={props.onClick}>
            <img src={props.icon} />
        </button>
    );
}

export function SuccessButton(props) {
    return <Button 
            type={props.type}
            className="success" 
            disabled={props.disabled} 
            icon={props.icon}
            onClick={props.onClick} 
            />
}

export function PrimaryButton(props) {
    return <Button 
            type={props.type}
            className="primary" 
            disabled={props.disabled}  
            icon={props.icon} 
            onClick={props.onClick}/>;
}


export function MutedButton(props) {
    return <Button 
            type={props.type}
            className="muted" 
            disabled={props.disabled}  
            icon={props.icon} 
            onClick={props.onClick}/>;
}


export function DefaultButton(props) {
    return <Button 
            type={props.type}
            className="default" 
            disabled={props.disabled}  
            icon={props.icon} 
            onClick={props.onClick}/>;
}
