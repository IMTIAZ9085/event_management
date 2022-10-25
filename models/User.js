const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
      username: {
            type: String,
            require: [true, "Please provide the username"]
      },
      email: {
            type: String,
            require: [true, "Please provide the emailID"],
            unique: true,
            match: [
                  /([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/,
                  "Please provide a valid email"
            ]
      },
      password: {
            type: String,
            require: [true, "Please provide the password"],
            minlength: 6,
            select: false
      },
      invited: {
            type: Array,
            default: []
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date
});

//pre middleware using for bcrypt purpose
UserSchema.pre("save", async function (next) {
      if (!this.isModified("password")) {
            next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();

})

//methode for comparing hashing password
UserSchema.methods.matchPasswords = async function (password) {
      return await bcrypt.compare(password, this.password);
}

//creating jwt token on signin and login
UserSchema.methods.getSignedToken = function () {
      return jwt.sign({
            id: this._id
      }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
      })
}

//another methode for generating forget password token
UserSchema.methods.getResetPasswordToken = function () {
      const resetToken = crypto.randomBytes(20).toString('hex');
      this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
      this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
      return resetToken;
}


const User = mongoose.model("User", UserSchema);
 
module.exports = User;