<template>
  <div>
    <v-form ref="form">
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-flex md6>
            <v-text-field
              v-model="item.producto"
              label="Producto:"
              :rules="[rules.isRequired]"
            ></v-text-field>

            <input
              type="file"
              accept="image/*"
              @change="on_select_image"
              style="display: none"
              ref="fileInput"
            />

            <v-card>
              <v-card-actions>
                <v-btn
                  block
                  tile
                  outlined
                  color="strong_gold"
                  @click="show_upload_dialog"
                >
                  <v-icon>file_upload</v-icon>
                  {{ $t("upload_image") }}
                </v-btn>
              </v-card-actions>

              <v-card-text>
                <v-img :src="get_image"></v-img>
              </v-card-text>
            </v-card>

            <v-textarea
              multiple
              v-model="item.descripcion"
              label="Descripción:"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile outlined color="strong_gold" @click="cancel">
          <v-icon>cancel</v-icon>
          {{ $t("cancel") }}
        </v-btn>

        <v-btn dark tile class="tertiary_gold--text" @click="edit">
          <v-icon>done</v-icon>
          {{ $t("submit") }}
        </v-btn>
      </v-card-actions>
    </v-form>

    <v-snackbar bottom left dark v-model="snackbar">
      {{ $t("record_edited") }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "EditaProducto",

  props: ["item"],

  computed: {
    ...Vuex.mapState(["app", "rules"]),

    get_image() {
      if (this.imagen.model === "") {
        if (this.item.imagen) {
          const url = this.app.url.slice(0, -4);
          const image_path = this.item.imagen.slice(7);
          return `${url}/${image_path}`;
        }
        return;
      } else {
        return this.imagen.model;
      }
    },
  },

  data() {
    return {
      producto: { items: [], model: "" },
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

      axios.get(`${url}/productos`).then((response) => {
        this.producto.items = response.data;
      });
    },

    edit() {
      if (this.$refs.form.validate()) {
        const url = `${this.app.url}/producto`;

        const data = {
          id: this.item.id,
          producto: this.item.producto,
          descripcion: this.item.descripcion,
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
            this.snackbar = true;
            this.$refs.form.reset();
            this.$router.push({ name: "products" });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },

    cancel() {
      this.$refs.form.reset();
      this.$router.push({ name: "products" });
    },

    on_select_image(event) {
      const file = event.target.files[0];
      const filename = file.name;

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