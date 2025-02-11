import * as yup from 'yup'

export const schemaCreateWithdraw = yup.object().shape({
    amount: yup.number().min(10, 'El importe debe ser mayor a $10').required('El importe es un campo obligatorio'),
    wallet: yup.string().required('La billetera no puede ser nula'),
    user_id: yup.number().required()

});