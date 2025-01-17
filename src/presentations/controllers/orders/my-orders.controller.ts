import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { FinancialService } from "@/services/financial";
import { schema } from "./my-orders.schema";
import { OrderService } from "@/services/order";

export const myOrdersController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schema.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await OrderService.myOrdersFilter({
            filter: validatedData,
            user: requestData.user
        })

        return HttpResponse.successResponse({
            ...data,
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