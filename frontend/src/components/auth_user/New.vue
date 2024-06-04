<template>
  <div>
    <v-form ref="form">
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-flex md6>
            <v-text-field
              v-model="categoria.model"
              label="Categoria:"
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
                  tile
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
                <v-img :src="imagen.model"></v-img>
              </v-card-text>
            </v-card>

            <v-textarea
              multiple
              v-model="descripcion.model"
              label="Descripción:"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile outlined color="strong_gold" @click="cancel">
          <v-icon>cancel</v-icon>
          Cancelar
        </v-btn>

        <v-btn dark tile class="tertiary_gold--text" @click="insert">
          <v-icon>done</v-icon>
          Aceptar
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
  name: "NewUser",

  computed: {
    ...Vuex.mapState(["app", "rules"]),
  },

  data() {
    return {
      categoria: { items: [], model: "" },
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
    },

    insert() {
      if (this.$refs.form.validate()) {
        const url = `${this.app.url}/categoria`;

        const data = {
          categoria: this.categoria.model,
          descripcion: this.descripcion.model,
        };

        if ( this.imagen.file == "" ) {
          alert("Debe subir una imagen.")
          return;
        }

        const formData = new FormData();
        formData.append("image", this.imagen.file, this.imagen.file.name);

        axios
          .post(url, formData, { params: data })
          .then(() => {
            this.snackbar = true;
          })
          .catch((err) => {
            console.log(JSON.stringify(err.response));
          });
      }
    },

    cancel() {
      this.$refs.form.reset();
      this.imagen.model = null;
      this.$router.push({ name: "categories" });
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