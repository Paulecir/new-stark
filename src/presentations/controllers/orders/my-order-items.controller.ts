import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { OrderService } from "@/services/order";
import { schema } from "./my-orders.schema";

export const myOrderItemsController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schema.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await OrderService.myOrderItemsFilter({
            filter: validatedData,
            pagination: { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 },
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