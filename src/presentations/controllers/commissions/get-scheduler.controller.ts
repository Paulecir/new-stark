import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { CommissionService } from "@/services/commission";

export const getCommissionsSchedulerController = async (requestData: IRequest) => {

    try {

        // Criar o usuário no banco de dados
        const data = await CommissionService.getSchedulerById(Number(requestData.params.id))

        // Retorna uma resposta de sucesso com os dados do usuário recuperado
        return HttpResponse.successResponse({
            message: '',
            data,
            status: 200
        });
    } catch (err) {
        console.log("E", err)
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}