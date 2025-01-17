import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { CategoryService } from "@/services/category"
import { schemaCreateCategory } from "./create.schema"
import Prisma from "@/infra/db/prisma"

export const createCategoryController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schemaCreateCategory.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await Prisma.$transaction(async (tx) => await CategoryService.createCategory(validatedData, tx), { timeout: 10000, maxWait: 10000 })

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