import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import ProdutosList from './pages/Produtos/ProdutosList';
import PlanosList from './pages/Planos/PlanosList';
import Layout from './Layout';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Layout>
                    <Route path="/" exact component={Page1}/>
                    <Route path="/page2" exact component={Page2}/>
                    <Route path="/produtos" component={ProdutosList}/>
                    <Route path="/planos" component={PlanosList}/>
                </Layout>
            </Switch>
        </BrowserRouter>
    );
}