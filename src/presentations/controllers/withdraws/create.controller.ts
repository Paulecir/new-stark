import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaCreateWithdraw } from "./create.schema"
import { WithdrawService } from "@/services/withdraw";

export const createWithdrawController = async (requestData: IRequest) => {

    try {
        
        // Validar os dados da requisição
        const validatedData = await schemaCreateWithdraw.validate({...requestData.body, wallet: requestData.user.bep20_address, user_id: requestData.user.id }, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await WithdrawService.createWithdraw(validatedData)

        return HttpResponse.successResponse({
            message: 'Withdraw registered successfully',
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