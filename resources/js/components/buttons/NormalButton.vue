<template>
  <menu-button
    :active="isActive[buttonKey]()"
    :class="`is-${buttonKey}`"
    @click="commands[buttonKey]"
  >
    <font-awesome-icon v-if="buttonKey == 'bullet_list'" :icon="['fas', 'list-ul']" />
    <font-awesome-icon v-if="buttonKey == 'ordered_list'" :icon="['fas', 'list-ol']" />
    <font-awesome-icon v-if="buttonKey == 'blockquote'" :icon="['fas', 'quote-right']" />
    <font-awesome-icon v-if="buttonKey == 'edit_html'" :icon="['fas', 'file-code']" />

    <span v-if="buttonKey == 'superscript'">
      x<small><sup>2</sup></small>
    </span>

    <span v-if="buttonKey == 'subscript'">
      x<small><sub>2</sub></small>
    </span>
  </menu-button>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCode, faListUl, faListOl, faQuoteRight, faFileCode} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import MenuButton from './MenuButton'

library.add(faCode, faListUl, faListOl, faQuoteRight, faFileCode)

export default {
  props: ['buttonKey', 'isActive', 'commands'],

  components: {
    FontAwesomeIcon,
    MenuButton
  },
}
</script>
