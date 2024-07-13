const LocalStrategy = require("passport-local");
const passport = require("passport");
const { connection } = require("../db");
const bcrypt = require("bcrypt");

passport.serializeUser(function(user, done) {
    console.log("Serialize: ", user)
    done(null, user);
});

// for whatever reason the deserialize function was never being called?
passport.deserializeUser(function(id, done) {
    console.log("Deserialize: ", user)
    User.findById(id, function (err, user) {
      done(err, user);
    });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [username],
      function (err, user) {
        console.log("User: ", user);
        if (err) {
          return done(err);
        }
        if (user.length === 0) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }

        //console.log("USER local: ", user);

        const hashedPassword = password;

        bcrypt.compare(password, hashedPassword, (err, result) => {
          console.log("Result: ", result);
          if (err) {
            console.log(err);
            return done(null, false, { message: "Incorrect password." });
          }

          if (!result) {
            // Redirect or send response indicating successful login
            return done(null, user);
          }
        });
      }
    );
  })
);
