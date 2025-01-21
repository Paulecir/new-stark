import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    amount: yup.string()
        .required('O campo amount é obrigatório.')
});