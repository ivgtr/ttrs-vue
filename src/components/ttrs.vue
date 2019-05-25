<template>
  <div class="ttrs" @keydown.left="moveLeft" @keydown.right="moveRight" @keydown.down="fallTrough">
    <p>{{ state }}</p>
    <table>
      <tr v-for="hei in height" :key="hei.id">
        <td v-for="wid in width" :key="wid.id"></td>
      </tr>
    </table>
    <button @click="start">{{click}}</button>
    <button @click="moveLeft">左</button>
    <button @click="fallTrough">下</button>
    <button @click="moveRight">右</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      width:[
        " "," "," "," "," "," "," "," "," "," ",
      ],
      height:[
        " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ",
      ],
      intervalId: undefined,
      state: "スタートを押してね",
      ready: false,
      click: "スタート",
      blocks:[
        {
          class:"i",
          pattern:[
            [1, 1, 1, 1]
          ]
        },
        {
          class:"o",
          pattern:[
            [1, 1],
            [1, 1]
          ]
        },
        {
          class:"t",
          pattern:[
            [0, 1, 0],
            [1, 1, 1]
          ]
        },
        {
          class:"s",
          pattern:[
            [0, 1, 1],
            [1, 1, 0]
          ]
        },
        {
          class:"z",
          pattern:[
            [1, 1, 0],
            [0, 1, 1]
          ]
        },
        {
          class:"j",
          pattern:[
            [0, 0, 1],
            [1, 1, 1]
          ]
        },
        {
          class:"l",
          pattern:[
            [1, 0, 0],
            [1, 1, 1]
          ]
        },
      ],
      td_array: "",
      cells: [],
      index: 0,
      isFalling: false,
      keys: "",
      nextBlockKey: "",
      nextBlock: "",
      pattern: "",
      fallingBlockNum: 0,
      nextFallingBlockNum: "",
      canDelete: true,
      moving: true,


    }
  },
  methods:{
    start(){
      this.state = "てっててっててーてってててってー"
      if(this.ready == false){
        this.ready = !this.ready
        this.click = "一時停止"
        console.log(this.ready)
        this.intervalId = setInterval(() => {
          this.checkGameOver()
          if(this.hasFallingBlock()){
            this.fallBlocks()
            console.log("otiru")
          }else{
            this.deleteRow()
            this.generateBlock()
            console.log("tukuru")

          }
      }, 1000)
      }else{
        this.ready = !this.ready
        this.click = "スタート"
        console.log(this.ready)
        clearInterval(this.intervalId)
      }
    },
    loadTable(){
      this.td_array = document.getElementsByTagName("td")
      for(var row = 0; row < 20; row++){
        this.cells[row] = []
        for(var col = 0;col < 10;col++){
          this.cells[row][col] = this.td_array[this.index]
          this.index++
        }
      }
    },
    fallBlocks(){
      for (var i = 0; i < 10; i++) {
        if(this.cells[19][i].blockNum === this.fallingBlockNum){
          this.isFalling = false
          return
        }
      }

      for(var row = 18;row >= 0; row--){
        for(var col = 0;col < 10;col++){
          if(this.cells[row][col].blockNum === this.fallingBlockNum){
            if (this.cells[row + 1][col].className !== "" && this.cells[row + 1][col].blockNum !== this.fallingBlockNum){
              this.isFalling = false;
              return;
            }
          }
        }
      }
      for(var row = 18;row >= 0; row--){
        for(var col = 0;col < 10;col++){
          if(this.cells[row][col].base){
            this.cells[row][col].base = true
            this.cells[row][col].base = null
          }
          if(this.cells[row][col].blockNum === this.fallingBlockNum){
            this.cells[row + 1][col].className = this.cells[row][col].className
            this.cells[row + 1][col].blockNum = this.cells[row][col].blockNum
            this.cells[row][col].className = ""
            this.cells[row][col].blockNum = null
          }
        }
      }
    },
    hasFallingBlock(){
      return this.isFalling
    },
    generateBlock(){
      for(var row = 0;row < 20; row++){
        for(var col = 0;col < 10; col++){
          if(this.cells[row][col].base){
            this.cells[row][col].base = null
          }
        }
      }
      this.keys = Object.keys(this.blocks)
      this.nextBlockKey = this.keys[Math.floor(Math.random() * this.keys.length)]
      console.log(this.nextBlockKey)
      this.nextBlock = this.blocks[this.nextBlockKey]
      this.nextFallingBlockNum = this.fallingBlockNum + 1
      this.pattern = this.nextBlock.pattern
      for (var row = 0; row < this.pattern.length; row++){
        for (var col = 0; col < this.pattern[row].length; col++){
          if(this.pattern[row][col]){
            this.cells[row][col + 3].className = this.nextBlock.class
            this.cells[row][col + 3].blockNum = this.nextFallingBlockNum
          }
        }
      }
      this.isFalling = true
      this.fallingBlockNum = this.nextFallingBlockNum
    },
    deleteRow(){
      var row = 19
      while(row >= 0){
        this.canDelete = true
        for(var col = 0; col < 10; col++){
          if(this.cells[row][col].className === ""){
            this.canDelete = false
          }
        }
        if(this.canDelete){
          for(var col = 0; col < 10; col++){
            this.cells[row][col].className = ""
          }
          for (var downRow = row-1; downRow >= 0; downRow--){
            for(var col = 0; col < 10; col++ ){
              this.cells[downRow + 1][col].className = this.cells[downRow][col].className;
              this.cells[downRow + 1][col].blockNum = this.cells[downRow][col].blockNum;
              this.cells[downRow][col].className = "";
              this.cells[downRow][col].blockNum = null;
            }
          }
        }else{
          row--
        }
      }
    },
    moveLeft(){
      for (var row = 0; row < 20; row++) {
        if (this.cells[row][0].blockNum === this.fallingBlockNum) { // ブロックが左端に来ている
          return;
        }
      }
      for (var row = 0; row < 20; row++) {
        for (var col = 1; col < 10; col++) {
          if (this.cells[row][col].blockNum === this.fallingBlockNum && this.cells[row][col-1].className !== "" && this.cells[row][col-1].blockNum !== this.fallingBlockNum) { // 左に別のブロックが存在する
            return;
          }
        }
      }
      for (var row = 0; row < 20; row++) {
        for (var col = 1; col < 10; col++) {
          if (this.cells[row][col].base) {
            this.cells[row][col-1].base = true;
            this.cells[row][col].base = null;

          }
          if (this.cells[row][col].blockNum === this.fallingBlockNum) {
            this.cells[row][col-1].className = this.cells[row][col].className;
            this.cells[row][col-1].blockNum = this.cells[row][col].blockNum;
            this.cells[row][col].className = "";
            this.cells[row][col].blockNum = null;
          }
        }
      }
    },
    moveRight(){
      for (var row = 0; row < 20; row++) {
        if (this.cells[row][9].blockNum === this.fallingBlockNum) { // ブロックが左端に来ている
          return;
        }
      }
      for (var row = 0; row < 20; row++) {
        for (var col = 8; col >= 0; col--) {
          if (this.cells[row][col].blockNum === this.fallingBlockNum && this.cells[row][col+1].className !== "" && this.cells[row][col+1].blockNum !== this.fallingBlockNum) { // 左に別のブロックが存在する
            return;
          }
        }
      }
      for (var row = 0; row < 20; row++) {
        for (var col = 8; col >= 0; col--) {
          if (this.cells[row][col].base) {
            this.cells[row][col+1].base = true;
            this.cells[row][col].base = null;

          }
          if (this.cells[row][col].blockNum === this.fallingBlockNum) {
            this.cells[row][col+1].className = this.cells[row][col].className;
            this.cells[row][col+1].blockNum = this.cells[row][col].blockNum;
            this.cells[row][col].className = "";
            this.cells[row][col].blockNum = null;
          }
        }
      }
    },
    fallTrough(){
      while(this.isFalling){
        this.fallBlocks()
      }
    },
    checkGameOver(){
      for (var row = 0; row < 2; row++){
        for (var col = 0; col < 10; col++){
          if (this.cells[row][col].className !== "" && this.cells[row][col].blockNum !== this.fallingBlockNum){
              clearInterval(this.intervalId)
              console.log("Game Over!")
              this.state = "げーむおーばー！"
          }
        }
      }
    }
  },
  mounted(){
    this.loadTable()
  },
  beforeDestroy () {
    console.log('clearInterval')
    clearInterval(this.intervalId)
  }
}
</script>

<style lang="scss" scoped>
table {
    margin: 0 auto; /* 中央寄せ */
    width: 200px;
    height: 400px;
}
td {
    width: 10%; /* 横10マス */
    height: 5%; /* 縦20マス */
    background-color: #455A64;
}
.i {
  background-color: #00BCD4; /* cyan */
}

.o {
  background-color: #FFEB3B; /* yellow */
}

.t {
  background-color: #9C27B0; /* purple */
}

.s {
  background-color: #4CAF50; /* green */
}

.z {
  background-color: #F44336; /* red */
}

.j {
  background-color: #2196F3; /* blue */
}

.l {
  background-color: #FF9800; /* orange */
}
</style>
