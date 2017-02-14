var base_domain = base_domain || "/";
var css_versions = {};
var _ua = navigator.userAgent.toLowerCase();
var browser = {
  version: (_ua.match( /.+(?:me|ox|on|rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
  opera: /opera/i.test(_ua),
  msie: (!this.opera && /msie/i.test(_ua)),
  msie6: (!this.opera && /msie 6/i.test(_ua)),
  msie7: (!this.opera && /msie 7/i.test(_ua)),
  msie8: (!this.opera && /msie 8/i.test(_ua)),
  mozilla: /firefox/i.test(_ua),
  chrome: /chrome/i.test(_ua),
  safari: (!(/chrome/i.test(_ua)) && /webkit|safari|khtml/i.test(_ua)),
  iphone: /iphone/i.test(_ua),
  ipod: /ipod/i.test(_ua),
  iphone4: /iphone.*OS 4/i.test(_ua),
  ipod4: /ipod.*OS 4/i.test(_ua),
  ipad: /ipad/i.test(_ua),
  safari_mobile: /iphone|ipod|ipad/i.test(_ua),
  mobile: /iphone|ipod|ipad|opera mini|opera mobi/i.test(_ua)
}
if (!window.vk) window.vk = {loginscheme: 'http', ip_h: ''};

function langNumeric(count, vars, format_num) {
  if (!vars || !window.langConfig) { return count; }
  var res;
  if (!isArray(vars)) {
    result = vars;
  } else {
    res = vars[1];
    if(count != Math.floor(count)) {
      res = vars[langConfig.numRules['float']];
    } else {
      each(langConfig.numRules['int'], function(i,v){
        if(v[0] == '*') { res = vars[v[2]]; return false; }
        var c = v[0] ? count % v[0] : count;
        if(indexOf(v[1], c) != -1) { res = vars[v[2]]; return false; }
      });
    }
  }
  if(format_num) {
    var n = count.toString().split('.'), c = [];
    for(var i = n[0].length - 3; i > -3; i-=3) {
      c.unshift(n[0].slice(i > 0?i:0, i+3));
    }
    n[0] = c.join(langConfig.numDel);
    count = n.join(langConfig.numDec);
  }
  res = (res || '%s').replace('%s', count);
  return res;
}

function langSex(sex, vars) {
  if(!isArray(vars)) return vars;
  var res = vars[1];
  if(!window.langConfig) return res;
  each(langConfig.sexRules, function(i,v){
    if(v[0] == '*') { res = vars[v[1]]; return false; }
    if(sex == v[0] && vars[v[1]]) { res = vars[v[1]]; return false; }
  });
  return res;
}

function getLang(){
  try {
    var args = Array.prototype.slice.call(arguments);
    var key = args.shift();
    if (!key) return '...';
    var val = (window.lang && window.lang[key]) || (window.langpack && window.langpack[key]) || window[key];
    if (!val) {
      var res = key.split('_');
      res.shift();
      return res.join(' ');
    }
    if (isFunction(val)) {
      return val.apply(null, args);
    } else if (isArray(val)) {
      return langNumeric(args[0], val);
    } else {
      return val;
    }
  } catch(e) {
    debugLog('lang error:' + e.message + '(' + Array.prototype.slice.call(arguments).join(', ') + ')');
  }
}
/**
 * DOM
 **/
function ge() {
  var ea;
  for (var i = 0; i < arguments.length; i++) {
    var e = arguments[i];
    if (typeof e == 'string' || typeof e == 'number')
      e = document.getElementById(e);
    if (arguments.length == 1)
      return e;
    if (!ea)
      ea = new Array();
    ea.push(e);
  }
  return ea;
}

var _logTimer = (new Date()).getTime();
function debugLog(msg){
  try {
    var _time = (new Date()).getTime();
    var t = '['+((_time - _logTimer)/1000)+'] ';
    if (ge('debuglog')) {
      if (msg===null) msg = '[NULL]'; else if (msg===undefined) msg = '[UNDEFINED]';
      ge('debuglog').innerHTML += t + msg.toString().replace('<', '&lt;').replace('>', '&gt;')+'<br/>';
    }
    if(window.console && console.log){console.log(t + msg);}
    return _time;
  } catch (e) {return 0;}
}

function geByClass(searchClass, node, tag) {
  var classElements = new Array();
  if (node == null)
    node = document;
  if (tag == null)
    tag = '*';
  if (node.getElementsByClassName) {
    classElements = node.getElementsByClassName(searchClass);
    if (tag != '*') {
      for (i = 0; i < classElements.length; i++) {
        if (classElements.nodeName == tag)
          classElements.splice(i, 1);
      }
    }
    return classElements;
  }
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}
function geByClass1(searchClass, node, tag) {
  node = node || document;
  tag = tag || '*';
  return node.querySelector && node.querySelector(tag + '.' + searchClass) || geByClass(searchClass, node, tag)[0];
}

function ce(tagName, attr, style) {
  var el = document.createElement(tagName);
  if (attr) extend(el, attr);
  if (style) setStyle(el, style);
  return el;
}

function se(html) {return ce('div', {innerHTML: html}).firstChild;}

function show(elem) {
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      show(arguments[i]);
    }
    return;
  }
  elem = ge(elem);
  if (!elem) return;
  var old = data(elem, "olddisplay");
  elem.style.display = old || "";

  if (getStyle(elem, 'display') == "none" ) {
    if (elem.tagName.toLowerCase() == 'tr' && !browser.msie) {
      elem.style.display = 'table-row';
    } else if (elem.tagName.toLowerCase() == 'table' && !browser.msie) {
      elem.style.display = 'table';
    } else {
      elem.style.display = data(elem, "olddisplay", "block");
    }
  }
}

function hide(elem){
  if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      hide(arguments[i]);
    }
    return;
  }
  elem = ge(elem);
  if (!elem) return;
  if (getStyle(elem, 'display') != "none")
    data(elem, "olddisplay", elem.style.display);
  elem.style.display = "none";
}
function isVisible(elem) {
 elem = ge(elem);
 return getStyle(elem, 'display') != 'none' && getStyle(elem, 'visibility') != 'hidden';
}
function toggle(elem) {
  if (isVisible(elem)) {
    hide(elem);
  } else {
    show(elem);
  }
}
window.shide = toggle;

var hfTimeout;
function toggleFlash(show, timeout) {
  //if (/mac/i.test(navigator.userAgent)) return;

  clearTimeout(hfTimeout);
  if (timeout > 0) {
    hfTimeout = setTimeout(function(){toggleFlash(show, 0)}, timeout);
    return;
  }

  var visib = show ? 'visible' : 'hidden';
  var body = document.getElementsByTagName('body')[0];

  var f = function() {
    if (this.getAttribute('preventhide')) {
      return;
    } else if ((this.id == 'extra_player' && browser.chrome)
            || (this.id == 'app_container' && browser.msie)) {
      show ? setStyle(this, {position:"static", top:0}) : setStyle(this, {position:"absolute", top:"-5000px"});
    } else {
      this.style.visibility = visib;
    }
  };

  each(body.getElementsByTagName('embed'), f);
  each(body.getElementsByTagName('object'), f);
  var ep = ge('extra_player');
  if (ep) f.apply(ep);
  var b1 = ge('banner1'), b2 = ge('banner2');
  if (b1) b1.style.visibility = visib;
  if (b2) b2.style.visibility = visib;
}

function getXY(obj) {
 if (!obj || obj == undefined) return;
 var left = 0, top = 0;
 if (obj.offsetParent) {
  do {
   left += obj.offsetLeft;
   top += obj.offsetTop;
  } while (obj = obj.offsetParent);
 }
 return [left,top];
}

function getSize(elem, withoutBounds) {
  var s = [0, 0];
  if (elem == document) {
    s =  [Math.max(
        document.documentElement["clientWidth"],
        document.body["scrollWidth"], document.documentElement["scrollWidth"],
        document.body["offsetWidth"], document.documentElement["offsetWidth"]
      ), Math.max(
        document.documentElement["clientHeight"],
        document.body["scrollHeight"], document.documentElement["scrollHeight"],
        document.body["offsetHeight"], document.documentElement["offsetHeight"]
      )];
  } else if (elem){
    function getWH() {
      s = [elem.offsetWidth, elem.offsetHeight];
      if (!withoutBounds) return;
      var padding = 0, border = 0;
      each(s, function(i, v) {
        var which = i ? ['Top', 'Bottom'] : ['Left', 'Right'];
        each(which, function(){
          s[i] -= parseFloat(getStyle(elem, "padding" + this)) || 0;
          s[i] -= parseFloat(getStyle(elem, "border" + this + "Width")) || 0;
        });
      });
      s = [Math.round(s[0]), Math.round(s[1])];
    }
    if (!isVisible(elem)) {
      var props = {position: "absolute", visibility: "hidden", display:"block"};
      var old = {};
      each(props, function(i, val){
        old[i] = elem.style[i];
        elem.style[i] = val;
      });
      getWH();
      each(props, function(i, val){
        elem.style[i] = old[i];
      });
    } else getWH();

  }
  return s;
}

function getScroll() {
  var b = (browser.msie6) ? ge('PageContainer') : document.body, de = document.documentElement;
  return [b.scrollLeft || de.scrollLeft || window.pageXOffset || 0, b.scrollTop || de.scrollTop  || window.pageYOffset || 0,
  de.clientWidth || b.clientWidth || 0, de.clientHeight || b.clientHeight || 0];
}

function getZoom() {
  var r1 = ge('zoom_test_1') || document.body.appendChild(ce('div', {id: 'zoom_test_1'}, {left: '10%', position: 'absolute', visibility: 'hidden'})),
      r2 = ge('zoom_test_2') || document.body.appendChild(ce('div', {id: 'zoom_test_2'}, {left: r1.offsetLeft + 'px', position: 'absolute', visibility: 'hidden'}));
  return r2.offsetLeft / r1.offsetLeft;
}

/**
 *  Useful utils
 */

