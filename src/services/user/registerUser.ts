import Prisma from "@/infra/db/prisma";
import bcrypt from "bcrypt"
import { Web3Services } from "../web3/Web3Services";
import { faker } from "@faker-js/faker";
import axios from "axios";
import moment from "moment";
import NodeMailer from "@/infra/mailer/nodemailer";
import SendgridMailer from "@/infra/mailer/sendgrid";

/**
 * Registra um novo usuário no sistema.
 * 
 * Esta função recebe os dados do usuário, valida o patrocinador, cria uma carteira BEP20, 
 * gera a senha do usuário, salva os dados no banco de dados e envia um email de confirmação.
 * 
 * @param {Object} data - Os dados do usuário a ser registrado.
 * @returns {Promise<Object|null>} Os dados do usuário registrado ou null em caso de erro.
 */
export const registerUser = async (data: any) => {
    try {
        // Busca o patrocinador no banco de dados
        const sponsor = await Prisma.user.findFirst({
            where: {
                login: data.sponsor_login
            }
        })

        // let bep20_address = null;
        // let bep20_public_key = null;
        // let bep20_private_key = null;

        // Autentica na API da carteira e cria uma nova carteira BEP20
        const info = await axios.post(`${process.env.WALLET_URI}/api/v1/auth/signin`, {
            "email": process.env.WALLET_LOGIN,
            "password": process.env.WALLET_PASSWORD,
        }).then(res => {
            return res.data
        }).catch(res => null)

        if (info?.token) {
            const wallet = await axios.get(`${process.env.WALLET_URI}/api/v1/wallet/create`, {
                headers: {
                    Authorization: `Bearer ${info.token}`
                }
            }).then(res => {
                return res?.data?.data?.data || null
            }).catch(res => {
                return null
            })

            // if (wallet) {
            //     bep20_address = wallet.address;
            //     bep20_public_key = wallet.publicKey;
            //     bep20_private_key = wallet.encryptedPrivateKey;
            // }
        }

        // Monta a árvore de ancestrais do usuário
        let ancestry: any = []
        let sponsor_id = sponsor.id
        let checkSponsor: any = null
        do {
            if (!sponsor_id) break;
            checkSponsor = await Prisma.user.findFirst({
                where: {
                    id: sponsor_id
                }
            })

            if (!checkSponsor) break;

            ancestry.push(`#${checkSponsor.id}#`)
            sponsor_id = checkSponsor.sponsor_id

        } while (checkSponsor)

        // Gera a senha do usuário
        const dataPassword = data.password || faker.internet.password()
        const password = data.password ? await bcrypt.hash(data.password, 12) : await bcrypt.hash(dataPassword, 12);

        // Cria o usuário no banco de dados
        const user = await Prisma.user.create({
            data: {
                name: data.name,
                login: data.login,
                email: data.email,
                phone: data.phone,
                country_name: data.country_name,
                country_code: data.country_code,
                sponsor_id: sponsor.id,
                password, // Idealmente, você deve hash a senha antes de salvar,
                // bep20_address,
                // bep20_public_key,
                // bep20_private_key,
                is_active: true,
                ancestry: ancestry.reverse().join('')
            },
        });

        // Envia um email de confirmação para o usuário
        await SendgridMailer.send({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
            to: data.email, // list of receivers
            subject: "Registro de usuario", // Subject line
            html: `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Registro de usuario</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f9;
                                color: #333;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 30px auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
                            .email-header {
                                background-color: #233044;
                                color: #ffffff;
                                text-align: center;
                                padding: 20px 10px;
                            }
                            .email-body {
                                padding: 20px;
                                line-height: 1.6;
                                text-align: center;
                            }
                            .email-footer {
                                background-color: #f4f4f9;
                                text-align: center;
                                padding: 10px;
                                font-size: 12px;
                                color: #777;
                            }
                            .button {
                                display: inline-block;
                                margin-top: 20px;
                                background-color: #233044;
                                color: #ffffff;
                                padding: 12px 24px;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                                font-size: 16px;
                                transition: background-color 0.3s ease;
                            }
                            .button:hover {
                                background-color: #1b2433;
                            }
                            .divider {
                                height: 1px;
                                background-color: #ddd;
                                margin: 20px 0;
                            }
                            .logo {
                                max-width: 120px;
                                margin-bottom: 10px;
                            }
                            .highlight {
                                font-weight: bold;
                                color: #233044;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="email-header">
                                <img src="https://starktecnologia.com/images/logo.svg" alt="Logo StarkTecnologia" class="logo" style="max-width: 120px; margin-bottom: 10px;">
                                <h2>Registro de usuario</h2>
                            </div>

                            <div class="email-body">
                                <p>Hola,</p>
                                <p>Hemos recibido una solicitud para registro de usuario de acceso a <span class="highlight">StarkTecnología</span>.</p>
                                <p>Para ingresar a la plataforma, utilice las seguintes credenciais:</p>
                                <p>
                                    <b>Username:</b> ${user.login}<br />
                                    <b>Senha:</b> ${dataPassword}
                                </p>
                                <div class="divider"></div>
                                <a href="https://starktecnologia.com/auth/sign-in" class="button">
                                   Ir al inicio de sesión
                                </a>
        
                                <p>Si necesita ayuda, no dude en ponerse en contacto con nuestro soporte técnico.</p>

                                <p style="margin-top: 30px; font-size: 14px; color: #555;">Atentamente,<br>
                                El equipo de <span class="highlight">StarkTecnología</span></p>
                            </div>

                            <div class="email-footer">
                                <p>&copy; ${moment().format("Y")} StarkTecnología. Todos los derechos reservados.</p>
                                <p>Este es un correo electrónico automático. Por favor, no responda.</p>
                            </div>
                        </div>
                    </body>
                    </html>`
        }).then(res => {
        }).catch(err => {
            console.error("E", err)
        })

        return user;
    } catch (err) {
        console.error("E", err)
        return null
    }
}