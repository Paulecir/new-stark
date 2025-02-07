import * as yup from 'yup'

export const schemaCreateWithdraw = yup.object().shape({
    amount: yup.number().required('El importe es un campo obligatorio'),
    wallet: yup.string().required('La billetera no puede ser nula'),
    user_id: yup.number().required()

});