import * as yup from 'yup'

export const schema = yup.object().shape({
    name: yup.string()
        .required('O campo nome é obrigatório.')
        .min(3, 'O nome deve ter no mínimo 3 caracteres.')
        .max(100, 'O nome deve ter no máximo 100 caracteres.'),

    description: yup.string()
        .nullable(),

    price: yup.number()
        .required('O campo preço é obrigatório.')
        .min(0.01, 'O preço deve ser maior que 0.01.'),

    yield_type: yup.string()
        .required('O tipo de rendimento é obrigatório.')
        .oneOf(
            ['diary', 'weekly', 'monthly', 'semiannual', 'annual'],
            'O tipo de rendimento deve ser: diary, weekly, monthly, semiannual ou annual.'
        ),

    yield: yup.number()
        .required('O rendimento é obrigatório.')
        .min(0, 'O rendimento deve ser no mínimo 0.'),

});