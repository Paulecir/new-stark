import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { BinaryService } from "@/services/strategies/binary";
import { updateSchema } from "./update.schema";

export const updateBinaryController = async (requestData: IRequest) => {
    try {
        const validatedData = await updateSchema.validate(requestData.body, { abortEarly: false });

        const user = await BinaryService.updateBinary(parseInt(requestData.user.id), validatedData);

        return HttpResponse.successResponse({
            message: 'Binary updated successfully',
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