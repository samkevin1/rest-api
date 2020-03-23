import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import Header from './components/Header/index';
import CreateUser from './pages/User/Create/index';
import CreateCategory from './pages/Category/Create/index';
import CreateProduct from './pages/Product/Create/index';
import ListUsers from './pages/User/List/index';
import ListCategories from './pages/Category/List/index';
import ListProducts from './pages/Product/List/index';
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
              <Route exact path="/cadastrar/usuario" component={CreateUser} />
              <Route exact path="/cadastrar/categoria" component={CreateCategory} />
              <Route exact path="/cadastrar/produto" component={CreateProduct} />
              <Route exact path="/usuarios" component={ListUsers} />
              <Route exacth path="/categorias" component={ListCategories} />
              <Route exacth path="/produtos" component={ListProducts} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
