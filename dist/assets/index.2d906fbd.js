import{c as u,a as f,r as d,o as p,b as m,d as _,e as h}from"./vendor.dfdafc47.js";const y=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};y();var v=(i,s)=>{const n=i.__vccOpts||i;for(const[r,e]of s)n[r]=e;return n};const g={},L={id:"app"};function E(i,s){const n=d("router-view");return p(),u("section",L,[f(n)])}var O=v(g,[["render",E]]);const b="modulepreload",c={},k="/",w=function(s,n){return!n||n.length===0?s():Promise.all(n.map(r=>{if(r=`${k}${r}`,r in c)return;c[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":b,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((l,a)=>{o.addEventListener("load",l),o.addEventListener("error",a)})})).then(()=>s())},P=m({history:_(),routes:[{path:"/minesweeper",name:"minesweeper",component:()=>w(()=>import("./index.fd9fc87b.js"),["assets/index.fd9fc87b.js","assets/index.007b0ea7.css","assets/vendor.dfdafc47.js"])}]});h(O).use(P).mount("#app");
