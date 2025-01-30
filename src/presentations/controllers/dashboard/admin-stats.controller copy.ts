import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { UserService } from "@/services/user";

export const dashboardAdminStatsController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        const data = await UserService.dashboardAdminStats(
            requestData.user
        )

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