import Prisma from '@/infra/db/prisma';
import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(8, 'Name must be at least 8 characters'),
    login: yup.string()
        .required('Login is required')
        .matches(/^[a-zA-Z0-9]+$/, 'Login must contain only alphanumeric characters'),
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    phone: yup.string()
        .required('Phone is required'),
    country_name: yup.string().required('Country name is required'),
    country_code: yup.string().required('Country code is required'),
});