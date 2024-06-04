const db = require("../databases/database");

class ProductoCategoria {
  async productos_categorias(req, res) {
    try {
      const rows = await db.select().from("producto_categoria");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async productos_x_categoria(req, res) {
    try {
      const params = req.query;

      const rows = await db
        .select(
          "producto_categoria.id",
          "producto_categoria.id_producto",
          "producto.producto",
          "producto.imagen",
          "producto.descripcion"
        )
        .from("producto_categoria")
        .where({ id_categoria: params.id })
        .join("producto", { "producto.id": "producto_categoria.id_producto" });

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new ProductoCategoria();
