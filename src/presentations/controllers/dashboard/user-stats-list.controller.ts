import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { FinancialService } from "@/services/financial";
import { UserService } from "@/services/user";

export const dashboardUserStatsListController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        const data = await UserService.dashboardStatsList(
            {
                filter: requestData.query,
                pagination: { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 },
                user: requestData.user
            }
        )

        return HttpResponse.successResponse({
            ...data,
            status: 200

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}