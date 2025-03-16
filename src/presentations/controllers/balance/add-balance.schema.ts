import * as yup from 'yup'

// Define o esquema de validação para adicionar saldo
export const schema = yup.object().shape({
    description: yup.string().nullable(), // Descrição do saldo, pode ser nula
    user_id: yup.number(), // ID do usuário, deve ser um número
    released_by_id: yup.number(), // ID do liberador, deve ser um número
    amount: yup.number(), // Valor do saldo, deve ser um número
});