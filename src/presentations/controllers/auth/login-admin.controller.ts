import JwtAdapter from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import Sessions from "@/cache/Sessions"

/**
 * Lida com o login de um administrador.
 * 
 * Esta função recebe uma requisição contendo o ID do usuário e tenta autenticar o usuário
 * utilizando o `Prisma` para buscar os dados do usuário. Se for bem-sucedida, retorna um token JWT
 * e armazena a sessão do usuário no cache. Caso ocorra um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} httpRequest - O objeto de requisição contendo os dados de login.
 * @property {Object} httpRequest.body - O objeto que contém os dados de login.
 * @property {string} httpRequest.body.id - O ID do usuário.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: 'OK', data: { token: accessToken } }
 * // Em caso de erro: { status: 401, message: 'Mensagem de erro' }
 */
export const loginAdminController = async (httpRequest: IRequest) => {

    try {
        // Verifica se o ID foi fornecido
        if (!httpRequest.body.id) {
            return HttpResponse.notAuthorized({
                message: "ID_NOT_FOUND",
                error_code: "ID_NOT_FOUND"
            })
        }
    
        // Verifica se o usuário é um administrador
        if (!httpRequest.user || httpRequest.user.profile !== "admin") {
            return HttpResponse.notAuthorized({
                message: "NOT_AUTHORIZED",
                error_code: "NOT_AUTHORIZED"
            })
        }

        // Procura o usuário no banco de dados pelo ID
        let user = await Prisma.user.findFirst({
            where: {
                id: parseInt(httpRequest.body.id)
            },
            select: {
                id: true,
                login: true,
                password: true,
                sponsor: true,
                name: true,
                email: true,
                country_code: true,
                country_name: true,
                phone: true,
                profile: true,
                is_active: true
            }
        })

        // Se o usuário não for encontrado, retorna erro de autorização
        if (!user) {
            return HttpResponse.notAuthorized({
                message: "USER_NOT_FOUND",
                error_code: "USER_NOT_FOUND"
            })
        }
        
        // Gera um token JWT para o usuário
        const accessToken = await JwtAdapter.encrypt(
            {
                id: user.id.toString(),
                "name": user.name.toString(),
                "login": user.login?.toString(),
                "email": user.email?.toString(),
                "phone": user.phone?.toString(),
                "country_code": user.country_code?.toString(),
                "country_name": user.country_name?.toString(),
                "profile": user.profile?.toString(),
                "position": null,
                "avatar": null,
                "sponsor_login": user.sponsor?.login || null,
                "sponsor_name": user.sponsor?.name || null,
            }, { expiresIn: '1h' }
        )

        // Armazena a sessão do usuário no cache
        await Sessions.set(accessToken, { ...user, userAgent: httpRequest.userAgent, ip: httpRequest.ip, latitude: httpRequest.body.latitude, longitude: httpRequest.body.longitude })

        // Retorna a resposta de sucesso com o token
        return HttpResponse.successRawResponse({
            message: "OK",
            data: { token: accessToken },
        })
    } catch (error) {
        console.error("E", error)
        return HttpResponse.serverError(error)
    }
}