import{d as s}from"./dash-board.ab3d4ef5.js";import{e as u}from"./index.da5474a2.js";import{d as p,G as d,f as r,o as i,c,u as f,C as y}from"./index.30778686.js";import"./lowcode.010f5777.js";import"./comp-wrap.c160613a.js";import"./_plugin-vue_export-helper.cdc0426e.js";const j=p({__name:"index",props:{element:{type:Object,required:!0}},setup(o){const e=o,l=d("updateItem");r(()=>e.element.options);const t=r({get(){return e.element.children},set(n){console.log("\u{1F680} ~ file: index.vue ~ line 29 ~ set ~ val",n),l(e.element,{key:"children",value:n})}});return u.on(e.element.model+"event",()=>{}),(n,a)=>(i(),c(s,{"layout-data":f(t),"onUpdate:layout-data":a[0]||(a[0]=m=>y(t)?t.value=m:null),parent:o.element},null,8,["layout-data","parent"]))}});export{j as default};