const mockAdmins = [
    {
      id: "A001",
      email: "admin@example.com",
      permissionLevel: "Master Admin",
      createdAt: "2025-01-01T08:30:00Z",
    },
    {
      id: "A002",
      email: "admin2@example.com",
      permissionLevel: "Admin",
      createdAt: "2025-01-02T10:15:00Z",
    },
    {
      id: "A003",
      email: "admin3@example.com",
      permissionLevel: "Admin",
      createdAt: "2025-01-03T14:45:00Z",
    },
  ];
  
  /**
   * Simulates a delay to mimic network latency.
   * @param {number} ms - Delay in milliseconds.
   * @returns {Promise<void>}
   */
  const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  /**
   * Fetches all admins from the mock data.
   * @returns {Promise<Array>} A list of mock admins.
   */
  export const fetchAdmins = async () => {
    await simulateDelay(500);
    return mockAdmins;
  };
  
  /**
   * Adds a new admin to the mock data.
   * @param {Object} admin - Admin data to be added.
   * @returns {Promise<Object>} The newly added admin.
   */
  export const addAdmin = async (admin) => {
    await simulateDelay(500);
    const newAdmin = { ...admin, id: `A${Date.now()}` };
    mockAdmins.push(newAdmin);
    return newAdmin;
  };
  
  /**
   * Deletes an admin from the mock data by ID.
   * @param {string} adminId - ID of the admin to delete.
   * @returns {Promise<{ success: boolean }>} Success response.
   */
  export const deleteAdmin = async (adminId) => {
    await simulateDelay(500);
    const index = mockAdmins.findIndex((admin) => admin.id === adminId);
    if (index !== -1) {
      mockAdmins.splice(index, 1);
      return { success: true };
    } else {
      throw new Error("Admin not found");
    }
  };
  
  /**
   * Mock function to check if a master admin exists.
   * @returns {Promise<{ masterAdminExists: boolean }>} Existence of master admin.
   */
  export const checkMasterAdminExists = async () => {
    await simulateDelay(500);
    const exists = mockAdmins.some((admin) => admin.permissionLevel === "Super Admin");
    return { masterAdminExists: exists };
  };
  