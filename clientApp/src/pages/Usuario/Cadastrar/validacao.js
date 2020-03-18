import * as yup from 'yup';

export default yup.object().shape({
  Nome: yup
    .string()
    .min(3, 'O nome está muito curto, digite ao menos 4 caracteres.')
    .max(32, 'O nome está muito grande, digite no máximo 32 caracteres.')
    .required('Preencha este campo...'),
  Sobrenome: yup
    .string()
    .max(32, 'O sobrenome está muito grande, digite no máximo 32 caracteres.'),
  CPF: yup
    .string()
    .max(16, 'O CPF está muito grande, digite no máximo 16 caracteres.'),
  RG: yup
    .string()
    .max(16, 'O RG está muito grande, digite no máximo 16 caracteres.'),
  Celular: yup
    .string()
    .max(16, 'O Celular está muito grande, digite no máximo 16 caracteres.'),
  DataNascimento: yup.date('Informe uma data válida'),
  Telefone: yup
    .string()
    .max(16, 'O Telefone está muito grande, digite no máximo 16 caracteres.'),
  Email: yup
    .string()
    .max(64, 'O email está muito grande, digite no máximo 64 caracteres.')
    .min(4, 'O email está muito curto, digite ao menos 4 caracteres.')
    .email('Formato incorreto, informe um email...')
    .required('Preencha este campo...'),
  Senha: yup
    .string()
    .min(4, 'A senha está muito curta, digite ao menos 4 caracteres.')
    .max(20, 'A senha está muito grande, digite no máximo 20 caracteres.')
    .required('Preencha este campo...')
});
