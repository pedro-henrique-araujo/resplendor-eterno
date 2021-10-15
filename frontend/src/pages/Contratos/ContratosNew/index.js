import React, { useEffect, useState } from 'react';
import { MutedButton, PrimaryButton } from '../../../components/Button';
import { SelectWithLabel, DateWithLabel} from '../../../components/Input';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import saveIcon from '../../../assets/save.svg';
import './style.css';

function useForm() {
    let [clientes, setClientes] = useState([]);
    let [clienteDoc, setClienteDoc] = useState('0');
    let [clienteDocError, setClienteDocError] = useState('');
    let [planos, setPlanos] = useState([]);
    let [planoId, setPlanoId] = useState('0');
    let [planoIdError, setPlanoIdError] = useState('');
    let [vencimento, setVencimento] = useState('');
    let [vencimentoError, setVencimentoError] = useState('');
    let [dependentes, setDependentes] = useState([]);
    
    function updateDependentesOptions(options) {
        setDependentes(options.map(option => ({
            selected: true,
            option: option
        })));
    }

    function toggleDependenteOption(doc) {
        let dependente = dependentes.filter(({option}) => option.doc == doc)[0];
        dependente.selected = !dependente.selected;
        setDependentes([...dependentes]);
    }

    function validateRequiredSelect(value, setError) {
        let message = '';
        if (value == '0')
            message = 'Selecione uma opção...';
        setError(message);
        return message;
    }

    function validateClienteDoc() {    
        return validateRequiredSelect(clienteDoc, setClienteDocError);
    }

    function validatePlanoId() {
        return validateRequiredSelect(planoId, setPlanoIdError);
    }

    function validateVencimento() {
        let message = ''
        if (vencimento.length == 0) {
            message =   'Preencha este campo';
        }
        setVencimentoError(message);
        return message;
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let clienteDocIsValid = validate(validateClienteDoc);
        let planoIdIsValid = validate(validatePlanoId);
        let vencimentoIsValid = validate(validateVencimento);
        if (clienteDocIsValid && planoIdIsValid && vencimentoIsValid) 
            postValidationCallback(event);
    }

    return {
        clientes,
        setClientes,
        clienteDoc,
        setClienteDoc,
        clienteDocError,
        planos,
        setPlanos,
        planoId,
        setPlanoId,
        planoIdError,
        vencimento,
        setVencimento,
        vencimentoError,
        dependentes,
        setDependentes,
        updateDependentesOptions,
        toggleDependenteOption,
        handleSubmit
    };
}


export default function ContratosNew() { 
    async function submit() {
        let { field1, field2 } = form;
        await api.post('/create', { field1, field2 });
        history.push('/list');
    }

    async function getOptions(path, setFunction) {
        let {data} = await api.get(path);
        setFunction(data);
    }

    let form = useForm();

    let history = useHistory();


    useEffect(() => {
        getOptions('/clientes/options', form.setClientes);
        getOptions('/planos/options', form.setPlanos);
    }, []);

    useEffect(() => {
        let {clienteDoc, updateDependentesOptions} = form;
        if (clienteDoc == "0") {
            updateDependentesOptions([]);
            return;
        }        
        let url = '/dependentes/' + clienteDoc;
        getOptions(url, updateDependentesOptions);
    }, [form.clienteDoc]);

    return (
        <div>
            <h2>Novo Contrato</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={history.goBack}/>
                    <form onSubmit={event => form.handleSubmit(event, submit)}>
                        <SelectWithLabel
                                label="Cliente *"
                                value={form.clienteDoc}
                                onChange={event => form.setClienteDoc(event.target.value)}
                                validationMessage={form.clienteDocError}
                            >
                                <option value="0">Selecione um opção...</option>
                                {form.clientes.map(({doc, nome}) => (
                                    <option key={doc} value={doc}>{nome}</option>
                                ))}
                            </SelectWithLabel>
                        <SelectWithLabel
                                label="Plano *" 
                                value={form.planoId} 
                                onChange={event => form.setPlanoId(event.target.value)}
                                validationMessage={form.planoIdError}
                            >
                                <option value="0">Selecione um opção...</option>
                                {form.planos.map(({id, descr}) => (
                                    <option key={id} value={id}>{descr}</option>
                                ))}
                            </SelectWithLabel>
                        <DateWithLabel 
                            label="Data de vencimento"
                            value={form.vencimento}
                            onChange={event => form.setVencimento(event.target.value)}
                            validationMessage={form.vencimentoError}
                        />

                        {form.dependentes.length > 0 ? (
                            <div className="children-inline">
                            <h3>
                                Dependentes
                            </h3>
                                <p className="text-muted">
                                    Clique em um nome para adicioná-lo/remove-lo como dependente
                                </p>
                            </div>
                        ): (<div></div>)}                        
                        
                        {form.dependentes.map(({selected, option: { doc, nome }}) => (
                            <button 
                                key={doc} 
                                className={'dependent-option' + (selected ? ' dependent-option-active' : '')}
                                onClick={() => form.toggleDependenteOption(doc)}>
                                {nome}
                            </button>
                        ))}

                        <PrimaryButton type="submit" icon={saveIcon} />
                    </form>
                </div>
            </div>
        </div>
    );
}