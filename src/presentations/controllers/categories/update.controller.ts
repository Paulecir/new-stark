import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { CategoryService } from "@/services/category";
import { updateSchema } from "./update.schema";

export const updateCategoryController = async (requestData: IRequest) => {
    try {
        const validatedData = await updateSchema.validate(requestData.body, { abortEarly: false });

        const user = await CategoryService.updateCategory(parseInt(requestData.params.id), validatedData);

        return HttpResponse.successResponse({
            message: 'Category updated successfully',
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