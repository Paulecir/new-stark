import Prisma from "@/infra/db/prisma";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { CommissionService } from "@/services/commission";
import { updateSchema } from "./update-scheduler.schema";

export const updateCommissionSchedulerController = async (requestData: IRequest) => {
    try {
        const validatedData = await updateSchema.validate(requestData.body, { abortEarly: false });

        const data = await Prisma.$transaction(async (tx) => await CommissionService.updateScheduler(parseInt(requestData.params.id), validatedData, tx), { timeout: 10000, maxWait: 10000 })

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