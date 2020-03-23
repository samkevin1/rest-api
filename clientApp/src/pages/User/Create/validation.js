import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .min(3, 'O nome está muito curto, digite ao menos 4 caracteres.')
    .max(32, 'O nome está muito grande, digite no máximo 32 caracteres.')
    .required('Preencha este campo...'),
  last_name: yup
    .string()
    .max(32, 'O sobrenome está muito grande, digite no máximo 32 caracteres.'),
  cpg: yup
    .string()
    .max(16, 'O CPF está muito grande, digite no máximo 16 caracteres.'),
  rg: yup
    .string()
    .max(16, 'O RG está muito grande, digite no máximo 16 caracteres.'),
  celular: yup
    .string()
    .max(16, 'O Celular está muito grande, digite no máximo 16 caracteres.'),
  birth_date: yup.date('Informe uma data válida'),
  telephone: yup
    .string()
    .max(16, 'O Telefone está muito grande, digite no máximo 16 caracteres.'),
  email: yup
    .string()
    .max(64, 'O email está muito grande, digite no máximo 64 caracteres.')
    .min(4, 'O email está muito curto, digite ao menos 4 caracteres.')
    .email('Formato incorreto, informe um email...')
    .required('Preencha este campo...'),
  password: yup
    .string()
    .min(4, 'A senha está muito curta, digite ao menos 4 caracteres.')
    .max(20, 'A senha está muito grande, digite no máximo 20 caracteres.')
    .required('Preencha este campo...'),
  cellphone: yup
    .string()
    .max(16, 'O celular está muito grande, digite no máximo 16 caracteres.'),
});
