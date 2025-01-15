import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WebhookService } from "@/services/webhook";


export const plisioWebhookController = async (requestData: IRequest) => {
    try {
        const user = await WebhookService.plisioWebhook(requestData.body);

        // Retorna uma resposta de sucesso com os dados do usuário recuperado
        return HttpResponse.successResponse({
            message: '',
            data: {},
            status: 200
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção
        return HttpResponse.errorResponse({ message: err.message });
    }

}