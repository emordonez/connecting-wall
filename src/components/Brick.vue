<template>
  <div 
    class="aspect-w-3 aspect-h-2 rounded-md shadow-inner select-none"
    :class="[
      { [`group-${currentGroup}`]: selected && !found },
      { 'bg-blue-300': !selected && !found },
      found ? [`group-${rowIndex} order-${rowIndex}`] : 'order-last'
    ]"
    @click="selectBrick"
  >
    <p
      class="flex justify-center items-center font-semibold text-2xl"
      :class="{ 'text-white': selected || found }"
    >
      {{ clue }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Brick',
  props: ['id', 'clue', 'groupId', 'currentGroup'],
  emits: ['clicked'],
  data () {
    return {
      selected: false,
      found: false,
      rowIndex: 0
    }
  },
  methods: {
    selectBrick () {
      if (!this.found) {
        this.selected = !this.selected
        this.$emit('clicked', this)
      }
    }
  }
}
</script>
