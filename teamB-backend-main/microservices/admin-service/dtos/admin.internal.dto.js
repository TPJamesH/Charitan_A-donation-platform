class InternalAdminDTO {
  constructor({ id, email, hashedPassword, createdAt, permissionLevel }) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.createdAt = createdAt;
    this.permissionLevel = permissionLevel;
  }
}

module.exports = InternalAdminDTO;
