import { dashboardResume } from "./dashboardResume";
import { filterExtract } from "./filterExtract";
import { filterExtractBinary } from "./filterExtractBinary";
import { filterExtractPending } from "./filterExtractPending";
import { resume } from "./resume";
import { retiroApprove } from "./retiroApprove";
import { retiroReject } from "./retiroReject";
import { stats } from "./stats";

export const FinancialService = {
    filterExtract,
    filterExtractPending,
    filterExtractBinary,
    resume,
    stats,
    dashboardResume,
    retiroApprove,
    retiroReject
}
