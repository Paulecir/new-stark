import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WalletService } from "@/services/wallet";

/**
 * Lida com a filtragem de carteiras.
 * 
 * Esta função recebe uma requisição contendo parâmetros de consulta e tenta buscar os dados correspondentes
 * utilizando o `WalletService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada. Caso ocorra
 * um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os parâmetros de consulta.
 * @property {Object} requestData.query - O objeto que contém os parâmetros de consulta.
 * @property {Object} requestData.pagination - O objeto que contém os parâmetros de paginação.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDaCarteira } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const filterWalletController = async (requestData: IRequest) => {
    try {
        // Filtra as carteiras usando o WalletService
        const userFilter = await WalletService.filterWallet([], { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 });

        // Retorna uma resposta de sucesso com os dados da carteira filtrada
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