(function(t){function l(l){for(var e,c,o=l[0],n=l[1],r=l[2],u=0,f=[];u<o.length;u++)c=o[u],i[c]&&f.push(i[c][0]),i[c]=0;for(e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);h&&h(l);while(f.length)f.shift()();return a.push.apply(a,r||[]),s()}function s(){for(var t,l=0;l<a.length;l++){for(var s=a[l],e=!0,o=1;o<s.length;o++){var n=s[o];0!==i[n]&&(e=!1)}e&&(a.splice(l--,1),t=c(c.s=s[0]))}return t}var e={},i={app:0},a=[];function c(l){if(e[l])return e[l].exports;var s=e[l]={i:l,l:!1,exports:{}};return t[l].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.m=t,c.c=e,c.d=function(t,l,s){c.o(t,l)||Object.defineProperty(t,l,{enumerable:!0,get:s})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,l){if(1&l&&(t=c(t)),8&l)return t;if(4&l&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&l&&"string"!=typeof t)for(var e in t)c.d(s,e,function(l){return t[l]}.bind(null,e));return s},c.n=function(t){var l=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(l,"a",l),l},c.o=function(t,l){return Object.prototype.hasOwnProperty.call(t,l)},c.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],n=o.push.bind(o);o.push=l,o=o.slice();for(var r=0;r<o.length;r++)l(o[r]);var h=n;a.push([0,"chunk-vendors"]),s()})({0:function(t,l,s){t.exports=s("56d7")},"56d7":function(t,l,s){"use strict";s.r(l);s("cadf"),s("551c"),s("f751"),s("097d");var e=s("2b0e"),i=function(){var t=this,l=t.$createElement,e=t._self._c||l;return e("div",{attrs:{id:"app"}},[e("ttrs"),e("img",{staticClass:"main_logo",attrs:{src:s("cf05"),alt:"てとりす"},on:{click:t.reload}})],1)},a=[],c=(s("73ec"),function(){var t=this,l=t.$createElement,s=t._self._c||l;return s("div",{staticClass:"ttrs"},[s("p",[t._v(t._s(t.state))]),s("p",[t._v("現在のスコア:"+t._s(t.score))]),s("p",[t._v("今までのハイスコア:"+t._s(t.Highscore))]),s("table",t._l(t.height,function(l){return s("tr",{key:l.id},t._l(t.width,function(t){return s("td",{key:t.id})}),0)}),0),s("div",{staticClass:"btn_set"},[s("div",{staticClass:"btn"},[s("span",{staticClass:"btn_bg",on:{click:t.moveLeft}},[s("i",{staticClass:"fas fa-angle-left"})]),s("span",{staticClass:"btn_bg",on:{click:t.moveDown}},[s("i",{staticClass:"fas fa-angle-left"})]),s("span",{staticClass:"btn_bg",on:{click:t.moveRight}},[s("i",{staticClass:"fas fa-angle-left"})]),s("span",{staticClass:"btn_bg",on:{click:t.rotate}},[s("i",{staticClass:"fas fa-undo"})]),s("span",{staticClass:"btn_bg",on:{click:t.fallTrough}},[s("i",{staticClass:"fas fa-angle-double-left"})]),s("span",{staticClass:"text_bg",on:{click:t.start}},[s("span",[t._v(t._s(t.click))])])])])])}),o=[],n=(s("ac6a"),s("456d"),{data:function(){return{width:[" "," "," "," "," "," "," "," "," "," "],height:[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],intervalId:void 0,state:"スタートを押してね",ready:!1,click:"Start",blocks:[{class:"i",pattern:[[0,0,0,0],[1,1,1,1]]},{class:"o",pattern:[[1,1],[1,1]]},{class:"t",pattern:[[0,1,0],[1,1,1]]},{class:"s",pattern:[[0,1,1],[1,1,0]]},{class:"z",pattern:[[1,1,0],[0,1,1]]},{class:"j",pattern:[[0,0,1],[1,1,1]]},{class:"l",pattern:[[1,0,0],[1,1,1]]}],td_array:"",cells:[],index:0,isFalling:!1,keys:"",nextBlockKey:"",nextBlock:"",pattern:"",fallingBlockNum:0,nextFallingBlockNum:"",canDelete:!0,score:0,Highscore:"未実装",speed:950,blockRange:0,initRow:"",initCol:"",blockClass:"",rotatedBlockClass:""}},methods:{start:function(){var t=this;this.state="てっててっててーてってててってー",0==this.ready?(this.ready=!this.ready,this.click="Pause",this.intervalId=setInterval(function(){t.checkGameOver(),t.hasFallingBlock()?t.fallBlocks():(t.deleteRow(),t.generateBlock())},this.speed)):(this.ready=!this.ready,console.log(this.ready),this.click="Start",clearInterval(this.intervalId))},loadTable:function(){this.td_array=document.getElementsByTagName("td");for(var t=0;t<20;t++){this.cells[t]=[];for(var l=0;l<10;l++)this.cells[t][l]=this.td_array[this.index],this.index++}},fallBlocks:function(){for(var t=0;t<10;t++)if(this.cells[19][t].blockNum===this.fallingBlockNum)return void(this.isFalling=!1);for(var l=18;l>=0;l--)for(var s=0;s<10;s++)if(this.cells[l][s].blockNum===this.fallingBlockNum&&""!==this.cells[l+1][s].className&&this.cells[l+1][s].blockNum!==this.fallingBlockNum)return void(this.isFalling=!1);for(l=18;l>=0;l--)for(s=0;s<10;s++)this.cells[l][s].base&&(this.cells[l+1][s].base=!0,this.cells[l][s].base=null),this.cells[l][s].blockNum===this.fallingBlockNum&&(this.cells[l+1][s].className=this.cells[l][s].className,this.cells[l+1][s].blockNum=this.cells[l][s].blockNum,this.cells[l][s].className="",this.cells[l][s].blockNum=null)},hasFallingBlock:function(){return this.isFalling},generateBlock:function(){for(var t=0;t<20;t++)for(var l=0;l<10;l++)this.cells[t][l].base&&(this.cells[t][l].base=null);this.keys=Object.keys(this.blocks),this.nextBlockKey=this.keys[Math.floor(Math.random()*this.keys.length)],console.log(this.nextBlockKey),this.nextBlock=this.blocks[this.nextBlockKey],this.nextFallingBlockNum=this.fallingBlockNum+1,this.pattern=this.nextBlock.pattern,this.cells[0][3].base=!0;for(t=0;t<this.pattern.length;t++)for(l=0;l<this.pattern[t].length;l++)this.pattern[t][l]&&(this.cells[t][l+3].className=this.nextBlock.class,this.cells[t][l+3].blockNum=this.nextFallingBlockNum,this.score+=100);this.isFalling=!0,this.fallingBlockNum=this.nextFallingBlockNum},deleteRow:function(){var t=19;while(t>=0){this.canDelete=!0;for(var l=0;l<10;l++)""===this.cells[t][l].className&&(this.canDelete=!1);if(this.canDelete){for(l=0;l<10;l++)this.cells[t][l].className="";for(var s=t-1;s>=0;s--)for(l=0;l<10;l++)this.cells[s+1][l].className=this.cells[s][l].className,this.cells[s+1][l].blockNum=this.cells[s][l].blockNum,this.cells[s][l].className="",this.cells[s][l].blockNum=null,this.score+=70}else t--}},moveLeft:function(){if(this.ready){for(var t=0;t<20;t++)if(this.cells[t][0].blockNum===this.fallingBlockNum)return;for(t=0;t<20;t++)for(var l=1;l<10;l++)if(this.cells[t][l].blockNum===this.fallingBlockNum&&""!==this.cells[t][l-1].className&&this.cells[t][l-1].blockNum!==this.fallingBlockNum)return;for(t=0;t<20;t++)for(l=1;l<10;l++)this.cells[t][l].base&&(this.cells[t][l-1].base=!0,this.cells[t][l].base=null),this.cells[t][l].blockNum===this.fallingBlockNum&&(this.cells[t][l-1].className=this.cells[t][l].className,this.cells[t][l-1].blockNum=this.cells[t][l].blockNum,this.cells[t][l].className="",this.cells[t][l].blockNum=null)}},moveRight:function(){if(this.ready){for(var t=0;t<20;t++)if(this.cells[t][9].blockNum===this.fallingBlockNum)return;for(t=0;t<20;t++)for(var l=8;l>=0;l--)if(this.cells[t][l].blockNum===this.fallingBlockNum&&""!==this.cells[t][l+1].className&&this.cells[t][l+1].blockNum!==this.fallingBlockNum)return;for(t=0;t<20;t++)for(l=8;l>=0;l--)this.cells[t][l].base&&(this.cells[t][l+1].base=!0,this.cells[t][l].base=null),this.cells[t][l].blockNum===this.fallingBlockNum&&(this.cells[t][l+1].className=this.cells[t][l].className,this.cells[t][l+1].blockNum=this.cells[t][l].blockNum,this.cells[t][l].className="",this.cells[t][l].blockNum=null)}},moveDown:function(){this.ready&&this.hasFallingBlock()&&this.fallBlocks()},fallTrough:function(){if(this.ready)while(this.isFalling)this.fallBlocks()},rotate:function(){if(this.ready){for(var t=0;t<20;t++)for(var l=0;l<10;l++)if(this.cells[t][l].blockNum===this.fallingBlockNum){if("o"===this.cells[t][l].className)return;"i"===this.cells[t][l].className?this.blockRange=4:this.blockRange=3,this.blockClass=this.cells[t][l].className;break}for(t=0;t<20;t++)for(l=0;l<10;l++)if(this.cells[t][l].base){this.initRow=t,this.initCol=l;break}for(var s=0;s<this.blockRange;s++)for(var e=0;e<this.blockRange;e++)if(""!==this.cells[this.initRow+s][this.initCol+e].className&&this.cells[this.initRow+s][this.initCol+e].blockNum!==this.fallingBlockNum)return;3===this.blockRange?this.rotatedBlockClass=[["","",""],["","",""],["","",""]]:4===this.blockRange&&(this.rotatedBlockClass=[["","","",""],["","","",""],["","","",""],["","","",""]]);for(s=0;s<this.blockRange;s++)for(e=0;e<this.blockRange;e++)this.rotatedBlockClass[e][this.blockRange-1-s]=this.cells[this.initRow+s][this.initCol+e].className;for(s=0;s<this.blockRange;s++)for(e=0;e<this.blockRange;e++)this.cells[this.initRow+s][this.initCol+e].blockNum=null,this.cells[this.initRow+s][this.initCol+e].className=this.rotatedBlockClass[s][e],""!==this.rotatedBlockClass[s][e]&&(this.cells[this.initRow+s][this.initCol+e].blockNum=this.fallingBlockNum)}},keyactive:function(t){37===t.keyCode||65===t.keyCode?this.moveLeft():39===t.keyCode||68===t.keyCode?this.moveRight():38===t.keyCode||87===t.keyCode?this.fallTrough():40===t.keyCode||83===t.keyCode?this.moveDown():32===t.keyCode?this.rotate():13!==t.keyCode&&80!==t.keyCode||this.start()},checkGameOver:function(){for(var t=0;t<2;t++)for(var l=0;l<10;l++)""!==this.cells[t][l].className&&this.cells[t][l].blockNum!==this.fallingBlockNum&&(clearInterval(this.intervalId),console.log("Game Over!"),this.state="げーむおーばー！")}},mounted:function(){this.loadTable(),window.addEventListener("keydown",this.keyactive)},beforeDestroy:function(){clearInterval(this.intervalId)}}),r=n,h=(s("b41e"),s("2877")),u=Object(h["a"])(r,c,o,!1,null,"3bd4745a",null),f=u.exports,k={name:"app",components:{ttrs:f},methods:{reload:function(){location.reload(!1)}}},m=k,b=(s("5c0b"),Object(h["a"])(m,i,a,!1,null,null,null)),d=b.exports;e["a"].config.productionTip=!1,new e["a"]({render:function(t){return t(d)}}).$mount("#app")},"5c0b":function(t,l,s){"use strict";var e=s("5e27"),i=s.n(e);i.a},"5e27":function(t,l,s){},"73ec":function(t,l,s){},"9cb0":function(t,l,s){},b41e:function(t,l,s){"use strict";var e=s("9cb0"),i=s.n(e);i.a},cf05:function(t,l,s){t.exports=s.p+"img/logo.1b2afed2.png"}});
//# sourceMappingURL=app.9c6d4135.js.map