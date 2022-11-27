"use strict";(globalThis["webpackChunkjs_sudoku"]=globalThis["webpackChunkjs_sudoku"]||[]).push([[583],{10098:(e,t,l)=>{l.d(t,{F:()=>n});var s=l(81809),i=l(60499);const o=JSON.parse('{"cb":0,"G1":2,"OD":4}'),n=(0,s.Q_)("settings",(()=>{const e=(0,i.iH)(!0),t=(0,i.iH)(!0),l=(0,i.iH)(!0),s=`v${o.cb}.${o.G1}.${o.OD}`;return{showErrors:e,showTime:t,showHints:l,version:s}}))},14583:(e,t,l)=>{l.r(t),l.d(t,{default:()=>Ft});var s=l(59835),i=l(61957),o=l(86970);const n={style:{padding:"10px"}},r={id:"bottom-bar",class:"flex column full-width"},a={id:"info-bar",class:"flex row full-width q-px-sm"},u={class:"text-caption q-mr-sm flex flex-center"},c={class:"text-caption flex-center"},d={id:"action-bar",class:"full-width"},h={id:"mode-bar",class:"row q-pa-sm"};function m(e,t,l,m,p,g){const v=(0,s.up)("sudoku-board"),w=(0,s.up)("timer"),f=(0,s.up)("q-space"),C=(0,s.up)("q-icon"),S=(0,s.up)("q-btn"),y=(0,s.up)("q-toggle"),z=(0,s.up)("number-bar"),b=(0,s.up)("settings-dialog"),k=(0,s.up)("q-page");return e.puzzle?((0,s.wg)(),(0,s.j4)(k,{key:0,id:"page"},{default:(0,s.w5)((()=>[(0,s._)("div",n,[((0,s.wg)(),(0,s.j4)(v,{ref:"sudoku",puzzle:e.puzzle,key:e.renderKey,size:"4.8vw",onCellSelected:e.cellSelected},null,8,["puzzle","onCellSelected"]))]),(0,s._)("div",r,[(0,s._)("div",a,[(0,s.wy)((0,s.Wm)(w,{ref:"timer",initialValue:e.initalTime,class:"text-caption flex-center"},null,8,["initialValue"]),[[i.F8,e.settings.showTime]]),(0,s.Wm)(f),(0,s._)("div",u,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.puzzle.difficultyLevel+1,(e=>((0,s.wg)(),(0,s.j4)(C,{key:e,name:"star",color:"yellow"})))),128))]),(0,s._)("div",c,"Hints "+(0,o.zw)(e.hintCount),1)]),(0,s._)("div",d,[(0,s._)("div",h,[(0,s.Wm)(S,{icon:"settings",round:"",flat:"",size:"md",onClick:t[0]||(t[0]=()=>{e.showSettings=!0})}),(0,s.Wm)(f),(0,s.Wm)(S,{icon:"undo",flat:"",round:"",size:"md",onClick:e.undo},null,8,["onClick"]),(0,s.wy)((0,s.Wm)(S,{icon:"lightbulb",flat:"",round:"",size:"md",onClick:e.hint},null,8,["onClick"]),[[i.F8,e.settings.showHints]]),(0,s.Wm)(y,{modelValue:e.noteMode,"onUpdate:modelValue":t[1]||(t[1]=t=>e.noteMode=t),icon:"edit",color:"positive"},null,8,["modelValue"]),(0,s.Wm)(S,{icon:"backspace",flat:"",round:"",size:"md",onClick:e.clearCell},null,8,["onClick"])]),(0,s.Wm)(z,{size:9,onClick:e.placeNumber,activeNumbers:e.activeNumbers},null,8,["onClick","activeNumbers"])])]),(0,s.Wm)(b,{modelValue:e.showSettings,"onUpdate:modelValue":t[2]||(t[2]=t=>e.showSettings=t),puzzle:e.puzzle,onResetGame:e.resetGame,onNewLevel:e.newLevel},null,8,["modelValue","puzzle","onResetGame","onNewLevel"])])),_:1})):(0,s.kq)("",!0)}l(69665);const p={class:"text-h6"},g={id:"board"};function v(e,t,l,i,n,r){const a=(0,s.up)("sudoku-cell");return(0,s.wg)(),(0,s.iD)("div",null,[(0,s._)("div",p,"Sudoku #"+(0,o.zw)(e.puzzle.seed),1),(0,s._)("div",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.boardSize,((t,l)=>((0,s.wg)(),(0,s.iD)("div",{key:l,class:"square"},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.getSquareCells(l),(t=>((0,s.wg)(),(0,s.j4)(a,{key:t.id,puzzle:e.puzzle,cell:t,isSelected:e.selectedCellId===t.id,isSquareHighlighted:t.square.index===e.selectedCell?.square.index,isCrossHighlighted:t.row.index===e.selectedCell?.row.index||t.column.index===e.selectedCell?.column.index,onSelect:()=>e.onSelectCell(t.id),size:e.size},null,8,["puzzle","cell","isSelected","isSquareHighlighted","isCrossHighlighted","onSelect","size"])))),128))])))),128))])])}var w=l(727),f=l.n(w),C=l(75105),S=l.n(C),y=l(10357),z=l.n(y),b=l(42768),k=l.n(b),_=l(38761),q=l.n(_),E=l(33782),Z=l.n(E);class I{static getId(){var e;return Z()(I,I,x,(e=f()(I,I,x),++e))}}var x={writable:!0,value:0};function V(e){return function(){var t=e+=1831565813;return t=Math.imul(t^t>>>15,1|t),t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296}}var N=new WeakMap,W=new WeakMap;class H{get seed(){return k()(this,N)}next(){return k()(this,W).call(this)}constructor(e,t){S()(this,N,{writable:!0,value:void 0}),S()(this,W,{writable:!0,value:void 0}),void 0===e&&(e=Math.floor(4294967296*Math.random())),z()(this,N,e);const l=3735928559*e%4294967296,s=t||V;z()(this,W,s(l))}}function B(e,t,l){const s=e[t];e[t]=e[l],e[l]=s}function M(e,t){for(var l=0;l<e.length;l++){const s=Math.floor(t.next()*e.length);B(e,l,s)}}l(6822);class D{get(e){return void 0!==this.data[e]?this.data[e]:this.parent?this.parent.get(e):void 0}set(e,t){if(void 0===t)throw new Error("UNDEF?");this.data[e]=t}clone(){const e=new D(this.size);return e.parent=this,e}constructor(e){q()(this,"parent",void 0),q()(this,"data",void 0),q()(this,"size",void 0),this.id=I.getId(),this.parent=null,this.data=[],this.size=e,this.get=this.get.bind(this),this.set=this.set.bind(this),this.clone=this.clone.bind(this)}}class L{static getValue(e,t,l){const[s,i]=t.get(l);return e.getCell(s,i)}static setValue(e,t,l,s){const[i,o]=t.get(l);e.setCell(i,o,s)}static isValid(e,t){const l=[];for(var s=0;s<O.SIZE;s++){const i=L.getValue(e,t,s);if(!i)return!1;const o=i-1;if(void 0!==l[o])return!1;l[o]=!0}return!0}static includesValue(e,t,l){for(var s=0;s<O.SIZE;s++){const i=L.getValue(e,t,s);if(i===l)return!0}return!1}get(e){}constructor(e){q()(this,"index",void 0),this.id=I.getId(),this.index=e,this.get=this.get.bind(this)}}class U extends L{constructor(...e){super(...e),q()(this,"type","col")}get(e){const t=this.index,l=e;return[t,l]}}class $ extends L{constructor(...e){super(...e),q()(this,"type","row")}get(e){const t=e,l=this.index;return[t,l]}}var Q=new WeakMap,T=new WeakMap;class A extends L{get(e){const t=e%O.BASE_NUMBER,l=Math.floor(e/O.BASE_NUMBER),s=k()(this,Q)+t,i=k()(this,T)+l;return[s,i]}constructor(e){super(e),q()(this,"type","square"),S()(this,Q,{writable:!0,value:void 0}),S()(this,T,{writable:!0,value:void 0}),z()(this,Q,this.index%O.BASE_NUMBER*O.BASE_NUMBER),z()(this,T,Math.floor(this.index/O.BASE_NUMBER)*O.BASE_NUMBER)}}class O{static get CELL_COUNT(){return O.SIZE*O.SIZE}static get SIZE(){return O.BASE_NUMBER*O.BASE_NUMBER}static get BASE_NUMBER(){return 3}static get rows(){return f()(this,O,j)}static get columns(){return f()(this,O,G)}static get squares(){return f()(this,O,R)}static getRow(e,t){return O.rows[t]}static getColumn(e,t){return O.columns[e]}static getSquare(e,t){const l=Math.floor(e/O.BASE_NUMBER),s=Math.floor(t/O.BASE_NUMBER),i=l+s*O.BASE_NUMBER;return O.squares[i]}}var j={writable:!0,value:Array(O.SIZE).fill(null).map(((e,t)=>new $(t)))},G={writable:!0,value:Array(O.SIZE).fill(null).map(((e,t)=>new U(t)))},R={writable:!0,value:Array(O.SIZE).fill(null).map(((e,t)=>new A(t)))};class F{static randomSkeleton(e){const t=new F,l=[0,4,8];for(var s=0;s<l.length;s++){const o=O.squares[l[s]],n=[...Array(O.SIZE).keys()];M(n,e);for(var i=0;i<O.SIZE;i++)L.setValue(t,o,i,n[i])}return t}getCell(e,t){return this.cells.get(e*O.SIZE+t)??0}setCell(e,t,l){return this.cells.set(e*O.SIZE+t,l)}clone(){const e=new F;return e.cells=this.cells.clone(),e}duplicate(){const e=new F;for(var t=0;t<O.CELL_COUNT;t++){const l=this.cells.get(t);e.cells.set(t,l)}return e}import(e){this.cells=e.cells}isFinished(){for(var e=0;e<O.CELL_COUNT;e++)if(!this.cells.get(e))return!1;return!0}isValid(){for(var e=0;e<O.SIZE;e++){const t=[O.rows[e],O.columns[e],O.squares[e]],l=t.reduce(((e,t)=>e&&L.isValid(this,t)),!0);if(!l)return!1}return!0}print(){for(var e=0;e<O.SIZE;e++){O.rows[e];for(var t=e+": ",l=0;l<O.SIZE;l++){const s=this.getCell(l,e).toString();t+=s}console.log(t)}console.log("\n\n")}constructor(){q()(this,"cells",void 0),this.id=I.getId(),this.cells=new D(O.CELL_COUNT),this.getCell=this.getCell.bind(this),this.setCell=this.setCell.bind(this),this.clone=this.clone.bind(this),this.duplicate=this.duplicate.bind(this),this.import=this.import.bind(this),this.isFinished=this.isFinished.bind(this),this.isValid=this.isValid.bind(this)}}var Y=l(79559),K=l.n(Y),P=(l(46727),l(60499));class J{get x(){return this._x}get y(){return this._y}constructor(e,t){q()(this,"_x",void 0),q()(this,"_y",void 0),this._x=e,this._y=t}}class X{hasValue(e){return this.values.includes(e)}addValue(e){this.hasValue(e)||this.values.push(e)}removeValue(e){const t=this.values.indexOf(e);t<0||this.values.splice(t,1)}swapValue(e){this.hasValue(e)?this.removeValue(e):this.addValue(e)}constructor(){q()(this,"values",void 0),this.values=(0,P.qj)([]),this.hasValue=this.hasValue.bind(this),this.addValue=this.addValue.bind(this),this.removeValue=this.removeValue.bind(this),this.swapValue=this.swapValue.bind(this)}}class ee{get position(){return this._position}get isStatic(){return this._isStatic}get row(){return this._row}get column(){return this._column}get square(){return this._square}get id(){return this.position.x+this.position.y*O.SIZE+1}hasValue(){return this.value>0}constructor(e,t){q()(this,"value",void 0),q()(this,"_position",void 0),q()(this,"_isStatic",void 0),q()(this,"_row",void 0),q()(this,"_column",void 0),q()(this,"_square",void 0),q()(this,"notes",void 0),this._position=e,this.value=t,this.notes=new X,this._isStatic=this.hasValue(),this.hasValue=this.hasValue.bind(this),K()(ee,ee,te).call(ee,this)}}function te(e){e._row=O.rows[e.position.y],e._column=O.columns[e.position.x],e._square=O.squares[Math.floor(e.position.x/O.BASE_NUMBER)+Math.floor(e.position.y/O.BASE_NUMBER)*O.BASE_NUMBER]}class le{static serialize(e){const t={cells:e.cells.map((e=>({value:e.value,x:e.position.x,y:e.position.y,notes:e.notes.values,static:e.isStatic}))),seed:e.seed,solution:e.solution,difficultyLevel:e.difficultyLevel};return t}static deserialize(e){if(null===e)return null;const t=new le;return t.cells=e.cells.map((e=>{const t=new J(e.x,e.y),l=(0,P.qj)(new ee(t,e.static?e.value:0));return e.static||(l.value=e.value),e.notes.forEach((e=>l.notes.addValue(e))),l})),t.seed=e.seed,t.solution=e.solution,t.difficultyLevel=e.difficultyLevel,t}static toIndex(e){return e.x+e.y*O.SIZE}getCell(e){const t=le.toIndex(e);return this.cells[t]}getSolutionValue(e){const t=le.toIndex(e);return this.solution[t]}findCellById(e){if(e)return this.cells.find((t=>t.id===e))}static fromBoard(e,t,l){const s=new le;s.seed=l;for(var i=0;i<O.SIZE;i++)for(var o=0;o<O.SIZE;o++){const l=t.getCell(i,o),n=e.getCell(i,o),r=new J(i,o),a=le.toIndex(r);s.solution[a]=l;const u=(0,P.qj)(new ee(r,n));s.cells[a]=u}return s}constructor(){q()(this,"cells",void 0),q()(this,"solution",void 0),q()(this,"difficultyLevel",void 0),this.cells=[],this.solution=[]}}const se={key:1},ie={key:1,id:"notes"};function oe(e,t,l,i,n,r){return(0,s.wg)(),(0,s.iD)("div",{class:(0,o.C_)(["cell",{static:e.cell.isStatic,selected:e.isSelected,"square-highlight":!e.isSelected&&e.isSquareHighlighted,"cross-highlight":!e.isSelected&&e.isCrossHighlighted,error:e.settings.showErrors&&e.isError}]),onClick:t[0]||(t[0]=()=>{e.isSelected||e.$emit("select",e.x,e.y)})},[0!==e.cell.value?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[e.cell.isStatic?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s.Uk)((0,o.zw)(e.cell.value),1)],64)):((0,s.wg)(),(0,s.iD)("span",se,(0,o.zw)(e.cell.value),1))],64)):((0,s.wg)(),(0,s.iD)("div",ie,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.notes,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{key:t,class:"note"},(0,o.zw)(e?t+1:""),1)))),128))]))],2)}var ne=l(10098);const re=(0,s.aZ)({name:"SudokuCell",emits:["select"],props:{puzzle:{type:le,required:!0},cell:{type:ee,required:!0},isSelected:{type:Boolean,default:!1},isSquareHighlighted:{type:Boolean,default:!1},isCrossHighlighted:{type:Boolean,default:!1},size:{type:String,default:"1.0em"}},setup(){const e=(0,ne.F)();return{settings:e}},computed:{boardSize(){return O.SIZE},isError(){return this.cell.value>0&&this.cell.value!==this.puzzle.getSolutionValue(this.cell.position)},notes(){return Array(this.boardSize).fill(null).map(((e,t)=>this.cell.notes.hasValue(t+1)))}},watch:{}}),ae=()=>{(0,i.sj)((e=>({"53f3ddd7":e.size,"2d0722ce":e.weight})))},ue=re.setup;re.setup=ue?(e,t)=>(ae(),ue(e,t)):ae;const ce=re;var de=l(11639);const he=(0,de.Z)(ce,[["render",oe],["__scopeId","data-v-6f4975f3"]]),me=he,pe=(0,s.aZ)({components:{SudokuCell:me},name:"SodukuBoard",props:{puzzle:{type:le,required:!0},size:{type:String,default:"1.0em"}},emits:["cellSelected"],data(){return{selectedCellId:null}},methods:{onSelectCell(e){this.selectedCellId=e,this.$emit("cellSelected",e)},getSquareCells(e){return Array(O.SIZE).fill(null).map(((t,l)=>{const[s,i]=O.squares[e].get(l),o=new J(s,i),n=le.toIndex(o);return this.puzzle.cells[n]}))}},computed:{boardSize(){return O.SIZE},selectedCellIndex(){return this.puzzle.cells.findIndex((e=>e.id===this.selectedCellId))},selectedCell(){return this.selectedCellIndex>-1?this.puzzle.cells[this.selectedCellIndex]:null}}}),ge=(0,de.Z)(pe,[["render",v],["__scopeId","data-v-72cb4550"]]),ve=ge,we={class:"text-subtitle2"};function fe(e,t,l,i,n,r){const a=(0,s.up)("q-item-label"),u=(0,s.up)("q-item-section"),c=(0,s.up)("q-toggle"),d=(0,s.up)("q-item"),h=(0,s.up)("q-list"),m=(0,s.up)("q-card-section"),p=(0,s.up)("q-btn"),g=(0,s.up)("q-separator"),v=(0,s.up)("q-card-actions"),w=(0,s.up)("q-card"),f=(0,s.up)("q-dialog"),C=(0,s.Q2)("ripple"),S=(0,s.Q2)("close-popup");return(0,s.wg)(),(0,s.j4)(f,{modelValue:e.show,"onUpdate:modelValue":t[0]||(t[0]=t=>e.show=t)},{default:(0,s.w5)((()=>[(0,s.Wm)(w,{style:{width:"80vw"}},{default:(0,s.w5)((()=>[(0,s.Wm)(m,null,{default:(0,s.w5)((()=>[(0,s.Wm)(h,{style:{"font-size":"1.2em"}},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{header:""},{default:(0,s.w5)((()=>[(0,s.Uk)("Options")])),_:1}),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.settingsToggles,(e=>(0,s.wy)(((0,s.wg)(),(0,s.j4)(d,{class:"text-body1",clickable:"",key:e.name,onClick:()=>e.prop.value=!e.prop.value},{default:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Uk)((0,o.zw)(e.name),1)])),_:2},1024),(0,s.Wm)(u,{side:""},{default:(0,s.w5)((()=>[(0,s.Wm)(c,{modelValue:e.prop.value,"onUpdate:modelValue":t=>e.prop.value=t,icon:e.icon},null,8,["modelValue","onUpdate:modelValue","icon"])])),_:2},1024)])),_:2},1032,["onClick"])),[[C]]))),128))])),_:1})])),_:1}),(0,s.Wm)(m,{class:"q-gutter-y-md"},{default:(0,s.w5)((()=>[(0,s._)("div",we,"Current level: "+(0,o.zw)(e.puzzle.seed),1),(0,s.Wm)(p,{label:"Clear data",flat:"",color:"negative",class:"full-width",onClick:e.clearCache},null,8,["onClick"]),(0,s.Wm)(p,{label:"Retry level",flat:"",color:"negative",class:"full-width",onClick:e.resetGame},null,8,["onClick"]),(0,s.Wm)(p,{label:"New level",flat:"",color:"primary",class:"full-width",onClick:e.newGame},null,8,["onClick"]),(0,s.Wm)(p,{label:"History",flat:"",color:"primary",class:"full-width",onClick:e.showHistory},null,8,["onClick"])])),_:1}),(0,s.Wm)(g),(0,s.Wm)(v,{align:"right"},{default:(0,s.w5)((()=>[(0,s.wy)((0,s.Wm)(p,{flat:"",color:"primary",label:"Close"},null,512),[[S]])])),_:1})])),_:1})])),_:1},8,["modelValue"])}function Ce(e,t,l,i,o,n){const r=(0,s.up)("q-input"),a=(0,s.up)("q-card-section"),u=(0,s.up)("q-space"),c=(0,s.up)("q-icon"),d=(0,s.up)("q-btn"),h=(0,s.up)("q-card"),m=(0,s.up)("q-dialog");return(0,s.wg)(),(0,s.j4)(m,{ref:"dialog",onHide:n.onDialogHide},{default:(0,s.w5)((()=>[(0,s.Wm)(h,{class:"q-dialog-plugin"},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{class:"text-h6"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Level "),(0,s.Wm)(r,{modelValue:i.levelNumber,"onUpdate:modelValue":t[0]||(t[0]=e=>i.levelNumber=e),mask:"##########","input-style":"text-align: center; font-size: 2em",rules:[e=>parseInt(e).toString()===e&&parseInt(e)<4294967296]},null,8,["modelValue","rules"])])),_:1}),(0,s.Wm)(a,{class:"text-h6"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Niveau ")])),_:1}),(0,s.Wm)(a,{class:"q-gutter-y-md"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.difficultyLevels,(e=>((0,s.wg)(),(0,s.j4)(d,{key:e.level,color:"primary",outline:"",size:"lg",align:"left",label:e.name,class:"full-width",onClick:()=>n.onOKClick(e.level)},{default:(0,s.w5)((()=>[(0,s.Wm)(u),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.level+1,(e=>((0,s.wg)(),(0,s.j4)(c,{key:e,name:"star",color:"yellow"})))),128))])),_:2},1032,["label","onClick"])))),128))])),_:1}),(0,s.Wm)(a,null,{default:(0,s.w5)((()=>[(0,s.Wm)(d,{label:"Cancel",class:"full-width",color:"negative",onClick:n.onCancelClick},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}const Se={name:"NewLevelDialog",props:{},emits:["ok","hide"],setup(){return{difficultyLevels:[{name:"Easy",level:0},{name:"Medium",level:1},{name:"Hard",level:2},{name:"Extra Hard",level:3}],levelNumber:(0,P.iH)(Math.floor(4294967296*Math.random()))}},methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},onOKClick(e){""===this.levelNumber&&(this.levelNumber=Math.floor(4294967296*Math.random())),this.$emit("ok",{level:e,seed:this.levelNumber}),this.hide()},onCancelClick(){this.hide()}}};var ye=l(7657),ze=l(44458),be=l(63190),ke=l(31169),_e=l(24455),qe=l(90136),Ee=l(22857),Ze=l(69984),Ie=l.n(Ze);const xe=(0,de.Z)(Se,[["render",Ce]]),Ve=xe;Ie()(Se,"components",{QDialog:ye.Z,QCard:ze.Z,QCardSection:be.Z,QInput:ke.Z,QBtn:_e.Z,QSpace:qe.Z,QIcon:Ee.Z});const Ne={class:"text-center"},We={class:"text-left"},He={class:"row items-center text-left"},Be={class:"text-left"},Me={key:1,class:"text-body1"};function De(e,t,l,i,n,r){const a=(0,s.up)("q-card-section"),u=(0,s.up)("q-icon"),c=(0,s.up)("q-markup-table"),d=(0,s.up)("q-btn"),h=(0,s.up)("q-card"),m=(0,s.up)("q-dialog");return(0,s.wg)(),(0,s.j4)(m,{ref:"dialog",onHide:r.onDialogHide,persistent:""},{default:(0,s.w5)((()=>[(0,s.Wm)(h,{class:"q-dialog-plugin q-pa-sm"},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{class:"text-h4"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Victories ")])),_:1}),(0,s.Wm)(a,{class:"q-my-md text-h6"},{default:(0,s.w5)((()=>[l.victories.length?((0,s.wg)(),(0,s.j4)(c,{key:0,separator:"horizontal",flat:"",bordered:"",class:"text-subtitle2"},{default:(0,s.w5)((()=>[(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.victories,((e,t)=>((0,s.wg)(),(0,s.iD)("tr",{key:t},[(0,s._)("td",Ne,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.difficultyLevel+1,(e=>((0,s.wg)(),(0,s.j4)(u,{key:e,name:"star",color:"yellow"})))),128))]),(0,s._)("td",We,"#"+(0,o.zw)(e.level),1),(0,s._)("td",He,[(0,s.Wm)(u,{name:"o_lightbulb",outline:""}),(0,s.Uk)(" "+(0,o.zw)(e.hintCount),1)]),(0,s._)("td",Be,(0,o.zw)(this.displayTime(e.time)),1)])))),128))])])),_:1})):((0,s.wg)(),(0,s.iD)("div",Me,"No items in this list"))])),_:1}),(0,s.Wm)(a,{align:"right"},{default:(0,s.w5)((()=>[(0,s.Wm)(d,{label:"Close",outline:"",color:"primary",onClick:r.hide},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}const Le={name:"VictoryHistoryScreen",props:{victories:{type:Array,required:!0}},emits:["ok","hide"],methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},displayTime(e){const t=e%60,l=Math.floor(e/60);return l.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")}}};var Ue=l(66933);const $e=(0,de.Z)(Le,[["render",De]]),Qe=$e;Ie()(Le,"components",{QDialog:ye.Z,QCard:ze.Z,QCardSection:be.Z,QMarkupTable:Ue.Z,QIcon:Ee.Z,QBtn:_e.Z});const Te=(0,s.aZ)({name:"SettingsDialog",props:{modelValue:{type:Boolean,required:!0},puzzle:{type:le,required:!0}},emits:["update:modelValue","resetGame","newLevel"],setup(){const e=(0,ne.F)(),t=[{name:"Timer",icon:"timer",prop:(0,s.Fl)({get:()=>e.showTime,set:t=>e.showTime=t})},{name:"Highlight errors",icon:"error",prop:(0,s.Fl)({get:()=>e.showErrors,set:t=>e.showErrors=t})},{name:"Allow hints",icon:"lightbulb",prop:(0,s.Fl)({get:()=>e.showHints,set:t=>e.showHints=t})}];return{settings:e,settingsToggles:t}},methods:{resetGame(){this.$q.dialog({title:"Warning",message:"Are you sure? You cannot reverse this action.",cancel:!0,persistent:!0,ok:{label:"Continue",color:"negative"}}).onOk((()=>{this.$emit("resetGame"),this.show=!1}))},clearCache(){this.$q.dialog({title:"Warning",message:"Are you sure? This will remove your current save game and the victory history. You cannot reverse this action.",cancel:!0,persistent:!0,ok:{label:"Continue",color:"negative"}}).onOk((()=>{this.$q.localStorage.clear(),location.reload()}))},newGame(){this.$q.dialog({component:Ve,componentProps:{text:"something"}}).onOk((e=>{this.$emit("newLevel",e),this.show=!1}))},showHistory(){this.$q.dialog({component:Qe,componentProps:{victories:this.$q.localStorage.getItem("victories")?.data??[]}})}},computed:{show:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}}}});var Ae=l(13246),Oe=l(33115),je=l(490),Ge=l(76749),Re=l(23175),Fe=l(50926),Ye=l(11821),Ke=l(51136),Pe=l(62146);const Je=(0,de.Z)(Te,[["render",fe]]),Xe=Je;Ie()(Te,"components",{QDialog:ye.Z,QCard:ze.Z,QCardSection:be.Z,QList:Ae.Z,QItemLabel:Oe.Z,QItem:je.Z,QItemSection:Ge.Z,QToggle:Re.Z,QBtn:_e.Z,QSeparator:Fe.Z,QCardActions:Ye.Z}),Ie()(Te,"directives",{Ripple:Ke.Z,ClosePopup:Pe.Z});var et=l(37628),tt=l.n(et),lt=l(40559),st=l.n(lt);l(58672);class it{static getOptionCount(e){for(var t=0,l=0;l<O.SIZE;l++)e.get(l)&&t++;return t}static getOptionValues(e){const t=[];for(var l=0;l<O.SIZE;l++)e.get(l)&&t.push(l+1);return t}getCellWithLeastOptions(){for(var e=O.SIZE+1,t=null,l=0;l<O.SIZE;l++)for(var s=0;s<O.SIZE;s++){if(this.board.getCell(s,l))continue;const i=this.getNotesForCell(s,l),o=it.getOptionCount(i);if(2===o)return[s,l];o<e&&(t=[s,l],e=o)}return t}getNotesForCell(e,t){return this.cellnotes[e+t*O.SIZE]}setup(){for(var e=0;e<O.SIZE;e++)for(var t=0;t<O.SIZE;t++)this.cellnotes.push(K()(it,it,ot).call(it,this.board,t,e))}clone(e){const t=new it(e);return t.cellnotes=this.cellnotes.map((e=>e.clone())),t}static fromBoard(e){const t=new it(e);return t.setup(),t}constructor(e){q()(this,"cellnotes",void 0),this.id=I.getId(),this.cellnotes=[],this.board=e,this.setup=this.setup.bind(this),this.clone=this.clone.bind(this)}}function ot(e,t,l){const s=new D;if(e.getCell(t,l))return s;for(var i=0;i<O.SIZE;i++){const o=[O.getRow(t,l),O.getColumn(t,l),O.getSquare(t,l)],n=i+1,r=o.reduce(((t,l)=>t&&!L.includesValue(e,l,n)),!0);s.set(i,r)}return s}function nt(e,t){const l=new H(t),s=F.randomSkeleton(l),i=new dt,o=i.getSolutions(s,1,l)[0];if(!o)throw new Error("Error creating new solution");const n=Array(O.SIZE).fill(null).map(((e,t)=>[...Array(O.SIZE).keys()].map((e=>[e,t])))).reduce(((e,t)=>e.concat(t)),[]);M(n,l);var r=0;const a=o.duplicate();for(var u=0;u<n.length;u++){const[t,s]=n[u],o=a.getCell(t,s);a.setCell(t,s,0);const c=i.getSolutions(a,2,l);if(c.length>1)a.setCell(t,s,o);else if(r++,r>=e)break}return[o,a,l.seed]}class rt extends Error{constructor(e){super(e),this.name="SolutionError"}}var at=new WeakSet,ut=new WeakSet,ct=new WeakSet;class dt{constructor(e){tt()(this,ct),tt()(this,ut),tt()(this,at),q()(this,"board",void 0),this.id=I.getId(),this.board=e}boardCompare(e,t){const l=O.CELL_COUNT;for(var s=0;s<l;s++){e.cells.get(s),t.cells.get(s)}return!0}notebookCompare(e,t){const l=O.CELL_COUNT;for(var s=0;s<l;s++){const l=it.getOptionValues(e.cellnotes[s]),i=it.getOptionValues(t.cellnotes[s]),o=l.reduce(((e,t,l)=>{const s=i[l];return e&&t===s}),!0);if(!o)return!1}return!0}getSolutions(e,t,l,s,i,o){i=!1!==i,t=t||1,l=l??new H,o=o??0;const n=i?e.clone():e,r=i&&s?s.clone(n):it.fromBoard(n);try{st()(this,ct,pt).call(this,r,l)}catch(p){if(p instanceof rt)return console.debug(p.message),[];throw p}if(n.isFinished())return n.isValid()?[n]:[];const[a,u]=r.getCellWithLeastOptions(),c=r.getNotesForCell(a,u),d=it.getOptionValues(c);for(var h=[],m=0;m<d.length;m++){const e=d[m],s=n.clone(),i=r.clone(s);st()(this,ut,mt).call(this,i,a,u,e);const c=this.getSolutions(s,t,l,i,!1,o+h.length);if(h=h.concat(c),h.length+o>=t)return h}return h}}function ht(e,t,l){if(e.board.getCell(t,l))return!1;const s=e.getNotesForCell(t,l),i=it.getOptionValues(s);if(i.length>1)return!1;if(0===i.length)throw new rt(`Cell ${t}, ${l} cannot be filled`);return st()(this,ut,mt).call(this,e,t,l,i[0]),!0}function mt(e,t,l,s){e.board.setCell(t,l,s);const i=[O.getRow(t,l),O.getColumn(t,l),O.getSquare(t,l)];i.forEach((t=>{for(var l=0;l<O.SIZE;l++){const[i,o]=t.get(l),n=e.getNotesForCell(i,o);n.set(s-1,!1),st()(this,at,ht).call(this,e,i,o)}}))}function pt(e,t){var l=!1;const s=Array(O.SIZE).fill(null).map(((t,l)=>[...Array(O.SIZE).keys()].filter((t=>!e.board.getCell(t,l))).map((e=>[e,l])))).reduce(((e,t)=>e.concat(t)),[]);return M(s,t),s.forEach((([t,s])=>{st()(this,at,ht).call(this,e,t,s)&&(l=!0)})),l}function gt(e,t,l,i,n,r){return(0,s.wg)(),(0,s.iD)("div",null,(0,o.zw)(e.time),1)}var vt=l(19302);function wt(e,t){const l=parseInt(e);return isNaN(l)?t:l}const ft=(0,s.aZ)({name:"Timer",emits:["update"],exposes:["reset","getTime"],props:{initialValue:{type:Number,default:0}},setup(e,t){const l=(0,vt.Z)(),i=(0,P.iH)(wt(e.initialValue,0)),o=(0,P.iH)(0),n=()=>{i.value++,t.emit("update",i.value)};return(0,s.YP)((()=>l.appVisible),(e=>{e?o.value=window.setInterval(n,1e3):window.clearInterval(o.value),console.debug(e?"App became visible":"App went in the background")}),{immediate:!0}),{seconds:i,timer:o}},methods:{reset(){this.seconds=0},getTime(){return this.seconds}},computed:{time(){const e=this.seconds%60,t=Math.floor(this.seconds/60);return t.toString().padStart(2,"0")+":"+e.toString().padStart(2,"0")}}}),Ct=(0,de.Z)(ft,[["render",gt]]),St=Ct,yt={id:"number-bar"},zt={style:{display:"flex","flex-direction":"column"}};function bt(e,t,l,i,n,r){const a=(0,s.up)("q-icon"),u=(0,s.up)("q-btn");return(0,s.wg)(),(0,s.iD)("div",yt,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(Math.ceil(e.size/2),(t=>((0,s.wg)(),(0,s.iD)("div",{key:t},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.columnNumbers(t),(t=>((0,s.wg)(),(0,s.j4)(u,{key:t,size:"xl",color:"white",outline:"",padding:"none",class:"number-btn",onClick:()=>e.$emit("click",t)},{default:(0,s.w5)((()=>[(0,s._)("div",zt,[(0,s.Uk)((0,o.zw)(t)+" ",1),(0,s.Wm)(a,{color:e.activeNumbers.includes(t)?"":"transparent",name:"close",class:"number-icon q-pa-none q-ma-none",padding:"none",size:"sm"},null,8,["color"])])])),_:2},1032,["onClick"])))),128))])))),128))])}const kt=(0,s.aZ)({name:"NumberBar",props:{size:{type:Number,required:!0},activeNumbers:{type:Array,default:()=>[]}},emits:["click"],setup(){},methods:{columnNumbers(e){const t=e,l=e+Math.ceil(this.size/2);return l>this.size?[t]:[t,l]}}}),_t=(0,de.Z)(kt,[["render",bt],["__scopeId","data-v-f94a6358"]]),qt=_t;Ie()(kt,"components",{QBtn:_e.Z,QIcon:Ee.Z});var Et=new WeakMap,Zt=new WeakMap,It=new WeakMap;class xt{get cellId(){return k()(this,Et)}get value(){return k()(this,Zt)}get mode(){return k()(this,It)}constructor(e,t,l){S()(this,Et,{writable:!0,value:void 0}),S()(this,Zt,{writable:!0,value:void 0}),S()(this,It,{writable:!0,value:void 0}),z()(this,Et,e),z()(this,Zt,t),z()(this,It,l)}}class Vt{static serialize(e){return e.data.map((e=>({cellId:e.cellId,value:e.value,mode:e.mode})))}static deserialize(e){if(null===e)return null;try{const t=new Vt;return e.forEach((e=>{t.store(e.cellId,e.value,e.mode)})),t}catch(t){return console.warn("Cannot deserialize",e,t),null}}clear(){this.data.length=0}rollBack(){return 0===this.data.length?null:this.data.pop()}store(e,t,l){const s=new xt(e,t,l);this.data.push(s)}get size(){return this.data.length}constructor(){q()(this,"data",void 0),this.data=[]}}const Nt={class:"text-h6 row items-center"},Wt={class:"q-ml-sm"},Ht={class:"text-h6 row items-center"},Bt={class:"q-ml-sm"},Mt={class:"text-h6 row items-center"},Dt={class:"q-ml-sm"},Lt={class:"text-h6 row items-center"},Ut={class:"q-ml-sm"};function $t(e,t,l,i,n,r){const a=(0,s.up)("q-card-section"),u=(0,s.up)("q-icon"),c=(0,s.up)("q-btn"),d=(0,s.up)("q-card"),h=(0,s.up)("q-dialog");return(0,s.wg)(),(0,s.j4)(h,{ref:"dialog",onHide:r.onDialogHide,persistent:""},{default:(0,s.w5)((()=>[(0,s.Wm)(d,{class:"q-dialog-plugin q-pa-sm"},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{class:"text-h2"},{default:(0,s.w5)((()=>[(0,s.Uk)(" You Won! ")])),_:1}),(0,s.Wm)(a,{class:"q-gutter-y-md text-h6"},{default:(0,s.w5)((()=>[(0,s._)("div",Nt,[(0,s.Uk)(" Difficulty: "),(0,s._)("span",Wt,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.puzzle.difficultyLevel+1,(e=>((0,s.wg)(),(0,s.j4)(u,{key:e,name:"star",color:"yellow"})))),128))])]),(0,s._)("div",Ht,[(0,s.Uk)(" Hints: "),(0,s._)("span",Bt,(0,o.zw)(l.hintCount),1)]),(0,s._)("div",Mt,[(0,s.Uk)(" Time Taken: "),(0,s._)("span",Dt,(0,o.zw)(r.displayTime),1)]),(0,s._)("div",Lt,[(0,s.Uk)(" Level: "),(0,s._)("span",Ut,"#"+(0,o.zw)(l.puzzle.seed),1)])])),_:1}),(0,s.Wm)(a,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c,{label:"Play Another",class:"full-width",size:"lg",color:"primary",onClick:r.nextLevel},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}const Qt={name:"VictoryScreen",props:{puzzle:{type:le,required:!0},time:{type:Number,required:!0},hintCount:{type:Number,required:!0}},emits:["ok","hide"],methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},nextLevel(){this.$q.dialog({component:Ve}).onOk((e=>{this.$emit("ok",e),this.hide()}))}},computed:{displayTime(){const e=this.time%60,t=Math.floor(this.time/60);return t.toString().padStart(2,"0")+":"+e.toString().padStart(2,"0")}}},Tt=(0,de.Z)(Qt,[["render",$t]]),At=Tt;function Ot(e,t){return e||t()}Ie()(Qt,"components",{QDialog:ye.Z,QCard:ze.Z,QCardSection:be.Z,QIcon:Ee.Z,QBtn:_e.Z});const jt=(0,s.aZ)({components:{SudokuBoard:ve,SettingsDialog:Xe,Timer:St,NumberBar:qt},name:"IndexPage",setup(){const e=(0,ne.F)(),t=(0,vt.Z)(),l=t.localStorage.getItem("savegame"),s=Ot(le.deserialize(l??null),(()=>{const[e,t,l]=nt(20),s=le.fromBoard(t,e,l);return s.difficultyLevel=0,s})),i=(0,P.iH)(Ot(l?.time,(()=>0))),o=(0,P.iH)(Ot(l?.hintCount,(()=>0))),n=Ot(Vt.deserialize(l?.memory??null),(()=>new Vt));return{settings:e,memory:n,puzzle:(0,P.qj)(s),noteMode:(0,P.iH)(!1),renderKey:(0,P.iH)(0),initalTime:i,hintCount:o}},data(){return{selectedCellId:null,showSettings:!1}},methods:{showError(e){this.$q.notify({message:e,group:!1,type:"negative",timeout:1e3,actions:[{icon:"close",color:"white"}]})},canEditSelectedCell(){return this.selectedCell?!this.selectedCell.isStatic||(this.showError("Cannot edit this cell."),!1):(this.showError("No cell selected."),!1)},saveGameState(){const e=le.serialize(this.puzzle);e.time=this.$refs.timer.getTime(),e.hintCount=this.hintCount,e.memory=Vt.serialize(this.memory),this.$q.localStorage.set("savegame",e)},isVictory(){return this.puzzle.cells.reduce(((e,t,l)=>e&&this.puzzle.solution[l]===t.value),!0)},showVictory(){if(!this.isVictory())return;const e=this.$refs.timer.getTime(),t=this.$q.localStorage.getItem("victories")?.data??[];t.push({level:this.puzzle.seed,time:e,hintCount:this.hintCount,difficultyLevel:this.puzzle.difficultyLevel}),this.$q.localStorage.set("victories",{data:t}),this.$q.dialog({component:At,componentProps:{puzzle:this.puzzle,time:this.$refs.timer.getTime(),hintCount:this.hintCount}}).onOk(this.newLevel)},initNewGame(){this.$refs.timer.reset(),this.memory.clear(),this.hintCount=0,this.saveGameState()},resetGame(){this.puzzle.cells.forEach((e=>{e.isStatic||(e.value=0,e.notes.values.length=0)})),this.initNewGame()},newLevel(e){const t={0:16,1:32,2:48,3:64},l=t[e.level.toString()];this.$q.loading.show({message:"Generating level...",delay:1}),window.setTimeout((()=>{const[t,s,i]=nt(l,e.seed);this.puzzle=le.fromBoard(s,t,i),this.puzzle.difficultyLevel=e.level,this.renderKey++,this.$q.loading.hide(),this.initNewGame()}),100)},placeNumber(e){if(this.canEditSelectedCell())if(this.noteMode)if(this.selectedCell.hasValue())this.showError("Cell already filled selected.");else{const t=this.selectedCell.notes.hasValue(e);this.memory.store(this.selectedCell.id,{num:e,set:t},1),this.selectedCell.notes.swapValue(e),this.saveGameState()}else this.memory.store(this.selectedCell.id,{num:this.selectedCell.value,hint:!1},0),this.selectedCell.value===e?this.selectedCell.value=0:(this.selectedCell.value=e,this.showVictory()),this.saveGameState()},clearCell(){this.placeNumber(0)},hint(){const e=this.puzzle.cells.find((e=>!e.value));if(!e)return;const t=this.puzzle.solution[le.toIndex(e.position)];this.memory.store(e.id,{num:e.value,hint:!0},0),e.value=t,this.hintCount++,this.showVictory(),this.saveGameState()},cellSelected(e){this.selectedCellId=e},undo(){if(!this.memory.size)return;const e=this.memory.rollBack(),t=this.puzzle.findCellById(e.cellId);if(0===e.mode)return t.value=e.value.num,void(!0===e.value.hint&&this.hintCount--);{const l=e.value.set?t.notes.addValue:t.notes.removeValue;l(e.value.num)}this.saveGameState()}},computed:{boardSize(){return O.SIZE},selectedCell(){return this.puzzle.findCellById(this.selectedCellId)},activeNumbers(){return this.selectedCell?this.selectedCell.isStatic||this.selectedCell.value?[]:this.selectedCell.notes.values:[]}}});var Gt=l(69885);const Rt=(0,de.Z)(jt,[["render",m],["__scopeId","data-v-35caf24e"]]),Ft=Rt;Ie()(jt,"components",{QPage:Gt.Z,QSpace:qe.Z,QIcon:Ee.Z,QBtn:_e.Z,QToggle:Re.Z})}}]);