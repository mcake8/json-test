<template>
  <div
    :class="[
      'ui-input',
      {
        'ui-input--textarea': type === 'textarea',
      },
    ]"
  >
    <div class="text-p mb-5" v-if="label">
      {{label}}
    </div>

    <textarea
      v-if="type == 'textarea'"
      class="ui-input__input ui-input__input--textarea"
      :class="{ 'ui-input__input--error': error }"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      :value="value"
      :disabled="disabled"
    ></textarea>

    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      name="ui-input"
      :value="value"
      class="ui-input__input"
      :class="{ 'ui-input__input--error': error }"
      @input="$emit('input', $event.target.value)"
       @blur="$emit('blur')"
      :disabled="disabled"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<script>
export default {
  name: "UiInput",
  props: {
    type: {
      type: String,
      default: "text",
    },

    label: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: "",
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    error: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
      default: "",
    },

    autocomplete: {
      type: String,
      default: "off",
    },
  },
};
</script>

<style lang="scss">
@import "~@styles/variables.scss";
.ui-input {
  width: 100%;
  max-width: 280px;

  &__input {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid $grey;
    border-radius: 8px;
    font: inherit;
    font-size: 16px;
    padding: 0 15px;
    line-height: 22px;
    outline: none;

    &--error {
      border-color: $red;
      color: $red;
    }

    &:focus,
    &:active {
      border-color: $brandColor;
      color: #000;
    }

    &[disabled] {
      cursor: default;
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &--textarea {
    max-width: 500px;

    .ui-input__input {
      height: 200px;
      resize: none;
      padding: 20px;
    }
  }
}
</style>
