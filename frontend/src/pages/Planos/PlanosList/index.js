import React from 'react';
import editIcon from '../../../assets/edit.svg';
import plusIcon from '../../../assets/plus.svg';
import { SuccessButton } from '../../../components/Button';
import {SearchInput} from '../../../components/Input';
import PaginationInput from '../../../components/PaginationInput';

export default function PlanosList() {
    return (
        <div>
            <h2>Planos</h2>
            <div className="main-view">
                <div className="view-header">
                    <div className="input-group">
                        <SearchInput />
                    </div>
                    <div className="input-group">
                        <SuccessButton icon={plusIcon} />
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
                    <tr>
                        <td>321234</td>
                        <td>Básico</td>
                        <td>R$ 500,00</td>
                        <td>Normal</td>
                        <td>
                            <img src={editIcon} />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <PaginationInput/>
            </div>         
        </div>
    );
}