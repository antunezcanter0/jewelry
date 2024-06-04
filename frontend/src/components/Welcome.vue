<template>
  <div>
    <div class="big-image">
      <div class="overlay">
        <h1 class="text-center">
          {{ $t("welcome", {app_name: app.title}) }}
        </h1>

        <v-btn outlined dark tile x-large to="/start_shopping">
          {{ $t("start_shopping") }}
        </v-btn>
      </div>
    </div>

    <tab-categories></tab-categories>
  </div>
</template>

<script>
import Vuex from "vuex";
import TabCategories from "./TabCategories.vue";

export default {
  name: "Wellcome",

  components: {
    TabCategories,
  },

  computed: {
    ...Vuex.mapState(["app"])
  },

  data() {
    return {};
  },
};
</script>

<style>
.big-image {
  height: 100vh;
  width: 100vw;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
  background-image: url("../assets/background_image.png");
}

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.overlay h1 {
  font-family: Georgia;
}

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 480px) {
  .big-image .overlay h1 {
    font-size: 1.25rem;
  }

  .big-image .overlay p {
    font-size: 1rem;
  }
}

/* Smartphones (landscape) ----------- */
@media only screen and (min-width: 321px) {
  .big-image .overlay h1 {
    font-size: 1.5rem;
  }

  .big-image .overlay p {
    font-size: 1rem;
  }
}
/* Smartphones (portrait) ----------- */
@media only screen and (max-width: 320px) {
  .big-image .overlay h1 {
    font-size: 1.25rem;
  }

  .big-image .overlay p {
    font-size: 0.95rem;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .big-image .overlay h1 {
    font-size: 3rem;
  }

  .big-image .overlay p {
    font-size: 1.25rem;
  }
}
/* iPads (landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .big-image .overlay h1 {
    font-size: 3rem;
  }

  .big-image .overlay p {
    font-size: 1.25rem;
  }
}
/* iPads (portrait) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .big-image .overlay h1 {
    font-size: 2rem;
  }

  .big-image .overlay p {
    font-size: 1.25rem;
  }
}
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .big-image .overlay h1 {
    font-size: 2.5rem;
  }

  .big-image .overlay p {
    font-size: 1.75rem;
  }
}
/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  .big-image .overlay h1 {
    font-size: 3rem;
  }

  .big-image .overlay p {
    font-size: 2rem;
  }
}
/* iPhone 4 ----------- */
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  .big-image .overlay h1 {
    font-size: 2rem;
  }

  .big-image .overlay p {
    font-size: 1.25rem;
  }
}
</style>
