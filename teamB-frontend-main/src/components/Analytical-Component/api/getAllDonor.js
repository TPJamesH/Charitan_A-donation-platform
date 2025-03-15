import sendHttpRequest from "../../../http_call/HttpRequest";
import DonorURLConfig from "../../../service_url/DonorURLConfig";

async function getAllDonors() {
    let response = await sendHttpRequest(
        DonorURLConfig.GET_ALL_DONORS,
    );
    return response.json
}

export default getAllDonors