(this["webpackJsonpalexandria-floods"]=this["webpackJsonpalexandria-floods"]||[]).push([[0],{216:function(e,t,a){e.exports=a(500)},221:function(e,t,a){},500:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(63),l=a.n(c),o=(a(221),a(108)),u=a(33),i=a(505),m=a(506),s=a(25),d=a(507),f=a(107),E=a(18),h=function(e){var t=e.data,a=e.maxYValue,n=e.dataKey,c=e.syncId;return r.a.createElement(E.e,{width:"100%",height:300},r.a.createElement(E.d,{syncId:c,margin:{right:5,bottom:20}},r.a.createElement(E.a,{strokeDasharray:"3 3"}),r.a.createElement(E.f,{dataKey:"elapsedTime",type:"number",ticks:[0,30,60,90,120,150,180],domain:[0,180],label:{value:"Elapsed time (minutes)",position:"bottom",offset:0}}),r.a.createElement(E.g,{dataKey:n,width:20,domain:a&&[0,Math.ceil(a)]||void 0}),r.a.createElement(E.b,{verticalAlign:"top",iconType:"square"}),t.map((function(e){return r.a.createElement(E.c,{key:e.date,connectNulls:!0,type:"monotone",data:e.data.filter((function(e){return e.elapsedTime<=180})),name:e.date,dataKey:n,stroke:e.color,dot:!1})}))))},v=function(e){var t=e.floodData,a=e.nonFloodData,c=Object(n.useState)(!1),l=Object(u.a)(c,2),o=l[0],m=l[1],E=Object(d.a)([].concat(Object(s.a)(t.map((function(e){return e.data}))),Object(s.a)(a.map((function(e){return e.data}))))),v=Object(f.a)([].concat(Object(s.a)(E.map((function(e){return e.rate}))),Object(s.a)(E.map((function(e){return e.accumulation}))))),p=[].concat(Object(s.a)(t),Object(s.a)(o?a:[])).sort((function(e,t){return Object(i.a)(e.date,t.date)}));return r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col text-center"},r.a.createElement("h2",null,"Precipitation events"),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",id:"show-non-flood",name:"show-non-flood",checked:o,onChange:function(){return m(!o)},className:"mr-1"}),r.a.createElement("label",{htmlFor:"show-non-flood"},"Show heavy rain events (non-flood)")))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-6"},r.a.createElement("h3",{className:"text-center"},"Rate"),r.a.createElement(h,{data:p,maxYValue:v,dataKey:"rate"})),r.a.createElement("div",{className:"col-lg-6"},r.a.createElement("h3",{className:"text-center"},"Total Accumulation"),r.a.createElement(h,{data:p,maxYValue:v,dataKey:"accumulation"}))))},p=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("p",null,"In the Hooffs Run/Blue Park neighborhood, we have had 3 major flood events in 2019 and 2020: ",r.a.createElement("strong",null,"July 8, 2019"),";"," ",r.a.createElement("strong",null,"July 23, 2020"),"; and ",r.a.createElement("strong",null,"September 10, 2020"),". Using local personal weather stations (PWS), we gathered data dating back to October 2012 looking for major precipitation events (note that only 2019 and 2020 data are currently in the app). In the charts below, we show the ",r.a.createElement("strong",null,"precipitation rate (inch per hour)")," and"," ",r.a.createElement("strong",null,"total accumulation (inches)")," for selected flood and heavy rain events. Flood events use reds/oranges/yellows, while heavy rain events use blues/greens.")))},b=a(187),w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return Object(b.a)(e)?e.toFixed(2)+t:"\u2014"},g=function(e){var t=e.data;return r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Time"),r.a.createElement("th",null,"Rate"),r.a.createElement("th",null,"Accum."))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",{key:e.time},r.a.createElement("th",null,e.time),r.a.createElement("td",{align:"right"},w(e.rate," in.")),r.a.createElement("td",{align:"right"},w(e.accumulation," in.")))}))))},y=function(e){var t=e.data;return r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("h2",{className:"text-center"},"Detailed data for flood events"))),r.a.createElement("div",{className:"row"},t.map((function(e){return r.a.createElement("div",{className:"col-md-4",key:e.date},r.a.createElement("h3",{className:"text-center"},e.date),r.a.createElement(g,{data:e.data.filter((function(e,t){return t<14}))}))}))))},x=a(45),N=a.n(x),j=a(106),k=a(42),O=a(508);function A(e){return D.apply(this,arguments)}function D(){return(D=Object(j.a)(N.a.mark((function e(t){return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(O.a)(t,(function(e){var t=e.Date,a=e.Time,n=e["Precip. Rate."],r=e["Precip. Accum."];return{date:String(t),time:String(a),rate:n&&0!==n.length?Number(n):null,accumulation:r&&0!==r.length?Number(r):null}})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var T=function(){var e=Object(j.a)(N.a.mark((function e(){var t,a;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A("/alexandria-floods/data/all.csv");case 2:return t=e.sent,a=Object(k.b)().key((function(e){return e.date})).rollup((function(e){return{maxRate:Object(f.a)(e.map((function(e){return e.rate}))),maxAccumulation:Object(f.a)(e.map((function(e){return e.accumulation}))),data:e}})).entries(t),e.abrupt("return",a.sort((function(e,t){return Object(i.a)(e.key,t.key)})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();var R=function(e,t){var a=(e.getTime()-t.getTime())/1e3/60;return Math.abs(Math.round(a))},S=["2019-07-08","2020-07-23","2020-09-10"],K=["#c20000","#ff5e00","#ffce6c"],F=["#000048","#0044d1","#69c0ff","#45a183","#008400"];var P=function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],c=t[1];Object(n.useEffect)((function(){T().then(c)}),[]);var l=a?a.filter((function(e){return S.includes(e.key)})).sort((function(e,t){return Object(i.a)(e.value.maxAccumulation||0,t.value.maxAccumulation||0)})).map((function(e,t){var a=e.value.data.findIndex((function(e){return e.rate&&e.rate>.5})),n=a>=2?a-2:0,r=null;return{date:e.key,data:e.value.data.filter((function(e,t){return t>=n})).map((function(e,t){r||(r=new Date("".concat(e.date," ").concat(e.time)));var a=new Date("".concat(e.date," ").concat(e.time));return Object(o.a)({},e,{elapsedTime:R(r,a)})})).sort((function(e,t){return Object(m.a)(e.elapsedTime,t.elapsedTime)})),color:K[t]}})):null,s=a&&a.filter((function(e){return!S.includes(e.key)})).filter((function(e){return e.value.maxAccumulation&&e.value.maxAccumulation>=1.5&&e.value.maxRate&&e.value.maxRate>=1})).sort((function(e,t){return Object(i.a)(e.value.maxAccumulation||0,t.value.maxAccumulation||0)})).map((function(e,t){var a=e.value.data.find((function(t){return t.rate===e.value.maxRate})),n=a&&new Date("".concat(a.date," ").concat(a.time)),r=null;return{date:e.key,data:e.value.data.filter((function(e){if(!n)return!0;var t=new Date("".concat(e.date," ").concat(e.time));return R(n,t)<120})).map((function(e,t){r||(r=new Date("".concat(e.date," ").concat(e.time)));var a=new Date("".concat(e.date," ").concat(e.time));return Object(o.a)({},e,{elapsedTime:R(r,a)})})).sort((function(e,t){return Object(m.a)(e.elapsedTime,t.elapsedTime)})),color:F[t]}}));return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"header text-center"},r.a.createElement("h1",null,"Precipitation Stats for Major Flash Flood Events in Hooffs Run, Alexandria,\xa0VA")),r.a.createElement(p,null),l&&s?r.a.createElement("div",null,r.a.createElement(v,{floodData:l,nonFloodData:s}),r.a.createElement("hr",null),r.a.createElement(y,{data:l})):r.a.createElement("div",{className:"row align-items-center"},r.a.createElement("div",{className:"col text-center"},r.a.createElement("div",{className:"spinner-border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")))),a&&r.a.createElement("div",{className:"row border-top mt-3 pt-2"},r.a.createElement("div",{className:"col-lg-3"}),r.a.createElement("div",{className:"col-lg-6"},r.a.createElement("h2",{className:"text-center"},"Daily data"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Date"),r.a.createElement("th",null,"Max precip. rate"),r.a.createElement("th",null,"Total accumulation"))),r.a.createElement("tbody",null,a.map((function(e){return r.a.createElement("tr",{key:e.key},r.a.createElement("th",null,r.a.createElement("a",{href:"https://www.wunderground.com/dashboard/pws/KVAALEXA9/table/".concat(e.key,"/").concat(e.key,"/daily#history-toolbar")},e.key)),r.a.createElement("td",{align:"right"},w(e.value.maxRate," in.")),r.a.createElement("td",{align:"right"},w(e.value.maxAccumulation," in.")))}))))),r.a.createElement("div",{className:"col-lg-3"})),r.a.createElement("hr",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col text-center"},r.a.createElement("p",{className:"mb-0"},"Data retrieved from"," ",r.a.createElement("a",{href:"https://www.wunderground.com/dashboard/pws/KVAALEXA9",target:"_blank",rel:"noopener noreferrer"},"PWS Rosemont Park - KVAALEXA9")),r.a.createElement("p",null,"Icons made by"," ",r.a.createElement("a",{href:"https://www.flaticon.com/authors/good-ware",title:"Good Ware"},"Good Ware")," ","from"," ",r.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[216,1,2]]]);
//# sourceMappingURL=main.91b2169c.chunk.js.map