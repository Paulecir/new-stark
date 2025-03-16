import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WalletService } from "@/services/wallet";

/**
 * Lida com a recuperação de uma carteira pelo seu ID.
 * 
 * Esta função recebe uma requisição contendo o ID da carteira e tenta buscar os dados correspondentes
 * utilizando o `WalletService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra
 * um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de consulta.
 * @property {Object} requestData.params - O objeto que contém os parâmetros de consulta.
 * @property {string} requestData.params.id - O ID da carteira que será recuperada.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDaCarteira } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const getWalletController = async (requestData: IRequest) => {
    try {
        // Recupera a carteira pelo ID usando o WalletService
        const user = await WalletService.getWalletById(parseInt(requestData.params.id));

        // Retorna uma resposta de sucesso com os dados da carteira recuperada
        return HttpResponse.successResponse({
            message: '',
            data: user,
            status: 200
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção
        return HttpResponse.errorResponse({ message: err.message });
    }
};