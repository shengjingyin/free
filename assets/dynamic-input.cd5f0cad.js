import{d as k,r as x,f as m,a as _,o as g,B as w,K as h,c as C,w as i,b as B,n as f,e as y,F as D,D as $,l as N,u as d}from"./index.30778686.js";import{_ as j}from"./_plugin-vue_export-helper.cdc0426e.js";const q=k({__name:"index",props:{list:null},emits:["update:list"],setup(n,{emit:e}){const o=n,a=x(o.list?o.list[0]:null),l=m({get(){return o.list},set(t){e("update:list",t)}}),s=t=>{l.value.splice(t+1,0,N.exports.cloneDeep(a.value))},r=t=>{l.value.splice(t,1)};return(t,u)=>{const c=_("el-button"),b=_("el-row");return Array.isArray(n.list)?(g(!0),w(D,{key:0},h(n.list,(v,p)=>(g(),C(b,{class:"row",gutter:24,align:"middle",key:v},{default:i(()=>[B(t.$slots,"item",{data:v,index:p},void 0,!0),f(c,{type:"primary",circle:"",plain:"",onClick:V=>s(p)},{default:i(()=>[y("+")]),_:2},1032,["onClick"]),f(c,{type:"danger",circle:"",plain:"",disabled:n.list.length===1,onClick:V=>r(p)},{default:i(()=>[y(" - ")]),_:2},1032,["disabled","onClick"])]),_:2},1024))),128)):$("",!0)}}});const A=j(q,[["__scopeId","data-v-df2964c2"]]),L=k({__name:"dynamic-input",props:{select:{type:Object,require:!0},config:{type:Object,require:!0},group:String},setup(n){const e=n,o=m(()=>{var s;return(s=e.config)==null?void 0:s.key}),a=()=>e.group?e.select[e.group]:e.select.options[o.value]!==void 0?e.select.options:e.select,l=m({get:()=>a()[o.value],set:s=>{const r=a();r[o.value]=s}});return(s,r)=>{const t=_("el-input");return g(),C(A,{list:d(l)},{item:i(({index:u})=>[f(t,{modelValue:d(l)[u],"onUpdate:modelValue":c=>d(l)[u]=c,size:"small"},null,8,["modelValue","onUpdate:modelValue"])]),_:1},8,["list"])}}});export{L as default};