Function.prototype.bind = function(object) {
  var __method = this;
  return function() {
    return __method.apply(object, arguments);
  }
}
Function.prototype.pbind = function() {
  var func = this, args = arguments;
  return function() {
    var argsArray = [];
    each(args, function(i, obj) { argsArray[i] = obj; });
    var obj = window, currArgs = [];
    each(arguments, function(i, obj) { currArgs[i] = obj });
    return func.apply(obj, argsArray.concat(currArgs));
  }
}
function rand(min, max) { return Math.random() * (max - min + 1) + min; }
function isFunction(obj) { return Object.prototype.toString.call(obj) === "[object Function]"; }
function isArray(obj) { return Object.prototype.toString.call(obj) === "[object Array]"; }
function isEmpty(o) { if(Object.prototype.toString.call(o) !== "[object Object]") {return false;} for(var i in o){ if(o.hasOwnProperty(i)){return false;} } return true; }
function vkNow() { return +new Date; }
function vkImage() { return window.Image ? (new Image()) : ce('img'); } // IE8 workaround
function trim(text) { return (text || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ""); }
function stripHTML(text) { return text ? text.replace(/<(?:.|\s)*?>/g, "") : ''; }
function escapeRE(s) { return s ? s.replace(/[.*+?^${}()|[\]\/\\]/g, '\\$0') : ''; }
function intval(value) {
  if (value === true) return 1;
  return isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
}
function winToUtf(text) {
  var m, i, j, code;
  m = text.match(/&#[0-9]{2}[0-9]*;/gi);
  for (j in m) {
    var val = '' + m[j]; // buggy IE6
    code = intval(val.substr(2, val.length - 3));
    if (code >= 32 && ('&#' + val.replace(/[^0-9]/g, '') + ';' == val)) { // buggy IE6
      text = text.replace(val, String.fromCharCode(code));
    }
  }
  text = text.replace(/&quot;/gi, '"').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
  return text;
}
function replaceEntities(str) {
  return se('<textarea>' + (str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')) + '</textarea>').value;
}

/**
 *  Arrays, objects
 **/

function each(object, callback) {
  var name, i = 0, length = object.length;

  if ( length === undefined ) {
    for ( name in object )
      if ( callback.call( object[ name ], name, object[ name ] ) === false )
        break;
  } else
    for ( var value = object[0];
      i < length && callback.call( value, i, value ) !== false; value = object[++i] ){}

  return object;
};
function indexOf(arr, value, from) {
  from = (from == null) ? 0 : from;
  var m = arr.length;
  for(var i = from; i < m; i++)
    if (arr[i] == value)
       return i;
   return -1;
}
function inArray(value, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) return true;
  }
  return false;
}
function clone(obj) {
  var newObj = isArray(obj) ? [] : {};
  for (var i in obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}

// Extending object by another
function extend() {
  var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }

  if (typeof target !== "object" && !isFunction(target))
    target = {};

  if (length == i) {
    return target;
  }

  for (; i < length; i++)
    if ((options = arguments[i]) != null)
      for (var name in options) {
        var src = target[name], copy = options[name];

        if (target === copy)
          continue;

        if (deep && copy && typeof copy === "object" && !copy.nodeType)
          target[name] = extend(deep,
            src || (copy.length != null ? [] : { })
          , copy);

        else if (copy !== undefined)
            target[name] = copy;
      }
  return target;
}


/**
 * CSS classes
 **/

function hasClass(obj, name) {
  obj=ge(obj);
  return obj && (new RegExp('(\\s|^)' + name + '(\\s|$)')).test(obj.className);
}

function addClass(obj, name) {
  obj=ge(obj);
  if (obj && !hasClass(obj, name)) obj.className = trim(obj.className + ' ' + name);
}

function removeClass(obj, name) {
  obj=ge(obj);
  if (obj && hasClass(obj, name)) obj.className = trim(obj.className.replace((new RegExp('(\\s+|^)' + name + '(\\s+|$)')), ' '));
}
//shortcuts
function btnOut(o){removeClass(geByClass('box_button', o)[0], 'button_hover');}
function btnOver(o){addClass(geByClass('box_button', o)[0], 'button_hover');}


// Get computed style
function getStyle(elem, name, force) {
  elem = ge(elem);
  if (force === undefined)
    force = true;
  if (!force && name == 'opacity' && browser.msie) {
    var filter = elem.style['filter'];
    return filter ? (filter.indexOf("opacity=") >= 0 ?
      (parseFloat(filter.match(/opacity=([^)]*)/)[1] ) / 100) + '' : '1') : '';
  }
  if (!force && elem.style && (elem.style[name] || name == 'height'))
    return elem.style[name];

  if (force && (name == "width" || name == "height")) {
    return getSize(elem, true)[({'width':0, 'height':1})[name]] + 'px';
  }

  var ret, defaultView = document.defaultView || window;
  if (defaultView.getComputedStyle) {
    name = name.replace( /([A-Z])/g, "-$1" ).toLowerCase();
    var computedStyle = defaultView.getComputedStyle( elem, null );
      if (computedStyle)
        ret = computedStyle.getPropertyValue(name);
  } else if (elem.currentStyle) {
    if (name == 'opacity' && browser.msie) {
      var filter = elem.currentStyle['filter'];
      return filter && filter.indexOf("opacity=") >= 0 ?
        (parseFloat(filter.match(/opacity=([^)]*)/)[1] ) / 100) + '' : '1';
    }
    var camelCase = name.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
    ret = elem.currentStyle[name] || elem.currentStyle[camelCase];
    //dummy fix for ie
    if(ret == 'auto')ret = 0;
    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    if ( !/^\d+(px)?$/i.test( ret ) && /^\d/.test( ret ) ) {
      // Remember the original values
      var left = style.left, rsLeft = elem.runtimeStyle.left;

      // Put in the new values to get a computed value out
      elem.runtimeStyle.left = elem.currentStyle.left;
      style.left = ret || 0;
      ret = style.pixelLeft + "px";

      // Revert the changed values
      style.left = left;
      elem.runtimeStyle.left = rsLeft;
    }
  }
  if (ret == 'rgba(0, 0, 0, 0)') ret = 'transparent';
  return ret;
}

function setStyle(elem, name, value){
  elem = ge(elem);
  if (!elem) return;
  if (typeof name == 'object') return each(name, function(k,v){setStyle(elem,k,v);});
  if (name == 'opacity'){
    if (browser.msie) {
      if ((value + '').length) {
        elem.style.filter = "alpha(opacity=" + value*100 + ")";
      } else {
        elem.style.filter = '';
      }
      elem.style.zoom = 1;
    };
    elem.style.opacity = value;
  } else {
    var isNum = typeof(value) == 'number' && !(/z-?index|font-?weight|opacity|zoom|line-?height/i).test(name);
    if(isNum && value < 0 && (/^(width|height)$/i).test(name)){
      value = 0; //fix for IE;
    }
    elem.style[name] = isNum ? value + 'px': value;
  }
}
function swapStyle(elem, options, callback) {
  elem = ge(elem);
  var old = {};
  for (var name in options) {
    old[name] = elem.style[name];
    elem.style[name] = options[name];
  }
  callback.call(elem);
  for (var name in options)
      elem.style[name] = old[ name ];
}

/**
 * Store data connected to element
 **/

var expand = 'VK' + vkNow(), vk_uuid = 0, vk_cache = {};

// Get or set element data
function data(elem, name, data) {
  if (!elem) return false;
  var id = elem[ expand ], undefined;
  if ( !id )
    id = elem[ expand ] = ++vk_uuid;

  if (name && !vk_cache[id])
    vk_cache[id] = {};

  if (data !== undefined)
    vk_cache[id][name] = data;

  return name ?
    vk_cache[id][name] :
    id;
}

function removeData(elem, name) {
  if (!elem) return false;
  var id = elem[expand];
  if (name) {
    if (vk_cache[id]) {
      delete vk_cache[id][name];
      name = "";
      for (name in vk_cache[id])
        break;

      if (!name)
        removeData(elem);
    }
  } else {
    try {
      delete elem[expand];
    } catch(e){ // fix for IE
      if (elem.removeAttribute)
        elem.removeAttribute(expand);
    }
    delete vk_cache[id];
  }
}

/**
 * Simple FX
 **/
function animate(el, params, speed, callback) {
  el = ge(el);
  var options = extend({}, typeof speed == 'object' ? speed : {duration: speed, onComplete: callback || function(){}});
  var fromArr = {}, toArr = {}, visible = isVisible(el), self = this, p;
  options.orig = {};
  params = clone(params);

  var tween = data(el, 'tween'), i, name, toggleAct = visible ? 'hide' : 'show';
  if (tween && tween.isTweening) {
    options.orig = extend(options.orig, tween.options.orig);
    tween.stop(false);
    if (tween.options.show) toggleAct = 'hide';
    else if (tween.options.hide) toggleAct = 'show';
  }
  for (p in params)  {
    if (!tween && (params[p] == 'show' && visible || params[p] == 'hide' && !visible))
      return options.onComplete.call(this, el);
    if ((p == "height" || p == "width") && el.style) {
      if (options.orig.overflow == undefined) {
        options.orig.overflow = getStyle(el, 'overflow');
      }
      el.style.overflow = 'hidden';
      el.style.display = 'block';
    }
    if (/show|hide|toggle/.test(params[p])) {
      if (params[p] == 'toggle')
        params[p] = toggleAct;
      if (params[p] == 'show') {
        var from = 0;
        options.show = true;
        if (options.orig[p] == undefined) {
          options.orig[p] = getStyle(el, p, false) || '';
          setStyle(el, p, 0);
        }
        var sopt = {};
        if (p == 'height' && browser.msie6) {
          sopt[p] = '0px';
          el.style.overflow = '';
        } else {
          sopt[p] = options.orig[p];
        }
        swapStyle(el, sopt, function() {
          params[p] = parseFloat(getStyle(el, p, true));
        });
        if (p == 'height' && browser.msie) {
          el.style.overflow = 'hidden';
        }
      } else {
        if (options.orig[p] == undefined) {
          options.orig[p] = getStyle(el, p, false) || '';
        }
        options.hide = true;
        params[p] = 0;
      }
    }
  }
  if (options.show && !visible) {
    show(el);
  }
  tween = new Fx.Base(el, options, null);
  each(params, function(name, to) {
    if (/backgroundColor|borderBottomColor|borderLeftColor|borderRightColor|borderTopColor|color|borderColor|outlineColor/.test(name)) {
      var p = (name == 'borderColor') ? 'borderTopColor' : name;
      from = getColor(el, p);
      to = getRGB(to);
    } else {
      var parts = to.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),
        start = tween.cur(name, true) || 0;
      if (parts) {
        to = parseFloat(parts[2]);
        if ( parts[1] )
          to = ((parts[1] == "-=" ? -1 : 1) * to) + to;
      }

      if (options.hide && name == 'height' && browser.msie6) {
        el.style.height = '0px';
        el.style.overflow = '';
      }
      from = tween.cur(name, true);
      if (options.hide && name == 'height' && browser.msie6) {
        el.style.height = '';
        el.style.overflow = 'hidden';
      }
      if (from == 0 && (name == "width" || name == "height"))
        from = 1;

      if (name == "opacity" && to > 0 && !visible) {
        setStyle(el, 'opacity', 0);
        from = 0;
        show(el);
      }
    }
    if (from != to || (isArray(from) && from.join(',') == to.join(','))) {
      fromArr[name] = from;
      toArr[name] = to;
    }
  });
  tween.start(fromArr, toArr);
  data(el, 'tween', tween);

  return tween;
}

function fadeTo(el, speed, to, callback) {return animate(el, {opacity: to}, speed, callback);}

var Fx = fx = {
 Transitions: {
  linear: function(t, b, c, d) { return c*t/d + b; },
  sineInOut: function(t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; },
  halfSine: function(t, b, c, d) { return c * Math.sin(Math.PI * (t/d) / 2) + b; },
  easeOutBack: function(t, b, c, d) { var s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; }
 },
 Attrs: [
  [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
  [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
  [ "opacity" ]
 ],
 Timers: [],
 TimerId: null
};
Fx.Base = function(el, options, name){
  this.el = ge(el);
  this.name = name;
  this.options = extend({
    onComplete: function(){},
    transition: Fx.Transitions.sineInOut,
    duration: 500
  }, options || {});
};

function genFx(type, num){
  var obj = {};
  each( Fx.Attrs.concat.apply([], Fx.Attrs.slice(0,num)), function(){
    obj[this] = type;
  });
  return obj;
};

// Shortcuts for custom animations
each({slideDown: genFx('show', 1),
 slideUp: genFx('hide', 1),
 slideToggle: genFx('toggle', 1),
 fadeIn: {opacity: 'show'},
 fadeOut: {opacity: 'hide'},
 fadeToggle: {opacity: 'toggle'}}, function(f, val){
 window[f] = function(el, speed, callback){return animate(el, val, speed, callback);}
});

Fx.Base.prototype = {
  start: function(from, to){
    this.from = from;
    this.to = to;
    this.time = vkNow();
    this.isTweening = true;

    var self = this;
    function t(gotoEnd) {
      return self.step(gotoEnd);
    }
    t.el = this.el;
    if (t() && Fx.Timers.push(t) && !Fx.TimerId) {
      Fx.TimerId = setInterval(function(){
        var timers = Fx.Timers;
        for (var i = 0; i < timers.length; i++)
          if (!timers[i]())
            timers.splice(i--, 1);
        if (!timers.length) {
          clearInterval(Fx.TimerId);
          Fx.TimerId = null;
        }
      }, 13);
    }
    return this;
  },

  stop: function(gotoEnd) {
    var timers = Fx.Timers;
    // go in reverse order so anything added to the queue during the loop is ignored
    for (var i = timers.length - 1; i >= 0; i--)
      if (timers[i].el == this.el ) {
        if (gotoEnd)
          // force the next step to be the last
          timers[i](true);
        timers.splice(i, 1);
      }
    this.isTweening = false;
  },

  step: function(gotoEnd){
    var time = vkNow();
    if (!gotoEnd && time < this.time + this.options.duration){
      this.cTime = time - this.time;
      this.now = {};
      for (p in this.to) {
        // color fx
        if (isArray(this.to[p])) {
          var color = [], j;
          for (j = 0; j < 3; j++)
            color.push(Math.min(parseInt(this.compute(this.from[p][j], this.to[p][j])), 255));
          this.now[p] = color;
        } else
          this.now[p] = this.compute(this.from[p], this.to[p]);
      }
      this.update();
      return true;
    } else {
//      if (this.el.className == 'im_tab3') alert('this.time: ' + this.time + ', ' + (time - this.time) + ' > ' + this.options.duration);
      setTimeout(this.options.onComplete.bind(this, this.el), 10);
      this.now = extend(this.to, this.options.orig);
      this.update();
      if (this.options.hide) hide(this.el);
      this.isTweening = false;
      return false;
    }
  },

  compute: function(from, to){
    var change = to - from;
    return this.options.transition(this.cTime, from, change, this.options.duration);
  },

  update: function(){
    for (var p in this.now) {
      if (isArray(this.now[p])) setStyle(this.el, p, 'rgb(' + this.now[p].join(',') + ')');
      else this.el[p] != undefined ? (this.el[p] = this.now[p]) : setStyle(this.el, p, this.now[p]);
    }
  },

  cur: function(name, force){
    if (this.el[name] != null && (!this.el.style || this.el.style[name] == null))
      return this.el[name];
    return parseFloat(getStyle(this.el, name, force)) || 0;
  }
};

// Parse strings looking for color tuples [255,255,255]
function getRGB(color) {
  var result;
  if ( color && isArray(color) && color.length == 3 )
    return color;
  if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
    return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
  if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
    return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];
  if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
    return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
  if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
    return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];
}

