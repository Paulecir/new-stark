import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { FinancialService } from "@/services/financial";
import { schema } from "./retiro-approve.schema";
import Prisma from "@/infra/db/prisma";

export const retiroApproveExtractController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schema.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await FinancialService.retiroApprove({ filter: validatedData })

        return HttpResponse.successResponse({
            ...data,
            status: 200

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}