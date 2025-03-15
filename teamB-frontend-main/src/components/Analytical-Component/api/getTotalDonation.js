import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getTotalDonation(category){
    if(category.length!= 0){
        try{
    const queryString = new URLSearchParams({[`query[${category}]`]: category }).toString()

    console.log( `${AnalyticURLConfig.TOTAL_DONATION}?${queryString}`)
    let response = await sendHttpRequest(
       `${AnalyticURLConfig.TOTAL_DONATION}?${queryString}`,
        "GET"
    );
    console.log(response)
    let donationStat = response.json

        let array = [{
            countDonation: `$${donationStat.totalDonations}`,
        }]
    return array
        }
        catch(error){
            console.error(error)
        }
}
}

export default getTotalDonation