import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaCreateWallet } from "./create.schema"
import { WalletService } from "@/services/wallet";

/**
 * Lida com a criação de uma nova carteira.
 * 
 * Esta função recebe uma requisição contendo os dados da carteira, valida os dados e cria uma nova carteira no banco de dados.
 * Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os dados da carteira.
 * @property {Object} requestData.body - O corpo da requisição contendo os dados da carteira.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 201, message: 'Wallet registered successfully', data: { ...dadosDaCarteira } }
 * // Em caso de erro de validação: { status: 400, message: 'Mensagem de erro', errors: { ...detalhesDosErros } }
 * // Em caso de erro genérico: { status: 500, message: 'Mensagem de erro' }
 */
export const createWalletController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schemaCreateWallet.validate(requestData.body, { abortEarly: false });

        // Criar a carteira no banco de dados
        const data = await WalletService.createWallet(validatedData)

        // Retorna uma resposta de sucesso com os dados da carteira criada
        return HttpResponse.successResponse({
            message: 'Wallet registered successfully',
            data,
            status: 201
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção de validação
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        // Retorna uma resposta de erro caso ocorra uma exceção genérica
        return HttpResponse.errorResponse({ message: err.message });
    }
}