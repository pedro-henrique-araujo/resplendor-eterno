import React, {useEffect, useState} from 'react';
import { DefaultButton } from '../../../components/Button';
import ClientesForm from '../ClientesForm';
import './style.css';


import editIcon from '../../../assets/edit-blue.svg';
import plusItemGreen from '../../../assets/plus-item-green.svg';

function PersonSection(props) {
    return (
            <div className="person-section">
                <div className="header children-inline">
                    <b>{'nome'}</b>
                    <div>{'doc'}</div>
                    <DefaultButton onClick={() => {}} icon={'editIcon'} />
                </div>
                <div className="address">
                    {'rua'}, {'numResidencia'}
                </div>
                <div className="birthdate">
                    {'birthDate'}
                </div>
            </div>
        );
    // let { nome, doc, birthDate, enderecos} = props.person;
    // let {rua, numResidencia } = enderecos[0];
    // return (
    //     <div className="person-section">
    //         <div className="header children-inline">
    //             <b>{nome}</b>
    //             <div>{doc}</div>
    //             <DefaultButton onClick={() => {}} icon={editIcon} />
    //         </div>
    //         <div className="address">
    //             {rua}, {numResidencia}
    //         </div>
    //         <div className="birthdate">
    //             {birthDate}
    //         </div>
    //     </div>
    // );
}


export default function ClientesNew() {
    
    function saveClient(person) {
        setCliente(person);
        console.log('mode', mode);
        setMode(1);
    }
    
    function saveDependente(person) {

    }
    
    
    function goAddDependent() {
        setSave(saveDependente);
        setMode(0);
    }
    
    let [mode, setMode] = useState(0);
    let [cliente, setCliente] = useState({
        nome: '',

    });
    let [dependentes, setDependentes] = useState([]);
    let [save, setSave] = useState(() => {});

    useEffect(() => { 
        setSave(saveClient);
     }, []);


    let modes = [
        <ClientesForm save={save} />,
        <div>
            <div className="view-body">
                <PersonSection person={{nome: ''}}/>

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