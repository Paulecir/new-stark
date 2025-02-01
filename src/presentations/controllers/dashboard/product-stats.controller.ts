import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { FinancialService } from "@/services/financial";
import { UserService } from "@/services/user";

export const dashboardProductStatsController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        // const data = await UserService.dashboardStats({
        //     user: requestData.user
        // })

        return HttpResponse.successResponse({
            // ...data,
            data: {
                equipe: {
                    ativos: 596,
                    total: 845
                },
                bonus: {
                    direto: {
                        amount: 0
                    },
                    binario: {
                        amount: 307
                    }
                },
                winWin: {
                    rendimentoDiario: {
                        amount: 11,
                        tax: 0.55
                    },
                    rendimentoTotal: {
                        amount: 0,
                        total: 0,
                        nextAmount: 0,
                        nextDate: '2025-02-01 00:00:00'
                    }
                },
                tokenWay: {
                    rendimentoDiario: {
                        amount: 0.23,
                        tax: 0.90
                    },
                    rendimentoTotal: {
                        amount: 0,
                        total: 0,
                        nextAmount: 0,
                        nextDate: '2025-02-01 00:00:00'
                    },
                    unilevel: {
                        amount: 4.93,
                    }
                },
                tokenOne: {
                    rendimentoTotal: {
                        amount: 0,
                        total: 0
                    }

                },
                tokenTeem: {
                    rendimentoTotal: {
                        amount: 0,
                        total: 0
                    }
                }
            },
            status: 200

        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return HttpResponse.errorResponse({ message: err.message, errors: err.errors });
        }
        return HttpResponse.errorResponse({ message: err.message });
    }
}