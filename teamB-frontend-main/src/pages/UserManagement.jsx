import React from "react";
import DonorsTable from "../components/UserManagement/DonorTable/DonorsTable";
import CharitiesTable from "../components/UserManagement/CharityTable/CharitiesTable";

const UserManagement = () => {
  return (
    <div>      
      {/* Charity Table */}
      <CharitiesTable />
      
      {/* Donor Table */}
      <DonorsTable />
    </div>
  );
};

export default UserManagement;
