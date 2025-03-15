import sendHttpRequest from "../../../../http_call/HttpRequest";
import CharityURLConfig from "../../../../service_url/CharityURLConfig";
import AddressUrlConfig from "../../../../service_url/AddressUrlConfig";
import { createAddress, updateAddress } from "./addressAPI";
export const fetchCharities = async () => {
  try {
    let response = await sendHttpRequest(CharityURLConfig.CHARITIES_SERVICE_URL);
    let charities = response.json;
    for (let i = 0; i < charities.length; i++) {
      let addressResponse = await sendHttpRequest(AddressUrlConfig.ADDRESS_SERVICE_URL + `/${charities[i].address}`);
      let addressDetails = addressResponse.json;
      charities[i].addressId = charities[i].address
      charities[i].address = addressDetails
    }
    console.log(charities);
    return charities;
  } catch (error) {
    console.error("Error fetching charities:", error);
    throw error;
  }
};

export const addCharity = async (charity) => {
  try {
    //////////GET ADDRESS ID
    const addressResponse = await createAddress(charity.address);
    console.log(addressResponse) // address: {....}

    const allAddressRequest = await sendHttpRequest(AddressUrlConfig.ADDRESS_SERVICE_URL)
    const allAddress = allAddressRequest.json
    console.log(allAddress)
    const { street, city, state, zipCode, country, continent } = addressResponse.address;
    let matchingAddressId = null;
    let maxScore = 0;
    for (let i = 0; i < allAddress.length; i++) {
      const address = allAddress[i];
      let score = 0
      if (address.street === street) score++;
      if (address.city === city) score++;
      if (address.state === state) score++;
      if (address.zipCode === zipCode) score++; 
      if (address.country=== country) score++;
      if (address.continent === continent) score++;
      if (address.street === street) score++;

      if(score > maxScore){
        maxScore = score
        matchingAddressId = address._id; 
      }
    }
    //////////////////////////////////////////
    charity.address = matchingAddressId
    console.log(charity)
    let response = await sendHttpRequest(
      CharityURLConfig.CHARITIES_SERVICE_URL,
      "POST",
      JSON.stringify(charity)
    )
    return response.json;
  } catch (error) {
    console.error("Error adding charity: ", error);
    throw error;
  }
};


export const updateCharity = async (userId, charity) => {
  try {
    const addressId = charity.address.id;
    await updateAddress(addressId, charity.address)

    charity.address = addressId

    console.log(charity)
    let response = await sendHttpRequest(
      CharityURLConfig.CHARITIES_SERVICE_URL + `/${userId}`,
      "PUT",
      JSON.stringify(charity)
    )
    console.log(response);
    return response.json;
  } catch (error) {
    console.error("Error update charity: ", error);
    throw error;
  }
};

export const deleteCharity = async (userId) => {
  try {
    let response = await sendHttpRequest(
      CharityURLConfig.CHARITIES_SERVICE_URL + `/${userId}`,
      "DELETE"
    )
    console.log(response)
    return response.json;
  } catch (error) {
    console.error("Error delete charity:", error);
    throw error;
  }
};
