import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { CategoryService } from "@/services/category";
import { updateSchema } from "./update.schema";
import Prisma from "@/infra/db/prisma";

export const updateCategoryController = async (requestData: IRequest) => {
    try {
        const validatedData = await updateSchema.validate(requestData.body, { abortEarly: false });

        const data = await Prisma.$transaction(async (tx) => await CategoryService.updateCategory(parseInt(requestData.params.id), validatedData, tx), { timeout: 100000, maxWait: 100000 })

        return HttpResponse.successResponse({
            message: 'Category updated successfully',
            data,
            status: 201
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.validationError(err.inner);
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
};