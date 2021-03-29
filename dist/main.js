/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${s}--\x3e`,i=new RegExp(`${s}|${r}`),n="$lit$";class o{constructor(e,t){this.parts=[],this.element=t;const r=[],o=[],l=document.createTreeWalker(t.content,133,null,!1);let h=0,p=-1,u=0;const{strings:m,values:{length:_}}=e;for(;u<_;){const e=l.nextNode();if(null!==e){if(p++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let r=0;for(let e=0;e<s;e++)a(t[e].name,n)&&r++;for(;r-- >0;){const t=m[u],s=c.exec(t)[2],r=s.toLowerCase()+n,o=e.getAttribute(r);e.removeAttribute(r);const a=o.split(i);this.parts.push({type:"attribute",index:p,name:s,strings:a}),u+=a.length-1}}"TEMPLATE"===e.tagName&&(o.push(e),l.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,o=t.split(i),l=o.length-1;for(let t=0;t<l;t++){let r,i=o[t];if(""===i)r=d();else{const e=c.exec(i);null!==e&&a(e[2],n)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-n.length)+e[3]),r=document.createTextNode(i)}s.insertBefore(r,e),this.parts.push({type:"node",index:++p})}""===o[l]?(s.insertBefore(d(),e),r.push(e)):e.data=o[l],u+=l}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&p!==h||(p++,t.insertBefore(d(),e)),h=p,this.parts.push({type:"node",index:p}),null===e.nextSibling?e.data="":(r.push(e),p--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else l.currentNode=o.pop()}for(const e of r)e.parentNode.removeChild(e)}}const a=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,d=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function h(e,t){const{element:{content:s},parts:r}=e,i=document.createTreeWalker(s,133,null,!1);let n=u(r),o=r[n],a=-1,l=0;const d=[];let c=null;for(;i.nextNode();){a++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,n=u(r,n),o=r[n]}d.forEach((e=>e.parentNode.removeChild(e)))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},u=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1},m=new WeakMap,_=e=>"function"==typeof e&&m.has(e),y={},g={};class f{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],r=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let n,o=0,a=0,d=i.nextNode();for(;o<r.length;)if(n=r[o],l(n)){for(;a<n.index;)a++,"TEMPLATE"===d.nodeName&&(s.push(d),i.currentNode=d.content),null===(d=i.nextNode())&&(i.currentNode=s.pop(),d=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),S=` ${s} `;class w{constructor(e,t,s,r){this.strings=e,this.values=t,this.type=s,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let o=0;o<e;o++){const e=this.strings[o],a=e.lastIndexOf("\x3c!--");i=(a>-1||i)&&-1===e.indexOf("--\x3e",a+1);const l=c.exec(e);t+=null===l?e+(i?S:r):e.substr(0,l.index)+l[1]+l[2]+n+l[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}const b=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class P{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let r="";for(let i=0;i<t;i++){r+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(b(e)||!x(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===y||b(e)&&e===this.value||(this.value=e,_(e)||(this.committer.dirty=!0))}commit(){for(;_(this.value);){const e=this.value;this.value=y,e(this)}this.value!==y&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}const e=this.__pendingValue;e!==y&&(b(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===g?(this.value=g,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof f&&this.value.template===t)this.value.update(e.values);else{const s=new f(t,e.processor,this.options),r=s._clone();s.update(e.values),this.__commitNode(r),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,r=0;for(const i of e)s=t[r],void 0===s&&(s=new N(this.options),t.push(s),0===r?s.appendIntoPart(this):s.insertAfterPart(t[r-1])),s.setValue(i),s.commit(),r++;r<t.length&&(t.length=r,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class A{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=y}}class T extends P{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends C{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class V{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;_(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=y,e(this)}if(this.__pendingValue===y)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=O(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=y}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const O=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function U(e){let t=M.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},M.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const i=e.strings.join(s);return r=t.keyString.get(i),void 0===r&&(r=new o(e,e.getTemplateElement()),t.keyString.set(i,r)),t.stringsArray.set(e.strings,r),r}const M=new Map,R=new WeakMap,$=new class{handleAttributeExpressions(e,t,s,r){const i=t[0];return"."===i?new T(e,t.slice(1),s).parts:"@"===i?[new V(e,t.slice(1),r.eventContext)]:"?"===i?[new A(e,t.slice(1),s)]:new P(e,t,s).parts}handleTextExpression(e){return new N(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const H=(e,...t)=>new w(e,t,"html",$),I=(e,t)=>`${e}--${t}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const q=e=>t=>{const r=I(t.type,e);let i=M.get(r);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},M.set(r,i));let n=i.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(s);if(n=i.keyString.get(a),void 0===n){const s=t.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,e),n=new o(t,s),i.keyString.set(a,n)}return i.stringsArray.set(t.strings,n),n},L=["html","svg"],z=new Set;window.JSCompiler_renameProperty=(e,t)=>e;const B={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},F=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:F};class D extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const r=this._attributeNameForProperty(s,t);void 0!==r&&(this._attributeToPropertyMap.set(r,s),e.push(r))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,s,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(r){const i=this[e];this[t]=r,this.requestUpdateInternal(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=F){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,r=t.converter||B,i="function"==typeof r?r:r.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,r=t.converter;return(r&&r.toAttribute||B.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const r=this.constructor,i=r._attributeNameForProperty(e,s);if(void 0!==i){const e=r._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,r=s._attributeToPropertyMap.get(e);if(void 0!==r){const e=s.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let r=!0;if(void 0!==e){const i=this.constructor;s=s||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}D.finalized=!0;const J=Element.prototype;J.msMatchesSelector||J.webkitMatchesSelector;const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Q{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const X=(e,...t)=>{const s=t.reduce(((t,s,r)=>t+(e=>{if(e instanceof Q)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[r+1]),e[0]);return new Q(s,K)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Y={};class Z extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),r=[];s.forEach((e=>r.unshift(e))),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!G){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Q(String(t),K)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Y&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Y}}Z.finalized=!0,Z.render=(e,s,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const i=r.scopeName,n=R.has(s),o=j&&11===s.nodeType&&!!s.host,a=o&&!z.has(i),l=a?document.createDocumentFragment():s;if(((e,s,r)=>{let i=R.get(s);void 0===i&&(t(s,s.firstChild),R.set(s,i=new N(Object.assign({templateFactory:U},r))),i.appendInto(s)),i.setValue(e),i.commit()})(e,l,Object.assign({templateFactory:q(i)},r)),a){const e=R.get(l);R.delete(l);((e,t,s)=>{z.add(e);const r=s?s.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(r,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{L.forEach((t=>{const s=M.get(I(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),h(e,s)}))}))})(e);const a=r.content;s?function(e,t,s=null){const{element:{content:r},parts:i}=e;if(null==s)return void r.appendChild(t);const n=document.createTreeWalker(r,133,null,!1);let o=u(i),a=0,l=-1;for(;n.nextNode();)for(l++,n.currentNode===s&&(a=p(t),s.parentNode.insertBefore(t,s));-1!==o&&i[o].index===l;){if(a>0){for(;-1!==o;)i[o].index+=a,o=u(i,o);return}o=u(i,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),h(s,e)}})(i,l,e.value instanceof f?e.value.template:void 0),t(s,s.firstChild),s.appendChild(l),R.set(s,e)}!n&&o&&window.ShadyCSS.styleElement(s.host)},window.customElements.define("memory-sphynx",class extends Z{static get styles(){return X`
      :host {
        display:block;
        height:100%;
        width:100%;
        background:url("../assets/img/pink-sphynx-background.jpg") center/cover;
        pseting:2rem;
      }
      .memory-header{
        display:flex;
        justify-content:space-between;
        margin-bottom: 2rem;
      }
      .memory-grid{
        display:grid;
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-auto-rows: 150px;
        gap: 1rem;
      }
      select{
        
      }
    `}static get properties(){return{cards:{type:Array,value:[]},turn:{type:Boolean},gameDifficulty:{type:Number},opened:{type:Array},score:{type:Object}}}constructor(){super(),this.__onInit()}connectedCallback(){super.connectedCallback(),this.__createCards(this.numberOfPairs)}__onInit(){this.selectedCards=[],this.clicked=!0,this.score={playerOne:0,playerTwo:0},this.turn=!0,this.numberOfPairs=5,this.matchedPairs=0,this.winner=""}__createCards(e){this.imgArray=[];for(let t=1;t<=e;t++)this.imgArray.push({picture:`../assets/img/Picture${t}.png`,value:t,setAttrHidePicture:!0,setAttrHideElement:!1}),this.imgArray.push({picture:`../assets/img/Picture${t}.png`,value:t,setAttrHidePicture:!0,setAttrHideElement:!1});this.cards=this.imgArray.sort(((e,t)=>Math.random()-.5))}__changeTurn(){this.turn=!this.turn}__changeScore(){this.turn?this.score.playerOne++:this.score.playerTwo++}__countPairs(){this.matchedPairs++,this.matchedPairs===this.numberOfPairs&&(this.score.playerOne>this.score.playerTwo?alert("CONGRATS!🎉 Player 1, you won"):alert("CONGRATS!🎉 Player 2, you won"))}__clearCards(){this.selectedCards=[]}__hidePairElement(){this.selectedCards[0].setAttrHideElement=!0,this.selectedCards[1].setAttrHideElement=!0}__hidePairPicture(){this.selectedCards[0].setAttrHidePicture=!0,this.selectedCards[1].setAttrHidePicture=!0}__showPicture(e){e.setAttrHidePicture=!1}__selectCard(e,t){this.selectedCards.length<2&&(this.selectedCards.push(t),this.__showPicture(t),this.requestUpdate(),2==this.selectedCards.length)&&(this.__validatePair(this.selectedCards[0].value,this.selectedCards[1].value)?setTimeout((()=>{new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3").play(),this.__hidePairElement(),this.__clearCards(),this.__changeScore(),this.__changeTurn(),this.__countPairs(),this.requestUpdate()}),1e3):setTimeout((()=>{this.__hidePairPicture(),this.__clearCards(),this.__changeTurn(),this.requestUpdate(),new Audio("http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3").play()}),1e3))}__validatePair(e,t){return e===t}__selectLevel(e){this.__onInit(),this.__createCards(parseInt(e.detail))}render(){return H`
    <level-memory-sphynx @level-change="${this.__selectLevel}"></level-memory-sphynx>
    <div class="memory-header">
      <score-memory-sphynx .turn="${this.turn}">
      <span slot="player1">${this.score.playerOne}</span>
      <span slot="player2">${this.score.playerTwo}</span>
      </score-memory-sphynx>
    </div>

    <div class="memory-grid">
      ${this.cards.map((e=>H`
          <card-memory-sphynx
          .picture="${e.picture}"
          ?hide-element="${e.setAttrHideElement}"
          ?hide-picture="${e.setAttrHidePicture}"
          @click="${t=>this.__selectCard(t,e)}"
          ></card-memory-sphynx>`))}
    </div>
    `}}),window.customElements.define("score-memory-sphynx",class extends Z{static get styles(){return X`
      :host{
        height:100%;
        width:100%;
        display:flex;
        justify-content:space-around;
        align-items:center;
      }
      .container {
        height:80%;
        width:30%;
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 3.0px );
        -webkit-backdrop-filter: blur( 3.0px );
        border-radius: 10px;
        text-align:center;
        display:flex;
        justify-content:space-around;
        align-items:center;
      }
      .container.active {
        -webkit-box-shadow: 0px 0px 28px 9px rgba(255,255,255,0.82); 
        box-shadow: 0px 0px 28px 9px rgba(255,255,255,0.82);
      }
      .score {
        height:8%;
        width:8%;
        border: 5px solid black;
        border-radius: 16px;
        padding: 5px;
      }
      ::slotted(span) {
        color: black;
        font-size: 50px;
        font-weight: bolder;
      }
      #level-select{
        background: rgba( 0, 0, 0, 0.50 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 0.0px );
        border-radius: 22px;
        color:white;
      }
        `}static get properties(){return{turn:{type:Boolean}}}constructor(){super(),this.turn=!0}render(){return H`
        <div class="container ${!0===this.turn?"active":""}">
            <h1>Player 1</h1>
            <div class="score"><slot name="player1"></slot></div>
        </div>
        
      <div class="container ${!1===this.turn?"active":""}">
      <h1>Player 2</h1>
        <div class="score"><slot name="player2"></slot></div>
      </div>
        `}}),window.customElements.define("card-memory-sphynx",class extends Z{static get styles(){return X`
          :host {
            display: block;
            cursor:pointer;
          }
          img{
            height:100%;
            width:100%;
            border-radius:22px;
          }
          .card{
            height:100%;
            width:100%;
            background: rgba( 255, 255, 255, 0.10 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 22px;
          }
          .card:hover{
            -webkit-box-shadow: 0px 0px 20px 1px #000000; 
            box-shadow: 0px 0px 20px 1px #000000;
          }
          :host([hide-element]){
            visibility:hidden;
          }
          :host([hide-picture]) img{
            display:none;
          }
        `}static get properties(){return{picture:{type:String}}}constructor(){super()}render(){return H`
        <div class="card">
          <img src="${this.picture}">
        </div>
        `}}),window.customElements.define("level-memory-sphynx",class extends Z{static get styles(){return X`
          :host{
            display:inline-block;
            position:absolute;
            top:0;
            right:0;
          }
          select{
            
            border:1px solid red;
            background: rgba( 0, 0, 0, 0.20 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
            backdrop-filter: blur( 4px );
            -webkit-backdrop-filter: blur( 4px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
            transform: translate(-20%,300%);
          }
        `}__selectLevel(e){let t=parseInt(e.target.value),s=new CustomEvent("level-change",{detail:t});this.dispatchEvent(s)}render(){return H`            
      <select @change="${this.__selectLevel}">
          <option value="5">Easy</option>
          <option value="10">Medium</option>
          <option value="15">Hard</option>
      </select>
      `}}),document.body.appendChild(document.createElement("memory-sphynx"))})();