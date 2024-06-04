const db = require("../databases/database");

class Kilate {
  async kilates(req, res) {
    try {
      const rows = await db.select().from("kilate");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new Kilate();