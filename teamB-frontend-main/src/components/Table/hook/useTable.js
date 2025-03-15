import { useState, useEffect } from "react";

/**
 * Generic useTable Hook (Apply for all Tables)
 * @param {Function} fetchItems - Function to fetch items from the backend or mock API
 * @param {Function} addItem - Function to add a new item
 * @param {Function} updateItem - Function to update an existing item
 * @param {Function} deleteItem - Function to delete an item
 * @param {number} rowsPerPage - Number of rows to display per page
 * @returns {Object} Hook methods and states
 */

const useTable = (fetchItems, addItem, updateItem, deleteItem,rowsPerPage = 5) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Loading effect
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const items = await fetchItems();
        setData(items);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchItems]);

  // CRUD logic
  const handleAdd = async (newItem) => {
    try {
      const addedItem = await addItem(newItem);
      setData((prevData) => [...prevData, addedItem]);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handleUpdate = async (id, updatedItem) => {
    try {
      const updated = await updateItem(id, updatedItem);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updated : item))
      );
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    data: paginatedData,
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    goToNextPage,
    goToPreviousPage,
    setData,
    searchTerm,
    setSearchTerm,
    loading,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};

export default useTable;
