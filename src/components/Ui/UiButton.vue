<template>
  <component
    :is="isState"
    :class="[
      'ui-button',
      {
        'ui-button--grey': color === 'grey',
        'ui-button--blue': color === 'blue',
      },
    ]"
    :disabled="disabled || loading"
    :href="href || null"
    :to="to || null"
    :target="target || null"
    @click="handleClick"
  >
    <ui-loader
      v-if="loading"
      :color="loaderColor"
      :size="22"
      :class="slotState ? 'mr-10' : ''"
    />
    <slot />
  </component>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    target: {
      type: String,
      default: "",
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    href: {
      type: String,
      default: "",
    },

    divtag: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: "blue",
    },

    to: {
      type: [String, Object],
      default: "",
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    UiLoader: () => import("@src/components/Ui/UiLoader"),
  },

  computed: {
    loaderColor() {
      return this.color === "grey" ? "#000" : "#fff";
    },

    isState() {
      return this.href
        ? "a"
        : this.to
        ? "router-link"
        : this.divtag
        ? "div"
        : "button";
    },

    slotState() {
      return this.$slots.default;
    },
  },

  methods: {
    handleClick(event) {
      if (!this.loading) {
        this.$emit("click", event);
      } 
    },
  },
};
</script>

<style lang="scss">
@import "~@styles/mixins.scss";
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: $brandColor;
  cursor: pointer;
  user-select: none;
  transition: $transition;

  @media (min-width: $desktop) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  &[disabled] {
    cursor: default;
    pointer-events: none;
    opacity: 0.3;
  }

  &--blue {
    @media (min-width: $desktop) {
      &:hover {
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.22);
        background-color: lighten($brandColor, 10%);
      }

      &:active,
      &:focus {
        background-color: lighten($brandColor, 20%);
      }
    }
  }

  &--grey {
    background-color: $grey;
    @media (min-width: $desktop) {

      &:hover {
        background: #988686;
      }

      &:active,
      &:focus {
        background: #706060;
      }
    }
  }
}
</style>
