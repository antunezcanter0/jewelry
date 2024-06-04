<template>
  <v-app>
    <v-app-bar
      dark
      flat
      :absolute="bar_absolute"
      :app="bar_app"
      :color="bar_color"
      id="app"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top, rgba(0,0,0,.5), rgba(0,0,0,.99)"
        ></v-img>
      </template>

      <v-btn icon @click="show_nav_drawer(!navigation_drawer.show)">
        <v-icon color="tertiary_gold">menu</v-icon>
      </v-btn>

      <v-app-bar-title
        class="tertiary_gold--text font-italic"
        style="font-family: Georgia"
      >
        {{ app.title }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <span v-if="!$vuetify.breakpoint.xsOnly">
        <v-btn icon @click="search = !search">
          <v-icon color="tertiary_gold">{{
            !search ? "search" : "close"
          }}</v-icon>
        </v-btn>

        <v-menu offset-y :nudge-width="200">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon v-bind="attrs" v-on="on">
              <flag :iso="langs.model.name"></flag>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <flag :iso="langs.model.name"></flag>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ langs.model.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <template v-for="(item, i) in langs.items">
                <v-list-item :key="i" @click="setLocale(item)">
                  <v-list-item-icon>
                    <flag :iso="item.name"></flag>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-menu>
      </span>

      <!-- Only Mobile -->
      <v-menu
        offset-y
        :close-on-content-click="false"
        v-if="$vuetify.breakpoint.xsOnly"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn small fab text color="tertiary_gold" v-bind="attrs" v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="search = !search">
            <v-list-item-icon>
              <v-icon>search</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t("search") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-group :value="false" no-action>
            <template v-slot:activator>
              <v-list-item-icon>
                <flag :iso="langs.model.name"></flag>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ $t("language") }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-for="(item, i) in langs.items">
              <v-list-item :key="i" @click="setLocale(item)">
                <v-list-item-icon>
                  <flag :iso="item.name"></flag>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </v-menu>

      <template>
        <v-menu v-if="auth_user.isAuthenticated" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text icon v-bind="attrs" v-on="on">
              <v-icon x-large color="tertiary_gold">account_circle</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-text>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon large color="strong_gold"> account_circle </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ auth_user.user.email }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <template v-for="(item, key) in auth_user.user">
                  <v-list-item
                    :key="key"
                    v-if="
                      ![
                        'token',
                        'password',
                        'id',
                        'role',
                        'iat',
                        'exp',
                        'email',
                      ].includes(key)
                    "
                  >
                    <v-list-item-content>
                      <v-list-item-title> {{ $t(key) }}: </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      {{ item }}
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="text-center">
              <v-btn block tile dark class="tertiary_gold--text">
                {{ $t("logout") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-btn
          icon
          v-else
          :title="`${$t('login')}`"
          @click="$router.push('/login')"
        >
          <v-icon color="tertiary_gold">person</v-icon>
        </v-btn>
      </template>

      <!-- <botton-sheet-admin></botton-sheet-admin> -->

      <template>
        <v-btn
          icon
          v-if="auth_user.user && auth_user.user.role == 'admin'"
          @click="show_nav_drawer_admin(!navigation_drawer_admin.show)"
        >
          <v-icon color="tertiary_gold">build</v-icon>
        </v-btn>
      </template>

      <!-- <v-badge
        overlap
        bordered
        right
        :content="cart.items.length || '0'"
        color="error darken-2"
      >
        <v-btn fab x-small outlined color="tertiary_gold" to="/cart">
          <v-icon dark>shopping_cart</v-icon>
        </v-btn>
      </v-badge> -->

      <template v-slot:extension v-if="search">
        <v-spacer></v-spacer>
        <Autocomplete></Autocomplete>
        <v-spacer></v-spacer>
      </template>
    </v-app-bar>

    <navigation-drawer></navigation-drawer>
    <navigation-drawer-admin></navigation-drawer-admin>

    <v-fab-transition>
      <v-btn color="strong_gold" dark fixed bottom right fab to="/cart">
        <v-icon color="tertiary_gold">shopping_cart</v-icon>
        {{ cart.items.length > 0 ? cart.items.length : null }}
      </v-btn>
    </v-fab-transition>

    <v-main>
      <slide-views></slide-views>
      <!-- <breadcrumbs></breadcrumbs> -->
      <page-headers></page-headers>
      <router-view />
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Vuex from "vuex";
import Autocomplete from "@/components/Autocomplete.vue";
// import Breadcrumbs from "./components/Breadcrumbs.vue";
import SlideViews from "./components/SlideViews.vue";
import PageHeaders from "./components/PageHeaders.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";
import Footer from "./components/Footer.vue";
// import BottonSheetAdmin from "./components/BottonSheetAdmin.vue";
import NavigationDrawerAdmin from "./components/NavigationDrawerAdmin.vue";

export default {
  name: "App",

  components: {
    Autocomplete,
    // Breadcrumbs,
    SlideViews,
    PageHeaders,
    NavigationDrawer,
    Footer,
    // BottonSheetAdmin,
    NavigationDrawerAdmin,
  },

  data() {
    return {
      langs: {
        items: [
          { name: "es", title: "Spanish" },
          { name: "us", title: "English" },
        ],
        model: { name: "es", title: "Spanish" },
      },
      src: require("@/assets/background_image.png"),
      scroll_position: null,
      bar_app: false,
      bar_absolute: true,
      bar_color: "transparent",
      search: false,
      breadcrumbs_items: [],
    };
  },

  computed: {
    ...Vuex.mapState([
      "app",
      "cart",
      "navigation_drawer",
      "navigation_drawer_admin",
      "page_before_login",
      "auth_user",
    ]),
  },

  watch: {
    $route(to, from) {
      this.start();
      this.update_scroll();
      this.update_last_page(to, from);
    },
  },

  mounted() {
    window.addEventListener("scroll", this.update_scroll);
    this.get_token_status();
  },

  created() {
    this.start();
    this.update_scroll();
    this.update_app_states();
  },

  methods: {
    ...Vuex.mapActions(["update_cart", "get_token_status"]),
    ...Vuex.mapMutations({
      show_nav_drawer: "SHOW_NAV_DRAWER",
      show_nav_drawer_admin: "SHOW_NAV_DRAWER_ADMIN",
      update_page_before_login: "UPDATE_PAGE_BEFORE_LOGIN",
      update_app_states: "UPDATE_APP_STATES",
    }),

    setLocale(item) {
      this.$i18n.locale = item.name;
      this.langs.model = item;

      sessionStorage.lang = JSON.stringify(item);
    },

    start() {
      const lang = sessionStorage.lang;

      if (lang) {
        const slang = JSON.parse(lang);
        this.$i18n.locale = slang.name;
        this.langs.model = slang;
      }

      const cart = sessionStorage.cart;

      if (cart) {
        const items = JSON.parse(cart);
        for (let item of items) {
          this.update_cart(item);
        }
      }
    },

    update_scroll() {
      this.scroll_position = window.scrollY;
      if (this.scroll_position > 100 || this.$route.name != "home") {
        this.bar_app = true;
        this.bar_absolute = false;
        this.bar_color = "primary_gold";
      } else if (this.scroll_position < 100 && this.$route.name == "home") {
        this.bar_app = false;
        this.bar_absolute = true;
        this.bar_color = "transparent";
      }
    },

    update_last_page(to, from) {
      if (to.name == "login" && from.name != "register") {
        this.update_page_before_login(from.name);
      }
    },
  },
};
</script>