import{d as b,r as p,H as D,a as v,o as i,B as f,q as r,e as g,F as h,K as m,t as u,n as k,w,c as R,J as C,M as S,N}from"./index.30778686.js";import{_ as F}from"./_plugin-vue_export-helper.cdc0426e.js";const I=c=>(S("data-v-688fe2e6"),c=c(),N(),c),G={class:"layoutJSON"},V=I(()=>r("code",null,"[x, y, w, h]",-1)),X={class:"columns"},Y=I(()=>r("br",null,null,-1)),J={id:"content"},L={class:"text"},M=b({__name:"\u4ECE\u5916\u90E8\u62D6\u62FD\u8FDB\u6765",setup(c){let n={x:0,y:0},d={x:0,y:0,w:1,h:1,i:""};const o=p([{x:0,y:0,w:2,h:2,i:"0"},{x:2,y:0,w:2,h:4,i:"1"},{x:4,y:0,w:2,h:5,i:"2"},{x:6,y:0,w:2,h:3,i:"3"},{x:8,y:0,w:2,h:3,i:"4"},{x:10,y:0,w:2,h:3,i:"5"},{x:0,y:5,w:2,h:5,i:"6"},{x:2,y:5,w:2,h:5,i:"7"},{x:4,y:5,w:2,h:5,i:"8"},{x:5,y:10,w:4,h:3,i:"9"}]),_=p(),x=p();let t;D(()=>{document.addEventListener("dragover",function(a){n.x=a.clientX,n.y=a.clientY},!1),t=document.getElementById("content").getBoundingClientRect()});const B=async function(){t=document.getElementById("content").getBoundingClientRect();let a=!1;n.x>t.left&&n.x<t.right&&n.y>t.top&&n.y<t.bottom&&(a=!0);let l=o.value.findIndex(y=>y.i==="drop");if(a===!0&&l===-1&&o.value.push({x:o.value.length*2%12,y:o.value.length+12,w:1,h:1,i:"drop"}),l!==-1){await C();try{let s=x.value[l].calcXY(n.y-t.top,n.x-t.left);a===!0&&(_.value.dragEvent("dragstart","drop",s.x,s.y,1,1),d.i=String(l),d.x=o.value[l].x,d.y=o.value[l].y),a===!1&&(_.value.dragEvent("dragend","drop",s.x,s.y,1,1),o.value=o.value.filter(e=>e.i!=="drop"))}catch{}}},E=function(){t=document.getElementById("content").getBoundingClientRect();let a=!1;n.x>t.left&&n.x<t.right&&n.y>t.top&&n.y<t.bottom&&(a=!0),a===!0&&_.value.dragEvent("dragend","drop",d.x,d.y,1,1)};return(a,l)=>{const y=v("grid-item"),s=v("grid-layout");return i(),f("div",null,[r("div",null,[r("div",G,[g(" Displayed as "),V,g(": "),r("div",X,[(i(!0),f(h,null,m(o.value,e=>(i(),f("div",{class:"layoutItem",key:e.i},[r("b",null,u(e.i),1),g(": ["+u(e.x)+", "+u(e.y)+", "+u(e.w)+", "+u(e.h)+"] ",1)]))),128))])])]),Y,r("div",{onDrag:B,onDragend:E,class:"droppable-element",draggable:"true",unselectable:"on"},"Droppable Element (Drag me!)",32),r("div",J,[k(s,{ref_key:"layoutRef",ref:_,layout:o.value,"onUpdate:layout":l[0]||(l[0]=e=>o.value=e),"col-num":12,"row-height":30,"is-draggable":!0,"is-resizable":!0,"vertical-compact":!0,"use-css-transforms":!0},{default:w(()=>[(i(!0),f(h,null,m(o.value,e=>(i(),R(y,{ref_for:!0,ref_key:"gridItemRef",ref:x,key:e.i,x:e.x,y:e.y,w:e.w,h:e.h,i:e.i},{default:w(()=>[r("span",L,u(e.i),1)]),_:2},1032,["x","y","w","h","i"]))),128))]),_:1},8,["layout"])])])}}});const z=F(M,[["__scopeId","data-v-688fe2e6"]]);export{z as default};
