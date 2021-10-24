import React, { useEffect, useState } from 'react';
import { SuccessButton, DefaultButton } from '../../../components/Button';
import api from '../../../services/api';
import moment from 'moment';
import plusIcon from '../../../assets/plus.svg';
import doubleGearIcon from '../../../assets/double-gear.svg';
import {SearchInput} from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';

export default function ContratosList() {
    async function loadListAsync(page) {
        let { data } = await api
        .get(`/contratos?page=${page}&search=${search}`);
        setContratos(data.records);
        setNumberOfPages(data.numberOfPages);
    }
    
    async function processContrato(id) {
        await api.post('/contratos/process/' + id);
        await loadList(page);
    }
    
    function loadList(page) {
        loadListAsync(page);
    }

    function searchInputChange(event) {
        let value = event.target.value;
        setSearch(value);
        setPage(1);
    }


    let [contratos, setContratos] = useState([]);
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [search, setSearch] = useState('');


    useEffect(() => loadList(page), []);
    useEffect(() => loadList(page), [page, search]);

    return (
        <div>
            <h2>Contratos</h2>
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
                            <th>Nome</th>
                            <th>Plano</th>
                            <th>Número de dependentes</th>
                            <th>Vencimento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {contratos?.map(({
                            id, 
                            cliente, 
                            plano, 
                            venc, 
                            countDependentes, 
                            isProcessed
                        }) => (
                        <tr>
                            <td>{id}</td>
                            <td>{cliente}</td>
                            <td>{plano}</td>
                            <td>{countDependentes}</td>
                            <td>{moment(venc).format('DD/MM/YYYY')}</td>
                            <td>
                                {!isProcessed  ? (
                                    <DefaultButton
                                        icon={doubleGearIcon} 
                                        onClick={() => processContrato(id)} />
                                    
                                ): (
                                    <div></div>
                                )}
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