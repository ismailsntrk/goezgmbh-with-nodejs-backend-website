const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../controllers/passport");
const cookieParserInstance = require("cookie-parser");

router.use(cookieParserInstance());

function passport_authenticate_jwt(callback) {
  function hack(req, res, next) {
    passport.authenticate("jwt", function (err, user, info) {
      if (err) return next(err);
      if (!user)
        return res
          .status(201)
          .json({ isAuthenticated: false, user: { name: "", email: "" } });

      req.user = user;
      return callback(req, res, next);
    })(req, res, next);
  }

  return hack;
}
//import controller
const {
  signup,
  activateAccount,

  logout,
  signin,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/email-activate", activateAccount);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/logout", passport.authenticate("jwt", { session: false }), logout);
router.get(
  "/authenticated/:token",
  passport_authenticate_jwt(function (req, res, next) {
    const { name, email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { name, email, role } });
   
  })
  
);

module.exports = router;
