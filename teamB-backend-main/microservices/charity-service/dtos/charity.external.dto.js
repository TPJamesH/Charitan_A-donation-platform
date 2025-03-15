class ExternalCharityDTO {
  constructor({ id, name, category, type, region }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.region = region;
  }
}

module.exports = ExternalCharityDTO;
