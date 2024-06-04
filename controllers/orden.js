const db = require("../databases/database");
const mailer = require("../utils/mailer");

module.exports = {
  ordenes: async (req, res) => {
    const rows = await db.select().from("orden").orderBy("fecha", "desc");
    res.send(rows);
  },

  nueva_orden: async (req, res) => {
    const items = req.body;
    const user = req.user;
    const data = [];
    
    const {
      id_forma_pago,
      id_estado_orden,
      entrega_domicilio,
      direccion,
    } = req.query;

    // Toma la fecha actual para componer el ID de venta
    let now = Date.now();
    let date = new Date(now);
    let Y = String(date.getFullYear());
    let M = String(date.getMonth() + 1);
    let D = String(date.getDate());

    // Busca el valor del consecutivo
    let V = await db.select("valor").from("consecutivo").where({ anno: Y });

    if (!V.length) {
      V = await db("consecutivo")
        .insert({ anno: Y, valor: 0 })
        .returning(["valor"]);
    }

    // crea el ID (id_venta)
    const valor = V[0].valor + 1;
    const id_venta = `${Y}${M}${D}${valor}`;

    try {
      for await (let item of items) {
        data.push({
          id_articulo: item.id,
          id_forma_pago: item.id_forma_pago,
          cantidad: item.cantidad,
          id_user: user.id,
          id_forma_pago: id_forma_pago,
          id_estado_orden: id_estado_orden,
          entrega_domicilio: entrega_domicilio,
          direccion: direccion,
          id_venta: id_venta,
        });
      }

      try {
        const ids = await db("orden")
          .insert(data)
          .returning(["id", "id_articulo", "id_venta"]);
        
        await db("consecutivo").where({ anno: Y }).update({ valor });

        // Envia notificacion por correo
        // y descuenta de la tabla articulo
        try {
          let text = [];

          for (let item of items) {
            const i = ids.findIndex((i) => i.id_articulo == item.id);

            text.push({
              id_articulo: ids[i].id_articulo,
              id_venta: ids[i].id_venta,
              descripcion: item.product_description,
              cantidad: item.cantidad,
              precio: item.precio,
              subtotal: item.subtotal,
              entrega_domicilio: item.entrega_domicilio,
              precio_tranporte: this.precio_tranporte,
            });

            await db("articulo")
              .where({ id: item.id })
              .update({ existencia: item.existencia - item.cantidad });
          }

          const send_mail = await mailer(user.email, text, "notification");
        } catch (err) {
          res.status(500).send(err);
        }

        res.status(200).send(ids);
      } catch (err) {
        res.status(406).send(err);
      }
    } catch (err) {
      res.status(406).send(err);
    }
  },

  mas_vendidos: async (req, res) => {
    try {
      const rows = await db("orden")
        .select("id_articulo")
        .groupBy("id_articulo")
        .count("id_articulo as count")
        .orderBy("count", "desc")
        .limit(6);

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  mis_compras: async (req, res) => {
    const id_user = req.user.id;

    try {
      const rows = await db("orden").select().orderBy("id").where({ id_user });

      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  orden: async (req, res) => {
    const params = req.query;

    try {
      const rows = await db.select().from("orden").where(params);
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  ordenes: async (req, res) => {
    try {
      const rows = await db.select().from("orden");
      res.status(200).send(rows);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
