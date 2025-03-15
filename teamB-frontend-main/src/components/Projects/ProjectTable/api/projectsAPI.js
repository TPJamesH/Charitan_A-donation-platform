import sendHttpRequest from "../../../../http_call/HttpRequest";
import ProjectUrlConfig from "../../../../service_url/ProjectUrlConfig";

// HTTP Methods Constants
const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const response = await sendHttpRequest(ProjectUrlConfig.GET_ALL_PROJECTS, "GET");

    // Extract JSON from the response
    const responseData = response.json;

    console.log("API Response JSON:", responseData); // Debugging log

    // Ensure responseData has the expected structure
    if (responseData && responseData.projects) {
      return responseData.projects; // Return the projects array
    } else {
      console.error("Unexpected response structure:", responseData);
      return []; // Fallback to an empty array
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Add a new project
export const addProject = async (project) => {
  if (!project) {
    throw new Error("Project data is required to add a project.");
  }
  try {
    const response = await sendHttpRequest(
      ProjectUrlConfig.PROJECT_SERVICE_URL,
      HTTP_METHOD.POST,
      JSON.stringify(project) // Send the project object directly
    );

    // Extract JSON and log
    const responseData = response.json;
    console.log("Add Project Response:", responseData);

    if (responseData) {
      return responseData; // Return the created project
    } else {
      console.error("Unexpected response structure:", responseData);
      return null; // Return null if the response is invalid
    }
  } catch (error) {
    console.error("Error adding project to:", ProjectUrlConfig.PROJECT_SERVICE_URL, error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (projectId, project) => {
  if (!projectId || !project) {
    throw new Error("Both projectId and project data are required to update a project.");
  }
  try {
    const url = `${ProjectUrlConfig.PROJECT_SERVICE_URL}/${projectId}`;
    const response = await sendHttpRequest(
      url,
      HTTP_METHOD.PUT,
      JSON.stringify(project) // Send the project object directly
    );

    // Extract JSON and log
    const responseData = response.json;
    console.log("Update Project Response:", responseData);

    if (responseData) {
      return responseData; // Return the updated project
    } else {
      console.error("Unexpected response structure:", responseData);
      return null; // Return null if the response is invalid
    }
  } catch (error) {
    console.error("Error updating project at:", url, error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  if (!projectId) {
    throw new Error("projectId is required to delete a project.");
  }
  try {
    const url = `${ProjectUrlConfig.PROJECT_SERVICE_URL}/${projectId}`;
    const response = await sendHttpRequest(url, "DELETE");

    // Extract JSON and log
    const responseData = response.json;
    console.log("Delete Project Response:", responseData);

    if (responseData) {
      return responseData; // Return the server response (e.g., success message)
    } else {
      console.error("Unexpected response structure:", responseData);
      return null; // Return null if the response is invalid
    }
  } catch (error) {
    console.error("Error deleting project at:", url, error);
    throw error;
  }
};
