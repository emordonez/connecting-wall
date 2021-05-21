<template>
  <div class="flex flex-row justify-between">
    <div class="transition-width duration-1000" :class="finished ? 'w-3/5' : 'w-full'">
      <transition-group tag="div" class="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        <Brick
          v-for="(item, index) in itemList"
          :key="index"
          :ref="setBrickRef"
          :clue="item.clue"
          :groupId="item.groupId"
          :connection="item.connection"
          :currentGroup="currentGroup"
          :outOfTime="outOfTime"
          @clicked="addToSelections"
        />
      </transition-group>
    </div>
    <div class="transition-width duration-1000" :class="finished ? 'w-1/3' : 'w-0'">
      <div v-if="finished" class="grid grid-cols-1 gap-3 h-full">
        <transition
          tag="div"
          v-for="group in solved"
          :key="group.id"
          class="flex justify-center items-center w-full h-full
            border-4 rounded-md bg-black
            select-none cursor-pointer"
          :class="groupClasses[group.id]"
          @click="revealLink(group)"
        >
          <p 
            class="font-medium text-lg text-center lg:text-xl"
            :class="showLinks ? 'text-white' : 'text-transparent'"
          >
            {{ group.text }}
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Brick from '@/components/Brick.vue'

export default {
  props: {
    completed: Boolean,
    outOfTime: Boolean,
    groups: Array
  },
  components: {
    Brick
  },
  emits: ['solvedWall'],
  data () {
    return {
      itemList: [],
      brickRefs: [],
      selections: [],
      solved: [],
      currentGroup: 1,
      groupClasses: {
        1: 'group-1',
        2: 'group-2',
        3: 'group-3',
        4: 'group-4'
      },
      showLinks: false
    }
  },
  mounted () {
    // Flattens the data
    let list = this.groups.flatMap((group) => 
      group.clues.map((clue) => ({
        clue: clue,
        groupId: group.id,
        connection: group.connection
      }))
    )

    // Shuffles the array
    let currIndex = list.length, randIndex, tempVal
    while (0 !== currIndex) {
      randIndex = Math.floor(Math.random() * currIndex)
      currIndex--

      tempVal = list[currIndex]
      list[currIndex] = list[randIndex]
      list[randIndex] = tempVal
    }

    // itemsList is computed in the mounted hook so that it isn't cached
    this.itemList = list      
  },
  computed: {
    finished () {
      return this.completed || this.outOfTime
    }
  },
  methods: {
    addToSelections (brick) {
      if (brick.selected) {
        this.selections.push(brick)
        if (this.selections.length === 4) {
          setTimeout(this.checkSelected, 250)
        }
      }
      else {
        this.selections = this.selections.filter((item) => item !== brick)
      }
    },
    checkSelected () {
      let id = this.selections[0].groupId

      // Correct selections: All groupId's are equal
      if (this.selections.filter((brick) => brick.groupId !== id).length === 0) {
        this.solved.push(this.selections)
        this.updateWall()
      }
      // Clear selections whether correct or incorrect
      this.selections.forEach((brick) => {
        brick.selected = false
      })
      this.selections = []
    },
    resolveWall () {
      // Iterate up to currentGroup === 4
      //  Final group resolution happens in updateWall
      while (this.currentGroup < 4) {
        let brickToSolve = this.brickRefs[0]
        let arr = [brickToSolve]
        for (let i = 1; i < this.brickRefs.length; i++) {
          let currentBrick = this.brickRefs[i]
          if (currentBrick.groupId === brickToSolve.groupId) {
            arr.push(currentBrick)
          }
          if (arr.length === 4) {
            this.solved.push(arr)
            this.updateWall()
            break
          }
        }
      }
    },
    revealLink (group) {
      group.text = group.connection
    },
    setBrickRef (el) {
      // Keeps an array of references to Bricks not found, initially 16
      if (!el.found && !this.brickRefs.includes(el)) {
        this.brickRefs.push(el)
      }
    },
    updateSolvedGroups () {
      // Maintains an array of the groups in the order they were solved in
      this.solved = this.solved.map((group, index) => {
        if (Array.isArray(group)) {
          return {
            id: index + 1,
            connection: group[0].connection,
            text: 'What is the link?'
          }
        }
        return group
      })
    },
    updateWall () {
      // Sets the most recently solved group as found and indexed
      this.solved[this.solved.length - 1].forEach((brick) => {
        brick.found = true
        brick.groupIndex = this.currentGroup
      })
      this.currentGroup++
      this.updateSolvedGroups()

      // No need to reference found Bricks
      this.brickRefs = this.brickRefs.filter((brick) => !brick.found)

      // Last group is automatically solved and should already be in place
      if (this.currentGroup === 4) {
        let finalSelection = []
        this.brickRefs.forEach((brick) => {
          brick.found = true
          brick.groupIndex = this.currentGroup
          finalSelection.push(brick)
        })
        this.brickRefs = []
        this.solved.push(finalSelection)
        this.updateSolvedGroups()
        if (!this.outOfTime) {
          this.$emit('solvedWall', true)
        }
        setTimeout(() => { this.showLinks = true }, 1250)
      }
    }
  }
}
</script>
