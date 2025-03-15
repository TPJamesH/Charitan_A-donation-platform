import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getProjectDonationOfCharity(charityID) {
    localStorage.removeItem("currentCharity")
    const chosenCharity = JSON.parse(localStorage.getItem(charityID))
    localStorage.setItem("currentCharity", "(Chosen: " +chosenCharity.name + ")");
    localStorage.removeItem(charityID)
   
  
    if(charityID && charityID.length !=0){
    let response = await sendHttpRequest(
        AnalyticURLConfig.PROJECT_DONATION_CHARITY,
        "GET",
        JSON.stringify({charityId: charityID}) //body
      
    );
    let charityStat = response.json

    let array = [{
        sumProject: charityStat.totalProjects,
        raisedDonation: `$${charityStat.totalDonations}`
    }]
    return array
}
}

export default getProjectDonationOfCharity