<template>
  <span>
    <menu-button
      v-for="level in headingLevels"
      :key="'heading-button'+level"
      :active="isActive.heading({ level: level })"
      @click="commands.heading({ level: level })"
    >
      H{{  level  }}
    </menu-button>
  </span>
</template>

<script>
import MenuButton from './MenuButton'

export default {
  props: ['headingLevels', 'isActive', 'commands'],

  components: {
    MenuButton,
  }
}
</script>



