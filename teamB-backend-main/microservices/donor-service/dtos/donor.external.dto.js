class DonorExternalDTO {
  constructor({
    userId,
    firstName,
    lastName,
    address,
    region,
    subscription,
    donationStat,
  }) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.region = region;
    this.subscription = subscription;
    this.donationStat = donationStat;
  }
}
module.exports = DonorExternalDTO;
