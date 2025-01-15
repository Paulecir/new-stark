import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    name: yup.string()
        .required('O campo nome é obrigatório.')
        .min(3, 'O nome deve ter no mínimo 3 caracteres.')
        .max(100, 'O nome deve ter no máximo 100 caracteres.'),

    description: yup.string()
        .nullable()
        .max(500, 'A descrição deve ter no máximo 500 caracteres.'),

    price: yup.number()
        .required('O campo preço é obrigatório.')
        .min(0.01, 'O preço deve ser maior que 0.01.'),

    direct_bonus: yup.boolean()
        .required('O campo bônus direto é obrigatório.'),

    direct_bonus_yield: yup.number()
        .required('O rendimento do bônus direto é obrigatório.')
        .min(0, 'O rendimento do bônus direto deve ser no mínimo 0.')
        .max(1, 'O rendimento do bônus direto deve ser no máximo 1.'),

    yield_type: yup.string()
        .required('O tipo de rendimento é obrigatório.')
        .oneOf(
            ['diary', 'weekly', 'monthly', 'semiannual', 'annual'],
            'O tipo de rendimento deve ser: diary, weekly, monthly, semiannual ou annual.'
        ),

    yield: yup.number()
        .required('O rendimento é obrigatório.')
        .min(0, 'O rendimento deve ser no mínimo 0.'),

    unilevel_bonus: yup.boolean()
        .required('O campo bônus unilevel é obrigatório.'),

    unilevel_bonus_yield: yup.array()
        .nullable()
        .of(
            yup.number()
                .min(0, 'Cada rendimento do bônus unilevel deve ser no mínimo 0.')
                .max(1, 'Cada rendimento do bônus unilevel deve ser no máximo 1.')
        )
});