import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { ProductService } from "@/services/product"
import { schemaCreateProduct } from "./create.schema"

export const createProductController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schemaCreateProduct.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await ProductService.createProduct(validatedData)

        return HttpResponse.successResponse({
            message: 'Product registered successfully',
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