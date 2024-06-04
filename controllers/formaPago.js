const db = require("../databases/database");

class FormaPago {
  async formas_pago(req, res) {
    try {
      const rows = await db.select().from("forma_pago");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new FormaPago();
