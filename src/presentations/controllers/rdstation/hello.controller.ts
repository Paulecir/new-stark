import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";

export const helloRdstationController = async (requestData: IRequest) => {

    return HttpResponse.successResponse({
        message: '',
        data: { hello: "World" },
        status: 200
    });
}