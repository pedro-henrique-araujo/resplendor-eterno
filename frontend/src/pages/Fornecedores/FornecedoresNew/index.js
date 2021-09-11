import React, { useState } from 'react';
import { MutedButton, PrimaryButton } from '../../../components/Button';
import { TextWithLabel} from '../../../components/Input';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import saveIcon from '../../../assets/save.svg';


function useForm() {
    let [doc, setDoc] = useState('');
    let [docError, setDocError] = useState('');
    let [razao, setRazao] = useState('');
    let [razaoError, setRazaoError] = useState('');

    
    function validateDoc() {    
        let message = '';
        if (!doc.match(/[0-9]{14}/g))
            message = 'Este campo deve conter somente números';
        if (doc.length != 14)
            message = `Este campo deve ter 14 caracteres. Você digitou ${doc.length}`;
        if (doc.length == 0)
            message = 'Campo obrigatório';
        setDocError(message);
        return message;
    }

    function validateRazao() {
        let message = '';
        if (razao.length > 255) 
            message = 'Este campo deve conter no máximo 255 caracteres'; 
        if (razao.length < 3)
                message = 'Este campo deve conter no mínimo 3 carateres';
        if (razao.length == 0)
            message = 'Campo obrigatório';
    
        setRazaoError(message);
        return message;
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let docIsValid = validate(validateDoc);
        let razaoIsValid = validate(validateRazao);
        if (docIsValid && razaoIsValid) postValidationCallback(event);
    }

    return {
        doc,
        setDoc,
        docError,
        razao,
        setRazao,
        razaoError,
        handleSubmit
    };
}


export default function FornecedoresNew() { 
    async function submit() {
        let { doc, razao } = form;
        await api.post('/fornecedores', { doc, razao });
        history.push('/fornecedores');
    }

    let form = useForm();

    let history = useHistory();

    return (
        <div>
            <h2>Novo Fornecedor</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={history.goBack}/>
                    <form onSubmit={event => form.handleSubmit(event, submit)}>
                        <TextWithLabel
                                label="CNPJ *" 
                                value={form.doc} 
                                onChange={event => form.setDoc(event.target.value)}
                                validationMessage={form.docError}
                            />

                        <TextWithLabel 
                                label="Razão Social *" 
                                value={form.razao} 
                                onChange={event => form.setRazao(event.target.value)}
                                validationMessage={form.razaoError}
                            />

                        <PrimaryButton icon={saveIcon} />
                    </form>
                </div>
            </div>
        </div>
    );
}