function getColor(elem, attr) {
  var color;
  do {
    color = getStyle(elem, attr);
    if (color != '' && color != 'transparent' || elem.nodeName.toLowerCase() == "body")
      break;
    attr = "backgroundColor";
  } while (elem = elem.parentNode);
  return getRGB(color);
}

function scrollToTop(speed, top) {
 if (speed == undefined) speed = 400;
 top = top ? (!isNaN(parseInt(top, 10)) ? top : getXY(ge(top))[1]) : 0;
 if (speed) {
  animate(document.getElementsByTagName('html')[0], {scrollTop: top}, speed);
  animate(document.getElementsByTagName('body')[0], {scrollTop: top}, speed);
 } else window.scroll(0, top);
}

/**
 * Events
 **/
var KEY = window.KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DEL: 8,
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  PAGEUP: 33,
  PAGEDOWN: 34,
  SPACE: 32,
  HOME: 36,
  END: 35,
  ENTER: 13,
  DELETE: 46,
  BACKSPACE: 8
};

function addEvent(elem, types, handler, custom, context) {
  elem = ge(elem);
  if (!elem || elem.nodeType == 3 || elem.nodeType == 8 )
    return;

  var real_handler = context ? function(e) {
    var prev_data = e.data;
    e.data = context;
    var ret = handler.apply(this, [e]);
    e.data = prev_data;
    return ret;
  } : handler;

  // For whatever reason, IE has trouble passing the window object
  // around, causing it to be cloned in the process
  if (elem.setInterval && elem != window)
    elem = window;

  var events = data(elem, "events") || data(elem, "events", []),
      handle = data(elem, "handle") || data(elem, "handle", function(){
        _eventHandle.apply(arguments.callee.elem, arguments);
      });
  // Add elem as a property of the handle function
  // This is to prevent a memory leak with non-native
  // event in IE.
  handle.elem = elem;
  each(types.split(/\s+/), function(index, type) {
    var handlers = events[type];
    if (!handlers) {
      handlers = events[type] = new Array();
      if (!custom && elem.addEventListener)
        elem.addEventListener(type, handle, false);
      else if (!custom && elem.attachEvent)
        elem.attachEvent('on' + type, handle);
    }
    handlers.push(real_handler);
  });

  elem = null;
}

function triggerEvent(elem, type, ev) {
  var handle = data(elem, "handle");
  if (handle) {
    setTimeout(function() {handle.call(elem, extend((ev || {}), {type: type, target: elem}))}, 0);
  }
}

function removeEvent(elem, types, handler) {
  elem = ge(elem);
  if (!elem) return;
  var events = data(elem, 'events');
  if (!events) return;
  if (typeof(types) != 'string') {
    for (var i in events) {
      removeEvent(elem, i);
    }
    return;
  }
  each(types.split(/\s+/), function(index, type) {
    if (!isArray(events[type])) return;
    if (isFunction(handler)) {
      for (var i = 0; i < events[type].length; i++) {
        if (events[type][i] == handler) {
          delete events[type][i];
          break;
        }
      }
    } else {
      for (var i = 0; i < events[type].length; i++) {
        delete events[type][i];
      }
    }
    for (var ret in events[type]) break;
    if (!ret) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, data(elem, 'handle'), false);
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, data(elem, 'handle'));
      }
      ret = null;
      delete events[type];
    }
  });
}

function cancelEvent(event) {
  if (!event) return;
  var e = event.originalEvent || event;
  try {
    if (e.preventDefault)
      e.preventDefault();
    if (e.stopPropagation)
      e.stopPropagation();
  } catch (d){};
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

function _eventHandle(event) {
  event = event || window.event;

  var originalEvent = event;
  event = clone(originalEvent);
  event.originalEvent = originalEvent;

  if (!event.target)
    event.target = event.srcElement || document;
  if (!event.currentTarget)
    event.currentTarget = this;

  // check if target is a textnode (safari)
  if (event.target.nodeType == 3)
    event.target = event.target.parentNode;

  if (!event.relatedTarget && event.fromElement)
    event.relatedTarget = event.fromElement == event.target;

  if (event.pageX == null && event.clientX != null) {
    var doc = document.documentElement, body = document.body;
    event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
    event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
  }

  if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode))
    event.which = event.charCode || event.keyCode;

  // Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
  if (!event.metaKey && event.ctrlKey)
    event.metaKey = event.ctrlKey;

  // Add which for click: 1 == left; 2 == middle; 3 == right
  // Note: button is not normalized, so don't use it
  if (!event.which && event.button)
    event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));

  var handlers = data(this, "events");
  if (!handlers || typeof(event.type) != 'string' || !handlers[event.type] || !handlers[event.type].length) {
    return;
  }

  for (var i in (handlers[event.type] || [])) {
    if (event.type == 'mouseover' || event.type == 'mouseout') {
      var parent = event.relatedElement;
      // Traverse up the tree
      while ( parent && parent != this )
        try { parent = parent.parentNode; }
        catch(e) { parent = this; }
      if (parent == this) {
        continue
      }
    }
    var ret = handlers[event.type][i].apply(this, arguments);
    if (ret === false) {
      cancelEvent(event);
    }
  }
}

// Prevent memory leaks in IE
// And prevent errors on refresh with events like mouseover in other browsers
// Window isn't included so as not to unbind existing unload events
addEvent(window, "unload", function(){
  for (var id in vk_cache)
    if (vk_cache[id].handle && vk_cache[id].handle.elem != window)
      removeEvent(vk_cache[id].handle.elem);
});

// Dom ready event handler
(function(){
  var isRdy = false, rdyBnd = false, rdyList = [];

  window.onDomReady = function(fn) {
    bindRdy();
    if (isRdy){
      fn.call(document);
    } else {
      rdyList.push(function() {
        fn.call(document);
      });
    }
  };

  window.onBodyResize = function() {
    var dwidth = Math.max(intval(window.innerWidth), intval(document.documentElement.offsetWidth));
    if (window.lastWindowWidth != dwidth) {
      window.lastWindowWidth = dwidth;
      if (browser.msie6) return;
      if (!window.photoLayerVisible) document.body.style.overflowY = 'auto';
      var pl = ge('pageLayout').offsetWidth, sbw = sbWidth();
      if (document.body.offsetWidth < pl) {
        document.body.style.overflowX = 'auto';
        dwidth = pl + sbw + 2;
      } else {
        document.body.style.overflowX = 'hidden';
      }

      if (dwidth) {
        ge('pageContainer').style.width = (dwidth - sbw - 2) + 'px';
      }
    }
  }

  var rdy = function() {
    if (!isRdy) {
      isRdy = true;
      if (rdyList) {
        var l = rdyList;
        l.reverse();
        while (fn = l.pop()) {
          fn.apply(document);
        }
        rdyList = null;
      }
    }
  };

  var bindRdy = function() {
    if (rdyBnd) return;
      rdyBnd = true;

    if(document.addEventListener && !browser.opera)
      document.addEventListener("DOMContentLoaded", rdy, false);
    if (browser.msie && window == top) (function(){
        if (isRdy) return;
        try {document.documentElement.doScroll("left"); }
        catch (e) { setTimeout(arguments.callee,0); return; }
        rdy();
      })();
    if (browser.opera) document.addEventListener("DOMContentLoaded", function(){
      if (isRdy) return;
        rdy();
    }, false);
    if (browser.safari) {
      (function(){
        if(isRdy) return;
        if (document.readyState != "loaded" && document.readyState != "complete") {
          setTimeout(arguments.callee,0);
          return;
        }
        rdy();
      })();
    }
    addEvent(window, "load", rdy);
  }
})();

/**
 * Ajax
 **/
function serializeForm(form) {
  if (typeof(form) != 'object') {
    return false;
  }
  var result = {};
  var g = function(n) {
    return form.getElementsByTagName(n)
  };
  var nv = function(i, e){
    if (e.name) result[e.name] = (browser.msie && !e.value && form[e.name]) ? form[e.name].value : e.value;
  };
  each(g('input'), function(i, e) {
    if ((e.type != 'radio' && e.type != 'checkbox') || e.checked) return nv(i, e);
  });
  each(g('select'), nv);
  each(g('textarea'), nv);

  return result;
}
function ajx2q(qa) {
 var query = [], q, i =0;
 for (var key in qa) {
   if (qa[key] === undefined || qa[key] === null || typeof(qa[key]) == 'function') continue;
   if (isArray(qa[key])) {
     for (var i = 0; i < qa[key].length; ++i) {
       if (qa[key][i] === undefined || qa[key][i] === null || typeof(qa[key][i]) == 'function') continue;
       query.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(qa[key][i]));
     }
   } else {
     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(qa[key]));
   }
 }
 return query.join('&');
}
function q2o(q) {
 var t = q;
 if (typeof q == 'string') {
   var d=q.split('&'),v,i; t={};
   for (i=0; i<d.length; i++) {
     v=d[i].split('=');
     t[decodeURIComponent(v[0])] = decodeURIComponent(v[1]);
   }
 }
 return t;
}
function Ajax(onDone, onFail, eval_res){
 var _t = this;
 this.onDone = onDone;
 this.onFail = onFail;
 var tram = null;
 try { tram = new XMLHttpRequest(); }
 catch(e) { tram = null; }
 if (!tram) {
  try { if(!tram) tram = new ActiveXObject("Msxml2.XMLHTTP"); }
  catch(e) { tram = null; }
 }
 if (!tram) {
  try { if(!tram) tram = new ActiveXObject("Microsoft.XMLHTTP"); }
  catch(e) { tram = null; }
 }

 var readystatechange = function(url, data) {
    if(tram.readyState == 4 ) {
     if(tram.status >= 200 && tram.status < 300) {
       if(eval_res) parseRes();
       if( _t.onDone ) _t.onDone(extend(_t, {url: url, data: data}), tram.responseText);
     } else {
       _t.status = tram.status;
       _t.readyState = tram.readyState;
       if( _t.onFail ) _t.onFail(extend(_t, {url: url, data: data}), tram.responseText);
     }
   }
 };

 var parseRes = function(){
   if(!tram || !tram.responseText)return;
   var res = tram.responseText.replace(/^[\s\n]+/g, '');

   if(res.substr(0,10)=="<noscript>")
   {
     try{
       var arr = res.substr(10).split("</noscript>");
       eval(arr[0]);
       tram.responseText = arr[1];
     }catch(e){
       debugLog('eval ajax script:' + e.message);
     }
   }else{}
  };
  this.get = function(u, d, f){
   tram.onreadystatechange = function(){ readystatechange(u, d); };
   f = f || false;
   var q = (typeof(d) != 'string') ? ajx2q(d) : d;
   u = u + (q ? ('?'+q) : '');
   tram.open('GET', u, !f);

   tram.setRequestHeader("X-Requested-With", "XMLHttpRequest");
   tram.send('');
  };
  this.post = function(u, d, f){
   tram.onreadystatechange = function(){ readystatechange(u, d); };
   f = f || false;
   var q = (typeof(d) != 'string') ? ajx2q(d) : d;
   try {
     tram.open('POST', u, !f);
   } catch(e) {
     debugLog('ajax post error: '+e.message);
   }
   tram.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   tram.setRequestHeader("X-Requested-With", "XMLHttpRequest");
   tram.send(q);
  };
}

function activate_mobile(from_captcha, on_hide, hash) {
  if (from_captcha) {
    on_hide = function() {
      Ajax._captchaBox.show();
      if (!window.need_mobile_act) {
        triggerEvent(ge('captchaKey'), 'keypress', {keyCode: 13});
      }
    }
  }
  showBox('activate_mobile', 'activation.php', {act: 'activate_mobile_box', hash: hash}, false, true, {type: 'POPUP', hideOnClick: false, progress: 'activate_progress', onHide: on_hide}, ['css/al/reg.css']);
}

function showCaptcha(sid, img, onClick, onShow, onHide) {
  if (window.Ajax._captchaBox === undefined) {
     window.Ajax._captchaBox = new MessageBox({title: getLang('captcha_enter_code'), width: 300});
  }
  var box = window.Ajax._captchaBox;
  box.removeButtons();
  var key;

  var about_mobile_text = '';

  var onClickHandler = function() {
    removeEvent(key, 'keypress');
    onClick(sid, key.value);
    hide('captchaKey');
    show('captchaLoader');
  }

  if (window.need_mobile_act == 1 && !ge('please_confirm_mail')) {
    about_mobile_text = global_try_to_activate.replace('{link}', '<a href="javascript: activate_mobile(true)">').replace('{/link}', '</a>');
    about_mobile_text = '<div style="text-align: center; font-size: 10px; padding-top: 5px; line-height: 15px;">' + about_mobile_text + '</span>';
  }
  box.addButton({label: getLang('captcha_cancel'), style: 'button_no', onClick: function(){
    removeEvent(key, 'keypress');
    box.hide();
  }});
  box.addButton({label: getLang('captcha_send'), onClick: onClickHandler});
  box.setOptions({onHide: onHide, bodyStyle: 'padding: 16px 14px' + (about_mobile_text.length ? ' 10px' : '')});
  box.content('<div style="text-align: center; height: 76px"><a href="#" id="refreshCaptcha"><img id="captchaImg" class="captchaImg" src="'+img+ '"/></a><div></div><input id="captchaKey" class="inputText" name="captcha_key" type="text" style="width: 120px; margin: 3px 0px 0px;" maxlength="7"/><img id="captchaLoader" src="'+base_domain+'images/progress7.gif" style="display:none; margin-top: 13px;" /></div>' + about_mobile_text);
  box.show();
  if (isFunction(onShow)) onShow();

  key = ge('captchaKey');
  addEvent(key, 'keypress', function(e) { if(e.keyCode==13){ onClickHandler(); }});
  addEvent(ge('refreshCaptcha'), 'click', onClickHandler);
  key.focus();
}


