import React, { useEffect, useState } from 'react';
import { SuccessButton } from '../../../components/Button';
import api from '../../../services/api';

import plusIcon from '../../../assets/plus.svg';
import {SearchInput} from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';

export default function EntradasList() {
    async function loadListAsync(page) {
        let { data } = await api
            .get(`/list?page=${page}&search=${search}`);
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

    let [list, setList] = useState([]);
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [search, setSearch] = useState('');


    useEffect(() => loadList(page), []);
    useEffect(() => loadList(page), [page, search]);

    return (
        <div>
            <h2>Entradas de Produtos</h2>
            <div className="main-view">
                <div className="view-header">
                    <div className="input-group">
                        <SearchInput value={search} onChange={searchInputChange}/>
                    </div>
                    <div className="input-group">
                        <SuccessButton icon={plusIcon} />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Quantidades de itens</th>
                            <th>Valor total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list?.map(item => (
                        <tr>
                            <td>{item.id}</td>
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