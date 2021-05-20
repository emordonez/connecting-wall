<template>
  <div
    ref="box"
    class="aspect-w-5 aspect-h-2 rounded-md select-none transition-transform duration-1000
      sm:aspect-w-16 sm:aspect-h-9"
    :class="[
      { [`${classes.selected[currentGroup]}`]: selected && !found, 'bg-blue-200': !selected && !found },
      found ? classes.found[groupIndex] : 'order-last'
    ]"
    @click="selectBrick"
  >
    <p
      class="flex justify-center items-center font-medium"
      :class="{ 'text-white': selected || found }"
      :style="{ fontSize: fontSize }"
    >
      {{ clue }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    clue: String,
    groupId: Number,
    connection: String,
    currentGroup: Number,
    outOfTime: Boolean
  },
  emits: ['clicked', 'resize'],
  data () {
    return {
      fontSize: '',
      selected: false,
      found: false,
      groupIndex: 0,
      classes: {
        found: {
          1: 'group-1 order-1',
          2: 'group-2 order-2',
          3: 'group-3 order-3',
          4: 'group-4 order-4',
        },
        selected: {
          1: 'group-1',
          2: 'group-2',
          3: 'group-3',
          4: 'group-4'
        }
      }
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
    // Scales font size to width of the Brick
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
      if (this.outOfTime) {
        return
      }
      if (!this.found) {
        this.selected = !this.selected
        this.$emit('clicked', this)
      }
    }
  }
}
</script>
