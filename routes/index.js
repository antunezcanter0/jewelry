const home = require("./home"); 
const authUser = require("./authUser");
const categoria = require("./categoria");
const producto = require("./producto");
const productoCategoria = require("./productoCategoria");
const articulo = require("./articulo");
const proveedor = require("./proveedor");
const color = require("./color");
const kilate = require("./kilate");
const orden = require("./orden");
const formaPago = require("./formaPago");
const estadoOrden = require("./estadoOrden");


module.exports = (app) => {
  app.use(home);
  app.use(authUser);
  app.use(categoria);
  app.use(producto);
  app.use(productoCategoria);
  app.use(articulo);
  app.use(proveedor);
  app.use(color);
  app.use(kilate);
  app.use(orden);
  app.use(formaPago);
  app.use(estadoOrden);
}