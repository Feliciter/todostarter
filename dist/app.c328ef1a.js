// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/scss/common.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../images/searchicon.png":[["searchicon.0694463b.png","src/images/searchicon.png"],"src/images/searchicon.png"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/js/javascript.js":[function(require,module,exports) {
var elSearchInput = document.getElementById("myInput");

if (typeof elSearchInput.addEventListener != "undefined") {
  elSearchInput.addEventListener("keyup", function (evt) {
    searchFunction();
  }, false);
} else if (typeof elSearchInput.attachEvent != "undefined") {
  elSearchInput.attachEvent("onkeyup", function (evt) {
    searchFunction();
  });
}

function searchFunction() {
  var input, filter, wrap, t, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  wrap = document.getElementById("wrap");
  card = wrap.getElementsByClassName("column");

  for (i = 0; i < card.length; i++) {
    t = card[i].getElementsByTagName("H3")[0];
    txtValue = t.textContent || t.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

statusForm.statusSelect.onchange = function () {
  var wrap, card;
  filter = this.value;
  wrap = document.getElementById("wrap");
  card = wrap.getElementsByClassName("column");

  if (filter === "all") {
    for (i = 0; i < card.length; i++) {
      t = card[i].getElementsByTagName("H4")[0];
      card[i].style.display = "";
    }
  } else for (i = 0; i < card.length; i++) {
    t = card[i].getElementsByTagName("H4")[0];
    txtValue = t.textContent || t.innerText;

    if (txtValue.indexOf(filter) == 0) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
};

priorForm.priorSelect.onchange = function () {
  var wrap, card;
  filter = this.value;
  wrap = document.getElementById("wrap");
  card = wrap.getElementsByClassName("column");

  if (filter === "all") {
    for (i = 0; i < card.length; i++) {
      t = card[i].getElementsByTagName("H5")[0];
      card[i].style.display = "";
    }
  } else for (i = 0; i < card.length; i++) {
    t = card[i].getElementsByTagName("H5")[0];
    txtValue = t.textContent || t.innerText;

    if (txtValue.indexOf(filter) == 0) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
};

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementById("btnCancel");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var elBtnSave = document.getElementById("btnSave");
elBtnSave.addEventListener("click", insertnewCard, false);

function insertnewCard() {
  var cardplace = document.getElementById("placenewcard");
  var formtitle = document.getElementById("form-title");
  var formtext = document.getElementById("form-text");
  var formsprior = document.getElementById("form-prior");

  if (formtitle.value == "") {
    alert("Title must be filled out");
    return false;
  }

  var htmltmplt = "\n    <div class=\"column\">\n          <div class=\"card\">\n            <h3>".concat(formtitle.value, "</h3>\n            <p>").concat(formtext.value, "</p>\n            <div>            \n              <div class=\"priorcard\" > \n                <H5>").concat(formsprior.value, "</H5>\n                <H4 class=\"hidestatus\">open</H4>\n              </div> \n  \n                <div class=\"dropdown\" >\n                  <button class=\"dropbtn\" >...</button>\n                  <div class=\"dropdown-content\">\n                     <a href=\"#\">done</a>\n                    <a href=\"#\">edit</a>\n                   <a href=\"#\">delete</a>\n                    </div>  \n                </div>\n              </div>  \n          </div>\n        </div>\n    \n    ");
  cardplace.insertAdjacentHTML("afterbegin", htmltmplt);
}

var dropbtn = document.getElementsByClassName("dropbtn");
var i;

for (i = 0; i < dropbtn.length; i++) {
  dropbtn[i].onmouseenter = function () {
    var div = this.parentElement;
    var listlinks = div.getElementsByClassName("dropdown-content");
    var linkas = listlinks[0].getElementsByTagName("a");
    var div = linkas[0];
    var divcsard = div.closest(".card");
    var t_status = divcsard.getElementsByTagName("H4")[0];
    var t_statusValue = t_status.textContent || t_status.innerText;
    var t_title = divcsard.getElementsByTagName("H3")[0];
    var t_text = divcsard.getElementsByTagName("p")[0];
    var t_prior = divcsard.getElementsByTagName("H5")[0];

    linkas[0].onclick = function () {
      {
        t_status.innerHTML = "done";
      }
    };

    linkas[1].onclick = function () {
      {
        var updateCard = function updateCard() {
          t_title.textContent = formtitle.value;
          t_text.textContent = formtext.value;
          t_prior.textContent = formsprior.options[formsprior.selectedIndex].text;
          modal.style.display = "none";
          elBtnSave_edit.removeEventListener("click", updateCard, false);
          elBtnSave.addEventListener("click", insertnewCard, false);
        };

        elBtnSave.removeEventListener("click", insertnewCard, false);
        var elBtnSave_edit = document.getElementById("btnSave");
        var formtitle = document.getElementById("form-title");
        formtitle.value = t_title.textContent;
        var formtext = document.getElementById("form-text");
        formtext.innerText = t_text.textContent;
        var formsprior = document.getElementById("form-prior");
        modal.style.display = "block";
        elBtnSave_edit.addEventListener("click", updateCard, false);
      }
    };

    linkas[2].onclick = function () {
      {
        div.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
      }
    };
  };
}

function cardEdit() {
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementById("btnCancel");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
},{}],"app.js":[function(require,module,exports) {
"use strict";

require("./src/scss/common.scss");

require("./src/js/javascript");
},{"./src/scss/common.scss":"src/scss/common.scss","./src/js/javascript":"src/js/javascript.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43335" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map