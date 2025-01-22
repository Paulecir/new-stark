import * as yup from 'yup';

export const schema = yup.object().shape({
    token: yup.string()
        .required('O Token é obrigatório'),
    password: yup.string()
        .required("A senha é obrigatória")
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    password_confirmation: yup.string()
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
        .required("A confirmação de senha é obrigatória"),
});