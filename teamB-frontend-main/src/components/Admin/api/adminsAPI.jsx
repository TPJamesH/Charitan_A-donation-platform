import sendHttpRequest from "../../../http_call/HttpRequest";
import AdminURLConfig from "../../../service_url/AdminURLConfig";

/**
 * Fetches all admins from the backend.
 */
export const fetchAdmins = async () => {
  try {
    const response = await sendHttpRequest(AdminURLConfig.ADMINS_SERVICE_URL);
    return response.json;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

/**
 * Creates a new admin in the backend.
 */
export const addAdmin = async (admin) => {
    try {
      const response = await sendHttpRequest(
        AdminURLConfig.ADMINS_SERVICE_URL,
        "POST",
        JSON.stringify(admin),
        { "Content-Type": "application/json" }
      );
      return response.json;
    } catch (error) {
      console.error("Error adding admin:", error);
      throw error;
    }
  };
  

/**
 * Deletes an admin by ID.
 */
export const deleteAdmin = async (adminId) => {
  try {
    const response = await sendHttpRequest(
      `${AdminURLConfig.ADMINS_SERVICE_URL}/${adminId}`,
      "DELETE"
    );
    return response.json;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};

/**
 * Updates an existing admin by ID.
 */
export const updateAdmin = async (adminId, adminData) => {
    try {
      const response = await sendHttpRequest(
        `${AdminURLConfig.ADMINS_SERVICE_URL}/${adminId}`,
        "PUT",
        JSON.stringify(adminData),
        { "Content-Type": "application/json" }
      );
      return response.json;
    } catch (error) {
      console.error("Error updating admin:", error);
      throw error;
    }
  };
