<template>
  <button
    type="button"
    class="btn btn-default p-2 leading-none text-xs min-w-8 h-8 tiptap-button"
    :class="[(active ? 'btn-primary' : 'bg-30 hover:bg-primary-dark hover:text-white')]"
    @click="click"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['active'],

  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
