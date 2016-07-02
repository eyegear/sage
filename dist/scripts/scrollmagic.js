!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var e=function(){o.log(2,"(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")};e.version="2.0.5",window.addEventListener("mousewheel",function(){});var t="data-scrollmagic-pin-spacer";e.Controller=function(r){var i,l,s="ScrollMagic.Controller",a="FORWARD",c="REVERSE",u="PAUSED",f=n.defaults,d=this,g=o.extend({},f,r),p=[],h=!1,v=0,m=u,w=!0,y=0,S=!0,E=function(){for(var t in g)f.hasOwnProperty(t)||(P(2,'WARNING: Unknown option "'+t+'"'),delete g[t]);if(g.container=o.get.elements(g.container)[0],!g.container)throw P(1,"ERROR creating object "+s+": No valid scroll container supplied"),s+" init failed.";w=g.container===window||g.container===document.body||!document.body.contains(g.container),w&&(g.container=window),y=T(),g.container.addEventListener("resize",O),g.container.addEventListener("scroll",O),g.refreshInterval=parseInt(g.refreshInterval)||f.refreshInterval,b(),P(3,"added new "+s+" controller (v"+e.version+")")},b=function(){g.refreshInterval>0&&(l=window.setTimeout(z,g.refreshInterval))},R=function(){return g.vertical?o.get.scrollTop(g.container):o.get.scrollLeft(g.container)},T=function(){return g.vertical?o.get.height(g.container):o.get.width(g.container)},C=this._setScrollPos=function(e){g.vertical?w?window.scrollTo(o.get.scrollLeft(),e):g.container.scrollTop=e:w?window.scrollTo(e,o.get.scrollTop()):g.container.scrollLeft=e},x=function(){if(S&&h){var e=o.type.Array(h)?h:p.slice(0);h=!1;var t=v;v=d.scrollPos();var n=v-t;0!==n&&(m=n>0?a:c),m===c&&e.reverse(),e.forEach(function(t,n){P(3,"updating Scene "+(n+1)+"/"+e.length+" ("+p.length+" total)"),t.update(!0)}),0===e.length&&g.loglevel>=3&&P(3,"updating 0 Scenes (nothing added to controller)")}},F=function(){i=o.rAF(x)},O=function(e){P(3,"event fired causing an update:",e.type),"resize"==e.type&&(y=T(),m=u),h!==!0&&(h=!0,F())},z=function(){if(!w&&y!=T()){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){e=document.createEvent("Event"),e.initEvent("resize",!1,!1)}g.container.dispatchEvent(e)}p.forEach(function(e,t){e.refresh()}),b()},P=this._log=function(e,t){g.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+s+") ->"),o.log.apply(window,arguments))};this._options=g;var A=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(t){if(o.type.Array(t))t.forEach(function(e,t){d.addScene(e)});else if(t instanceof e.Scene){if(t.controller()!==d)t.addTo(d);else if(p.indexOf(t)<0){p.push(t),p=A(p),t.on("shift.controller_sort",function(){p=A(p)});for(var n in g.globalSceneOptions)t[n]&&t[n].call(t,g.globalSceneOptions[n]);P(3,"adding Scene (now "+p.length+" total)")}}else P(1,"ERROR: invalid argument supplied for '.addScene()'");return d},this.removeScene=function(e){if(o.type.Array(e))e.forEach(function(e,t){d.removeScene(e)});else{var t=p.indexOf(e);t>-1&&(e.off("shift.controller_sort"),p.splice(t,1),P(3,"removing Scene (now "+p.length+" left)"),e.remove())}return d},this.updateScene=function(t,n){return o.type.Array(t)?t.forEach(function(e,t){d.updateScene(e,n)}):n?t.update(!0):h!==!0&&t instanceof e.Scene&&(h=h||[],h.indexOf(t)==-1&&h.push(t),h=A(h),F()),d},this.update=function(e){return O({type:"resize"}),e&&x(),d},this.scrollTo=function(n,r){if(o.type.Number(n))C.call(g.container,n,r);else if(n instanceof e.Scene)n.controller()===d?d.scrollTo(n.scrollOffset(),r):P(2,"scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",n);else if(o.type.Function(n))C=n;else{var i=o.get.elements(n)[0];if(i){for(;i.parentNode.hasAttribute(t);)i=i.parentNode;var l=g.vertical?"top":"left",s=o.get.offset(g.container),a=o.get.offset(i);w||(s[l]-=d.scrollPos()),d.scrollTo(a[l]-s[l],r)}else P(2,"scrollTo(): The supplied argument is invalid. Scroll cancelled.",n)}return d},this.scrollPos=function(e){return arguments.length?(o.type.Function(e)?R=e:P(2,"Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."),d):R.call(d)},this.info=function(e){var t={size:y,vertical:g.vertical,scrollPos:v,scrollDirection:m,container:g.container,isDocument:w};return arguments.length?void 0!==t[e]?t[e]:void P(1,'ERROR: option "'+e+'" is not available'):t},this.loglevel=function(e){return arguments.length?(g.loglevel!=e&&(g.loglevel=e),d):g.loglevel},this.enabled=function(e){return arguments.length?(S!=e&&(S=!!e,d.updateScene(p,!0)),d):S},this.destroy=function(e){window.clearTimeout(l);for(var t=p.length;t--;)p[t].destroy(e);return g.container.removeEventListener("resize",O),g.container.removeEventListener("scroll",O),o.cAF(i),P(3,"destroyed "+s+" (reset: "+(e?"true":"false")+")"),null},E(),d};var n={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};e.Controller.addOption=function(e,t){n.defaults[e]=t},e.Controller.extend=function(t){var n=this;e.Controller=function(){return n.apply(this,arguments),this.$super=o.extend({},this),t.apply(this,arguments)||this},o.extend(e.Controller,n),e.Controller.prototype=n.prototype,e.Controller.prototype.constructor=e.Controller},e.Scene=function(n){var i,l,s="ScrollMagic.Scene",a="BEFORE",c="DURING",u="AFTER",f=r.defaults,d=this,g=o.extend({},f,n),p=a,h=0,v={start:0,end:0},m=0,w=!0,y=function(){for(var e in g)f.hasOwnProperty(e)||(E(2,'WARNING: Unknown option "'+e+'"'),delete g[e]);for(var t in f)z(t);F()},S={};this.on=function(e,t){return o.type.Function(t)?(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],o=n[1];"*"!=r&&(S[r]||(S[r]=[]),S[r].push({namespace:o||"",callback:t}))})):E(1,"ERROR when calling '.on()': Supplied callback for '"+e+"' is not a valid function!"),d},this.off=function(e,t){return e?(e=e.trim().split(" "),e.forEach(function(e,n){var r=e.split("."),o=r[0],i=r[1]||"",l="*"===o?Object.keys(S):[o];l.forEach(function(e){for(var n=S[e]||[],r=n.length;r--;){var o=n[r];!o||i!==o.namespace&&"*"!==i||t&&t!=o.callback||n.splice(r,1)}n.length||delete S[e]})}),d):(E(1,"ERROR: Invalid event name supplied."),d)},this.trigger=function(t,n){if(t){var r=t.trim().split("."),o=r[0],i=r[1],l=S[o];E(3,"event fired:",o,n?"->":"",n||""),l&&l.forEach(function(t,r){i&&i!==t.namespace||t.callback.call(d,new e.Event(o,t.namespace,d,n))})}else E(1,"ERROR: Invalid event name supplied.");return d},d.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?T():"reverse"===e.what&&d.update())}).on("shift.internal",function(e){b(),d.update()});var E=this._log=function(e,t){g.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+s+") ->"),o.log.apply(window,arguments))};this.addTo=function(t){return t instanceof e.Controller?l!=t&&(l&&l.removeScene(d),l=t,F(),R(!0),T(!0),b(),l.info("container").addEventListener("resize",C),t.addScene(d),d.trigger("add",{controller:l}),E(3,"added "+s+" to controller"),d.update()):E(1,"ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"),d},this.enabled=function(e){return arguments.length?(w!=e&&(w=!!e,d.update(!0)),d):w},this.remove=function(){if(l){l.info("container").removeEventListener("resize",C);var e=l;l=void 0,e.removeScene(d),d.trigger("remove"),E(3,"removed "+s+" from controller")}return d},this.destroy=function(e){return d.trigger("destroy",{reset:e}),d.remove(),d.off("*.*"),E(3,"destroyed "+s+" (reset: "+(e?"true":"false")+")"),null},this.update=function(e){if(l)if(e)if(l.enabled()&&w){var t,n=l.info("scrollPos");t=g.duration>0?(n-v.start)/(v.end-v.start):n>=v.start?1:0,d.trigger("update",{startPos:v.start,endPos:v.end,scrollPos:n}),d.progress(t)}else P&&p===c&&L(!0);else l.updateScene(d,!1);return d},this.refresh=function(){return R(),T(),d},this.progress=function(e){if(arguments.length){var t=!1,n=p,r=l?l.info("scrollDirection"):"PAUSED",o=g.reverse||e>=h;if(0===g.duration?(t=h!=e,h=e<1&&o?0:1,p=0===h?a:c):e<0&&p!==a&&o?(h=0,p=a,t=!0):e>=0&&e<1&&o?(h=e,p=c,t=!0):e>=1&&p!==u?(h=1,p=u,t=!0):p!==c||o||L(),t){var i={progress:h,state:p,scrollDirection:r},s=p!=n,f=function(e){d.trigger(e,i)};s&&n!==c&&(f("enter"),f(n===a?"start":"end")),f("progress"),s&&p!==c&&(f(p===a?"start":"end"),f("leave"))}return d}return h};var b=function(){v={start:m+g.offset},l&&g.triggerElement&&(v.start-=l.info("size")*g.triggerHook),v.end=v.start+g.duration},R=function(e){if(i){var t="duration";O(t,i.call(d))&&!e&&(d.trigger("change",{what:t,newval:g[t]}),d.trigger("shift",{reason:t}))}},T=function(e){var n=0,r=g.triggerElement;if(l&&r){for(var i=l.info(),s=o.get.offset(i.container),a=i.vertical?"top":"left";r.parentNode.hasAttribute(t);)r=r.parentNode;var c=o.get.offset(r);i.isDocument||(s[a]-=l.scrollPos()),n=c[a]-s[a]}var u=n!=m;m=n,u&&!e&&d.trigger("shift",{reason:"triggerElementPosition"})},C=function(e){g.triggerHook>0&&d.trigger("shift",{reason:"containerResize"})},x=o.extend(r.validate,{duration:function(e){if(o.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)){var t=parseFloat(e)/100;e=function(){return l?l.info("size")*t:0}}if(o.type.Function(e)){i=e;try{e=parseFloat(i())}catch(n){e=-1}}if(e=parseFloat(e),!o.type.Number(e)||e<0)throw i?(i=void 0,['Invalid return value of supplied function for option "duration":',e]):['Invalid value for option "duration":',e];return e}}),F=function(e){e=arguments.length?[e]:Object.keys(x),e.forEach(function(e,t){var n;if(x[e])try{n=x[e](g[e])}catch(r){n=f[e];var i=o.type.String(r)?[r]:r;o.type.Array(i)?(i[0]="ERROR: "+i[0],i.unshift(1),E.apply(this,i)):E(1,"ERROR: Problem executing validation callback for option '"+e+"':",r.message)}finally{g[e]=n}})},O=function(e,t){var n=!1,r=g[e];return g[e]!=t&&(g[e]=t,F(e),n=r!=g[e]),n},z=function(e){d[e]||(d[e]=function(t){return arguments.length?("duration"===e&&(i=void 0),O(e,t)&&(d.trigger("change",{what:e,newval:g[e]}),r.shifts.indexOf(e)>-1&&d.trigger("shift",{reason:e})),d):g[e]})};this.controller=function(){return l},this.state=function(){return p},this.scrollOffset=function(){return v.start},this.triggerPosition=function(){var e=g.offset;return l&&(e+=g.triggerElement?m:l.info("size")*d.triggerHook()),e};var P,A;d.on("shift.internal",function(e){var t="duration"===e.reason;(p===u&&t||p===c&&0===g.duration)&&L(),t&&I()}).on("progress.internal",function(e){L()}).on("add.internal",function(e){I()}).on("destroy.internal",function(e){d.removePin(e.reset)});var L=function(e){if(P&&l){var t=l.info(),n=A.spacer.firstChild;if(e||p!==c){var r={position:A.inFlow?"relative":"absolute",top:0,left:0},i=o.css(n,"position")!=r.position;A.pushFollowers?g.duration>0&&(p===u&&0===parseFloat(o.css(A.spacer,"padding-top"))?i=!0:p===a&&0===parseFloat(o.css(A.spacer,"padding-bottom"))&&(i=!0)):r[t.vertical?"top":"left"]=g.duration*h,o.css(n,r),i&&I()}else{"fixed"!=o.css(n,"position")&&(o.css(n,{position:"fixed"}),I());var s=o.get.offset(A.spacer,!0),f=g.reverse||0===g.duration?t.scrollPos-v.start:Math.round(h*g.duration*10)/10;s[t.vertical?"top":"left"]+=f,o.css(A.spacer.firstChild,{top:s.top,left:s.left})}}},I=function(){if(P&&l&&A.inFlow){var e=p===c,t=l.info("vertical"),n=A.spacer.firstChild,r=o.isMarginCollapseType(o.css(A.spacer,"display")),i={};A.relSize.width||A.relSize.autoFullWidth?e?o.css(P,{width:o.get.width(A.spacer)}):o.css(P,{width:"100%"}):(i["min-width"]=o.get.width(t?P:n,!0,!0),i.width=e?i["min-width"]:"auto"),A.relSize.height?e?o.css(P,{height:o.get.height(A.spacer)-(A.pushFollowers?g.duration:0)}):o.css(P,{height:"100%"}):(i["min-height"]=o.get.height(t?n:P,!0,!r),i.height=e?i["min-height"]:"auto"),A.pushFollowers&&(i["padding"+(t?"Top":"Left")]=g.duration*h,i["padding"+(t?"Bottom":"Right")]=g.duration*(1-h)),o.css(A.spacer,i)}},N=function(){l&&P&&p===c&&!l.info("isDocument")&&L()},_=function(){l&&P&&p===c&&((A.relSize.width||A.relSize.autoFullWidth)&&o.get.width(window)!=o.get.width(A.spacer.parentNode)||A.relSize.height&&o.get.height(window)!=o.get.height(A.spacer.parentNode))&&I()},M=function(e){l&&P&&p===c&&!l.info("isDocument")&&(e.preventDefault(),l._setScrollPos(l.info("scrollPos")-((e.wheelDelta||e[l.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,n){var r={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"};if(n=o.extend({},r,n),e=o.get.elements(e)[0],!e)return E(1,"ERROR calling method 'setPin()': Invalid pin element supplied."),d;if("fixed"===o.css(e,"position"))return E(1,"ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."),d;if(P){if(P===e)return d;d.removePin()}P=e;var i=P.parentNode.style.display,l=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];P.parentNode.style.display="none";var s="absolute"!=o.css(P,"position"),a=o.css(P,l.concat(["display"])),c=o.css(P,["width","height"]);P.parentNode.style.display=i,!s&&n.pushFollowers&&(E(2,"WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."),n.pushFollowers=!1),window.setTimeout(function(){P&&0===g.duration&&n.pushFollowers&&E(2,"WARNING: pushFollowers =",!0,"has no effect, when scene duration is 0.")},0);var u=P.parentNode.insertBefore(document.createElement("div"),P),f=o.extend(a,{position:s?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(s||o.extend(f,o.css(P,["width","height"])),o.css(u,f),u.setAttribute(t,""),o.addClass(u,n.spacerClass),A={spacer:u,relSize:{width:"%"===c.width.slice(-1),height:"%"===c.height.slice(-1),autoFullWidth:"auto"===c.width&&s&&o.isMarginCollapseType(a.display)},pushFollowers:n.pushFollowers,inFlow:s},!P.___origStyle){P.___origStyle={};var p=P.style,h=l.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]);h.forEach(function(e){P.___origStyle[e]=p[e]||""})}return A.relSize.width&&o.css(u,{width:c.width}),A.relSize.height&&o.css(u,{height:c.height}),u.appendChild(P),o.css(P,{position:s?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(A.relSize.width||A.relSize.autoFullWidth)&&o.css(P,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",N),window.addEventListener("resize",N),window.addEventListener("resize",_),P.addEventListener("mousewheel",M),P.addEventListener("DOMMouseScroll",M),E(3,"added pin"),L(),d},this.removePin=function(e){if(P){if(p===c&&L(!0),e||!l){var n=A.spacer.firstChild;if(n.hasAttribute(t)){var r=A.spacer.style,i=["margin","marginLeft","marginRight","marginTop","marginBottom"];margins={},i.forEach(function(e){margins[e]=r[e]||""}),o.css(n,margins)}A.spacer.parentNode.insertBefore(n,A.spacer),A.spacer.parentNode.removeChild(A.spacer),P.parentNode.hasAttribute(t)||(o.css(P,P.___origStyle),delete P.___origStyle)}window.removeEventListener("scroll",N),window.removeEventListener("resize",N),window.removeEventListener("resize",_),P.removeEventListener("mousewheel",M),P.removeEventListener("DOMMouseScroll",M),P=void 0,E(3,"removed pin (reset: "+(e?"true":"false")+")")}return d};var k,D=[];return d.on("destroy.internal",function(e){d.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=o.get.elements(e);return 0!==n.length&&o.type.String(t)?(D.length>0&&d.removeClassToggle(),k=t,D=n,d.on("enter.internal_class leave.internal_class",function(e){var t="enter"===e.type?o.addClass:o.removeClass;D.forEach(function(e,n){t(e,k)})}),d):(E(1,"ERROR calling method 'setClassToggle()': Invalid "+(0===n.length?"element":"classes")+" supplied."),d)},this.removeClassToggle=function(e){return e&&D.forEach(function(e,t){o.removeClass(e,k)}),d.off("start.internal_class end.internal_class"),k=void 0,D=[],d},y(),d};var r={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!o.type.Number(e))throw['Invalid value for option "offset":',e];return e},triggerElement:function(e){if(e=e||void 0){var t=o.get.elements(e)[0];if(!t)throw['Element defined in option "triggerElement" was not found:',e];e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(o.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw['Invalid value for option "triggerHook": ',e];e=t[e]}return e},reverse:function(e){return!!e},loglevel:function(e){if(e=parseInt(e),!o.type.Number(e)||e<0||e>3)throw['Invalid value for option "loglevel":',e];return e}},shifts:["duration","offset","triggerHook"]};e.Scene.addOption=function(t,n,o,i){t in r.defaults?e._util.log(1,"[static] ScrollMagic.Scene -> Cannot add Scene option '"+t+"', because it already exists."):(r.defaults[t]=n,r.validate[t]=o,i&&r.shifts.push(t))},e.Scene.extend=function(t){var n=this;e.Scene=function(){return n.apply(this,arguments),this.$super=o.extend({},this),t.apply(this,arguments)||this},o.extend(e.Scene,n),e.Scene.prototype=n.prototype,e.Scene.prototype.constructor=e.Scene},e.Event=function(e,t,n,r){r=r||{};for(var o in r)this[o]=r[o];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var o=e._util=function(e){var t,n={},r=function(e){return parseFloat(e)||0},o=function(t){return t.currentStyle?t.currentStyle:e.getComputedStyle(t)},i=function(t,n,i,l){if(n=n===document?e:n,n===e)l=!1;else if(!p.DomElement(n))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var s=(i?n["offset"+t]||n["outer"+t]:n["client"+t]||n["inner"+t])||0;if(i&&l){var a=o(n);s+="Height"===t?r(a.marginTop)+r(a.marginBottom):r(a.marginLeft)+r(a.marginRight)}return s},l=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};n.extend=function(e){for(e=e||{},t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e},n.isMarginCollapseType=function(e){return["block","flex","list-item","table","-webkit-box"].indexOf(e)>-1};var s=0,a=["ms","moz","webkit","o"],c=e.requestAnimationFrame,u=e.cancelAnimationFrame;for(t=0;!c&&t<a.length;++t)c=e[a[t]+"RequestAnimationFrame"],u=e[a[t]+"CancelAnimationFrame"]||e[a[t]+"CancelRequestAnimationFrame"];c||(c=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-s)),o=e.setTimeout(function(){t(n+r)},r);return s=n+r,o}),u||(u=function(t){e.clearTimeout(t)}),n.rAF=c.bind(e),n.cAF=u.bind(e);var f=["error","warn","log"],d=e.console||{};for(d.log=d.log||function(){},t=0;t<f.length;t++){var g=f[t];d[g]||(d[g]=d.log)}n.log=function(e){(e>f.length||e<=0)&&(e=f.length);var t=new Date,n=("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)+":"+("00"+t.getMilliseconds()).slice(-3),r=f[e-1],o=Array.prototype.splice.call(arguments,1),i=Function.prototype.bind.call(d[r],d);o.unshift(n),i.apply(d,o)};var p=n.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};p.String=function(e){return"string"===p(e)},p.Function=function(e){return"function"===p(e)},p.Array=function(e){return Array.isArray(e)},p.Number=function(e){return!p.Array(e)&&e-parseFloat(e)+1>=0},p.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var h=n.get={};return h.elements=function(t){var n=[];if(p.String(t))try{t=document.querySelectorAll(t)}catch(r){return n}if("nodelist"===p(t)||p.Array(t))for(var o=0,i=n.length=t.length;o<i;o++){var l=t[o];n[o]=p.DomElement(l)?l:h.elements(l)}else(p.DomElement(t)||t===document||t===e)&&(n=[t]);return n},h.scrollTop=function(t){return t&&"number"==typeof t.scrollTop?t.scrollTop:e.pageYOffset||0},h.scrollLeft=function(t){return t&&"number"==typeof t.scrollLeft?t.scrollLeft:e.pageXOffset||0},h.width=function(e,t,n){return i("width",e,t,n)},h.height=function(e,t,n){return i("height",e,t,n)},h.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=h.scrollTop(),n.left+=h.scrollLeft())}return n},n.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},n.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},n.css=function(e,t){if(p.String(t))return o(e)[l(t)];if(p.Array(t)){var n={},r=o(e);return t.forEach(function(e,t){n[e]=r[l(e)]}),n}for(var i in t){var s=t[i];s==parseFloat(s)&&(s+="px"),e.style[l(i)]=s}},n}(window||{});return e.Scene.prototype.addIndicators=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},e.Scene.prototype.removeIndicators=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},e.Scene.prototype.setTween=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},e.Scene.prototype.removeTween=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},e.Scene.prototype.setVelocity=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},e.Scene.prototype.removeVelocity=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},e});
//# sourceMappingURL=scrollmagic.js.map
