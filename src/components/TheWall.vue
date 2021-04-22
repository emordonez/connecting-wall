<template>
  <transition-group tag="div" class="grid grid-cols-4 gap-3">
    <Brick
      v-for="(item, index) in itemList"
      :ref="setBrickRef"
      :clue="item.clue"
      :groupId="item.groupId"
      :currentGroup="currentGroup"
      :key="index"
      @clicked="addToSelections"
    />
  </transition-group>
</template>

<script>
import Brick from './Brick.vue'

export default {
  name: 'Wall',
  components: {
    Brick
  },
  data () {
    return {
      selections: [],
      solved: [],
      itemList: [],
      brickRefs: [],
      groups: [
        {
          id: 1,
          connection: 'Connection 1',
          clues: [
            'Clue 1',
            'Clue 2',
            'Clue 3',
            'Clue 4'
          ]
        },
        {
          id: 2,
          connection: 'Connection 2',
          clues: [
            'Clue 5',
            'Clue 6',
            'Clue 7',
            'Clue 8'
          ]
        },
        {
          id: 3,
          connection: 'Connection 3',
          clues: [
            'Clue 9',
            'Clue 10',
            'Clue 11',
            'Clue 12'
          ]
        },
        {
          id: 4,
          connection: 'Connection 4',
          clues: [
            'Clue 13',
            'Clue 14',
            'Clue 15',
            'Clue 16'
          ]
        }
      ],
      currentGroup: 1
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

    this.itemList = list    
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
      this.selections.forEach((brick) => {
        brick.selected = false
      })
      this.selections = []
    },
    // Populates an array of Brick references
    setBrickRef (el) {
      if (el) {
        this.brickRefs.push(el)
      }
    },
    updateWall () {
      let last = this.solved.length - 1

      // Set the most recently solved group as found
      this.solved[last].forEach((brick) => {
        brick.found = true
        brick.rowIndex = last + 1
      })
      this.currentGroup++

      // Last group is automatically solved and should already be in place
      if (this.currentGroup === 4) {
        this.brickRefs.forEach((brick) => {
          if (brick.rowIndex === 0) {
            brick.found = true
            brick.rowIndex = 4
          }
        })
      }
    }
  }
}
</script>
