import { useState } from "react";

const useAdminHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy notification data
  const notifications = [
    "You have a new message from Admin",
    "A Project has been approved",
    "System maintenance scheduled for tomorrow",
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return { showNotifications, toggleNotifications, notifications };
};

export default useAdminHeader;
