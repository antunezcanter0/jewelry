const db = require("../databases/database");

class Categoria {
  async categorias(req, res) {
    try {
      const rows = await db.select().from("categoria");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async nueva_categoria(req, res) {
    try {
      const file = req.file;

      // make sure file is available
      if (!file) {
        res.status(400).send({
          status: false,
          data: "No file is selected.",
        });
      } else {
        const data = req.query;

        const url_split = file.path.split("/");
        data.imagen = url_split.slice(-4).join("/");

        const id = await db("categoria").insert(data).returning("id");

        res.status(200).send(id);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async edita_categoria(req, res) {
    try {
      const file = req.file;
      const data = req.query;

      const id = data.id;
      delete data.id;

      if (file) {
        const url_split = file.path.split("/");
        data.imagen = url_split.slice(-4).join("/");
      }

      const rows = await db("categoria")
        .where({ id: id })
        .update(data)
        .returning("id");

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async elimina_categoria(req, res) {
    try {
      const id = req.params;
      const result = await db("categoria").del().where(id);
      res.status(200).send(id);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new Categoria();
