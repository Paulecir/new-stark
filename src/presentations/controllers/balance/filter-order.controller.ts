import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { BalanceService } from "@/services/balance";
import { CategoryService } from "@/services/category";
import { UserService } from "@/services/user";

/**
 * Lida com a filtragem de ordens de saldo.
 * 
 * Esta função recebe uma requisição contendo os parâmetros de filtro e tenta buscar as ordens de saldo
 * correspondentes utilizando o `BalanceService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada.
 * Caso ocorra um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de filtro.
 * @property {Object} requestData.query - O objeto que contém os parâmetros de filtro.
 * @property {string} requestData.query.amount - O valor do saldo.
 * @property {string} requestData.query.description - A descrição do saldo.
 * @property {string} requestData.query.user - O nome do usuário.
 * @property {string} requestData.query.releasedBy - O nome do liberador.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDoFiltro }, metadata: { ...metadata } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const filterBalanceOrderController = async (requestData: IRequest) => {
    try {
        // Inicializa os filtros
        const filter = []
        const orFilter = []

        // Adiciona filtros baseados nos parâmetros da requisição
        if (requestData.query.amount) orFilter.push({ amount: parseFloat(requestData.query.amount) })
        if (requestData.query.description) orFilter.push({ description:{ contains: requestData.query.description } })
        if (requestData.query.user) orFilter.push({ user: { name: { contains: requestData.query.user } } })
        if (requestData.query.releasedBy) orFilter.push({ releasedBy: { name: { contains: requestData.query.releasedBy } } })

        // Se houver filtros, adiciona-os ao filtro principal
        if (orFilter.length > 0) {
            filter.push({
                OR: orFilter
            })
        }

        // Recupera as ordens de saldo filtradas usando o BalanceService
        const userFilter = await BalanceService.filterOrderBalance(filter, { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 });

        // Retorna uma resposta de sucesso com os dados filtrados
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