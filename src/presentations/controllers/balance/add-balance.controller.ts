import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { ProductService } from "@/services/product"
import { BalanceService } from "@/services/balance"
import { schema } from "./add-balance.schema"

/**
 * Lida com a adição de saldo para um usuário.
 * 
 * Esta função recebe uma requisição contendo os dados do saldo e tenta adicionar o saldo
 * utilizando o `BalanceService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada.
 * Caso ocorra um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os dados do saldo.
 * @property {Object} requestData.body - O objeto que contém os dados do saldo.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 201, message: 'Product registered successfully', data: { ...dadosDoSaldo } }
 * // Em caso de erro: { status: 400, message: 'Mensagem de erro', errors: [ ...errosDeValidação ] }
 */
export const addBalanceController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schema.validate(requestData.body, { abortEarly: false });

        // Adicionar o saldo ao usuário no banco de dados
        const data = await BalanceService.addBalanceToUser(validatedData, requestData.user)

        // Retorna uma resposta de sucesso com os dados do saldo adicionado
        return HttpResponse.successResponse({
            message: 'Product registered successfully',
            data,
            status: 201
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção de validação
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        // Retorna uma resposta de erro caso ocorra qualquer outra exceção
        return HttpResponse.errorResponse({ message: err.message });
    }
}