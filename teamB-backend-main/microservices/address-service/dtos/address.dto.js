class AddressDTO {
  constructor({ id, street, city, state, zipCode, country, continent }) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.continent = continent;
  }
}

module.exports = AddressDTO;
