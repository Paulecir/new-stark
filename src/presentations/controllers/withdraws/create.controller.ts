import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaCreateWithdraw } from "./create.schema"
import { WithdrawService } from "@/services/withdraw";
import Prisma from "@/infra/db/prisma";

export const createWithdrawController = async (requestData: IRequest) => {

    try {
        
        const user = await Prisma.user.findFirst({
            where: {
                id: requestData.user.id
            }
        })
        // Validar os dados da requisição
        const validatedData = await schemaCreateWithdraw.validate({...requestData.body, wallet: user.bep20_address, user_id: requestData.user.id }, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await Prisma.$transaction(async (tx) => await WithdrawService.createWithdraw(validatedData, tx), { timeout: 10000, maxWait: 10000 })


        return HttpResponse.successResponse({
            message: 'Withdraw registered successfully',
            data,
            status: 201

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }

        if (err.name === 'CUSTOM_ERROR') {
            return err ;
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}