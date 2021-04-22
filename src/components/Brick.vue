<template>
  <div
    ref="box"
    class="aspect-w-16 aspect-h-9 rounded-md select-none transition-transform duration-1000"
    :class="[
      { [`group-${currentGroup}`]: selected && !found },
      { 'bg-blue-200': !selected && !found },
      found ? [`group-${rowIndex} order-${rowIndex}`] : 'order-last'
    ]"
    @click="selectBrick"
  >
    <p
      class="flex justify-center items-center font-semibold"
      :class="{ 'text-white': selected || found }"
      :style="{ fontSize: fontSize }"
    >
      {{ clue }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Brick',
  props: ['clue', 'groupId', 'currentGroup'],
  emits: ['clicked'],
  data () {
    return {
      fontSize: '',
      selected: false,
      found: false,
      rowIndex: 0
    }
  },
  mounted () {
    this.initObserver()
  },
  beforeUnmount () {
    if (this.observer) {
      this.observer.unobserve(this.$refs.box)
    }
  },
  methods: {
    initObserver () {
      const observer = new ResizeObserver(this.onResize)
      observer.observe(this.$refs.box)
      this.observer = observer
    },
    onResize() {
      const width = this.$refs.box.offsetWidth
      const fontSize = (width / 12) + 'pt'

      this.fontSize = fontSize
      this.$emit('resize', fontSize)
    },
    selectBrick () {
      if (!this.found) {
        this.selected = !this.selected
        this.$emit('clicked', this)
      }
    }
  }
}
</script>
