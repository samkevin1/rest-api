import React, { useState, useEffect } from 'react';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import validation from './validation';

export default function() {
  
    const history = useHistory();
    const [categories, set_categories] = useState([]);

    useEffect(() => {
        swal({
            text: 'Carregando informações, aguarde...',
            buttons: { cancel: 'Ok' }
        });
        http_request.get(api_urls.get_all_categories).then((res) => {
            console.log(res)
            if(res.data && res.statusText === "OK"){
                swal({
                    title: 'Sucesso',
                    text: "Informações carregadas com sucesso.",
                    icon: 'success',
                    buttons: { cancel: 'Ok' }
                });
                set_categories(res.data);
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
                        name: '',
                        price: Number,
                        description: '',
                        idcategory: 0,
                    }}
                    validationSchema={validation}
                    onSubmit={values => {
                        values.idcategory = Number(values.idcategory);
                        values.price = Number(values.price);
     
                        swal({
                            text: 'Realizando ação, aguarde...',
                            buttons: { cancel: 'Ok' }
                        });
                        http_request.post(api_urls.create_product, values)
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
                                value={formik.values.name}
                                error={formik.errors.name && formik.touched.name}
                                onChange={e =>
                                    formik.setFieldValue('name', e.target.value)
                                }
                                />
                                <div className="msg-error">
                                    {formik.touched.name && formik.errors.name}
                                </div>
                            </div>
                            <div class="form-group col-md-6 col-sm-12">
                                <label class="control-label">Descrição (*)</label>
                                <Field
                                class="form-control"
                                name="Nome"
                                placeholder="Insira uma breve descrição do produto..."
                                value={formik.values.description}
                                error={formik.errors.description && formik.touched.description}
                                onChange={e =>
                                    formik.setFieldValue('description', e.target.value)
                                }
                                />
                                <div className="msg-error">
                                    {formik.touched.description && formik.errors.description}
                                </div>
                            </div>
                            <div class="form-group col-md-6 col-sm-12">
                                <label class="control-label">Valor (*)</label>
                                <Field
                                class="form-control"
                                placeholder="Insira o valor do produto..."
                                name="Valor"
                                value={formik.values.price}
                                error={
                                    formik.errors.price && formik.touched.price
                                }
                                onChange={e =>
                                    formik.setFieldValue('price', e.target.value)
                                }
                                />
                                <div className="msg-error">
                                    {formik.touched.price && formik.errors.price}
                                </div>
                            </div>
                            
                            <div class="form-group col-md-6 col-sm-12">
                                <label class="control-label">Categoria do produto (*)</label>
                                <select
                                    class="form-control"
                                    name="IdCategoria"
                                    value={formik.values.idcategory}
                                    error={formik.errors.idcategory && formik.touched.idcategory}
                                    onChange={e =>
                                        formik.setFieldValue('idcategory', e.target.value)
                                    }
                                >
                                    <option value={0}>Selecione uma categoria...</option>
                                    {
                                        categories.length > 0 ? 
                                        categories.map((c) => (
                                            <option key={Number(c.id)} value={c.id}>{c.name}</option>
                                        )) : (
                                            <option value={0}>CADASTRE UMA CATEGORIA</option>
                                        )
                                    }
                                </select>
                                <div className="msg-error">
                                    {formik.touched.idcategory && formik.errors.idcategory}
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
