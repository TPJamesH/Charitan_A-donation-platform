import React, { useState } from "react";
import {
  Table,
  TableToolbar,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "../../Table/TableHeadless";
import TableModal from "../../Table/TableModal";
import useTable from "../../Table/hook/useTable";
import { fetchDonors, addDonor, updateDonor, deleteDonor } from "./api/donorsAPI";
import displayAttributes from "../helper/displayAttribute";
const DonorsTable = () => {
  const {
    data: donors,
    searchTerm,
    setSearchTerm,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useTable(fetchDonors, addDonor, updateDonor, deleteDonor);

  const [showModal, setShowModal] = useState(false);
  const [currentDonor, setCurrentDonor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (currentDonor.userId && isEditing) {
      const newDonor = {
        //userId: currentDonor.userId,
        firstName: currentDonor.firstName,
        lastName: currentDonor.lastName,
        address: currentDonor.address || [],
        donationStat: currentDonor.donationStat || { projectsDonated: 0, monthlyDonated: 0, totalDonation: 0 },
        subscription: currentDonor.subscription || { category: [], region: [] },
        region: currentDonor.region || "Unknown",
      };
      handleUpdate(currentDonor.userId, newDonor);
    } else {
      const newDonor = {
        userId: currentDonor.userId,
        firstName: currentDonor.firstName,
        lastName: currentDonor.lastName,
        address: currentDonor.address || [],
        donationStat: currentDonor.donationStat || { projectsDonated: 0, monthlyDonated: 0, totalDonation: 0 },
        subscription: currentDonor.subscription || { category: [], region: [] },
        region: currentDonor.region || "Unknown",
      };
      handleAdd(newDonor);
    }

    setShowModal(false);
    setCurrentDonor(null);
  };

  return (
    <div className="p-4">
      <TableToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setShowModal(true);
          setCurrentDonor(null);
          setIsEditing(false);
        }}
      />

      {loading && <p>Loading...</p>}

      <Table title="Donors Management">
        <TableHead
          columns={[
            "Name-ID",
            "Donation Status",
            "Subscription",
            "Action"
            // "Region",
            // "Created Date",
          ]}
        />
        <tbody>
          {donors.map((donor) => (
            <TableRow
              key={donor.userId}
            >
              <TableCell>{donor.firstName + " " + donor.lastName}</TableCell>
              <TableCell>{displayAttributes(donor.donationStat)}</TableCell>
              <TableCell>{displayAttributes(donor.subscription)}</TableCell>
              {/*
              <TableCell>{donor.region}</TableCell>
              <TableCell>{donor.createdDate}</TableCell> */}
              <TableCell>
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-all"
                  onClick={() => {
                    console.log(donor)
                    setCurrentDonor(donor);
                    setShowModal(true);
                    setIsEditing(true);
                  }}
                >
                  Update
                </button>
              </TableCell>

            </TableRow>
          ))}
        </tbody>
      </Table>

      <TablePagination
        totalItems={donors.length}
        rowsPerPage={4}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        totalPages={totalPages}
      />

      <TableModal
        isVisible={showModal}
        onDelete={() => {
          if (currentDonor && currentDonor.userId) {
            handleDelete(currentDonor.userId);
            setShowModal(false);
            setCurrentDonor(null);
          }
        }}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowModal(false)}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="User ID"
            className="border p-2 rounded w-full"
            value={currentDonor?.userId || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, userId: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="First Name"
            className="border p-2 rounded w-full"
            value={currentDonor?.firstName || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border p-2 rounded w-full"
            value={currentDonor?.lastName || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, lastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Monthy Donated"
            className="border p-2 rounded w-full"
            value={currentDonor?.donationStat?.monthlyDonated || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, donationStat: { ...currentDonor.donationStat, monthlyDonated: e.target.value } })
            }
          />

          <input
            type="text"
            placeholder="Project Donated"
            className="border p-2 rounded w-full"
            value={currentDonor?.donationStat?.projectsDonated || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, donationStat: { ...currentDonor.donationStat, projectsDonated: e.target.value } })
            }
          />

          <input
            type="text"
            placeholder="Total"
            className="border p-2 rounded w-full"
            value={currentDonor?.donationStat?.totalDonation || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, donationStat: { ...currentDonor.donationStat, totalDonation: e.target.value } })
            }
          />


          <select
            className="border p-2 rounded w-full"
            value={currentDonor?.subscription || ""}
            onChange={(e) =>
              setCurrentDonor({
                ...currentDonor,
                subscription: e.target.value,
              })
            }
          >
            <option value="Category">Category</option>
            <option value="Region">Region</option>
          </select>
          <input
            type="text"
            placeholder="Region"
            className="border p-2 rounded w-full"
            value={currentDonor?.region || ""}
            onChange={(e) =>
              setCurrentDonor({ ...currentDonor, region: e.target.value })
            }
          />
        </div>
      </TableModal>
    </div >
  );
};

export default DonorsTable;
