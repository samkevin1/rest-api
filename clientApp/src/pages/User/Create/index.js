import React from 'react';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import validation from './validation';

export default function() {
  const history = useHistory();

  return (
    <div class="col-md-12 mb-4">
      <div class="card mb-3 text-left">
        <div class="card-body">
          <h4 class="card-title mb-3">Cadastrar funcionário</h4>
          <p>Todos os campos com (*) devem ser preenchidos..</p>
          <Formik
            initialValues={{
              name: '',
              last_name: '',
              cpf: '',
              rg: '',
              email: '',
              birth_date: new Date(),
              telephone: '',
              password: '',
              cellphone: ''
            }}
            validationSchema={validation}
            onSubmit={values => {
              console.log(values)
              if(values.birth_date == null){
                values.birth_date = new Date();
              }
              swal({
                text: 'Realizando ação, aguarde...',
                buttons: { cancel: 'Ok' }
              });
              http_request
                .post(api_urls.create_user, values)
                .then(res => {
                  console.log(res)
                  if (res.data.success) {
                    swal({
                      title: 'Sucesso',
                      text: res.data.message,
                      icon: 'success',
                      buttons: { cancel: 'Ok' }
                    }).then(() => {
                      history.push('/usuarios');
                    });
                  } else {
                    swal({
                      title: 'Erro',
                      text: res.data.message,
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
                      placeholder="Insira o nome do usuário..."
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
                    <label class="control-label">Sobrenome</label>
                    <Field
                      class="form-control"
                      placeholder="Insira o sobrenome do usuário..."
                      name="Sobrenome"
                      value={formik.values.last_name}
                      error={
                        formik.errors.last_name && formik.touched.last_name
                      }
                      onChange={e =>
                        formik.setFieldValue('last_name', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.last_name && formik.errors.last_name}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Senha (*)</label>
                    <Field
                      placeholder="Insira a senha do usuário..."
                      type="password"
                      class="form-control"
                      name="Senha"
                      value={formik.values.password}
                      error={formik.errors.password && formik.touched.password}
                      onChange={e =>
                        formik.setFieldValue('password', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">CPF</label>
                    <Field
                      placeholder="Insira o CPF do usuário..."
                      class="form-control"
                      name="CPF"
                      value={formik.values.cpf}
                      error={formik.errors.cpf && formik.touched.cpf}
                      onChange={e =>
                        formik.setFieldValue('cpf', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.cpf && formik.errors.cpf}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">RG </label>
                    <Field
                      placeholder="Insira o RG do usuário..."
                      class="form-control"
                      name="RG"
                      value={formik.values.rg}
                      error={formik.errors.rg && formik.touched.rg}
                      onChange={e => formik.setFieldValue('rg', e.target.value)}
                    />
                    <div className="msg-error">
                      {formik.touched.rg && formik.errors.rg}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Celular </label>
                    <Field
                      class="form-control"
                      name="Celular"
                      placeholder="Insira o celular do usuário..."
                      value={formik.values.cellphone}
                      error={formik.errors.cellphone && formik.touched.cellphone}
                      onChange={e =>
                        formik.setFieldValue('cellphone', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.cellphone && formik.errors.cellphone}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Telefone</label>
                    <Field
                      placeholder="Insira o telefone do usuário..."
                      class="form-control"
                      name="Telefone"
                      value={formik.values.telephone}
                      error={formik.errors.telephone && formik.touched.telephone}
                      onChange={e =>
                        formik.setFieldValue('telephone', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.telephone && formik.errors.telephone}
                    </div>
                  </div>

                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Email (*)</label>
                    <Field
                      placeholder="Insira o email do usuário..."
                      type="email"
                      class="form-control"
                      name="Email"
                      value={formik.values.email}
                      error={formik.errors.email && formik.touched.email}
                      onChange={e =>
                        formik.setFieldValue('email', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Data de nascimento</label>
                    <Field
                      placeholder="Insira a data de nascimento do usuário..."
                      type="date"
                      class="form-control"
                      name="DataNascimento"
                      value={formik.values.birth_date}
                      error={
                        formik.errors.birth_date &&
                        formik.touched.birth_date
                      }
                      onChange={e =>
                        formik.setFieldValue('birth_date', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.birth_date &&
                        formik.errors.birth_date}
                    </div>
                  </div>

                  <div class="form-group col-md-12 col-sm-12 mb-3">
                    <button
                      type="submit"
                      class="btn btn-raised ripple btn-raised-primary"
                    >
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
