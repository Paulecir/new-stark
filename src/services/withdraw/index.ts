import { createWithdraw } from "./createWithdraw";
import { filterAdminWithdraw } from "./filterAdminWithdraw";
import { filterWithdraw } from "./filterWithdraw";
import { getWithdrawById } from "./getWithdrawById";
import { updateWithdraw } from "./updateWithdraw";

export const WithdrawService = {
    createWithdraw,
    updateWithdraw,
    filterWithdraw,
    filterAdminWithdraw,
    getWithdrawById
}
