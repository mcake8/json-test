<template>
  <table class="ui-table">
    <thead class="ui-table__head title-24">
      <td
        class="ui-table__cell text-p"
        v-for="header in headersMap"
        :key="header.key"
      >
        {{ header.text }}
      </td>
    </thead>
    <tr class="ui-table__row" v-for="row in list" :key="row.id" @click="$emit('select', row.id)">
      <td
        class="ui-table__cell text-p"
        v-for="header in headersMap"
        :key="header.key"
      >
        {{ row[header.value] }}
      </td>
      <td class="ui-table__cell tar">
        <div class="ui-table__delete" @click.stop="$emit('delete', row.id)">
          <mdicon name="delete" size="16" />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "PostsTable",

  props: {
    list: {
      type: Array,
      default: () => [],
    },

    headers: {
      type: Array,
      required: true,
    },
  },

  computed: {
    headersMap() {
      return this.headers.map((i) => ({ ...i, key: Symbol() }));
    },
  },
};
</script>

<style lang="scss">
@import "~@styles/variables.scss";

.ui-table {
  width: 100%;

  &__row {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    @media (min-width: $desktop) {
      &:hover {
        background: rgba($grey, 0.1);
        color: $brandColor;
      }
    }
  }

  &__cell {
    padding: 10px;
    vertical-align: top;

    @media (min-width: $desktop) {
      vertical-align: middle;
    }
  }

  &__delete {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    transition: $transition;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $desktop) {
      &:hover {
        background: rgba($grey, 0.25);
      }
    }

    svg {
      fill: $red;
    }
  }
}
</style>
