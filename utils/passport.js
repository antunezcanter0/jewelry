const LocalStrategy = require("passport-local").Strategy;
const db = require("../databases/database");
const { comparePassword, signJwt } = require("./helpers");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.select().from("auth_user").where({ id }).first();
      done(null, user);
    } catch (err) {
      done(null, false);
    }
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passportField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await db
            .select()
            .from("auth_user")
            .where({ email: email })
            .first();

          if (!user) {
            return done(null, false);
          }

          const password_is_valid = await comparePassword(
            password,
            user.password
          );

          if (!password_is_valid) {
            return done(null, false);
          }

          const role = await db("auth_membership")
            .select()
            .where({ id_user: user.id })
            .join("auth_group", {
              "auth_group.id": "auth_membership.id_group",
            })
            .first();

          user.role = "client";
          if (role) {
            user.role = role.role;
          };

          const token = await signJwt(user);
          user.token = token;
          
          return done(null, user);
        } catch {
          return done(null, false);
        }
      }
    )
  );
};
