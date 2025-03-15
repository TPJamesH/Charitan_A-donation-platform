class UserExternalDTO {
  constructor({ id, username, email, role, avatar, introVideo, isActive }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.avatar = avatar;
    this.introVideo = introVideo;
    this.isActive = isActive;
  }
}
module.exports = UserExternalDTO;
