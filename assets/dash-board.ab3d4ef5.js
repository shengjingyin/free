import{s as X,H as G,I as Y,r as v,d as $,v as j,f,l as R,k as W,J as Q,o as w,B as F,n as S,w as b,F as Z,K as ee,u as c,C as te,L as oe,g as ae,a as D,c as ne}from"./index.30778686.js";import{u as L}from"./lowcode.010f5777.js";import{s as se,g as re,C as le}from"./comp-wrap.c160613a.js";import{e as T}from"./index.da5474a2.js";import{_ as ue}from"./_plugin-vue_export-helper.cdc0426e.js";const ie=n=>{X.set("data",JSON.stringify(n))};function ce(n,r,t){G(()=>{n.addEventListener(r,t)}),Y(()=>{n.removeEventListener(r,t)})}function de(){const n=v(0),r=v(0);return ce(document,"dragover",d=>{n.value=d.clientX,r.value=d.clientY}),{x:n,y:r}}const pe=["onClick"],me=$({__name:"dash-board",props:{layoutData:{type:Array,required:!0},parent:{type:Object,required:!0}},emits:["update:layout-data"],setup(n,{emit:r}){const t=n,{x:d,y:_}=de(),{SET_CUR_SELECT:E}=L(),{data:M,idMap:O,selectId:C,select:P}=j(L()),A=()=>{E("0")},N=f(()=>{var e;return(e=t.parent.options)==null?void 0:e.col}),z=f(()=>t.parent.options&&t.parent.options["row-height"]),B=f(()=>t.parent.options&&t.parent.options["card-margin"]),J=f(()=>t.parent.style),a=f({get(){return t.layoutData},set(e){r("update:layout-data",e)}}),U=R.exports.debounce((...e)=>{console.log("\u{1F680} ~ \u66F4\u65B0\u6570\u636E",...e),ie.apply(null,e)},1e3);W(M,e=>{U(e)},{deep:!0});let p={x:0,y:0,w:1,h:1,i:""};const g=v(),y=v();let l;G(()=>{T.on("add-component",V),T.on("end-add-component",q)});const h=v(),k=()=>h.value?(l=h.value.getBoundingClientRect(),d.value>l.left&&d.value<l.right&&_.value>l.top&&_.value<l.bottom&&t.parent.hasOwnProperty("children")&&C.value===t.parent.i):!1;let u;R.exports.throttle(()=>{console.log(`\u5E03\u5C40\u5C5E\u6027 \u5BB9\u5668\uFF1A${t.parent.i} \u5F53\u524D\u9009\u4E2D\uFF1A${C.value}----`+JSON.stringify(a.value,null,2))},200);const I=e=>y.value[e].calcXY(_.value-l.top,d.value-l.left),V=async e=>{P.value.hasOwnProperty("children")||E("0");const o=k();u=H(e);let i=a.value.findIndex(m=>m.i===u.i);if(o)if(i===-1)a.value.push(u);else{await Q();try{let m=I(i);g.value.dragEvent("dragstart",u.i,m.x,m.y,1,1),p.i=u.i,p.x=a.value[i].x,p.y=a.value[i].y}catch{}}};let x;const q=()=>{const e=k();try{g.value.dragEvent("dragend",p.i,p.x,p.y,1,1),e?se(u.component,x):a.value=a.value.filter(o=>o.i!=u.i)}catch{}},H=e=>{x=re(e.component);let o;return y.value&&y.value.length>0?o=I(y.value.length-1):o={x:0,y:0},{...e,options:{...e.options},i:String(O.value.total+1),model:e.component+"_"+x,x:o.x,y:o.y}};return(e,o)=>{const i=D("grid-item"),m=D("grid-layout");return w(),F("section",{ref_key:"dashBoardRef",ref:h,class:"size-100 dash-board",style:oe(c(J)),onClick:ae(A,["stop"])},[S(m,{ref_key:"layoutRef",ref:g,class:"grid-layout",margin:[c(B),c(B)],layout:c(a),"onUpdate:layout":o[0]||(o[0]=s=>te(a)?a.value=s:null),"col-num":c(N),"row-height":c(z),"is-draggable":!0,"is-resizable":!0,"vertical-compact":!1,"use-css-transforms":!0},{default:b(()=>[(w(!0),F(Z,null,ee(c(a),(s,K)=>(w(),ne(i,{ref_for:!0,ref_key:"gridItemRef",ref:y,dragAllowFrom:".drag-able",key:s.i,x:s.x,y:s.y,w:s.w,h:s.h,i:s.i},{default:b(()=>[S(le,{element:s,parent:n.parent,index:K},null,8,["element","parent","index"])]),_:2},1032,["x","y","w","h","i"]))),128))]),_:1},8,["margin","layout","col-num","row-height"])],12,pe)}}});const he=ue(me,[["__scopeId","data-v-182c2c47"]]);export{he as d};