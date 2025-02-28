import Prisma from "../../src/infra/db/prisma";
import { decBalance } from "../../src/services/balance/decBalance";
import { addBalance } from "../../src/services/balance/addBalance";
async function arrumar() {

    const users: any = await Prisma.$queryRaw`SELECT
        *,
        strategy_binary.id as strategy_binary_id,
        users.name as user_name,
        users.login as user_login
    FROM
        balance_history
        INNER JOIN strategy_binary ON strategy_binary.user_id = balance_history.user_id
        INNER JOIN users ON users.id = balance_history.user_id
    WHERE
        balance_history.wallet = "BINARY_LEFT_POINT_PAY"
        and balance_history.name = "Bonus Binary [2025-02-27]"`

    for (const user of users) {
        

        if (user.wallet === "BINARY_LEFT_POINT_PAY") {
            await decBalance({
                name: "Binary payment"
                , wallet: "BINARY_RIGHT_POINT_NEW"
                , user_id: user.user_id
                , amount: user.amount.toNumber * 10
                , ref_type: 'strategyBinaryPay'
                , ref_id: user.strategy_binary
                , extra_info: {
                    to: user?.user_id,
                    toName: user?.users_name,
                    toLogin: user?.user_login,
                    binaryId: user.strategy_binary,
                }
            }, Prisma)

            await decBalance({
                name: "Binary payment"
                , wallet: "BINARY_LEFT_POINT_NEW"
                , user_id: user.user_id
                , amount: user.amount.toNumber * 10
                , ref_type: 'strategyBinaryPay'
                , ref_id: user.strategy_binary
                , extra_info: {
                    to: user?.user_id,
                    toName: user?.users_name,
                    toLogin: user?.user_login,
                    binaryId: user.strategy_binary,
                }
            }, Prisma)
        }

    }
}


arrumar()