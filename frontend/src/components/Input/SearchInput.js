import React from 'react';

export default function SearchInput(props) {
    return <input 
        value={props.value}
        onChange={props.onChange}
        type="search"
        className="search-input"
        placeholder={props.placeholder || 'Pesquisar'} />
}