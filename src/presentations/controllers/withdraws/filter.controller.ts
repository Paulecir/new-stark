import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WithdrawService } from "@/services/withdraw";

/**
 * Lida com a recuperação de um usuário pelo seu ID.
 * 
 * Esta função recebe uma requisição contendo o ID do usuário e tenta buscar os dados correspondentes
 * utilizando o `UserService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra
 * um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de consulta.
 * @property {Object} requestData.query - O objeto que contém os parâmetros de consulta.
 * @property {string} requestData.query.id - O ID do usuário que será recuperado.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDoUsuario } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const filterWithdrawController = async (requestData: IRequest) => {
    try {
        // Recupera o usuário pelo ID usando o UserService
        const userFilter = await WithdrawService.filterWithdraw([], { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 });

        // Retorna uma resposta de sucesso com os dados do usuário recuperado
        return HttpResponse.successResponse({
            message: '',
            data: userFilter.data,
            metadata: userFilter.metadata,
            status: 200
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção
        return HttpResponse.errorResponse({ message: err.message });
    }
};