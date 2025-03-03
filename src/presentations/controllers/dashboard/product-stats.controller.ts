import Prisma from "@/infra/db/prisma";
import { HttpResponse } from "@/presentations/helpers/httpResponse";
import { IRequest } from "@/presentations/interface/IRequest";
import { FinancialService } from "@/services/financial";
import { UserService } from "@/services/user";
import moment from "moment";

export const dashboardProductStatsController = async (requestData: IRequest) => {
    try {
        // Executa as consultas em paralelo
        const [
            direct,
            binary,
            winwin,
            categorywinwWin,
            winwWinOrder,
            tokenWay,
            categoryTokenWay,
            tokenWayOrder,
            tokenOne,
            tokenTeem,
            total,
            ativos,
            nextWinwin,
            nextTokenWay
        ] = await Promise.all([
            Prisma.balanceHistory.aggregate({
                where: {
                    user_id: requestData.user.id,
                    wallet: "MAIN",
                    OR: [
                        { name: { contains: " Direct " } },
                        { name: { startsWith: "Bonus Direto" } }
                    ]
                },
                _sum: { amount: true }
            }),
            Prisma.balanceHistory.aggregate({
                where: {
                    user_id: requestData.user.id,
                    wallet: "MAIN",
                    name: { startsWith: "Bonus Binary" }
                },
                _sum: { amount: true }
            }),
            Prisma.balanceHistory.aggregate({
                _sum: { amount: true },
                where: { user_id: requestData.user.id, identify: "WINWIN_BONUS" }
            }),
            Prisma.category.findFirst({ where: { id: 4 } }),
            Prisma.$queryRaw`SELECT SUM(order_item.amount * order_item.quantity) as amount FROM order_item INNER JOIN \`order\` ON \`order\`.id = order_item.order_id INNER JOIN products ON products.id = order_item.product_id WHERE \`order\`.user_id = ${requestData.user.id} AND products.category_id = 4 AND \`order\`.status = 'done' GROUP BY null`,
            Prisma.balanceHistory.aggregate({
                _sum: { amount: true },
                where: { user_id: requestData.user.id, identify: "TOKENWAY_BONUS" }
            }),
            Prisma.category.findFirst({ where: { id: 1 } }),
            Prisma.$queryRaw`SELECT SUM(order_item.amount * order_item.quantity) as amount, SUM(order_item.quantity) as quantity FROM order_item INNER JOIN \`order\` ON \`order\`.id = order_item.order_id INNER JOIN products ON products.id = order_item.product_id WHERE \`order\`.user_id = ${requestData.user.id} AND products.category_id = 1 AND \`order\`.status = 'done'`,
            Prisma.balanceHistory.aggregate({
                _sum: { amount: true },
                where: { user_id: requestData.user.id, identify: "TOKENONE_BONUS" }
            }),
            Prisma.balanceHistory.aggregate({
                _sum: { amount: true },
                where: { user_id: requestData.user.id, identify: "TOKENTEEN_BONUS" }
            }),
            Prisma.user.count({
                where: { ancestry: { contains: `#${requestData.user.id}#` } }
            }),
            Prisma.user.count({
                where: {
                    ancestry: { contains: `#${requestData.user.id}#` },
                    Order: { some: {} }
                }
            }),
            Prisma.commission.aggregate({
                where: {
                    user_id: requestData.user.id,
                    status: "PENDING",
                    scheduler: { category_id: 4 }
                },
                _sum: { total: true }
            }),
            Prisma.commission.aggregate({
                where: {
                    user_id: requestData.user.id,
                    status: "PENDING",
                    scheduler: { category_id: 1 }
                },
                _sum: { total: true }
            })
        ]);

        let percentwinwWin = 0;
        if (categorywinwWin.commission_yield_type_commission === "dynamic") {
            let config = ((categorywinwWin.commission_yield_config as any)?.calendar || []).find(f => f.date === moment().format("YYYY-MM-DD"));
            if (config) percentwinwWin = parseFloat(config.value);
        } else if (categorywinwWin.commission_yield_type_commission === "fixed") {
            percentwinwWin = parseFloat((categorywinwWin.commission_yield_config as any)?.yield_fixed);
        }

        let percentTokenWay = 0;
        if (categoryTokenWay.commission_yield_type_commission === "dynamic") {
            let config = ((categoryTokenWay.commission_yield_config as any)?.calendar || []).find(f => f.date === moment().format("YYYY-MM-DD"));
            if (config) percentTokenWay = parseFloat(config.value);
        }

        return HttpResponse.successResponse({
            data: {
                equipe: { ativos, total },
                bonus: {
                    direto: { amount: direct?._sum.amount || 0 },
                    binario: { amount: binary?._sum.amount || 0 }
                },
                winWin: {
                    rendimentoDiario: {
                        amount: (winwWinOrder?.[0]?.amount || 0) * (percentwinwWin / 100),
                        tax: percentwinwWin
                    },
                    rendimentoTotal: {
                        amount: winwin?._sum?.amount || 0,
                        total: (winwWinOrder?.[0]?.amount || 0) * (207 / 100),
                        qtd: parseInt(winwWinOrder?.[0]?.amount),
                        nextAmount: nextWinwin._sum?.total || 0,
                        nextDate: '2025-03-27 00:00:00'
                    }
                },
                tokenWay: {
                    rendimentoDiario: {
                        amount: (tokenWayOrder?.[0]?.amount || 0) * (percentTokenWay / 100),
                        tax: percentTokenWay
                    },
                    rendimentoTotal: {
                        amount: tokenWay?._sum?.amount || 0,
                        total: (tokenWayOrder?.[0]?.amount || 0) * (300 / 100),
                        qtd: tokenWayOrder?.[0]?.quantity,
                        nextAmount: nextTokenWay._sum?.total || 0,
                        nextDate: '2025-03-27 00:00:00'
                    },
                    unilevel: { amount: tokenWay?._sum?.amount || 0 }
                },
                tokenOne: {
                    rendimentoTotal: {
                        amount: tokenOne?._sum?.amount || 0,
                        qtd: 0,
                        total: tokenOne?._sum?.amount || 0
                    }
                },
                tokenTeem: {
                    rendimentoTotal: {
                        amount: tokenTeem?._sum?.amount || 0,
                        qtd: 0,
                        total: tokenTeem?._sum?.amount || 0
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