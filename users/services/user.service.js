const bcrypt = require("bcrypt");
const { User } = require("../models/user.js");

class UserService {
  constructor() {
    this.saltRounds = 10;
  }

  async getSchema(item) {
    const { email, name, password } = item;
    const salt = await bcrypt.genSalt(this.saltRounds);
    const cryptedPassword = await bcrypt.hash(password, salt);
    return new User({ email, name, password: cryptedPassword, salt });
  }

  async Add(item) {
    this.collection = await this.getSchema(item);
    const user = await this.collection.save(item);
    if (user) return user["_doc"];
  }

  async update(id, item) {
    if (item.password) {
      const user = await this.getOne(id);
      if (user) {
        item.password = await bcrypt.hash(item.password, user.salt);
        item._id = id;
        this.Add(item);
      } else {
        return null;
      }
    }
    const result = await User.findByIdAndUpdate({ _id: id }, item);
    if (result) return this.getOne(id);
    return null;
  }

  getOne(id) {
    return User.findOne({ _id: id });
  }

  delete(id) {
    return User.findByIdAndDelete({ _id: id });
  }

  getAll(filter) {
    const flt = {};
    if (filter) {
      if (typeof filter == "string") {
        const filters = `${filter}`.split("__");
        flt[filter[0]] = filters[1];
      } else {
        [...filter].forEach((item) => {
          const filters = `${item}`.split("__");
          flt[filter[0]] = filters[1];
        });
      }
    }
    return User.find(flt, {
      password: 0,
      salt: 0,
    });
  }

  findByParams(params, value) {
    return User.findOne({ [params]: value });
  }
}

module.exports = { UserService };
