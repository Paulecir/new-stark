import * as yup from 'yup'

export const schemaExtract = yup.object().shape({
    wallet: yup.array(yup.string()).required('O campo wallet é obrigatório.')
        .min(1, 'O nome deve ter no mínimo 1 registro.')
});