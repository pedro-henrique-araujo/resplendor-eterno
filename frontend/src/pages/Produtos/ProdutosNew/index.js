import React, { useEffect, useState } from 'react';
import { MutedButton, PrimaryButton } from '../../../components/Button';
import { SelectWithLabel, TextWithLabel} from '../../../components/Input';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import saveIcon from '../../../assets/save.svg';


function useForm() {
    let [descr, setDescr] = useState('');
    let [descrError, setDescrError] = useState('');
    let [fornDoc, setFornDoc] = useState('0');
    let [fornDocError, setFornDocError] = useState('');
    let [precEn, setPrecEn] = useState('');
    let [precEnError, setPrecEnError] = useState('');
    let [precSa, setPrecSa] = useState('');
    let [precSaError, setPrecSaError] = useState('');
    let [esto, setEsto] = useState('');
    let [estoError, setEstoError] = useState('');

    
    function validateDescr() {    
        let message = '';
        if (descr.length > 255) {
            message = "Este campo deve ter no máximo 255 caractéres";
        }

        if (descr.length < 3) {
            message = "Este campo deve ter no mínimo 3 caractéres";
        }

        if (descr.length == 0)
            message = 'Campo obrigatório';
        setDescrError(message);
        return message;
    }

    function validateFornDoc() {
        let message = '';
        if (fornDoc == "0")
            message = 'Selecione uma opção';
        setFornDocError(message);
        return message;
    }

    function validatePrecEn() {
        let message = '';
        let precEnAsNumber = Number(precEn);
        let isNaN = Number.isNaN(precEnAsNumber);
        if (isNaN) {
            message  = 'Este campo deve corresponder a um valor financeiro';
        }

        if (precEn.length == 0)
            message = 'Campo obrigatório';
    
        setPrecEnError(message);
        return message;
    }

    function validatePrecSa() {
        let message = ''; 
        let precSaAsNumber = Number(precSa);
        let isNaN = Number.isNaN(precSaAsNumber);
        if (isNaN) {
            message  = 'Este campo deve corresponder a um valor financeiro';
        }
        if (precSa.length == 0)
            message = 'Campo obrigatório';
    
        setPrecSaError(message);
        return message;
    }

    function validateEsto() {
        let message = '';
        let estoAsNumber = Number(esto);
        let isNaN = Number.isNaN(estoAsNumber);
        if (isNaN || esto.match(/[.,]/g) != null) {
            message  = 'Este campo deve corresponder a um número inteiro';
        }

        if (esto.length == 0)
            message = 'Campo obrigatório';
    
        setEstoError(message);
        return message;
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let descrIsValid = validate(validateDescr);
        let fornDocIsValid = validate(validateFornDoc);
        let precEnIsValid = validate(validatePrecEn);
        let precSaIsValid = validate(validatePrecSa);
        let estoIsValid = validate(validateEsto);
        if (descrIsValid && fornDocIsValid && precEnIsValid && precSaIsValid && estoIsValid) 
            postValidationCallback(event);
    }

    return {
        descr,
        setDescr,
        descrError,
        fornDoc,
        setFornDoc,
        fornDocError,
        precEn,
        setPrecEn,
        precEnError,
        precSa,
        setPrecSa,
        precSaError,
        esto,
        setEsto,
        estoError,
        handleSubmit
    };
}


export default function ProdutosNew() { 
    async function submit() {
        let { descr, fornDoc, precEn, precSa, esto } = form;
        await api.post('/produtos', { descr, fornDoc, precEn, precSa, esto });
        history.push('/produtos');
    }

    function fillFornecedores(data) {
        setFornecedores(data);
    }

    useEffect(() => {
        api.get('/fornecedores/options')
        .then(result => fillFornecedores(result.data));
    }, []);

    let form = useForm();
    let [fornecedores, setFornecedores] = useState([]);
    let history = useHistory();

    return (
        <div>
            <h2>Formulario</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={history.goBack}/>
                    <form onSubmit={event => form.handleSubmit(event, submit)}>
                        <TextWithLabel
                                label="Descrição *" 
                                value={form.descr} 
                                onChange={event => form.setDescr(event.target.value)}
                                validationMessage={form.descrError}
                            />

                        <SelectWithLabel 
                            value={form.fornDoc} 
                            onChange={event => form.setFornDoc(event.target.value)}
                            validationMessage={form.fornDocError} 
                            label="Fornecedor *">
                            <option key="0" value="0">Selecione um opção...</option>
                           {fornecedores.map(fornecedor => (
                               <option key={fornecedor.doc} value={fornecedor.doc}>
                                   {fornecedor.razao}
                                </option>
                           ))}
                        </SelectWithLabel>

                        <TextWithLabel
                                label="Preço de entrada *" 
                                value={form.precEn} 
                                onChange={event => form.setPrecEn(event.target.value)}
                                validationMessage={form.precEnError}
                            />
                        

                        <TextWithLabel
                                label="Preço de saida *" 
                                value={form.precSa} 
                                onChange={event => form.setPrecSa(event.target.value)}
                                validationMessage={form.precSaError}
                            />

                        <TextWithLabel
                                label="Estoque *" 
                                value={form.esto} 
                                onChange={event => form.setEsto(event.target.value)}
                                validationMessage={form.estoError}
                            />
                       
                        <PrimaryButton icon={saveIcon} />
                    </form>
                </div>
            </div>
        </div>
    );
}