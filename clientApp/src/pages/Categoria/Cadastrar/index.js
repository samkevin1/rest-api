import React, { Fragment } from 'react';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import validacaoCategoria from './validacao';

export default function() {
  const history = useHistory();

  return (
    <Fragment>
      <div class="col-md-12 mb-4">
        <div class="card mb-3 text-left">
          <div class="card-body">
            <h4 class="card-title mb-3">Cadastrar categoria</h4>
            <p>Todos os campos com (*) devem ser preenchidos..</p>
            <Formik
            initialValues={{
              Titulo: '',
              Descricao: ''
            }}
            validationSchema={validacaoCategoria}
            onSubmit={values => {
              console.log(values);
              swal({
                text: 'Realizando ação, aguarde...',
                buttons: { cancel: 'Ok' }
              });
              http_request
                .post(api_urls.cadastrar_categoria, values)
                .then(res => {
                  if (res.data.sucesso) {
                    swal({
                      title: 'Sucesso',
                      text: res.data.mensagem,
                      icon: 'success',
                      buttons: { cancel: 'Ok' }
                    }).then(() => {
                      history.push('/categorias');
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
                    <label class="control-label">Título *</label>
                    <Field class="form-control"
                      name="Titulo"
                      placeholder="Insira um título para a categoria do produto..."
                      value={formik.values.Titulo}
                      error={formik.errors.Titulo && formik.touched.Titulo}
                      onChange={e =>
                        formik.setFieldValue('Titulo', e.target.value)
                      } 
                    />
                    <div className="msg-error">
                      {formik.touched.Titulo && formik.errors.Titulo}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Descrição *</label>
                    <Field class="form-control" 
                      name="Descricao"
                      placeholder="Insira uma breve descrição da categoria do produto..."
                      value={formik.values.Descricao}
                      error={formik.errors.Descricao && formik.touched.Descricao}
                      onChange={e =>
                        formik.setFieldValue('Descricao', e.target.value)
                      } 
                    />
                    <div className="msg-error">
                      {formik.touched.Descricao && formik.errors.Descricao}
                    </div>
                  </div>

                  <div class="form-group col-md-12 col-sm-12 mb-3">
                    <button type="submit" class="btn btn-raised ripple btn-raised-primary">Cadastrar</button>
                  </div>
                </div>
              </Form>)}
            </Formik>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
