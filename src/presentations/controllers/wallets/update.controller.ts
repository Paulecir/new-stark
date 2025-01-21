import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { WalletService } from "@/services/wallet";
import { updateSchema } from "./update.schema";

export const updateWalletController = async (requestData: IRequest) => {
    try {
        const validatedData = await updateSchema.validate(requestData.body, { abortEarly: false });

        const user = await WalletService.updateWallet(parseInt(requestData.params.id), validatedData);

        return HttpResponse.successResponse({
            message: 'Wallet updated successfully',
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