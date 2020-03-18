import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import Header from './componentes/Header/index';
import CadastrarUsuario from './pages/Usuario/Cadastrar/index';
import CadastrarCategoria from './pages/Categoria/Cadastrar/index';
import CadastrarProduto from './pages/Produto/Cadastrar/index';
import ListarUsuarios from './pages/Usuario/Listar/index';
import ListarCategorias from './pages/Categoria/Listar/index';
import ListarProdutos from './pages/Produto/Listar/index';
import Dashboard from './pages/Dashboard/index';

function App() {
  return (
    <Router>
      <div class="app-admin-wrap layout-horizontal-bar">
        <Header />
        <div class="main-content-wrap d-flex flex-column">
          <div class="main-content">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/cadastrar/usuario" component={CadastrarUsuario} />
              <Route exact path="/cadastrar/categoria" component={CadastrarCategoria} />
              <Route exact path="/cadastrar/produto" component={CadastrarProduto} />
              <Route exact path="/usuarios" component={ListarUsuarios} />
              <Route exacth path="/categorias" component={ListarCategorias} />
              <Route exacth path="/produtos" component={ListarProdutos} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
