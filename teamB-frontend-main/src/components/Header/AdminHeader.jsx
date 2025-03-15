import React from "react";
import useHeader from "./hook/useAdminHeader";
import useSearch from "./hook/useSearch";
import { Header, HeaderLogo, HeaderSearch, HeaderNotifications } from "./HeaderHeadless";
import logo from "../../assets/Header_Icon/CHARITAN.png";
import bellIcon from "../../assets/Header_Icon/bell_icon.png";
import magnifyingGlassIcon from "../../assets/Header_Icon/mag_glass.png";

const AdminHeader = () => {
  const { showNotifications, toggleNotifications, notifications } = useHeader();
  const { searchQuery, handleSearchChange, resetSearch } = useSearch();

  return (
    <div className="bg-gray-50">
      <Header className="py-4 bg-white flex items-center shadow-lg relative">
        {/* Black section for logo */}
        <HeaderLogo
          src={logo}
          alt="Charitan Logo"
          text="CHARITAN"
          className="w-[15%] sm:w-[25%] lg:w-[15%] absolute top-0 bottom-0 left-0 flex items-center justify-center bg-black px-4"
        />

        {/* Right side with notification and search */}
        <div className="ml-auto flex items-center gap-6 px-4 h-full relative">
          {/* Notification Button */}
          <HeaderNotifications
            show={showNotifications}
            toggle={toggleNotifications}
            notifications={{
              data: notifications,
              iconSrc: bellIcon,
            }}
            className="relative"
          />

          {/* Search Input with Magnifying Glass */}
          <HeaderSearch
            value={searchQuery}
            onChange={handleSearchChange}
            onReset={resetSearch}
            placeholder="Search projects"
            className="relative"
            iconSrc={magnifyingGlassIcon}
            iconAlt="Search"
          />
        </div>
      </Header>
    </div>
  );
};

export default AdminHeader;
