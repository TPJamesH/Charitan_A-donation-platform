import React, { useState } from "react";
import {
  Table,
  TableToolbar,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
} from "../Table/TableHeadless";
import TableModal from "../Table/TableModal";
import useTable from "../Table/hook/useTable";
import { fetchAdmins, addAdmin, deleteAdmin } from "./api/adminsAPI";

const AdminTable = () => {
  const {
    data: admins,
    searchTerm,
    setSearchTerm,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    handleAdd,
    handleDelete,
  } = useTable(fetchAdmins, addAdmin, null, deleteAdmin);

  const [showModal, setShowModal] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const newAdmin = {
      email: currentAdmin?.email || "",
      hashedPassword: currentAdmin?.hashedPassword || "",
      role: currentAdmin?.role || "Admin", // Default role if not specified
      isActive: true, // Optional: Ensure active status if needed
    };
  
    try {
      await handleAdd(newAdmin);
      setShowModal(false);
      setCurrentAdmin(null);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="p-4">
      <TableToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setShowModal(true);
          setCurrentAdmin({ email: "", hashedPassword: "", role: "" });
        }}
      />

      {loading && <p>Loading...</p>}

      <Table title="Admin Management">
        <TableHead columns={["ID", "Email", "Role", "Created At", "Action"]} />
        <tbody>
          {admins.map((admin) => (
            <TableRow key={admin._id}>
              <TableCell>{admin._id}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>{new Date(admin.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <button
                  className="text-red-500"
                  onClick={async () => {
                    try {
                      await handleDelete(admin._id);
                    } catch (error) {
                      console.error("Error deleting admin:", error);
                    }
                  }}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <TablePagination
        totalItems={admins.length}
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
          if (currentAdmin?.id) {
            handleDelete(currentAdmin.id);
            setShowModal(false);
            setCurrentAdmin(null);
          }
        }}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowModal(false)}
      >
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full"
            value={currentAdmin?.email || ""}
            onChange={(e) =>
              setCurrentAdmin({ ...currentAdmin, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded w-full"
            value={currentAdmin?.hashedPassword || ""}
            onChange={(e) =>
              setCurrentAdmin({ ...currentAdmin, hashedPassword: e.target.value })
            }
          />
          <select
            className="border p-2 rounded w-full"
            value={currentAdmin?.role || ""}
            onChange={(e) =>
              setCurrentAdmin({
                ...currentAdmin,
                role: e.target.value,
              })
            }
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Master Admin">Master Admin</option>
          </select>
        </div>
      </TableModal>
    </div>
  );
};

export default AdminTable;