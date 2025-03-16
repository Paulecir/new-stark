import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaCreateWithdraw } from "./create.schema"
import { WithdrawService } from "@/services/withdraw";
import Prisma from "@/infra/db/prisma";

/**
 * Lida com a criação de um novo saque.
 * 
 * Esta função recebe uma requisição contendo os dados do saque, valida os dados e cria um novo saque no banco de dados.
 * Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os dados do saque.
 * @property {Object} requestData.body - O corpo da requisição contendo os dados do saque.
 * @property {Object} requestData.user - O objeto que contém os dados do usuário autenticado.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 201, message: 'Withdraw registered successfully', data: { ...dadosDoSaque } }
 * // Em caso de erro de validação: { status: 400, message: 'Mensagem de erro', errors: { ...detalhesDosErros } }
 * // Em caso de erro genérico: { status: 500, message: 'Mensagem de erro' }
 */
export const createWithdrawController = async (requestData: IRequest) => {

    try {
        // Recupera o usuário pelo ID
        const user = await Prisma.user.findFirst({
            where: {
                id: requestData.user.id
            }
        })
        // Validar os dados da requisição
        const validatedData = await schemaCreateWithdraw.validate({...requestData.body, wallet: user.bep20_address, user_id: requestData.user.id }, { abortEarly: false });

        // Criar o saque no banco de dados
        const data = await Prisma.$transaction(async (tx) => await WithdrawService.createWithdraw(validatedData, tx), { timeout: 10000, maxWait: 10000 })

        // Retorna uma resposta de sucesso com os dados do saque criado
        return HttpResponse.successResponse({
            message: 'Withdraw registered successfully',
            data,
            status: 201
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção de validação
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        // Retorna uma resposta de erro caso ocorra uma exceção personalizada
        if (err.name === 'CUSTOM_ERROR') {
            return err ;
        }
        // Retorna uma resposta de erro caso ocorra uma exceção genérica
        return HttpResponse.errorResponse({ message: err.message });
    }
}