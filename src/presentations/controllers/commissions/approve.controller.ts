import Prisma from "@/infra/db/prisma"
import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { CommissionService } from "@/services/commission"

export const approveCommissionController = async (requestData: IRequest) => {

    try {
        // Criar o usuário no banco de dados
        const data = await Prisma.$transaction(async (tx) => await CommissionService.approveCommission(requestData.body), { timeout: 10000, maxWait: 10000 })

        return HttpResponse.successResponse({
            message: 'Category registered successfully',
            data,
            status: 201

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}