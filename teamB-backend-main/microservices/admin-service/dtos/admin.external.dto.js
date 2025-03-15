class ExternalAdminDTO {
  constructor({ id, email, createdAt, permissionLevel }) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.permissionLevel = permissionLevel;
  }
}

module.exports = ExternalAdminDTO;
