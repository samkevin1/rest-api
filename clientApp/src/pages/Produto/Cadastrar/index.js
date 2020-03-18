import React, { useState, useEffect } from 'react';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import validacao from './validacao';

export default function() {
  
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        swal({
            text: 'Carregando informações, aguarde...',
            buttons: { cancel: 'Ok' }
        });
        http_request.get(api_urls.obter_todas_categorias).then((res) => {
            if(res.data.sucesso){
                swal({
                    title: 'Sucesso',
                    text: "Informações carregadas com sucesso.",
                    icon: 'success',
                    buttons: { cancel: 'Ok' }
                });
                setCategorias(res.data.dados);
            }
            else {
                swal({
                    title: 'Erro',
                    text: res.data.mensagem,
                    icon: 'error',
                    buttons: { cancel: 'Ok' }
                });
            }
        })
        .catch((err) => {
            swal({
                title: 'Erro',
                text:
                  'Ocorreu um erro interno no servidor, contate o administrador do sistema.',
                icon: 'error',
                buttons: { cancel: 'Ok' }
            });
        });
    }, []);


    return (
        <div class="col-md-12 mb-4">
            <div class="card mb-3 text-left">
                <div class="card-body">
                <h4 class="card-title mb-3">Cadastrar produto</h4>
                <p>Todos os campos com (*) devem ser preenchidos..</p>
                <Formik
                    initialValues={{
                        Nome: '',
                        Preco: Number,
                        Descricao: new Date(),
                        IdCategoria: 0,
                    }}
                    validationSchema={validacao}
                    onSubmit={values => {
                        values.IdCategoria = Number(values.IdCategoria);
                        values.Valor = Number(values.Valor);
     
                        swal({
                            text: 'Realizando ação, aguarde...',
                            buttons: { cancel: 'Ok' }
                        });
                        http_request.post(api_urls.cadastrar_despesa, values)
                        .then(res => {
                            if (res.data.sucesso) {
                                swal({
                                title: 'Sucesso',
                                text: res.data.mensagem,
                                icon: 'success',
                                buttons: { cancel: 'Ok' }
                                }).then(() => {
                                    history.push('/produtos');
                                });
                            } else {
                                swal({
                                title: 'Erro',
                                text: res.data.mensagem,
                                icon: 'error',
                                buttons: { cancel: 'Ok' }
                                });
                            }
                        })
                        .catch(err => {
                            swal({
                                title: 'Erro',
                                text:
                                'Ocorreu um erro interno no servidor, contate o administrador do sistema.',
                                icon: 'error',
                                buttons: { cancel: 'Ok' }
                            });
                        });
                    }}
                >
                {formik => (
                    <Form method="post">
                        <div class="row">
                            <div class="form-group col-md-6 col-sm-12">
                                <label class="control-label">Nome (*)</label>
                                <Field
                                class="form-control"
                                name="Nome"
                                placeholder="Insira o nome do produto..."
                                value={formik.values.Nome}
                                error={formik.errors.Nome && formik.touched.Nome}
                                onChange={e =>
                                    formik.setFieldValue('Nome', e.target.value)
                                }
                                />
                                <div className="msg-error">
                                    {formik.touched.Nome && formik.errors.Nome}
                                </div>
                            </div>
                            <div class="form-group col-md-6 col-sm-12">
                                <label class="control-label">Valor (*)</label>
                                <Field
                                class="form-control"
                                placeholder="Insira o valor do produto..."
                                name="Valor"
                                value={formik.values.Valor}
                                error={
                                    formik.errors.Valor && formik.touched.Valor
                                }
                                onChange={e =>
                                    formik.setFieldValue('Valor', e.target.value)
                                }
                                />
                                <div className="msg-error">
                                    {formik.touched.Valor && formik.errors.Valor}
                                </div>
                            </div>
                            
                            <div class="form-group col-md-6 col-sm-12">
                                <label class="control-label">Categoria do produto (*)</label>
                                <select
                                    class="form-control"
                                    name="IdCategoria"
                                    value={formik.values.IdCategoria}
                                    error={formik.errors.IdCategoria && formik.touched.IdCategoria}
                                    onChange={e =>
                                        formik.setFieldValue('IdCategoria', e.target.value)
                                    }
                                >
                                    <option value={0}>Selecione uma categoria...</option>
                                    {
                                        categorias.length > 0 ? 
                                        categorias.map((c) => (
                                            <option key={Number(c.id)} value={c.id}>{c.titulo}</option>
                                        )) : (
                                            <option value={0}>CADASTRE UMA CATEGORIA</option>
                                        )
                                    }
                                </select>
                                <div className="msg-error">
                                    {formik.touched.IdCategoria && formik.errors.IdCategoria}
                                </div>
                            </div>

                            <div class="form-group col-md-12 col-sm-12 mb-3">
                                <button type="submit" class="btn btn-raised ripple btn-raised-primary">
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </Form>
                    )}
                </Formik>
                </div>
            </div>
        </div>
    );
}
