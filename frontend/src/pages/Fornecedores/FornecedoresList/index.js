import React, { useEffect, useState } from 'react';
import { SuccessButton, DefaultButton } from '../../../components/Button';
import api from '../../../services/api';

import editIcon from '../../../assets/edit.svg';
import plusIcon from '../../../assets/plus.svg';
import {SearchInput} from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';
import { useHistory } from 'react-router-dom';

export default function FornecedoresList() {
    async function loadListAsync(page) {
        let { data } = await api
            .get(`/fornecedores?page=${page}&search=${search}`);
        setList(data.records);
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
        history.push('/fornecedores/novo');
    }

    function goToEdit(doc) {
        history.push('/fornecedores/editar/' + doc);
    }

    let [fornecedores, setList] = useState([]);
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [search, setSearch] = useState('');

    let history = useHistory();

    useEffect(() => loadList(page), []);
    useEffect(() => loadList(page), [page, search]);

    return (
        <div>
            <h2>Fonecedores</h2>
            <div className="main-view">
                <div className="view-header">
                    <div className="input-group">
                        <SearchInput value={search} onChange={searchInputChange}/>
                    </div>
                    <div className="input-group">
                        <SuccessButton icon={plusIcon} onClick={goToNew}/>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>CNPJ</th>
                            <th>Razão social</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fornecedores?.map(fornecedor => (
                        <tr key={fornecedor.doc}>
                            <td>{fornecedor.doc}</td>
                            <td>{fornecedor.razao}</td>
                            <td>
                                <DefaultButton onClick={() => goToEdit(fornecedor.doc)} icon={editIcon} />
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