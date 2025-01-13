import Prisma from '@/infra/db/prisma';
import * as yup from 'yup'

export const updateSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(8, 'Name must be at least 8 characters'),
    login: yup.string()
        .required('Login is required')
        .matches(/^[a-zA-Z0-9]+$/, 'Login must contain only alphanumeric characters')
        .test('unique', 'Login must be unique', async (value) => {
            const userExists = await Prisma.user.findUnique({ where: { login: value } });
            return !userExists;
        }),
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .test('unique', 'Email must be unique', async (value) => {
            const emailExists = await Prisma.user.findUnique({ where: { email: value } });
            return !emailExists;
        }),
    phone: yup.string()
        .required('Phone is required')
        .test('unique', 'Phone must be unique', async (value) => {
            const phoneExists = await Prisma.user.findUnique({ where: { phone: value } });
            return !phoneExists;
        }),
    country_name: yup.string().required('Country name is required'),
    country_code: yup.string().required('Country code is required'),
    sponsor_login: yup.string()
        .required('Sponsor login is required')
        .test('exists', 'Sponsor login does not exist', async (value) => {
            const sponsorExists = await Prisma.user.findUnique({ where: { login: value } });
            return !!sponsorExists;
        }),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});