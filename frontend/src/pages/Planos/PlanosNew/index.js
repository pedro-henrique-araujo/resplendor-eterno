import React, { useState } from 'react';
import { DefaultButton, MutedButton, PrimaryButton } from '../../../components/Button';
import { SelectWithLabel, TextWithLabel} from '../../../components/Input';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import saveIcon from '../../../assets/save.svg';
import plusItemGreen from '../../../assets/plus-item-green.svg';
import xItemRed from '../../../assets/x-item-red.svg';

function useForm() {
    let [descr, setDescr] = useState('');
    let [descrError, setDescrError] = useState('');

    let [prods, setProds] = useState([{ id: 0, error: ''}]);

    let [tipoId, setTipoId] = useState('0');
    let [tipoIdError, setTipoIdError] = useState('');

    let [preco, setPreco] = useState('');
    let [precoError, setPrecoError] = useState('');    

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

    function validateTipoId() {
        let message = '';
        if (tipoId == 0) {
            message = 'Selecione uma opção';
        }

        setTipoIdError(message);
        return message;
    }

    function validatePreco() {
        let message = ''; 
        let precoAsNumber = Number(preco);
        let isNaN = Number.isNaN(precoAsNumber);
        if (isNaN) {
            message  = 'Este campo deve corresponder a um valor financeiro';
        }
        if (preco.length == 0)
            message = 'Campo obrigatório';
    
        setPrecoError(message);
        return message;
    }

    function validateProds() {
        let prodsWithErrors = prods.map(prod => {
            prod.error = '';
            if (prod.id == 0) {
                prod.error = 'Selecione um opção';
            }
            return prod;
        });
        setProds(prodsWithErrors);
        return prodsWithErrors.map(p => p.error).join();
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let descrIsValid = validate(validateDescr);
        let tipoIdIsValid = validate(validateTipoId);
        let precoIsValid = validate(validatePreco);
        let prodsIsValid = validate(validateProds);
        if (descrIsValid && tipoIdIsValid && precoIsValid && prodsIsValid) 
            postValidationCallback(event);
    }

    return {
        descr,
        setDescr,
        descrError,
        prods,
        setProds,
        tipoId,
        setTipoId,
        tipoIdError,
        preco,
        setPreco,
        precoError,
        handleSubmit
    };
}


export default function PlanosNew() { 
    async function submit() {
        let { field1, field2 } = form;
        await api.post('/create', { field1, field2 });
        history.push('/list');
    }

    function newProd() {
        form.setProds([...form.prods, {
            id: '0'
        }]);
    }

    function dropProd(index) {
        form.prods.splice(index, 1);
        form.setProds([...form.prods]);
    }

    let form = useForm();

    let history = useHistory();

    return (
        <div>
            <h2>Novo Plano</h2>
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
                            value={form.tipoId}
                            onChange={event => form.setTipoId(event.target.value)}
                            validationMessage={form.tipoIdError}
                            label="Tipo de plano *">
                            <option>Selecione uma opção...</option>
                        </SelectWithLabel>

                        <section>
                            <div className="children-inline">
                                <h3>Produtos</h3> 
                                <DefaultButton 
                                    onClick={newProd} 
                                    icon={plusItemGreen} />
                            </div>
                            {form.prods.map((prod, index) => (
                                <SelectWithLabel
                                    key={index}
                                    value={prod.id}
                                    label={`Produto ${index + 1} *`}
                                    validationMessage={prod.error}
                                    onChange={e => form.changeProd(index, e.target.value)}
                                    itemButton={{
                                        src: xItemRed,
                                        onClick: () => dropProd(index)
                                    }}>
                                    <option>Selecione uma opção...</option>
                                </SelectWithLabel>

                            ))}
                        </section>

                        <TextWithLabel
                                label="Preço *" 
                                value={form.preco} 
                                onChange={event => form.setPreco(event.target.value)}
                                validationMessage={form.precoError}
                            />
                       
                        <PrimaryButton type='submit' icon={saveIcon} />
                    </form>
                </div>
            </div>
        </div>
    );
}