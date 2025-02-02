import Prisma from "@/infra/db/prisma";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { FinancialService } from "@/services/financial";
import { UserService } from "@/services/user";
import moment from "moment";

export const dashboardProductStatsController = async (requestData: IRequest) => {

    try {
        // Validar os dados da requisição
        // Criar o usuário no banco de dados
        // const data = await UserService.dashboardStats({
        //     user: requestData.user
        // })

        const direct = await Prisma.balance.findFirst({
            where: {
                user_id: requestData.user.id,
                wallet: "DIRECT_BONUS"
            }
        })

        const binary = await Prisma.balance.findFirst({
            where: {
                user_id: requestData.user.id,
                wallet: "BINARY_BONUS"
            }
        })

        const winwin = await Prisma.balance.findFirst({
            where: {
                user_id: requestData.user.id,
                wallet: "WINWIN_BONUS"
            }
        })

        const categorywinwWin = await Prisma.category.findFirst({
            where: {
                id: 4
            }
        })

        let percentwinwWin = 0

        if (categorywinwWin.commission_yield_type_commission === "dynamic") {
            let config = ((categorywinwWin.commission_yield_config as any)?.calendar || []).find(f => f.date === moment().format("YYYY-MM-DD"))
            if (config) percentwinwWin = parseFloat(config.value)
        } else if (categorywinwWin.commission_yield_type_commission === "fixed") { 
            percentwinwWin = parseFloat((categorywinwWin.commission_yield_config as any)?.yield_fixed)
        }

        const winwWinOrder = await Prisma.$queryRaw`SELECT 
                SUM(order_item.amount * order_item.quantity) as amount
            FROM 
                order_item
            INNER JOIN \`order\` ON \`order\`.id = order_item.order_id
            INNER JOIN products ON products.id = order_item.product_id 
            WHERE \`order\`.user_id = ${requestData.user.id} AND products.category_id = 4 AND \`order\`.status = "done"
            GROUP BY null`;

        const tokenWay = await Prisma.balance.findFirst({
            where: {
                user_id: requestData.user.id,
                wallet: "TOKENWAY_BONUS"
            }
        })

        const categoryTokenWay = await Prisma.category.findFirst({
            where: {
                id: 1
            }
        })

        let percentTokenWay = 0

        if (categoryTokenWay.commission_yield_type_commission === "dynamic") {
            let config = ((categoryTokenWay.commission_yield_config as any)?.calendar || []).find(f => f.date === moment().format("YYYY-MM-DD"))
            if (config) percentTokenWay = parseFloat(config.value)
        }

        const tokenWayOrder = await Prisma.$queryRaw`SELECT 
                SUM(order_item.amount * order_item.quantity) as amount,
                SUM(order_item.quantity) as quantity
            FROM 
                order_item
            INNER JOIN \`order\` ON \`order\`.id = order_item.order_id
            INNER JOIN products ON products.id = order_item.product_id 
            WHERE \`order\`.user_id = ${requestData.user.id} AND products.category_id = 1 AND \`order\`.status = "done"`

        const tokenOne = await Prisma.balance.findFirst({
            where: {
                user_id: requestData.user.id,
                wallet: "TOKENONE_BONUS"
            }
        })

        const tokenTeem = await Prisma.balance.findFirst({
            where: {
                user_id: requestData.user.id,
                wallet: "TOKENTEEN_BONUS"
            }
        })

        return HttpResponse.successResponse({
            // ...data,
            data: {
                equipe: {
                    ativos: 596,
                    total: 845
                },
                bonus: {
                    direto: {
                        amount: direct?.amount || 0
                    },
                    binario: {
                        amount: binary?.amount || 0
                    }
                },
                winWin: {
                    rendimentoDiario: {
                        amount:(winwWinOrder?.[0]?.amount || 0) * (percentwinwWin / 100),
                        tax: percentwinwWin
                    },
                    rendimentoTotal: {
                        amount: winwin?.amount || 0,
                        total: (winwWinOrder?.[0]?.amount || 0) * (207 / 100),
                        qtd: parseInt(winwWinOrder?.[0]?.amount),
                        nextAmount: 0,
                        nextDate: '2025-02-01 00:00:00'
                    }
                },
                tokenWay: {
                    rendimentoDiario: {
                        amount: (tokenWayOrder?.[0]?.amount || 0) * (percentTokenWay / 100),
                        tax: percentTokenWay
                    },
                    rendimentoTotal: {
                        amount: tokenWay?.amount || 0,
                        total: (tokenWayOrder?.[0]?.amount || 0) * (300 / 100),
                        qtd: tokenWayOrder?.[0]?.quantity,
                        nextAmount: 0,
                        nextDate: '2025-02-01 00:00:00'
                    },
                    unilevel: {
                        amount: tokenWay?.amount || 0,
                    }
                },
                tokenOne: {
                    rendimentoTotal: {
                        amount: tokenOne?.amount || 0,
                        qtd: 0,
                        total: tokenOne?.amount || 0
                    }

                },
                tokenTeem: {
                    rendimentoTotal: {
                        amount: tokenTeem?.amount || 0,
                        qtd: 0,
                        total: tokenTeem?.amount || 0
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