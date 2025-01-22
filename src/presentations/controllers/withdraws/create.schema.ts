import * as yup from 'yup'

export const schemaCreateWithdraw = yup.object().shape({
    amount: yup.number(),
    wallet_id: yup.number(),
    user_id: yup.number()

});