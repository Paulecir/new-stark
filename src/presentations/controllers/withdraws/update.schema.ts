import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    name: yup.string()
        .required('O campo nome é obrigatório.')
        .min(3, 'O nome deve ter no mínimo 3 caracteres.')
        .max(100, 'O nome deve ter no máximo 100 caracteres.'),

  
});