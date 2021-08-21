
import React from 'react';
import './style.css';

export default function SearchInput(props) {
    return <input type="search" placeholder={props.placeholder || 'Pesquisar'} />
}