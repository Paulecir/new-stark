import { changePasswordUser } from "./changePasswordUser";
import { dashboardAdminStats } from "./dashboardAdminStats";
import { dashboardStats } from "./dashboardStats";
import { dashboardStatsList } from "./dashboardStatsList";
import { dashboardVendasStats } from "./dashboardVendasStats";
import { filterSessions } from "./filterSessions";
import { filterUser } from "./filterUser";
import { filterUserSelect } from "./filterUserSelect";
import { getUserById } from "./getUserById";
import { registerUser } from "./registerUser";
import { resetPasswordUser } from "./resetPasswordUser";
import { updateUser } from "./updateUser";

export const UserService = {
    getUserById,
    registerUser,
    updateUser,
    filterUser,
    filterUserSelect,
    dashboardStats,
    dashboardVendasStats,
    // dashboardCommissionsStats,
    dashboardStatsList,
    resetPasswordUser,
    changePasswordUser,
    dashboardAdminStats,
    filterSessions
}
