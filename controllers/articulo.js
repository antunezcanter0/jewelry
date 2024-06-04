const db = require("../databases/database");

class Articulo {
  async articulos(req, res) {
    try {
      const rows = await db
        .select(
          "articulo.id",
          "producto_categoria.id_categoria",
          "producto_categoria.id_producto",
          "articulo.id_proveedor",
          "articulo.id_color",
          "articulo.id_kilate",
          "categoria.categoria",
          "producto.producto",
          "articulo.descripcion",
          "proveedor.proveedor",
          "color.color",
          "kilate.kilate",
          "articulo.peso",
          "articulo.largo",
          "articulo.ancho",
          "articulo.imagen",
          "articulo.existencia",
          "articulo.en_oferta",
          "articulo.precio_costo",
          "articulo.precio_venta",
          "articulo.precio_oferta",
          "articulo.activo"
        )
        .from("articulo")
        .orderBy("articulo.id")
        .join("producto_categoria", {
          "producto_categoria.id": "articulo.id_producto_categoria",
        })
        .join("producto", { "producto.id": "producto_categoria.id_producto" })
        .join("categoria", {
          "categoria.id": "producto_categoria.id_categoria",
        })
        .join("proveedor", { "proveedor.id": "articulo.id_proveedor" })
        .join("color", { "color.id": "articulo.id_color" })
        .join("kilate", { "kilate.id": "articulo.id_kilate" });

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async articulo(req, res) {
    try {
      const params = req.query;
      const rows = await db.select().from("articulo").where(params).first();

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }    
  }

  async nuevo_articulo(req, res) {
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
        const { id_producto, id_categoria } = data;

        const producto_categoria = await db
          .select("id")
          .from("producto_categoria")
          .where({ id_producto, id_categoria });

        if (!producto_categoria) {
          res.status(401).send("Error in query");
        } else {
          delete data.id_producto;
          delete data.id_categoria;

          data.id_producto_categoria = producto_categoria[0].id;

          const url_split = file.path.split("/");
          data.imagen = url_split.slice(-4).join("/");

          const id = await db("articulo").insert(data).returning("id");

          res.status(200).send(id);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async edita_articulo(req, res) {
    try {
      const file = req.file;
      const data = req.query;
      const { id_producto, id_categoria } = data;

      const producto_categoria = await db
        .select("id")
        .from("producto_categoria")
        .where({ id_producto, id_categoria });

      if (!producto_categoria) {
        res.send({ status: 401, error: "Error in query" });
      } else {
        const id = data.id;

        delete data.id_producto;
        delete data.id_categoria;
        delete data.id;

        data.id_producto_categoria = producto_categoria[0].id;
        
        if (file) {
          const url_split = file.path.split("/");
          data.imagen = url_split.slice(-4).join("/");
        }

        const result = await db("articulo")
          .where({ id: id })
          .update(data)
          .returning("id");

        res.status(200).send(result);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async elimina_articulo(req, res) {
    try {
      const id = req.params;
      const result = await db("articulo").del().where(id);
      res.status(200).send(id);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async articulo_x_producto(req, res) {
    try {
      const params = req.query;
      const rows = await db.select().from("articulo").where(params);

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async suma_articulos(req, res) {
    try {
      const params = req.query;
      const rows = await db("articulo")
        .select()
        .where(params)
        .sum("existencia");

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async articulos_en_oferta(req, res) {
    try {
      const params = { en_oferta: true };
      const rows = await db("articulo").select().where(params);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async articulos_mas_deseados(req, res) {
    try {
      const rows = await db("articulo")
        .select()
        .where("deseado", ">", 0)
        .orderBy("deseado", "desc")
        .limit(6);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async articulos_nuevos(req, res) {
    try {
      const rows = await db("articulo")
        .select()
        .orderBy("fecha", "desc")
        .limit(6);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async inc_articulo_deseado(req, res) {
    try {
      const params = req.query;
      const row = await db("articulo").select("deseado").where(params).first();
      row.deseado++;

      const result = await db("articulo")
        .where(params)
        .update(row)
        .returning("deseado");

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async articulos_en(req, res) {
    try {
      const params = req.query.data;
      const rows = await db("articulo").select().whereIn("id", params);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new Articulo();
