import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import editIcon from '../../../assets/edit.svg';
import plusIcon from '../../../assets/plus.svg';
import { SuccessButton } from '../../../components/Button';
import {SearchInput} from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';
import api from '../../../services/api';

export default function PlanosList() {

    async function loadListAsync(page) {
        let { data } = await api
            .get(`/planos?page=${page}&search=${search}`);
        setPlanos(data.records);
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
        history.push('/planos/novo');
    }

    let history = useHistory();
    let [planos, setPlanos] = useState([]);
    let [search, setSearch] = useState('');
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(() => loadList(page), []);
    useEffect(() => loadList(page), [page, search]);

    return (
        <div>
            <h2>Planos</h2>
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
                            <th>Id</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Tipo de Plano</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planos?.map(plano => (
                            <tr key={plano.id}>
                                <td>{plano.id}</td>
                                <td>{plano.descr}</td>
                                <td>R$ {plano.preco}</td>
                                <td>{plano.tipoDescr}</td>
                                <td>
                                    <img src={editIcon} />
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