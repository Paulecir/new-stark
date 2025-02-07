import Prisma from "@/infra/db/prisma";
import { notCreate } from "@/presentations/helpers/httpResponse";

export const createWithdraw = async (data: any) => {

    const balance = await Prisma.balance.findFirst({
        where: {
            user_id: data.user_id,
            wallet: "MAIN"
        }
    })

    if (!balance || balance.amount.toNumber() === 0) throw notCreate({
        message: "Não possui saldo suficiente para saque.",
        error_code: "NOT_AMOUNT"
    })

    const wt = await Prisma.withdraw.aggregate({
        where: {
            user_id: data.user_id,
            status: "PENDING"
        },
        _sum: {
            amount: true
        }
    })

    if (balance.amount.toNumber() < data.amount + (wt._sum?.amount?.toNumber() || 0)) throw notCreate({
        message: "Já posui outras solicitações de saque que ultrapasse o saldo.",
        error_code: "HAS_WITHDRAW_PENDING"
    })

    const model = await Prisma.withdraw.create({
        data
    });

    return model;


}