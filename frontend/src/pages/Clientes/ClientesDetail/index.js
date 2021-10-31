import React, {useEffect, useState} from 'react';
import { DefaultButton, MutedButton } from '../../../components/Button';
import './style.css';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';

import editIcon from '../../../assets/edit-blue.svg';
import plusItemGreen from '../../../assets/plus-item-green.svg';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';


function PersonSection(props) {
            
    let { nome, doc, nasc, logra} = props.person;
    return (
        <div className="person-section">
            <div className="header children-inline">
                <b>{nome}</b>
                <div>{doc}</div>
                <DefaultButton onClick={props.onClick} icon={editIcon} />
            </div>
            <div className="address">
                {logra}, {'numResidencia'}
            </div>
            <div className="birthdate">
                {moment(nasc).format('DD/MM/YYYY')}
            </div>
        </div>
    );
}

export default function ClientesDetail() {

    function goToListing() {
        history.push('/clientes');
    }

    function goToNewDependente()  {
        let {doc} = params;
        history.push('/dependentes/novo/' + doc);
    }

    let [person, setPerson] = useState({});
    let [dependentes, setDependentes] = useState([]);
    let history = useHistory();
    let params = useParams();

    useEffect(() => {
        let {doc} = params;
        let populate = (path, setFunction) => {
            api.get(path + doc)
            .then(({data}) => setFunction(data));
        }
        populate('/clientes/', setPerson);
        populate('/dependentes/', setDependentes);
    }, []);
    
    return (
        <div>
            <h2>Editar Cliente</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={goToListing}/>
                    <PersonSection person={person} />
                    <div className="children-inline">
                        <h3>
                            Dependentes
                        </h3>
                        <DefaultButton icon={plusItemGreen} onClick={goToNewDependente} />
                    </div>

                    {dependentes.map(dependente => (
                        <PersonSection key={dependente.doc} person={dependente} />
                    ))}
                </div>
            </div>
        </div>
    );
}