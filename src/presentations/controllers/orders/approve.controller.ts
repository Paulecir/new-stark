import Prisma from "@/infra/db/prisma";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { OrderService } from "@/services/order";

export const approveOrderController = async (requestData: IRequest) => {
    try {
        const approve = await Prisma.$transaction(async (tx) => await OrderService.approveOrder(requestData.body, tx), { timeout: 10000, maxWait: 10000 })

        // Retorna uma resposta de sucesso com os dados do usuário recuperado
        return HttpResponse.successResponse({
            message: '',
            data: approve,
            status: 200
        });

    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção
        return HttpResponse.errorResponse({ message: err.message });
    }
};