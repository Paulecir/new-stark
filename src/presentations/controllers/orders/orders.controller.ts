import { HttpResponse } from "@/presentations/helpers/httpResponse"
import { IRequest } from "@/presentations/interface/IRequest"
import { FinancialService } from "@/services/financial";
import { schema } from "./my-orders.schema";
import { OrderService } from "@/services/order";

export const ordersController = async (requestData: IRequest) => {

    try {
        const filter = []
        const orFilter = []
       
        if (requestData.query.id) orFilter.push({ id: parseInt(requestData.query.id) })
        if (requestData.query.order_id) orFilter.push({ order_id: requestData.query.description } )
        if (requestData.query.login) orFilter.push({ user: { login: { contains: requestData.query.login } } })
        if (requestData.query.email) orFilter.push({ user: { email: { contains: requestData.query.email } } })
        if (requestData.query.name) orFilter.push({ user: { name: { contains: requestData.query.name } } })
        if (requestData.query.status) orFilter.push({ status: requestData.query.status })

        if (orFilter.length > 0) {
            filter.push({
                OR: orFilter
            })
        }
        // Criar o usuário no banco de dados
        const data = await OrderService.ordersFilter({
            filter,
            pagination: { page: requestData.pagination.page || 1, pageSize: requestData.pagination.pageSize || 1 },
            user: requestData.user
        })

        return HttpResponse.successResponse({
            ...data,
            status: 200

        });
    } catch (err) {
        console.log("E", err)
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}