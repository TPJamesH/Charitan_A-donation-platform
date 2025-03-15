import { useNavigate, useLocation } from "react-router-dom";

// Hook for Taskbar logic
const useTaskbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Utility function to determine if a button is active
  const isActive = (path) => location.pathname === path;

  return { navigate, isActive };
};

export default useTaskbar;
