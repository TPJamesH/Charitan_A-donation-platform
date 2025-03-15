class InternalCharityDTO {
  constructor({
    id,
    name,
    userId,
    address,
    region,
    category,
    type,
    taxCode,
    hashedStripeId,
  }) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.address = address;
    this.region = region;
    this.category = category;
    this.type = type;
    this.taxCode = taxCode;
    this.hashedStripeId = hashedStripeId;
  }
}

module.exports = InternalCharityDTO;
