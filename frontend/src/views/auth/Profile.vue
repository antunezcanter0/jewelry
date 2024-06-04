<template>
  <v-card tile>
    <v-parallax
      src="../../assets/background_image.png"
      gradient="to top, rgba(0,0,0,.9), rgba(0,0,0,.9)"
    >
      <v-overlay relative opacity=".95">
        <v-card color="transparent">
          <v-card-title>
            <v-icon>person</v-icon>
            {{ $t("your_profile") }}
          </v-card-title>

          <v-container grid-list-xs fluid fill-height>
            <v-layout row wrap flex align-center justify-center>
              <v-flex>
                <v-card dense flat tile center color="transparent">
                  <v-card-text>
                    <v-text-field
                      readonly
                      v-model="profile.items.first_name"
                      :label="`${$t('first_name')}:`"
                    ></v-text-field>

                    <v-text-field
                      readonly
                      v-model="profile.items.last_name"
                      :label="`${$t('last_name')}:`"
                    ></v-text-field>

                    <v-text-field
                      readonly
                      v-model="profile.items.username"
                      :label="`${$t('username')}:`"
                    ></v-text-field>

                    <v-text-field
                      readonly
                      v-model="profile.items.email"
                      type="email"
                      :label="`${$t('email')}:`"
                    ></v-text-field>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn icon :to="$router.from">
                      <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
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
import Vuex from "vuex";
import axios from "axios";

export default {
  name: "Profile",

  data() {
    return {
      profile: {
        items: [],
      },
    };
  },

  computed: {
    ...Vuex.mapState(["app"]),
  },

  created() {
    this.start();
  },

  methods: {
    start() {
      const url = `${this.app.url}/auth_profile`;
      const user = JSON.parse(window.sessionStorage.getItem("user"));

      axios({
        method: "post",
        url: url,
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((response) => {
          this.profile.items = response.data;
          console.log(this.profile.items);
        })
        .catch((err) => {
          console.log(JSON.stringify(err.response));
          this.$router.push({ name: "login" });
        });
    },
  },
};
</script>