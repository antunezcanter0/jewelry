<template>
  <v-card tile>
    <v-parallax
      src="../../assets/background_image.png"
      gradient="to top, rgba(0,0,0,.9), rgba(0,0,0,.9)"
    >
      <v-overlay relative opacity=".95">
        <v-card color="transparent">
          <v-card-title>
            <v-icon>login</v-icon>
            {{ $t("login") }}
          </v-card-title>

          <v-container grid-list-xs fluid fill-height>
            <v-layout row wrap justify-center>
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
                      v-model="auth.email"
                      type="email"
                      :label="`${$t('email')}:`"
                    ></v-text-field>

                    <v-text-field
                      prepend-icon="lock"
                      append-icon="visibility_off"
                      v-model="auth.password"
                      type="password"
                      :label="`${$t('password')}:`"
                    ></v-text-field>

                    <v-card-actions>
                      <v-btn block dark @click="login">{{
                        $t("submit")
                      }}</v-btn>
                    </v-card-actions>

                    <v-divider></v-divider>

                    <div class="text-center">
                      <router-link to="/lost_password">
                        {{ $t("lost_password") }}
                      </router-link>
                    </div>

                    <div class="text-center">
                      <router-link to="/register">
                        {{ $t("need_account") }}
                      </router-link>

                      {{ $t("go_to") }}
                      <router-link to="/">
                        {{ $t("home") }}
                      </router-link>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- <v-facebook-login app-id="1321403298276761"></v-facebook-login> -->
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
// import VFacebookLogin from "vue-facebook-login-component";

export default {
  name: "Login",

  components: {
    // VFacebookLogin,
  },

  data: () => {
    return {
      auth: {
        email: "",
        password: "",
      },
      error: { status: false, message: "" },
    };
  },

  computed: {
    ...Vuex.mapState(["app", "page_before_login"]),
  },

  methods: {
    ...Vuex.mapMutations({ update_user_status: "UPDATE_USER_STATUS" }),

    login() {
      const url = `${this.app.url}/auth_login`;

      axios({
        method: "POST",
        url: url,
        data: this.auth,
      })
        .then((response) => {
          const user = response.data;
          const isAuthenticated = true;

          this.update_user_status({ isAuthenticated, user });

          this.error.status = false;
          this.error.message = "";

          this.$router.back();
        })
        .catch(() => {
          const user = null;
          const isAuthenticated = false;

          this.update_user_status({ isAuthenticated, user });

          this.error.status = true;
          this.error.message = this.$t("invalid_login");
          this.auth.password = "";
        });
    },

    auth0_login() {
      this.$auth.loginWithRedirect();
    },

    // Log the user out
    auth0_logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>