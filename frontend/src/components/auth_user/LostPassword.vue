
<template>
  <div>
    <v-parallax
      src="../../assets/background_image.png"
      gradient="to top, rgba(0,0,0,.9), rgba(0,0,0,.9)"
    >
      <v-overlay relative opacity=".95">
        <v-card color="transparent">
          <v-card-title>
            <v-icon>person</v-icon>
            {{ $t("lost_password") }}
          </v-card-title>

          <v-card-text>
            <v-text-field
              type="email"
              v-model="auth.email"
              :label="`${$t('email')}`"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text dark @click="send_email">{{ $t("submit") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
    </v-parallax>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "LostPassword",

  data() {
    return {
      auth: {
        email: "",
      },
    };
  },

  computed: {
    ...Vuex.mapState(["app"]),
  },

  methods: {
    send_email() {
      const url = `${this.app.url}/lost_password`;
      const url_recover = `${this.app.url_recover}/change_password`;

      axios({
        method: "get",
        url: url,
        params: { email: this.auth.email, url: url_recover },
      })
        .then(() => {
          this.$router.push({
            name: "change_password",
            params: { email: this.auth.email },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="">
</style>