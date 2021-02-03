<template>
  <span>
    <menu-button
      :active="isActive.table()"
      @click="commands.createTable({rowsCount: 2, colsCount: 2, withHeaderRow: false })"
    >
      <font-awesome-icon :icon="['fas', 'table']" />
    </menu-button>

      <span
        v-if="isActive.table()"
        class="inline-block bg-primary rounded-lg p-2 leading-none text-xs h-8 tiptap-button is-thin"
      >
          <button
              type="button"
              v-for="tableButton in tableButtons"
              :key="tableButton.title"
              class="px-2 text-white hover:underline"
              @click="tableButton.method"
              :title="tableButton.title"
              v-text="tableButton.title"
          >
          </button>
      </span>
    </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import MenuButton from './MenuButton'

library.add(faTable)

export default {
  props: ['isActive', 'commands'],

  data: function () {
    return {
      tableButtons: [
        {
          method: () => { this.commands.deleteTable() },
          title: 'delete table',
        },
        {
          method: () => { this.commands.addColumnBefore() },
          title: '+ column before',
        },
        {
          method: () => { this.commands.addColumnAfter() },
          title: '+ column after',
        },
        {
          method: () => { this.commands.deleteColumn() },
          title: 'delete column',
        },
        {
          method: () => { this.commands.addRowBefore() },
          title: '+ row before',
        },
        {
          method: () => { this.commands.addRowAfter() },
          title: '+ row after',
        },
        {
          method: () => { this.commands.deleteRow() },
          title: 'delete row',
        },
        {
          method: () => { this.commands.toggleCellMerge() },
          title: 'merge/split',
        },
      ],
    }
  },

  components: {
    FontAwesomeIcon,
    MenuButton,
  },
}
</script>
