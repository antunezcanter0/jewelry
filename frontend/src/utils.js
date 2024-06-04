module.exports = {
  get_image(img, url) {
    if (img) {
      const slice = url.slice(0, -4);
      const path = img.slice(7);
      return `${slice}/${path}`;
    }
  },

  format_price(v) {
    let val = (v / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  get_value(item, field, items) {
    const result = items.filter((i) => i.id === item[`id_${field}`]);
    return result.map((i) => i[field])[0];
  },

  get_prod_cat(item, field, producto_categoria, data) {
    const value = producto_categoria.items.filter(
      (i) => i.id == item.id_producto_categoria
    );

    const result = data.items.filter((i) => i.id == value[0][`id_${field}`]);

    if (result.length > 0) return result[0][field];
  }
};
