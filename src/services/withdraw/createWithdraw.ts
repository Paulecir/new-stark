import PrismaClient from "@/infra/db/prisma";
import { notCreate } from "@/presentations/helpers/httpResponse";
import { decBalance } from "../balance/decBalance";

export const createWithdraw = async (data: any, Prisma = PrismaClient) => {

    let model = await Prisma.withdraw.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            }
        }
    });

    const history = await decBalance({
        name: "Withdraw"
        , wallet: "MAIN"
        , user_id: model.user_id
        , amount: model.amount.toNumber()
        , ref_type: 'withdraw'
        , ref_id: model.id
        , extra_info: {
            to: model.user_id,
            toName: model.user?.name,
            toLogin: model.user?.login,
        }
    }, Prisma)

    model = await Prisma.withdraw.update({
        where: {
            id: model.id
        },
        data: {
            balance_history_id: history.id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    login: true
                }
            }
        }
    })

    return model;

}