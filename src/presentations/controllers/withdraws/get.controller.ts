import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WithdrawService } from "@/services/withdraw";

/**
 * Lida com a recuperação de um saque pelo seu ID.
 * 
 * Esta função recebe uma requisição contendo o ID do saque e tenta buscar os dados correspondentes
 * utilizando o `WithdrawService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra
 * um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de consulta.
 * @property {Object} requestData.params - O objeto que contém os parâmetros de consulta.
 * @property {string} requestData.params.id - O ID do saque que será recuperado.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDoSaque } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const getWithdrawController = async (requestData: IRequest) => {
    try {
        // Recupera o saque pelo ID usando o WithdrawService
        const user = await WithdrawService.getWithdrawById(parseInt(requestData.params.id));

        // Retorna uma resposta de sucesso com os dados do saque recuperado
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