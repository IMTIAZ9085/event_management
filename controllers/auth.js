const User = require("../models/User");
const Event = require("../models/Event");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');

//REGISTER FUNCTION
exports.register = async (req, res, next) => {
      const {
            username,
            email,
            password
      } = req.body;

      try {
            const user = await User.create({
                  username,
                  email,
                  password
            });

            sendToken(user, 201, res);

      } catch (err) {
            next(err); 
      }
};



//LOGIN FUNCTION
exports.login = async (req, res, next) => {
      const {
            email,
            password
      } = req.body;

      //ANOTHER WAY OF ERROR HANDELING
      if (!email || !password) {
            return next(new ErrorResponse("Please Provide Email and Password", 400));
      }

      try {
            const user = await User.findOne({
                  email
            }).select("+password");

            if (!user) {
                  res.status(404).json({
                        success: false,
                        error: "The user does not exist"
                  });
            }

            const isMatch = await user.matchPasswords(password);

            if (!isMatch) {
                  res.status(404).json({
                        success: false,
                        error: "Invalid Credentials"
                  });
            }

            if (isMatch) sendToken(user, 200, res);

      } catch (e) {
            res.status(500).json({
                  success: false,
                  error: e
            })
      }
};



//FORGET FUNCTION
exports.forgetPassword = async (req, res, next) => {
      const {
            email
      } = req.body;

      try {
            const user = await User.findOne({
                  email: email
            });
            if (!user) {
                  next(res.status(404).json({
                        success: false,
                        message: 'Email Cannot be Send'
                  }));
            }

            const resetToken = user.getResetPasswordToken();
            await user.save();
            const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
            const message = `
      <h1>Reset Your Password</h1>
      <p>click the below link  to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;
            try {
                  await sendEmail({
                        to: user.email,
                        subject: "Password reset requested",
                        text: message
                  })
                  next(res.status(201).json({
                        success: true,
                        message: "Email Sent"
                  }));
            } catch (err) {
                  user.resetPasswordToken = undefined;
                  user.resetPasswordExpire = undefined;
                  await user.save();
                  return next(res.status(404).json({
                        success: false,
                        message: err
                  }));
            }

      } catch (err) {
            next(res.status(404).json({
                  success: false,
                  message: err
            }));
      };

};



//RESET PASSWORD FUNCTION
exports.resetPassword = async (req, res, next) => {
      const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
      try {
            const user = await User.findOne({
                  resetPasswordToken: resetPasswordToken,
                  resetPasswordExpire: {
                        $gt: Date.now()
                  }
            })

            if (!user) {
                  return next(res.status(404).json({
                        success: false,
                        message: "Invalid Reset Password Token"
                  }));
            }
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            res.status(201).json({
                  success: true,
                  message: "Password Updated successfully"
            });

      } catch (err) {
            next(res.status(404).json({
                  success: false,
                  message: err
            }));
      }
};

const sendToken = (user, statusCode, res) => {
      const token = user.getSignedToken();
      res.status(statusCode).json({
            success: true,
            token
      });
}

//my invitation request
exports.invited = async (req, res) => {
      try {
            const user = await User.findOne({
                  _id: req.params._id
            });
            const event = await Event.findOne({
                  _id: req.body.postid 
            });
            console.log(event);
            const message = `
      <h1>EVENT INVITATION EMAIL</h1>
      <p>You have been invited to a ${event.event_name}</p> <br/>
      <p>The event is starting from ${event.Start_date} and it will end on ${event.end_date}</p> <br/>
      
      `;
            if (!user.invited.includes(req.body.postid)) {
                  await user.updateOne({
                        $push: {
                              invited: req.body.postid
                        }
                  });
                  await sendEmail({
                        to: user.email,
                        subject: "Event joining requested",
                        text: message
                  })
                  res.status(200).json("You invited This user");
            } else {
                  res.status(403).json("You have already invited This user");
            }
      } catch (err) {
            res.status(404).json({
                  success: false,
                  message: "this is not working"
            });
      }
};




//INVITE USER THROUGH EMAIL
exports.inviteEmail = async (req, res, next) => {
      const {
            email
      } = req.body;

      try {
            const user = await User.findOne({
                  email: email
            });
            if (!user) {
                  next(res.status(404).json({
                        success: false,
                        message: 'Email Cannot be Send'
                  }));
            }

            const resetToken = user.getResetPasswordToken();
            await user.save();
            const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
            const message = `
      <h1>Reset Your Password</h1>
      <p>click the below link  to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;
            try {
                  await sendEmail({
                        to: user.email,
                        subject: "Password reset requested",
                        text: message
                  })
                  next(res.status(201).json({
                        success: true,
                        message: "Email Sent"
                  }));
            } catch (err) {
                  user.resetPasswordToken = undefined;
                  user.resetPasswordExpire = undefined;
                  await user.save();
                  return next(res.status(404).json({
                        success: false,
                        message: err
                  }));
            }

      } catch (err) {
            next(res.status(404).json({
                  success: false,
                  message: err
            }));
      };

};



//FETCH ALL USERS FROM THE DATA BASE
exports.Allusers = async (req, res) => {
      try {
            const data = User.find({}, (err, user) => {
                  if (err) console.log(err);
                  else {
                        res.send(user);
                  }
            })
      } catch (err) {
            res.status(404).json({
                  success: false,
                  message: err
            });
      }
};



///FIND A PARTICULAR USER
exports.Finduser = async (req, res) => {

      try {
            const user = await User.findOne({
                  email: req.params.email
            });
            res.send({ 
                  user
            });
            if (!user) {
                  res.status(404).json({
                        success: false,
                        error: "The user does not exist"
                  });
                  // if (user) console.log("user exist");

            }
      } catch (e) {
            res.status(500).json({
                  success: false,
                  error: e
            })
      }
};