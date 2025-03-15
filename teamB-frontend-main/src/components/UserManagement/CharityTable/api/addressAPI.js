import sendHttpRequest from "../../../../http_call/HttpRequest";
import AddressUrlConfig from "../../../../service_url/AddressUrlConfig";

export const getAddressById = async (addressID) => {
  try {
    let response = await sendHttpRequest(
        AddressUrlConfig.ADDRESS_SERVICE_URL + `/${addressID}`,
      "GET",
    )
   
    return response.json;
  } catch (error) {
    console.error("Error getting address:", error);
    throw error;
  }
};

export const createAddress= async (address) => {
  try {
      let response = await sendHttpRequest(
        AddressUrlConfig.ADDRESS_SERVICE_URL,
        "POST",
        JSON.stringify(address)
      )
      return response.json;
    } catch (error) {
      console.error("Error adding address: ", error);
      throw error;
    }
};


export const updateAddress = async (addressId, address) => {
    try {
      let response = await sendHttpRequest(
        AddressUrlConfig.ADDRESS_SERVICE_URL + `/${addressId}`,
        "PUT",
        JSON.stringify(address)
      )
      return response.json;
    } catch (error) {
      console.error("Error update address: ", error);
      throw error;
    }
};