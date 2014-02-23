(function(){if(typeof android==="undefined"){android={setVerse:function(s){console.log("android.setVerse: "+s)},setCopyText:function(s){console.log("android.setCopyText: "+s)},setHighlighted:function(s){console.log("android.setHighlighted: "+s)},showAnnotation:function(s){console.log("android.showAnnotation: "+s)}}}var p,n,b={setup:function(t,s){this.cancel();this.timeoutID=window.setTimeout(function(u){u()},s,t)},cancel:function(){if(typeof this.timeoutID=="number"){window.clearTimeout(this.timeoutID);delete this.timeoutID}}};function o(){var t,v,s=NaN,x;x=document.querySelectorAll(".pb-verse");for(var w=0;w<x.length;w++){var u=Math.round(x[w].getBoundingClientRect().top);if(u>=0){if(isNaN(s)||Math.abs(s)>3*u){t=x[w]}else{t=x[w-1]}break}else{s=u}}if(t){android.setVerse(t.getAttribute("title"))}}if(typeof String.prototype.endsWith!=="function"){String.prototype.endsWith=function(s){return this.indexOf(s,this.length-s.length)!==-1}}function i(t){var v="",D="",x,C,y,B="",E=NaN;C=document.createElement("span");y=document.querySelectorAll(t);for(var u=0;u<y.length;u++){v+=" "+y.item(u).innerHTML}C.innerHTML=v;y=C.querySelectorAll(".pb-verse");for(var u=0;u<y.length;u++){var z=NaN,s=NaN,w;w=y.item(u).querySelector("sup").textContent.trim().split("-");z=parseInt(w[0].trim());if(isNaN(z)){continue}if(w.length>1){s=parseInt(w[1].trim())}if(!s||isNaN(s)){s=z}for(var A=z;A<=s;++A){if(isNaN(E)){B+=A}else{if(A==E){}else{if(A-E==1){if(!B.endsWith("-")){B+="-"}}else{if(B.endsWith("-")){B+=E}B+=",";B+=A}}}E=A}}if(B.endsWith("-")&&!isNaN(E)){B+=E}x=v.replace(new RegExp('<a .*?class="note-?link.*?</a>',"gi"),"");x=v.replace(new RegExp('<span class="pb-verse.*?</span>',"gi"),"");C.innerHTML=x;D=C.textContent.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"").trim();return{verse:B,text:D}}function r(){var s=i(".selected");if(s.text){var t=document.querySelectorAll(".highlight.selected").length;android.setCopyText(""+t+"\n"+s.verse+"\n"+s.text)}else{android.setCopyText("")}}function g(s){var t=s.className,u;if(a(s,"selected")){u=false}else{u=true}t.match(/\S+/g).forEach(function(y){if(p&&y.indexOf(p)!=-1){var x=document.getElementsByClassName(y);for(var w=x.length-1;w>-1;--w){var v=x.item(w);if(v.nodeName=="SUP"){continue}if(!u){m(v,"selected")}else{if(!a(v,"selected")){l(v,"selected")}}}}});b.setup(r,250)}function h(x){var t="",s,u,y;if(!x){return false}s=document.body.innerHTML;u=s.toLowerCase();y=x.toLowerCase();while(s.length>0){var w=x,v=u.indexOf(y);if(v<0){break}if(s.lastIndexOf(">",v)>=s.lastIndexOf("<",v)){w='<span class="highlight">'+x+"</span>"}t+=s.substring(0,v)+w;s=s.substr(v+x.length);u=u.substr(v+x.length)}t+=s;document.body.innerHTML=t;return true}function j(){var s;if(verse_start>1){window.location.hash="#"+versename+"-"+verse_start}q();h(search);if(highlighted){d(highlighted)}if(selected){c(selected)}k();s=document.querySelector("#pb-demo");if(s){s.style.display="block"}}function f(v){var u;if(v==undefined){v="highlight"}else{v=v.trim()}u=document.getElementsByClassName(v);for(var t=u.length-1;t>-1;--t){var s=u.item(t);if(s.className.trim()==v&&s.childNodes.length==1&&s.firstChild.nodeType==3){s.parentNode.replaceChild(s.firstChild,s)}else{m(s,v)}}search="";document.normalize()}function k(){document.querySelector("#content").addEventListener("click",function(u){var s=u.target;while(s&&s.nodeName!="BODY"){if(s.nodeName=="A"&&(a(s,"notelink")||(s.parentNode&&s.parentNode.nodeName=="SUP"))){var t=s.hash.replace("#","");if(t){u.preventDefault();android.showAnnotation(t);break}}if(s.nodeName=="SPAN"&&(a(s,"text")||a(s,p,false))){if(search){f()}g(s);break}s=s.parentNode}})}function e(B,y,A){var s;if(!B){return}s=document.getElementsByClassName(B);if(!s.length&&B[0]=="v"){var u=["a","b","c"];for(var z in u){s=document.getElementsByClassName(B+u[z]);if(s.length){break}}}if(!s.length&&B[0]!="v"){var x,t=new RegExp("(?:^|\\s)"+B+"-\\S+");s=document.querySelectorAll(".text");for(var w=0;w<s.length+1;++w){if(w==s.length){return}x=s.item(w).className.match(t);if(x){break}}s=document.getElementsByClassName(x[0]);if(!s.length){return}}for(var w=s.length-1;w>-1;--w){var v=s.item(w);if(v.nodeName=="SUP"){continue}if(y===false){m(v,A)}else{l(v,A)}}}function l(t,s){if(!t){}else{if(!t.className){t.className=s}else{if(!a(t,s)){t.className+=" "+s}}}}function a(v,u,s){var t;if(!v.className){return false}else{if(s===false){t=new RegExp("(?:^|\\s)"+u)}else{t=new RegExp("(?:^|\\s)"+u+"(?!\\S)")}}return v.className.match(t)!=null}function m(u,t){if(!u||!u.className){}else{var s=new RegExp("(?:^|\\s)"+t+"(?!\\S)");if(u.className.match(s)){u.className=u.className.replace(s,"").trim()}}}function q(){if(p!=undefined&&n!=undefined){return}try{n="_";p=document.querySelector(".pb-verse").querySelector("sup").className.split("_").splice(0,2).join("_")}catch(s){}try{if(!p||p.indexOf("_")==-1){n="-";p=document.querySelector(".text").className.replace(/\s*text\s*/g,"").split("-").splice(0,2).join("-");if(!p||p.indexOf("-")==-1){p="";n=""}}}catch(s){}}function d(u,s,t){q();if(!p){return}if(t===undefined){t="highlight"}u.split(",").forEach(function(w){var x=w.split("-"),y=parseInt(x[0]);if(x.length==2){var v=parseInt(x[1]);for(;y<=v;++y){e(p+n+y,s,t)}}else{e(p+n+y,s,t)}});if(t=="highlight"){android.setHighlighted(i(".highlight").verse)}}function c(t,s){d(t,s,"selected")}window.addEventListener("load",j);window.getFirstVisibleVerse=o;window.highlight=d;window.select=c})();