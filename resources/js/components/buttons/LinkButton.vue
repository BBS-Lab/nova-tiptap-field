<template>
  <span>
    <form
      class="tiptap-button-form rounded-lg border border-60 mb-1 p-2 z-10"
      v-show="linkMenuIsActive"
      @submit.prevent="setLinkUrl(commands.link, linkUrl)"
    >
      <input
        class="form-input form-input-bordered p-1 text-xs leading-none"
        type="text"
        v-model="linkUrl"
        placeholder="https://"
        ref="linkInput"
        @keydown.esc="hideLinkMenu"
      />
      <button
          class="btn is-close"
          @click="setLinkUrl(commands.link, null)"
          type="button"
      >
        <font-awesome-icon :icon="['fas', 'times-circle']" />
      </button>
    </form>

    <menu-button
      :active="isActive.link()"
      @click="showLinkMenu(getMarkAttrs('link'))"
    >
      <font-awesome-icon :icon="['fas', 'link']" />
    </menu-button>

    <menu-button
      :active="isActive.link()"
      @click="setLinkUrl(commands.link, null)"
    >
      <font-awesome-icon :icon="['fas', 'link']" />
    </menu-button>
  </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLink, faUnlink, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import MenuButton from './MenuButton'

library.add(faLink, faUnlink, faTimesCircle)

export default {
  props: [
    'getMarkAttrs',
    'linkMenuIsActive',
    'isActive',
    'commands',
    'linkUrl',
    'hideLinkMenu',
    'showLinkMenu',
    'setLinkUrl',
  ],

  components: {
    FontAwesomeIcon,
    MenuButton,
  },
}
</script>



