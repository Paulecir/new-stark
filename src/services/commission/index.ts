import { createScheduler } from "./createScheduler";
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
   updateScheduler
}
