import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';

export default () => {
    const history = useHistory();
    const [is_loading, set_loading] = useState(true);
    const [is_success, set_success] = useState(false);
    const [is_error, set_error] = useState(false);
    const [user, set_user] = useState([]);

    useEffect(() => {
        http_request
        .get(api_urls.get_user_by_id)
        .then(res => {
            if (res.data.success) {
            set_loading(false);
            set_error(false);
            set_success(true);
            set_user(res.data.data);
            } else {
            set_loading(false);
            set_error(true);
            set_success(false);
            }
        })
        .catch(err => {
            set_loading(false);
            set_error(true);
            set_success(false);
        });
    }, []);

    return (
        <div class="col-md-12 mb-4">
        <div class="card mb-3 text-left">
            <div class="card-body">
            {is_loading && (
                <Fragment>
                <h3 class="text-center">Carregando informações, aguarde...</h3>
                <div class="container-center">
                    <div class="spinner-bubble spinner-bubble-info m-5"></div>
                </div>
                </Fragment>
            )}
            {is_error && (
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
                {is_success && (
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
