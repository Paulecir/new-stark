import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaExtract } from "./extract.schema";
import { FinancialService } from "@/services/financial";

export const financialExtractPendingController = async (requestData: IRequest) => {

    try {
        // // Validar os dados da requisição
        // const validatedData = await schemaExtract.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await FinancialService.filterExtractPending({
            filter: requestData.body,
            pagination: { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 },
            user: requestData.user
        }, requestData.query.user !== "true")

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