(function(){
  var ajaxObjs = {};
  window.Ajax.Get = function(p){
    var a = (p.key)?ajaxObjs[p.key]:null;
    if(!a){
      a = new Ajax(p.onDone, p.onFail, p.eval);
      if(p.key)ajaxObjs[p.key] = a;
    }
    a.get(p.url, p.query, p.sync);
  }
  window.Ajax.Post = function(p){
    var a = (p.key)?ajaxObjs[p.key]:null;
    if(!a){
      a = new Ajax(p.onDone, p.onFail, p.eval);
      if(p.key)ajaxObjs[p.key] = a;
    }
    a.post(p.url, p.query, p.sync);
  }

  window.Ajax.postWithCaptcha = function(url, data, options) {
    var onSuccess, onFail, onCaptchaShow, onCaptchaHide, difficulty, p;
    if (!options) options = {};
    if (isFunction(options)) {
      onSuccess = options;
    } else {
      onSuccess = options.onSuccess;
      onFail = options.onFail;
      onCaptchaShow = options.onCaptchaShow;
      onCaptchaHide = options.onCaptchaHide;
    }
    var done = function(o, t) {
      var r;
      try {
        r = eval('(' + t + ')');
        if (r.ok == -5) {
          if (ge('please_confirm_mail')) {
            r.ok = -4;
          }
        }
        switch(r.ok) {
          case -6:
            var box = new MessageBox({title:r.title || getLang('global_charged_zone_title'), returnHidden:true});
            box.addButton({label: getLang('global_cancel'), style: 'button_no', onClick: function() {
              box.setOptions({returnHidden:false});
              box.hide();
            }}).addButton({label:getLang('global_charged_zone_continue'), onClick: function() {
              box.hide();
              p.query.charged_confirm = r.hash;
              Ajax.Post(p);
            }}).content(r.message).show();
            break;
          case -5:
            if (isFunction(onCaptchaShow)) onCaptchaShow();
            if (r.title || r.message) {
              var box = new MessageBox({title: r.title || 'Подтверждение действия'});
              box.addButton({label: getLang('global_close'), onClick: box.hide});
              box.content(r.message || 'Превышено ограничение на количество действий, попробуйте позже.').show();
            } else {
              window.validated = false;
              activate_mobile(false, function() {
                if (window.validated) {
                  Ajax.Post(p);
                }
                if (onCaptchaHide) onCaptchaHide(!window.need_mobile_act);
              }, r.hash);
            }
            break;
         case -4:
            if (isFunction(onCaptchaShow)) onCaptchaShow()
            if (ge('please_confirm_mail')) {
              show_change_mail_box(onCaptchaHide);
            } else {
              if (onCaptchaHide) onCaptchaHide();
            }
            break;
          case -3:
            var to;
            var iframe = ce('iframe', {src: vk.loginscheme + '://login.vk.com/?ip_h=' + vk.ip_h}, {visibility: 'hidden', position: 'absolute'});
            document.body.appendChild(iframe);
            var onload = function() {
              try {
                var href = iframe.contentWindow.location.href;
                if (href.match(/&hash=/)) {
                  if (href.match(/&hash=[a-z0-9]+/)) {
                    Ajax.Post(p);
                  } else {
                    location.href= base_domain + 'login.php?op=logout'; return false;
                  }
                  clearInterval(t);
                }
              } catch(e) {}
            }
            if (browser.msie) {
               to = setInterval(function(){
                if (iframe.document.readyState == 'complete') {
                  onload();
                }
              }, 200);
            } else {
             iframe.onload = onload;
            }
            break;
          case -2:
            // Show captcha here TODO
            var difficulty = '';
            if (r.difficult === undefined) r.difficult = options.difficultCaptcha ? 1 : 0;
            if (r.difficult !== undefined) {
              difficulty = intval(r.difficult) ? '' : 's=1&';
            }
            var onClick = function(sid, value) {
              if (typeof(p.query) == 'object') {
                extend(p.query, {'captcha_sid': sid, 'captcha_key': value});
              } else {
                p.query += '&captcha_sid=' + sid + '&captcha_key=' + value;
              }
              Ajax.Post(p);
              return false;
            };
            var captcha_img = base_domain+'captcha.php?'+difficulty+'sid='+r.captcha_sid;
            showCaptcha(r.captcha_sid, captcha_img, onClick, onCaptchaShow, onCaptchaHide);
            break;
          default:
            throw "Exit";
            break;
        }
      } catch (e) { // if captcha test passed
        if (options.json && r)
          t = r;
        else if (r && typeof(r.text) == 'string')
          t = r.text;
        if (window.Ajax._captchaBox) {
          window.Ajax._captchaBox.setOptions({onHide: function(){}}).hide();
          if (isFunction(onCaptchaHide)) onCaptchaHide(true);
        }
        if (isFunction(onSuccess)) onSuccess(o, t);
      }
    };
    var fail = function(o, t) {
      if (isFunction(onFail)) onFail(o, t);
      if (window.Ajax._captchaBox) {
        window.Ajax._captchaBox.setOptions({onHide: function(){}}).hide();
        if (isFunction(onCaptchaHide)) onCaptchaHide(true);
      }
    };
    p = {
      url: url,
      query: data,
      onFail: fail,
      onDone: done
    };
    Ajax.Post(p);
  }
  window.Ajax.History = function(url, query, update, failed) {
    ajaxHistory.useCache = false;
    ajaxHistory.prepare({url: url, done: function(o,t){
      try {
        var r = eval('('+t+')');
        if(r.data)Ajax.current = r.data;
        update(r);
      } catch (e) {
        debugLog(e);
      }
    }, fail:failed, def: query});
    Ajax.current = query;
  };
  window.Ajax.Go = function(query) {
    var q = extend(clone(Ajax.current), query);
    ajaxHistory.go(q);
    return false;
  }
  window.Ajax.Send = Ajax.postWithCaptcha;
})();

var ajaxHistory = $ah = new (function(){
   var _t = this;

   var curHash = "";
   var curHashes = {};
   var frame = null;
   var with_frame = browser.msie6 || browser.msie7;
   var frame_doc = function() {
     return frame.contentDocument ? frame.contentDocument : (frame.contentWindow ? frame.contentWindow.document : frame.document);
   }
   var setFrameContent = function(hash) {
     var d = frame_doc();
     d.open();
     d.write('<div id="hash">' +
         hash.replace('&', '&amp;').replace('"', '&quot;').replace('>', '&gt;').replace('<', '&lt;') +
       '</div>'
     );
     d.close();
   }
   var forceLoad = false;
   var order = null;

   //_t.frameLoading = false;
   _t.enabled = false;
   _t.useCache = true;
   _t.onLoad = {};
   _t.cache = {};
   _t.preloads = {};

   var setHash = function(hash){
     hash = hash.replace("#","");
     if (location.hash != "#" + hash){
       location.hash = "#" + hash;
       if (with_frame) {
         setFrameContent(hash);
         handler();
       }
     }
     return true;
   };
   var getHash = function(){
     if (!with_frame) return location.hash.replace("#","");
     try {
       return frame_doc().getElementById('hash').innerHTML.replace(/&lt;/ig, '<').replace(/&gt;/ig, '>').replace(/&quot;/ig, '"').replace(/&amp;/ig, '&');
     } catch(e) { return curHash; }
   };
   var splitHash = function(hash){
     if(!hash)return {};
     hash = hash.split("/");
     if(hash.length == 1){
       if(!_t.onLoad['default'])return {};
       if(_t.onLoad['default'].show)hash[0] = _t.onLoad['default'].show.from(hash[0]);
       return {'default':sortParams(hash[0])};
     }
     var parsed = {};
     for(var i=0;i<hash.length;i+=2){
       var h = hash[i];var p = hash[i+1];
       if(_t.onLoad[h].show){p = sortParams(_t.onLoad[h].show.from(p));}
       else{
         p = sortParams(p);
         if(!p && _t.onLoad[h])p = sortParams(_t.onLoad[h].def);
       }
       parsed[h] = p;
     }
     return parsed;
   };
   var joinHash = function(hash){
     var joined = [];
     var def = true;
     for(var i in hash){
       def = def && (i=='default');
       var p = sortParams(hash[i]);
       if(_t.onLoad[i].show){
         var p1 = _t.onLoad[i].show.to(splitParams(hash[i]));
         if(p1)p = p1;
       }
       joined.push(i + "/" + p);
     }
     if(def && joined[0])return joined[0].split("/")[1];
     return joined.sort().join("/");
   };
   var splitParams = function(params){
     if(!params)return {};
     if(typeof(params)!='string')return params;
     if(!/&|=/.test(params))return params;
     var vals = params.split("&");
     var p = {};
     for(var i=0;i<vals.length;i++){
       var v = vals[i].split("=");
       p[v[0]] = v[1];
     }
     return p;
   };
   var sortParams = function(params){
     if(typeof(params)=='number')return params+'';
     if(typeof(params)!='string'){
       params = ajx2q(params);
     }
     return params.split("&").sort().join("&");
   };

  var handler = function(){
    var origHash = getHash();
    if(origHash==curHash && !forceLoad)return;
    var state = splitHash(origHash);
    var hash = joinHash(state);
    if(hash != curHash || forceLoad){
      curHash = hash;
      var ordered = order || _t.onLoad;
      for(var i in ordered){
        if(order)i = ordered[i];
        var l = _t.onLoad[i];
        var p = state[i] || sortParams(l.def);
        if (curHash != l.ignoreHash && (p != curHashes[i] || i == forceLoad)) {
          var addAuto = !forceLoad ? '&auto=1' : '';
          forceLoad = false;
          if(l.before && !l.before(splitParams(p))){
            curHashes[i] = p;
            continue;
          }
          if (!_t.cache[i]) _t.cache[i] = {};
          if (!_t.preloads[i]) _t.preloads[i] = {};
          var p_good = decodeURIComponent(p);
          if (!_t.useCache || (!_t.cache[i][p] && !_t.cache[i][p_good])) {
            if (_t.preloads[i][p]) {
              if (l.done) _t.preloads[i][p] = l.done;
            } else if (_t.preloads[i][p_good]) {
              if (l.done) _t.preloads[i][p_good] = l.done;
            } else {
              _t.getData(l,i,p + addAuto,hash);
            }
          } else if (l.done) {
            if (_t.cache[i][p]) {
              l.done({}, _t.cache[i][p]);
            } else {
              l.done({}, _t.cache[i][p_good]);
            }
          }
          curHashes[i] = p;
        }
      }
      if (with_frame) {
        if(location.hash!='#' + curHash)
          location.hash = '#' + curHash;
      }
    }
  };

  var inited = false;
 _t.init = function(){
   if(!this.enabled || inited)return;
   inited = true;
   for(var i in _t.onLoad){
     var p = sortParams(_t.onLoad[i].def);
     curHashes[i] = p;
   };
   if (browser.msie && !browser.msie8){
     frame = ce('iframe', {id: 'ahFrame'}, {position: 'absolute', visibility: 'hidden'});
     addEvent(frame, 'readystatechange', function() {
       if (this.contentWindow.document.readyState != 'complete') {
         return;
       }
       handler();
     });
     document.body.appendChild(frame);
     setFrameContent(location.hash.replace('#', '')); //added
     handler();
   } else {
     setInterval(handler,150);
   }
 };
 _t.go = function(s, params){
   if(params===undefined){params = s; s = 'default';}
   var state = splitHash(curHash);
   state[s] = sortParams(params);
   var hash = joinHash(state);
   setHash(hash);
   forceLoad = s;
   if (!with_frame) {
     handler();
   }
 };
 _t.getData = function(loadObj, id, params, hash){
   var a = new Ajax(
   (function(l,i,p,t){return function(res,text){
     var c = true;
     if(l.done)c = l.done(res,text);
     if (t.useCache) {
       var autoMarker = p.indexOf('&auto=1');
       if (autoMarker != -1) {
         p = p.substr(0, autoMarker);
       }
       if(c !== false)_t.cache[i][p] = text;
     }
   };})(loadObj,id,params, _t),
   (function(l,i,p,t){return function(res,text){
     if(l.fail)l.fail(res,text);
   };})(loadObj,id,params, _t),
   true);
   a.post(loadObj.url, params );
 };
 _t.prepare = function(id, params){
   _t.enabled = true;
   if(params===undefined){params = id; id = 'default';}
   _t.onLoad[id] = params;
 };
 _t.validateHash = function(hash){return joinHash(splitHash(hash));};
 _t.clearCache = function(id){_t.cache[id] = {}};
 _t.clearCurr = function(id){
    if (id === undefined) {
      id = 'default';
    }
    if (!_t.cache || !_t.cache[id]) {
      return;
    }
    var state = splitHash(curHash);
    var p = state[id], p_good = decodeURIComponent(state[id]);
    _t.cache[id][p] = _t.cache[id][p_good] = undefined;
  }
 _t.setHash = function(s, hash){
  if(hash===undefined){hash = s; s = 'default';}
   hash = hash.replace("#","");
   if(location.hash != "#" + hash){
     location.hash = "#" + hash;
     curHash = hash;
     curHashes[s] = curHash;
   }
 };
// Functions below work only with one - 'default' - id.
 _t.addToCache = function(hash, text) {
   if (!_t.useCache) return;
   var id = 'default';
   var state = splitHash(hash);
   if (!_t.cache[id]) _t.cache[id] = {};
   else if (_t.cache[id][state[id]]) return;
   _t.cache[id][state[id]] = text;
 };
 _t.preLoad = function(hash, on_preloaded) {
   if (!_t.useCache) return;

   var id = 'default';
   var state = splitHash(hash);

   if (!_t.cache[id]) _t.cache[id] = {};
   if (_t.cache[id][state[id]]) return;

   if (!_t.preloads[id]) _t.preloads[id] = {};
   _t.preloads[id][state[id]] = '<loading>';

   var a = new Ajax(
   (function(i,p){return function(res,text){
     var c = true;
     if (_t.preloads[i][p] != '<loading>') {
       c = _t.preloads[i][p](res, text);
     } else if (on_preloaded) {
       c = on_preloaded(res, text);
     }
     if(c !== false)_t.cache[i][p] = text;
   };})(id, state[id]),
   function() {}, true);
   a.post(_t.onLoad[id].url, state[id] + '&preload=1');
 }
})();

