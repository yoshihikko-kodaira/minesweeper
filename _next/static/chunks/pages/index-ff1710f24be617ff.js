(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,o,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(85)}])},85:function(e,o,n){"use strict";n.r(o);var i=n(5893),t=n(7294),r=n(2729),a=n.n(r);o.default=()=>{let[e,o]=(0,t.useState)(20),[n,r]=(0,t.useState)([]),[l,d]=(0,t.useState)(!0),[s,c]=(0,t.useState)(12),_=[[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0]],f=(e,o)=>{let n=[];for(let i=0;i<e;i++){let e=[];for(let n=0;n<o;n++)e.push({mine:!1,neighbors:0,revealed:!1,flagged:!1});n.push(e)}return n};(0,t.useEffect)(()=>{r(f(10,10))},[]);let u=(e,o)=>{if(n[o][e].flagged)return;if(n[o][e].mine){for(let e of n)for(let o of e)o.mine&&(o.revealed=!0);c(14);return}let i=[...n];if(l){let n=[];for(;n.length<20;){let i=Math.floor(100*Math.random());n.includes(i)||o===Math.floor(i/10)&&e===i%10||n.push(i)}for(let e of n){let o=Math.floor(e/10),n=e%10;i[o][n].mine=!0}for(let e=0;e<10;e++)for(let o=0;o<10;o++)for(let n of _)void 0!==i[e+n[0]]&&void 0!==i[e+n[0]][o+n[1]]&&i[e+n[0]][o+n[1]].mine&&i[e][o].neighbors++;r(i),d(!1)}let t=(e,o,n)=>{if(0===n[o][e].neighbors){for(let i of _)if(void 0!==n[o+i[0]]&&void 0!==n[o+i[0]][e+i[1]]){if(n[o+i[0]][e+i[1]].revealed||n[o+i[0]][e+i[1]].mine||0!==n[o+i[0]][e+i[1]].neighbors){if(0!==n[o+i[0]][e+i[1]].neighbors)for(let i of _)void 0===n[o+i[0]]||void 0===n[o+i[0]][e+i[1]]||0===n[o+i[0]][e+i[1]].neighbors||n[o+i[0]][e+i[1]].mine||(n[o+i[0]][e+i[1]].revealed=!0)}else n[o+i[0]][e+i[1]].revealed=!0,t(e+i[1],o+i[0],n)}}};i[o][e].revealed=!0,t(e,o,i),r(i);let a=0;for(let e of i)for(let o of e)o.revealed&&a++;if(80===a){c(13);return}},g=(i,t,a)=>{i.preventDefault();let l=[...n];l[a][t].flagged=!l[a][t].flagged,l[a][t].flagged?o(e-1):o(e+1),r(l)},x=()=>{r(f(10,10)),o(20),d(!0),c(12)};return(0,i.jsx)("div",{className:a().container,children:(0,i.jsxs)("div",{className:a().gamecontainer,children:[(0,i.jsxs)("div",{className:a().topbar,children:[(0,i.jsx)("div",{className:a().display,children:e}),(0,i.jsx)("div",{className:a().emoji,style:{backgroundPositionX:30-30*s},onClick:()=>x()}),(0,i.jsx)("div",{className:a().display,children:"11"})]}),(0,i.jsx)("div",{className:a().board,children:n.map((e,o)=>(0,i.jsx)("div",{className:a().row,children:e.map((e,n)=>e.revealed?e.mine?(0,i.jsx)("div",{className:a().cell,style:{backgroundPositionX:-240}},"".concat(n,"-").concat(o)):(0,i.jsx)("div",{className:a().cell,style:{backgroundPositionX:24-24*e.neighbors}},"".concat(n,"-").concat(o)):e.flagged?(0,i.jsx)("button",{className:a().cover,style:{backgroundPositionX:-216},onClick:()=>u(n,o),onContextMenu:e=>g(e,n,o)},"".concat(n,"-").concat(o)):(0,i.jsx)("button",{className:a().cover,style:{backgroundPositionX:24},onClick:()=>u(n,o),onContextMenu:e=>g(e,n,o)},"".concat(n,"-").concat(o)))},o))})]})})}},2729:function(e){e.exports={container:"index_container___q52_",main:"index_main__OmNu0",footer:"index_footer__v7pGE",title:"index_title__k0g7D",description:"index_description__fcKbo",code:"index_code__r6g09",grid:"index_grid__LrZtk",card:"index_card__7H7ka",logo:"index_logo__Z0ACT",topbar:"index_topbar__nGEhO",display:"index_display__fIk67",emoji:"index_emoji__HOWx3",gamecontainer:"index_gamecontainer__8Whu4",row:"index_row__UqwCN",cell:"index_cell__E8qMc",board:"index_board__dNO5V",cover:"index_cover__Hrjg1"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);