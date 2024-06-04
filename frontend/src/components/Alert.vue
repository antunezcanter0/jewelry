<template>
  <v-alert colored-border type="info" border="left" class="mx-2 my-2">
    {{ message }}.
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: ["message"],
};
</script>