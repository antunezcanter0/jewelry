<template>
  <v-card tile>
    <v-parallax
      src="../../assets/background_image.png"
      gradient="to top, rgba(0,0,0,.9), rgba(0,0,0,.9)"
    >
      <v-overlay relative opacity=".95">
        <v-card color="transparent">
          <v-container grid-list-xs fluid fill-height>
            <v-layout row wrap flex align-center justify-center>
              <v-flex>
                <v-card dense outlined tile center color="transparent">
                  <v-card-title>
                    <v-icon>app_registration</v-icon>
                    {{ $t("signup") }}
                  </v-card-title>

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
                      dense
                      v-model="auth.first_name"
                      :label="`${$t('first_name')}:`"
                    ></v-text-field>

                    <v-text-field
                      dense
                      v-model="auth.last_name"
                      :label="`${$t('last_name')}:`"
                    ></v-text-field>

                    <v-text-field
                      dense
                      v-model="auth.username"
                      :label="`${$t('username')}:`"
                    ></v-text-field>

                    <v-text-field
                      dense
                      v-model="auth.email"
                      type="email"
                      :label="`${$t('email')}:`"
                    ></v-text-field>

                    <v-text-field
                      dense
                      v-model="auth.password"
                      append-icon="visibility_off"
                      type="password"
                      :label="`${$t('password')}:`"
                      @click:append="showPassword"
                    ></v-text-field>

                    <v-card-actions>
                      <v-btn block dark @click="register">{{ $t("submit") }}</v-btn>
                    </v-card-actions>

                    <v-divider></v-divider>

                    <div class="text-center">                      
                      <router-link to="/login">
                        {{ $t("have_account") }}
                      </router-link>
                    
                      {{ $t("go_to") }}
                      <router-link to="/">
                        {{ $t("home") }}
                      </router-link>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-overlay>
    </v-parallax>
  </v-card>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: "Register",

  data: () => {
    return {
      auth: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
      },
      show_password: false,
      error: { status: false, message: "" },
    };
  },

  computed: {
    ...Vuex.mapState(["app"]),
  },

  methods: {
    register() {
      const url = `${this.app.url}/auth_register`;

      axios({
        method: "POST",
        url: url,
        params: this.auth,
      })
        .then(() => {
          this.error.status = false;
          this.error.message = "";
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          this.error.status = true;
          this.error.message = err.response.data;
        });
    },

    showPassword() {
      this.show_password = !this.show_password;
      console.log(this.show_password);
    },
  },
};
</script>