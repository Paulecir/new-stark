import { approveCommission } from "./approveCommission";
import { createScheduler } from "./createScheduler";
import { filterCommissionOrderItems } from "./filterCommissionOrderItems";
import { filterCommissionOrdersPending } from "./filterCommissionOrdersPending";
import { filterScheduler } from "./filterScheduler";
import { getSchedulerById } from "./getSchedulerById";
import { makeCommission } from "./makeCommission";
import { payCommission } from "./payCommission";
import { updateScheduler } from "./updateScheduler";

export const CommissionService = {
   makeCommission,
   payCommission,
   filterScheduler,
   createScheduler,
   getSchedulerById,
   updateScheduler,
   filterCommissionOrdersPending,
   filterCommissionOrderItems,
   approveCommission
}
