class DonorInternalDTO {
  constructor({
    userId,
    firstName,
    lastName,
    hashedStripeId,
    address,
    region,
    subscription,
    donationStat,
    stripeId,
  }) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hashedStripeId = hashedStripeId;
    this.address = address;
    this.region = region;
    this.subscription = subscription;
    this.donationStat = donationStat;
    this.stripeId = stripeId;
  }
}
module.exports = DonorInternalDTO;
