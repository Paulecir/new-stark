import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { UserService } from "@/services/user";

export const dashboardAdminCommissionsStatsController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        // const data = await UserService.dashboardCommissionsStats(
        //     requestData.user
        // )

        return HttpResponse.successResponse({
            // ...data,
            data: {},
            status: 200
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}