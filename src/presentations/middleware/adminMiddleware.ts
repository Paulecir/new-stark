import { HttpResponse } from "../helpers/httpResponse";
import { IRequest } from "../interface/IRequest";
import { IResponse } from "../interface/IResponse";

export const makeAdminMiddleware = async (httpRequest: IRequest): Promise<IResponse> => {

    if (httpRequest.user.profile !== "admin") {
        return HttpResponse.notAuthorized("ADMIN_PERMISSION")
    }

    return HttpResponse.successRawResponse({
        data: {
        }
    })
}