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
            setNextFunction('newDependente');
        },

        saveDependente(person) {
            setDependentes([...dependentes, person]);
            setMode(1);
            setNextFunction('newDependente');
        },

        newDependente() {
            setMode(0);
            setNextFunction('saveDependente');
        }
    };


    let backFunctions = {
        backToListing() {

        },

        backToMain() {
            setMode(0);
            setNextFunction('saveDependente');
        }
    };

    
    let [mode, setMode] = useState(0);
    let [cliente, setCliente] = useState({});
    let [dependentes, setDependentes] = useState([]);
    let [nextFunction, setNextFunction] = useState('saveClient');
    let [backFunction, setBackFunction] = usestate('backToListing');
    let goNext = nextFunctions[nextFunction];

    let modes = [
        <ClientesForm goBack={goBack} save={goNext} />,
        <div>
            <div className="view-body">
                <PersonSection person={cliente}/>

                <div className="children-inline">
                    <h3>Dependentes</h3>
                    <DefaultButton onClick={goNext} icon={plusItemGreen} />
                </div>
                {dependentes.map((dependente, index) => (
                    <PersonSection key={index} person={dependente} />
                ))}
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