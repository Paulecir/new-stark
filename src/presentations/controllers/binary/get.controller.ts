import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { BinaryService } from "@/services/strategies/binary";

/**
 * Lida com a recuperação da estratégia binária de um usuário.
 * 
 * Esta função recebe uma requisição contendo o usuário e tenta buscar os dados da estratégia binária
 * utilizando o `BinaryService`. Se for bem-sucedida, retorna uma resposta de sucesso formatada.
 * Caso ocorra um erro, retorna uma resposta de erro formatada.
 * 
 * @param {IRequest} requestData - O objeto de requisição contendo os dados do usuário.
 * @property {Object} requestData.user - O objeto que contém os dados do usuário.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve para um objeto de resposta HTTP.
 * 
 * // Em caso de sucesso: { status: 200, message: '', data: { ...dadosDaEstratégia } }
 * // Em caso de erro: { status: 500, message: 'Mensagem de erro' }
 */
export const getBinaryController = async (requestData: IRequest) => {
    try {
        // Recupera a estratégia binária do usuário usando o BinaryService
        const user = await BinaryService.getBinaryById({ user: requestData.user });

        // Retorna uma resposta de sucesso com os dados da estratégia recuperada
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