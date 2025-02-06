import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { ProductService } from "@/services/product"
import { BalanceService } from "@/services/balance"
import { schema } from "./add-balance.schema"

export const addBalanceController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schema.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await BalanceService.addBalanceToUser(validatedData, requestData.user    )

        return HttpResponse.successResponse({
            message: 'Product registered successfully',
            data,
            status: 201

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}