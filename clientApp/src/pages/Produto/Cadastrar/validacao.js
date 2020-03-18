import * as yup from 'yup';

export default yup.object().shape({
    Titulo: yup
        .string()
        .min(3, 'O título está muito curto, digite ao menos 4 caracteres.')
        .max(32, 'O título está muito grande, digite no máximo 32 caracteres.')
        .required('Preencha este campo...'),
    Valor: yup
        .number("Insire um valor numérico...")
        .min(0, "O valor da despesa não pode ser igual à 0.")
        .required('Preencha este campo...'),
    DataVencimento: yup
        .date()
        .required("Preencha este campo...")
});
