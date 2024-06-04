const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "\x92\x00k\xd8\x16\x06\xd3\xe7\xe8\xce";

module.exports = {
  encryptPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },

  comparePassword: async (password, savePassword) => {
    try {
      return await bcrypt.compare(password, savePassword);
    } catch (err) {
      return err;
    }
  },

  isLoggedIn: (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        res.status(200).send(req.user);
        return next();
      } else {
        return res.status(401).send("Not authenticated");
      }
    } catch (err) {
      return res.status(401).send(err);
    }
  },

  signJwt: async (user) => {
    const expiresIn = "1h";
    return await jwt.sign(user, secret, { expiresIn });
  },

  verifyJwt: async (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(404).send("A token is required");
    }

    try {
      const decoded = await jwt.verify(token, secret);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send(err);
    }
    return next();
  },
};
