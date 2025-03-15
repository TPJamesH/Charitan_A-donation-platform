import sendHttpRequest from "../../../../http_call/HttpRequest";
import DonorURLConfig from "../../../../service_url/DonorURLConfig";


export const fetchDonors = async () => {
  try {
    let response = await sendHttpRequest( DonorURLConfig.DONORS_SERVICE_URL);

    console.log(response)

    return response.json
  } catch (error) {
    console.error("Error fetching donor:", error);
    throw error;
  }
};

export const addDonor = async (donor) => {
  try {
    let response = await sendHttpRequest(
      DonorURLConfig.DONORS_SERVICE_URL,
      "POST",
      JSON.stringify(donor)
    )
    return response.json;
  } catch (error) {
    console.error("Error adding donor: ", error);
    throw error;
  }
};

export const updateDonor = async (userId, donor) => {
    try {
      let response = await sendHttpRequest(
        DonorURLConfig.DONORS_SERVICE_URL + `/${userId}`,
        "PUT",
        JSON.stringify(donor)
      )
      return response.json;
    } catch (error) {
      console.error("Error update donor: ", error);
      throw error;
    }
};

export const deleteDonor = async (userId) => {
   try {
      let response = await sendHttpRequest(
        DonorURLConfig.DONORS_SERVICE_URL + `/${userId}`,
        "DELETE"
      )
      return response.json;
    } catch (error) {
      console.error("Error delete donor: ", error);
      throw error;
    }
};
