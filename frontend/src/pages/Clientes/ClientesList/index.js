import React, { useEffect, useState } from 'react';
import { SuccessButton, DefaultButton } from '../../../components/Button';
import { useHistory } from 'react-router';
import api from '../../../services/api';

import { SearchInput } from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';

import plusIcon from '../../../assets/plus.svg';
import editIcon from '../../../assets/edit.svg';

export default function ClientesList() {
    async function loadListAsync(page) {
        let { data } = await api
            .get(`/clientes?page=${page}&search=${search}`);
        setClientes(data.records);
        setNumberOfPages(data.numberOfPages);
    }

    
    function loadList(page) {
        loadListAsync(page);
    }

    function searchInputChange(event) {
        let value = event.target.value;
        setSearch(value);
        setPage(1);
    }

    function goToNew() {
        history.push('/clientes/novo');
    }

    function goEdit(doc) {
        history.push('/clientes/detail/' + doc);
    }

    let [clientes, setClientes] = useState([]);
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [search, setSearch] = useState('');
    let history = useHistory();

    useEffect(() => loadList(page), []);
    useEffect(() => loadList(page), [page, search]);

    return (
        <div>
            <h2>Clientes</h2>
            <div className="main-view">
                <div className="view-header">
                    <div className="input-group">
                        <SearchInput value={search} onChange={searchInputChange}/>
                    </div>
                    <div className="input-group">
                        <SuccessButton icon={plusIcon} onClick={goToNew} />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Contato</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {clientes?.map(cliente => (
                        <tr>
                            <td>{cliente.doc}</td>
                            <td>{cliente.nome}</td>
                            <td>{'{contato}'}</td>
                            <td>{cliente.logra}</td>
                            <td>
                                <DefaultButton onClick={() => goEdit(cliente.doc)} icon={editIcon} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <PaginationInput 
                        page={page} 
                        numberOfPages={numberOfPages}
                        setPage={setPage}
                    />
            </div>         
        </div>
    );
}