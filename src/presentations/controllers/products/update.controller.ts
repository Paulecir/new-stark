import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { ProductService } from "@/services/product";
import { updateSchema } from "./update.schema";

export const updateProductController = async (requestData: IRequest) => {
    try {
        const validatedData = await updateSchema.validate(requestData.body, { abortEarly: false });

        const user = await ProductService.updateProduct(parseInt(requestData.params.id), validatedData);

        return HttpResponse.successResponse({
            message: 'Product updated successfully',
            data: user,
            status: 201
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.validationError(err.inner);
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
};