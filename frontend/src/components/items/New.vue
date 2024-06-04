<template>
  <div>
    <v-form ref="form">
      <v-container grid-list-md>
        <v-subheader>{{ $t("classification") }}</v-subheader>

        <v-layout row wrap>
          <v-flex md4>
            <v-select
              :items="categoria.items"
              item-text="categoria"
              item-value="id"
              v-model="categoria.model"
              :label="`${$t('category')}:`"
              @change="productos_categoria"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-select
              :items="producto.items"
              item-text="producto"
              item-value="id"
              v-model="producto.model"
              :label="`${$t('product')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-select
              :items="proveedor.items"
              item-text="proveedor"
              item-value="id"
              v-model="proveedor.model"
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
                  tile
                  color="strong_gold"
                  @click="show_upload_dialog"
                >
                  <v-icon>file_upload</v-icon>
                  {{ $t("upload_image") }}
                </v-btn>
              </v-card-actions>

              <v-card-text>
                <v-img :src="imagen.model"></v-img>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-subheader>{{ $t("features") }}</v-subheader>

        <v-layout row wrap>
          <v-flex md4>
            <v-select
              :items="color.items"
              item-text="color"
              item-value="id"
              v-model="color.model"
              :label="`${$t('color')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-select
              :items="kilate.items"
              item-text="kilate"
              item-value="id"
              v-model="kilate.model"
              :label="`${$t('carat')}:`"
              :rules="[rules.isRequired]"
            ></v-select>
          </v-flex>

          <v-flex md4>
            <v-text-field
              type="number"
              v-model="peso.model"
              step="50"
              :label="`${$t('weight')}:`"
              suffix="g"
            ></v-text-field>
          </v-flex>

          <v-flex md4>
            <v-text-field
              type="number"
              v-model="largo.model"
              step="10"
              :label="`${$t('long')}:`"
              suffix="cm"
            ></v-text-field>
          </v-flex>

          <v-flex md4>
            <v-text-field
              type="number"
              v-model="ancho.model"
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
              v-model="existencia.model"
              step="50"
              :label="`${$t('available')}:`"
              :rules="[rules.isNumber]"
            ></v-text-field>
          </v-flex>

          <v-flex md3>
            <v-text-field
              type="number"
              v-model="precio_costo.model"
              step="100"
              label="Precio de costo:"
              prefix="$"
              :rules="[rules.isNumber]"
            ></v-text-field>
          </v-flex>

          <v-flex md3>
            <v-text-field
              type="number"
              v-model="precio_venta.model"
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
                  v-model="en_oferta.model"
                  :label="`${$t('in_offer')}`"
                ></v-checkbox>
              </v-flex>

              <v-flex md6>
                <v-text-field
                  type="number"
                  v-if="en_oferta.model"
                  v-model="precio_oferta.model"
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
              v-model="descripcion.model"
              :label="`${$t('description')}:`"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark outlined tile class="strong_gold--text" @click="cancel">
          <v-icon>cancel</v-icon>
          {{ $t("cancel") }}
        </v-btn>

        <v-btn dark tile class="tertiary_gold--text" @click="insert">
          <v-icon>done</v-icon>
          {{ $t("submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>

    <v-snackbar bottom left dark v-model="snackbar" class="tertiary_gold--text">
      {{ $t("record_inserted") }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "NewItem",

  computed: {
    ...Vuex.mapState(["app", "rules"]),
  },

  data() {
    return {
      producto: { items: [], model: "" },
      categoria: { items: [], model: "" },
      proveedor: { items: [], model: "" },
      color: { items: [], model: "" },
      kilate: { items: [], model: "" },
      peso: { model: 0 },
      ancho: { model: 0 },
      largo: { model: 0 },
      existencia: { model: 0 },
      precio_costo: { model: 0 },
      precio_venta: { model: 0 },
      en_oferta: { model: false },
      precio_oferta: { model: 0 },
      descripcion: { model: "" },
      imagen: { model: "", file: "", filename: "" },
      snackbar: false,
    };
  },

  created() {
    this.start();
  },

  methods: {
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

    productos_categoria() {
      const url = this.app.url;

      axios
        .get(`${url}/productos_categoria`, {
          params: { id: this.categoria.model },
        })
        .then((response) => {
          this.producto.items = response.data;
        });
    },

    insert() {
      if (this.$refs.form.validate()) {
        const url = `${this.app.url}/articulo`;

        const data = {
          id_producto: this.producto.model,
          id_categoria: this.categoria.model,
          id_proveedor: this.proveedor.model,
          id_color: this.color.model,
          id_kilate: this.kilate.model,
          descripcion: this.descripcion.model,
          peso: parseFloat(this.peso.model).toFixed(2),
          largo: parseFloat(this.largo.model).toFixed(2),
          ancho: parseFloat(this.ancho.model).toFixed(2),
          existencia: this.existencia.model,
          en_oferta: this.en_oferta.model,
          precio_costo: parseFloat(this.precio_costo.model).toFixed(2),
          precio_venta: parseFloat(this.precio_venta.model).toFixed(2),
          precio_oferta: parseFloat(this.precio_oferta.model).toFixed(2),
        };

        const formData = new FormData();
        formData.append("image", this.imagen.file, this.imagen.file.name);

        axios
          .post(url, formData, { params: data })
          .then(() => {
            this.snackbar = true;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },

    cancel() {
      this.$refs.form.reset();
      this.imagen.model = null;
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
  },
};
</script>