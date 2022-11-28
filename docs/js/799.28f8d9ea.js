"use strict";(globalThis["webpackChunkjs_sudoku"]=globalThis["webpackChunkjs_sudoku"]||[]).push([[799],{32958:(e,t,s)=>{s.d(t,{b:()=>n,d:()=>a});var l=s(38761),i=s.n(l),o=(s(6822),s(63703));class n{constructor(e,t,s,l,o,n){i()(this,"getValue",void 0),i()(this,"setValue",void 0),i()(this,"serialize",void 0),i()(this,"deserialize",void 0),i()(this,"defaultValueFactory",void 0),i()(this,"key",void 0),this.key=e,this.getValue=t,this.setValue=s,this.defaultValueFactory=l,o||(o=e=>e),n||(n=e=>e),this.serialize=o,this.deserialize=n}}class a{save(){const e={};this.states.forEach((t=>{const s=t.key,l=t.getValue();e[s]=t.serialize(l)})),o.Z.set(this.storageKey,e)}load(){const e=o.Z.getItem(this.storageKey)??{};this.states.forEach((t=>{const s=t.key,l=e[s];try{if(void 0===l||null===l)throw new Error;const e=t.deserialize(l);t.setValue(e)}catch(i){const e=t.defaultValueFactory();t.setValue(e)}}))}constructor(e){i()(this,"states",void 0),i()(this,"storageKey",void 0),this.storageKey=e,this.states=[]}}},10098:(e,t,s)=>{s.d(t,{F:()=>r});s(69665);var l=s(81809),i=s(60499),o=s(59835);const n=JSON.parse('{"cb":0,"G1":2,"OD":5}');var a=s(32958);const r=(0,l.Q_)("settings",(()=>{const e={showErrors:(0,i.iH)(void 0),showTime:(0,i.iH)(void 0),showHints:(0,i.iH)(void 0)},t=new a.d;Object.keys(e).forEach((s=>{t.states.push(new a.b(s,(()=>e[s].value),(t=>e[s].value=t),(()=>!0)))})),t.load(),Object.keys(e).forEach((s=>(0,o.YP)(e[s],(()=>t.save()))));const s=`v${n.cb}.${n.G1}.${n.OD}`;return{...e,version:s}}))},98799:(e,t,s)=>{s.r(t),s.d(t,{default:()=>Rt});var l=s(59835),i=s(61957),o=s(86970);const n={style:{padding:"10px"}},a={id:"bottom-bar",class:"flex column full-width"},r={id:"info-bar",class:"flex row full-width q-px-sm"},u={class:"text-caption q-mr-sm flex flex-center"},c={class:"text-caption flex-center"},d={id:"action-bar",class:"full-width"},h={id:"mode-bar",class:"row q-pa-sm"};function m(e,t,s,m,p,g){const v=(0,l.up)("sudoku-board"),w=(0,l.up)("timer"),f=(0,l.up)("q-space"),C=(0,l.up)("q-icon"),y=(0,l.up)("q-btn"),S=(0,l.up)("q-toggle"),z=(0,l.up)("number-bar"),b=(0,l.up)("settings-dialog"),k=(0,l.up)("q-page");return e.puzzle?((0,l.wg)(),(0,l.j4)(k,{key:0,id:"page"},{default:(0,l.w5)((()=>[(0,l._)("div",n,[((0,l.wg)(),(0,l.j4)(v,{ref:"sudoku",puzzle:e.puzzle,key:e.renderKey,size:"4.8vw",onCellSelected:e.cellSelected},null,8,["puzzle","onCellSelected"]))]),(0,l._)("div",a,[(0,l._)("div",r,[(0,l.wy)((0,l.Wm)(w,{ref:"timer",initialValue:e.initalTime,class:"text-caption flex-center"},null,8,["initialValue"]),[[i.F8,e.settings.showTime]]),(0,l.Wm)(f),(0,l._)("div",u,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.puzzle.difficultyLevel+1,(e=>((0,l.wg)(),(0,l.j4)(C,{key:e,name:"star",color:"yellow"})))),128))]),(0,l._)("div",c,"Hints "+(0,o.zw)(e.hintCount),1)]),(0,l._)("div",d,[(0,l._)("div",h,[(0,l.Wm)(y,{icon:"settings",round:"",flat:"",size:"md",onClick:t[0]||(t[0]=()=>{e.showSettings=!0})}),(0,l.Wm)(f),(0,l.Wm)(y,{icon:"undo",flat:"",round:"",size:"md",onClick:e.undo},null,8,["onClick"]),(0,l.wy)((0,l.Wm)(y,{icon:"lightbulb",flat:"",round:"",size:"md",onClick:e.hint},null,8,["onClick"]),[[i.F8,e.settings.showHints]]),(0,l.Wm)(S,{modelValue:e.noteMode,"onUpdate:modelValue":t[1]||(t[1]=t=>e.noteMode=t),icon:"edit",color:"positive"},null,8,["modelValue"]),(0,l.Wm)(y,{icon:"backspace",flat:"",round:"",size:"md",onClick:e.clearCell},null,8,["onClick"])]),(0,l.Wm)(z,{size:9,onClick:e.placeNumber,activeNumbers:e.activeNumbers},null,8,["onClick","activeNumbers"])])]),(0,l.Wm)(b,{modelValue:e.showSettings,"onUpdate:modelValue":t[2]||(t[2]=t=>e.showSettings=t),puzzle:e.puzzle,onResetGame:e.resetGame,onNewLevel:e.newLevel},null,8,["modelValue","puzzle","onResetGame","onNewLevel"])])),_:1})):(0,l.kq)("",!0)}s(69665);const p={class:"text-h6"},g={id:"board"};function v(e,t,s,i,n,a){const r=(0,l.up)("sudoku-cell");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",p,"Sudoku #"+(0,o.zw)(e.puzzle.seed),1),(0,l._)("div",g,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.boardSize,((t,s)=>((0,l.wg)(),(0,l.iD)("div",{key:s,class:"square"},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.getSquareCells(s),(t=>((0,l.wg)(),(0,l.j4)(r,{key:t.id,puzzle:e.puzzle,cell:t,isSelected:e.selectedCellId===t.id,isSquareHighlighted:t.square.index===e.selectedCell?.square.index,isCrossHighlighted:t.row.index===e.selectedCell?.row.index||t.column.index===e.selectedCell?.column.index,onSelect:()=>e.onSelectCell(t.id),size:e.size},null,8,["puzzle","cell","isSelected","isSquareHighlighted","isCrossHighlighted","onSelect","size"])))),128))])))),128))])])}var w=s(727),f=s.n(w),C=s(75105),y=s.n(C),S=s(10357),z=s.n(S),b=s(42768),k=s.n(b),_=s(38761),q=s.n(_),E=s(33782),Z=s.n(E);class V{static getId(){var e;return Z()(V,V,I,(e=f()(V,V,I),++e))}}var I={writable:!0,value:0};function x(e){return function(){var t=e+=1831565813;return t=Math.imul(t^t>>>15,1|t),t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296}}var N=new WeakMap,W=new WeakMap;class H{get seed(){return k()(this,N)}next(){return k()(this,W).call(this)}constructor(e,t){y()(this,N,{writable:!0,value:void 0}),y()(this,W,{writable:!0,value:void 0}),void 0===e&&(e=Math.floor(4294967296*Math.random())),z()(this,N,e);const s=3735928559*e%4294967296,l=t||x;z()(this,W,l(s))}}function B(e,t,s){const l=e[t];e[t]=e[s],e[s]=l}function M(e,t){for(var s=0;s<e.length;s++){const l=Math.floor(t.next()*e.length);B(e,s,l)}}s(6822);class D{get(e){return void 0!==this.data[e]?this.data[e]:this.parent?this.parent.get(e):void 0}set(e,t){if(void 0===t)throw new Error("UNDEF?");this.data[e]=t}clone(){const e=new D(this.size);return e.parent=this,e}constructor(e){q()(this,"parent",void 0),q()(this,"data",void 0),q()(this,"size",void 0),this.id=V.getId(),this.parent=null,this.data=[],this.size=e,this.get=this.get.bind(this),this.set=this.set.bind(this),this.clone=this.clone.bind(this)}}class L{static getValue(e,t,s){const[l,i]=t.get(s);return e.getCell(l,i)}static setValue(e,t,s,l){const[i,o]=t.get(s);e.setCell(i,o,l)}static isValid(e,t){const s=[];for(var l=0;l<O.SIZE;l++){const i=L.getValue(e,t,l);if(!i)return!1;const o=i-1;if(void 0!==s[o])return!1;s[o]=!0}return!0}static includesValue(e,t,s){for(var l=0;l<O.SIZE;l++){const i=L.getValue(e,t,l);if(i===s)return!0}return!1}get(e){}constructor(e){q()(this,"index",void 0),this.id=V.getId(),this.index=e,this.get=this.get.bind(this)}}class U extends L{constructor(...e){super(...e),q()(this,"type","col")}get(e){const t=this.index,s=e;return[t,s]}}class Q extends L{constructor(...e){super(...e),q()(this,"type","row")}get(e){const t=e,s=this.index;return[t,s]}}var $=new WeakMap,T=new WeakMap;class A extends L{get(e){const t=e%O.BASE_NUMBER,s=Math.floor(e/O.BASE_NUMBER),l=k()(this,$)+t,i=k()(this,T)+s;return[l,i]}constructor(e){super(e),q()(this,"type","square"),y()(this,$,{writable:!0,value:void 0}),y()(this,T,{writable:!0,value:void 0}),z()(this,$,this.index%O.BASE_NUMBER*O.BASE_NUMBER),z()(this,T,Math.floor(this.index/O.BASE_NUMBER)*O.BASE_NUMBER)}}class O{static get CELL_COUNT(){return O.SIZE*O.SIZE}static get SIZE(){return O.BASE_NUMBER*O.BASE_NUMBER}static get BASE_NUMBER(){return 3}static get rows(){return f()(this,O,j)}static get columns(){return f()(this,O,G)}static get squares(){return f()(this,O,F)}static getRow(e,t){return O.rows[t]}static getColumn(e,t){return O.columns[e]}static getSquare(e,t){const s=Math.floor(e/O.BASE_NUMBER),l=Math.floor(t/O.BASE_NUMBER),i=s+l*O.BASE_NUMBER;return O.squares[i]}}var j={writable:!0,value:Array(O.SIZE).fill(null).map(((e,t)=>new Q(t)))},G={writable:!0,value:Array(O.SIZE).fill(null).map(((e,t)=>new U(t)))},F={writable:!0,value:Array(O.SIZE).fill(null).map(((e,t)=>new A(t)))};class R{static randomSkeleton(e){const t=new R,s=[0,4,8];for(var l=0;l<s.length;l++){const o=O.squares[s[l]],n=[...Array(O.SIZE).keys()];M(n,e);for(var i=0;i<O.SIZE;i++)L.setValue(t,o,i,n[i])}return t}getCell(e,t){return this.cells.get(e*O.SIZE+t)??0}setCell(e,t,s){return this.cells.set(e*O.SIZE+t,s)}clone(){const e=new R;return e.cells=this.cells.clone(),e}duplicate(){const e=new R;for(var t=0;t<O.CELL_COUNT;t++){const s=this.cells.get(t);e.cells.set(t,s)}return e}import(e){this.cells=e.cells}isFinished(){for(var e=0;e<O.CELL_COUNT;e++)if(!this.cells.get(e))return!1;return!0}isValid(){for(var e=0;e<O.SIZE;e++){const t=[O.rows[e],O.columns[e],O.squares[e]],s=t.reduce(((e,t)=>e&&L.isValid(this,t)),!0);if(!s)return!1}return!0}print(){for(var e=0;e<O.SIZE;e++){O.rows[e];for(var t=e+": ",s=0;s<O.SIZE;s++){const l=this.getCell(s,e).toString();t+=l}console.log(t)}console.log("\n\n")}constructor(){q()(this,"cells",void 0),this.id=V.getId(),this.cells=new D(O.CELL_COUNT),this.getCell=this.getCell.bind(this),this.setCell=this.setCell.bind(this),this.clone=this.clone.bind(this),this.duplicate=this.duplicate.bind(this),this.import=this.import.bind(this),this.isFinished=this.isFinished.bind(this),this.isValid=this.isValid.bind(this)}}var K=s(79559),Y=s.n(K),P=(s(46727),s(60499));class J{get x(){return this._x}get y(){return this._y}constructor(e,t){q()(this,"_x",void 0),q()(this,"_y",void 0),this._x=e,this._y=t}}class X{hasValue(e){return this.values.includes(e)}addValue(e){this.hasValue(e)||this.values.push(e)}removeValue(e){const t=this.values.indexOf(e);t<0||this.values.splice(t,1)}swapValue(e){this.hasValue(e)?this.removeValue(e):this.addValue(e)}clear(){this.values.length=0}constructor(){q()(this,"values",void 0),this.values=(0,P.qj)([]),this.hasValue=this.hasValue.bind(this),this.addValue=this.addValue.bind(this),this.removeValue=this.removeValue.bind(this),this.swapValue=this.swapValue.bind(this),this.clear=this.clear.bind(this)}}class ee{get position(){return this._position}get isStatic(){return this._isStatic}get row(){return this._row}get column(){return this._column}get square(){return this._square}get id(){return this.position.x+this.position.y*O.SIZE+1}hasValue(){return this.value>0}constructor(e,t){q()(this,"value",void 0),q()(this,"_position",void 0),q()(this,"_isStatic",void 0),q()(this,"_row",void 0),q()(this,"_column",void 0),q()(this,"_square",void 0),q()(this,"notes",void 0),this._position=e,this.value=t,this.notes=new X,this._isStatic=this.hasValue(),this.hasValue=this.hasValue.bind(this),Y()(ee,ee,te).call(ee,this)}}function te(e){e._row=O.rows[e.position.y],e._column=O.columns[e.position.x],e._square=O.squares[Math.floor(e.position.x/O.BASE_NUMBER)+Math.floor(e.position.y/O.BASE_NUMBER)*O.BASE_NUMBER]}class se{static serialize(e){const t={cells:e.cells.map((e=>({value:e.value,x:e.position.x,y:e.position.y,notes:e.notes.values,static:e.isStatic}))),seed:e.seed,solution:e.solution,difficultyLevel:e.difficultyLevel};return t}static deserialize(e){if(null===e)return null;const t=new se;return t.cells=e.cells.map((e=>{const t=new J(e.x,e.y),s=(0,P.qj)(new ee(t,e.static?e.value:0));return e.static||(s.value=e.value),e.notes.forEach((e=>s.notes.addValue(e))),s})),t.seed=e.seed,t.solution=e.solution,t.difficultyLevel=e.difficultyLevel,t}static toIndex(e){return e.x+e.y*O.SIZE}getCell(e){const t=se.toIndex(e);return this.cells[t]}getSolutionValue(e){const t=se.toIndex(e);return this.solution[t]}findCellById(e){if(e)return this.cells.find((t=>t.id===e))}static fromBoard(e,t,s){const l=new se;l.seed=s;for(var i=0;i<O.SIZE;i++)for(var o=0;o<O.SIZE;o++){const s=t.getCell(i,o),n=e.getCell(i,o),a=new J(i,o),r=se.toIndex(a);l.solution[r]=s;const u=(0,P.qj)(new ee(a,n));l.cells[r]=u}return l}constructor(){q()(this,"cells",void 0),q()(this,"solution",void 0),q()(this,"difficultyLevel",void 0),this.cells=[],this.solution=[]}}const le={key:1},ie={key:1,id:"notes"};function oe(e,t,s,i,n,a){return(0,l.wg)(),(0,l.iD)("div",{class:(0,o.C_)(["cell",{static:e.cell.isStatic,selected:e.isSelected,"square-highlight":!e.isSelected&&e.isSquareHighlighted,"cross-highlight":!e.isSelected&&e.isCrossHighlighted,error:e.settings.showErrors&&e.isError}]),onClick:t[0]||(t[0]=()=>{e.isSelected||e.$emit("select",e.x,e.y)})},[0!==e.cell.value?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[e.cell.isStatic?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[(0,l.Uk)((0,o.zw)(e.cell.value),1)],64)):((0,l.wg)(),(0,l.iD)("span",le,(0,o.zw)(e.cell.value),1))],64)):((0,l.wg)(),(0,l.iD)("div",ie,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.notes,((e,t)=>((0,l.wg)(),(0,l.iD)("div",{key:t,class:"note"},(0,o.zw)(e?t+1:""),1)))),128))]))],2)}var ne=s(10098);const ae=(0,l.aZ)({name:"SudokuCell",emits:["select"],props:{puzzle:{type:se,required:!0},cell:{type:ee,required:!0},isSelected:{type:Boolean,default:!1},isSquareHighlighted:{type:Boolean,default:!1},isCrossHighlighted:{type:Boolean,default:!1},size:{type:String,default:"1.0em"}},setup(){const e=(0,ne.F)();return{settings:e}},computed:{boardSize(){return O.SIZE},isError(){return this.cell.value>0&&this.cell.value!==this.puzzle.getSolutionValue(this.cell.position)},notes(){return Array(this.boardSize).fill(null).map(((e,t)=>this.cell.notes.hasValue(t+1)))}},watch:{}}),re=()=>{(0,i.sj)((e=>({"53f3ddd7":e.size,"2d0722ce":e.weight})))},ue=ae.setup;ae.setup=ue?(e,t)=>(re(),ue(e,t)):re;const ce=ae;var de=s(11639);const he=(0,de.Z)(ce,[["render",oe],["__scopeId","data-v-6f4975f3"]]),me=he,pe=(0,l.aZ)({components:{SudokuCell:me},name:"SodukuBoard",props:{puzzle:{type:se,required:!0},size:{type:String,default:"1.0em"}},emits:["cellSelected"],data(){return{selectedCellId:null}},methods:{onSelectCell(e){this.selectedCellId=e,this.$emit("cellSelected",e)},getSquareCells(e){return Array(O.SIZE).fill(null).map(((t,s)=>{const[l,i]=O.squares[e].get(s),o=new J(l,i),n=se.toIndex(o);return this.puzzle.cells[n]}))}},computed:{boardSize(){return O.SIZE},selectedCellIndex(){return this.puzzle.cells.findIndex((e=>e.id===this.selectedCellId))},selectedCell(){return this.selectedCellIndex>-1?this.puzzle.cells[this.selectedCellIndex]:null}}}),ge=(0,de.Z)(pe,[["render",v],["__scopeId","data-v-72cb4550"]]),ve=ge,we={class:"text-subtitle2"};function fe(e,t,s,i,n,a){const r=(0,l.up)("q-item-label"),u=(0,l.up)("q-item-section"),c=(0,l.up)("q-toggle"),d=(0,l.up)("q-item"),h=(0,l.up)("q-list"),m=(0,l.up)("q-card-section"),p=(0,l.up)("q-btn"),g=(0,l.up)("q-separator"),v=(0,l.up)("q-card-actions"),w=(0,l.up)("q-card"),f=(0,l.up)("q-dialog"),C=(0,l.Q2)("ripple"),y=(0,l.Q2)("close-popup");return(0,l.wg)(),(0,l.j4)(f,{modelValue:e.show,"onUpdate:modelValue":t[0]||(t[0]=t=>e.show=t)},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{style:{width:"80vw"}},{default:(0,l.w5)((()=>[(0,l.Wm)(m,null,{default:(0,l.w5)((()=>[(0,l.Wm)(h,{style:{"font-size":"1.2em"}},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{header:""},{default:(0,l.w5)((()=>[(0,l.Uk)("Options")])),_:1}),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.settingsToggles,(e=>(0,l.wy)(((0,l.wg)(),(0,l.j4)(d,{class:"text-body1",clickable:"",key:e.name,onClick:()=>e.prop.value=!e.prop.value},{default:(0,l.w5)((()=>[(0,l.Wm)(u,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.name),1)])),_:2},1024),(0,l.Wm)(u,{side:""},{default:(0,l.w5)((()=>[(0,l.Wm)(c,{modelValue:e.prop.value,"onUpdate:modelValue":t=>e.prop.value=t,icon:e.icon},null,8,["modelValue","onUpdate:modelValue","icon"])])),_:2},1024)])),_:2},1032,["onClick"])),[[C]]))),128))])),_:1})])),_:1}),(0,l.Wm)(m,{class:"q-gutter-y-md"},{default:(0,l.w5)((()=>[(0,l._)("div",we,"Current level: "+(0,o.zw)(e.puzzle.seed),1),(0,l.Wm)(p,{label:"Clear data",flat:"",color:"negative",class:"full-width",onClick:e.clearCache},null,8,["onClick"]),(0,l.Wm)(p,{label:"Retry level",flat:"",color:"negative",class:"full-width",onClick:e.resetGame},null,8,["onClick"]),(0,l.Wm)(p,{label:"New level",flat:"",color:"primary",class:"full-width",onClick:e.newGame},null,8,["onClick"]),(0,l.Wm)(p,{label:"History",flat:"",color:"primary",class:"full-width",onClick:e.showHistory},null,8,["onClick"])])),_:1}),(0,l.Wm)(g),(0,l.Wm)(v,{align:"right"},{default:(0,l.w5)((()=>[(0,l.wy)((0,l.Wm)(p,{flat:"",color:"primary",label:"Close"},null,512),[[y]])])),_:1})])),_:1})])),_:1},8,["modelValue"])}function Ce(e,t,s,i,o,n){const a=(0,l.up)("q-input"),r=(0,l.up)("q-card-section"),u=(0,l.up)("q-space"),c=(0,l.up)("q-icon"),d=(0,l.up)("q-btn"),h=(0,l.up)("q-card"),m=(0,l.up)("q-dialog");return(0,l.wg)(),(0,l.j4)(m,{ref:"dialog",onHide:n.onDialogHide},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{class:"q-dialog-plugin"},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{class:"text-h6"},{default:(0,l.w5)((()=>[(0,l.Uk)(" Level "),(0,l.Wm)(a,{modelValue:i.levelNumber,"onUpdate:modelValue":t[0]||(t[0]=e=>i.levelNumber=e),mask:"##########","input-style":"text-align: center; font-size: 2em",rules:[e=>parseInt(e).toString()===e&&parseInt(e)<4294967296]},null,8,["modelValue","rules"])])),_:1}),(0,l.Wm)(r,{class:"text-h6"},{default:(0,l.w5)((()=>[(0,l.Uk)(" Niveau ")])),_:1}),(0,l.Wm)(r,{class:"q-gutter-y-md"},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(i.difficultyLevels,(e=>((0,l.wg)(),(0,l.j4)(d,{key:e.level,color:"primary",outline:"",size:"lg",align:"left",label:e.name,class:"full-width",onClick:()=>n.onOKClick(e.level)},{default:(0,l.w5)((()=>[(0,l.Wm)(u),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.level+1,(e=>((0,l.wg)(),(0,l.j4)(c,{key:e,name:"star",color:"yellow"})))),128))])),_:2},1032,["label","onClick"])))),128))])),_:1}),(0,l.Wm)(r,null,{default:(0,l.w5)((()=>[(0,l.Wm)(d,{label:"Cancel",class:"full-width",color:"negative",onClick:n.onCancelClick},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}const ye={name:"NewLevelDialog",props:{},emits:["ok","hide"],setup(){return{difficultyLevels:[{name:"Easy",level:0},{name:"Medium",level:1},{name:"Hard",level:2},{name:"Extra Hard",level:3}],levelNumber:(0,P.iH)(Math.floor(4294967296*Math.random()))}},methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},onOKClick(e){""===this.levelNumber&&(this.levelNumber=Math.floor(4294967296*Math.random())),this.$emit("ok",{level:e,seed:this.levelNumber}),this.hide()},onCancelClick(){this.hide()}}};var Se=s(7657),ze=s(44458),be=s(63190),ke=s(31169),_e=s(24455),qe=s(90136),Ee=s(22857),Ze=s(69984),Ve=s.n(Ze);const Ie=(0,de.Z)(ye,[["render",Ce]]),xe=Ie;Ve()(ye,"components",{QDialog:Se.Z,QCard:ze.Z,QCardSection:be.Z,QInput:ke.Z,QBtn:_e.Z,QSpace:qe.Z,QIcon:Ee.Z});const Ne={class:"text-center"},We={class:"text-left"},He={class:"row items-center text-left"},Be={class:"text-left"},Me={key:1,class:"text-body1"};function De(e,t,s,i,n,a){const r=(0,l.up)("q-card-section"),u=(0,l.up)("q-icon"),c=(0,l.up)("q-markup-table"),d=(0,l.up)("q-btn"),h=(0,l.up)("q-card"),m=(0,l.up)("q-dialog");return(0,l.wg)(),(0,l.j4)(m,{ref:"dialog",onHide:a.onDialogHide,persistent:""},{default:(0,l.w5)((()=>[(0,l.Wm)(h,{class:"q-dialog-plugin q-pa-sm"},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{class:"text-h4"},{default:(0,l.w5)((()=>[(0,l.Uk)(" Victories ")])),_:1}),(0,l.Wm)(r,{class:"q-my-md text-h6"},{default:(0,l.w5)((()=>[s.victories.length?((0,l.wg)(),(0,l.j4)(c,{key:0,separator:"horizontal",flat:"",bordered:"",class:"text-subtitle2"},{default:(0,l.w5)((()=>[(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.victories,((e,t)=>((0,l.wg)(),(0,l.iD)("tr",{key:t},[(0,l._)("td",Ne,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.difficultyLevel+1,(e=>((0,l.wg)(),(0,l.j4)(u,{key:e,name:"star",color:"yellow"})))),128))]),(0,l._)("td",We,"#"+(0,o.zw)(e.level),1),(0,l._)("td",He,[(0,l.Wm)(u,{name:"o_lightbulb",outline:""}),(0,l.Uk)(" "+(0,o.zw)(e.hintCount),1)]),(0,l._)("td",Be,(0,o.zw)(this.displayTime(e.time)),1)])))),128))])])),_:1})):((0,l.wg)(),(0,l.iD)("div",Me,"No items in this list"))])),_:1}),(0,l.Wm)(r,{align:"right"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{label:"Close",outline:"",color:"primary",onClick:a.hide},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}const Le={name:"VictoryHistoryScreen",props:{victories:{type:Array,required:!0}},emits:["ok","hide"],methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},displayTime(e){const t=e%60,s=Math.floor(e/60);return s.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")}}};var Ue=s(66933);const Qe=(0,de.Z)(Le,[["render",De]]),$e=Qe;Ve()(Le,"components",{QDialog:Se.Z,QCard:ze.Z,QCardSection:be.Z,QMarkupTable:Ue.Z,QIcon:Ee.Z,QBtn:_e.Z});const Te=(0,l.aZ)({name:"SettingsDialog",props:{modelValue:{type:Boolean,required:!0},puzzle:{type:se,required:!0}},emits:["update:modelValue","resetGame","newLevel"],setup(){const e=(0,ne.F)(),t=[{name:"Timer",icon:"timer",prop:(0,l.Fl)({get:()=>e.showTime,set:t=>e.showTime=t})},{name:"Highlight errors",icon:"error",prop:(0,l.Fl)({get:()=>e.showErrors,set:t=>e.showErrors=t})},{name:"Allow hints",icon:"lightbulb",prop:(0,l.Fl)({get:()=>e.showHints,set:t=>e.showHints=t})}];return{settings:e,settingsToggles:t}},methods:{resetGame(){this.$q.dialog({title:"Warning",message:"Are you sure? You cannot reverse this action.",cancel:!0,persistent:!0,ok:{label:"Continue",color:"negative"}}).onOk((()=>{this.$emit("resetGame"),this.show=!1}))},clearCache(){this.$q.dialog({title:"Warning",message:"Are you sure? This will remove your current save game and the victory history. You cannot reverse this action.",cancel:!0,persistent:!0,ok:{label:"Continue",color:"negative"}}).onOk((()=>{this.$q.localStorage.clear(),location.reload()}))},newGame(){this.$q.dialog({component:xe,componentProps:{text:"something"}}).onOk((e=>{this.$emit("newLevel",e),this.show=!1}))},showHistory(){this.$q.dialog({component:$e,componentProps:{victories:this.$q.localStorage.getItem("victories")?.data??[]}})}},computed:{show:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}}}});var Ae=s(13246),Oe=s(33115),je=s(490),Ge=s(76749),Fe=s(23175),Re=s(50926),Ke=s(11821),Ye=s(51136),Pe=s(62146);const Je=(0,de.Z)(Te,[["render",fe]]),Xe=Je;Ve()(Te,"components",{QDialog:Se.Z,QCard:ze.Z,QCardSection:be.Z,QList:Ae.Z,QItemLabel:Oe.Z,QItem:je.Z,QItemSection:Ge.Z,QToggle:Fe.Z,QBtn:_e.Z,QSeparator:Re.Z,QCardActions:Ke.Z}),Ve()(Te,"directives",{Ripple:Ye.Z,ClosePopup:Pe.Z});var et=s(37628),tt=s.n(et),st=s(40559),lt=s.n(st);s(58672);class it{static getOptionCount(e){for(var t=0,s=0;s<O.SIZE;s++)e.get(s)&&t++;return t}static getOptionValues(e){const t=[];for(var s=0;s<O.SIZE;s++)e.get(s)&&t.push(s+1);return t}getCellWithLeastOptions(){for(var e=O.SIZE+1,t=null,s=0;s<O.SIZE;s++)for(var l=0;l<O.SIZE;l++){if(this.board.getCell(l,s))continue;const i=this.getNotesForCell(l,s),o=it.getOptionCount(i);if(2===o)return[l,s];o<e&&(t=[l,s],e=o)}return t}getNotesForCell(e,t){return this.cellnotes[e+t*O.SIZE]}setup(){for(var e=0;e<O.SIZE;e++)for(var t=0;t<O.SIZE;t++)this.cellnotes.push(Y()(it,it,ot).call(it,this.board,t,e))}clone(e){const t=new it(e);return t.cellnotes=this.cellnotes.map((e=>e.clone())),t}static fromBoard(e){const t=new it(e);return t.setup(),t}constructor(e){q()(this,"cellnotes",void 0),this.id=V.getId(),this.cellnotes=[],this.board=e,this.setup=this.setup.bind(this),this.clone=this.clone.bind(this)}}function ot(e,t,s){const l=new D;if(e.getCell(t,s))return l;for(var i=0;i<O.SIZE;i++){const o=[O.getRow(t,s),O.getColumn(t,s),O.getSquare(t,s)],n=i+1,a=o.reduce(((t,s)=>t&&!L.includesValue(e,s,n)),!0);l.set(i,a)}return l}function nt(e,t){const s=new H(t),l=R.randomSkeleton(s),i=new dt,o=i.getSolutions(l,1,s)[0];if(!o)throw new Error("Error creating new solution");const n=Array(O.SIZE).fill(null).map(((e,t)=>[...Array(O.SIZE).keys()].map((e=>[e,t])))).reduce(((e,t)=>e.concat(t)),[]);M(n,s);var a=0;const r=o.duplicate();for(var u=0;u<n.length;u++){const[t,l]=n[u],o=r.getCell(t,l);r.setCell(t,l,0);const c=i.getSolutions(r,2,s);if(c.length>1)r.setCell(t,l,o);else if(a++,a>=e)break}return[o,r,s.seed]}class at extends Error{constructor(e){super(e),this.name="SolutionError"}}var rt=new WeakSet,ut=new WeakSet,ct=new WeakSet;class dt{constructor(e){tt()(this,ct),tt()(this,ut),tt()(this,rt),q()(this,"board",void 0),this.id=V.getId(),this.board=e}boardCompare(e,t){const s=O.CELL_COUNT;for(var l=0;l<s;l++){e.cells.get(l),t.cells.get(l)}return!0}notebookCompare(e,t){const s=O.CELL_COUNT;for(var l=0;l<s;l++){const s=it.getOptionValues(e.cellnotes[l]),i=it.getOptionValues(t.cellnotes[l]),o=s.reduce(((e,t,s)=>{const l=i[s];return e&&t===l}),!0);if(!o)return!1}return!0}getSolutions(e,t,s,l,i,o){i=!1!==i,t=t||1,s=s??new H,o=o??0;const n=i?e.clone():e,a=i&&l?l.clone(n):it.fromBoard(n);try{lt()(this,ct,pt).call(this,a,s)}catch(p){if(p instanceof at)return console.debug(p.message),[];throw p}if(n.isFinished())return n.isValid()?[n]:[];const[r,u]=a.getCellWithLeastOptions(),c=a.getNotesForCell(r,u),d=it.getOptionValues(c);for(var h=[],m=0;m<d.length;m++){const e=d[m],l=n.clone(),i=a.clone(l);lt()(this,ut,mt).call(this,i,r,u,e);const c=this.getSolutions(l,t,s,i,!1,o+h.length);if(h=h.concat(c),h.length+o>=t)return h}return h}}function ht(e,t,s){if(e.board.getCell(t,s))return!1;const l=e.getNotesForCell(t,s),i=it.getOptionValues(l);if(i.length>1)return!1;if(0===i.length)throw new at(`Cell ${t}, ${s} cannot be filled`);return lt()(this,ut,mt).call(this,e,t,s,i[0]),!0}function mt(e,t,s,l){e.board.setCell(t,s,l);const i=[O.getRow(t,s),O.getColumn(t,s),O.getSquare(t,s)];i.forEach((t=>{for(var s=0;s<O.SIZE;s++){const[i,o]=t.get(s),n=e.getNotesForCell(i,o);n.set(l-1,!1),lt()(this,rt,ht).call(this,e,i,o)}}))}function pt(e,t){var s=!1;const l=Array(O.SIZE).fill(null).map(((t,s)=>[...Array(O.SIZE).keys()].filter((t=>!e.board.getCell(t,s))).map((e=>[e,s])))).reduce(((e,t)=>e.concat(t)),[]);return M(l,t),l.forEach((([t,l])=>{lt()(this,rt,ht).call(this,e,t,l)&&(s=!0)})),s}function gt(e,t,s,i,n,a){return(0,l.wg)(),(0,l.iD)("div",null,(0,o.zw)(e.time),1)}var vt=s(19302);function wt(e,t){const s=parseInt(e);return isNaN(s)?t:s}const ft=(0,l.aZ)({name:"Timer",emits:["update"],exposes:["reset","getTime"],props:{initialValue:{type:Number,default:0}},setup(e,t){const s=(0,vt.Z)(),i=(0,P.iH)(wt(e.initialValue,0)),o=(0,P.iH)(0),n=()=>{i.value++,t.emit("update",i.value)};return(0,l.YP)((()=>s.appVisible),(e=>{e?o.value=window.setInterval(n,1e3):window.clearInterval(o.value),console.debug(e?"App became visible":"App went in the background")}),{immediate:!0}),{seconds:i,timer:o}},methods:{reset(){this.seconds=0},getTime(){return this.seconds}},computed:{time(){const e=this.seconds%60,t=Math.floor(this.seconds/60);return t.toString().padStart(2,"0")+":"+e.toString().padStart(2,"0")}}}),Ct=(0,de.Z)(ft,[["render",gt]]),yt=Ct,St={id:"number-bar"},zt={style:{display:"flex","flex-direction":"column"}};function bt(e,t,s,i,n,a){const r=(0,l.up)("q-icon"),u=(0,l.up)("q-btn");return(0,l.wg)(),(0,l.iD)("div",St,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(Math.ceil(e.size/2),(t=>((0,l.wg)(),(0,l.iD)("div",{key:t},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.columnNumbers(t),(t=>((0,l.wg)(),(0,l.j4)(u,{key:t,size:"xl",color:"white",outline:"",padding:"none",class:"number-btn",onClick:()=>e.$emit("click",t)},{default:(0,l.w5)((()=>[(0,l._)("div",zt,[(0,l.Uk)((0,o.zw)(t)+" ",1),(0,l.Wm)(r,{color:e.activeNumbers.includes(t)?"":"transparent",name:"close",class:"number-icon q-pa-none q-ma-none",padding:"none",size:"sm"},null,8,["color"])])])),_:2},1032,["onClick"])))),128))])))),128))])}const kt=(0,l.aZ)({name:"NumberBar",props:{size:{type:Number,required:!0},activeNumbers:{type:Array,default:()=>[]}},emits:["click"],setup(){},methods:{columnNumbers(e){const t=e,s=e+Math.ceil(this.size/2);return s>this.size?[t]:[t,s]}}}),_t=(0,de.Z)(kt,[["render",bt],["__scopeId","data-v-f94a6358"]]),qt=_t;Ve()(kt,"components",{QBtn:_e.Z,QIcon:Ee.Z});var Et=new WeakMap,Zt=new WeakMap,Vt=new WeakMap;class It{get cellId(){return k()(this,Et)}get value(){return k()(this,Zt)}get mode(){return k()(this,Vt)}constructor(e,t,s){y()(this,Et,{writable:!0,value:void 0}),y()(this,Zt,{writable:!0,value:void 0}),y()(this,Vt,{writable:!0,value:void 0}),z()(this,Et,e),z()(this,Zt,t),z()(this,Vt,s)}}class xt{static serialize(e){return e.data.map((e=>({cellId:e.cellId,value:e.value,mode:e.mode})))}static deserialize(e){if(null===e)return null;try{const t=new xt;return e.forEach((e=>{t.store(e.cellId,e.value,e.mode)})),t}catch(t){return console.warn("Cannot deserialize",e,t),null}}clear(){this.data.length=0}rollBack(){return 0===this.data.length?null:this.data.pop()}store(e,t,s){const l=new It(e,t,s);this.data.push(l)}get size(){return this.data.length}constructor(){q()(this,"data",void 0),this.data=[]}}const Nt={class:"text-h6 row items-center"},Wt={class:"q-ml-sm"},Ht={class:"text-h6 row items-center"},Bt={class:"q-ml-sm"},Mt={class:"text-h6 row items-center"},Dt={class:"q-ml-sm"},Lt={class:"text-h6 row items-center"},Ut={class:"q-ml-sm"};function Qt(e,t,s,i,n,a){const r=(0,l.up)("q-card-section"),u=(0,l.up)("q-icon"),c=(0,l.up)("q-btn"),d=(0,l.up)("q-card"),h=(0,l.up)("q-dialog");return(0,l.wg)(),(0,l.j4)(h,{ref:"dialog",onHide:a.onDialogHide,persistent:""},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{class:"q-dialog-plugin q-pa-sm"},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{class:"text-h2"},{default:(0,l.w5)((()=>[(0,l.Uk)(" You Won! ")])),_:1}),(0,l.Wm)(r,{class:"q-gutter-y-md text-h6"},{default:(0,l.w5)((()=>[(0,l._)("div",Nt,[(0,l.Uk)(" Difficulty: "),(0,l._)("span",Wt,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(s.puzzle.difficultyLevel+1,(e=>((0,l.wg)(),(0,l.j4)(u,{key:e,name:"star",color:"yellow"})))),128))])]),(0,l._)("div",Ht,[(0,l.Uk)(" Hints: "),(0,l._)("span",Bt,(0,o.zw)(s.hintCount),1)]),(0,l._)("div",Mt,[(0,l.Uk)(" Time Taken: "),(0,l._)("span",Dt,(0,o.zw)(a.displayTime),1)]),(0,l._)("div",Lt,[(0,l.Uk)(" Level: "),(0,l._)("span",Ut,"#"+(0,o.zw)(s.puzzle.seed),1)])])),_:1}),(0,l.Wm)(r,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,{label:"Play Another",class:"full-width",size:"lg",color:"primary",onClick:a.nextLevel},null,8,["onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}const $t={name:"VictoryScreen",props:{puzzle:{type:se,required:!0},time:{type:Number,required:!0},hintCount:{type:Number,required:!0}},emits:["ok","hide"],methods:{show(){this.$refs.dialog.show()},hide(){this.$refs.dialog.hide()},onDialogHide(){this.$emit("hide")},nextLevel(){this.$q.dialog({component:xe}).onOk((e=>{this.$emit("ok",e),this.hide()}))}},computed:{displayTime(){const e=this.time%60,t=Math.floor(this.time/60);return t.toString().padStart(2,"0")+":"+e.toString().padStart(2,"0")}}},Tt=(0,de.Z)($t,[["render",Qt]]),At=Tt;Ve()($t,"components",{QDialog:Se.Z,QCard:ze.Z,QCardSection:be.Z,QIcon:Ee.Z,QBtn:_e.Z});var Ot=s(32958);const jt=(0,l.aZ)({components:{SudokuBoard:ve,SettingsDialog:Xe,Timer:yt,NumberBar:qt},name:"IndexPage",setup(){const e=(0,ne.F)(),t=new Ot.d("game");return{settings:e,saveManager:t,renderKey:(0,P.iH)(0),puzzle:(0,P.qj)(null),initalTime:(0,P.iH)(0),hintCount:(0,P.iH)(0),memory:null}},created(){this.saveManager.states.push(new Ot.b("puzzle",(()=>this.puzzle),(e=>this.puzzle=e),(()=>{const[e,t,s]=nt(20),l=se.fromBoard(t,e,s);return l.difficultyLevel=0,l}),se.serialize,se.deserialize),new Ot.b("time",(()=>this.initalTime),(e=>this.initalTime=e),(()=>0)),new Ot.b("hintCount",(()=>this.hintCount),(e=>this.hintCount=e),(()=>0)),new Ot.b("memory",(()=>this.memory),(e=>this.memory=e),(()=>new xt),xt.serialize,xt.deserialize)),this.saveManager.load()},data(){return{noteMode:!1,selectedCellId:null,showSettings:!1}},methods:{showError(e){this.$q.notify({message:e,group:!1,type:"negative",timeout:1e3,actions:[{icon:"close",color:"white"}]})},canEditSelectedCell(){return this.selectedCell?!this.selectedCell.isStatic||(this.showError("Cannot edit this cell."),!1):(this.showError("No cell selected."),!1)},saveGameState(){this.saveManager.save()},isVictory(){return this.puzzle.cells.reduce(((e,t,s)=>e&&this.puzzle.solution[s]===t.value),!0)},showVictory(){if(!this.isVictory())return;const e=this.$refs.timer.getTime(),t=this.$q.localStorage.getItem("victories")?.data??[];t.push({level:this.puzzle.seed,time:e,hintCount:this.hintCount,difficultyLevel:this.puzzle.difficultyLevel}),this.$q.localStorage.set("victories",{data:t}),this.$q.dialog({component:At,componentProps:{puzzle:this.puzzle,time:this.$refs.timer.getTime(),hintCount:this.hintCount}}).onOk(this.newLevel)},initNewGame(){this.$refs.timer.reset(),this.memory.clear(),this.hintCount=0,this.saveGameState()},resetGame(){this.puzzle.cells.forEach((e=>{e.isStatic||(e.value=0,e.notes.values.length=0)})),this.initNewGame()},newLevel(e){const t={0:16,1:32,2:48,3:64},s=t[e.level.toString()];this.$q.loading.show({message:"Generating level...",delay:1}),window.setTimeout((()=>{const[t,l,i]=nt(s,e.seed);this.puzzle=se.fromBoard(l,t,i),this.puzzle.difficultyLevel=e.level,this.renderKey++,this.$q.loading.hide(),this.initNewGame()}),100)},placeNumber(e){if(this.canEditSelectedCell())if(this.noteMode)if(this.selectedCell.hasValue())this.showError("Cell already filled selected.");else{const t=this.selectedCell.notes.hasValue(e);this.memory.store(this.selectedCell.id,{num:e,set:t},1),this.selectedCell.notes.swapValue(e),this.saveGameState()}else this.memory.store(this.selectedCell.id,{num:this.selectedCell.value,hint:!1},0),this.selectedCell.value===e?this.selectedCell.value=0:(this.selectedCell.value=e,this.showVictory()),this.saveGameState()},clearCell(){if(!this.canEditSelectedCell())return;const e=!this.selectedCell.hasValue();if(!e||this.selectedCell.notes.values.length){switch(e){case!0:this.selectedCell.notes.clear();break;case!1:this.memory.store(this.selectedCell.id,{num:this.selectedCell.value,hint:!1},0),this.selectedCell.value=0}this.saveGameState()}},hint(){const e=this.puzzle.cells.find((e=>!e.value));if(!e)return;const t=this.puzzle.solution[se.toIndex(e.position)];this.memory.store(e.id,{num:e.value,hint:!0},0),e.value=t,this.hintCount++,this.showVictory(),this.saveGameState()},cellSelected(e){this.selectedCellId=e},undo(){if(!this.memory.size)return;const e=this.memory.rollBack(),t=this.puzzle.findCellById(e.cellId);if(0===e.mode)return t.value=e.value.num,void(!0===e.value.hint&&this.hintCount--);{const s=e.value.set?t.notes.addValue:t.notes.removeValue;s(e.value.num)}this.saveGameState()}},computed:{boardSize(){return O.SIZE},selectedCell(){return this.puzzle.findCellById(this.selectedCellId)},activeNumbers(){return this.selectedCell?this.selectedCell.isStatic||this.selectedCell.value?[]:this.selectedCell.notes.values:[]}}});var Gt=s(69885);const Ft=(0,de.Z)(jt,[["render",m],["__scopeId","data-v-44d5978e"]]),Rt=Ft;Ve()(jt,"components",{QPage:Gt.Z,QSpace:qe.Z,QIcon:Ee.Z,QBtn:_e.Z,QToggle:Fe.Z})}}]);