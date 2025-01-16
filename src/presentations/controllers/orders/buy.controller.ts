import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { OrderService } from "@/services/order";

export const buyOrderController = async (requestData: IRequest) => {
    try {
        const order = await OrderService.buyProduct(requestData.body, requestData.user);

        // Retorna uma resposta de sucesso com os dados do usuário recuperado
        return HttpResponse.successResponse({
            message: '',
            data: order,
            status: 200
        });
    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção
        return HttpResponse.errorResponse({ message: err.message });
    }
};