const userModel = require("../model/user.model");

class UserController {
  async createUser(
    firstName,
    lastName,
    img,
    email,
    phoneNumber,
    password,
    userRole
  ) {
    const newUser = new userModel({
      firstName,
      lastName,
      img,
      email,
      phoneNumber,
      password,
      userRole,
    });

    const response = await newUser.save();
    return response;
  }

  async getUser(id) {
    const result = await userModel.findById(id);
    return result;
  }

  async getUserByEmail(email) {
    const result = await userModel.findOne({ email });
    return result;
  }

  async getUsers() {
    const result = await userModel.find();
    return result;
  }

  async updateUser(id, firstName, lastName, img, phoneNumber, password) {
    const result = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { firstName, lastName, img, phoneNumber, password } }
    );
    return result;
  }

  async deleteUser(id) {
    const result = await userModel.findByIdAndDelete(id);
    return result;
  }
}

module.exports = new UserController();
