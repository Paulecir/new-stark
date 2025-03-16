import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { DirectService } from "@/services/strategies/direct";

/**
 * Lida com a recuperação das estatísticas diretas de um usuário.
 * 
 * Esta função recebe uma requisição contendo o ID do usuário e tenta buscar as estatísticas diretas
 * utilizando o `DirectService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra
 * um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de consulta.
 * @property {Object} requestData.query - O objeto que contém os parâmetros de consulta.
 * @property {string} requestData.query.parentId - O ID do usuário pai para recuperar as estatísticas.
 * @property {string} requestData.query.level - O nível das estatísticas a serem recuperadas.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDasEstatisticas } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const getDirectStatsController = async (requestData: IRequest) => {
    try {
        // Recupera as estatísticas diretas pelo ID do usuário pai ou do usuário atual
        const user = await DirectService.getDirectStatsById({ 
            id: requestData.query.parentId || requestData.user.id, 
            user: requestData.user, 
            level: requestData.query.level 
        });

        // Retorna uma resposta de sucesso com os dados das estatísticas recuperadas
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