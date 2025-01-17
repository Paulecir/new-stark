import * as yup from 'yup'

export const schema = yup.object().shape({
    wallet: yup.array(yup.string()).optional()
});