import React from "react";

// Table Toolbar Component
export const TableToolbar = ({
  searchTerm,
  setSearchTerm,
  onAddClick,
  addButtonText = "+ Add Item",
  placeholder = "Search here...",
}) => (
  <div className="flex justify-between items-center mb-6">
    <div className="relative w-96">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <button
      onClick={onAddClick}
      className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#e65a00] transition-colors"
    >
      {addButtonText}
    </button>
  </div>
);

// Table Wrapper
export const Table = ({ children, className, title }) => (
  <div className={`overflow-x-auto rounded-lg shadow ${className}`}>
    {title && <h2 className="text-xl font-bold mt-4 ml-4 mb-6 text-gray-700">{title}</h2>}
    <table className="w-full table-auto">{children}</table>
  </div>
);

// Table Head
export const TableHead = ({ columns }) => (
  <thead className="bg-gray-50">
    <tr>
      {columns.map((col, index) => (
        <th
          key={index}
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

// Table Row
export const TableRow = ({ children, onClick, className }) => (
  <tr
    className={`hover:bg-gray-50 transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </tr>
);

// Table Cell
export const TableCell = ({ children, className,onClick}) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`} onClick = {onClick}>{children}
  </td>
);

// Pagination Component
export const TablePagination = ({
  totalPages,
  currentPage,
  goToNextPage,
  goToPreviousPage,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-[#e65a00]"
        }`}
      >
        Previous
      </button>
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-[#e65a00]"
        }`}
      >
        Next
      </button>
    </div>
  );
};

