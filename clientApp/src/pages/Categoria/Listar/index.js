import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import colunas from './colunas';
import DataTable from 'react-data-table-component';

export default () => {
  const [estaCarregando, setCarregando] = useState(true);
  const [deuSucesso, setSucesso] = useState(false);
  const [deuErro, setErro] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    http_request
      .get(api_urls.obter_todas_categorias)
      .then(res => {
        if (res.data.sucesso) {
          setCarregando(false);
          setErro(false);
          setSucesso(true);
          setCategorias(res.data.dados);
        } else {
          setCarregando(false);
          setErro(true);
          setSucesso(false);
        }
      })
      .catch(err => {
        setCarregando(false);
        setErro(true);
        setSucesso(false);
      });
  }, []);

  return (
    <div class="col-md-12 mb-4">
      <div class="card mb-3 text-left">
        <div class="card-body">
          {estaCarregando && (
            <Fragment>
              <h3 class="text-center">Carregando informações, aguarde...</h3>
              <div class="container-center">
                <div class="spinner-bubble spinner-bubble-info m-5"></div>
              </div>
            </Fragment>
          )}
          {deuErro && (
            <Fragment>
              <h3 class="text-center">
                Ocorreu um erro ao tentar executar a ação
              </h3>
              <div class="alert alert-card alert-danger" role="alert">
                <h5 class="text-center">
                  <strong>Ocorreu um erro</strong> interno no servidor, tente
                  novamente e caso o erro persista, contate um administrador do
                  sistema.
                </h5>
              </div>
            </Fragment>
          )}

          <div class="table-responsive">
            {deuSucesso && (
              <Fragment>
                <h4 class="card-title mb-3 ml-3">Categorias de produtos</h4>
                <p class="ml-3">
                  Lista de todas categorias cadastradas no sistema.
                </p>
                <DataTable
                  columns={colunas}
                  data={categorias}
                  pagination={true}
                  highlightOnHover={true}
                  striped={true}
                  dense={true}
                  noTableHead={false}
                  noHeader={true}
                />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