onDomReady(function(){
  ajaxHistory.init();
});

/**
 * Cookies
 **/

var _cookies;
function _initCookies() {
  _cookies = {};
  var ca = document.cookie.split(';');
  var re = /^[\s]*([^\s]+?)$/i;
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i].split("=");
    if(c.length == 2) {
     _cookies[c[0].match(re)[1]] = unescape(c[1].match(re) ? c[1].match(re)[1] : '');
    }
  }
}
function getCookie(name) {
  if (!_cookies) _initCookies();
  return _cookies[name];
}
function setCookie(name, value, days) {
  if (!_cookies) _initCookies();
  _cookies[name] = value;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  var domain = location.host.match(/[^.]+\.[^.]+$/);
  document.cookie = name+"="+escape(value)+expires+"; path=/"+(domain ? '; domain=.'+domain : '');
}

/**
 * Other stuff
 **/

function callHub(func, count) {
  this.count = count || 1;
  this.done = function(c) {
    this.count -= c || 1;
    if (this.count <= 0) {
      func();
    }
  };
}
var gSearch = new (function() {
  this.on = 0;
  var self = this;
  this.hub = new callHub(function() {
    if (self.onShow) onDomReady(self.onShow);
  }, 2);
  this.hintsHub = new callHub(function() {
    self.showStartHints();
  }, 2);
  this.load = function() {
    if (!ge('quick_search')) return;
    if (this.global) return;
    if (this.loading) return;
    this.loading = true;
    jsDispatcher.include('qsearch', function() {
      self.hub.done();
    });
    Ajax.Send('hints.php', {act: 'a_start_hints'}, {onSuccess: function(o, t) {
      self.startHintsText = trim(t);
      self.hintsHub.done();
    }});
  },
  this.show = function(e, noAnim) {
    if (!ge('quick_search')) return;
    if (this.on) {
      return this.go(e);
    }
    this.on = 1;
    show('quick_search');
    placeholderSetup('search_input');
    ge('search_input').setAttribute('autocomplete', 'off');
    addClass('qsearch_link', 'active');
    if (this.global) return;
    this.prev_content = ge('content');
    if (!this.qsearch_cont) {
      this.qsearch_cont = ce('div', {id: 'content', innerHTML: '<div style="padding: 200px; text-align: center;"><img src="/images/progress7.gif"/></div>'}, {padding: 0});
    }
    hide('header');
    this.prev_content.parentNode.replaceChild(this.qsearch_cont, this.prev_content);
    if (!this.loading) this.load();
    self.hub.done();
    self.hintsHub.done();
    if (e) return cancelEvent(e);
  };
  this.go = function (e) {
    if (self.global) {
      return globalSearch();
    }
    var url = '/gsearch.php?section=' + (self.last_section || 'people') + '&q=' + trim(ge('search_input').getValue ? ge('search_input').getValue() : ge('search_input').value) + '&name=1';
    cancelEvent(e || window.event);
    location.href = url;
    return false;
  };

  this.hide = function(e, force) {
    if (!ge('quick_search')) return;
    if ((self.active && !force) || !self.on) return;
    self.on = 0;
    toggleFlash();
    if (self.beforeHide && self.beforeHide()) {
      return true;
    }
    show('header');
    hide('quick_search');
    if (ge('search_input').setValue) {
      ge('search_input').setValue('');
    } else {
      ge('search_input').value = '';
    }
    removeClass('qsearch_link', 'active');
    if (self.qsearch_cont)
      self.qsearch_cont.parentNode.replaceChild(self.prev_content, self.qsearch_cont);
  };

  this.init = function(options) {
    this.opt = options || {};
  }
})();
function dispatchIntro(step, params) {
  if (typeof dispatchIntroEvent != 'undefined') {dispatchIntroEvent(step, params);}
}

var send_request_url = 'http://userapi.com/data?';

var qCur = 0, qOn = 0, sOn = 0, qfOn = 0, qd = 0, l = 0, qa = 0, qfCur = -1, newSearch = 0;
// var qArr is in langpack

reqs = []; res = [];
friends_l = [];
friends_arr = [];
floaded = false;

function doRequest(params, resultFunc) {
  var req = createRequest(params, resultFunc);
  sendRequest(req);
}

function createRequest(params, resultFunc) {
  var req = new Object();
  req.params = params;
  req.resultFunc = resultFunc;
  req.destroy = destroy;
  var rnum = Math.floor(Math.random()*1000);
  req.num = rnum;
  req.running = 1;
  reqs[rnum] = req;
  return req;
}

function sendRequest(req) {
 attachScript('req'+req.num, send_request_url+req.params+'&sid='+getCookie('remixsid')+'&back=reqs['+req.num+'].resultFunc');
}

