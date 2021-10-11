import React, {useEffect, useState} from 'react';
import { DefaultButton } from '../../../components/Button';
import ClientesForm from '../ClientesForm';
import './style.css';


import editIcon from '../../../assets/edit-blue.svg';
import plusItemGreen from '../../../assets/plus-item-green.svg';

function PersonSection(props) {    
            
    let { nome, doc, birthDate, enderecos} = props.person;
    console.log(props.person);
    let {rua, numResidencia } = enderecos[0];
    return (
        <div className="person-section">
            <div className="header children-inline">
                <b>{nome}</b>
                <div>{doc}</div>
                <DefaultButton onClick={() => {}} icon={editIcon} />
            </div>
            <div className="address">
                {rua}, {numResidencia}
            </div>
            <div className="birthdate">
                {birthDate}
            </div>
        </div>
    );
}


export default function ClientesNew() {
    
    let nextFunctions = {
        saveClient(person) {
            setCliente({...person});        
            setMode(1);
        },

        saveDependente(person) {
            setMode(1);
        }
    };

    function goSaveDependente() {
        setNextFunction('saveDependente');
    }
    
    let [mode, setMode] = useState(0);
    let [cliente, setCliente] = useState({});
    let [nextFunction, setNextFunction] = useState('saveClient');


    let modes = [
        <ClientesForm save={nextFunctions[nextFunction]} />,
        <div>
            <div className="view-body">
                <PersonSection person={cliente}/>

                <div className="children-inline">
                    <h3>Dependentes</h3>
                    <DefaultButton onClick={() => {}} icon={plusItemGreen} />
                </div>
                {/* {dependentes.map((dependente, index) => (
                    <PersonSection key={index} person={dependente} />
                ))} */}
            </div>
        </div>
    ];

    
    return (
        <div>
            <h2>Novo Cliente</h2>
            <div className="main-view">
                {modes[mode]}
            </div>
        </div>
    );
}