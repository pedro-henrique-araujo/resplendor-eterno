import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import ProdutosList from './pages/Produtos/ProdutosList';
import ProdutosNew from './pages/Produtos/ProdutosNew';
import PlanosList from './pages/Planos/PlanosList';
import PlanosNew from './pages/Planos/PlanosNew';
import Layout from './Layout';
import FornecedoresList from './pages/Fornecedores/FornecedoresList';
import FornecedoresNew from './pages/Fornecedores/FornecedoresNew';
import FornecedoresEdit from './pages/Fornecedores/FornecedoresEdit';
import ClientesList from './pages/Clientes/ClientesList';
import SaidasList from './pages/Saidas/SaidasList';
import EntradasList from './pages/Entradas/EntradasList';
import ContratosList from './pages/Contratos/ContratosList';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Layout>
                    <Route path="/" exact component={Page1}/>
                    <Route path="/page2" exact component={Page2}/>
                    <Route exact path="/produtos" component={ProdutosList}/>
                    <Route path="/produtos/novo" component={ProdutosNew}/>
                    <Route exact path="/planos" component={PlanosList}/>
                    <Route exact path="/contratos" component={ContratosList}/>
                    <Route path="/planos/novo" component={PlanosNew}/>
                    <Route exact path="/fornecedores" component={FornecedoresList} />
                    <Route path="/fornecedores/novo" component={FornecedoresNew} />
                    <Route path="/fornecedores/editar/:doc" component={FornecedoresEdit} />
                    <Route exact path="/clientes" component={ClientesList} />
                    <Route exact path="/saidas" component={SaidasList} />
                    <Route exact path="/entradas" component={EntradasList} />

                </Layout>
            </Switch>
        </BrowserRouter>
    );
}