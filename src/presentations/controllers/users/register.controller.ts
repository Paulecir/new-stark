import { IRequest } from "@/presentations/interface/IRequest";
import { registerSchema } from "./register.schema";
import { UserService } from "@/services/user";
import { HttpResponse } from "@/presentations/helpers/httpResponse";

/**
 * Controlador responsável pelo registro de novos usuários.
 * 
 * Esta função recebe os dados da requisição, valida utilizando o esquema definido e, se estiverem corretos,
 * registra o novo usuário no banco de dados. Caso ocorra algum erro, como falhas na validação, retorna uma 
 * resposta de erro adequada.
 * 
 * @param {IRequest} requestData - O objeto da requisição contendo os dados enviados pelo cliente.
 * @property {Object} requestData.body - O corpo da requisição contendo os dados do usuário a ser registrado.
 * 
 * @returns {Promise<HttpResponse>} Uma promessa que resolve em uma resposta HTTP.
 * 
 * @example
 * const requestData = {
 *   body: {
 *     name: "John Doe",
 *     login: "johndoe",
 *     email: "john.doe@example.com",
 *     password: "securepassword",
 *     phone: "+5599999999999",
 *     country_code: "55",
 *     country_name: "Brasil",
 *     sponsor_login: "master"
 *   }
 * };
 * 
 * const response = await registerController(requestData);
 * // Em caso de sucesso: { status: 201, message: 'User registered successfully', data: { ...user } }
 * // Em caso de erro de validação: { status: 402, errors: { ...detalhesDosErros }
 * // Em caso de erro genérico: { status: 500, message: 'Mensagem de erro' }
 */
export const registerController = async (requestData: IRequest) => {
    try {
        // Valida os dados enviados na requisição com base no esquema definido
        // A configuração `abortEarly: false` permite que todos os erros de validação sejam capturados
        const validatedData = await registerSchema.validate(requestData.body, { abortEarly: false });

        // Registra o novo usuário no banco de dados usando o serviço `UserService`
        const user = await UserService.registerUser({ ...validatedData, ip: requestData.ip });

        // Retorna uma resposta de sucesso com status 201 (Criado) e os dados do usuário registrado
        return HttpResponse.successResponse({
            message: 'Usuário registrado com sucesso',
            data: user,
            status: 201
        });
    } catch (err) {
        // Se ocorrer um erro de validação, retorna uma resposta detalhada com os erros encontrados
        if (err.name === 'ValidationError') {
            return HttpResponse.validationError(err.inner);
        }
        // Em caso de erro genérico, retorna uma resposta com a mensagem do erro
        return HttpResponse.errorResponse({ message: err.message });
    }
};