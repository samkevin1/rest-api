import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';

export default () => {
    const history = useHistory();
    const [estaCarregando, setCarregando] = useState(true);
    const [deuSucesso, setSucesso] = useState(false);
    const [deuErro, setErro] = useState(false);
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        http_request
        .get(api_urls.obter_usuario_por_id)
        .then(res => {
            if (res.data.sucesso) {
            setCarregando(false);
            setErro(false);
            setSucesso(true);
            setUsuario(res.data.dados);
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
                    <h1>Aqui vai as coisas do usuário para editar.</h1>
                </Fragment>
                )}
            </div>
            </div>
        </div>
        </div>
    );
};
