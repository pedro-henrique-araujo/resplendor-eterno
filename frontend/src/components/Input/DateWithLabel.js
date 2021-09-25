import React from 'react';
import moment from 'moment';

export default function DateWithLabel(props) {
    const dateInputFormat = 'YYYY-MM-DD';
    const formatDate = value => moment(value).format(dateInputFormat);
    let value = formatDate(props.value);
    let max = formatDate(props.max);
    
    return(
        <div className="input-with-label">
            <label>{props.label}</label>
            <input
                type="date"
                disabled={props.disabled}
                value={value}
                max={max}                
                onChange={props.onChange}
                />
            <p className="validation-message">
                {props.validationMessage}
            </p>
        </div>
    );
}