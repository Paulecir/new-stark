import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    strategy: yup.string()
});