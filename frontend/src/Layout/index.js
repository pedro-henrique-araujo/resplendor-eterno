import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import boxIcon from '../assets/box.svg';
import packageIcon from '../assets/package.svg';

function HeaderLogo() {
    return (
        <div className="header-logo">
            <h1>Logo</h1>
            <h2>Dashboard</h2>
        </div>
    );
}

function MenuOption(props) {
    return (
        <Link to={props.to}>
            <div className="menu-option">
                <img src={props.src} />
                <span className="option-text">{props.text}</span>
            </div>                    
        </Link>
    );
}

export default function Layout(props) {
    return (
        <div className="layout-container">
            <div className="side-bar">
                <HeaderLogo/>
                <div className="menu">
                    <MenuOption to="/produtos" src={boxIcon} text="Produtos"/>
                    <MenuOption to="/planos" src={packageIcon} text="Planos"/>
                </div>
            </div>
            <main>
                {props.children}
            </main>
        </div>
    );
}