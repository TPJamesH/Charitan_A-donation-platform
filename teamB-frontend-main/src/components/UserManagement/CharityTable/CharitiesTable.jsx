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
import { fetchCharities, addCharity, updateCharity, deleteCharity } from "./api/charitiesAPI";

import displayAttributes from "../helper/displayAttribute";

const CharitiesTable = () => {
  const {
    data: charities,
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
  } = useTable(fetchCharities, addCharity, updateCharity, deleteCharity);

  const [showModal, setShowModal] = useState(false);
  const [currentCharity, setCurrentCharity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();


    if (currentCharity.userId && isEditing) {
      console.log(currentCharity)
      const newCharity = {
        //userId: currentCharity.userId,
        name: currentCharity.name || "",
        address: {
          id: currentCharity.address.id || "",
          street: currentCharity.address.street || "",
          city: currentCharity.address.city || "",
          state: currentCharity.address.state || "",
          zipCode: currentCharity.address.zipCode || "",
          country: currentCharity.address.country || "",
          continent: currentCharity.address.continent || "",
        },
        region: currentCharity.region || [],
        type: currentCharity.type || "Person",
        category: currentCharity.category || ["Other"],
      };
      console.log(newCharity)
      handleUpdate(currentCharity.userId, newCharity);
    } else {
      const newCharity = {
        userId: currentCharity.userId,
        name: currentCharity.name || "",
        region: currentCharity.region || [],
        address: {
          street: currentCharity.address.street || "",
          city: currentCharity.address.city || "",
          state: currentCharity.address.state || "",
          zipCode: currentCharity.address.zipCode || "",
          country: currentCharity.address.country || "",
          continent: currentCharity.address.continent || "",
        },
        type: currentCharity.type || "Person",
        category: currentCharity.category || ["Other"],
      };
      handleAdd(newCharity);
    }

    setShowModal(false);
    setCurrentCharity(null);
  };

  return (
    <div className="p-4">
      <TableToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setShowModal(true);
          setCurrentCharity({
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            continent: "",
          });
          setIsEditing(false);

        }}
      />

      {loading && <p>Loading...</p>}

      <Table title="Charities Management">
        <TableHead
          columns={[
            "Name-ID",
            "Address",
            "Charity Type",
            "Category",
            "Action",
          ]}
        />
        <tbody>
          {charities.map((charity) => (
            <TableRow key={charity.userId}>
              <TableCell>{charity.name}</TableCell>
              <TableCell>{displayAttributes(charity.address)}</TableCell>
              <TableCell>{charity.type}</TableCell>
              <TableCell>{charity.category}</TableCell>
              <TableCell>
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-all"
                  onClick={() => {
                    setCurrentCharity({
                      ...charity,
                      address: { ...charity.address, id: charity.addressId}, // Spread address fields for editing
                    });
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
        totalItems={charities.length}
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
          if (currentCharity && currentCharity.userId) {
            handleDelete(currentCharity.userId);
            setShowModal(false);
            setCurrentCharity(null);
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
            value={currentCharity?.userId || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, userId: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full"
            value={currentCharity?.name || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Street"
            className="border p-2 rounded w-full"
            value={currentCharity?.address?.street || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, address: { ...currentCharity.address, street: e.target.value } })
            }
          />
          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded w-full"
            value={currentCharity?.address?.city || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, address: { ...currentCharity.address, city: e.target.value } })
            }
          />
          <input
            type="text"
            placeholder="State"
            className="border p-2 rounded w-full"
            value={currentCharity?.address?.state || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, address: { ...currentCharity.address, state: e.target.value } })
            }
          />
          <input
            type="text"
            placeholder="Zip Code"
            className="border p-2 rounded w-full"
            value={currentCharity?.address?.zipCode || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, address: { ...currentCharity.address, zipCode: e.target.value } })
            }
          />
          <input
            type="text"
            placeholder="Country"
            className="border p-2 rounded w-full"
            value={currentCharity?.address?.country || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, address: { ...currentCharity.address, country: e.target.value } })
            }
          />
          <input
            type="text"
            placeholder="Continent"
            className="border p-2 rounded w-full"
            value={currentCharity?.address?.continent || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, address: { ...currentCharity.address, continent: e.target.value } })
            }
          />
          <select
            className="border p-2 rounded w-full"
            value={currentCharity?.type || ""}
            onChange={(e) =>
              setCurrentCharity({
                ...currentCharity,
                type: e.target.value,
              })
            }
          >
            <option value="Person">Person</option>
            <option value="Company">Company</option>
            <option value="Non-profit Organization">
              Non-profit Organization
            </option>
          </select>
          <select
            className="border p-2 rounded w-full"
            value={currentCharity?.category || ""}
            onChange={(e) =>
              setCurrentCharity({ ...currentCharity, category: e.target.value })
            }
          >
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Religion">Religion</option>
            <option value="Humanitarian">Humanitarian</option>
            <option value="Housing">Housing</option>
            <option value="Other">Other</option>
          </select>

        </div>
      </TableModal>
    </div>
  );
};

export default CharitiesTable;
