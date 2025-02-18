import Prisma from "@/infra/db/prisma";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { OrderService } from "@/services/order";

export const reproveOrderController = async (requestData: IRequest) => {
    try {
        const reprove = await Prisma.$transaction(async (tx) => await OrderService.reproveOrder(requestData.body, tx), { timeout: 100000, maxWait: 100000 })

        // Retorna uma resposta de sucesso com os dados do usuário recuperado
        return HttpResponse.successResponse({
            message: '',
            data: reprove,
            status: 200
        });

    } catch (err) {
        // Retorna uma resposta de erro caso ocorra uma exceção
        return HttpResponse.errorResponse({ message: err.message });
    }
};