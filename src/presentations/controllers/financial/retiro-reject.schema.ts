import * as yup from 'yup'

export const schema = yup.object().shape({
    ids: yup.array(yup.number()).required('O campo ids é obrigatório.')
});