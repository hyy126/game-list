import{c as f,a as c,w as p,r as a,o as m,b as _,d as h,e as y,f as v}from"./vendor.4bdba0dd.js";const g=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};g();var w=(i,s)=>{const n=i.__vccOpts||i;for(const[t,e]of s)n[t]=e;return n};const b={},k={id:"app"},L=_("\u626B\u96F7");function E(i,s){const n=a("router-link"),t=a("router-view");return m(),f("section",k,[c(n,{to:"minesweeper"},{default:p(()=>[L]),_:1}),c(t)])}var O=w(b,[["render",E]]);const x="modulepreload",l={},P="https://hyy126.github.io/game-list/dist/",A=function(s,n){return!n||n.length===0?s():Promise.all(n.map(t=>{if(t=`${P}${t}`,t in l)return;l[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":x,e||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),e)return new Promise((u,d)=>{o.addEventListener("load",u),o.addEventListener("error",d)})})).then(()=>s())},N=h({history:y(),routes:[{path:"/minesweeper",name:"minesweeper",component:()=>A(()=>import("./index.620fa372.js"),["assets/index.620fa372.js","assets/index.007b0ea7.css","assets/vendor.4bdba0dd.js"])}]});v(O).use(N).mount("#app");
