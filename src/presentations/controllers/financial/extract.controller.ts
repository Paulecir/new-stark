import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaExtract } from "./extract.schema";
import { FinancialService } from "@/services/financial";

export const financialExtractController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schemaExtract.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await FinancialService.filterExtract()

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