import * as yup from 'yup'

export const schemaCreateWithdraw = yup.object().shape({
    amount: yup.number(),
    wallet: yup.string(),
    user_id: yup.number()

});