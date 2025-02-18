import Prisma from "@/infra/db/prisma";
import NodeMailer from "@/infra/mailer/nodemailer";
import SendgridMailer from "@/infra/mailer/sendgrid";
import { randomUUID } from "crypto";
import moment from "moment";

export const resetPasswordUser = async (data: any) => {
    try {
        const token = randomUUID()

        await Prisma.user.updateMany({
            where: {
                email: data.email
            },
            data: {
                remember_token: token
            }
        })

        await NodeMailer.sendMail({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
            to: data.email, // list of receivers
            subject: "Registro de usuario password", // Subject line
            html: `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Restablecimiento de Contraseña</title>
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
                                <h2>Restablecimiento de Contraseña</h2>
                            </div>

                            <div class="email-body">
                                <p>Hola,</p>
                                <p>Hemos recibido una solicitud para restablecer su contraseña de acceso a <span class="highlight">StarkTecnología</span>.</p>
                                <p>Para restablecer su contraseña, haga clic en el botón a continuación:</p>
                                <a href="https://starktecnologia.com/auth/reset-password/${token}" class="button">
                                    Restablecer Contraseña
                                </a>

                                <div class="divider"></div>

                                <p>Si usted no solicitó este cambio, <span class="highlight">ignore este correo electrónico</span>. Su contraseña permanecerá sin cambios.</p>
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
        })
            .then(res => {
                console.log("R", res)
            })
            .catch(err => {
                console.log("E", err)
            })

        // await SendgridMailer.send({
        //     from: `"${process.env.MAIL_FROM_NAME} " <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
        //     to: data.email, // list of receivers
        //     subject: "Registro de usuario password", // Subject line
        //     html: `<!DOCTYPE html>
        //             <html lang="es">
        //             <head>
        //                 <meta charset="UTF-8">
        //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                 <title>Restablecimiento de Contraseña</title>
        //                 <style>
        //                     body {
        //                         font-family: Arial, sans-serif;
        //                         margin: 0;
        //                         padding: 0;
        //                         background-color: #f4f4f9;
        //                         color: #333;
        //                     }
        //                     .email-container {
        //                         max-width: 600px;
        //                         margin: 30px auto;
        //                         background-color: #ffffff;
        //                         border-radius: 8px;
        //                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        //                         overflow: hidden;
        //                     }
        //                     .email-header {
        //                         background-color: #233044;
        //                         color: #ffffff;
        //                         text-align: center;
        //                         padding: 20px 10px;
        //                     }
        //                     .email-body {
        //                         padding: 20px;
        //                         line-height: 1.6;
        //                         text-align: center;
        //                     }
        //                     .email-footer {
        //                         background-color: #f4f4f9;
        //                         text-align: center;
        //                         padding: 10px;
        //                         font-size: 12px;
        //                         color: #777;
        //                     }
        //                     .button {
        //                         display: inline-block;
        //                         margin-top: 20px;
        //                         background-color: #233044;
        //                         color: #ffffff;
        //                         padding: 12px 24px;
        //                         text-decoration: none;
        //                         border-radius: 5px;
        //                         font-weight: bold;
        //                         font-size: 16px;
        //                         transition: background-color 0.3s ease;
        //                     }
        //                     .button:hover {
        //                         background-color: #1b2433;
        //                     }
        //                     .divider {
        //                         height: 1px;
        //                         background-color: #ddd;
        //                         margin: 20px 0;
        //                     }
        //                     .logo {
        //                         max-width: 120px;
        //                         margin-bottom: 10px;
        //                     }
        //                     .highlight {
        //                         font-weight: bold;
        //                         color: #233044;
        //                     }
        //                 </style>
        //             </head>
        //             <body>
        //                 <div class="email-container">
        //                     <div class="email-header">
        //                         <img src="https://starktecnologia.com/images/logo.svg" alt="Logo StarkTecnologia" class="logo" style="max-width: 120px; margin-bottom: 10px;">
        //                         <h2>Restablecimiento de Contraseña</h2>
        //                     </div>

        //                     <div class="email-body">
        //                         <p>Hola,</p>
        //                         <p>Hemos recibido una solicitud para restablecer su contraseña de acceso a <span class="highlight">StarkTecnología</span>.</p>
        //                         <p>Para restablecer su contraseña, haga clic en el botón a continuación:</p>
        //                         <a href="https://starktecnologia.com/auth/reset-password/${token}" class="button">
        //                             Restablecer Contraseña
        //                         </a>

        //                         <div class="divider"></div>

        //                         <p>Si usted no solicitó este cambio, <span class="highlight">ignore este correo electrónico</span>. Su contraseña permanecerá sin cambios.</p>
        //                         <p>Si necesita ayuda, no dude en ponerse en contacto con nuestro soporte técnico.</p>

        //                         <p style="margin-top: 30px; font-size: 14px; color: #555;">Atentamente,<br>
        //                         El equipo de <span class="highlight">StarkTecnología</span></p>
        //                     </div>

        //                     <div class="email-footer">
        //                         <p>&copy; ${moment().format("Y")} StarkTecnología. Todos los derechos reservados.</p>
        //                         <p>Este es un correo electrónico automático. Por favor, no responda.</p>
        //                     </div>
        //                 </div>
        //             </body>
        //             </html>`
        // }).then(res => {
        //     console.log("R", res)
        // })
        //     .catch(err => {
        //         console.log("E", err)
        //     })

        return null;
    } catch (err) {
        if (err.name === 'PrismaClientValidationError') {
            const msg = err.message.split("Unknown argument")[1].split(". Available")[0]
            throw new Error(`Unknow field ${msg}`)
        }
    }

}