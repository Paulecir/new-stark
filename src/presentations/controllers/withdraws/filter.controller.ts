import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WithdrawService } from "@/services/withdraw";

/**
 * Lida com a filtragem de saques com base em privilégios e parâmetros de consulta.
 * 
 * Esta função recebe uma requisição contendo privilégios e parâmetros de consulta e tenta buscar os dados correspondentes
 * utilizando o `WithdrawService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra
 * um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de consulta.
 * @property {Object} requestData.params - O objeto que contém os parâmetros de consulta.
 * @property {string} requestData.params.previleges - Os privilégios do usuário (admin ou user).
 * @property {Object} requestData.query - O objeto que contém os parâmetros de consulta.
 * @property {Object} requestData.pagination - O objeto que contém os parâmetros de paginação.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDoSaque } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const filterWithdrawController = async (requestData: IRequest) => {
    try {
        // Verifica se o usuário tem permissão para acessar os dados
        if (requestData.params.previleges === "admin" && requestData.user.profile !== "admin") {
            throw new Error("Sem permissão")
        }
        // Inicializa a variável para armazenar os dados filtrados
        let userFilter = null

        if (requestData.params.previleges === "admin") {
            const filter = []
            const orFilter = []
            // Adiciona filtros com base nos parâmetros de consulta
            if (requestData.query.name) orFilter.push({ user: { name: { contains: requestData.query.name } } } )
            if (requestData.query.login) orFilter.push({ user: { login: { contains: requestData.query.login } } })
            if (requestData.query.email) orFilter.push({ user: { email: { contains: requestData.query.email } } })
            if (requestData.query.status) orFilter.push({ status: requestData.query.status.toUpperCase() })
            if (orFilter.length > 0) {
                filter.push({ AND: orFilter })
            }
            // Filtra os saques para administradores
            userFilter = await WithdrawService.filterAdminWithdraw(filter, { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 });
        } else if (requestData.params.previleges === "user") {
            // Filtra os saques para usuários comuns
            userFilter = await WithdrawService.filterWithdraw([{ user_id: requestData.user.id }], { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 }, undefined);
        }
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