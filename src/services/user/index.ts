import { changePasswordUser } from "./changePasswordUser";
import { dashboardAdminStats } from "./dashboardAdminStats";
import { dashboardStats } from "./dashboardStats";
import { dashboardStatsList } from "./dashboardStatsList";
import { filterSessions } from "./filterSessions";
import { filterUser } from "./filterUser";
import { getUserById } from "./getUserById";
import { registerUser } from "./registerUser";
import { resetPasswordUser } from "./resetPasswordUser";
import { updateUser } from "./updateUser";

export const UserService = {
    getUserById,
    registerUser,
    updateUser,
    filterUser,
    dashboardStats,
    dashboardStatsList,
    resetPasswordUser,
    changePasswordUser,
    dashboardAdminStats,
    filterSessions
}
