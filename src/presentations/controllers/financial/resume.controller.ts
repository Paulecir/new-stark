import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaExtract } from "./extract.schema";
import { FinancialService } from "@/services/financial";

export const resumeController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schemaExtract.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await FinancialService.resume({
            filter: validatedData,
            user: requestData.user
        })

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