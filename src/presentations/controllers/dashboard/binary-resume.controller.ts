import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { FinancialService } from "@/services/financial";

export const dashboardBinaryResumeController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        const data = await FinancialService.dashboardResume({
            filter: { direction: requestData.query.direction.toUpperCase() },
            user: requestData.user
        })

        return HttpResponse.successResponse({
            ...data,
            data: data,
            status: 200

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}