<template>
  <div
    :class="[
      'ui-loader',
      {
        'ui-loader--cover': cover
      }
    ]"
  >
    <svg
      class="ui-loader__svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      :width="size + 'px'"
      :heigth="size + 'px'"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        r="35"
        stroke-dasharray="164.93361431346415 56.97787143782138"
        transform="rotate(18 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "UiLoader",
    props: {
      cover: {
        type: Boolean,
        default: false
      },

      color: {
        type: String,
        default: "#0339cf"
      },

      size: {
        type: Number,
        default: 45
      },

      stroke: {
        type: Number,
        default: 0
      }
    },

    computed: {
      strokeWidth() {
        return this.stroke || parseInt(0.25 /(this.size / 100) * 10);
      }
    }
  };
</script>

<style lang="scss">
  .ui-loader {
    display: inline-flex;
    align-items: center;
    justify-content: space-around;

    &--cover {
      position: absolute;
      display: flex;
      left: 0;
      top: 0;
      background-color: rgba(255, 255, 255, 0.4);
      right: 0;
      bottom: 0;
      z-index: 1000;
    }
  }
</style>
