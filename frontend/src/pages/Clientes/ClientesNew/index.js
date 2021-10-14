import React, {useEffect, useState} from 'react';
import Form from '../Form';
//import './style.css';
import { useHistory } from 'react-router';
import api from '../../../services/api';



export default function ClientesNew() { 
    async function goNext(person) {
        await api.post('/clientes', person);
        history.push('/clientes');
    }

    let history = useHistory();

    return (
        <div>
            <h2>Novo Cliente</h2>
            <div className="main-view">
                <Form goBack={history.goBack} save={goNext} />
            </div>
        </div>
    )
}