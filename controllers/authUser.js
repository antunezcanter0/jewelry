const db = require("../databases/database");
const passport = require("passport");
const { encryptPassword, comparePassword } = require("../utils/helpers");
const mailer = require("../utils/mailer");

class AuthUser {
  async users(req, res) {
    try {
      const rows = await db.select().from("auth_user");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async register(req, res) {
    try {
      const params = req.query;
      const pwd = params.password;
      const password = await encryptPassword(pwd);
      params.password = password;

      try {
        const user = await db("auth_user")
          .insert(params)
          .returning(["id", "username"]);
        res.status(200).send(user[0]);
      } catch (err) {
        res.status(500).send(err.detail);
      }
    } catch (err) {
      res.status(401).send(err);
    }
  }

  login = passport.authenticate("local-login");

  profile(req, res) {
    if (!req.user) {
      res.status(401).send("Unauthorized");
    } else {
      res.status(200).send(req.user);
    }
  }

  user(req, res) {
    try {
      const user = req.user;
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async lost_password(req, res) {
    try {
      const email = req.query.email;
      const url = req.query.url;
      const send_mail = await mailer(email, url, "password");
      res.status(200).send(send_mail);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async change_password(req, res) {
    try {
      const params = req.params;
      const query = req.query;

      const user = await db.select().from("auth_user").where(params).first();

      if (!user) {
        res.status(500).res("Not exist");
      }

      const password_is_valid = await comparePassword(
        query.password,
        user.password
      );
      if (!password_is_valid) {
        res.status(500).send("Incorrect password");
      }

      const password = await encryptPassword(query.new_password);

      try {
        const result = await db("auth_user")
          .where({ id: user.id })
          .update({ password })
          .returning("first_name");
        res.status(200).send(result);
      } catch (err) {
        res.status(500).send(err);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async groups(req, res) {
    console.log("auth_groups")
    try {
      const rows = await db.select().from("auth_group");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new AuthUser();
