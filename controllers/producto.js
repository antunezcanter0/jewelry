const db = require("../databases/database");

class Producto {
  async productos(req, res) {
    try {
      const rows = await db.select().from("producto").orderBy("producto");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async producto(req, res) {
    try {
      const params = req.query;

      const rows = await db
        .select()
        .from("producto")
        .where(params)
        .orderBy("producto");

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async nuevo_producto(req, res) {
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

        const id = await db("producto").insert(data).returning("id");

        res.status(200).send(id);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async edita_producto(req, res) {
    try {
      const file = req.file;
      const data = req.query;

      const id = data.id;
      delete data.id;

      if (file) {
        const url_split = file.path.split("/");
        data.imagen = url_split.slice(-4).join("/");
      }

      const result = await db("producto")
        .where({ id: id })
        .update(data)
        .returning("id");

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async elimina_producto(req, res) {
    try {
      const id = req.params;
      const result = await db("producto").del().where(id);
      res.status(200).send(id);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new Producto();
