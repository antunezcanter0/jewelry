<template lang="">
    <div>
        <v-parallax
      src="../../assets/background_image.png"
      gradient="to top, rgba(0,0,0,.9), rgba(0,0,0,.9)"
    >
      <v-overlay relative opacity=".95">
        <v-card color="transparent">
          <v-card-title>
            <v-icon>login</v-icon>
            {{ $t("change_password") }}
          </v-card-title>

          <v-container grid-list-xs fluid fill-height>
            <v-layout row wrap flex justify-center>
              <v-flex>
                <v-card dark center outlined color="transparent">
                  <v-alert
                    outlined
                    dismissible
                    border="left"
                    type="error"
                    v-model="error.status"
                  >
                    {{ error.message }}
                  </v-alert>

                  <v-card-text>
                    <v-text-field
                      prepend-icon="person"
                      v-model="email"
                      type="email"
                      :label="`${$t('email')}:`"
                      disabled
                    ></v-text-field>

                    <v-text-field
                      prepend-icon="lock"
                      append-icon="visibility_off"
                      v-model="auth.password"
                      type="password"
                      :label="`${$t('password')}:`"
                    ></v-text-field>

                    <v-text-field
                      prepend-icon="lock"
                      append-icon="visibility_off"
                      v-model="auth.new_password"
                      type="password"
                      :label="`${$t('new_password')}:`"
                    ></v-text-field>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text dark @click="change_password">{{ $t("submit") }}</v-btn>
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-overlay>
    </v-parallax>
    </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "ChangePassword",

  props: ["email"],

  data() {
    return {
      auth: {
        password: "",
        new_password: "",
      },
      error: { status: false, message: "" },
    };
  },

  computed: {
    ...Vuex.mapState(["app"])
  },

  methods: {
    change_password() {
      const email = this.email;
      const url = `${this.app.url}/change_password/${email}`;

      axios({
        method: "put",
        url: url,
        params: this.auth
      })
      .then((response) => {
        this.error.status = false;
        this.error.message = "";
        alert(this.$t("password_changed", {user: response.data[0]}))
      })
      .catch((error) => {
        this.error.status = true;
        this.error.message = error.response.data;
      });
    },
  },
};
</script>

<style lang="">
</style>