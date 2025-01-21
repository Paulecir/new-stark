import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { schemaCreateWallet } from "./create.schema"
import { WalletService } from "@/services/wallet";

export const createWalletController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        const validatedData = await schemaCreateWallet.validate(requestData.body, { abortEarly: false });

        // Criar o usuário no banco de dados
        const data = await WalletService.createWallet(validatedData)

        return HttpResponse.successResponse({
            message: 'Wallet registered successfully',
            data,
            status: 201

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}