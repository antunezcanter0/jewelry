import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
  theme: {
    themes: {
      light: {
        primary_gold: "#917236",
        secondary_gold: "#D79753", 
        tertiary_gold: "#EBBC55",
        strong_gold: "#1d170a", //"#413318",
      },
    }
  }
});
