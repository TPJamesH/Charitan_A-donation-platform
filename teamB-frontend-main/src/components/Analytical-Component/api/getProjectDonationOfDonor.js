import sendHttpRequest from "../../../http_call/HttpRequest";
import DonorURLConfig from "../../../service_url/DonorURLConfig";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getProjectDonationOfDonor(donorID) {
    localStorage.removeItem("currentDonor")
    const chosenDonor = JSON.parse(localStorage.getItem(donorID))
    localStorage.setItem("currentDonor", "(Chosen: " +chosenDonor.firstName + " " + chosenDonor.lastName + ")");
    localStorage.removeItem(donorID)
   
    if (donorID.length != 0) {
        let response = await sendHttpRequest(
            AnalyticURLConfig.PROJECT_DONATION_DONOR + `/${String(donorID)}/projects-and-donations`,

        );
        let donationStat = response.json

        let array = [{
            sumProject:  donationStat.totalProjectsDonated || 0,
            countDonation: `$${donationStat.totalDonations}` || 0 ,
            MonthlyDonated: `$${donationStat.monthlyDonated}` || 0
        }]
        return array
    }
}

export default getProjectDonationOfDonor