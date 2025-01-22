import { IRequest } from "@/presentations/interface/IRequest";
import { UserService } from "@/services/user";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { schema } from "./change-password.schema";

export const changePasswordUserController = async (requestData: IRequest) => {
    try {
        const validatedData = await schema.validate(requestData.body, { abortEarly: false });

        const user = await UserService.changePasswordUser(validatedData);

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