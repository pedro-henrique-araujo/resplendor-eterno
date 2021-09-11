import React, { useEffect, useState } from 'react';
import { MutedButton, PrimaryButton } from '../../../components/Button';
import { TextWithLabel} from '../../../components/Input';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import saveIcon from '../../../assets/save.svg';


function useForm() {
    let [razao, setRazao] = useState('');
    let [razaoError, setRazaoError] = useState('');
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
        let razaoIsValid = validate(validateRazao);
        if (razaoIsValid) postValidationCallback(event);
    }

    return {
        razao,
        setRazao,
        razaoError,
        handleSubmit
    };
}


export default function FornecedoresEdit() { 
    async function submit() {
        let { razao } = form;
        await api.put('/fornecedores/' + params.doc, { razao });
        history.push('/fornecedores');
    }

    function fillFields(data) {
        let { razao } = data;
        form.setRazao(razao);
    }


    useEffect(() => {
        api.get('/fornecedores/' + params.doc)
        .then(result => fillFields(result.data));
    }, []);

    let form = useForm();

    let params = useParams();

    let history = useHistory();

    return (
        <div>
            <h2>Editar Fornecedor</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={history.goBack}/>
                    <form onSubmit={event => form.handleSubmit(event, submit)}>                      
                        
                        <TextWithLabel 
                            disabled
                            label="CNPJ"
                            value={params.doc}
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