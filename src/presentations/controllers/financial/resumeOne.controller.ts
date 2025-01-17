import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { FinancialService } from "@/services/financial";

export const resumeOneController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        const data = await FinancialService.resume({
            filter: { wallet: [requestData.query.wallet] },
            user: requestData.user
        })

        return HttpResponse.successResponse({
            ...data,
            data: data.data[0],
            status: 200

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}