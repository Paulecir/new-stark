import { IRequest } from "@/presentations/interface/IRequest";
import { UserService } from "@/services/user";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { schema } from "./reset-password.schema";

export const resetPasswordUserController = async (requestData: IRequest) => {
    try {
        const validatedData = await schema.validate({ ...requestData.body, host: requestData.headers.origin }, { abortEarly: false });

        const user = await UserService.resetPasswordUser(validatedData);

        return HttpResponse.successResponse({
            message: 'User updated successfully',
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