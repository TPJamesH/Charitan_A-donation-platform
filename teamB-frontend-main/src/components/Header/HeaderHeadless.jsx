import React from "react";

// Header wrapper
const Header = ({ children, className }) => {
  return <header className={className}>{children}</header>;
};

// Logo Section
const HeaderLogo = ({ src, alt, text, className }) => {
  return (
    <div className={className}>
      <img src={src} alt={alt} className="h-12 w-auto" />
      <span className="ml-2 text-white font-inter font-semibold text-xl hidden sm:block">{text}</span>
    </div>
  );
};

// Search Section
const HeaderSearch = ({ value, onChange, onReset, placeholder, className, iconSrc, iconAlt }) => {
    return (
      <div className={className}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-200 text-gray-700 border rounded-xl px-4 py-2 pr-10 h-[60%] focus:ring-2 focus:ring-primary font-inter w-50"
        />
        <img
          src={iconSrc}
          alt={iconAlt}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer"
          onClick={onReset} // Reset the search when clicking the icon
        />
      </div>
    );
  };
  

// Notifications Section
const HeaderNotifications = ({ show, toggle, notifications, className }) => {
  return (
    <div className={className}>
      <button
        className="text-gray-500"
        onClick={toggle}
      >
        <img src={notifications.iconSrc} alt="Notifications" className="h-6 w-6" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
          <ul className="divide-y divide-gray-200">
            {notifications.data.length > 0 ? (
              notifications.data.map((notification, index) => (
                <li
                  key={index}
                  className="p-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {notification}
                </li>
              ))
            ) : (
              <li className="p-4 text-sm text-gray-500 text-center">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Header, HeaderLogo, HeaderSearch, HeaderNotifications };
