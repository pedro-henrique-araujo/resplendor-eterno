import React, { useEffect, useState } from 'react';
import { SuccessButton } from '../../../components/Button';
import api from '../../../services/api';
import { useHistory } from 'react-router';
import editIcon from '../../../assets/edit.svg';
import plusIcon from '../../../assets/plus.svg';
import {SearchInput} from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';

export default function ProdutosList() {
    async function loadProdutosAsync(page) {
        let { data } = await api
            .get(`/produtos?page=${page}&search=${search}`);
        setProdutos(data.records);
        setNumberOfPages(data.numberOfPages);
    }

    
    function loadProdutos(page) {
        loadProdutosAsync(page);
    }

    function searchInputChange(event) {
        let value = event.target.value;
        setSearch(value);
        setPage(1);
    }

    function goToNew() {
        history.push('/produtos/novo');
    }

    let [produtos, setProdutos] = useState([]);
    let [page, setPage] = useState(1);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [search, setSearch] = useState('');


    useEffect(() => loadProdutos(page), []);
    useEffect(() => loadProdutos(page), [page, search]);

    let history = useHistory();

    return (
        <div>
            <h2>Produtos</h2>
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
                            <th>Preço de Entrada</th>
                            <th>Preço de Saída</th>
                            <th>Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {produtos?.map(produto => (
                        <tr>
                            <td>{produto.id}</td>
                            <td>{produto.descr}</td>
                            <td>R$ {produto.precEn}</td>
                            <td>R$ {produto.precSa}</td>
                            <td>{produto.esto}</td>
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