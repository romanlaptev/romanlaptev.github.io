//======================= trim() polyfill (< IE8)

//https://cdn.polyfill.io/v3/url-builder/
/* global CreateMethodProperty, RequireObjectCoercible, ToString */
/*
// 21.1.3.27. String.prototype.trim ( )
CreateMethodProperty(String.prototype, 'trim', function trim() {
	// 1. Let O be ? RequireObjectCoercible(this value).
	var O = RequireObjectCoercible(this);
	// 2. Let S be ? ToString(O).
	var S = ToString(O);
	
	// 3. Let T be the String value that is a copy of S with both leading and trailing white space removed. 
	//The definition of white space is the union of WhiteSpace and LineTerminator. 
	//When determining whether a Unicode code point is in Unicode general category “Space_Separator” (“Zs”), 
	//code unit sequences are interpreted as UTF-16 encoded code point sequences as specified in 6.1.4.
	var T = String.prototype.replace.call(S, /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+|[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/g, '');
	// 4. Return T.
	return T;
});
*/

//https://qa-help.ru/questions/funkcziya-trim-ne-rabotaet-v-ie8
/*
    if(typeof String.prototype.trim !== 'function') {
     String.prototype.trim = function() {
     return this.replace(/^\s+|\s+$/g, ''); 
     };
    }
*/

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
/*
    if (!String.prototype.trim) {
     (function() {
     // Make sure we trim BOM and NBSP
     var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
     String.prototype.trim = function() {
     return this.replace(rtrim, '');
     };
     })();
    }
*/    
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}


//================================= textContent polyfill
if (document.documentElement.textContent === undefined) {
	Object.defineProperty(HTMLElement.prototype, "textContent", {
		get: function() {
			return this.innerText;
		},
		set: function(value) {
			this.innerText = value;
		}
	});
}

  
//================================= Element.classList
//https://developer.mozilla.org/ru/docs/Web/API/Element/classList
(function() {
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };

    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += ' '+ name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name) 
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus..
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
})();
