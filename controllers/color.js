const db = require("../databases/database");

class Color {
  async colores(req, res) {
    try {
      const rows = await db.select().from("color");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new Color();
