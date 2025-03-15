import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
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
import { fetchProjects, addProject, updateProject, deleteProject } from "./api/projectsAPI";

const ProjectsTable = () => {
  const {
    data: projects,
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
  } = useTable(fetchProjects, addProject, updateProject, deleteProject);

  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      ...currentProject,
      id: currentProject.id || `P${Date.now()}`,
      status: currentProject.status || "Pending",
    };

    if (currentProject.id) {
      handleUpdate(currentProject.id, newProject);
    } else {
      handleAdd(newProject);
    }

    setShowModal(false);
    setCurrentProject({
      charityId: "",
      title: "",
      goalAmount: "",
      raisedAmount: "",
      status: "Pending",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="p-4">
      {/* Search and Add Button */}
      <TableToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAddClick={() => {
          setShowModal(true);
          setCurrentProject(null);
        }}
      />

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Table */}
      <Table title="Charity Projects Management">
        <TableHead
          columns={[
            "Title",
            "Goal Amount",
            "Raised Amount",
            "Status",
            "Start Date",
            "End Date",
          ]}
        />
        <tbody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              onClick={() => {
                setCurrentProject(project);
                setShowModal(true);
              }}
            >
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.goalAmount}</TableCell>
              <TableCell>{project.raisedAmount}</TableCell>
              <TableCell>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : project.status === "Completed"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
              </TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <TablePagination
        totalItems={projects.length}
        rowsPerPage={4}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        totalPages={totalPages}
      />

      {/* Modal */}
      <TableModal
        isVisible={showModal}
        onDelete={() => {
          if (currentProject && currentProject.id) {
            handleDelete(currentProject.id);
            setShowModal(false);
            setCurrentProject(null);
          }
        }}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowModal(false)}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded w-full"
            value={currentProject?.title || ""}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                title: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Goal Amount"
            className="border p-2 rounded w-full"
            value={currentProject?.goalAmount || ""}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                goalAmount: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Raised Amount"
            className="border p-2 rounded w-full"
            value={currentProject?.raisedAmount || ""}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                raisedAmount: e.target.value,
              })
            }
          />
          <select
            className="border p-2 rounded w-full"
            value={currentProject?.status || "Pending"}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                status: e.target.value,
              })
            }
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Halted">Halted</option>
          </select>
          <input
            type="date"
            placeholder="Start Date"
            className="border p-2 rounded w-full"
            value={currentProject?.startDate || ""}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                startDate: e.target.value,
              })
            }
          />
          <input
            type="date"
            placeholder="End Date"
            className="border p-2 rounded w-full"
            value={currentProject?.endDate || ""}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                endDate: e.target.value,
              })
            }
          />
        </div>
      </TableModal>
    </div>
  );
};

export default ProjectsTable;
