import React from 'react';
import Form from '../Form';
//import './style.css';
import { useHistory, useParams } from 'react-router';
import api from '../../../services/api';



export default function ClientesNew() { 
    async function goNext(person) {
        let { doc } = params;
        let objectToSend = {
            ...person,
            docDep: doc,
            parenId: 1
        };
        await api.post('/dependentes', objectToSend);
        history.push('/clientes/detail/' + doc);
    }

    let params = useParams();
    let history = useHistory();


    /**
     * TODO
     * Criar funcionalidade para usuário escolher grau de parentesco do dependente
     * Adicionar select para com as opções de parentesco
     * Enviar id do parentesco na requisição post
     */
    return (
        <div>
            <h2>Novo Dependente</h2>
            <div className="main-view">
                <Form goBack={history.goBack} save={goNext} />
            </div>
        </div>
    )
}
