import React, { useEffect, useState } from 'react';
import { SuccessButton, DefaultButton } from '../../../components/Button';
import {useHistory} from 'react-router';
import api from '../../../services/api';
import moment from 'moment';
import plusIcon from '../../../assets/plus.svg';
import doubleGearIcon from '../../../assets/double-gear.svg';
import printIcon from '../../../assets/print.svg';
import contratoPaperIcon from '../../../assets/contrato-paper.svg'
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

    async function generatePdf(id) {
        let {data: { location }} = await api.get('/contratos/installments/' + id);
        let linkElement = document.createElement('a');
        linkElement.target = '_blank';
        linkElement.href = location;
        linkElement.click();        
    }

    async function getContratoPaper(id) {
        let {data: { location }} = await api.get('/contratos/paper/' + id);
        let linkElement = document.createElement('a');
        linkElement.target = '_blank';
        linkElement.href = location;
        linkElement.click();      
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
        history.push('/contratos/novo');
    }


    let [contratos, setContratos] = useState([]);
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [search, setSearch] = useState('');
    let history = useHistory();

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
                        <SuccessButton onClick={goToNew} icon={plusIcon} />
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
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{cliente}</td>
                            <td>{plano}</td>
                            <td>{countDependentes}</td>
                            <td>{moment(venc).format('DD/MM/YYYY')}</td>
                            <td>
                                
                                {isProcessed  ? (         
                                    <>
                                        <DefaultButton
                                            icon={contratoPaperIcon} 
                                            onClick={() => getContratoPaper(id)} />  
                                        <DefaultButton
                                            icon={printIcon} 
                                            onClick={() => generatePdf(id)} />    
                                    </>                          
                                     
                                    
                                ): (
                                    
                                    <DefaultButton
                                        icon={doubleGearIcon} 
                                        onClick={() => processContrato(id)} />
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