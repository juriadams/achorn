var Achorn=function(t){var e={};function r(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(s,o,function(e){return t[e]}.bind(null,o));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){const s=r(1).Achorn;t.exports=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Timer=e.Achorn=void 0;const s=r(2);class o{constructor(t){this.globalConfig={},this.config(t||{});s.prefixes.concat(t&&t.prefixes||[]).map(t=>{t.keys.map(t=>{this[t]=(...e)=>{this.consoleLog(t,e)}})})}get longestPrefixLength(){return s.prefixes.map(t=>t.parts[1].string).reduce((t,e)=>t.length>e.length?t:e).length}config(t){this.globalConfig=t}joinParts(t,e){let r=""+" ".repeat(e||0),s=[];return t.map(t=>{r+="%c"+t.string,s.push(t.style)}),[r].concat(s)}calcAdditionalWhitespace(t){const e=t[1].string.length;return this.longestPrefixLength-e+1}consoleLog(t,e){const r=s.prefixes.find(e=>e.keys.includes(t))||s.prefixes.find(t=>t.keys.includes("info"));let o=[].concat(r.parts);switch(o.push({string:" ".repeat(this.calcAdditionalWhitespace(o)),style:"color: unset;"}),this.globalConfig.showTimestamp&&o.unshift({string:`[${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}] `,style:"color: unset;"}),this.globalConfig.globalPrefix&&(o=this.globalConfig.globalPrefix.concat(o)),r.logType){case"warn":return void console.warn(...this.joinParts(o,1),...e.length>0?e:[e[0]]);case"error":return void console.error(...this.joinParts(o,1),...e.length>0?e:[e[0]]);default:console.log(...this.joinParts(o,2),...e.length>0?e:[e[0]])}}timer(t){return new n(t)}}e.Achorn=o;class n{constructor(t){this.achorn=new o,this.key=t,this.start()}start(){this.startTime=+new Date;const t=[{string:"‣ ",style:"color: #2EB6CB;"},{string:this.key?this.key:"timer",style:"color: #2EB6CB; font-weight: bold;"}];t.push({string:" ".repeat(this.achorn.calcAdditionalWhitespace(t)),style:"color: unset;"}),console.log(...this.achorn.joinParts(t,2),"Timer started")}end(){this.endTime=+new Date,this.duration=this.endTime-this.startTime;const t=[{string:"‣ ",style:"color: #2EB6CB;"},{string:this.key?this.key:"timer",style:"color: #2EB6CB; font-weight: bold;"}];t.push({string:" ".repeat(this.achorn.calcAdditionalWhitespace(t)),style:"color: unset;"}),console.log(...this.achorn.joinParts(t,2),`Timer ended after ${this.duration}ms`)}success(...t){this.endTime=+new Date,this.duration=this.endTime-this.startTime;const e=[{string:"✔️ ",style:"color: #7EB507;"},{string:this.key?this.key:"success",style:"color: #7EB507; font-weight: bold;"}];e.push({string:" ".repeat(this.achorn.calcAdditionalWhitespace(e)),style:"color: unset;"}),console.log(...this.achorn.joinParts(e,2),...t&&t.length>0?t:[`Timer succeeded after ${this.duration}ms`])}error(...t){this.endTime=+new Date,this.duration=this.endTime-this.startTime;const e=[{string:"× ",style:"color: #FF312D;"},{string:this.key?this.key:"aborted",style:"color: #FF312D; font-weight: bold;"}];e.push({string:" ".repeat(this.achorn.calcAdditionalWhitespace(e)),style:"color: unset;"}),console.error(...this.achorn.joinParts(e,1),...t&&t.length>0?t:[`Timer errored after ${this.duration}ms`])}abort(...t){this.endTime=+new Date,this.duration=this.endTime-this.startTime;const e=[{string:"⚠️ ",style:"color: #DBA02A;"},{string:this.key?this.key:"error",style:"color: #DBA02A; font-weight: bold;"}];e.push({string:" ".repeat(this.achorn.calcAdditionalWhitespace(e)),style:"color: unset;"}),console.warn(...this.achorn.joinParts(e,1),...t&&t.length>0?t:[`Timer aborted after ${this.duration}ms`])}}e.Timer=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.prefixes=void 0,e.prefixes=[{keys:["success"],parts:[{string:"✔️ ",style:"color: #7EB507;"},{string:"success",style:"color: #7EB507; font-weight: bold;"}]},{keys:["error"],logType:"error",parts:[{string:"× ",style:"color: #FF312D;"},{string:"error",style:"color: #FF312D; font-weight: bold;"}]},{keys:["warn","warning"],logType:"warn",parts:[{string:"⚠️ ",style:"color: #DBA02A;"},{string:"warning",style:"color: #DBA02A; font-weight: bold;"}]},{keys:["await","awaiting"],parts:[{string:"… ",style:"color: #2EB6CB;"},{string:"awaiting",style:"color: #2EB6CB; font-weight: bold;"}]},{keys:["start"],parts:[{string:"► ",style:"color: #7EB507;"},{string:"start",style:"color: #7EB507; font-weight: bold;"}]},{keys:["pause"],parts:[{string:"‖ ",style:"color: #DBA02A;"},{string:"pause",style:"color: #DBA02A; font-weight: bold;"}]},{keys:["debug"],parts:[{string:"● ",style:"color: #2EB6CB;"},{string:"debug",style:"color: #2EB6CB; font-weight: bold;"}]},{keys:["info"],parts:[{string:"i ",style:"color: #2EB6CB;"},{string:"info",style:"color: #2EB6CB; font-weight: bold;"}]},{keys:["fatal"],logType:"error",parts:[{string:"◆ ",style:"color: #FF312D;"},{string:"fatal",style:"color: #FF312D; font-weight: bold;"}]},{keys:["timerStart"],parts:[{string:"‣ ",style:"color: #2EB6CB;"},{string:"timer",style:"color: #2EB6CB; font-weight: bold;"}]}]}]);