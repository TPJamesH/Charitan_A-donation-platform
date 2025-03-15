import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import AdminManagement from "../pages/AdminManagement";
import Projects from "../pages/Projects";
import { Loader } from 'rsuite';
import Settings from "../pages/Settings";
import Authentication from "../pages/Authentication";
import AdminHeader from "../components/Header/AdminHeader";
import AdminTaskbar from "../components/Taskbar/AdminTaskbar";
import Timer from "../components/Headless/Timer/Timer";
import useLogout from "../components/Authentication-Component/hook/useLogOut";

const AppRouter = () => {
  const excludedRoutes = ['/']; // Exclude timer on the authentication route
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const logoutFunction = useLogout();

  useEffect(() => {
    // Force reload the authentication page only once
    if (location.pathname === '/' && !sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, [location.pathname]);

  // Handle logout when the timer ends
  const handleLogout = () => {
    setIsLoggedIn(false);
    logoutFunction();
  };

  return (
    <Suspense fallback={<Loader className="flex-grow p-4" speed="normal" content="Normal" />}>
      {!excludedRoutes.includes(location.pathname) && (
        <>
          <div className="mb-4">
            <AdminHeader />
          </div>
          <div className="flex flex-1">
            {/* Taskbar */}
            <AdminTaskbar />

            <div className="flex-grow p-4">
              <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/user-management" element={<UserManagement />} />
                <Route path="/admin/admin-management" element={<AdminManagement />} />
                <Route path="/admin/projects" element={<Projects />} />
                <Route path="/admin/settings" element={<Settings />} />
                {/* Protected Routes */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
          {/* Floating Timer */}
          <Timer
            initialTime={900} // 15 minutes
            logoutCallback={handleLogout}
            isLoggedIn={true} // Timer appears on all protected routes
          />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Authentication
              onLogin={() => setIsLoggedIn(true)} // Set login state on successful login
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
