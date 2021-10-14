import React, { useState } from 'react';
import { MutedButton, PrimaryButton, DefaultButton } from '../../../components/Button';
import { TextWithLabel, DateWithLabel, HorizontalInputDiv } from '../../../components/Input';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import arrowLeftIcon from '../../../assets/arrow-left.svg';
import plusItemGreen from '../../../assets/plus-item-green.svg';
import saveIcon from '../../../assets/save.svg';
import xItemRed from '../../../assets/x-item-red.svg';

function useForm() {
    let [doc, setDoc] = useState('');
    let [docError, setDocError] = useState('');
    let [nome, setNome] = useState('');
    let [nomeError, setNomeError] = useState('');
    let [rg, setRg] = useState('');
    let [rgError, setRgError] = useState('');
    let [birthDate, setBirthDate] = useState('');
    let [birthDateError, setBirthDateError] = useState('');
    let [enderecos, setEnderecos] = useState([
        {
            cep: { value: ''},
            cidade: { value: ''},
            bairro: { value: ''},
            rua: { value: ''},
            numResidencia: { value: ''}
        }
    ]);

    let [contatos, setContatos] = useState([
        { value: '', error: ''}
    ]);

    
    function validateDoc() {    
        let message = '';
        if (doc.length != 11) {
            message = `Este campo tem ${doc.length} carateres mas deve ter 11`;
        }

        if (doc.length == 0)
            message = 'Campo obrigatório';
        setDocError(message);
        return message;
    }

    function validateNome() {
        let message = '';

        if(nome.length > 255) {
            message = 'Insira no máximo 255 caracteres';
        }

        if (nome.length < 3)
            message = 'Insira no mínimo 3 caracteres';
        if (nome.length == 0)
            message = 'Campo obrigatório';
    
        setNomeError(message);
        return message;
    }

    function validateRg() {
        let message = '';
        if (rg.length == 0)
            message = 'Campo obrigatório';
    
        setRgError(message);
        return message;
    }

    function validateBirthDate() {
        let message = '';

       
        if (rg.length == 0)
            message = 'Campo obrigatório';
    
        setBirthDateError(message);
        return message;
    }
    
    function validateEnderecos() {
        let messages = [];

        for (let endereco of enderecos) {
            let { cep, cidade, bairro, rua, numResidencia } = endereco;
            function critisize(field) {
                let { value: { length } = '' } = field;
                field.error = '';

                
                if (length >= 255) {
                    field.error = 'Este campo deve ter no máximo 255 caracteres';
                }

                if (length == 0) {
                    field.error = 'Este campo é obrigatório';
                }
                return field.error;
            };

            let errors = [cep, cidade, bairro, rua, numResidencia].map(critisize);
            messages.push(errors.join(''));
        }
        setEnderecos([...enderecos]);
        return messages.join();
    }

    function validateContatos() {
        let messages = [];
        for (let index in contatos) {
            let contato = contatos[index];
            let message = '';
            
            if (contato.value.length >= 20) {
                message = 'Este campo deve ter no máximo 20 caracteres';
            }

            if (contato.value.length < 7) {
                message = 'Este campo deve ter no mínimo 7 caracteres';
            }

            if (contato.value.length == 0) {
                message = 'Este campo é obrigatório';
            }

            contato.error = message;
            messages.push(message);
        }
        setContatos([...contatos]);
        return messages.join('');
    }

    function validate(validationFunction) {
        let validationMessage = validationFunction();
        console.log(validationMessage);
        return validationMessage.length == 0;
    }

    function handleSubmit(event, postValidationCallback) {
        event.preventDefault();
        let docIsValid = validate(validateDoc);
        let nomeIsValid = validate(validateNome);
        let rgIsValid = validate(validateRg);
        let birthDateIsValid = validate(validateBirthDate);
        let enderecosIsValid = validate(validateEnderecos);
        let contatosIsValid = validate(validateContatos);
        let isValid = docIsValid 
            && nomeIsValid 
            && rgIsValid 
            && birthDateIsValid 
            && enderecosIsValid
            && contatosIsValid;
        if (isValid) 
            postValidationCallback(event);
    }

    return {
        doc,
        setDoc,
        docError,
        nome,
        setNome,
        nomeError,
        rg,
        setRg,
        rgError,
        birthDate,
        setBirthDate,
        birthDateError,
        enderecos,
        setEnderecos,
        contatos,
        setContatos,
        handleSubmit
    };
}


