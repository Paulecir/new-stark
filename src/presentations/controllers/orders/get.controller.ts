import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { FinancialService } from "@/services/financial";
import { schema } from "./my-orders.schema";
import { OrderService } from "@/services/order";

export const getOrderController = async (requestData: IRequest) => {

    try {

        // Criar o usuário no banco de dados
        const data = await OrderService.getOrder({
            filter: {
                orderId: requestData.params.orderId
            },
            user: requestData.user
        })

        return HttpResponse.successResponse({
            ...data,
            status: 200

        });
    } catch (err) {
        console.error("E", err)
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}