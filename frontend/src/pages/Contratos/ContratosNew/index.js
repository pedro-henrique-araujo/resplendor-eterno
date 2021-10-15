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
    let [clieDoc, setClieDoc] = useState('0');
    let [clieDocError, setClieDocError] = useState('');
    let [planos, setPlanos] = useState([]);
    let [planoId, setPlanoId] = useState('0');
    let [planoIdError, setPlanoIdError] = useState('');
    let [venc, setVenc] = useState('');
    let [vencError, setVencError] = useState('');
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

    function validateClieDoc() {    
        return validateRequiredSelect(clieDoc, setClieDocError);
    }

    function validatePlanoId() {
        return validateRequiredSelect(planoId, setPlanoIdError);
    }

    function validateVenc() {
        let message = '';
        if (venc.length == 0) {
            message = 'Preencha este campo';
        }
        setVencError(message);
        return message;
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let clieDocIsValid = validate(validateClieDoc);
        let planoIdIsValid = validate(validatePlanoId);
        let vencIsValid = validate(validateVenc);
        if (clieDocIsValid && planoIdIsValid && vencIsValid) 
            postValidationCallback(event);
    }

    return {
        clientes,
        setClientes,
        clieDoc,
        setClieDoc,
        clieDocError,
        planos,
        setPlanos,
        planoId,
        setPlanoId,
        planoIdError,
        venc,
        setVenc,
        vencError,
        dependentes,
        setDependentes,
        updateDependentesOptions,
        toggleDependenteOption,
        handleSubmit
    };
}


export default function ContratosNew() { 
    async function submit() {
        let { clieDoc, planoId, venc } = form;
        let dependentes = form.dependentes
            .filter(d => d.selected)
            .map(d => d.option.doc);

        await api.post('/contratos', { 
            clieDoc: clieDoc,
            planoId: planoId,
            venc: venc,
            dependentes: dependentes
        });
        history.push('/contratos');
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
        let {clieDoc, updateDependentesOptions} = form;
        if (clieDoc == "0") {
            updateDependentesOptions([]);
            return;
        }        
        let url = '/dependentes/' + clieDoc;
        getOptions(url, updateDependentesOptions);
    }, [form.clieDoc]);
    
    return (
        <div>
            <h2>Novo Contrato</h2>
            <div className="main-view">
                <div className="view-body">
                    <MutedButton icon={arrowLeftIcon} onClick={history.goBack}/>
                    <form onSubmit={event => form.handleSubmit(event, submit)}>
                        <SelectWithLabel
                                label="Cliente *"
                                value={form.clieDoc}
                                onChange={event => form.setClieDoc(event.target.value)}
                                validationMessage={form.clieDocError}
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
                            value={form.venc}
                            onChange={event => form.setVenc(event.target.value)}
                            validationMessage={form.vencError}
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
                                type="button"
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