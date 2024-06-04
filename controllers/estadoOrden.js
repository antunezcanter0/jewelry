const db = require("../databases/database");

module.exports = {
  estados_ordenes: async (req, res) => {
    try {
      const rows = await db.select().from("estado_orden");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
