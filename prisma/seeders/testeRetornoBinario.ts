import Prisma from "../../src/infra/db/prisma";
import { distributionBinary } from "../../src/services/strategies/binary/distributionBinary"

async function arrumar() {

//     SELECT 
// a1.* ,
// a2.saldo as saldo_atual,
// a1.amount - a2.saldo as diferença

// FROM (
//     SELECT 
//         users.id as user_id,
//         users.name,
//         users.login,
//         (IF (bal_right.amount < bal_left.amount, bal_right.amount, bal_left.amount) * 0.1)
//         -
//         (IF (bal_right_p.amount < bal_left_p.amount, bal_right_p.amount, bal_left_p.amount) * 0.1)
//         as amount
//     FROM 
//         strategy_binary 
//     INNER JOIN balance as bal_left ON bal_left.user_id = strategy_binary.user_id AND bal_left.wallet = "BINARY_LEFT_POINT_TOTAL_NEW"
//     INNER JOIN balance as bal_right ON bal_right.user_id = strategy_binary.user_id AND bal_right.wallet = "BINARY_RIGHT_POINT_TOTAL_NEW"
//     INNER JOIN balance as bal_left_p ON bal_left_p.user_id = strategy_binary.user_id AND bal_left_p.wallet = "BINARY_LEFT_POINT_NEW"
//     INNER JOIN balance as bal_right_p ON bal_right_p.user_id = strategy_binary.user_id AND bal_right_p.wallet = "BINARY_RIGHT_POINT_NEW"
    
//     INNER JOIN `users` ON `users`.id = strategy_binary.user_id
//     WHERE 
//         qualify = 1 and left_qualify = 1 and right_qualify = 1
// ) as a1
// INNER JOIN (
// SELECT
//         user_id,
//         sum(IF(direction = "CREDIT", amount, amount * -1)) as saldo
//     FROM
//       `balance_history`
//     WHERE
//         wallet = "MAIN" and name like  "%binary%" 
//     GROUP BY user_id
// ) a2 ON a2.user_id = a1.user_id




}


arrumar()