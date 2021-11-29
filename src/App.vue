<template>
  <div id="app">
    <ui-alert
      v-for="item in alerts"
      :key="item.key"
      :is-shown="true"
      init-timer
      :color="item.type"
      :timeout="item.timer"
      @close="closeAlert(item.key)"
    >
      {{ item.message }}
    </ui-alert>

    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "App",

  components: {
    UiAlert: () => import("@src/components/Ui/UiAlert"),
  },

  computed: {
    ...mapState({
      alerts: (state) => state.alert.alerts,
    }),
  },

  methods: {
    ...mapMutations({
      closeAlert: 'alert/closeAlert'
    }),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");
@import "~@styles/reset.css";
@import "~@styles/grid.css"; // i know it's too much for this project, but i decided to left it here so i can show how i prefer to structure my layouts
@import "~@styles/ui.scss";
@import "~@styles/helpers.scss";

.mdi {
  line-height: 1;
  display: flex;
}
</style>
