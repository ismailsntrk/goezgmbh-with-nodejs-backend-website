const User = require("../models/user");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const _ = require("lodash");

const signToken = (userID) => {
  return jwt.sign(
    {
      iss: process.env.LOGIN_TOKEN,
      sub: userID,
    },
    process.env.LOGIN_TOKEN,
    { expiresIn: "1h" }
  );
};

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  const token = jwt.sign(
    { name, email, password, role },
    process.env.JWT_ACC_ACTIVATE,
    { expiresIn: "20m" }
  );
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    } else {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "info.goezgmbh@gmail.com",
          pass: "1071zafer",
        },
      });

      var mailOptions = {
        from: "noreply@ismail.com",
        to: email,
        subject: "Account Activation Link for reset your password",
        html: `
                <h2>Please Click to Given link </h2>

                <a href="${process.env.CLIENT_URL}/authentication/activate/${token}">Tikla</a>
                
                
                `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({ message: "Email Sended" });
        }
      });
    }
  });
};

exports.activateAccount = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      function (err, decotedToken) {
        if (err) {
          return res.status(400).json({ error: "Incorrect or Expired Link" });
        } else {
          const { name, email, password, role } = decotedToken;

          let newUser = new User({ name, email, password, role });
          newUser.save((err, success) => {
            if (err) {
              console.log("Activation Error: ", err);
              return res
                .status(400)
                .json({ error: "Error activating Account" });
            }
            res.json({
              message: "signup Success!",
            });
          });
        }
      }
    );
  } else {
    return res.json({ error: "Something went wrong" });
  }
};

exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, name, email, role } = req.user;
    const token = signToken(_id);

    // res.cookie("access_token", token, {
    //   httpOnly: true,
    //   secure:false,
    //   domain:".goezgmbh.com"
    // });

    res
      .status(200)
      .json({token: token , isAuthenticated: true, user: { name, email, role } });
  }
};

exports.logout = (req, res) => {
  
  res.json({ user: { name: "", email: "" }, success: true });
};
