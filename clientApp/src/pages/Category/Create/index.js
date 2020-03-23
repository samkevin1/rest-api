import React, { Fragment } from 'react';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import validation from './validation';

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
              name: '',
              description: '',
              products: []
            }}
            validationSchema={validation}
            onSubmit={values => {
              swal({ text: 'Realizando ação, aguarde...', buttons: { cancel: 'Ok' } });
              http_request
                .post(api_urls.create_catalog, values)
                .then(res => {
                  if (res.statusText === "Created") {
                    swal({ title: 'Sucesso', text: "Categoria criada com sucesso!", icon: 'success',buttons: { cancel: 'Ok' } })
                    .then(() => {
                      history.push('/categorias');
                    });
                  } else {
                    swal({ title: 'Erro', text: "Ocorreu um erro e por conta disso não possível criar uma categoria.", icon: 'error', buttons: { cancel: 'Ok' } });
                  }
                })
                .catch(err => {
                  console.log(err)
                  swal({ title: 'Erro', text: 'Ocorreu um erro interno no servidor, contate o administrador do sistema.',
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
                    <label class="control-label">Descrição *</label>
                    <Field class="form-control" 
                      name="Descricao"
                      placeholder="Insira uma breve descrição da categoria do produto..."
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