export default function ClientesForm(props) { 
    async function submit() {
        let {doc, nome, rg, birthDate } = form;
        let enderecos = form.enderecos.map(endereco => {
            let output = {};
            for (let key in endereco) {
                output[key] = endereco[key].value;
            }
            return output;
        });
        let contatos = form.contatos.map(contato => contato.value);
        let person = { doc, nome, rg, birthDate, enderecos, contatos };
        props.save(person);
    }


    function changeEnderecoValue({target}) {
        let { index } = target.dataset;
        let { name, value } = target;
        let enderecos = form.enderecos;
        enderecos[index][name].value = value;
        form.setEnderecos([...enderecos]);
    }

    function newEndereco() {
        form.setEnderecos([...form.enderecos, {
            cep: { value: ''},
            cidade: { value: ''},
            bairro: { value: ''},
            rua: { value: ''},
            numResidencia: { value: ''}
        }]);

    }

    function removeEndereco(index) {
        let {enderecos} = form;
        enderecos.splice(index, 1);
        form.setEnderecos([...enderecos]);
    }

    function changeContatosValue({target}) {
        let { index } = target.dataset;
        let { value } = target;
        let contatos = form.contatos;
        contatos[index].value = value;
        form.setContatos([...contatos]);
    }

    function newContato() {
        form.setContatos([...form.contatos, {
            value: ''
        }]);
    }

    function removeContato(index) {
        let {contatos} = form;
        contatos.splice(index, 1);
        form.setContatos([...contatos]);
    }


    let form = useForm();

    return (
        <div className="view-body">
            <MutedButton icon={arrowLeftIcon} onClick={props.goBack}/>
            <form onSubmit={event => form.handleSubmit(event, submit)}>
                <h3>Dados Pessoais</h3>
                <TextWithLabel
                        label="CPF *" 
                        value={form.doc} 
                        onChange={event => form.setDoc(event.target.value)}
                        validationMessage={form.docError}
                    />
                <TextWithLabel
                        label="Nome *" 
                        value={form.nome} 
                        onChange={event => form.setNome(event.target.value)}
                        validationMessage={form.nomeError}
                    />

                <TextWithLabel
                        label="RG *" 
                        value={form.rg} 
                        onChange={event => form.setRg(event.target.value)}
                        validationMessage={form.rgError}
                    />

                <DateWithLabel
                    label="Data de nascimento *" 
                    value={form.birthDate} 
                    onChange={event => form.setBirthDate(event.target.value)}
                    validationMessage={form.birthDateError}
                />

                <div className="children-inline">                        
                    <h3>Endereço</h3> 
                    <DefaultButton 
                        icon={plusItemGreen}
                        onClick={newEndereco} />
                </div>

                {form.enderecos.map((endereco, index) => (
                    <div key={index}>
                        {index === 0 ? (
                            <h4>Principal</h4>
                        ) : (
                            <div className="children-inline">
                                    <h4>Endereço {index + 1}</h4>
                                <DefaultButton
                                    icon={xItemRed}
                                    onClick={() => removeEndereco(index)}
                                    />
                            </div>
                        )}
                        <HorizontalInputDiv>

                            <TextWithLabel
                                label="CEP *"
                                value={endereco.cep.value}
                                name="cep"
                                data-index={index}
                                onChange={changeEnderecoValue}
                                validationMessage={endereco.cep.error}
                            />

                            <TextWithLabel
                                label="Cidade *"
                                value={endereco.cidade.value}
                                name="cidade"
                                data-index={index}
                                onChange={changeEnderecoValue}
                                validationMessage={endereco.cidade.error}
                            />

                            <TextWithLabel
                                label="Bairro *"
                                value={endereco.bairro.value}
                                name="bairro"
                                data-index={index}
                                onChange={changeEnderecoValue}
                                validationMessage={endereco.bairro.error}
                            />

                            <TextWithLabel
                                label="Rua *"
                                value={endereco.rua.value}
                                name="rua"
                                data-index={index}
                                onChange={changeEnderecoValue}
                                validationMessage={endereco.rua.error}
                            />

                            <TextWithLabel
                                label="Número da residencia *"
                                value={endereco.numResidencia.value}
                                name="numResidencia"
                                data-index={index}
                                onChange={changeEnderecoValue}
                                validationMessage={endereco.numResidencia.error}
                            />
                        </HorizontalInputDiv>

                    </div>
                ))}

                <div className="children-inline">
                    <h3>Contato</h3> 
                    <DefaultButton 
                        icon={plusItemGreen} 
                        onClick={newContato}
                        />
                </div>
                {form.contatos.map((contato, index) => (
                    <div key={index}>

                        {index === 0 ? (
                                <h4>Principal</h4> 
                        ) : (
                            <div className="children-inline">
                                <h4>Contato {index + 1}</h4> 
                                <DefaultButton 
                                    icon={xItemRed} 
                                    onClick={() => removeContato(index)}
                                    />
                            </div>
                        )}
                        
                        <TextWithLabel 
                            value={contato.value} 
                            data-index={index}
                            name="telefone"
                            onChange={changeContatosValue}
                            validationMessage={contato.error}
                            />
                    </div>
                ))}
                <PrimaryButton type="submit" icon={saveIcon} />
            </form>
        </div>
         
    );
}