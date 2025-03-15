import React from "react";

// Utility function for determining class names
const getClassNames = (path, isActive) =>
  `flex items-center justify-left w-full gap-6 px-4 py-2 rounded-lg cursor-pointer mb-4 mt-2 ${
    isActive
      ? "bg-primary shadow-lg opacity-100 hover:opacity-100"
      : "opacity-70 hover:bg-primary hover:shadow-lg hover:opacity-70"
  }`;

// Taskbar Wrapper
const Taskbar = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

// Taskbar Item
const TaskbarItem = ({ path, isActive, onClick, children, className }) => {
  return (
    <div
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`${className} cursor-pointer`}
    >
      {children}
    </div>
  );
};

// Taskbar Divider
const TaskbarDivider = ({ className }) => {
  return <div className={className}></div>;
};

// Taskbar Avatar
const TaskbarAvatar = ({ src, alt, name, description, className, avatarClass }) => {
  return (
    <div className={className}>
      <img src={src} alt={alt} className={`rounded-full ${avatarClass}`} />
      <div className="flex flex-col">
        <span className="text-white font-semibold hidden sm:block">{name}</span>
        {description && <span className="text-gray-400 text-sm hidden sm:block">{description}</span>}
      </div>
    </div>
  );
};

export { Taskbar, TaskbarItem, TaskbarDivider, TaskbarAvatar, getClassNames };