function attachScript(id, c) {
 var i, new_id = c.substr(c.indexOf('/')+1, c.indexOf('.')-c.indexOf('/')+2).replace(/[\/\.]/g, '_');
 var newreqs = [];
 for (reqnum in reqs) {
  req = reqs[reqnum];
  if (req) {
   if (req.running == 0) {
    ge('req'+req.num).parentNode.removeChild(ge('req'+req.num));
    reqs[reqnum] = null;
   } else {
    newreqs[reqnum] = req;
   }
  }
 }
 reqs = newreqs;
 document.getElementsByTagName('head')[0].appendChild(
  ce('script', {id: id, type: 'text/javascript', src: ((!/^http:\/\//i.test(c) && !/^\//i.test(c)) ? base_domain : '') + c + (css_versions[new_id] ? ('?' + css_versions[new_id]) : '')})
 );
}


function destroy() {
 if (reqs[this.num]) {
  reqs[this.num].running = 0;
 }
}


function addCss(c) {
  var new_id = c.substr(c.indexOf('/')+1, c.indexOf('.')-c.indexOf('/')-1)+'_css';
  if (!ge(new_id)) {
    document.getElementsByTagName("head")[0].appendChild(
      ce('link', {type: 'text/css', rel: 'stylesheet', href: base_domain + c + (css_versions[new_id] ? ('?' + css_versions[new_id]) : ''), id: new_id, media: 'screen'})
    );
  }
}

var rateBox;
function showRateVotesBox() {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  addCss('css/privacy.css');
  addCss('css/wiki.css');
  if (rateBox == undefined) {
    rateBox = new MessageBox(
     {title: getLang('global_rating_box_header'), bodyStyle: 'padding:0px', width: '480px', progress: 'rateProgress'}
    );
  }
  rateBox.removeButtons();
  rateBox.addButton({
    onClick: function() { rateBox.hide(200); },
    label: getLang('box_close')
  });
  rateBox.loadContent('rate.php', {'act':'a_get_rate_votes', 'full': 1}, true).show();
  return false;
}

function leftBlockOver(block) {
  var timer = 'timer', over = 1;
  if (!block.id) {
    block = ge('left_hide' + block);
    over = 0;
  }
  if (over || !block.timer) {
    if (block.showing) {
      delete block.showing;
    } else {
      animate(block, {opacity: over ? 1 : 0.5}, 200);
      if (over) {
        block.showing = 1;
      }
    }
  }
  if (block.timer) {
    clearTimeout(block.timer);
    delete block.timer;
  }
}
function leftBlockOut(block) {
  var opacity = 0.5;
  if (!block.id) {
    block = ge('left_hide' + block);
    opacity = 0;
  }
  block.timer = setTimeout(function() {
    animate(block, {opacity: opacity}, 200);
    delete block.timer;
  }, 1);
}
function leftBlockHide(block, hash) {
  ajax.post('al_index.php', {act: 'hide_block', block: block, hash: hash});
  hide('left_block' + block);
}
function leftAdBlockHide(blockId, url) {
  var ajax = new Ajax();
  ajax.onDone = function(obj, response) {
    var r = eval('(' + response + ')');
    if (r.done) {
      var box = ge('ad_box' + blockId);
      var mask = ge('ad_hide_mask' + blockId);

      if (!box || !mask) return false;

      mask.timer = setTimeout(function() {
        animate(mask, {opacity: 1}, 200);
        delete mask.timer;
      }, 0);
      var x = getXY(box), s = getSize(box), btop = 1, bbot = 1;
      if (box.style.borderTop == '0px') {
        btop = 0;
      }
      if (btop) {
        s[1] -= btop;
      }
      if (bbot) {
        s[1] -= bbot;
      }

      var textH = (mask.firstChild.nextSibling === null) ? 40 : 108;
      var padtop;
      if (s[1] < textH + 10) {
        s[1] = textH + 10;
        padtop = Math.floor((s[1] - textH) / 2);
        box.style.height = s[1] - 6 - padtop + 'px';
      }
      var padtop = Math.floor((s[1] - textH) / 2);
      setStyle(mask, {left: x[0], top: x[1], height: s[1] - padtop, paddingTop: padtop, display: 'block'});
    }
  }
  ajax.post(url);

  var hideX = ge('left_hide' + blockId);
  if (hideX && hideX.parentNode) {
    hideX.parentNode.removeChild(hideX);
  }
  return false;
}


function parseLatin(text, back){
  var outtext = text;
  var lat1 = ["yo","zh","kh","ts","ch","sch","shch","sh","eh","yu","ya","YO","ZH","KH","TS","CH","SCH","SHCH","SH","EH","YU","YA","'"];
  var rus1 = ["ё", "ж", "х", "ц", "ч", "щ",  "щ",   "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ",  "Щ",   "Ш", "Э", "Ю", "Я", "ь"];
  for(var i=0;i<lat1.length;i++){
    if (back) { outtext = outtext.split(rus1[i]).join(lat1[i]); }
    else { outtext = outtext.split(lat1[i]).join(rus1[i]); }
  }
  var lat2 = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCY" + "ёЁ";
  var rus2 = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫ" + "еЕ";
  for(var i=0;i<lat2.length;i++){
    if (back) { outtext = outtext.split(rus2.charAt(i)).join(lat2.charAt(i)); }
    else { outtext = outtext.split(lat2.charAt(i)).join(rus2.charAt(i)); }
  }
  return (outtext==text)?null:outtext;
}

function placeholderSetup(id) {
  var el = ge(id);
  if (!el) return;
  if (browser.opera && browser.mobile) {
    el.getValue = function(){return el.value;}
    el.setValue = function(v){el.value = v;}
    return;
  }
  var ph = el.getAttribute("placeholder");
  if (!el['phevents'] && ph && ph != "") {
    el['active'] = 1;
    if ((!el.value || el.value == ph) && !el.focused) {
      el.style.color = '#777';
      el.value = ph;
      el['active'] = 0;
    }
    addEvent(el, 'focus', function(){
      if (el['active']) return;
      el['active'] = 1;
      el.value = '';
      el.style.color = '#000';
    });
    addEvent(el, 'blur', function(){
      if( !el['active'] || !ph || el.value != "" ) return;
      el['active'] = 0;
      el.style.color = '#777';
      el.value = ph;
    });
    el.getValue = function() {
      return (el['active'] || el.value != ph) ? el.value : '';
    }
    el.setValue = function(val) {
      el.active = val ? 1 : 0;
      el.value = val ? val : ph;
      el.style.color = val ? '#000' : '#777';
    }
    el['phevents'] = 1;
  }
}

function setSelRange(id, from, to) {
  var el = ge(id);
  if (!el || (el.type.toLowerCase() != 'text' && el.type.toLowerCase() != 'password' && el.tagName.toLowerCase() != 'textarea')) return;
  el.focus();
  if (el.createTextRange) {
    var range = el.createTextRange();
    range.collapse(true);
    range.moveEnd('character', from);
    range.moveStart('character', to);
    range.select();
  } else if (el.setSelectionRange) {
    el.setSelectionRange(from, to);
  }
}

function focusAtEnd(id) {
  var el = ge(id);
  if (!el || (el.type != 'text' && el.type != 'password' && el.tagName.toLowerCase() != 'textarea')) return;
  setSelRange(el, el.value.length, el.value.length);
}

/**
 * Message box
 **/
var _message_box_guid = 0,
    _message_boxes = [],
    _message_box_shown = 0,
    _doc_block_timeout, _doc_blocked = false;
function MessageBox(options) {
  var defaults = {
    type: "MESSAGE", // "MESSAGE" || "POPUP"
    hideOnClick: true,
    title: "Alert",
    width: "410px",
    height: "auto",
    bodyStyle: "",
    closeButton: false, // AntanubiS - 'X' close button in the caption.
    fullPageLink: '', // If is set - 'box'-like button in the caption.
    progress: false, // AntanubiS - Progress bar.
    returnHidden: false // AntanubiS - When hide - return previously hidden box.
  };

  options = extend(defaults, options);

  var buttonsCount = 0, body = document.getElementsByTagName('body')[0],
      transparentBG, boxContainer, boxBG, boxContainer, boxLayout, boxTitle, boxBody, boxControls, boxProgress, buttonYes, buttonNo, boxCloseButton, boxFullPageLink,
      guid = (++_message_box_guid), isVisible = false, hiddenBox;

  transparentBG = ge('popupTransparentBG');
  if (!transparentBG) {
    transparentBG = ce('div', {id: 'popupTransparentBG', className: 'popup_transparent_bg'}, {display: 'none', height: getSize(document)[1]});
    addEvent(window, 'resize', function() {
      transparentBG.style.height = getSize(document)[1] + 'px';
    });
    onDomReady(function() {
      body.appendChild(transparentBG);
    });
  }

  var x_button = options.closeButton ? '<div class="box_x_button"></div>' : '';
  var full_page_button = options.fullPageLink ? '<a onfocus="this.blur()" class="box_full_page_link" href="' + options.fullPageLink + '"></a>' : '';
  boxContainer = ce('div', {
    className: 'popup_box_container',
    innerHTML: '<div class="box_layout"><div class="box_title_wrap">' + x_button + full_page_button + '<div class="box_title"></div></div><div class="box_body" style="'+options.bodyStyle+'"></div><div class="box_controls_wrap"><div class="box_controls"></div></div></div>'
  }, {display: 'none'});

  boxLayout = geByClass('box_layout', boxContainer)[0];
  boxTitle = geByClass('box_title', boxContainer)[0];
  boxBody = geByClass('box_body', boxContainer)[0];
  boxControls = geByClass('box_controls', boxContainer)[0];
  boxCloseButton = options.closeButton ? geByClass('box_x_button', boxContainer)[0] : false;
  boxFullPageLink = options.fullPageLink ? geByClass('box_full_page_link', boxContainer)[0] : false;

  if (options.progress) {
    boxControls.innerHTML = '<img src="' + base_domain + 'images/upload.gif" id="' + options.progress + '" style="display: none" />';
    boxProgress = boxControls.firstChild;
  } else {
    boxProgress = null;
  }

  addEvent(document, 'keydown', function(e) {
    if (e.keyCode == 27) {
      hideBox();
    }
  });

  if (!_message_boxes.length) {
    addEvent(document, 'block unblock', function(e) {
      toggleFlash(e.type == 'unblock');
    });
  }

  onDomReady(function() {
    body.appendChild(boxContainer);
    refreshBox();
    refreshCoords();
  });

  // Refresh box position
  function refreshCoords() {
    var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);
    containerSize = getSize(boxContainer);
    var scrollTop = Math.max(intval(window.pageYOffset), document.documentElement.scrollTop,  body.scrollTop);
    if (!scrollTop && window.parent && window.parent != window && window._currentFocusEl) {
      var top = getXY(window._currentFocusEl)[1];
    } else {
      var top = Math.max(0, scrollTop + (height - containerSize[1]) / 3);
    }
    boxContainer.style.top = top + 'px';
    boxContainer.style.marginLeft =  - containerSize[0] / 2 + 'px';
  }

  // Add button
  function addButton(options) {
    buttonsCount++;
    if (typeof options != 'object') options = {};
    options = extend({
        label: 'Button' + buttonsCount,
        style: 'button_blue'
    }, options);
    if (options.style == 'button_no') options.style = 'button_gray';
    if (options.style == 'button_yes') options.style = 'button_blue';
    var buttonWrap = ce('div', {className: options.style + ' fl_r', innerHTML: '<button id="button' + guid + '_' + buttonsCount + '">' + options.label + '</button>'});
    if (boxProgress) {
      boxControls.insertBefore(buttonWrap, boxProgress);
    } else {
      boxControls.appendChild(buttonWrap);
    }
    createButton(buttonWrap.firstChild, options.onClick);
    return buttonWrap;
  }

  // Add custom controls text
  function addControlsText(text) {
    var textWrap = ce('div', {className: 'controls_wrap', innerHTML: text});
    boxControls.appendChild(textWrap);
    return textWrap;
  }

  // Remove buttons
  function removeButtons() {
    var buttons = [];
    buttonsCount = 0;
    each (boxControls.childNodes, function(i, x) {
      if (x && (!boxProgress || x != boxProgress)) {
        removeEvent(x);
        buttons.push(x);
      }
    });
    each(buttons, function(){boxControls.removeChild(this)});
   // boxControls.innerHTML = '';
  }

  // Refresh box properties
  function refreshBox() {
    // Set title
    boxTitle.innerHTML = options.title;

    // Set box dimensions
    boxContainer.style.width = typeof(options.width) == 'string' ? options.width : options.width + 'px';
    boxContainer.style.height = typeof(options.height) == 'string' ? options.height : options.height + 'px';

    // Switch box type
    removeClass(boxContainer, 'box_no_controls');
    removeClass(boxContainer, 'message_box');

    removeEvent(boxContainer, 'click');
    if (options.hideOnClick && options.type == 'POPUP') {
      addEvent(boxContainer, 'click', function(){
        hideBox();
      });
    }

    switch (options.type) {
      case 'POPUP':
        addClass(boxContainer, 'box_no_controls');
        if (options.hideOnClick) {
          addEvent(transparentBG, 'click', function(){
            hideBox();
          });
        }
      break;

      case 'MESSAGE':
        if (options.hideOnOutClick) {
          addEvent(transparentBG, 'click', function(){
            hideBox();
          });
        } else {
          removeEvent(transparentBG, 'click');
        }
        addClass(boxContainer, 'message_box');
      break;
    }
  }

  // Show box
  function showBox() {
    if (isVisible) return;
    isVisible = true;
    hiddenBox = 0;

    if (_message_box_shown && _message_boxes[_message_box_shown].isVisible) {
      var box = _message_boxes[_message_box_shown];
      if (options.returnHidden) {
        hiddenBox = _message_box_shown;
        box.hideContainer();
      } else {
        box.hide();
      }
    }
//  fadeIn(boxContainer, 200); // Video wall posting fails with fadeIn
    show(boxContainer);

    refreshCoords();
    if (!_message_box_shown) {
      transparentBG.style.height = getSize(document)[1] + 'px';
      show(transparentBG);
      clearTimeout(_doc_block_timeout);
      if (!_doc_blocked) {
        _doc_blocked = true;
        triggerEvent(document, 'block');
      }
    }

    _message_box_shown = guid;

    if (options.onShow)
      options.onShow();
  }
  // Hide box
  function hideBox(speed) {
    if (!isVisible) return;
    if (options.onHideAttempt && !options.onHideAttempt()) return;
    isVisible = false;

    var onHide = function () {
      hide(boxContainer);
      var showHidden = false;
      if (options.returnHidden && hiddenBox) {
        _message_boxes[hiddenBox].showContainer();
        _message_box_shown = hiddenBox;
        showHidden = true;
      }
      if (!showHidden) {
        _message_box_shown = 0;
        hide(transparentBG);
        clearTimeout(_doc_block_timeout);
        if (_doc_blocked) {
          _doc_block_timeout = setTimeout(function() {
            _doc_blocked = false;
            triggerEvent(document, 'unblock');
          }, 50);
        }
      }
      if (options.onHide) options.onHide();
    }
    if (speed > 0)
      fadeOut(boxContainer, speed, onHide);
    else
      onHide();
  }

  var fadeToColor = function(color) {
    return function() {
      animate(this, {backgroundColor: color}, 200);
    }
  }
  if (boxCloseButton) {
    addEvent(boxCloseButton, 'mouseover', fadeToColor('#FFFFFF'));
    addEvent(boxCloseButton, 'mouseout', fadeToColor('#9DB7D4'));
    addEvent(boxCloseButton, 'click', hideBox);
  }
  if (boxFullPageLink) {
    addEvent(boxFullPageLink, 'mouseover', fadeToColor('#FFFFFF'));
    addEvent(boxFullPageLink, 'mouseout', fadeToColor('#9DB7D4'));
  }

  function onLoadError(text) {
    boxBody.innerHTML = 'Error: ' + text;
    removeButtons();
    addButton({label: getLang('box_close'), onClick: hideBox});
    refreshCoords();
    if (isFunction(options.onLoadError)) options.onLoadError(text);
  }

  var retBox = {
    guid: guid,
    // Show box
    show: function(speed) {
      showBox(speed); return this;
    },

    // Hide box
    hide: function(speed) {
      hideBox(speed); return this;
    },

    isVisible: function() {
      return isVisible;
    },

    // Insert html content into the box
    content: function(html) {
      boxBody.innerHTML = html;
      refreshCoords();
      return this;
    },

    // Load html content from URL
    loadContent: function(url, params, evaluate, loader_style, noloader) {
      // Show loader
      var st = loader_style ? loader_style : '';
      if (!noloader) boxBody.innerHTML = '<div class="box_loader" style="' + st + '"></div>';

      // Load remote html using get request
      if (typeof params != 'object') params = {};
      var self = this;
      Ajax.Send(url, params, {
       onSuccess: function(ajaxObj, responseText) {
        if (evaluate) {
          try {
           var result = eval('('+responseText+')');
           boxBody.innerHTML = result.html ? result.html : '';
           if (result.script)  window.execScript ? window.execScript(result.script) : eval.call(window, result.script);
          } catch (e) {return onLoadError(responseText);}
        } else {
          boxBody.innerHTML = responseText;
        }
        refreshCoords();
        if (isFunction(options.onLoad)) options.onLoad(responseText);
       },
       onFail: function(ajaxObj, responseText) {
        onLoadError('Request error occured.');
       }
      });

      return this;
    },

    // Add button
    addButton: function(options) {
      var btn = addButton(options);
      return (options.returnBtn) ? btn : this;
    },
    // Add
    addControlsText: function(text) {
      var el = addControlsText(text);
      return (options.returnBtn) ? el : this;
    },

    // Remove buttons
    removeButtons: function(options) {
      removeButtons();
      return this;
    },

    // Update box options
    setOptions: function(newOptions) {
      options = extend(options, newOptions);
      if ("bodyStyle" in newOptions) {
        var items = options.bodyStyle.split(';');
        for (var i = 0; i < items.length; ++i) {
          var name_value = items[i].split(':');
          if (name_value.length > 1 && name_value[0].length) {
            boxBody.style[trim(name_value[0])] = trim(name_value[1]);
            if (boxBody.style.setProperty) {
              boxBody.style.setProperty(trim(name_value[0]), trim(name_value[1]), '');
            }
          }
        }
      }
      if (options.fullPageLink && boxFullPageLink) {
        boxFullPageLink.href = options.fullPageLink;
      }
      refreshBox();
      refreshCoords();
      return this;
    },
    fixIE6: refreshBox,
    hideContainer: function() { isVisible = false; hide(boxContainer); },
    showContainer: function() { isVisible = true; show(boxContainer); },
    body: function() { return boxBody; }
  };
  _message_boxes[guid] = retBox;
  return retBox;
};
function getShownBox() {var b = _message_boxes[_message_box_shown]; return (b && b.isVisible)? b : false;}

// Extends MessageBox
function AlertBox(title, text, callback, options) {
  var aBox = new MessageBox({title: title});
  if (typeof options == 'object') aBox.setOptions(options);
  else options = {};
  aBox.removeButtons();
  if (options.boxType == 'CONFIRM') {
   aBox.addButton({label:  options.no || getLang('box_no'), style: 'button_no', onClick: aBox.hide}).addButton({label: options.yes || getLang('box_yes'), onClick: function(){
    if (isFunction(callback) && callback() === false) return;
    aBox.hide();
   }});
  } else {
    aBox.addButton({label: options.no || getLang('box_close'), onClick: isFunction(callback) ? function(){aBox.hide(); callback();} : aBox.hide});
  }
  return aBox.content(text);
}
function TabbedBox(curTab, tabs, options) {
  options.bodyStyle = 'padding:0;';
  var mb = options.onDone ? new AlertBox(options.title||'', '', options.onDone, extend(options, {boxType:'CONFIRM'})) : new MessageBox(options), body = mb.body(), cur = curTab, contents = {}, scripts = {}, contentBox, tabsBox, tabHeader, tabFooter, w, html = '<div class="mb_header">'+(options.header||'')+'</div><div class="mb_tab_header"><div class="mb_tabs"><div class="mb_tabs_list fl_l">', tmp = {}, curContent = '';
  options = extend({showOneTab:false, onTab:function(tab, loaded){}, tabLoaded:function(tab){}}, options);
  var noTab = !options.showOneTab && tabs.length <= 1;

  if (!noTab) {
    each(tabs, function(i,v){
      tmp['mb_tab_'+v[0]] = v;
      var cl = (curTab == v[0]) ? 'mb_tab_selected' : '';
      html += '<div class="mb_tab '+cl+'" id="mb_tab_'+v[0]+'"><div class="mb_tab1"><div class="mb_tab2">'+v[1]+'</div></div></div>';
      if(v[2] && curTab == v[0]) {
        mb.setOptions({title:v[2]});
      }
    });
  }

  function sh(o,m,c) { return noTab ? '' : '<div class="mb_shadow'+(c||'')+'" style="opacity:'+(o/100)+';filter:alpha(opacity='+o+');margin-top:'+m+'px;width:'+w+'px"></div>'; }
  function err(text) { contentBox.innerHTML = text; }

  w = getSize(body.parentNode.parentNode)[0] - 22;
  html += '</div><div class="fl_r mb_search">'+(options.search||'')+'</div><div class="clear"></div></div>'+sh(30,0)+sh(11,1)+sh(7,2)+sh(3,3) + '</div><div class="mb_tab_content" style="'+(options.tabStyle||'')+'"></div><div class="mb_tab_footer">'+ sh(3,-4)+sh(7,-3)+sh(11,-2)+sh(30,-1)+sh(80,0,' mb_shadow_last')+'</div>';
  mb.content(html);
  contentBox = geByClass('mb_tab_content', body)[0];
  tabHeader = geByClass('mb_tab_header', body)[0];
  tabFooter = geByClass('mb_tab_footer', body)[0];
  if (noTab) { hide(tabHeader); hide(tabFooter); }
  function es(s) { window.execScript ? window.execScript(s) : eval.call(window, s); }

  extend(mb, {
  switchTab: function(tab) {
    if(cur == tab && curContent == contents[tab]) return false;
    if(cur != tab) {
      cur = tab;
      each(tabs, function(i,v){
        if (cur == v[0]) {
          addClass(v['obj'], 'mb_tab_selected');
          if(v[2]) { mb.setOptions({title:v[2]}); }
        } else { removeClass(v['obj'], 'mb_tab_selected'); }
      });
    }
    contentBox.innerHTML = curContent = contents[tab];
    if (scripts[tab]) es(scripts[tab]);
    return true;
  },
  tabContent: function(tab, content) {
    if (tab === undefined) return contentBox.innerHTML;
    contents[tab] = content;
    this.switchTab(tab);
    return this;
  },
  tabLoadContent: function(tab, url, params, ev, st, noloader) {
    if(!noloader)contentBox.innerHTML = '<div class="box_loader" style="' + (st || '') + '"></div>';
    if (typeof params != 'object') params = {};
    Ajax.Send(url, params, {
      onSuccess: function(o, t) {
        if (ev) {
          try {
            var res = eval('('+t+')');
            contents[tab] = res.html || '';
            if (res.script) scripts[tab] = res.script;
          } catch (e) { return err(e.message); }
        } else { contents[tab] = t; }
        mb.switchTab(tab);
        if (isFunction(options.onLoad)) options.onLoad(t);
      },
      onFail: function(o, t) { err('Request error occured.'); }
    });

    return this;
  },
  loadTab: function(tab) {
    var res = options.onTab(tab, contents[tab] ? true : false);
    if(res !== false) this.switchTab(tab);
    options.tabLoaded(tab);
    return this;
  },
  curTab: function(){return cur;}
  });
  each(geByClass('mb_tab', body), function(i,v) {
    var tab = tmp[v.id];
    tmp[v.id]['obj'] = v;
    if(tab) addEvent(v, 'click', function() { mb.loadTab(tab[0]); });
  });
  return mb;
}

/* 3-state button */
function createButton(el, onClick, classPrefix, initOnHover) {
  el = ge(el);
  if (!el) return;
  if (initOnHover && el.btnInited) return;

  var p = el.parentNode;
  if (hasClass(p, 'button_blue') || hasClass(p, 'button_gray')) {
    if (isFunction(onClick))
      el.onclick = onClick.pbind(el);
    return;
  }

  if (classPrefix == undefined) classPrefix = 'button';

  var hover = false;
  addEvent(el, 'click mousedown mouseover mouseout', function(e) {
    if (hasClass(p, 'locked')) return;
    var bc = getXY(el), bs = [el.offsetWidth, el.offsetHeight];
    switch (e.type) {
    case 'click':
      if (!hover) return;
      el.className = classPrefix + '_hover';
      onClick(el);
    break;
    case 'mousedown':
      el.className = classPrefix + '_down';
    break;
    case 'mouseover':
      hover = true;
      el.className = classPrefix + '_hover';
    break;
    case 'mouseout':
      el.className = classPrefix;
      hover = false;
    break;
    }
  });
  if (initOnHover) {
    el.className = classPrefix + '_hover';
    hover = true;
  }
  el.btnInited = true;
}

function lockButton(el) {
  if (!el || el.tagName.toLowerCase() != 'button') return;
  var lock = ce('span', {className: 'button_lock'});
  el.parentNode.insertBefore(lock, el);
  el['old_width'] = el.style.width;
  el['old_height'] = el.style.height;
  var s = getSize(el.parentNode);
  setStyle(el, {width: s[0]-2, height: s[1]-2});
  if (browser.msie6 || browser.msie7) {el['old_html'] = el.innerHTML; el.innerHTML = '';}
  else el.style.textIndent = "-9999px";
}
function unlockButton(el) {
  var lock = geByClass('button_lock', el.parentNode, 'span')[0];
  if (!lock) return;
  el.parentNode.removeChild(lock);
  el.style.width = el['old_width'];
  el.style.height = el['old_height'];
  if (browser.msie6 || browser.msie7) el.innerHTML = el['old_html'];
  el.style.textIndent = '';
}

var langBox;
function changeLang() {
 if (!langBox) {
  langBox = new MessageBox({title: (getLang('select_language')), width: 480});
  langBox.addButton({label:  getLang('box_close'), onClick: function(){langBox.hide(200)}});
 }
 langBox.loadContent('lang.php', {act:'lang_dialog'}, true).show();
 return false;
}
function doChangeLang(lang_id, hash) {
 Ajax.Send('lang.php', {act:'change_lang',lang_id: lang_id, hash:hash}, function(){
   setCookie('remixlang', lang_id);
   location.reload(true);
 });
 return false;
}

function nameTip(obj) {
 if ((qArr[qCur]||[])[0] || obj.value.length || qd) {return;}
 show('qfriends');
 ge('qfriends').innerHTML = "<div style='border-top: 1px solid #C6D0D9; padding: 4px 18px; background-color: #FAFAFA;'>"+top_search_tip+"</div>";
};

(function(){
  var lastLength = 0;
  window.checkTextLength = function(max_len, val, warn, nobr, display) {
    if (lastLength==val.length) return;
    lastLength=val.length;
    var n_len = replaceChars(val, nobr).length;
    if (n_len > max_len - 100) {
      show(warn);
    } else {
      hide(warn);
    }
    if (n_len > max_len) {
      warn.innerHTML = getLang('text_exceeds_symbol_limit', n_len - max_len);
    } else if (n_len > max_len - 100) {
      warn.innerHTML = getLang('text_N_symbols_remain', max_len - n_len);
    } else {
      warn.innerHTML = '';
    }
  };

  window.replaceChars = function(text, nobr) {
    var res = "";
    for (var i = 0; i<text.length; i++) {
      var c = text.charCodeAt(i);
      switch(c) {
        case 0x26: res += "&amp;"; break;
        case 0x3C: res += "&lt;"; break;
        case 0x3E: res += "&gt;"; break;
        case 0x22: res += "&quot;"; break;
        case 0x0D: res += ""; break;
        case 0x0A: res += nobr?"\t":"<br>"; break;
        case 0x21: res += "&#33;"; break;
        case 0x27: res += "&#39;"; break;
        default:   res += ((c > 0x80 && c < 0xC0) || c > 0x500) ? "&#"+c+";" : text.charAt(i); break;
      }
    }
    return res;
  };
})();

var winBoxes = {};
function showBox(name, url, query, lnk, reload, params, files) {
  if (typeof lnk == 'object') {
    reload = lnk.reload;
    params = lnk.params;
    files = lnk.files;
    lnk = lnk.href;
  }
  if (lnk && window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }
  params = extend({title: getLang('box_loading')}, params);
  if (!winBoxes[name]) {
    winBoxes[name] = new MessageBox(params);
    reload = true;
    if (files) {
      for (var i in files) {
        if (/\.css/i.test(files[i])) {
          addCss(files[i]);
        } else if (/\.js/i.test(files[i])) {
          attachScript('script'+i, files[i]);
        }
      }
    }
  } else if (reload) {
    winBoxes[name].setOptions(params);
  }
  if (reload) {
    winBoxes[name].removeButtons();
    winBoxes[name].addButton({label: getLang('global_close'), onClick: winBoxes[name].hide});
    winBoxes[name].loadContent(url, query, true);
  }
  hide('qfriends');
  if (gSearch.on) gSearch.hide();
  winBoxes[name].show();
  return false;
}

function notaBene(el, color) {
  el = ge(el);
  el.focus();
  var oldBack = data(el, 'back');
  if(!oldBack) oldBack = data(el, 'back', getStyle(el, 'backgroundColor'));
  var colors = {'notice':'#FFFFE0', 'warning':'#FAEAEA'};
  setStyle(el, 'backgroundColor', colors[color] || color || colors['warning']);
  setTimeout(function(){
    animate(el, {backgroundColor: oldBack}, 300);
  }, 400);
}

function im_popup(peer_id) {
  if (window.event && (window.event.which == 2 || window.event.button == 1)) {
    return true;
  }

  var params = 'scrollbars=0,resizable=1,menubar=0,location=0,width=610,height=469,toolbar=0,status=0';
  if (!window.loc_host) {
    window.loc_host = location.host;
  }
  var dom = window.loc_host.toString().match(/[a-zA-Z]*\.[a-zA-Z]*$/)[0];

  document.domain = dom;

  var url = 'http://' + (/^cs\d*/.test(window.loc_host) ? window.loc_host : dom) + '/im.php?act=a_box&popup=1';
  var js = 'window.im.activate_tab(0);';
  if (peer_id) {
    url += '&sel=' + peer_id;
    js = 'window.im.add_peers(' + peer_id + ', ' + peer_id + ')';
  }

  url = 'javascript: try { ' + js + ' } catch(e) { document.location = "' + url + '"; void(0); }';

  window.im_popup_window = window.open(url, 'im', params);

  try {
    if (!browser.chrome && !browser.msie && !browser.mozilla && !browser.safari && window.im_popup_window.im) {
      window.im_already_box = new MessageBox({title: (window.im_already_shown_title || 'Мгновенные сообщения')});
      im_already_box.content(window.im_already_shown || 'Окно Мгновенных сообщений уже запущено, Вам достаточно просто перейти на него.');
      im_already_box.addButton({label: getLang('box_close'), onClick: im_already_box.hide});
      setTimeout("im_already_box.hide(400)", 2000);
      im_already_box.show();
    }
  } catch (e) {}

  if (!browser.msie) {
    window.im_popup_window.blur();
  }
  window.im_popup_window.focus();

  try {
    document.domain = window.loc_host;
  } catch (e) {}

  return false;
}

function reportAd(aid, box){
  window._lastReportBox = box.parentNode;
  showBox('reportAd', 'reports.php', {act:'a_report_ad_box', aid:aid}, false, true, {width:350}, ['js/lib/ui_controls.js', 'css/ui_controls.css']);
}

window.sbWidth = function() {
  if (!window._sbWidth) {
    var test = ce('div', {
      innerHTML: '<div style="height:200px;">O<br/>L<br/>O<br/>L<br/>O</div>'
    }, {
      overflowY: 'scroll',
      position: 'absolute',
      height: 100,
      width: 100
    });
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(test);
    window._sbWidth = test.offsetWidth - test.getElementsByTagName('div')[0].offsetWidth - 1;
    body.removeChild(test);
    delete test;
  }
  return window._sbWidth;
}

function linkButton(elem, handler) {
  elem = ge(elem);
  addEvent(elem, 'mouseover', function() { this.className = 'linkover'; });
  addEvent(elem, 'mouseout', function() { this.className = 'link'; });
  addEvent(elem, 'click', handler);
}

var video_js_attached = 0;
function showVideoBoxCommon(vars, elem, description, to_comments_text, add_text, add_hash, thumb, player_available, allow_html5, player_version) {
  if (window.PLAYER_JS_ADDED && window.swfobject != undefined){
    return showVideoBox(vars, elem, description, to_comments_text, add_text, add_hash, thumb, player_available, allow_html5, player_version);
  }
  if (!video_js_attached){
    attachScript('player_js', '/js/player.js?56');
    attachScript('lib/swfobject2.js', '/js/lib/swfobject2.js');
    video_js_attached = 1;
  }
  setTimeout(function() {
    showVideoBoxCommon(vars, elem, description, to_comments_text, add_text, add_hash, thumb, player_available, allow_html5, player_version);
  }, 50);
  return false;
}

var video_lang_vars = null;
var player_needed = '';
var video_player_flash_better = '';
var video_player_html5_msg = '';

function reportVideo(oid, vid) {
  showBox('reportVideo', 'reports.php', {act:'a_report_video_box', vid:vid, oid:oid}, false, true, {width:350}, ['js/lib/ui_controls.js', 'css/ui_controls.css']);
}
function goAway(lnk, prms) {
  if (/https?:\/\/([a-zA-Z0-9\-_\.]+\.)?(vk\.com|vkontakte\.ru)(\/|$)/i.test(lnk)) {
    if (prms.type && prms.type == '_blank') {
      window.open(lnk, '_blank');
    } else {
      document.location = lnk;
    }
    return false;
  }
  var no_warning = parseInt(getCookie('remixsettings_bits'));
  if (/https?:\/\/([a-zA-Z0-9\-_]+\.)(vk\.com|vkontakte\.ru)(\/|$)/i.test(location.toString()) || no_warning & 1) {
    window.open(base_domain + 'away.php?to=' + encodeURIComponent(lnk) + ((prms && prms.h !== undefined) ? '&h=' + prms.h : ''), '_blank');
    return false;
  }
  var params = extend({act: 'a_go', to: lnk}, prms || {});
  addCss('css/ui_controls.css');
  return showBox('awayBox', 'away.php', params, {reload: true, href: true});
}

jsDispatcher = {
  _deps: {
    'mentions': ['lib/ui_controls'],
    'inline_edit': ['lib/ui_controls']
  },
  _loaded: [],
  _loading: [],
  _queue: [],
  _checkQueue: function () {
    //debugLog('_checkQueue');
    var i, j, scripts, done, need_js;
    for (i = 0; i < this._queue.length; i++) {
      scripts = this._queue[i][0], cb = this._queue[i][1];
      done = true;
      for (j = 0; j < scripts.length; j++) {
        need_js = this._checkDeps(scripts[j]);
        if (need_js === null && !inArray(scripts[j], this._loaded)) {
          need_js = inArray(scripts[j], this._loading) ? false : scripts[j];
        }
        if (need_js) {
          this._attachScript(need_js);
        }
        if (need_js !== null) {
          done = false;
          break;
        }
      }
      if (done) {
        debugLog('calling cb()');
        setTimeout(cb, 0);
        this._queue.splice(i, 1);
      }
    }
  },
  _checkDeps: function (script) {
    debugLog('_checkDeps: ' + script);
    if (!script || !this._deps[script]) return null;
    var i, dep_script, dep;
    for (i = 0; i < this._deps[script].length; i++) {
      dep_script = this._deps[script][i];
      dep = this._checkDeps(dep_script);
      if (dep) return dep;
      if (!inArray(dep_script, this._loaded)) {
        return !inArray(dep_script, this._loading) ? dep_script : false;
      }
    }
    return null;
  },
  _attachScript: function (src) {
    debugLog('_attachScript: ' + src);
    this._loading.push(src);
    attachScript(src.replace(/[\/\.]+/g, '_'), 'js/' + src + '.js');
  },
  /* Public methods */
  include: function (js, cb) { // use include('mentions', function () {....});
    debugLog('include: ' + js);
    if (typeof js == 'string') js = js.split(',');
    this._queue.push([js, cb]);
    this._checkQueue();
  },
  triggerOnload: function(js, init) { // use triggerOnload('mentions');
    //debugLog('triggerOnload: ' + js);
    if (init) init();
    var pos = indexOf(this._loading, js);
    if (pos != -1) {
      this._loading.splice(pos, 1);
    }
    if (!inArray(js, this._loaded)) {
      this._loaded.push(js);
    }
    this._checkQueue();
  }
}

//load player
function operate() {
  loadPlayer('operate', arguments);
}

function operateWall() {
  loadPlayer('operateWall', arguments);
}

function loadPlayer(func, a) {
  window.player_onload = function() {
    window[func].apply(window, a);
    window.player_onload = null;
  }
  if (!window.PLAYER_JS_ADDED) {
    attachScript('swfobject_js', '/js/swfobject.js');
    attachScript('player_js', '/js/player.js?54');
    addCss('css/player.css');
  } else {
    player_onload();
  }
}

function showZeroZoneBox(key,bit,callback) { return false; }

function BaseTooltip(target, options) {
  var defaults = {
    width: 'auto',
    height: 30,
    style: '',
    contentTemplate: '<div class="tt_content">{text}</div>',
    params: [],
    className: 'base_tooltip',
    toUp: true,
    slide: true,
    align:'left',
    shift:[40,10,5,1,64],
    template:'<table class="tooltip_wrap" cellpadding="0" cellspacing="0"><tr><td colspan="3"><div class="tt_top_pointer"></div></td></tr><tr><td class="tt_left_shadow"></td><td>{content}</td><td class="tt_right_shadow"></td></tr><tr><td colspan="3"><div class="tt_bottom_shadow"></div><div class="tt_bottom_pointer"></div></td></tr></table>',
    onMouseOut: function() {data(target, 'over', false); setTimeout(function() {
    if (!data(target, 'over') && data(target, 'tooltip')) {
      data(target, 'tooltip').hide();
    }}, o.timeouts[2]);},
    onMouseOver: function () {data(target, 'over', true);}
  };
  this.options = extend(defaults, options);
  var w = parseInt(this.options.width), t = this;
  this.options.width = w > 0 ? w : defaults.width;
  this.content = this.options.contentTemplate;
  var o = this.options;
  each(o.params, function(i,v){
    t.content = t.content.replace('{'+i+'}', v||'');
  });

  var container = ce('div', {
      className: o.className,
      innerHTML: o.template.replace('{content}', this.content)
    }, {
      width: o.width,
      visibility: 'hidden',
      display: 'block'
  });
  this.container = container;
  this.height = false;
  this.bottomPointer = geByClass('tt_bottom_pointer', container)[0], this.topPointer = geByClass('tt_top_pointer', container)[0];
  setStyle(this.bottomPointer, 'marginLeft', o.shift[4]);
  setStyle(this.topPointer, 'marginLeft', o.shift[4]);
  document.body.appendChild(container);
  if (!isFunction(o.onInit) || o.onInit.call(this) !== false) {
    hide(geByClass('tt_thumb', container)[0]);
    this.height = getSize(container)[1];
    setStyle(container, {display: 'none', visibility: 'visible'});
  }

  this.show = function () {
    var t = this, o = this.options;
    if (this.options.onShow && this.options.onShow.apply(this) === false) return;
    if (!this.height) setTimeout(function(){t.show();}, o.timeouts[3]);
    var toRight = o.align=='right';
    var s = o.shift, tgt = (o.posTarget || target), tsize = getSize(tgt), tcoords = getXY(tgt), x = toRight ? tcoords[0] + tsize[0] + s[0] : tcoords[0] - s[0], y, starty;
    var sc = getScroll(), scrollTop = sc[1], scrollHeight = sc[3];
    if (!toRight && tsize[0] /2 < s[4] - s[0] + 5) x = tcoords[0] + parseInt(tsize[0] / 2) - s[4] - 5;
    var noUp = (tcoords[1] - scrollTop < this.height + s[1]), noDown = (scrollHeight + scrollTop - tcoords[1] - tsize[1] < this.height + s[1]);
    var toUp = o.toUp ? (!noUp || noDown) : (noDown && !noUp);
    if (!toUp) {
      addClass(container, 'base_tooltip_top');
      removeClass(container, 'base_tooltip_bottom');
      y = tcoords[1] + tsize[1] + s[3];
      starty = o.slide ? y + 15 : y;
    } else {
      addClass(container, 'base_tooltip_bottom');
      removeClass(container, 'base_tooltip_top');
      if (this.height) this.height = getSize(container)[1] || this.height;
      y = Math.max(tcoords[1] - this.height + s[2], 0);
      starty = o.slide ? y - 15 : y;
    }
    if (browser.msie6) { y -= scrollTop; starty -= scrollTop;}
    setStyle(container, {display: 'block', top: starty, left: x, opacity: 0});

    if (toRight) setStyle(container, {left: x - getSize(container)[0]});
    animate(container, {opacity: 1, top: y}, o.timeouts[4], function(){
      if (toUp && browser.msie) {setStyle(t.bottomPointer, 'opacity', 1);}
    });
  }
  if (isFunction(o.onMouseOver)) addEvent(container, 'mouseover', o.onMouseOver);
  if (isFunction(o.onMouseOut)) addEvent(container, 'mouseout', o.onMouseOut);

  this.hide = function () {
    if (this.options.onHide && this.options.onHide() === false) return;
    fadeOut(container, o.timeouts[5]);
  }
}

function SimpleTooltip(target, options) {
  return new BaseTooltip(target, extend({className: 'simple_tooltip', slide:false, align:'right', shift:[0,0,0,2,0], onMouseOver:null}, options));
}

function LikeTooltip(target, options) {
  return new BaseTooltip(target, extend({className: 'like_tooltip', shift:[0,10,5,1,15], contentTemplate:'<div class="tt_content"><a class="lite_cb" onclick="checkbox(this);return false;">{text}</a></div>', toUp:false}, options));
}

SimpleTooltip.timeouts = [50,50,50,300,200,100];

function showTT(anchor, func, url, params) {
  if (data(anchor, 'over')) return;
  if (typeof(params)=='string') params = {params:{text:params}};
  var query = params;
  if (query['posTarget']) {
    delete query['posTarget'];
  }
  params = extend({timeouts:func.timeouts?func.timeouts:[200,400,300,300,200,100]}, params);
  data(anchor, 'over', true);
  var tooltip = data(anchor, 'tooltip'), to = params.timeouts;
  if (!tooltip && data(anchor, 'inited')) return;
  data(anchor, 'inited', true);
  if (!tooltip) {
    var hideTO = function () {
      if (!data(anchor, 'over') && data(anchor, 'tooltip')) {
        data(anchor, 'tooltip').hide();
      }
    };
    addEvent(anchor, 'mouseout', function () {
      data(anchor, 'over', false);
       setTimeout(hideTO, to[2]);
    });
    var t = setTimeout(function () {
      var onDone = function (o, t) {
        if (!t) return;
        var res = o ? eval('('+t+')') : t;
        if (res.js) res.onInit = function(){try{eval(res.js); return ttToShow;}catch(e){debugLog(e);}};
        tooltip = new func(anchor, extend(params, res));
        data(anchor, 'tooltip', tooltip);
        if (data(anchor, 'over')) tooltip.show();
      };
      if (url) {
        Ajax.Post({url:url, query:query, onDone:onDone});
      } else {
        onDone(null, {});
      }
    }, to[0]);
    data(anchor, 'preview_timeout', t);
  } else {
    setTimeout(function () {
      if (!data(anchor, 'over')) return;
      if (!isVisible(tooltip.container)) tooltip.show();
    }, to[1]);
  }
}

function isChecked(el) {el = ge(el); return hasClass(el, 'on') ? 1 : ''; }
function checkbox(el, val) {if (val === undefined) { val = !isChecked(el); } if (val) { addClass(el, 'on'); } else { removeClass(el, 'on'); } }


// AL fix
nav = {go: function () {return true;}};
