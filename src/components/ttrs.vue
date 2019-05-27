<template>
  <div class="ttrs">
    <p>{{ state }}</p>
    <p>現在のスコア:{{ score }}</p>
    <p>今までのハイスコア:{{ Highscore }}</p>
    <table>
      <tr v-for="hei in height" :key="hei.id">
        <td v-for="wid in width" :key="wid.id"></td>
      </tr>
    </table>
    <div class="btn">
      <span class="btn_bg" @click="moveLeft">
        <i class="fas fa-angle-left"></i>
      </span>
      <span class="btn_bg" @click="moveDown">
        <i class="fas fa-angle-left"></i>
      </span>
      <span class="btn_bg" @click="moveRight">
        <i class="fas fa-angle-left"></i>
      </span>
      <span class="btn_bg" @click="rotate">
        <i class="fas fa-undo"></i>
      </span>
      <span class="btn_bg" @click="fallTrough">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <span class="text_bg" @click="start">
        <span>{{click}}</span>
      </span>
    </div>
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
      click: "Start",
      blocks:[
        {
          class:"i",
          pattern:[
            [0, 0, 0, 0],
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
      score: 0,
      Highscore: "未実装",
      speed: 950,
      blockRange: 0,
      initRow: "",
      initCol: "",
      blockClass: "",
      rotatedBlockClass: "",


    }
  },
  methods:{
    start(){
      this.state = "てっててっててーてってててってー"
      if(this.ready == false){
        this.ready = !this.ready
        this.click = "Pause"
        this.intervalId = setInterval(() => {
          this.checkGameOver()
          if(this.hasFallingBlock()){
            this.fallBlocks()
          }else{
            this.deleteRow()
            this.generateBlock()
          }
      }, this.speed)
      }else{
        this.ready = !this.ready
        console.log(this.ready)
        this.click = "Start"
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
            this.cells[row+1][col].base = true
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
      this.cells[0][3].base = true
      for (var row = 0; row < this.pattern.length; row++){
        for (var col = 0; col < this.pattern[row].length; col++){
          if(this.pattern[row][col]){
            this.cells[row][col + 3].className = this.nextBlock.class
            this.cells[row][col + 3].blockNum = this.nextFallingBlockNum
            this.score += 100
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
              this.score += 70
            }
          }
        }else{
          row--
        }
      }
    },
    moveLeft(){
      if(this.ready){
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
      }
    },
    moveRight(){
      if(this.ready){
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
      }
    },
    moveDown(){
      if(this.ready){
        if(this.hasFallingBlock()){
              this.fallBlocks()
            }
      }
    },
    fallTrough(){
      if(this.ready){
        while(this.isFalling){
          this.fallBlocks()
        }
      }
    },
    rotate(){
      if(this.ready){
        for(var row = 0; row < 20; row++){
          for(var col = 0; col < 10; col++){
            if(this.cells[row][col].blockNum === this.fallingBlockNum){
              if(this.cells[row][col].className === "o"){
                return
              } else if(this.cells[row][col].className === "i"){
                this.blockRange = 4
              } else{
                this.blockRange = 3
              }
              this.blockClass = this.cells[row][col].className
              break
            }
          }
        }
        for(var row = 0; row < 20; row++){
          for(var col = 0; col < 10; col++){
            if(this.cells[row][col].base){
              this.initRow = row
              this.initCol = col
              break
            }
          }
        }
        for(var i = 0; i < this.blockRange; i++){
          for(var j = 0; j < this.blockRange; j++){
            if(this.cells[this.initRow+i][this.initCol+j].className !== "" && this.cells[this.initRow+i][this.initCol+j].blockNum !== this.fallingBlockNum){
              return
            }
          }
        }
        if(this.blockRange === 3){
          this.rotatedBlockClass = [["","",""],["","",""],["","",""]]
        }else if(this.blockRange === 4){
          this.rotatedBlockClass = [["","","",""],["","","",""],["","","",""],["","","",""]]
        }
        for(var i = 0; i < this.blockRange; i++){
          for(var j = 0; j < this.blockRange; j++){
            this.rotatedBlockClass[j][this.blockRange-1-i] = this.cells[this.initRow+i][this.initCol+j].className
          }
        }
        for(var i = 0; i < this.blockRange; i++){
          for(var j = 0; j < this.blockRange; j++){
            this.cells[this.initRow+i][this.initCol+j].blockNum = null
            this.cells[this.initRow+i][this.initCol+j].className = this.rotatedBlockClass[i][j]
            if(this.rotatedBlockClass[i][j] !== ""){
              this.cells[this.initRow+i][this.initCol+j].blockNum = this.fallingBlockNum
            }
          }
        }
      }
    },
    keyactive(event){
      if (event.keyCode === 37 || event.keyCode === 65 ) {
        this.moveLeft()
      } else if (event.keyCode === 39 || event.keyCode === 68 ) {
        this.moveRight()
      } else if (event.keyCode === 38 || event.keyCode === 87 ) {
        this.fallTrough()
      } else if (event.keyCode === 40 || event.keyCode === 83 ) {
        this.moveDown()
      } else if (event.keyCode === 32) {
        this.rotate()
      } else if(event.keyCode === 13 || event.keyCode === 80 ){
        this.start()
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
    window.addEventListener('keydown',this.keyactive)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  }
}
</script>

<style lang="scss" scoped>
@mixin sp {
  @media (max-width: 400px) {
    @content;
  }
}
@mixin tab {
  @media (max-width: 800px) {
    @content;
  }
}
.ttrs{
  p{
    margin: 0;
    font-size: 1.8rem;
    &:nth-child(1){
      margin-bottom: 10px;
      font-size: 2.4rem;
    }
    &:nth-child(3){
      margin-bottom: 10px;
    }
    @include tab{
      font-size: 2.7rem;
      &:nth-child(1){
        margin-bottom: 10px;
        font-size: 3.6rem;
      }
      &:nth-child(3){
        margin-bottom: 10px;
      }
    }
    @include sp{
      font-size: 1.4rem;
      &:nth-child(1){
        margin-bottom: 10px;
        font-size: 1.9rem;
      }
      &:nth-child(3){
        margin-bottom: 10px;
      }
    }
  }
table {
    margin: 0 auto;
    width: 200px;
    height: 400px;
    @include tab{
      width: 300px;
      height: 600px;
    }
    @include sp{
      width: 50vw;
      height: 100vw;
    }
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

.btn{
  position: relative;
  max-width: 400px;
  width: calc(100% - 20px);
  margin: 0 auto;
  &_bg{
    position: absolute;
    display: block;
    width: 56px; height: 56px;
    background: #455A64;
    text-align: center;
    border-radius: 50%;
    transition: .3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
    i{
      color: white;
      line-height: 56px;
      font-size: 2.7rem;
    }
    &:nth-child(1){
      top: 60px;
      left: 10px;
    }
    &:nth-child(2){
      transform: rotate(-90deg);
      top: 105px;
      left: 55px;
    }
    &:nth-child(3){
      transform: rotate(180deg);
      top: 60px;
      left: 100px;
    }
    &:nth-child(4){
      top: 105px;
      right: 140px;
    }
    &:nth-child(5){
      transform: rotate(-90deg);
      top: 10px;
      left: 55px;
    }
  }
  .text_bg{
    position: absolute;
    display: block;
    width: 176px; height: 56px;
    background: #455A64;
    text-align: center;
    border-radius: 28px;
    transition: .3s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);
    top: 30px; right: 20px;
    span{
      color: white;
      line-height: 56px;
      font-size: 2.4rem;
      
    }
  }
}

}

</style>
