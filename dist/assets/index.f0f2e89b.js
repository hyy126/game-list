import{r as y,a as _,K as x,L as A,o as I,c as j,b as B}from"./vendor.c2e7c4d3.js";import{u as F,a as N}from"./index.a5fa294d.js";const E=5,m=E-1,T=S=>{const{size:i,interval:d}=S;let o=y([]);const r=i/d;for(let h=0;h<=i;h+=d){let C=[];for(let u=0;u<=i;u+=d)C.push({pos:{x:u,y:h}});o.value.push(C)}return{points:o,hasFiveInARow:()=>{let h=0,C=-1;const u=()=>{h=0,C=-1},v=t=>{if(!t)return!1;if(t!==C&&(h=0,C=t),h++,h===E)return!0};for(let t=0;t<o.value.length;t++){let e=o.value[t];const l=e.length;u();for(let n=0;n<l;n++){const g=e[n].chess;if(v(g))return!0}u();for(let n=0;n<l;n++){const g=o.value[n][t].chess;if(v(g))return!0}}for(let t=m;t<=r;t++){let e=[t,0],l=!0;for(u();e[0]>-1&&l;){const n=o.value[e[1]][e[0]].chess;v(n)&&(l=!1),e=[e[0]-1,e[1]+1]}if(!l)return!0}for(let t=1;t<=r-m;t++){let e=[r,t],l=!0;for(u();e[1]<=r&&l;){const n=o.value[e[1]][e[0]].chess;v(n)&&(l=!1),e=[e[0]-1,e[1]+1]}if(!l)return!0}for(let t=0;t<=r-m;t++){let e=[t,0],l=!0;for(u();e[0]<=r&&l;){const n=o.value[e[1]][e[0]].chess;v(n)&&(l=!1),e=[e[0]+1,e[1]+1]}if(!l)return!0}for(let t=1;t<=r-m;t++){let e=[0,t],l=!0;for(u();e[1]<=r&&l;){const n=o.value[e[1]][e[0]].chess;v(n)&&(l=!1),e=[e[0]+1,e[1]+1]}if(!l)return!0}return!1}}},D={class:"fiveinarow-wrapper"},M=B("h1",null,"\u4E94\u5B50\u68CB",-1),G=_({setup(S){const i=540,d=30,o=24,r=y(),w=x(),{points:h,hasFiveInARow:C}=T({size:i,interval:d}),{send:u}=F(),v=N();A(()=>{var a;let s=(a=r.value)==null?void 0:a.getContext("2d");if(!!s){r.value.width=i+o*2,r.value.height=i+o*2;for(let c=0;c<=i;c+=d)s.moveTo(o,c+o),s.lineTo(i+o,c+o),s.moveTo(c+o,o),s.lineTo(c+o,i+o);s.rect(o,o,i,i),s.fillStyle="#DCB26A",s.fill(),s.lineWidth=1,s.strokeStyle="#865A24",s.stroke()}});let t,e=[0,0];const l=()=>{t||(e[0]===0&&e[1]===0?t=1:t=2)},n=s=>{if(l(),console.log(t,e),t===1&&e[0]>e[1]||t===2&&e[1]>=e[0])return;const a={x:s.clientX-r.value.getBoundingClientRect().left-o,y:s.clientY-r.value.getBoundingClientRect().top-o},c=Math.floor(a.x/d)+(a.x%d<15?0:1),f=Math.floor(a.y/d)+(a.y%d<15?0:1),p=h.value[f][c];p.chess||(p.chess=t,u(v.room,JSON.stringify({point:p,row:f,col:c})))},g=s=>{s.chess===1?e[0]++:e[1]++,l(),R(s.pos.x+o,s.pos.y+o,s.chess===1),C()&&w.success(`\u725B\u554A!!${s.chess===1?"\u9ED1\u68CB":"\u767D\u68CB"}\u6E38\u620F\u80DC\u5229!`)};v.listen(s=>{try{let{point:a,row:c,col:f}=JSON.parse(s);h.value[c][f]=a,g(a)}catch{w.error(`${w}json\u89E3\u6790\u5F02\u5E38`)}});const R=(s,a,c)=>{var k;let f=(k=r.value)==null?void 0:k.getContext("2d");if(!f)return;let p=f.createRadialGradient(s,a,o,s-5,a-5,0);f.beginPath(),f.arc(s,a,o/2,0,2*Math.PI),f.closePath(),c?(p.addColorStop(0,"#0a0a0a"),p.addColorStop(1,"#636766")):(p.addColorStop(0,"#d1d1d1"),p.addColorStop(1,"#f9f9f9")),f.fillStyle=p,f.fill()};return(s,a)=>(I(),j("section",D,[M,B("canvas",{ref_key:"fiveCanvas",ref:r,onClick:n},null,512)]))}});export{G as default};
