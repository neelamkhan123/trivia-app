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
})({"js/script.js":[function(require,module,exports) {
$(function () {
  // Smooth Scroll
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  }); // Try Agagin Button

  $('.try-again').click(function () {
    setTimeout(function () {
      location.reload();
    }, 800);
  }); // Reset localStorage

  $('.btn-go').click(function () {
    setTimeout(function () {
      location.reload();
    }, 800);
  }); // Select Settings

  $('.setting').each(function () {
    $(this).on('click', function () {
      // Choose Category
      if ($(this).hasClass('category')) {
        var current1 = this.textContent;
        var category = current1.toLowerCase().split(' ').join('_'); // Highlight Selected Setting

        $(this).addClass('btn-toggle');
        $(this).closest('div').find('button').not(this).removeClass('btn-toggle'); // Save to localStorage

        localStorage.setItem('cat', category);

        var _selectedCat = localStorage.getItem('cat');
      } // Choose Difficulty


      if ($(this).hasClass('difficulty')) {
        var current2 = this.textContent;
        var difficulty = current2.toLowerCase(); // Highlight Selected Setting

        $(this).addClass('btn-toggle');
        $(this).closest('div').find('button').not(this).removeClass('btn-toggle'); // Save to localStorage

        localStorage.setItem('diff', difficulty);

        var _selectedDiff = localStorage.getItem('diff');
      }
    });
  });
  var selectedCat = localStorage.getItem('cat');
  var selectedDiff = localStorage.getItem('diff'); // Question and Options Function

  function setQuestion(data, i, questionSelector, op1Selector, op2Selector, op3Selector, op4Selector) {
    var question = data[i].question;
    questionSelector.text(question);
    op1Selector.text(data[i].correctAnswer);
    op2Selector.text(data[i].incorrectAnswers[0]);
    op3Selector.text(data[i].incorrectAnswers[1]);
    op4Selector.text(data[i].incorrectAnswers[2]);
  } // Correct Answer Function


  var i = 0;

  function correctAnswer(option, correct, incorrect1, incorrect2, incorrect3, next) {
    option.each(function () {
      $(this).on('click', function () {
        correct.css({
          color: 'green',
          border: '4px solid green'
        });
        incorrect1.css({
          color: 'red',
          border: '4px solid red'
        });
        incorrect2.css({
          color: 'red',
          border: '4px solid red'
        });
        incorrect3.css({
          color: 'red',
          border: '4px solid red'
        });
        next.css('display', 'block');

        if (this.textContent === correct[0].textContent) {
          i++;
          $('.score').text(i);
          console.log(i);
          i >= 3 ? $('.emoji').text('😀') : $('.emoji').text('😢');
        }
      });
    });
  } // API Call: Questions w/ Answers


  function getJSON(category, difficulty) {
    $.get("https://the-trivia-api.com/api/questions?categories=".concat(category, "&limit=5&difficulty=").concat(difficulty), function (data) {
      console.log(data[0]); // Set Questions and Answers
      // Question 1

      setQuestion(data, 0, $('.question-one'), $('.q1-4'), $('.q1-2'), $('.q1-3'), $('.q1-1'));
      correctAnswer($('.options-1'), $('.q1-4'), $('.q1-2'), $('.q1-3'), $('.q1-1'), $('.next-1')); // Question 2

      setQuestion(data, 1, $('.question-two'), $('.q2-2'), $('.q2-1'), $('.q2-3'), $('.q2-4'));
      correctAnswer($('.options-2'), $('.q2-2'), $('.q2-1'), $('.q2-3'), $('.q2-1'), $('.next-2')); // Question 3

      setQuestion(data, 2, $('.question-three'), $('.q3-1'), $('.q3-4'), $('.q3-2'), $('.q3-3'));
      correctAnswer($('.options-3'), $('.q3-1'), $('.q3-4'), $('.q3-2'), $('.q3-3'), $('.next-3')); // Question 4

      setQuestion(data, 3, $('.question-four'), $('.q4-4'), $('.q4-3'), $('.q4-2'), $('.q4-1'));
      correctAnswer($('.options-4'), $('.q4-4'), $('.q4-3'), $('.q4-2'), $('.q4-1'), $('.next-4')); // Question 5

      setQuestion(data, 4, $('.question-five'), $('.q5-1'), $('.q5-4'), $('.q5-3'), $('.q5-2'));
      correctAnswer($('.options-5'), $('.q5-1'), $('.q5-4'), $('.q5-3'), $('.q5-2'), $('.next-5'));
    });
  }

  getJSON(selectedCat, selectedDiff);
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62132" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map