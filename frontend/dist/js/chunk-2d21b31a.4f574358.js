(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b31a"],{bf77:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-card",{staticClass:"d-flex flex-row flex-wrap align-stretch",attrs:{flat:"",color:"grey lighten-5"}},t._l(t.articulo.items,(function(a){return e("v-col",{key:a.id,attrs:{md:"3"}},[e("v-card",{staticClass:"align-end",attrs:{outlined:""}},[e("v-img",{attrs:{height:"400",src:t.get_image(a.imagen,t.app.url)}}),e("v-list",{attrs:{dense:""}},[e("v-list-item",{attrs:{"one-line":""}},[e("v-list-item-content",[e("v-list-item-title",[a.precio_venta?e("div",[a.en_oferta?e("span",{staticClass:"font-weight-black strong_gold--text body-1"},[t._v(" $"+t._s(t.format_price(a.precio_oferta))+" ")]):t._e(),e("span",{class:a.en_oferta?"font-weight-bold text-decoration-line-through text--disabled caption":"font-weight-black strong_gold--text body-1"},[t._v(" $"+t._s(t.format_price(a.precio_venta))+" ")])]):t._e()])],1),e("v-list-item-action",[e("v-list-item-action-text",[e("v-btn",{attrs:{tile:"","x-small":"",outlined:"",label:"",disabled:""}},[e("span",{staticClass:"font-weight-black"},[t._v(t._s(a.existencia))])])],1)],1)],1),e("v-list-item",{attrs:{"three-line":""}},[e("v-list-item-content",[e("v-list-item-title",[e("span",{staticClass:"text--primary"},[t._v(" "+t._s(t.get_prod_cat(a,"producto",t.producto_categoria,t.producto))+" - "),e("span",{staticClass:"font-italic text-uppercase"},[t._v(" "+t._s(t.get_prod_cat(a,"categoria",t.producto_categoria,t.categoria))+" ")]),t._v(" ("),e("b",[t._v(t._s(t.get_value(a,"kilate",t.kilate.items))+"K")]),t._v(") ")])]),e("v-list-item-subtitle",[e("p",{staticClass:"mb-0"},[e("span",[t._v(t._s(a.descripcion))]),t._v(", "),a.id_color?e("span",[t._v(" "+t._s(t.get_value(a,"color",t.color.items)))]):t._e(),a.peso?e("span",[t._v(", "+t._s(a.peso)+"g "+t._s(t.$t("of"))+" "+t._s(t.$t("weight")))]):t._e(),a.largo?e("span",[t._v(", "+t._s(a.largo)+"cm "+t._s(t.$t("long")))]):t._e(),a.ancho?e("span",[t._v(", "+t._s(a.ancho)+"mm "+t._s(t.$t("wide")))]):t._e(),e("span",[t._v(".")])])])],1)],1)],1),e("v-card-actions",[e("v-btn",{attrs:{block:"",outlined:"",tile:"",color:"strong_gold",title:""+t.$t("add_cart")},on:{click:function(e){return t.show_dialog(a)}}},[e("v-icon",[t._v("shopping_cart")]),t._v(" "+t._s(t.$t("add_cart"))+" ")],1)],1),e("v-divider",{staticClass:"mx-4"}),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{icon:"",title:""+t.$t("want_this_article")},on:{click:function(e){return t.inc_articulo_deseado(a.id)}}},[e("v-icon",[t._v("favorite")]),t._v(" "+t._s(a.deseado)+" ")],1),e("v-btn",{attrs:{icon:""}},[e("v-icon",{attrs:{title:""+t.$t("share_this_article")}},[t._v("share")]),t._v(" "+t._s(a.compartido)+" ")],1)],1)],1)],1)})),1),"list_items"!=t.$route.name?e("div",[e("v-divider"),e("page-headers",{attrs:{text:t.$t("keep_buying")+" "+t.$t("by")+" "+t.$t("categories")}}),e("alert",{attrs:{message:""+t.$t("message3")}}),e("tab-categories")],1):t._e(),t.full_dialog_add_cart.show?e("add-cart-dialog",{attrs:{articulo:t.articulo,kilate:t.kilate,color:t.color,producto:t.producto,categoria:t.categoria,producto_categoria:t.producto_categoria}}):t._e()],1)},o=[],s=e("5530"),c=(e("c740"),e("bc3a")),r=e.n(c),l=e("2f62"),n=e("025e"),d=e("c986"),_=e("98ab"),u=e("5df8"),p=e("b2c8"),g={name:"NewItems",components:{AddCartDialog:d["a"],Alert:_["a"],PageHeaders:u["a"],TabCategories:p["a"]},data:function(){return{articulo:{items:[],model:""},kilate:{items:[]},color:{items:[]},producto:{items:[]},categoria:{items:[]},producto_categoria:{items:[]},dialog:{show:!1}}},watch:{$route:function(){this.start()}},created:function(){this.start()},computed:Object(s["a"])({},l["a"].mapState(["app","full_dialog_add_cart"])),methods:Object(s["a"])(Object(s["a"])({format_price:n["format_price"],get_image:n["get_image"],get_value:n["get_value"],get_prod_cat:n["get_prod_cat"]},l["a"].mapMutations({show_full_dialog_add_cart:"SHOW_FULL_DIALOG_ADD_CART"})),{},{start:function(){var t=this;this.show_full_dialog_add_cart(!1),r.a.get("".concat(this.app.url,"/articulos_nuevos")).then((function(a){t.articulo.items=a.data})),r.a.all([r.a.get("".concat(this.app.url,"/kilates")),r.a.get("".concat(this.app.url,"/colores")),r.a.get("".concat(this.app.url,"/productos")),r.a.get("".concat(this.app.url,"/categorias")),r.a.get("".concat(this.app.url,"/productos_categorias"))]).then((function(a){t.kilate.items=a[0].data,t.color.items=a[1].data,t.producto.items=a[2].data,t.categoria.items=a[3].data,t.producto_categoria.items=a[4].data}))},show_dialog:function(t){this.articulo.model=t,this.show_full_dialog_add_cart(!0)},inc_articulo_deseado:function(t){var a=this,e="".concat(this.app.url,"/inc_articulo_deseado");r()({method:"post",url:e,params:{id:t}}).then((function(e){var i=a.articulo.items.findIndex((function(a){return a.id==t}));-1!=i&&(a.articulo.items[i].deseado=e.data[0])}))}})},m=g,v=e("2877"),h=e("6544"),f=e.n(h),b=e("8336"),w=e("b0af"),k=e("99d9"),x=e("62ad"),$=e("ce7e"),C=e("132d"),V=e("adda"),I=e("8860"),L=e("da13"),A=e("1800"),y=e("5d23"),O=e("2fa4"),D=Object(v["a"])(m,i,o,!1,null,null,null);a["default"]=D.exports;f()(D,{VBtn:b["a"],VCard:w["a"],VCardActions:k["a"],VCol:x["a"],VDivider:$["a"],VIcon:C["a"],VImg:V["a"],VList:I["a"],VListItem:L["a"],VListItemAction:A["a"],VListItemActionText:y["a"],VListItemContent:y["b"],VListItemSubtitle:y["c"],VListItemTitle:y["d"],VSpacer:O["a"]})}}]);
//# sourceMappingURL=chunk-2d21b31a.4f574358.js.map