import { addBalance } from "./addBalance";
import { addBalanceToUser } from "./addBalanceToUser";
import { decBalance } from "./decBalance";
import { filterOrderBalance } from "./filterOrderBalance";

export const BalanceService = {
    filterOrderBalance,
    addBalanceToUser,
    addBalance,
    decBalance
}
