import Prisma from '@/infra/db/prisma';
import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio').min(8, 'El nombre debe tener al menos 8 caracteres'),
    login: yup.string()
        .required('Login is required'),
        // .matches(/^[a-zA-Z0-9 _]+$/, 'El inicio de sesión debe contener solo caracteres alfanuméricos'),
    email: yup.string()
        .required('Es necessario is required')
        .email('Formato de correo electrónico no válido'),
    phone: yup.string()
        .required('Se requiere teléfono'),
    country_name: yup.string().required('El nombre del país es obligatorio'),
    country_code: yup.string().required('Se requiere el código de país'),
});