import React, { useState } from "react";
import useTaskbar from "./hook/useAdminTaskbar";
import { Taskbar, TaskbarItem, TaskbarDivider, TaskbarAvatar, getClassNames} from "./TaskbarHeadless";
import dashboardIcon from "../../assets/Taskbar_Icon/Dashboard.png";
import userManagementIcon from "../../assets/Taskbar_Icon/User_Management.png";
import userAdminIcon from "../../assets/Taskbar_Icon/Admin.png";
import projectsIcon from "../../assets/Taskbar_Icon/Projects.png";
import settingsIcon from "../../assets/Taskbar_Icon/Setting.png";
import logoutIcon from "../../assets/Taskbar_Icon/Logout.png";
import useLogout from "../Authentication-Component/hook/useLogOut";

const icons = {
  dashboard: dashboardIcon,
  userManagement: userManagementIcon,
  adminManagement: userAdminIcon,
  projects: projectsIcon,
  settings: settingsIcon,
  logout: logoutIcon,
};

const AdminTaskbar = () => {
  const { navigate, isActive } = useTaskbar();
  const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapsibility
  const logoutFunction = useLogout();

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        className="sm:hidden fixed bottom-4 left-4 bg-darkorange text-white px-3 py-2 rounded-lg z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "☰" : "✕"}
      </button>

      {/* Taskbar */}
      <Taskbar
        className={`min-h-full bg-gradient-to-b from-darkorange to-black rounded-tr-3xl rounded-br-3xl flex flex-col items-start py-6 px-2 ${isCollapsed ? "hidden" : "block"
          } sm:block w-[15%] sm:w-[25%] lg:w-[15%]`}
      >
        {/* Dashboard */}
        <TaskbarItem
          path="/"
          isActive={isActive("/admin/dashboard")}
          onClick={() => navigate("/admin/dashboard")}
          className={getClassNames("/admin/dashboard", isActive("/admin/dashboard"))}
        >
          <img src={icons.dashboard} alt="Dashboard" className="h-6 w-6" />
          <span className="text-white text-sm hidden sm:block">Dashboard</span>
        </TaskbarItem>

        {/* User Management */}
        <TaskbarItem
          path="/user-management"
          isActive={isActive("/admin/user-management")}
          onClick={() => navigate("/admin/user-management")}
          className={getClassNames("/admin/user-management", isActive("/admin/user-management"))}

        >
          <img src={icons.userManagement} alt="User Management" className="h-6 w-6" />
          <span className="text-white text-sm hidden sm:block">User Management</span>
        </TaskbarItem>

        {/* Admin Management */}
        <TaskbarItem
          path="/admin-management"
          isActive={isActive("/admin/admin-management")}
          onClick={() => navigate("/admin/admin-management")}
          className={getClassNames("/admin/admin-management", isActive("/adminadmin-management"))}

        >
          <img src={icons.adminManagement} alt="Admin Management" className="h-6 w-6" />
          <span className="text-white text-sm hidden sm:block">Admin Management</span>
        </TaskbarItem>

        {/* Projects */}
        <TaskbarItem
          path="/projects"
          isActive={isActive("/admin/projects")}
          onClick={() => navigate("/admin/projects")}
          className={getClassNames("/admin/projects", isActive("/admin/projects"))}
        >
          <img src={icons.projects} alt="Projects" className="h-6 w-6" />
          <span className="text-white text-sm hidden sm:block">Projects</span>
        </TaskbarItem>

        {/* Settings */}
        <TaskbarItem
          path="/settings"
          isActive={isActive("/admin/settings")}
          onClick={() => navigate("/admin/settings")}
          className={getClassNames("/admin/settings", isActive("/admin/settings"))}
        >
          <img src={icons.settings} alt="Settings" className="h-6 w-6" />
          <span className="text-white text-sm hidden sm:block">Settings</span>
        </TaskbarItem>

        {/* Logout */}
        <TaskbarItem
          path="/logout"
          onClick={(e) => {
            logoutFunction(e)
          }}
          className="items-center flex w-full mx-auto gap-4 px-6 py-3 rounded-lg bg-darkorange text-black rounded-lg hover:bg-primary cursor-pointer mb-4"
        >
          <img src={icons.logout} alt="Logout" className="h-4 w-4" />
          <span className="text-black text-sm hidden sm:block">Logout</span>
        </TaskbarItem>

        {/* Orange Divider */}
        <TaskbarDivider className="w-4/5 h-px bg-orange-600 my-4 mx-auto hidden sm:block" />

        {/* Avatar Section */}
        <TaskbarAvatar
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          name="Master Admin"
          description="Admin User"
          className="flex items-center gap-4 px-4 w-full"
          avatarClass="h-12 w-12 rounded-full border-2 border-black object-cover"
        />
      </Taskbar>
    </>
  );
};

export default AdminTaskbar;
