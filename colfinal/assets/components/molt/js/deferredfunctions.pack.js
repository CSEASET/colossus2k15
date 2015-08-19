
function downloadJSAtOnload(src){var element=document.createElement("script");element.src=src;element.async=true;document.body.appendChild(element);}
function downloadCSSAtOnload(src){var element=document.createElement("link");element.href=src;element.rel='stylesheet';element.type='text/css';document.body.appendChild(element);}
function downloadJSCSSAtOnloadAll(){if(typeof jsDeferred!="undefined"){for(src in jsDeferred){downloadJSAtOnload(jsDeferred[src]);}}
if(typeof cssDeferred!="undefined"){for(src in cssDeferred){downloadCSSAtOnload(cssDeferred[src]);}}}
if(window.addEventListener)
window.addEventListener("load",downloadJSCSSAtOnloadAll,false);else if(window.attachEvent)
window.attachEvent("onload",downloadJSCSSAtOnloadAll);else window.onload=downloadJSCSSAtOnloadAll;