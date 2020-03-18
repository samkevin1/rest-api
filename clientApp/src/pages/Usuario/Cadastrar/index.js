import React from 'react';
import http_request from '../../../utils/http_request';
import api_urls from '../../../utils/api_urls';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import validacao from './validacao';

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
              Nome: '',
              Sobrenome: '',
              CPF: '',
              RG: '',
              Email: '',
              Celular: '',
              DataNascimento: new Date(),
              Telefone: '',
              Senha: ''
            }}
            validationSchema={validacao}
            onSubmit={values => {
              if(values.DataNascimento == null){
                values.DataNascimento = new Date();
              }
              swal({
                text: 'Realizando ação, aguarde...',
                buttons: { cancel: 'Ok' }
              });
              http_request
                .post(api_urls.cadastrar_usuario, values)
                .then(res => {
                  if (res.data.sucesso) {
                    swal({
                      title: 'Sucesso',
                      text: res.data.mensagem,
                      icon: 'success',
                      buttons: { cancel: 'Ok' }
                    }).then(() => {
                      history.push('/usuarios');
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
                      placeholder="Insira o nome do usuário..."
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
                    <label class="control-label">Sobrenome</label>
                    <Field
                      class="form-control"
                      placeholder="Insira o sobrenome do usuário..."
                      name="Sobrenome"
                      value={formik.values.Sobrenome}
                      error={
                        formik.errors.Sobrenome && formik.touched.Sobrenome
                      }
                      onChange={e =>
                        formik.setFieldValue('Sobrenome', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.Sobrenome && formik.errors.Sobrenome}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Senha (*)</label>
                    <Field
                      placeholder="Insira a senha do usuário..."
                      type="password"
                      class="form-control"
                      name="Senha"
                      value={formik.values.Senha}
                      error={formik.errors.Senha && formik.touched.Senha}
                      onChange={e =>
                        formik.setFieldValue('Senha', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.Senha && formik.errors.Senha}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">CPF</label>
                    <Field
                      placeholder="Insira o CPF do usuário..."
                      class="form-control"
                      name="CPF"
                      value={formik.values.CPF}
                      error={formik.errors.CPF && formik.touched.CPF}
                      onChange={e =>
                        formik.setFieldValue('CPF', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.CPF && formik.errors.CPF}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">RG </label>
                    <Field
                      placeholder="Insira o RG do usuário..."
                      class="form-control"
                      name="RG"
                      value={formik.values.RG}
                      error={formik.errors.RG && formik.touched.RG}
                      onChange={e => formik.setFieldValue('RG', e.target.value)}
                    />
                    <div className="msg-error">
                      {formik.touched.RG && formik.errors.RG}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Celular </label>
                    <Field
                      class="form-control"
                      name="Celular"
                      placeholder="Insira o celular do usuário..."
                      value={formik.values.Celular}
                      error={formik.errors.Celular && formik.touched.Celular}
                      onChange={e =>
                        formik.setFieldValue('Celular', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.Celular && formik.errors.Celular}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Telefone</label>
                    <Field
                      placeholder="Insira o telefone do usuário..."
                      class="form-control"
                      name="Telefone"
                      value={formik.values.Telefone}
                      error={formik.errors.Telefone && formik.touched.Telefone}
                      onChange={e =>
                        formik.setFieldValue('Telefone', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.Telefone && formik.errors.Telefone}
                    </div>
                  </div>

                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Email (*)</label>
                    <Field
                      placeholder="Insira o email do usuário..."
                      type="email"
                      class="form-control"
                      name="Email"
                      value={formik.values.Email}
                      error={formik.errors.Email && formik.touched.Email}
                      onChange={e =>
                        formik.setFieldValue('Email', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.Email && formik.errors.Email}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Tipo do usuário (*)</label>
                    <select
                      class="form-control"
                      name="Role"
                      value={formik.values.Role}
                      error={formik.errors.Role && formik.touched.Role}
                      onChange={e =>
                        formik.setFieldValue('Role', e.target.value)
                      }
                    >
                      <option value={0}>Usuário</option>
                      <option value={1}>Administrador</option>
                    </select>
                    <div className="msg-error">
                      {formik.touched.Role && formik.errors.Role}
                    </div>
                  </div>
                  <div class="form-group col-md-6 col-sm-12">
                    <label class="control-label">Data de nascimento</label>
                    <Field
                      placeholder="Insira a data de nascimento do usuário..."
                      type="date"
                      class="form-control"
                      name="DataNascimento"
                      value={formik.values.DataNascimento}
                      error={
                        formik.errors.DataNascimento &&
                        formik.touched.DataNascimento
                      }
                      onChange={e =>
                        formik.setFieldValue('DataNascimento', e.target.value)
                      }
                    />
                    <div className="msg-error">
                      {formik.touched.DataNascimento &&
                        formik.errors.DataNascimento}
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
