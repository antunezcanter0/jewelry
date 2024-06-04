<template>
  <div>
    <v-form ref="form">
      <v-container grid-list-md>
        <v-subheader>Clasificación</v-subheader>

        <v-layout row wrap>
          <v-flex md4>
            <v-select
              :items="categoria.items"
              item-text="categoria"
              item-value="id"
              v-model="item.id_categoria"
              :label="`${$t('category')}:`"
              @change="productos_x_categoria"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-select
              :items="producto.items"
              item-text="producto"
              item-value="id"
              v-model="item.id_producto"
              :label="`${$t('product')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-select
              :items="proveedor.items"
              item-text="proveedor"
              item-value="id"
              v-model="item.id_proveedor"
              :label="`${$t('supplier')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <input
          type="file"
          accept="image/*"
          @change="on_select_image"
          style="display: none"
          ref="fileInput"
        />

        <v-layout row wrap>
          <v-flex md4>
            <v-card>
              <v-card-actions>
                <v-btn
                  block
                  outlined
                  color="strong_gold"
                  @click="show_upload_dialog"
                >
                  <v-icon>file_upload</v-icon>
                  {{ $t("upload_image") }}
                </v-btn>
              </v-card-actions>

              <v-card-text>
                <v-img :src="load_img()"></v-img>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-subheader>Características físicas</v-subheader>

        <v-layout row wrap>
          <v-flex md4>
            <v-select
              :items="color.items"
              item-text="color"
              item-value="id"
              v-model="item.id_color"
              :label="`${$t('color')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-select
              :items="kilate.items"
              item-text="kilate"
              item-value="id"
              v-model="item.id_kilate"
              :label="`${$t('carat')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-text-field
              type="number"
              v-model="item.peso"
              step="50"
              :label="`${$t('weight')}:`"
              suffix="g"
            ></v-text-field>
          </v-flex>

          <v-flex md4>
            <v-text-field
              type="number"
              v-model="item.largo"
              step="10"
              :label="`${$t('long')}:`"
              suffix="cm"
            ></v-text-field>
          </v-flex>

          <v-flex md4>
            <v-text-field
              type="number"
              v-model="item.ancho"
              step="5"
              :label="`${$t('wide')}:`"
              suffix="mm"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-subheader
          >{{ $t("quantities") }} {{ $t("and") }}
          {{ $t("prices") }}</v-subheader
        >

        <v-layout row wrap>
          <v-flex md3>
            <v-text-field
              type="number"
              v-model="item.existencia"
              step="50"
              :label="`${$t('available')}:`"
              :rules="[rules.isNumber]"
            ></v-text-field>
          </v-flex>

          <v-flex md3>
            <v-text-field
              type="number"
              v-model="item.precio_costo"
              step="100"
              label="Precio de costo:"
              prefix="$"
              :rules="[rules.isNumber]"
            ></v-text-field>
          </v-flex>

          <v-flex md3>
            <v-text-field
              type="number"
              v-model="item.precio_venta"
              step="100"
              label="Precio de venta:"
              prefix="$"
              :rules="[rules.isNumber]"
            ></v-text-field>
          </v-flex>

          <v-flex md3>
            <v-layout row wrap>
              <v-flex md6>
                <v-checkbox
                  v-model="item.en_oferta"
                  :label="`${$t('in_offer')}`"
                ></v-checkbox>
              </v-flex>

              <v-flex md6>
                <v-text-field
                  type="number"
                  v-if="item.en_oferta"
                  v-model="item.precio_oferta"
                  step="100"
                  :label="`${$t('price')}:`"
                  prefix="$"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex md12>
            <v-textarea
              multiple
              v-model="item.descripcion"
              :label="`${$t('description')}:`"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined tile class="strong_gold--text" @click="cancel">
          <v-icon>cancel</v-icon>
          {{ $t("cancel") }}
        </v-btn>

        <v-btn dark tile class="tertiary_gold--text" @click="edit">
          <v-icon>done</v-icon>
          {{ $t("submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
import { get_image } from "../../utils";

export default {
  name: "EditItem",

  props: ["item"],

  computed: {
    ...Vuex.mapState(["app", "rules"]),
  },

  data() {
    return {
      producto: { items: [] },
      categoria: { items: [] },
      proveedor: { items: [] },
      color: { items: [] },
      kilate: { items: [] },
      imagen: { model: "", file: "", filename: "" },
    };
  },

  created() {
    this.start();
  },

  methods: {
    get_image,

    start() {
      const url = this.app.url;

      axios.get(`${url}/categorias`).then((response) => {
        this.categoria.items = response.data;
      });

      axios
        .all([
          axios.get(`${url}/proveedores`),
          axios.get(`${url}/colores`),
          axios.get(`${url}/kilates`),
          axios.get(`${url}/productos`),
        ])
        .then((response) => {
          this.proveedor.items = response[0].data;
          this.color.items = response[1].data;
          this.kilate.items = response[2].data;
          this.producto.items = response[3].data;
        });
    },

    productos_x_categoria() {
      const url = this.app.url;

      axios
        .get(`${url}/productos_x_categoria`, {
          params: { id: this.categoria.model },
        })
        .then((response) => {
          this.producto.items = response.data;
        });
    },

    edit() {
      if (this.$refs.form.validate()) {
        const url = `${this.app.url}/articulo`;

        const data = {
          id: this.item.id,
          id_producto: this.item.id_producto,
          id_categoria: this.item.id_categoria,
          id_proveedor: this.item.id_proveedor,
          id_color: this.item.id_color,
          id_kilate: this.item.id_kilate,
          descripcion: this.item.descripcion,
          peso: parseFloat(this.item.peso).toFixed(2),
          largo: parseFloat(this.item.largo).toFixed(2),
          ancho: parseFloat(this.item.ancho).toFixed(2),
          existencia: this.item.existencia,
          en_oferta: this.item.en_oferta,
          precio_costo: parseFloat(this.item.precio_costo).toFixed(2),
          precio_venta: parseFloat(this.item.precio_venta).toFixed(2),
          precio_oferta: parseFloat(this.item.precio_oferta).toFixed(2),
          imagen: this.item.imagen,
        };

        const formData = new FormData();
        if (this.imagen.model)
          formData.append("image", this.imagen.file, this.imagen.file.name);

        axios({
          method: "put",
          url: url,
          data: this.imagen.model ? formData : null,
          params: data,
        })
          .then(() => {
            this.$refs.form.reset();
            this.$router.push({ name: "items" });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },

    cancel() {
      this.$router.push({ name: "items" });
    },

    on_select_image(event) {
      let file = event.target.files[0];
      let filename = file.name;

      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imagen.model = fileReader.result;
        this.imagen.filename = filename;
        this.imagen.file = file;
      });
      fileReader.readAsDataURL(file);
    },

    show_upload_dialog() {
      this.$refs.fileInput.click();
    },

    load_img() {
      if (this.imagen.model === "") {
        if (this.item.imagen) {
          return this.get_image(this.item.imagen, this.app.url);
        }
        return;
      } else {
        return this.imagen.model;
      }
    },
  },
};
</script>