"use strict";(globalThis["webpackChunkjs_sudoku"]=globalThis["webpackChunkjs_sudoku"]||[]).push([[343],{79343:(e,t,l)=>{l.r(t),l.d(t,{default:()=>Ce});var i=l(59835),s=l(86970),n=l(61957);const a={class:"q-pt-lg"},c={id:"bottom-bar",class:"flex column full-width"},d={id:"info-bar",class:"flex row full-width q-px-sm"},u={class:"text-caption q-mr-sm flex flex-center"},o={class:"text-caption flex-center"},r={id:"action-bar",class:"full-width"},m={id:"mode-bar",class:"row q-pa-sm"};function p(e,t,l,p,h,g){const b=(0,i.up)("sudoku-board"),C=(0,i.up)("q-space"),v=(0,i.up)("difficulty-rating"),S=(0,i.up)("q-btn"),f=(0,i.up)("q-toggle"),z=(0,i.up)("number-bar"),w=(0,i.up)("q-page");return e.gameState.puzzle?((0,i.wg)(),(0,i.j4)(w,{key:0,id:"page"},{default:(0,i.w5)((()=>[(0,i._)("div",a,[(0,i.Wm)(b,{ref:"sudoku",puzzle:e.gameState.puzzle,selectedValue:e.selectedValue,size:"4.7vw",onClick:e.cellClick,onCellUpdated:e.cellUpdated},null,8,["puzzle","selectedValue","onClick","onCellUpdated"])]),(0,i._)("div",c,[(0,i._)("div",d,[(0,i.wy)((0,i._)("div",null,(0,s.zw)(e.puzzleTime),513),[[n.F8,e.settings.showTime]]),(0,i.Wm)(C),(0,i._)("div",u,[(0,i.Wm)(v,{level:e.gameDifficulty.level},null,8,["level"])]),(0,i._)("div",o,"Hints "+(0,s.zw)(e.gameState.hintCount),1)]),(0,i._)("div",r,[(0,i._)("div",m,[(0,i.Wm)(C),(0,i.Wm)(S,{icon:"undo",flat:"",round:"",size:"md",onClick:e.undo},null,8,["onClick"]),(0,i.wy)((0,i.Wm)(S,{icon:"tips_and_updates",flat:"",round:"",size:"md",onClick:e.hint},null,8,["onClick"]),[[n.F8,e.settings.showHints]]),(0,i.Wm)(f,{modelValue:e.noteMode,"onUpdate:modelValue":t[0]||(t[0]=t=>e.noteMode=t),icon:"edit",color:"positive"},null,8,["modelValue"]),(0,i.Wm)(S,{icon:"backspace",flat:"",round:"",size:"md",onClick:e.clearCell},null,8,["onClick"])]),(0,i.Wm)(z,{size:9,onClick:e.onTapNumber,activeNumbers:e.activeNumbers,inactiveNumbers:e.selectCellMode?e.inactiveNumbers:[],completedNumbers:e.completedNumbers,selectedNumber:e.selectNumberMode?e.selectedValue:0},null,8,["onClick","activeNumbers","inactiveNumbers","completedNumbers","selectedNumber"])])])])),_:1})):(0,i.kq)("",!0)}l(69665);const h={id:"board"};function g(e,t,l,s,n,a){const c=(0,i.up)("sudoku-cell");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i._)("div",h,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.boardSize,((t,l)=>((0,i.wg)(),(0,i.iD)("div",{key:l,class:"square"},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.getSquareCells(l),(t=>((0,i.wg)(),(0,i.j4)(c,{key:t.id,puzzle:e.puzzle,cell:t,isRowSelected:e.selectedCell?.row.index===t.row.index,isColumnSelected:e.selectedCell?.column.index===t.column.index,isSquareSelected:e.selectedCell?.square.index===t.square.index,isSelected:e.selectedCellId===t.id,isValueSelected:t.hasValue()&&e.selectedValue===t.value,onClick:()=>e.onCellClick(t.id),onUpdate:(l,i)=>e.$emit("cellUpdated",t.id,l,i),size:e.size},null,8,["puzzle","cell","isRowSelected","isColumnSelected","isSquareSelected","isSelected","isValueSelected","onClick","onUpdate","size"])))),128))])))),128))])])}var b=l(11857),C=l(2655);const v=e=>((0,i.dD)("data-v-11fa1c24"),e=e(),(0,i.Cn)(),e),S=v((()=>(0,i._)("div",{id:"circle"},null,-1))),f={key:1},z={key:1,id:"notes"};function w(e,t,l,n,a,c){return(0,i.wg)(),(0,i.iD)("div",{class:(0,s.C_)(["cell",e.classObject]),onClick:t[0]||(t[0]=(...t)=>e.onClick&&e.onClick(...t))},[e.cell.hasValue()?((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[S,e.cell.isStatic?((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[(0,i.Uk)((0,s.zw)(e.cell.value),1)],64)):((0,i.wg)(),(0,i.iD)("span",f,(0,s.zw)(e.cell.value),1))],64)):((0,i.wg)(),(0,i.iD)("div",z,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.notes,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{key:t,class:"note"},(0,s.zw)(e?t+1:""),1)))),128))]))],2)}var y=l(10098);const k=(0,i.aZ)({name:"SudokuCell",emits:["click","update"],props:{puzzle:{type:C.ZP,required:!0},cell:{type:C.bL,required:!0},isSelected:{type:Boolean,default:!1},isSquareSelected:{type:Boolean,default:!1},isRowSelected:{type:Boolean,default:!1},isColumnSelected:{type:Boolean,default:!1},isValueSelected:{type:Boolean,default:!1},size:{type:String,default:"1.0em"}},setup(){const e=(0,y.F)();return{settings:e}},methods:{onClick(){this.$emit("click")}},computed:{classObject(){return{static:this.cell.isStatic,selected:this.isSelected,"row-selected":this.isRowSelected,"column-selected":this.isColumnSelected,"square-selected":this.isSquareSelected,"value-selected":this.isValueSelected,error:this.settings.showErrors&&this.isError}},boardSize(){return b.Ju.SIZE},isError(){return this.cell.hasValue()&&this.cell.value!==this.puzzle.getSolutionValue({position:this.cell.position})},notes(){return Array(this.boardSize).fill(null).map(((e,t)=>this.cell.notes.hasValue(t+1)))}},watch:{"cell.value":{handler(e,t){this.$emit("update",e,t)},immediate:!0}}}),q=()=>{(0,n.sj)((e=>({"16d47e34":e.size})))},N=k.setup;k.setup=N?(e,t)=>(q(),N(e,t)):q;const _=k;var x=l(11639);const Z=(0,x.Z)(_,[["render",w],["__scopeId","data-v-11fa1c24"]]),V=Z,I=(0,i.aZ)({components:{SudokuCell:V},name:"SodukuBoard",props:{puzzle:{type:C.ZP,required:!0},selectedValue:{type:Number,default:0},size:{type:String,default:"1.0em"}},emits:["click","cellUpdated"],data(){return{selectedCellId:null}},methods:{onCellClick(e){this.selectedCellId=e,this.$emit("click",e)},getSquareCells(e){return Array(b.Ju.SIZE).fill(null).map(((t,l)=>{const[i,s]=b.Ju.squares[e].get(l);return this.puzzle.getCell({x:i,y:s})}))}},computed:{boardSize(){return b.Ju.SIZE},selectedCellIndex(){return this.puzzle.cells.findIndex((e=>e.id===this.selectedCellId))},selectedCell(){return this.selectedCellIndex>-1?this.puzzle.cells[this.selectedCellIndex]:null}}}),D=(0,x.Z)(I,[["render",g],["__scopeId","data-v-fba18ae4"]]),M=D;var W=l(67843);const j={id:"number-bar"},B={style:{display:"flex","flex-direction":"column",height:"100%","justify-content":"flex-start",width:"100%","padding-bottom":"10px","padding-top":"10px",color:"black"}},U={style:{position:"relative",display:"flex","justify-content":"center","align-items":"center","margin-top":"-8px","margin-bottom":"4px"}},H={style:{height:"100%",display:"flex","flex-direction":"row","justify-content":"center","align-items":"center"}},$={key:0,class:"number-btn"};function T(e,t,l,n,a,c){const d=(0,i.up)("q-icon"),u=(0,i.up)("q-btn");return(0,i.wg)(),(0,i.iD)("div",j,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(Math.ceil(e.size/2),(t=>((0,i.wg)(),(0,i.iD)("div",{key:t},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.columnNumbers(t),(t=>((0,i.wg)(),(0,i.j4)(u,{key:t,size:"xl",color:"white",padding:"none",class:(0,s.C_)(["number-btn",e.classObject(t)]),onClick:()=>e.$emit("click",t)},{default:(0,i.w5)((()=>[(0,i._)("div",B,[(0,i._)("div",U,(0,s.zw)(t),1),(0,i._)("div",H,[(0,i.Wm)(d,{name:"adjust",class:"number-icon active-icon q-pa-none q-ma-none",padding:"none",size:"sm"}),(0,i.Wm)(d,{name:"done_all",class:"number-icon completed-icon q-pa-none q-ma-none",padding:"none",size:"sm"})])])])),_:2},1032,["class","onClick"])))),128)),1===e.columnNumbers(t).length?((0,i.wg)(),(0,i.iD)("div",$)):(0,i.kq)("",!0)])))),128))])}l(46727);const E=(0,i.aZ)({name:"NumberBar",props:{size:{type:Number,required:!0},activeNumbers:{type:Array,default:()=>[]},inactiveNumbers:{type:Array,default:()=>[]},completedNumbers:{type:Array,default:()=>[]},selectedNumber:{type:Number,default:0}},emits:["click"],methods:{classObject(e){return{"active-number":this.activeNumbers.includes(e),"inactive-number":this.inactiveNumbers.includes(e),"completed-number":this.completedNumbers.includes(e),"selected-number":this.selectedNumber===e,"unselected-number":this.selectedNumber>0&&this.selectedNumber!==e}},columnNumbers(e){const t=e,l=e+Math.ceil(this.size/2);return l>this.size?[t]:[t,l]}}});var L=l(24455),P=l(22857),Q=l(69984),A=l.n(Q);const Y=(0,x.Z)(E,[["render",T],["__scopeId","data-v-126bbdda"]]),J=Y;A()(E,"components",{QBtn:L.Z,QIcon:P.Z});const O={class:"text-h6 row items-center"},R={class:"q-ml-sm"},K={class:"text-h6 row items-center"},F={class:"q-ml-sm"},G={class:"text-h6 row items-center"},X={class:"q-ml-sm"},ee={class:"text-h6 row items-center"},te={class:"q-ml-sm"};function le(e,t,l,n,a,c){const d=(0,i.up)("q-card-section"),u=(0,i.up)("difficulty-rating"),o=(0,i.up)("q-btn"),r=(0,i.up)("q-card"),m=(0,i.up)("q-dialog");return(0,i.wg)(),(0,i.j4)(m,{ref:"dialog",onHide:c.onDialogHide,persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(r,{class:"q-dialog-plugin q-pa-sm"},{default:(0,i.w5)((()=>[(0,i.Wm)(d,{class:"text-h2"},{default:(0,i.w5)((()=>[(0,i.Uk)(" You Won! ")])),_:1}),(0,i.Wm)(d,{class:"q-gutter-y-md text-h6"},{default:(0,i.w5)((()=>[(0,i._)("div",O,[(0,i.Uk)(" Difficulty: "),(0,i._)("span",R,[(0,i.Wm)(u,{level:l.puzzle.difficultyLevel},null,8,["level"])])]),(0,i._)("div",K,[(0,i.Uk)(" Hints: "),(0,i._)("span",F,(0,s.zw)(l.hintCount),1)]),(0,i._)("div",G,[(0,i.Uk)(" Time Taken: "),(0,i._)("span",X,(0,s.zw)(c.displayTime),1)]),(0,i._)("div",ee,[(0,i.Uk)(" Level: "),(0,i._)("span",te,"#"+(0,s.zw)(l.puzzle.seed),1)])])),_:1}),(0,i.Wm)(d,null,{default:(0,i.w5)((()=>[(0,i.Wm)(o,{label:"Play Another",class:"full-width",size:"lg",color:"primary",onClick:c.nextLevel},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}var ie=l(88282),se=l(28878);const ne={name:"VictoryScreen",components:{DifficultyRating:se.Z},props:{puzzle:{type:C.ZP,required:!0},time:{type:Number,required:!0},hintCount:{type:Number,required:!0}},emits:["ok","hide"],methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},nextLevel(){this.$q.dialog({component:ie.Z}).onOk((e=>{this.$emit("ok",e),this.hide()}))}},computed:{displayTime(){const e=this.time%60,t=Math.floor(this.time/60);return t.toString().padStart(2,"0")+":"+e.toString().padStart(2,"0")}}};var ae=l(35263),ce=l(44458),de=l(63190);const ue=(0,x.Z)(ne,[["render",le]]),oe=ue;A()(ne,"components",{QDialog:ae.Z,QCard:ce.Z,QCardSection:de.Z,QBtn:L.Z});l(76948);var re=l(31194);const me=(0,i.aZ)({components:{SudokuBoard:M,NumberBar:J,DifficultyRating:se.Z},name:"IndexPage",setup(){const e=(0,y.F)();return{settings:e,gameState:(0,W.k)()}},created(){this.gameState.eventBus.on("victory",(e=>{this.showVictory()})),this.gameState.eventBus.on("error",(e=>{this.showError(e.message)}))},data(){return{noteMode:!1,selectedCellId:null,numCount:Array(b.Ju.SIZE).fill(0),selectedValue:0}},methods:{showError(e){this.$q.notify({message:e,group:!1,type:"negative",timeout:1e3,actions:[{icon:"close",color:"white"}]})},showVictory(){const e=this.gameState.timer.time,t=this.$q.localStorage.getItem("victories")?.data??[];t.push({level:this.gameState.puzzle.seed,time:e,hintCount:this.gameState.hintCount,difficultyLevel:this.gameState.puzzle.difficultyLevel}),this.$q.localStorage.set("victories",{data:t}),this.$q.dialog({component:oe,componentProps:{puzzle:this.gameState.puzzle,time:e,hintCount:this.gameState.hintCount}}).onOk((async e=>{await this.generateLevel(e.difficultyLevel,e.seed)}))},onTapNumber(e){this.selectCellMode&&this.placeNumber(e),this.selectNumberMode&&(this.selectedValue=this.selectedValue!==e?e:0)},placeNumber(e){this.noteMode?this.gameState.placeNote(this.selectedCellId,e):this.gameState.placeNum(this.selectedCellId,e)},clearCell(){this.gameState.clearCell(this.selectedCellId)},hint(){this.gameState.hint()},cellClick(e){this.selectedCellId=e,this.selectNumberMode&&this.selectedValue&&!this.selectedCell.isStatic&&this.placeNumber(this.selectedValue)},cellUpdated(e,t,l){t&&this.numCount[t-1]++,l&&this.numCount[l-1]--},undo(){this.gameState.undo()},initializeSelectCellMode(){this.selectedValue=this.selectedCell?.value??0},initializeSelectNumberMode(){this.selectedValue=1}},computed:{boardSize(){return b.Ju.SIZE},selectedCell(){return this.gameState.puzzle.findCellById(this.selectedCellId)},activeNumbers(){return this.selectedCell?this.selectedCell.isStatic||this.selectedCell.value?[]:this.selectedCell.notes.values:[]},inactiveNumbers(){return this.settings.markImpossibleNumbers&&this.selectedCell?this.selectedCell.isStatic?Array(this.boardSize).fill(null).map(((e,t)=>t+1)):C.ZP.getSurroundingValues(this.gameState.puzzle,this.selectedCell):[]},puzzleTime(){const e=this.gameState.timer.time,t=0+e%60,l=0+Math.floor(e/60);return l.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")},completedNumbers(){return this.numCount.map(((e,t)=>e>=b.Ju.SIZE?t+1:null)).filter((e=>null!==e))},gameDifficulty(){return re.ZP[this.gameState.puzzle?.difficultyLevel??0]??re.ZP[0]},selectCellMode(){return!this.settings.placeNumbersOnSelect},selectNumberMode(){return!this.selectCellMode}},watch:{"selectedCell.value"(){this.selectCellMode&&(this.selectedValue=this.selectedCell.value)},selectCellMode:{handler(e){!0===e&&this.initializeSelectCellMode()},immediate:!0},selectNumberMode:{handler(e){!0===e&&this.initializeSelectNumberMode()},immediate:!0}}});var pe=l(69885),he=l(90136),ge=l(23175);const be=(0,x.Z)(me,[["render",p],["__scopeId","data-v-626d90fc"]]),Ce=be;A()(me,"components",{QPage:pe.Z,QSpace:he.Z,QBtn:L.Z,QToggle:ge.Z})}}]);