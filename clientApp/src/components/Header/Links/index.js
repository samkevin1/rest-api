import React from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';

export default function() {
  const history = useHistory();
  return (
    <div class="horizontal-bar-wrap">
      <div class="header-topnav">
        <div class="container-fluid">
          <div
            class="topnav rtl-ps-none"
            id=""
            data-perfect-scrollbar=""
            data-suppress-scroll-x="true"
          >
            <Router>
              <ul class="menu float-left">
                <li>
                  <div>
                    <div>
                      <label class="toggle" for="drop-2">
                        Dashboard
                      </label>
                      <a onClick={() => history.push('/dashboard')}>
                        <i class="nav-icon mr-2 i-Dashboard"></i> Dashboard
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>
                      <label class="toggle" for="drop-2">
                        Visualizar
                      </label>
                      <a href="#">
                        <i class="nav-icon mr-2 i-Windows-2"></i> Visualizar
                      </a>
                      <input id="drop-2" type="checkbox" />
                      <ul>
                        <li>
                          <a onClick={() => history.push('/usuarios')}>
                            <span class="item-name">
                              <i class="nav-icon mr-2 i-Conference"></i>Usuários
                            </span>
                          </a>
                        </li>
                        <li>
                          <a onClick={() => history.push('/categorias')}>
                            <span class="item-name">
                              <i class="nav-icon mr-2 i-Folder"></i>Categorias
                            </span>
                          </a>
                        </li>
                        <li>
                          <a onClick={() => history.push('/produtos')}>
                            <span class="item-name">
                              <i class="nav-icon mr-2 i-Folder"></i>Produtos
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <div>
                    <div>
                      <label class="toggle" for="drop-2">
                        Cadrastros
                      </label>
                      <a href="#">
                        <i class="nav-icon mr-2 i-Folder-Add-"></i> Cadrastros
                      </a>
                      <input id="drop-2" type="checkbox" />
                      <ul>
                        <li>
                          <a onClick={() => history.push('/cadastrar/usuario')}>
                            <span class="item-name">
                              <i class="nav-icon mr-2 i-Add-User"></i> Usuário
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => history.push('/cadastrar/categoria')}
                          >
                            <span class="item-name">
                              <i class="nav-icon mr-2 i-Add-File"></i> Categoria
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => history.push('/cadastrar/produto')}
                          >
                            <span class="item-name">
                              <i class="nav-icon mr-2 i-Add-File"></i> Produtos
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <div>
                    <div>
                      <label class="toggle" for="drop-2">
                        Log de Erros
                      </label>
                      <Link to="/">
                        <i class="nav-icon mr-2 i-Monitor-Analytics"></i> Log de
                        Erros
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}
