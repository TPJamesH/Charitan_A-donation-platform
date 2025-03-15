import React from "react";

const TableModal = ({
  isVisible,
  onDelete,
  onSubmit,
  onCancel,
  deleteLabel = "Delete",
  saveLabel = "Save",
  cancelLabel = "Cancel",
  deleteButtonClass = "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700",
  saveButtonClass = "px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700",
  cancelButtonClass = "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700",
  children,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add/Edit Item</h2>
          <button
            onClick={onDelete}
            className={deleteButtonClass}
          >
            {deleteLabel}
          </button>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className={cancelButtonClass}
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              className={saveButtonClass}
            >
              {saveLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TableModal;
