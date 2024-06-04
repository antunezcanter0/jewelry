const db = require("../databases/database");

class Proveedor {
  async proveedores(req, res) {
    try {
      const rows = await db.select().from("proveedor");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new Proveedor();
