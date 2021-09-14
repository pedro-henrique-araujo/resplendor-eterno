import React, { useState } from 'react';
import { MutedButton, PrimaryButton } from '../../../components/Button';
import { TextWithLabel} from '../../../components/Input';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import saveIcon from '../../../assets/save.svg';


function useForm() {
    let [field1, setField1] = useState('');
    let [field1Error, setField1Error] = useState('');
    let [field2, setField2] = useState('');
    let [field2Error, setField2Error] = useState('');

    
    function validateField1() {    
        let message = '';
        if (field1.length == 0)
            message = 'Campo obrigatório';
        setField1Error(message);
        return message;
    }

    function validateField2() {
        let message = '';
        if (field2.length == 0)
            message = 'Campo obrigatório';
    
        setField2Error(message);
        return message;
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let docIsValid = validate(validateField1);
        let razaoIsValid = validate(validateField2);
        if (docIsValid && razaoIsValid) postValidationCallback(event);
    }

    return {
        field1,
        setField1,
        field1Error,
        field2,
        setField2,
        field2Error,
        handleSubmit
    };
}


export default function Form() { 
    async function submit() {
        let { field1, field2 } = form;
        await api.post('/create', { field1, field2 });
        history.push('/list');
    }

    let form = useForm();

    let history = useHistory();

    return (
        <div>
            <h2>Formulario</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={history.goBack}/>
                    <form onSubmit={event => form.handleSubmit(event, submit)}>
                        <TextWithLabel
                                label="Field 1 *" 
                                value={form.field1} 
                                onChange={event => form.setField1(event.target.value)}
                                validationMessage={form.field1Error}
                            />
                        <TextWithLabel
                                label="Field 2 *" 
                                value={form.field2} 
                                onChange={event => form.setField2(event.target.value)}
                                validationMessage={form.field2Error}
                            />
                       
                        <PrimaryButton icon={saveIcon} />
                    </form>
                </div>
            </div>
        </div>
    );
}