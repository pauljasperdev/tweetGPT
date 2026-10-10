(() => {
  var __create = Object.create;
  var __getProtoOf = Object.getPrototypeOf;
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __toESM = (mod, isNodeMode, target) => {
    target = mod != null ? __create(__getProtoOf(mod)) : {};
    const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => mod[key],
          enumerable: true
        });
    return to;
  };
  var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

  // node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS((exports) => {
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {},
      enqueueReplaceState: function() {},
      enqueueSetState: function() {}
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null)
        throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy;
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {}
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: refProp !== undefined ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return typeof element === "object" && element !== null && element.key != null ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch (typeof thenable.status === "string" ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
            thenable.status === "pending" && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          }, function(error) {
            thenable.status === "pending" && (thenable.status = "rejected", thenable.reason = error);
          })), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if (type === "undefined" || type === "boolean")
        children = null;
      var invokeCallback = false;
      if (children === null)
        invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = nameSoFar === "" ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", invokeCallback != null && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : callback != null && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (callback.key == null || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = nameSoFar === "" ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0;i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (i = getIteratorFn(children), typeof i === "function")
        for (children = i.call(children), i = 0;!(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (type === "object") {
        if (typeof children.then === "function")
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
        array = String(children);
        throw Error("Objects are not valid as a React child (found: " + (array === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (children == null)
        return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (payload._status === -1) {
        var ctor = payload._result, thenable = ctor();
        thenable.then(function(moduleObject) {
          if (payload._status === 0 || payload._status === -1)
            payload._status = 1, payload._result = moduleObject, thenable.status === undefined && (thenable.status = "fulfilled", thenable.value = moduleObject);
        }, function(error) {
          if (payload._status === 0 || payload._status === -1)
            payload._status = 2, payload._result = error, thenable.status === undefined && (thenable.status = "rejected", thenable.reason = error);
        });
        payload._status === -1 && (payload._status = 0, payload._result = thenable);
      }
      if (payload._status === 1)
        return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    function startTransition(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = prevTransition !== null ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    }
    function addTransitionType(type) {
      var transition = ReactSharedInternals.T;
      if (transition !== null) {
        var transitionTypes = transition.types;
        transitionTypes === null ? transition.types = [type] : transitionTypes.indexOf(type) === -1 && transitionTypes.push(type);
      } else
        startTransition(addTransitionType.bind(null, type));
    }
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports.addTransitionType = addTransitionType;
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (element === null || element === undefined)
        throw Error("The argument must be a React element, but you passed " + element + ".");
      var props = assign({}, element.props), key = element.key;
      if (config != null)
        for (propName in config.key !== undefined && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || propName === "key" || propName === "__self" || propName === "__source" || propName === "ref" && config.ref === undefined || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (propName === 1)
        props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0;i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (config != null)
        for (propName in config.key !== undefined && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "__self" && propName !== "__source" && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1)
        props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0;i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          props[propName] === undefined && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: compare === undefined ? null : compare
      };
    };
    exports.startTransition = startTransition;
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {};
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.3.0";
  });

  // node_modules/react/index.js
  var require_react = __commonJS((exports, module) => {
    if (true) {
      module.exports = require_react_production();
    } else {}
  });

  // node_modules/scheduler/cjs/scheduler.production.js
  var require_scheduler_production = __commonJS((exports) => {
    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      a:
        for (;0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else
            break a;
        }
    }
    function peek(heap) {
      return heap.length === 0 ? null : heap[0];
    }
    function pop(heap) {
      if (heap.length === 0)
        return null;
      var first = heap[0], last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        a:
          for (var index = 0, length = heap.length, halfLength = length >>> 1;index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else
              break a;
          }
      }
      return first;
    }
    function compare(a, b) {
      var diff = a.sortIndex - b.sortIndex;
      return diff !== 0 ? diff : a.id - b.id;
    }
    exports.unstable_now = undefined;
    if (typeof performance === "object" && typeof performance.now === "function") {
      localPerformance = performance;
      exports.unstable_now = function() {
        return localPerformance.now();
      };
    } else {
      localDate = Date, initialTime = localDate.now();
      exports.unstable_now = function() {
        return localDate.now() - initialTime;
      };
    }
    var localPerformance;
    var localDate;
    var initialTime;
    var taskQueue = [];
    var timerQueue = [];
    var taskIdCounter = 1;
    var currentTask = null;
    var currentPriorityLevel = 3;
    var isPerformingWork = false;
    var isHostCallbackScheduled = false;
    var isHostTimeoutScheduled = false;
    var needsPaint = false;
    var localSetTimeout = typeof setTimeout === "function" ? setTimeout : null;
    var localClearTimeout = typeof clearTimeout === "function" ? clearTimeout : null;
    var localSetImmediate = typeof setImmediate !== "undefined" ? setImmediate : null;
    function advanceTimers(currentTime) {
      for (var timer = peek(timerQueue);timer !== null; ) {
        if (timer.callback === null)
          pop(timerQueue);
        else if (timer.startTime <= currentTime)
          pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
        else
          break;
        timer = peek(timerQueue);
      }
    }
    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);
      if (!isHostCallbackScheduled)
        if (peek(taskQueue) !== null)
          isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
        else {
          var firstTimer = peek(timerQueue);
          firstTimer !== null && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    var isMessageLoopRunning = false;
    var taskTimeoutID = -1;
    var frameInterval = 5;
    var startTime = -1;
    function shouldYieldToHost() {
      return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
    }
    function performWorkUntilDeadline() {
      needsPaint = false;
      if (isMessageLoopRunning) {
        var currentTime = exports.unstable_now();
        startTime = currentTime;
        var hasMoreWork = true;
        try {
          a: {
            isHostCallbackScheduled = false;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
              b: {
                advanceTimers(currentTime);
                for (currentTask = peek(taskQueue);currentTask !== null && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                  var callback = currentTask.callback;
                  if (typeof callback === "function") {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var continuationCallback = callback(currentTask.expirationTime <= currentTime);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === "function") {
                      currentTask.callback = continuationCallback;
                      advanceTimers(currentTime);
                      hasMoreWork = true;
                      break b;
                    }
                    currentTask === peek(taskQueue) && pop(taskQueue);
                    advanceTimers(currentTime);
                  } else
                    pop(taskQueue);
                  currentTask = peek(taskQueue);
                }
                if (currentTask !== null)
                  hasMoreWork = true;
                else {
                  var firstTimer = peek(timerQueue);
                  firstTimer !== null && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                  hasMoreWork = false;
                }
              }
              break a;
            } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
            }
            hasMoreWork = undefined;
          }
        } finally {
          hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
        }
      }
    }
    var schedulePerformWorkUntilDeadline;
    if (typeof localSetImmediate === "function")
      schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      };
    else if (typeof MessageChannel !== "undefined") {
      channel = new MessageChannel, port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
      schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      };
    } else
      schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
    var channel;
    var port;
    function requestHostTimeout(callback, ms) {
      taskTimeoutID = localSetTimeout(function() {
        callback(exports.unstable_now());
      }, ms);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
      task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
      0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1000 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          var priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_requestPaint = function() {
      needsPaint = true;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      typeof options === "object" && options !== null ? (options = options.delay, options = typeof options === "number" && 0 < options ? currentTime + options : currentTime) : options = currentTime;
      switch (priorityLevel) {
        case 1:
          var timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1e4;
          break;
        default:
          timeout = 5000;
      }
      timeout = options + timeout;
      priorityLevel = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime: options,
        expirationTime: timeout,
        sortIndex: -1
      };
      options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), peek(taskQueue) === null && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
      return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function() {
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    };
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS((exports, module) => {
    if (true) {
      module.exports = require_scheduler_production();
    } else {}
  });

  // node_modules/react-dom/cjs/react-dom.production.js
  var require_react_dom_production = __commonJS((exports) => {
    var React = require_react();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2;i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function noop() {}
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error(formatProdErrorMessage(522));
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    };
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
    var REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && arguments[3] !== undefined ? arguments[3] : null;
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: key == null ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function getCrossOriginStringAs(as, input) {
      if (as === "font")
        return "";
      if (typeof input === "string")
        return input === "use-credentials" ? input : "";
    }
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.browser = function(reason) {
      return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
    };
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && arguments[2] !== undefined ? arguments[2] : null;
      if (!container || container.nodeType !== 1 && container.nodeType !== 9 && container.nodeType !== 11)
        throw Error(formatProdErrorMessage(299));
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn)
          return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
      }
    };
    exports.preconnect = function(href, options) {
      typeof href === "string" && (options ? (options = options.crossOrigin, options = typeof options === "string" ? options === "use-credentials" ? options : "" : undefined) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      typeof href === "string" && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      if (typeof href === "string" && options && typeof options.as === "string") {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = typeof options.integrity === "string" ? options.integrity : undefined, fetchPriority = typeof options.fetchPriority === "string" ? options.fetchPriority : undefined;
        as === "style" ? Internals.d.S(href, typeof options.precedence === "string" ? options.precedence : undefined, {
          crossOrigin,
          integrity,
          fetchPriority
        }) : as === "script" && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined
        });
      }
    };
    exports.preinitModule = function(href, options) {
      if (typeof href === "string")
        if (typeof options === "object" && options !== null) {
          if (options.as == null || options.as === "script") {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.M(href, {
              crossOrigin,
              integrity: typeof options.integrity === "string" ? options.integrity : undefined,
              nonce: typeof options.nonce === "string" ? options.nonce : undefined,
              fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined
            });
          }
        } else
          options == null && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      if (typeof href === "string" && typeof options === "object" && options !== null && typeof options.as === "string") {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
        Internals.d.L(href, as, {
          crossOrigin,
          integrity: typeof options.integrity === "string" ? options.integrity : undefined,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined,
          type: typeof options.type === "string" ? options.type : undefined,
          fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined,
          referrerPolicy: typeof options.referrerPolicy === "string" ? options.referrerPolicy : undefined,
          imageSrcSet: typeof options.imageSrcSet === "string" ? options.imageSrcSet : undefined,
          imageSizes: typeof options.imageSizes === "string" ? options.imageSizes : undefined,
          media: typeof options.media === "string" ? options.media : undefined
        });
      }
    };
    exports.preloadModule = function(href, options) {
      if (typeof href === "string")
        if (options) {
          var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
          Internals.d.m(href, {
            as: typeof options.as === "string" && options.as !== "script" ? options.as : undefined,
            crossOrigin,
            integrity: typeof options.integrity === "string" ? options.integrity : undefined,
            nonce: typeof options.nonce === "string" ? options.nonce : undefined,
            fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined
          });
        } else
          Internals.d.m(href);
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return ReactSharedInternals.H.useHostTransitionStatus();
    };
    exports.version = "19.3.0";
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS((exports, module) => {
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {}
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production();
    } else {}
  });

  // node_modules/react-dom/cjs/react-dom-client.production.js
  var require_react_dom_client_production = __commonJS((exports) => {
    var Scheduler = require_scheduler();
    var React = require_react();
    var ReactDOM = require_react_dom();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2;i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function isValidContainer(node) {
      return !(!node || node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11);
    }
    function getNearestMountedFiber(fiber) {
      for (var node = fiber, nextNode = node;nextNode && !nextNode.alternate; )
        node = nextNode, (node.flags & 4098) !== 0 && (fiber = node.return), nextNode = node.return;
      for (;node.return; )
        node = node.return;
      return node.tag === 3 ? fiber : null;
    }
    function getSuspenseInstanceFromFiber(fiber) {
      if (fiber.tag === 13) {
        var suspenseState = fiber.memoizedState;
        suspenseState === null && (fiber = fiber.alternate, fiber !== null && (suspenseState = fiber.memoizedState));
        if (suspenseState !== null)
          return suspenseState.dehydrated;
      }
      return null;
    }
    function getActivityInstanceFromFiber(fiber) {
      if (fiber.tag === 31) {
        var activityState = fiber.memoizedState;
        activityState === null && (fiber = fiber.alternate, fiber !== null && (activityState = fiber.memoizedState));
        if (activityState !== null)
          return activityState.dehydrated;
      }
      return null;
    }
    function assertIsMounted(fiber) {
      if (getNearestMountedFiber(fiber) !== fiber)
        throw Error(formatProdErrorMessage(188));
    }
    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        alternate = getNearestMountedFiber(fiber);
        if (alternate === null)
          throw Error(formatProdErrorMessage(188));
        return alternate !== fiber ? null : fiber;
      }
      for (var a = fiber, b = alternate;; ) {
        var parentA = a.return;
        if (parentA === null)
          break;
        var parentB = parentA.alternate;
        if (parentB === null) {
          b = parentA.return;
          if (b !== null) {
            a = b;
            continue;
          }
          break;
        }
        if (parentA.child === parentB.child) {
          for (parentB = parentA.child;parentB; ) {
            if (parentB === a)
              return assertIsMounted(parentA), fiber;
            if (parentB === b)
              return assertIsMounted(parentA), alternate;
            parentB = parentB.sibling;
          }
          throw Error(formatProdErrorMessage(188));
        }
        if (a.return !== b.return)
          a = parentA, b = parentB;
        else {
          for (var didFindChild = false, child$0 = parentA.child;child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentA;
              b = parentB;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentA;
              a = parentB;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) {
            for (child$0 = parentB.child;child$0; ) {
              if (child$0 === a) {
                didFindChild = true;
                a = parentB;
                b = parentA;
                break;
              }
              if (child$0 === b) {
                didFindChild = true;
                b = parentB;
                a = parentA;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild)
              throw Error(formatProdErrorMessage(189));
          }
        }
        if (a.alternate !== b)
          throw Error(formatProdErrorMessage(190));
      }
      if (a.tag !== 3)
        throw Error(formatProdErrorMessage(188));
      return a.stateNode.current === a ? fiber : alternate;
    }
    function findCurrentHostFiberImpl(node) {
      var tag = node.tag;
      if (tag === 5 || tag === 26 || tag === 27 || tag === 6)
        return node;
      for (node = node.child;node !== null; ) {
        tag = findCurrentHostFiberImpl(node);
        if (tag !== null)
          return tag;
        node = node.sibling;
      }
      return null;
    }
    function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
      for (;child !== null; ) {
        if ((child.tag === 5 || child.tag === 27 || child.tag === 6) && fn(child, a, b, c) || (child.tag !== 22 || child.memoizedState === null) && (searchWithinHosts || child.tag !== 5 && child.tag !== 27) && traverseVisibleInstancesAndTextInstances(child.child, searchWithinHosts, fn, a, b, c))
          return true;
        child = child.sibling;
      }
      return false;
    }
    function getFragmentParentInstanceOrContainerFiber(fiber) {
      for (fiber = fiber.return;fiber !== null; ) {
        if (fiber.tag === 3 || fiber.tag === 5 || fiber.tag === 27)
          return fiber;
        fiber = fiber.return;
      }
      return null;
    }
    function fiberIsPortaledIntoHost(fiber) {
      var foundPortalParent = false;
      for (fiber = fiber.return;fiber !== null; ) {
        fiber.tag === 4 && (foundPortalParent = true);
        if (fiber.tag === 3 || fiber.tag === 5 || fiber.tag === 27)
          break;
        fiber = fiber.return;
      }
      return foundPortalParent;
    }
    function getFragmentInstanceOrTextInstanceSiblings(fiber) {
      var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
      if (parentHostFiber === null)
        return result;
      findFragmentInstanceOrTextInstanceSiblings(result, fiber, parentHostFiber.child, { foundSelf: false });
      return result;
    }
    function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
      for (;child !== null; ) {
        if (child === self)
          state.foundSelf = true;
        else if (child.tag === 5 || child.tag === 27 || child.tag === 6) {
          if (state.foundSelf)
            return result[1] = child, true;
          result[0] = child;
        } else if ((child.tag !== 22 || child.memoizedState === null) && findFragmentInstanceOrTextInstanceSiblings(result, self, child.child, state))
          return true;
        child = child.sibling;
      }
      return false;
    }
    function getInstanceFromHostFiber(fiber) {
      switch (fiber.tag) {
        case 5:
        case 27:
        case 6:
          return fiber.stateNode;
        case 3:
          return fiber.stateNode.containerInfo;
        default:
          throw Error(formatProdErrorMessage(559));
      }
    }
    var searchTarget = null;
    var searchBoundary = null;
    function isFiberPrecedingCheck(child, target, boundary) {
      return child === boundary ? true : child === target ? (searchTarget = child, true) : false;
    }
    function isFiberFollowingCheck(child, target, boundary) {
      return child === boundary ? (searchBoundary = child, false) : child === target ? (searchBoundary !== null && (searchTarget = child), true) : false;
    }
    function getParentForFragmentAncestors(inst) {
      if (inst === null)
        return null;
      do
        inst = inst === null ? null : inst.return;
      while (inst && inst.tag !== 5 && inst.tag !== 27 && inst.tag !== 3);
      return inst ? inst : null;
    }
    function getLowestCommonAncestor(instA, instB, getParent2) {
      for (var depthA = 0, tempA = instA;tempA; tempA = getParent2(tempA))
        depthA++;
      tempA = 0;
      for (var tempB = instB;tempB; tempB = getParent2(tempB))
        tempA++;
      for (;0 < depthA - tempA; )
        instA = getParent2(instA), depthA--;
      for (;0 < tempA - depthA; )
        instB = getParent2(instB), tempA--;
      for (;depthA--; ) {
        if (instA === instB || instB !== null && instA === instB.alternate)
          return instA;
        instA = getParent2(instA);
        instB = getParent2(instB);
      }
      return null;
    }
    var assign = Object.assign;
    var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
    Symbol.for("react.tracing_marker");
    var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
    var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
    var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
        case REACT_VIEW_TRANSITION_TYPE:
          return "ViewTransition";
      }
      if (typeof type === "object")
        switch (type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    var isArrayImpl = Array.isArray;
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    };
    var valueStack = [];
    var index = -1;
    function createCursor(defaultValue) {
      return { current: defaultValue };
    }
    function pop(cursor) {
      0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
    }
    function push(cursor, value) {
      index++;
      valueStack[index] = cursor.current;
      cursor.current = value;
    }
    var contextStackCursor = createCursor(null);
    var contextFiberStackCursor = createCursor(null);
    var rootInstanceStackCursor = createCursor(null);
    var hostTransitionProviderCursor = createCursor(null);
    function pushHostContainer(fiber, nextRootInstance) {
      push(rootInstanceStackCursor, nextRootInstance);
      push(contextFiberStackCursor, fiber);
      push(contextStackCursor, null);
      switch (nextRootInstance.nodeType) {
        case 9:
        case 11:
          fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
          break;
        default:
          if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
            nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
          else
            switch (fiber) {
              case "svg":
                fiber = 1;
                break;
              case "math":
                fiber = 2;
                break;
              default:
                fiber = 0;
            }
      }
      pop(contextStackCursor);
      push(contextStackCursor, fiber);
    }
    function popHostContainer() {
      pop(contextStackCursor);
      pop(contextFiberStackCursor);
      pop(rootInstanceStackCursor);
    }
    function pushHostContext(fiber) {
      var stateHook = fiber.memoizedState;
      stateHook !== null && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
      stateHook = contextStackCursor.current;
      var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
      stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
    }
    function popHostContext(fiber) {
      contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
      hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
    }
    var prefix;
    var suffix;
    function describeBuiltInComponentFrame(name) {
      if (prefix === undefined)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry)
        return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$1) {
                    control = x$1;
                  }
                  Fake = false;
                  try {
                    var prevProps = Object.getOwnPropertyDescriptor(fn.prototype, "props");
                    Object.defineProperty(fn.prototype, "props", {
                      configurable: true,
                      set: function() {
                        throw Error();
                      }
                    });
                    Fake = true;
                    new fn;
                  } finally {
                    Fake && (prevProps !== undefined ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                  }
                }
              } else {
                try {
                  throw Error();
                } catch (x$2) {
                  control = x$2;
                }
                (Fake = fn()) && typeof Fake.catch === "function" && Fake.catch(function() {});
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string")
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split(`
`), controlLines = controlStack.split(`
`);
          for (namePropDescriptor = RunInRootFrame = 0;RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (;namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes("DetermineComponentFrameRoot"); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1;1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (;1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (RunInRootFrame !== 1 || namePropDescriptor !== 1) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame = `
` + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                    return frame;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeFiber(fiber, childFiber) {
      switch (fiber.tag) {
        case 26:
        case 27:
        case 5:
          return describeBuiltInComponentFrame(fiber.type);
        case 16:
          return describeBuiltInComponentFrame("Lazy");
        case 13:
          return fiber.child !== childFiber && childFiber !== null ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
        case 19:
          return describeBuiltInComponentFrame("SuspenseList");
        case 0:
        case 15:
          return describeNativeComponentFrame(fiber.type, false);
        case 11:
          return describeNativeComponentFrame(fiber.type.render, false);
        case 1:
          return describeNativeComponentFrame(fiber.type, true);
        case 31:
          return describeBuiltInComponentFrame("Activity");
        case 30:
          return describeBuiltInComponentFrame("ViewTransition");
        default:
          return "";
      }
    }
    function getStackByFiberInDevAndProd(workInProgress2) {
      try {
        var info = "", previous = null;
        do
          info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
        while (workInProgress2);
        return info;
      } catch (x) {
        return `
Error generating stack: ` + x.message + `
` + x.stack;
      }
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
    var cancelCallback$1 = Scheduler.unstable_cancelCallback;
    var shouldYield = Scheduler.unstable_shouldYield;
    var requestPaint = Scheduler.unstable_requestPaint;
    var now = Scheduler.unstable_now;
    var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
    var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
    var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
    var NormalPriority$1 = Scheduler.unstable_NormalPriority;
    var LowPriority = Scheduler.unstable_LowPriority;
    var IdlePriority = Scheduler.unstable_IdlePriority;
    var log$1 = Scheduler.log;
    var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
    var rendererID = null;
    var injectedHook = null;
    function setIsStrictModeForDevtools(newIsStrictMode) {
      typeof log$1 === "function" && unstable_setDisableYieldValue(newIsStrictMode);
      if (injectedHook && typeof injectedHook.setStrictMode === "function")
        try {
          injectedHook.setStrictMode(rendererID, newIsStrictMode);
        } catch (err) {}
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
    var log = Math.log;
    var LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return x === 0 ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    var nextTransitionUpdateLane = 256;
    var nextTransitionDeferredLane = 262144;
    var nextRetryLane = 4194304;
    function getHighestPriorityLanes(lanes) {
      var pendingSyncLanes = lanes & 42;
      if (pendingSyncLanes !== 0)
        return pendingSyncLanes;
      switch (lanes & -lanes) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return lanes & -lanes;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return lanes & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return lanes & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return lanes;
      }
    }
    function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
      var pendingLanes = root2.pendingLanes;
      if (pendingLanes === 0)
        return 0;
      var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
      root2 = root2.warmLanes;
      var nonIdlePendingLanes = pendingLanes & 134217727;
      nonIdlePendingLanes !== 0 ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, pendingLanes !== 0 ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, pingedLanes !== 0 ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, rootHasPendingCommit !== 0 && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, nonIdlePendingLanes !== 0 ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : pingedLanes !== 0 ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, rootHasPendingCommit !== 0 && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
      return nextLanes === 0 ? 0 : wipLanes !== 0 && wipLanes !== nextLanes && (wipLanes & suspendedLanes) === 0 && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || suspendedLanes === 32 && (rootHasPendingCommit & 4194048) !== 0) ? wipLanes : nextLanes;
    }
    function checkIfRootIsPrerendering(root2, renderLanes2) {
      return (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2) === 0;
    }
    function getEntangledLanes(root2, renderLanes2) {
      (renderLanes2 & 8) !== 0 && (renderLanes2 |= renderLanes2 & 32);
      var allEntangledLanes = root2.entangledLanes;
      if (allEntangledLanes !== 0)
        for (root2 = root2.entanglements, allEntangledLanes &= renderLanes2;0 < allEntangledLanes; ) {
          var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
          renderLanes2 |= root2[index$4];
          allEntangledLanes &= ~lane;
        }
      return renderLanes2;
    }
    function computeExpirationTime(lane, currentTime) {
      switch (lane) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return currentTime + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return currentTime + 5000;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function claimNextRetryLane() {
      var lane = nextRetryLane;
      nextRetryLane <<= 1;
      (nextRetryLane & 62914560) === 0 && (nextRetryLane = 4194304);
      return lane;
    }
    function createLaneMap(initial) {
      for (var laneMap = [], i = 0;31 > i; i++)
        laneMap.push(initial);
      return laneMap;
    }
    function markRootUpdated$1(root2, updateLane) {
      root2.pendingLanes |= updateLane;
      updateLane !== 268435456 && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
    }
    function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
      var previouslyPendingLanes = root2.pendingLanes;
      root2.pendingLanes = remainingLanes;
      root2.suspendedLanes = 0;
      root2.pingedLanes = 0;
      root2.warmLanes = 0;
      root2.expiredLanes &= remainingLanes;
      root2.entangledLanes &= remainingLanes;
      root2.errorRecoveryDisabledLanes &= remainingLanes;
      root2.shellSuspendCounter = 0;
      var { entanglements, expirationTimes, hiddenUpdates } = root2;
      for (remainingLanes = previouslyPendingLanes & ~remainingLanes;0 < remainingLanes; ) {
        var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
        entanglements[index$7] = 0;
        expirationTimes[index$7] = -1;
        var hiddenUpdatesForLane = hiddenUpdates[index$7];
        if (hiddenUpdatesForLane !== null)
          for (hiddenUpdates[index$7] = null, index$7 = 0;index$7 < hiddenUpdatesForLane.length; index$7++) {
            var update = hiddenUpdatesForLane[index$7];
            update !== null && (update.lane &= -536870913);
          }
        remainingLanes &= ~lane;
      }
      spawnedLane !== 0 && markSpawnedDeferredLane(root2, spawnedLane, 0);
      suspendedRetryLanes !== 0 && updatedLanes === 0 && root2.tag !== 0 && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
    }
    function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
      root2.pendingLanes |= spawnedLane;
      root2.suspendedLanes &= ~spawnedLane;
      var spawnedLaneIndex = 31 - clz32(spawnedLane);
      root2.entangledLanes |= spawnedLane;
      root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
    }
    function markRootEntangled(root2, entangledLanes) {
      var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
      for (root2 = root2.entanglements;rootEntangledLanes; ) {
        var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
        lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
        rootEntangledLanes &= ~lane;
      }
    }
    function getBumpedLaneForHydration(root2, renderLanes2) {
      var renderLane = renderLanes2 & -renderLanes2;
      renderLane = (renderLane & 42) !== 0 ? 1 : getBumpedLaneForHydrationByLane(renderLane);
      return (renderLane & (root2.suspendedLanes | renderLanes2)) !== 0 ? 0 : renderLane;
    }
    function getBumpedLaneForHydrationByLane(lane) {
      switch (lane) {
        case 2:
          lane = 1;
          break;
        case 8:
          lane = 4;
          break;
        case 32:
          lane = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          lane = 128;
          break;
        case 268435456:
          lane = 134217728;
          break;
        default:
          lane = 0;
      }
      return lane;
    }
    function lanesToEventPriority(lanes) {
      lanes &= -lanes;
      return 2 < lanes ? 8 < lanes ? (lanes & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function resolveUpdatePriority() {
      var updatePriority = ReactDOMSharedInternals.p;
      if (updatePriority !== 0)
        return updatePriority;
      updatePriority = window.event;
      return updatePriority === undefined ? 32 : getEventPriority(updatePriority.type);
    }
    function runWithPriority(priority, fn) {
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        return ReactDOMSharedInternals.p = priority, fn();
      } finally {
        ReactDOMSharedInternals.p = previousPriority;
      }
    }
    var randomKey = Math.random().toString(36).slice(2);
    var internalInstanceKey = "__reactFiber$" + randomKey;
    var internalPropsKey = "__reactProps$" + randomKey;
    var internalContainerInstanceKey = "__reactContainer$" + randomKey;
    var internalEventHandlersKey = "__reactEvents$" + randomKey;
    var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
    var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
    var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
    var internalHoistableMarker = "__reactMarker$" + randomKey;
    var internalLoadPendingKey = "__reactLoad$" + randomKey;
    function detachDeletedInstance(node) {
      delete node[internalInstanceKey];
      delete node[internalPropsKey];
      delete node[internalEventHandlerListenersKey];
      delete node[internalEventHandlesSetKey];
    }
    function getClosestInstanceFromNode(targetNode) {
      var targetInst;
      if (targetInst = targetNode[internalInstanceKey])
        return targetInst;
      for (var parentNode = targetNode.parentNode;parentNode; ) {
        if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
          parentNode = targetInst.alternate;
          if (targetInst.child !== null || parentNode !== null && parentNode.child !== null)
            for (targetNode = getParentHydrationBoundary(targetNode);targetNode !== null; ) {
              if (parentNode = targetNode[internalInstanceKey])
                return parentNode;
              targetNode = getParentHydrationBoundary(targetNode);
            }
          return targetInst;
        }
        targetNode = parentNode;
        parentNode = targetNode.parentNode;
      }
      return null;
    }
    function getInstanceFromNode(node) {
      if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
        var tag = node.tag;
        if (tag === 5 || tag === 6 || tag === 13 || tag === 31 || tag === 26 || tag === 27 || tag === 3)
          return node;
      }
      return null;
    }
    function getNodeFromInstance(inst) {
      var tag = inst.tag;
      if (tag === 5 || tag === 26 || tag === 27 || tag === 6)
        return inst.stateNode;
      throw Error(formatProdErrorMessage(33));
    }
    function getResourcesFromRoot(root2) {
      var resources = root2[internalRootNodeResourcesKey];
      resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: new Map, hoistableScripts: new Map });
      return resources;
    }
    function markNodeAsHoistable(node) {
      node[internalHoistableMarker] = true;
    }
    function clearPendingLoadOnNode(node) {
      node[internalLoadPendingKey] = undefined;
    }
    var allNativeEvents = new Set;
    var registrationNameDependencies = {};
    function registerTwoPhaseEvent(registrationName, dependencies) {
      registerDirectEvent(registrationName, dependencies);
      registerDirectEvent(registrationName + "Capture", dependencies);
    }
    function registerDirectEvent(registrationName, dependencies) {
      registrationNameDependencies[registrationName] = dependencies;
      for (registrationName = 0;registrationName < dependencies.length; registrationName++)
        allNativeEvents.add(dependencies[registrationName]);
    }
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName))
        return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    var viewTransitionMutationContext = false;
    function pushMutationContext() {
      var prev = viewTransitionMutationContext;
      viewTransitionMutationContext = false;
      return prev;
    }
    function setValueForAttribute(node, name, value) {
      if (isAttributeNameSafe(name))
        if (value === null)
          node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
              node.removeAttribute(name);
              return;
            case "boolean":
              var prefix$10 = name.toLowerCase().slice(0, 5);
              if (prefix$10 !== "data-" && prefix$10 !== "aria-") {
                node.removeAttribute(name);
                return;
              }
          }
          node.setAttribute(name, value);
        }
    }
    function setValueForKnownAttribute(node, name, value) {
      if (value === null)
        node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        node.setAttribute(name, value);
      }
    }
    function setValueForNamespacedAttribute(node, namespace, name, value) {
      if (value === null)
        node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        node.setAttributeNS(namespace, name, value);
      }
    }
    function getToStringValue(value) {
      switch (typeof value) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return value;
        case "object":
          return value;
        default:
          return "";
      }
    }
    function isCheckable(elem) {
      var type = elem.type;
      return (elem = elem.nodeName) && elem.toLowerCase() === "input" && (type === "checkbox" || type === "radio");
    }
    function trackValueOnNode(node, valueField, currentValue) {
      var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
      if (!node.hasOwnProperty(valueField) && typeof descriptor !== "undefined" && typeof descriptor.get === "function" && typeof descriptor.set === "function") {
        var { get, set } = descriptor;
        Object.defineProperty(node, valueField, {
          configurable: true,
          get: function() {
            return get.call(this);
          },
          set: function(value) {
            currentValue = "" + value;
            set.call(this, value);
          }
        });
        Object.defineProperty(node, valueField, {
          enumerable: descriptor.enumerable
        });
        return {
          getValue: function() {
            return currentValue;
          },
          setValue: function(value) {
            currentValue = "" + value;
          },
          stopTracking: function() {
            node._valueTracker = null;
            delete node[valueField];
          }
        };
      }
    }
    function track(node) {
      if (!node._valueTracker) {
        var valueField = isCheckable(node) ? "checked" : "value";
        node._valueTracker = trackValueOnNode(node, valueField, "" + node[valueField]);
      }
    }
    function updateValueIfChanged(node) {
      if (!node)
        return false;
      var tracker = node._valueTracker;
      if (!tracker)
        return true;
      var lastValue = tracker.getValue();
      var value = "";
      node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
      node = value;
      return node !== lastValue ? (tracker.setValue(node), true) : false;
    }
    var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
    function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
      return value.replace(escapeSelectorAttributeValueInsideDoubleQuotesRegex, function(ch) {
        return "\\" + ch.charCodeAt(0).toString(16) + " ";
      });
    }
    function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
      element.name = "";
      type != null && typeof type !== "function" && typeof type !== "symbol" && typeof type !== "boolean" ? element.type = type : element.removeAttribute("type");
      if (value != null)
        if (type === "number") {
          if (value === 0 && element.value === "" || element.value != value)
            element.value = "" + getToStringValue(value);
        } else
          element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
      else
        type !== "submit" && type !== "reset" || element.removeAttribute("value");
      value != null ? type === "number" && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : defaultValue != null ? setDefaultValue(element, getToStringValue(defaultValue)) : lastDefaultValue != null && element.removeAttribute("value");
      checked == null && defaultChecked != null && (element.defaultChecked = !!defaultChecked);
      checked != null && (element.checked = checked && typeof checked !== "function" && typeof checked !== "symbol");
      name != null && typeof name !== "function" && typeof name !== "symbol" && typeof name !== "boolean" ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
    }
    function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
      type != null && typeof type !== "function" && typeof type !== "symbol" && typeof type !== "boolean" && (element.type = type);
      if (value != null || defaultValue != null) {
        if (!(type !== "submit" && type !== "reset" || value !== undefined && value !== null)) {
          track(element);
          return;
        }
        defaultValue = defaultValue != null ? "" + getToStringValue(defaultValue) : "";
        value = value != null ? "" + getToStringValue(value) : defaultValue;
        isHydrating2 || value === element.value || (element.value = value);
        element.defaultValue = value;
      }
      checked = checked != null ? checked : defaultChecked;
      checked = typeof checked !== "function" && typeof checked !== "symbol" && !!checked;
      element.checked = isHydrating2 ? element.checked : !!checked;
      element.defaultChecked = !!checked;
      name != null && typeof name !== "function" && typeof name !== "symbol" && typeof name !== "boolean" && (element.name = name);
      track(element);
    }
    function setDefaultValue(node, value) {
      node.defaultValue !== "" + value && (node.defaultValue = "" + value);
    }
    function updateOptions(node, multiple, propValue, setDefaultSelected) {
      node = node.options;
      if (multiple) {
        multiple = {};
        for (var i = 0;i < propValue.length; i++)
          multiple["$" + propValue[i]] = true;
        for (propValue = 0;propValue < node.length; propValue++)
          i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
      } else {
        propValue = "" + getToStringValue(propValue);
        multiple = null;
        for (i = 0;i < node.length; i++) {
          if (node[i].value === propValue) {
            node[i].selected = true;
            setDefaultSelected && (node[i].defaultSelected = true);
            return;
          }
          multiple !== null || node[i].disabled || (multiple = node[i]);
        }
        multiple !== null && (multiple.selected = true);
      }
    }
    function updateTextarea(element, value, defaultValue) {
      if (value != null && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), defaultValue == null)) {
        element.defaultValue !== value && (element.defaultValue = value);
        return;
      }
      element.defaultValue = defaultValue != null ? "" + getToStringValue(defaultValue) : "";
    }
    function initTextarea(element, value, defaultValue, children) {
      if (value == null) {
        if (children != null) {
          if (defaultValue != null)
            throw Error(formatProdErrorMessage(92));
          if (isArrayImpl(children)) {
            if (1 < children.length)
              throw Error(formatProdErrorMessage(93));
            children = children[0];
          }
          defaultValue = children;
        }
        defaultValue == null && (defaultValue = "");
        value = defaultValue;
      }
      defaultValue = getToStringValue(value);
      element.defaultValue = defaultValue;
      children = element.textContent;
      children === defaultValue && children !== "" && children !== null && (element.value = children);
      track(element);
    }
    function setTextContent(node, text) {
      if (text) {
        var firstChild = node.firstChild;
        if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
          firstChild.nodeValue = text;
          return;
        }
      }
      node.textContent = text;
    }
    var unitlessNumbers = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function setValueForStyle(style2, styleName, value) {
      var isCustomProperty = styleName.indexOf("--") === 0;
      value == null || typeof value === "boolean" || value === "" ? isCustomProperty ? style2.setProperty(styleName, "") : styleName === "float" ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : typeof value !== "number" || value === 0 || unitlessNumbers.has(styleName) ? styleName === "float" ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
    }
    function setValueForStyles(node, styles, prevStyles) {
      if (styles != null && typeof styles !== "object")
        throw Error(formatProdErrorMessage(62));
      node = node.style;
      if (prevStyles != null) {
        for (var styleName in prevStyles)
          !prevStyles.hasOwnProperty(styleName) || styles != null && styles.hasOwnProperty(styleName) || (styleName.indexOf("--") === 0 ? node.setProperty(styleName, "") : styleName === "float" ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = true);
        for (var styleName$16 in styles)
          styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = true);
      } else
        for (var styleName$17 in styles)
          styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
    }
    function isCustomElement(tagName) {
      if (tagName.indexOf("-") === -1)
        return false;
      switch (tagName) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var aliases = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["maskType", "mask-type"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]);
    var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    function noop$1() {}
    var currentReplayingEvent = null;
    function getEventTarget(nativeEvent) {
      nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
      nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
      return nativeEvent.nodeType === 3 ? nativeEvent.parentNode : nativeEvent;
    }
    var restoreTarget = null;
    var restoreQueue = null;
    function restoreStateOfTarget(target) {
      var internalInstance = getInstanceFromNode(target);
      if (internalInstance && (target = internalInstance.stateNode)) {
        var props = target[internalPropsKey] || null;
        a:
          switch (target = internalInstance.stateNode, internalInstance.type) {
            case "input":
              updateInput(target, props.value, props.defaultValue, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name);
              internalInstance = props.name;
              if (props.type === "radio" && internalInstance != null) {
                for (props = target;props.parentNode; )
                  props = props.parentNode;
                props = props.querySelectorAll('input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes("" + internalInstance) + '"][type="radio"]');
                for (internalInstance = 0;internalInstance < props.length; internalInstance++) {
                  var otherNode = props[internalInstance];
                  if (otherNode !== target && otherNode.form === target.form) {
                    var otherProps = otherNode[internalPropsKey] || null;
                    if (!otherProps)
                      throw Error(formatProdErrorMessage(90));
                    updateInput(otherNode, otherProps.value, otherProps.defaultValue, otherProps.defaultValue, otherProps.checked, otherProps.defaultChecked, otherProps.type, otherProps.name);
                  }
                }
                for (internalInstance = 0;internalInstance < props.length; internalInstance++)
                  otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
              }
              break a;
            case "textarea":
              updateTextarea(target, props.value, props.defaultValue);
              break a;
            case "select":
              internalInstance = props.value, internalInstance != null && updateOptions(target, !!props.multiple, internalInstance, false);
          }
      }
    }
    var isInsideEventHandler = false;
    function batchedUpdates$1(fn, a, b) {
      if (isInsideEventHandler)
        return fn(a, b);
      isInsideEventHandler = true;
      try {
        var JSCompiler_inline_result = fn(a);
        return JSCompiler_inline_result;
      } finally {
        if (isInsideEventHandler = false, restoreTarget !== null || restoreQueue !== null) {
          if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
            for (a = 0;a < fn.length; a++)
              restoreStateOfTarget(fn[a]);
        }
      }
    }
    function getListener(inst, registrationName) {
      var stateNode = inst.stateNode;
      if (stateNode === null)
        return null;
      var props = stateNode[internalPropsKey] || null;
      if (props === null)
        return null;
      stateNode = props[registrationName];
      a:
        switch (registrationName) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (props = !props.disabled) || (inst = inst.type, props = !(inst === "button" || inst === "input" || inst === "select" || inst === "textarea"));
            inst = !props;
            break a;
          default:
            inst = false;
        }
      if (inst)
        return null;
      if (stateNode && typeof stateNode !== "function")
        throw Error(formatProdErrorMessage(231, registrationName, typeof stateNode));
      return stateNode;
    }
    var canUseDOM = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined");
    var passiveBrowserEventsSupported = false;
    if (canUseDOM)
      try {
        options = {};
        Object.defineProperty(options, "passive", {
          get: function() {
            passiveBrowserEventsSupported = true;
          }
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
      } catch (e) {
        passiveBrowserEventsSupported = false;
      }
    var options;
    var root = null;
    var startText = null;
    var fallbackText = null;
    function getData() {
      if (fallbackText)
        return fallbackText;
      var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
      for (start = 0;start < startLength && startValue[start] === endValue[start]; start++)
        ;
      var minEnd = startLength - start;
      for (end = 1;end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++)
        ;
      return fallbackText = endValue.slice(start, 1 < end ? 1 - end : undefined);
    }
    function getEventCharCode(nativeEvent) {
      var keyCode = nativeEvent.keyCode;
      "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, nativeEvent === 0 && keyCode === 13 && (nativeEvent = 13)) : nativeEvent = keyCode;
      nativeEvent === 10 && (nativeEvent = 13);
      return 32 <= nativeEvent || nativeEvent === 13 ? nativeEvent : 0;
    }
    function functionThatReturnsTrue() {
      return true;
    }
    function functionThatReturnsFalse() {
      return false;
    }
    function createSyntheticEvent(Interface) {
      function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
        this._reactName = reactName;
        this._targetInst = targetInst;
        this.type = reactEventType;
        this.nativeEvent = nativeEvent;
        this.target = nativeEventTarget;
        this.currentTarget = null;
        for (var propName in Interface)
          Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
        this.isDefaultPrevented = (nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false) ? functionThatReturnsTrue : functionThatReturnsFalse;
        this.isPropagationStopped = functionThatReturnsFalse;
        return this;
      }
      assign(SyntheticBaseEvent.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var event = this.nativeEvent;
          event && (event.preventDefault ? event.preventDefault() : typeof event.returnValue !== "unknown" && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
        },
        stopPropagation: function() {
          var event = this.nativeEvent;
          event && (event.stopPropagation ? event.stopPropagation() : typeof event.cancelBubble !== "unknown" && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
        },
        persist: function() {},
        isPersistent: functionThatReturnsTrue
      });
      return SyntheticBaseEvent;
    }
    var EventInterface = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    };
    var SyntheticEvent = createSyntheticEvent(EventInterface);
    var UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 });
    var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
    var lastMovementX;
    var lastMovementY;
    var lastMouseEvent;
    var MouseEventInterface = assign({}, UIEventInterface, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: getEventModifierState,
      button: 0,
      buttons: 0,
      relatedTarget: function(event) {
        return event.relatedTarget === undefined ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
      },
      movementX: function(event) {
        if ("movementX" in event)
          return event.movementX;
        event !== lastMouseEvent && (lastMouseEvent && event.type === "mousemove" ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
        return lastMovementX;
      },
      movementY: function(event) {
        return "movementY" in event ? event.movementY : lastMovementY;
      }
    });
    var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
    var DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 });
    var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
    var FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 });
    var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
    var AnimationEventInterface = assign({}, EventInterface, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    });
    var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
    var ClipboardEventInterface = assign({}, EventInterface, {
      clipboardData: function(event) {
        return "clipboardData" in event ? event.clipboardData : window.clipboardData;
      }
    });
    var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
    var CompositionEventInterface = assign({}, EventInterface, { data: 0 });
    var SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface);
    var normalizeKey = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var translateToKey = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var modifierKeyToProp = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function modifierStateGetter(keyArg) {
      var nativeEvent = this.nativeEvent;
      return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
    }
    function getEventModifierState() {
      return modifierStateGetter;
    }
    var KeyboardEventInterface = assign({}, UIEventInterface, {
      key: function(nativeEvent) {
        if (nativeEvent.key) {
          var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
          if (key !== "Unidentified")
            return key;
        }
        return nativeEvent.type === "keypress" ? (nativeEvent = getEventCharCode(nativeEvent), nativeEvent === 13 ? "Enter" : String.fromCharCode(nativeEvent)) : nativeEvent.type === "keydown" || nativeEvent.type === "keyup" ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: getEventModifierState,
      charCode: function(event) {
        return event.type === "keypress" ? getEventCharCode(event) : 0;
      },
      keyCode: function(event) {
        return event.type === "keydown" || event.type === "keyup" ? event.keyCode : 0;
      },
      which: function(event) {
        return event.type === "keypress" ? getEventCharCode(event) : event.type === "keydown" || event.type === "keyup" ? event.keyCode : 0;
      }
    });
    var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
    var PointerEventInterface = assign({}, MouseEventInterface, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    });
    var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
    var SubmitEventInterface = assign({}, EventInterface, { submitter: 0 });
    var SyntheticSubmitEvent = createSyntheticEvent(SubmitEventInterface);
    var TouchEventInterface = assign({}, UIEventInterface, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: getEventModifierState
    });
    var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
    var TransitionEventInterface = assign({}, EventInterface, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    });
    var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
    var WheelEventInterface = assign({}, MouseEventInterface, {
      deltaX: function(event) {
        return "deltaX" in event ? event.deltaX : ("wheelDeltaX" in event) ? -event.wheelDeltaX : 0;
      },
      deltaY: function(event) {
        return "deltaY" in event ? event.deltaY : ("wheelDeltaY" in event) ? -event.wheelDeltaY : ("wheelDelta" in event) ? -event.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);
    var ToggleEventInterface = assign({}, EventInterface, {
      newState: 0,
      oldState: 0,
      source: 0
    });
    var SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface);
    var END_KEYCODES = [9, 13, 27, 32];
    var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
    var documentMode = null;
    canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
    var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
    var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
    var SPACEBAR_CHAR = String.fromCharCode(32);
    var hasSpaceKeypress = false;
    function isFallbackCompositionEnd(domEventName, nativeEvent) {
      switch (domEventName) {
        case "keyup":
          return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
        case "keydown":
          return nativeEvent.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function getDataFromCustomEvent(nativeEvent) {
      nativeEvent = nativeEvent.detail;
      return typeof nativeEvent === "object" && "data" in nativeEvent ? nativeEvent.data : null;
    }
    var isComposing = false;
    function getNativeBeforeInputChars(domEventName, nativeEvent) {
      switch (domEventName) {
        case "compositionend":
          return getDataFromCustomEvent(nativeEvent);
        case "keypress":
          if (nativeEvent.which !== 32)
            return null;
          hasSpaceKeypress = true;
          return SPACEBAR_CHAR;
        case "textInput":
          return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
        default:
          return null;
      }
    }
    function getFallbackBeforeInputChars(domEventName, nativeEvent) {
      if (isComposing)
        return domEventName === "compositionend" || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
      switch (domEventName) {
        case "paste":
          return null;
        case "keypress":
          if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
            if (nativeEvent.char && 1 < nativeEvent.char.length)
              return nativeEvent.char;
            if (nativeEvent.which)
              return String.fromCharCode(nativeEvent.which);
          }
          return null;
        case "compositionend":
          return useFallbackCompositionData && nativeEvent.locale !== "ko" ? null : nativeEvent.data;
        default:
          return null;
      }
    }
    var supportedInputTypes = {
      color: true,
      date: true,
      datetime: true,
      "datetime-local": true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function isTextInputElement(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === "input" ? !!supportedInputTypes[elem.type] : nodeName === "textarea" ? true : false;
    }
    function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
      restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
      inst = accumulateTwoPhaseListeners(inst, "onChange");
      0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent, target), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
    }
    var activeElement$1 = null;
    var activeElementInst$1 = null;
    function runEventInBatch(dispatchQueue) {
      processDispatchQueue(dispatchQueue, 0);
    }
    function getInstIfValueChanged(targetInst) {
      var targetNode = getNodeFromInstance(targetInst);
      if (updateValueIfChanged(targetNode))
        return targetInst;
    }
    function getTargetInstForChangeEvent(domEventName, targetInst) {
      if (domEventName === "change")
        return targetInst;
    }
    var isInputEventSupported = false;
    if (canUseDOM) {
      if (canUseDOM) {
        isSupported$jscomp$inline_474 = "oninput" in document;
        if (!isSupported$jscomp$inline_474) {
          element$jscomp$inline_475 = document.createElement("div");
          element$jscomp$inline_475.setAttribute("oninput", "return;");
          isSupported$jscomp$inline_474 = typeof element$jscomp$inline_475.oninput === "function";
        }
        JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
      } else
        JSCompiler_inline_result$jscomp$318 = false;
      isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
    }
    var JSCompiler_inline_result$jscomp$318;
    var isSupported$jscomp$inline_474;
    var element$jscomp$inline_475;
    function stopWatchingForValueChange() {
      activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
    }
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName === "value" && getInstIfValueChanged(activeElementInst$1)) {
        var dispatchQueue = [];
        createAndAccumulateChangeEvent(dispatchQueue, activeElementInst$1, nativeEvent, getEventTarget(nativeEvent));
        batchedUpdates$1(runEventInBatch, dispatchQueue);
      }
    }
    function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
      domEventName === "focusin" ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : domEventName === "focusout" && stopWatchingForValueChange();
    }
    function getTargetInstForInputEventPolyfill(domEventName) {
      if (domEventName === "selectionchange" || domEventName === "keyup" || domEventName === "keydown")
        return getInstIfValueChanged(activeElementInst$1);
    }
    function getTargetInstForClickEvent(domEventName, targetInst) {
      if (domEventName === "click")
        return getInstIfValueChanged(targetInst);
    }
    function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
      if (domEventName === "input" || domEventName === "change")
        return getInstIfValueChanged(targetInst);
    }
    function is(x, y) {
      return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = typeof Object.is === "function" ? Object.is : is;
    function shallowEqual(objA, objB) {
      if (objectIs(objA, objB))
        return true;
      if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null)
        return false;
      var keysA = Object.keys(objA), keysB = Object.keys(objB);
      if (keysA.length !== keysB.length)
        return false;
      for (keysB = 0;keysB < keysA.length; keysB++) {
        var currentKey = keysA[keysB];
        if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
          return false;
      }
      return true;
    }
    function getActiveElement(doc) {
      doc = doc || (typeof document !== "undefined" ? document : undefined);
      if (typeof doc === "undefined")
        return null;
      try {
        return doc.activeElement || doc.body;
      } catch (e$20) {
        return doc.body;
      }
    }
    function getLeafNode(node) {
      for (;node && node.firstChild; )
        node = node.firstChild;
      return node;
    }
    function getNodeForCharacterOffset(root2, offset) {
      var node = getLeafNode(root2);
      root2 = 0;
      for (var nodeEnd;node; ) {
        if (node.nodeType === 3) {
          nodeEnd = root2 + node.textContent.length;
          if (root2 <= offset && nodeEnd >= offset)
            return { node, offset: offset - root2 };
          root2 = nodeEnd;
        }
        a: {
          for (;node; ) {
            if (node.nextSibling) {
              node = node.nextSibling;
              break a;
            }
            node = node.parentNode;
          }
          node = undefined;
        }
        node = getLeafNode(node);
      }
    }
    function containsNode(outerNode, innerNode) {
      return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && outerNode.nodeType === 3 ? false : innerNode && innerNode.nodeType === 3 ? containsNode(outerNode, innerNode.parentNode) : ("contains" in outerNode) ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
    }
    function getActiveElementDeep(containerInfo) {
      containerInfo = containerInfo != null && containerInfo.ownerDocument != null && containerInfo.ownerDocument.defaultView != null ? containerInfo.ownerDocument.defaultView : window;
      for (var element = getActiveElement(containerInfo.document);element instanceof containerInfo.HTMLIFrameElement; ) {
        try {
          var JSCompiler_inline_result = typeof element.contentWindow.location.href === "string";
        } catch (err) {
          JSCompiler_inline_result = false;
        }
        if (JSCompiler_inline_result)
          containerInfo = element.contentWindow;
        else
          break;
        element = getActiveElement(containerInfo.document);
      }
      return element;
    }
    function hasSelectionCapabilities(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && (nodeName === "input" && (elem.type === "text" || elem.type === "search" || elem.type === "tel" || elem.type === "url" || elem.type === "password") || nodeName === "textarea" || elem.contentEditable === "true");
    }
    var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
    var activeElement = null;
    var activeElementInst = null;
    var lastSelection = null;
    var mouseDown = false;
    function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
      var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === 9 ? nativeEventTarget : nativeEventTarget.ownerDocument;
      mouseDown || activeElement == null || activeElement !== getActiveElement(doc) || (doc = activeElement, ("selectionStart" in doc) && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null, nativeEvent, nativeEventTarget), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
    }
    function makePrefixMap(styleProp, eventName) {
      var prefixes = {};
      prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
      prefixes["Webkit" + styleProp] = "webkit" + eventName;
      prefixes["Moz" + styleProp] = "moz" + eventName;
      return prefixes;
    }
    var vendorPrefixes = {
      animationend: makePrefixMap("Animation", "AnimationEnd"),
      animationiteration: makePrefixMap("Animation", "AnimationIteration"),
      animationstart: makePrefixMap("Animation", "AnimationStart"),
      transitionrun: makePrefixMap("Transition", "TransitionRun"),
      transitionstart: makePrefixMap("Transition", "TransitionStart"),
      transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
      transitionend: makePrefixMap("Transition", "TransitionEnd")
    };
    var prefixedEventNames = {};
    var style = {};
    canUseDOM && (style = document.createElement("div").style, ("AnimationEvent" in window) || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), ("TransitionEvent" in window) || delete vendorPrefixes.transitionend.transition);
    function getVendorPrefixedEventName(eventName) {
      if (prefixedEventNames[eventName])
        return prefixedEventNames[eventName];
      if (!vendorPrefixes[eventName])
        return eventName;
      var prefixMap = vendorPrefixes[eventName], styleProp;
      for (styleProp in prefixMap)
        if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
          return prefixedEventNames[eventName] = prefixMap[styleProp];
      return eventName;
    }
    var ANIMATION_END = getVendorPrefixedEventName("animationend");
    var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
    var ANIMATION_START = getVendorPrefixedEventName("animationstart");
    var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
    var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
    var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
    var TRANSITION_END = getVendorPrefixedEventName("transitionend");
    var topLevelEventsToReactNames = new Map;
    var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    simpleEventPluginEvents.push("scrollEnd");
    function registerSimpleEvent(domEventName, reactName) {
      topLevelEventsToReactNames.set(domEventName, reactName);
      registerTwoPhaseEvent(reactName, [domEventName]);
    }
    var globalClientIdCounter$1 = 0;
    function getViewTransitionName(props, instance) {
      if (props.name != null && props.name !== "auto")
        return props.name;
      if (instance.autoName !== null)
        return instance.autoName;
      props = pendingEffectsRoot.identifierPrefix;
      var globalClientId = globalClientIdCounter$1++;
      props = "_" + props + "t_" + globalClientId.toString(32) + "_";
      return instance.autoName = props;
    }
    function getClassNameByType(classByType) {
      if (classByType == null || typeof classByType === "string")
        return classByType;
      var className = null, activeTypes = pendingTransitionTypes;
      if (activeTypes !== null)
        for (var i = 0;i < activeTypes.length; i++) {
          var match = classByType[activeTypes[i]];
          if (match != null) {
            if (match === "none")
              return "none";
            className = className == null ? match : className + (" " + match);
          }
        }
      return className == null ? classByType.default : className;
    }
    function getViewTransitionClassName(defaultClass, eventClass) {
      defaultClass = getClassNameByType(defaultClass);
      eventClass = getClassNameByType(eventClass);
      return eventClass == null ? defaultClass === "auto" ? null : defaultClass : eventClass === "auto" ? null : eventClass;
    }
    var reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var concurrentQueues = [];
    var concurrentQueuesIndex = 0;
    var concurrentlyUpdatedLanes = 0;
    function finishQueueingConcurrentUpdates() {
      for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0;i < endIndex; ) {
        var fiber = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var queue = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var update = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var lane = concurrentQueues[i];
        concurrentQueues[i++] = null;
        if (queue !== null && update !== null) {
          var pending = queue.pending;
          pending === null ? update.next = update : (update.next = pending.next, pending.next = update);
          queue.pending = update;
        }
        lane !== 0 && markUpdateLaneFromFiberToRoot(fiber, update, lane);
      }
    }
    function enqueueUpdate$1(fiber, queue, update, lane) {
      concurrentQueues[concurrentQueuesIndex++] = fiber;
      concurrentQueues[concurrentQueuesIndex++] = queue;
      concurrentQueues[concurrentQueuesIndex++] = update;
      concurrentQueues[concurrentQueuesIndex++] = lane;
      concurrentlyUpdatedLanes |= lane;
      fiber.lanes |= lane;
      fiber = fiber.alternate;
      fiber !== null && (fiber.lanes |= lane);
    }
    function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
      enqueueUpdate$1(fiber, queue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function enqueueConcurrentRenderForLane(fiber, lane) {
      enqueueUpdate$1(fiber, null, null, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
      sourceFiber.lanes |= lane;
      var alternate = sourceFiber.alternate;
      alternate !== null && (alternate.lanes |= lane);
      for (var isHidden = false, parent = sourceFiber.return;parent !== null; )
        parent.childLanes |= lane, alternate = parent.alternate, alternate !== null && (alternate.childLanes |= lane), parent.tag === 22 && (sourceFiber = parent.stateNode, sourceFiber === null || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
      return sourceFiber.tag === 3 ? (parent = sourceFiber.stateNode, isHidden && update !== null && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], alternate === null ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
    }
    function getRootForUpdatedFiber(sourceFiber) {
      if (50 < nestedUpdateCount)
        throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
      for (var parent = sourceFiber.return;parent !== null; )
        sourceFiber = parent, parent = sourceFiber.return;
      return sourceFiber.tag === 3 ? sourceFiber.stateNode : null;
    }
    var emptyContextObject = {};
    function FiberNode(tag, pendingProps, key, mode) {
      this.tag = tag;
      this.key = key;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.refCleanup = this.ref = null;
      this.pendingProps = pendingProps;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = mode;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function createFiberImplClass(tag, pendingProps, key, mode) {
      return new FiberNode(tag, pendingProps, key, mode);
    }
    function shouldConstruct(Component) {
      Component = Component.prototype;
      return !(!Component || !Component.isReactComponent);
    }
    function createWorkInProgress(current, pendingProps) {
      var workInProgress2 = current.alternate;
      workInProgress2 === null ? (workInProgress2 = createFiberImplClass(current.tag, pendingProps, current.key, current.mode), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
      workInProgress2.flags = current.flags & 1206910976;
      workInProgress2.childLanes = current.childLanes;
      workInProgress2.lanes = current.lanes;
      workInProgress2.child = current.child;
      workInProgress2.memoizedProps = current.memoizedProps;
      workInProgress2.memoizedState = current.memoizedState;
      workInProgress2.updateQueue = current.updateQueue;
      pendingProps = current.dependencies;
      workInProgress2.dependencies = pendingProps === null ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
      workInProgress2.sibling = current.sibling;
      workInProgress2.index = current.index;
      workInProgress2.ref = current.ref;
      workInProgress2.refCleanup = current.refCleanup;
      return workInProgress2;
    }
    function resetWorkInProgress(workInProgress2, renderLanes2) {
      workInProgress2.flags &= 1206910978;
      var current = workInProgress2.alternate;
      current === null ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = renderLanes2 === null ? null : {
        lanes: renderLanes2.lanes,
        firstContext: renderLanes2.firstContext
      });
      return workInProgress2;
    }
    function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
      var fiberTag = 0;
      owner = type;
      if (typeof owner === "function")
        shouldConstruct(owner) && (fiberTag = 1);
      else if (typeof owner === "string")
        fiberTag = isHostHoistableType(type, pendingProps, contextStackCursor.current) ? 26 : type === "html" || type === "head" || type === "body" ? 27 : 5;
      else
        a:
          switch (owner) {
            case REACT_ACTIVITY_TYPE:
              return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
            case REACT_FRAGMENT_TYPE:
              return createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case REACT_STRICT_MODE_TYPE:
              fiberTag = 8;
              mode |= 24;
              break;
            case REACT_PROFILER_TYPE:
              return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_TYPE:
              return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_LIST_TYPE:
              return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
            case REACT_LEGACY_HIDDEN_TYPE:
            case REACT_VIEW_TRANSITION_TYPE:
              return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
                autoName: null,
                paired: null,
                clones: null,
                ref: null
              }, type;
            default:
              if (typeof owner === "object" && owner !== null)
                switch (owner.$$typeof) {
                  case REACT_CONTEXT_TYPE:
                    fiberTag = 10;
                    break a;
                  case REACT_CONSUMER_TYPE:
                    fiberTag = 9;
                    break a;
                  case REACT_FORWARD_REF_TYPE:
                    fiberTag = 11;
                    break a;
                  case REACT_MEMO_TYPE:
                    fiberTag = 14;
                    break a;
                  case REACT_LAZY_TYPE:
                    fiberTag = 16;
                    owner = null;
                    break a;
                }
              fiberTag = 29;
              pendingProps = Error(formatProdErrorMessage(130, type === null ? "null" : typeof type, ""));
              owner = null;
          }
      key = createFiberImplClass(fiberTag, pendingProps, key, mode);
      key.elementType = type;
      key.type = owner;
      key.lanes = lanes;
      return key;
    }
    function createFiberFromFragment(elements, mode, lanes, key) {
      elements = createFiberImplClass(7, elements, key, mode);
      elements.lanes = lanes;
      return elements;
    }
    function createFiberFromText(content, mode, lanes) {
      content = createFiberImplClass(6, content, null, mode);
      content.lanes = lanes;
      return content;
    }
    function createFiberFromDehydratedFragment(dehydratedNode) {
      var fiber = createFiberImplClass(18, null, null, 0);
      fiber.stateNode = dehydratedNode;
      return fiber;
    }
    function createFiberFromPortal(portal, mode, lanes) {
      mode = createFiberImplClass(4, portal.children !== null ? portal.children : [], portal.key, mode);
      mode.lanes = lanes;
      mode.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null,
        implementation: portal.implementation
      };
      return mode;
    }
    var CapturedStacks = new WeakMap;
    function createCapturedValueAtFiber(value, source) {
      if (typeof value === "object" && value !== null) {
        var existing = CapturedStacks.get(value);
        if (existing !== undefined)
          return existing;
        source = {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
        CapturedStacks.set(value, source);
        return source;
      }
      return {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
    }
    var forkStack = [];
    var forkStackIndex = 0;
    var treeForkProvider = null;
    var treeForkCount = 0;
    var idStack = [];
    var idStackIndex = 0;
    var treeContextProvider = null;
    var treeContextId = 1;
    var treeContextOverflow = "";
    function pushTreeFork(workInProgress2, totalChildren) {
      forkStack[forkStackIndex++] = treeForkCount;
      forkStack[forkStackIndex++] = treeForkProvider;
      treeForkProvider = workInProgress2;
      treeForkCount = totalChildren;
    }
    function pushTreeId(workInProgress2, totalChildren, index2) {
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextProvider = workInProgress2;
      var baseIdWithLeadingBit = treeContextId;
      workInProgress2 = treeContextOverflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index2 += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
        treeContextOverflow = length + workInProgress2;
      } else
        treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
    }
    function pushMaterializedTreeId(workInProgress2) {
      workInProgress2.return !== null && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
    }
    function popTreeContext(workInProgress2) {
      for (;workInProgress2 === treeForkProvider; )
        treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
      for (;workInProgress2 === treeContextProvider; )
        treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
    }
    function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextId = suspendedContext.id;
      treeContextOverflow = suspendedContext.overflow;
      treeContextProvider = workInProgress2;
    }
    var hydrationParentFiber = null;
    var nextHydratableInstance = null;
    var isHydrating = false;
    var hydrationErrors = null;
    var rootOrSingletonContext = false;
    var HydrationMismatchException = Error(formatProdErrorMessage(519));
    function throwOnHydrationMismatch(fiber) {
      var error = Error(formatProdErrorMessage(418, 1 < arguments.length && arguments[1] !== undefined && arguments[1] ? "text" : "HTML", ""));
      queueHydrationError(createCapturedValueAtFiber(error, fiber));
      throw HydrationMismatchException;
    }
    function prepareToHydrateHostInstance(fiber) {
      var { stateNode: instance, type, memoizedProps: props } = fiber;
      instance[internalInstanceKey] = fiber;
      instance[internalPropsKey] = props;
      switch (type) {
        case "dialog":
          listenToNonDelegatedEvent("cancel", instance);
          listenToNonDelegatedEvent("close", instance);
          break;
        case "iframe":
        case "object":
        case "embed":
          listenToNonDelegatedEvent("load", instance);
          break;
        case "video":
        case "audio":
          for (type = 0;type < mediaEventTypes.length; type++)
            listenToNonDelegatedEvent(mediaEventTypes[type], instance);
          break;
        case "source":
          listenToNonDelegatedEvent("error", instance);
          break;
        case "img":
        case "image":
        case "link":
          listenToNonDelegatedEvent("error", instance);
          listenToNonDelegatedEvent("load", instance);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", instance);
          break;
        case "input":
          listenToNonDelegatedEvent("invalid", instance);
          initInput(instance, props.value, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name, true);
          break;
        case "select":
          listenToNonDelegatedEvent("invalid", instance);
          break;
        case "textarea":
          listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
      }
      type = props.children;
      typeof type !== "string" && typeof type !== "number" && typeof type !== "bigint" || instance.textContent === "" + type || props.suppressHydrationWarning === true || checkForUnmatchedText(instance.textContent, type) ? (props.popover != null && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), props.onScroll != null && listenToNonDelegatedEvent("scroll", instance), props.onScrollEnd != null && listenToNonDelegatedEvent("scrollend", instance), props.onClick != null && (instance.onclick = noop$1), instance = true) : instance = false;
      instance || throwOnHydrationMismatch(fiber, true);
    }
    function popToNextHostParent(fiber) {
      for (hydrationParentFiber = fiber.return;hydrationParentFiber; )
        switch (hydrationParentFiber.tag) {
          case 5:
          case 31:
          case 13:
            rootOrSingletonContext = false;
            return;
          case 27:
          case 3:
            rootOrSingletonContext = true;
            return;
          default:
            hydrationParentFiber = hydrationParentFiber.return;
        }
    }
    function popHydrationState(fiber) {
      if (fiber !== hydrationParentFiber)
        return false;
      if (!isHydrating)
        return popToNextHostParent(fiber), isHydrating = true, false;
      var tag = fiber.tag, JSCompiler_temp;
      if (JSCompiler_temp = tag !== 3 && tag !== 27) {
        if (JSCompiler_temp = tag === 5)
          JSCompiler_temp = fiber.type, JSCompiler_temp = !(JSCompiler_temp !== "form" && JSCompiler_temp !== "button") || shouldSetTextContent(fiber.type, fiber.memoizedProps);
        JSCompiler_temp = !JSCompiler_temp;
      }
      JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
      popToNextHostParent(fiber);
      if (tag === 13) {
        fiber = fiber.memoizedState;
        fiber = fiber !== null ? fiber.dehydrated : null;
        if (!fiber)
          throw Error(formatProdErrorMessage(317));
        nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
      } else if (tag === 31) {
        fiber = fiber.memoizedState;
        fiber = fiber !== null ? fiber.dehydrated : null;
        if (!fiber)
          throw Error(formatProdErrorMessage(317));
        nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
      } else
        tag === 27 ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
      return true;
    }
    function resetHydrationState() {
      nextHydratableInstance = hydrationParentFiber = null;
      isHydrating = false;
    }
    function upgradeHydrationErrorsToRecoverable() {
      var queuedErrors = hydrationErrors;
      queuedErrors !== null && (workInProgressRootRecoverableErrors === null ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, queuedErrors), hydrationErrors = null);
      return queuedErrors;
    }
    function queueHydrationError(error) {
      hydrationErrors === null ? hydrationErrors = [error] : hydrationErrors.push(error);
    }
    var valueCursor = createCursor(null);
    var currentlyRenderingFiber$1 = null;
    var lastContextDependency = null;
    function pushProvider(providerFiber, context, nextValue) {
      push(valueCursor, context._currentValue);
      context._currentValue = nextValue;
    }
    function popProvider(context) {
      context._currentValue = valueCursor.current;
      pop(valueCursor);
    }
    function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
      for (;parent !== null; ) {
        var alternate = parent.alternate;
        (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, alternate !== null && (alternate.childLanes |= renderLanes2)) : alternate !== null && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
        if (parent === propagationRoot)
          break;
        parent = parent.return;
      }
    }
    function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
      var fiber = workInProgress2.child;
      fiber !== null && (fiber.return = workInProgress2);
      for (;fiber !== null; ) {
        var list = fiber.dependencies;
        if (list !== null) {
          var nextFiber = fiber.child;
          list = list.firstContext;
          a:
            for (;list !== null; ) {
              var dependency = list;
              list = fiber;
              for (var i = 0;i < contexts.length; i++)
                if (dependency.context === contexts[i]) {
                  list.lanes |= renderLanes2;
                  dependency = list.alternate;
                  dependency !== null && (dependency.lanes |= renderLanes2);
                  scheduleContextWorkOnParentPath(list.return, renderLanes2, workInProgress2);
                  forcePropagateEntireTree || (nextFiber = null);
                  break a;
                }
              list = dependency.next;
            }
        } else if (fiber.tag === 18) {
          nextFiber = fiber.return;
          if (nextFiber === null)
            throw Error(formatProdErrorMessage(341));
          nextFiber.lanes |= renderLanes2;
          list = nextFiber.alternate;
          list !== null && (list.lanes |= renderLanes2);
          scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
          nextFiber = null;
        } else
          fiber.tag === 13 && fiber.memoizedState !== null && fiber.memoizedState.dehydrated === null ? (fiber.lanes |= renderLanes2, nextFiber = fiber.alternate, nextFiber !== null && (nextFiber.lanes |= renderLanes2), scheduleContextWorkOnParentPath(fiber.return, renderLanes2, workInProgress2), nextFiber = fiber.child, nextFiber = nextFiber !== null ? nextFiber.sibling : null) : nextFiber = fiber.child;
        if (nextFiber !== null)
          nextFiber.return = fiber;
        else
          for (nextFiber = fiber;nextFiber !== null; ) {
            if (nextFiber === workInProgress2) {
              nextFiber = null;
              break;
            }
            fiber = nextFiber.sibling;
            if (fiber !== null) {
              fiber.return = nextFiber.return;
              nextFiber = fiber;
              break;
            }
            nextFiber = nextFiber.return;
          }
        fiber = nextFiber;
      }
    }
    function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
      current = null;
      for (var parent = workInProgress2, isInsidePropagationBailout = false;parent !== null; ) {
        if (!isInsidePropagationBailout) {
          if ((parent.flags & 524288) !== 0)
            isInsidePropagationBailout = true;
          else if ((parent.flags & 262144) !== 0)
            break;
        }
        if (parent.tag === 10) {
          var currentParent = parent.alternate;
          if (currentParent === null)
            throw Error(formatProdErrorMessage(387));
          currentParent = currentParent.memoizedProps;
          if (currentParent !== null) {
            var context = parent.type;
            objectIs(parent.pendingProps.value, currentParent.value) || (current !== null ? current.push(context) : current = [context]);
          }
        } else if (parent === hostTransitionProviderCursor.current) {
          currentParent = parent.alternate;
          if (currentParent === null)
            throw Error(formatProdErrorMessage(387));
          currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (current !== null ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
        }
        parent = parent.return;
      }
      current !== null && propagateContextChanges(workInProgress2, current, renderLanes2, forcePropagateEntireTree);
      workInProgress2.flags |= 262144;
      return current !== null;
    }
    function checkIfContextChanged(currentDependencies) {
      for (currentDependencies = currentDependencies.firstContext;currentDependencies !== null; ) {
        if (!objectIs(currentDependencies.context._currentValue, currentDependencies.memoizedValue))
          return true;
        currentDependencies = currentDependencies.next;
      }
      return false;
    }
    function prepareToReadContext(workInProgress2) {
      currentlyRenderingFiber$1 = workInProgress2;
      lastContextDependency = null;
      workInProgress2 = workInProgress2.dependencies;
      workInProgress2 !== null && (workInProgress2.firstContext = null);
    }
    function readContext(context) {
      return readContextForConsumer(currentlyRenderingFiber$1, context);
    }
    function readContextDuringReconciliation(consumer, context) {
      currentlyRenderingFiber$1 === null && prepareToReadContext(consumer);
      return readContextForConsumer(consumer, context);
    }
    function readContextForConsumer(consumer, context) {
      var value = context._currentValue;
      context = { context, memoizedValue: value, next: null };
      if (lastContextDependency === null) {
        if (consumer === null)
          throw Error(formatProdErrorMessage(308));
        lastContextDependency = context;
        consumer.dependencies = { lanes: 0, firstContext: context };
        consumer.flags |= 524288;
      } else
        lastContextDependency = lastContextDependency.next = context;
      return value;
    }
    var AbortControllerLocal = typeof AbortController !== "undefined" ? AbortController : function() {
      var listeners = [], signal = this.signal = {
        aborted: false,
        addEventListener: function(type, listener) {
          listeners.push(listener);
        }
      };
      this.abort = function() {
        signal.aborted = true;
        listeners.forEach(function(listener) {
          return listener();
        });
      };
    };
    var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
    var NormalPriority = Scheduler.unstable_NormalPriority;
    var CacheContext = {
      $$typeof: REACT_CONTEXT_TYPE,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function createCache() {
      return {
        controller: new AbortControllerLocal,
        data: new Map,
        refCount: 0
      };
    }
    function releaseCache(cache) {
      cache.refCount--;
      cache.refCount === 0 && scheduleCallback$2(NormalPriority, function() {
        cache.controller.abort();
      });
    }
    function queueTransitionTypes(root2, transitionTypes) {
      if ((root2.pendingLanes & 4194048) !== 0) {
        var queued = root2.transitionTypes;
        queued === null && (queued = root2.transitionTypes = []);
        for (root2 = 0;root2 < transitionTypes.length; root2++) {
          var transitionType = transitionTypes[root2];
          queued.indexOf(transitionType) === -1 && queued.push(transitionType);
        }
      }
    }
    var entangledTransitionTypes = null;
    function claimQueuedTransitionTypes(root2) {
      var claimed = root2.transitionTypes;
      root2.transitionTypes = null;
      return claimed;
    }
    var currentEntangledListeners = null;
    var currentEntangledPendingCount = 0;
    var currentEntangledLane = 0;
    var currentEntangledActionThenable = null;
    function entangleAsyncAction(transition, thenable) {
      if (currentEntangledListeners === null) {
        var entangledListeners = currentEntangledListeners = [];
        currentEntangledPendingCount = 0;
        currentEntangledLane = requestTransitionLane();
        currentEntangledActionThenable = {
          status: "pending",
          value: undefined,
          then: function(resolve) {
            entangledListeners.push(resolve);
          }
        };
      }
      currentEntangledPendingCount++;
      thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
      return thenable;
    }
    function pingEngtangledActionScope() {
      if (--currentEntangledPendingCount === 0 && (entangledTransitionTypes = null, currentEntangledListeners !== null)) {
        currentEntangledActionThenable !== null && (currentEntangledActionThenable.status = "fulfilled");
        var listeners = currentEntangledListeners;
        currentEntangledListeners = null;
        currentEntangledLane = 0;
        currentEntangledActionThenable = null;
        for (var i = 0;i < listeners.length; i++)
          (0, listeners[i])();
      }
    }
    function chainThenableValue(thenable, result) {
      var listeners = [], thenableWithOverride = {
        status: "pending",
        value: null,
        reason: null,
        then: function(resolve) {
          listeners.push(resolve);
        }
      };
      thenable.then(function() {
        thenableWithOverride.status = "fulfilled";
        thenableWithOverride.value = result;
        for (var i = 0;i < listeners.length; i++)
          (0, listeners[i])(result);
      }, function(error) {
        thenableWithOverride.status = "rejected";
        thenableWithOverride.reason = error;
        for (error = 0;error < listeners.length; error++)
          (0, listeners[error])(undefined);
      });
      return thenableWithOverride;
    }
    var prevOnStartTransitionFinish = ReactSharedInternals.S;
    ReactSharedInternals.S = function(transition, returnValue) {
      globalMostRecentTransitionTime = now();
      typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && entangleAsyncAction(transition, returnValue);
      if (entangledTransitionTypes !== null)
        for (var root$28 = firstScheduledRoot;root$28 !== null; )
          queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
      root$28 = transition.types;
      if (root$28 !== null) {
        for (var root$29 = firstScheduledRoot;root$29 !== null; )
          queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
        if (currentEntangledLane !== 0) {
          root$29 = entangledTransitionTypes;
          root$29 === null && (root$29 = entangledTransitionTypes = []);
          for (var i = 0;i < root$28.length; i++) {
            var transitionType = root$28[i];
            root$29.indexOf(transitionType) === -1 && root$29.push(transitionType);
          }
        }
      }
      prevOnStartTransitionFinish !== null && prevOnStartTransitionFinish(transition, returnValue);
    };
    var resumedCache = createCursor(null);
    function peekCacheFromPool() {
      var cacheResumedFromPreviousRender = resumedCache.current;
      return cacheResumedFromPreviousRender !== null ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
    }
    function pushTransition(offscreenWorkInProgress, prevCachePool) {
      prevCachePool === null ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
    }
    function getSuspendedCache() {
      var cacheFromPool = peekCacheFromPool();
      return cacheFromPool === null ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
    }
    var SuspenseException = Error(formatProdErrorMessage(460));
    var SuspenseyCommitException = Error(formatProdErrorMessage(474));
    var SuspenseActionException = Error(formatProdErrorMessage(542));
    var noopSuspenseyCommitThenable = { then: function() {} };
    function isThenableResolved(thenable) {
      thenable = thenable.status;
      return thenable === "fulfilled" || thenable === "rejected";
    }
    function trackUsedThenable(thenableState2, thenable, index2) {
      index2 = thenableState2[index2];
      index2 === undefined ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          thenableState2 = thenable.reason;
          checkIfUseWrappedInAsyncCatch(thenableState2);
          if (thenableState2 === undefined && !("reason" in thenable))
            throw Error(formatProdErrorMessage(600));
          throw thenableState2;
        default:
          if (typeof thenable.status === "string")
            thenable.then(noop$1, noop$1);
          else {
            thenableState2 = workInProgressRoot;
            if (thenableState2 !== null && 100 < thenableState2.shellSuspendCounter)
              throw Error(formatProdErrorMessage(482));
            thenableState2 = thenable;
            thenableState2.status = "pending";
            thenableState2.then(function(fulfilledValue) {
              if (thenable.status === "pending") {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            }, function(error) {
              if (thenable.status === "pending") {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            });
          }
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    function resolveLazy(lazyType) {
      try {
        var init = lazyType._init;
        return init(lazyType._payload);
      } catch (x) {
        if (x !== null && typeof x === "object" && typeof x.then === "function")
          throw suspendedThenable = x, SuspenseException;
        throw x;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (suspendedThenable === null)
        throw Error(formatProdErrorMessage(459));
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function checkIfUseWrappedInAsyncCatch(rejectedReason) {
      if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
        throw Error(formatProdErrorMessage(483));
    }
    var thenableState$1 = null;
    var thenableIndexCounter$1 = 0;
    function unwrapThenable(thenable) {
      var index2 = thenableIndexCounter$1;
      thenableIndexCounter$1 += 1;
      thenableState$1 === null && (thenableState$1 = []);
      return trackUsedThenable(thenableState$1, thenable, index2);
    }
    function coerceRef(workInProgress2, element) {
      element = element.props.ref;
      workInProgress2.ref = element !== undefined ? element : null;
    }
    function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
      if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
        throw Error(formatProdErrorMessage(525));
      returnFiber = Object.prototype.toString.call(newChild);
      throw Error(formatProdErrorMessage(31, returnFiber === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber));
    }
    function createChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (shouldTrackSideEffects) {
          var deletions = returnFiber.deletions;
          deletions === null ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
        }
      }
      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects)
          return null;
        for (;currentFirstChild !== null; )
          deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
        return null;
      }
      function mapRemainingChildren(currentFirstChild) {
        for (var existingChildren = new Map;currentFirstChild !== null; )
          currentFirstChild.key === null ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
        return existingChildren;
      }
      function useFiber(fiber, pendingProps) {
        fiber = createWorkInProgress(fiber, pendingProps);
        fiber.index = 0;
        fiber.sibling = null;
        return fiber;
      }
      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects)
          return newFiber.flags |= 1048576, lastPlacedIndex;
        newIndex = newFiber.alternate;
        if (newIndex !== null)
          return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
        newFiber.flags |= 134217730;
        return lastPlacedIndex;
      }
      function placeSingleChild(newFiber) {
        shouldTrackSideEffects && newFiber.alternate === null && (newFiber.flags |= 134217730);
        return newFiber;
      }
      function updateTextNode(returnFiber, current, textContent, lanes) {
        if (current === null || current.tag !== 6)
          return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
        current = useFiber(current, textContent);
        current.return = returnFiber;
        return current;
      }
      function updateElement(returnFiber, current, element, lanes) {
        var elementType = element.type;
        if (elementType === REACT_FRAGMENT_TYPE)
          return returnFiber = updateFragment(returnFiber, current, element.props.children, lanes, element.key), coerceRef(returnFiber, element), returnFiber;
        if (current !== null && (current.elementType === elementType || typeof elementType === "object" && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
          return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
        current = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
        coerceRef(current, element);
        current.return = returnFiber;
        return current;
      }
      function updatePortal(returnFiber, current, portal, lanes) {
        if (current === null || current.tag !== 4 || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
          return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
        current = useFiber(current, portal.children || []);
        current.return = returnFiber;
        return current;
      }
      function updateFragment(returnFiber, current, fragment, lanes, key) {
        if (current === null || current.tag !== 7)
          return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
        current = useFiber(current, fragment);
        current.return = returnFiber;
        return current;
      }
      function createChild(returnFiber, newChild, lanes) {
        if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint")
          return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
            case REACT_PORTAL_TYPE:
              return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
          if (typeof newChild.then === "function")
            return createChild(returnFiber, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function updateSlot(returnFiber, oldFiber, newChild, lanes) {
        var key = oldFiber !== null ? oldFiber.key : null;
        if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint")
          return key !== null ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
            case REACT_PORTAL_TYPE:
              return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return key !== null ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
          if (typeof newChild.then === "function")
            return updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
        if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint")
          return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return existingChildren = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
            case REACT_PORTAL_TYPE:
              return existingChildren = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
          if (typeof newChild.then === "function")
            return updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
        for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null;oldFiber !== null && newIdx < newChildren.length; newIdx++) {
          oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
          var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
          if (newFiber === null) {
            oldFiber === null && (oldFiber = nextOldFiber);
            break;
          }
          shouldTrackSideEffects && oldFiber && newFiber.alternate === null && deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          previousNewFiber === null ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (newIdx === newChildren.length)
          return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (oldFiber === null) {
          for (;newIdx < newChildren.length; newIdx++)
            oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), oldFiber !== null && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber);newIdx < newChildren.length; newIdx++)
          nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), nextOldFiber !== null && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, newFiber !== null && oldFiber.delete(newFiber.key === null ? newIdx : newFiber.key)), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
        shouldTrackSideEffects && oldFiber.forEach(function(child) {
          return deleteChild(returnFiber, child);
        });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
        if (newChildren == null)
          throw Error(formatProdErrorMessage(151));
        for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next();oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
          oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
          if (newFiber === null) {
            oldFiber === null && (oldFiber = nextOldFiber);
            break;
          }
          shouldTrackSideEffects && oldFiber && newFiber.alternate === null && deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          previousNewFiber === null ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (step.done)
          return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (oldFiber === null) {
          for (;!step.done; newIdx++, step = newChildren.next())
            step = createChild(returnFiber, step.value, lanes), step !== null && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber);!step.done; newIdx++, step = newChildren.next())
          step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), step !== null && (shouldTrackSideEffects && (nextOldFiber = step.alternate, nextOldFiber !== null && oldFiber.delete(nextOldFiber.key === null ? newIdx : nextOldFiber.key)), currentFirstChild = placeChild(step, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        shouldTrackSideEffects && oldFiber.forEach(function(child) {
          return deleteChild(returnFiber, child);
        });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
        typeof newChild === "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null && newChild.props.ref === undefined && (newChild = newChild.props.children);
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              a: {
                for (var key = newChild.key;currentFirstChild !== null; ) {
                  if (currentFirstChild.key === key) {
                    key = newChild.type;
                    if (key === REACT_FRAGMENT_TYPE) {
                      if (currentFirstChild.tag === 7) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        lanes = useFiber(currentFirstChild, newChild.props.children);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      }
                    } else if (currentFirstChild.elementType === key || typeof key === "object" && key !== null && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                      lanes = useFiber(currentFirstChild, newChild.props);
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  } else
                    deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
              }
              return placeSingleChild(returnFiber);
            case REACT_PORTAL_TYPE:
              a: {
                for (key = newChild.key;currentFirstChild !== null; ) {
                  if (currentFirstChild.key === key)
                    if (currentFirstChild.tag === 4 && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                      lanes = useFiber(currentFirstChild, newChild.children || []);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    } else {
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    }
                  else
                    deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                lanes.return = returnFiber;
                returnFiber = lanes;
              }
              return placeSingleChild(returnFiber);
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
          }
          if (isArrayImpl(newChild))
            return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
          if (getIteratorFn(newChild)) {
            key = getIteratorFn(newChild);
            if (typeof key !== "function")
              throw Error(formatProdErrorMessage(150));
            newChild = key.call(newChild);
            return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
          }
          if (typeof newChild.then === "function")
            return reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint" ? (newChild = "" + newChild, currentFirstChild !== null && currentFirstChild.tag === 6 ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
      }
      return function(returnFiber, currentFirstChild, newChild, lanes) {
        try {
          thenableIndexCounter$1 = 0;
          var firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
          thenableState$1 = null;
          return firstChildFiber;
        } catch (x) {
          if (x === SuspenseException || x === SuspenseActionException)
            throw x;
          var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
          fiber.lanes = lanes;
          fiber.return = returnFiber;
          return fiber;
        } finally {}
      };
    }
    var reconcileChildFibers = createChildReconciler(true);
    var mountChildFibers = createChildReconciler(false);
    var hasForceUpdate = false;
    function initializeUpdateQueue(fiber) {
      fiber.updateQueue = {
        baseState: fiber.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function cloneUpdateQueue(current, workInProgress2) {
      current = current.updateQueue;
      workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
        baseState: current.baseState,
        firstBaseUpdate: current.firstBaseUpdate,
        lastBaseUpdate: current.lastBaseUpdate,
        shared: current.shared,
        callbacks: null
      });
    }
    function createUpdate(lane) {
      return { lane, tag: 0, payload: null, callback: null, next: null };
    }
    function enqueueUpdate(fiber, update, lane) {
      var updateQueue = fiber.updateQueue;
      if (updateQueue === null)
        return null;
      updateQueue = updateQueue.shared;
      if ((executionContext & 2) !== 0) {
        var pending = updateQueue.pending;
        pending === null ? update.next = update : (update.next = pending.next, pending.next = update);
        updateQueue.pending = update;
        update = getRootForUpdatedFiber(fiber);
        markUpdateLaneFromFiberToRoot(fiber, null, lane);
        return update;
      }
      enqueueUpdate$1(fiber, updateQueue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function entangleTransitions(root2, fiber, lane) {
      fiber = fiber.updateQueue;
      if (fiber !== null && (fiber = fiber.shared, (lane & 4194048) !== 0)) {
        var queueLanes = fiber.lanes;
        queueLanes &= root2.pendingLanes;
        lane |= queueLanes;
        fiber.lanes = lane;
        markRootEntangled(root2, lane);
      }
    }
    function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
      var { updateQueue: queue, alternate: current } = workInProgress2;
      if (current !== null && (current = current.updateQueue, queue === current)) {
        var newFirst = null, newLast = null;
        queue = queue.firstBaseUpdate;
        if (queue !== null) {
          do {
            var clone = {
              lane: queue.lane,
              tag: queue.tag,
              payload: queue.payload,
              callback: null,
              next: null
            };
            newLast === null ? newFirst = newLast = clone : newLast = newLast.next = clone;
            queue = queue.next;
          } while (queue !== null);
          newLast === null ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
        } else
          newFirst = newLast = capturedUpdate;
        queue = {
          baseState: current.baseState,
          firstBaseUpdate: newFirst,
          lastBaseUpdate: newLast,
          shared: current.shared,
          callbacks: current.callbacks
        };
        workInProgress2.updateQueue = queue;
        return;
      }
      workInProgress2 = queue.lastBaseUpdate;
      workInProgress2 === null ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
      queue.lastBaseUpdate = capturedUpdate;
    }
    var didReadFromEntangledAsyncAction = false;
    function suspendIfUpdateReadFromEntangledAsyncAction() {
      if (didReadFromEntangledAsyncAction) {
        var entangledActionThenable = currentEntangledActionThenable;
        if (entangledActionThenable !== null)
          throw entangledActionThenable;
      }
    }
    function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
      didReadFromEntangledAsyncAction = false;
      var queue = workInProgress$jscomp$0.updateQueue;
      hasForceUpdate = false;
      var { firstBaseUpdate, lastBaseUpdate } = queue, pendingQueue = queue.shared.pending;
      if (pendingQueue !== null) {
        queue.shared.pending = null;
        var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
        lastPendingUpdate.next = null;
        lastBaseUpdate === null ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
        lastBaseUpdate = lastPendingUpdate;
        var current = workInProgress$jscomp$0.alternate;
        current !== null && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (pendingQueue === null ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
      }
      if (firstBaseUpdate !== null) {
        var newState = queue.baseState;
        lastBaseUpdate = 0;
        current = firstPendingUpdate = lastPendingUpdate = null;
        pendingQueue = firstBaseUpdate;
        do {
          var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
          if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
            updateLane !== 0 && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
            current !== null && (current = current.next = {
              lane: 0,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: null,
              next: null
            });
            a: {
              var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
              updateLane = props;
              var instance = instance$jscomp$0;
              switch (update.tag) {
                case 1:
                  workInProgress2 = update.payload;
                  if (typeof workInProgress2 === "function") {
                    newState = workInProgress2.call(instance, newState, updateLane);
                    break a;
                  }
                  newState = workInProgress2;
                  break a;
                case 3:
                  workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                case 0:
                  workInProgress2 = update.payload;
                  updateLane = typeof workInProgress2 === "function" ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                  if (updateLane === null || updateLane === undefined)
                    break a;
                  newState = assign({}, newState, updateLane);
                  break a;
                case 2:
                  hasForceUpdate = true;
              }
            }
            updateLane = pendingQueue.callback;
            updateLane !== null && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, isHiddenUpdate === null ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
          } else
            isHiddenUpdate = {
              lane: updateLane,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: pendingQueue.callback,
              next: null
            }, current === null ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
          pendingQueue = pendingQueue.next;
          if (pendingQueue === null)
            if (pendingQueue = queue.shared.pending, pendingQueue === null)
              break;
            else
              isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
        } while (1);
        current === null && (lastPendingUpdate = newState);
        queue.baseState = lastPendingUpdate;
        queue.firstBaseUpdate = firstPendingUpdate;
        queue.lastBaseUpdate = current;
        firstBaseUpdate === null && (queue.shared.lanes = 0);
        workInProgressRootSkippedLanes |= lastBaseUpdate;
        workInProgress$jscomp$0.lanes = lastBaseUpdate;
        workInProgress$jscomp$0.memoizedState = newState;
      }
    }
    function callCallback(callback, context) {
      if (typeof callback !== "function")
        throw Error(formatProdErrorMessage(191, callback));
      callback.call(context);
    }
    function commitCallbacks(updateQueue, context) {
      var callbacks = updateQueue.callbacks;
      if (callbacks !== null)
        for (updateQueue.callbacks = null, updateQueue = 0;updateQueue < callbacks.length; updateQueue++)
          callCallback(callbacks[updateQueue], context);
    }
    var currentTreeHiddenStackCursor = createCursor(null);
    var prevEntangledRenderLanesCursor = createCursor(0);
    function pushHiddenContext(fiber, context) {
      fiber = entangledRenderLanes;
      push(prevEntangledRenderLanesCursor, fiber);
      push(currentTreeHiddenStackCursor, context);
      entangledRenderLanes = fiber | context.baseLanes;
    }
    function reuseHiddenContextOnStack() {
      push(prevEntangledRenderLanesCursor, entangledRenderLanes);
      push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
    }
    function popHiddenContext() {
      entangledRenderLanes = prevEntangledRenderLanesCursor.current;
      pop(currentTreeHiddenStackCursor);
      pop(prevEntangledRenderLanesCursor);
    }
    var suspenseHandlerStackCursor = createCursor(null);
    var shellBoundary = null;
    function pushPrimaryTreeSuspenseHandler(handler) {
      var current = handler.alternate;
      push(suspenseStackCursor, suspenseStackCursor.current & 1);
      push(suspenseHandlerStackCursor, handler);
      shellBoundary === null && (current === null || currentTreeHiddenStackCursor.current !== null ? shellBoundary = handler : current.memoizedState !== null && (shellBoundary = handler));
    }
    function pushDehydratedActivitySuspenseHandler(fiber) {
      push(suspenseStackCursor, suspenseStackCursor.current);
      push(suspenseHandlerStackCursor, fiber);
      shellBoundary === null && (shellBoundary = fiber);
    }
    function pushOffscreenSuspenseHandler(fiber) {
      fiber.tag === 22 ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), shellBoundary === null && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
    }
    function reuseSuspenseHandlerOnStack() {
      push(suspenseStackCursor, suspenseStackCursor.current);
      push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
    }
    function popSuspenseHandler(fiber) {
      pop(suspenseHandlerStackCursor);
      shellBoundary === fiber && (shellBoundary = null);
      pop(suspenseStackCursor);
    }
    var suspenseStackCursor = createCursor(0);
    function pushSuspenseListContext(fiber, newContext) {
      push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
      push(suspenseStackCursor, newContext);
    }
    function popSuspenseListContext(fiber) {
      pop(suspenseStackCursor);
      pop(suspenseHandlerStackCursor);
      shellBoundary === fiber && (shellBoundary = null);
    }
    function findFirstSuspended(row) {
      for (var node = row;node !== null; ) {
        if (node.tag === 13) {
          var state = node.memoizedState;
          if (state !== null && (state = state.dehydrated, state === null || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
            return node;
        } else if (node.tag === 19 && node.memoizedProps.revealOrder !== "independent") {
          if ((node.flags & 128) !== 0)
            return node;
        } else if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === row)
          break;
        for (;node.sibling === null; ) {
          if (node.return === null || node.return === row)
            return null;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      return null;
    }
    var renderLanes = 0;
    var currentlyRenderingFiber = null;
    var currentHook = null;
    var workInProgressHook = null;
    var didScheduleRenderPhaseUpdate = false;
    var didScheduleRenderPhaseUpdateDuringThisPass = false;
    var shouldDoubleInvokeUserFnsInHooksDEV = false;
    var localIdCounter = 0;
    var thenableIndexCounter = 0;
    var thenableState = null;
    var globalClientIdCounter = 0;
    function throwInvalidHookError() {
      throw Error(formatProdErrorMessage(321));
    }
    function areHookInputsEqual(nextDeps, prevDeps) {
      if (prevDeps === null)
        return false;
      for (var i = 0;i < prevDeps.length && i < nextDeps.length; i++)
        if (!objectIs(nextDeps[i], prevDeps[i]))
          return false;
      return true;
    }
    function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
      renderLanes = nextRenderLanes;
      currentlyRenderingFiber = workInProgress2;
      workInProgress2.memoizedState = null;
      workInProgress2.updateQueue = null;
      workInProgress2.lanes = 0;
      ReactSharedInternals.H = current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
      shouldDoubleInvokeUserFnsInHooksDEV = false;
      nextRenderLanes = Component(props, secondArg);
      shouldDoubleInvokeUserFnsInHooksDEV = false;
      didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(workInProgress2, Component, props, secondArg));
      finishRenderingHooks(current);
      return nextRenderLanes;
    }
    function finishRenderingHooks(current) {
      ReactSharedInternals.H = ContextOnlyDispatcher;
      var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber = null;
      didScheduleRenderPhaseUpdate = false;
      thenableIndexCounter = 0;
      thenableState = null;
      if (didRenderTooFewHooks)
        throw Error(formatProdErrorMessage(300));
      current === null || didReceiveUpdate || (current = current.dependencies, current !== null && checkIfContextChanged(current) && (didReceiveUpdate = true));
    }
    function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
      currentlyRenderingFiber = workInProgress2;
      var numberOfReRenders = 0;
      do {
        didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
        thenableIndexCounter = 0;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        if (25 <= numberOfReRenders)
          throw Error(formatProdErrorMessage(301));
        numberOfReRenders += 1;
        workInProgressHook = currentHook = null;
        if (workInProgress2.updateQueue != null) {
          var children = workInProgress2.updateQueue;
          children.lastEffect = null;
          children.events = null;
          children.stores = null;
          children.memoCache != null && (children.memoCache.index = 0);
        }
        ReactSharedInternals.H = HooksDispatcherOnRerender;
        children = Component(props, secondArg);
      } while (didScheduleRenderPhaseUpdateDuringThisPass);
      return children;
    }
    function TransitionAwareHostComponent() {
      var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
      maybeThenable = typeof maybeThenable.then === "function" ? useThenable(maybeThenable) : maybeThenable;
      dispatcher = dispatcher.useState()[0];
      (currentHook !== null ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
      return maybeThenable;
    }
    function checkDidRenderIdHook() {
      var didRenderIdHook = localIdCounter !== 0;
      localIdCounter = 0;
      return didRenderIdHook;
    }
    function bailoutHooks(current, workInProgress2, lanes) {
      workInProgress2.updateQueue = current.updateQueue;
      workInProgress2.flags &= -2053;
      current.lanes &= ~lanes;
    }
    function resetHooksOnUnwind(workInProgress2) {
      if (didScheduleRenderPhaseUpdate) {
        for (workInProgress2 = workInProgress2.memoizedState;workInProgress2 !== null; ) {
          var queue = workInProgress2.queue;
          queue !== null && (queue.pending = null);
          workInProgress2 = workInProgress2.next;
        }
        didScheduleRenderPhaseUpdate = false;
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber = null;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      thenableIndexCounter = localIdCounter = 0;
      thenableState = null;
    }
    function mountWorkInProgressHook() {
      var hook = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      workInProgressHook === null ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
      return workInProgressHook;
    }
    function updateWorkInProgressHook() {
      if (currentHook === null) {
        var nextCurrentHook = currentlyRenderingFiber.alternate;
        nextCurrentHook = nextCurrentHook !== null ? nextCurrentHook.memoizedState : null;
      } else
        nextCurrentHook = currentHook.next;
      var nextWorkInProgressHook = workInProgressHook === null ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
      if (nextWorkInProgressHook !== null)
        workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
      else {
        if (nextCurrentHook === null) {
          if (currentlyRenderingFiber.alternate === null)
            throw Error(formatProdErrorMessage(467));
          throw Error(formatProdErrorMessage(310));
        }
        currentHook = nextCurrentHook;
        nextCurrentHook = {
          memoizedState: currentHook.memoizedState,
          baseState: currentHook.baseState,
          baseQueue: currentHook.baseQueue,
          queue: currentHook.queue,
          next: null
        };
        workInProgressHook === null ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
      }
      return workInProgressHook;
    }
    function createFunctionComponentUpdateQueue() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function useThenable(thenable) {
      var index2 = thenableIndexCounter;
      thenableIndexCounter += 1;
      thenableState === null && (thenableState = []);
      thenable = trackUsedThenable(thenableState, thenable, index2);
      index2 = currentlyRenderingFiber;
      (workInProgressHook === null ? index2.memoizedState : workInProgressHook.next) === null && (index2 = index2.alternate, ReactSharedInternals.H = index2 === null || index2.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
      return thenable;
    }
    function use(usable) {
      if (usable !== null && typeof usable === "object") {
        if (typeof usable.then === "function")
          return useThenable(usable);
        if (usable.$$typeof === REACT_RECOVERABLE_TYPE)
          return;
        if (usable.$$typeof === REACT_CONTEXT_TYPE)
          return readContext(usable);
      }
      throw Error(formatProdErrorMessage(438, String(usable)));
    }
    function useMemoCache(size) {
      var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
      updateQueue !== null && (memoCache = updateQueue.memoCache);
      if (memoCache == null) {
        var current = currentlyRenderingFiber.alternate;
        current !== null && (current = current.updateQueue, current !== null && (current = current.memoCache, current != null && (memoCache = {
          data: current.data.map(function(array) {
            return array.slice();
          }),
          index: 0
        })));
      }
      memoCache == null && (memoCache = { data: [], index: 0 });
      updateQueue === null && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
      updateQueue.memoCache = memoCache;
      updateQueue = memoCache.data[memoCache.index];
      if (updateQueue === undefined)
        for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0;current < size; current++)
          updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
      memoCache.index++;
      return updateQueue;
    }
    function basicStateReducer(state, action) {
      return typeof action === "function" ? action(state) : action;
    }
    function updateReducer(reducer) {
      var hook = updateWorkInProgressHook();
      return updateReducerImpl(hook, currentHook, reducer);
    }
    function updateReducerImpl(hook, current, reducer) {
      var queue = hook.queue;
      if (queue === null)
        throw Error(formatProdErrorMessage(311));
      queue.lastRenderedReducer = reducer;
      var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
      if (pendingQueue !== null) {
        if (baseQueue !== null) {
          var baseFirst = baseQueue.next;
          baseQueue.next = pendingQueue.next;
          pendingQueue.next = baseFirst;
        }
        current.baseQueue = baseQueue = pendingQueue;
        queue.pending = null;
      }
      pendingQueue = hook.baseState;
      if (baseQueue === null)
        hook.memoizedState = pendingQueue;
      else {
        current = baseQueue.next;
        var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = false;
        do {
          var updateLane = update.lane & -536870913;
          if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
            var revertLane = update.revertLane;
            if (revertLane === 0)
              newBaseQueueLast !== null && (newBaseQueueLast = newBaseQueueLast.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
            else if ((renderLanes & revertLane) === revertLane) {
              update = update.next;
              revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
              continue;
            } else
              updateLane = {
                lane: 0,
                revertLane: update.revertLane,
                gesture: null,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, newBaseQueueLast === null ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
            updateLane = update.action;
            shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
            pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
          } else
            revertLane = {
              lane: updateLane,
              revertLane: update.revertLane,
              gesture: update.gesture,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, newBaseQueueLast === null ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
          update = update.next;
        } while (update !== null && update !== current);
        newBaseQueueLast === null ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
        if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, reducer !== null)))
          throw reducer;
        hook.memoizedState = pendingQueue;
        hook.baseState = baseFirst;
        hook.baseQueue = newBaseQueueLast;
        queue.lastRenderedState = pendingQueue;
      }
      baseQueue === null && (queue.lanes = 0);
      return [hook.memoizedState, queue.dispatch];
    }
    function rerenderReducer(reducer) {
      var hook = updateWorkInProgressHook(), queue = hook.queue;
      if (queue === null)
        throw Error(formatProdErrorMessage(311));
      queue.lastRenderedReducer = reducer;
      var { dispatch, pending: lastRenderPhaseUpdate } = queue, newState = hook.memoizedState;
      if (lastRenderPhaseUpdate !== null) {
        queue.pending = null;
        var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
        do
          newState = reducer(newState, update.action), update = update.next;
        while (update !== lastRenderPhaseUpdate);
        objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
        hook.memoizedState = newState;
        hook.baseQueue === null && (hook.baseState = newState);
        queue.lastRenderedState = newState;
      }
      return [newState, dispatch];
    }
    function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
      if (isHydrating$jscomp$0) {
        if (getServerSnapshot === undefined)
          throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else
        getServerSnapshot = getSnapshot();
      var snapshotChanged = !objectIs((currentHook || hook).memoizedState, getServerSnapshot);
      snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
      hook = hook.queue;
      updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
        subscribe
      ]);
      subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || workInProgressHook !== null && (workInProgressHook.memoizedState.tag & 1) !== 0;
      pushSimpleEffect(subscribe ? 9 : 8, { destroy: undefined }, updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot), null);
      if (subscribe) {
        fiber.flags |= 2048;
        if (workInProgressRoot === null)
          throw Error(formatProdErrorMessage(349));
        isHydrating$jscomp$0 || (renderLanes & 127) !== 0 || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      return getServerSnapshot;
    }
    function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
      fiber.flags |= 16384;
      fiber = { getSnapshot, value: renderedSnapshot };
      getSnapshot = currentlyRenderingFiber.updateQueue;
      getSnapshot === null ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, renderedSnapshot === null ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
    }
    function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
      inst.value = nextSnapshot;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    }
    function subscribeToStore(fiber, inst, subscribe) {
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      });
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function forceStoreRerender(fiber) {
      var root2 = enqueueConcurrentRenderForLane(fiber, 2);
      root2 !== null && scheduleUpdateOnFiber(root2, fiber, 2);
    }
    function mountStateImpl(initialState) {
      var hook = mountWorkInProgressHook();
      if (typeof initialState === "function") {
        var initialStateInitializer = initialState;
        initialState = initialStateInitializer();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            initialStateInitializer();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      }
      hook.memoizedState = hook.baseState = initialState;
      hook.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      return hook;
    }
    function updateOptimisticImpl(hook, current, passthrough, reducer) {
      hook.baseState = passthrough;
      return updateReducerImpl(hook, currentHook, typeof reducer === "function" ? reducer : basicStateReducer);
    }
    function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
      if (isRenderPhaseUpdate(fiber))
        throw Error(formatProdErrorMessage(485));
      fiber = actionQueue.action;
      if (fiber !== null) {
        var actionNode = {
          payload,
          action: fiber,
          next: null,
          isTransition: true,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(listener) {
            actionNode.listeners.push(listener);
          }
        };
        ReactSharedInternals.T !== null ? setPendingState(true) : actionNode.isTransition = false;
        setState(actionNode);
        setPendingState = actionQueue.pending;
        setPendingState === null ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
      }
    }
    function runActionStateAction(actionQueue, node) {
      var { action, payload } = node, prevState = actionQueue.state;
      if (node.isTransition) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition.types = prevTransition !== null ? prevTransition.types : null;
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
          onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
          handleActionReturnValue(actionQueue, node, returnValue);
        } catch (error) {
          onActionError(actionQueue, node, error);
        } finally {
          prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      } else
        try {
          prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
        } catch (error$70) {
          onActionError(actionQueue, node, error$70);
        }
    }
    function handleActionReturnValue(actionQueue, node, returnValue) {
      returnValue !== null && typeof returnValue === "object" && typeof returnValue.then === "function" ? returnValue.then(function(nextState) {
        onActionSuccess(actionQueue, node, nextState);
      }, function(error) {
        return onActionError(actionQueue, node, error);
      }) : onActionSuccess(actionQueue, node, returnValue);
    }
    function onActionSuccess(actionQueue, actionNode, nextState) {
      actionNode.status = "fulfilled";
      actionNode.value = nextState;
      notifyActionListeners(actionNode);
      actionQueue.state = nextState;
      actionNode = actionQueue.pending;
      actionNode !== null && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
    }
    function onActionError(actionQueue, actionNode, error) {
      var last = actionQueue.pending;
      actionQueue.pending = null;
      if (last !== null) {
        last = last.next;
        do
          actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
        while (actionNode !== last);
      }
      actionQueue.action = null;
    }
    function notifyActionListeners(actionNode) {
      actionNode = actionNode.listeners;
      for (var i = 0;i < actionNode.length; i++)
        (0, actionNode[i])();
    }
    function actionStateReducer(oldState, newState) {
      return newState;
    }
    function mountActionState(action, initialStateProp) {
      if (isHydrating) {
        var ssrFormState = workInProgressRoot.formState;
        if (ssrFormState !== null) {
          a: {
            var JSCompiler_inline_result = currentlyRenderingFiber;
            if (isHydrating) {
              if (nextHydratableInstance) {
                b: {
                  var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                  for (var inRootOrSingleton = rootOrSingletonContext;JSCompiler_inline_result$jscomp$0.nodeType !== 8; ) {
                    if (!inRootOrSingleton) {
                      JSCompiler_inline_result$jscomp$0 = null;
                      break b;
                    }
                    JSCompiler_inline_result$jscomp$0 = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
                    if (JSCompiler_inline_result$jscomp$0 === null) {
                      JSCompiler_inline_result$jscomp$0 = null;
                      break b;
                    }
                  }
                  inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                  JSCompiler_inline_result$jscomp$0 = inRootOrSingleton === "F!" || inRootOrSingleton === "F" ? JSCompiler_inline_result$jscomp$0 : null;
                }
                if (JSCompiler_inline_result$jscomp$0) {
                  nextHydratableInstance = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
                  JSCompiler_inline_result = JSCompiler_inline_result$jscomp$0.data === "F!";
                  break a;
                }
              }
              throwOnHydrationMismatch(JSCompiler_inline_result);
            }
            JSCompiler_inline_result = false;
          }
          JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
        }
      }
      ssrFormState = mountWorkInProgressHook();
      ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
      JSCompiler_inline_result = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: actionStateReducer,
        lastRenderedState: initialStateProp
      };
      ssrFormState.queue = JSCompiler_inline_result;
      ssrFormState = dispatchSetState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result);
      JSCompiler_inline_result.dispatch = ssrFormState;
      JSCompiler_inline_result = mountStateImpl(false);
      inRootOrSingleton = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, false, JSCompiler_inline_result.queue);
      JSCompiler_inline_result = mountWorkInProgressHook();
      JSCompiler_inline_result$jscomp$0 = {
        state: initialStateProp,
        dispatch: null,
        action,
        pending: null
      };
      JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
      ssrFormState = dispatchActionState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result$jscomp$0, inRootOrSingleton, ssrFormState);
      JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
      JSCompiler_inline_result.memoizedState = action;
      return [initialStateProp, ssrFormState, false];
    }
    function updateActionState(action) {
      var stateHook = updateWorkInProgressHook();
      return updateActionStateImpl(stateHook, currentHook, action);
    }
    function updateActionStateImpl(stateHook, currentStateHook, action) {
      currentStateHook = updateReducerImpl(stateHook, currentStateHook, actionStateReducer)[0];
      stateHook = updateReducer(basicStateReducer)[0];
      if (typeof currentStateHook === "object" && currentStateHook !== null && typeof currentStateHook.then === "function")
        try {
          var state = useThenable(currentStateHook);
        } catch (x) {
          if (x === SuspenseException)
            throw SuspenseActionException;
          throw x;
        }
      else
        state = currentStateHook;
      currentStateHook = updateWorkInProgressHook();
      var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
      action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(9, { destroy: undefined }, actionStateActionEffect.bind(null, actionQueue, action), null));
      return [state, dispatch, stateHook];
    }
    function actionStateActionEffect(actionQueue, action) {
      actionQueue.action = action;
    }
    function rerenderActionState(action) {
      var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
      if (currentStateHook !== null)
        return updateActionStateImpl(stateHook, currentStateHook, action);
      updateWorkInProgressHook();
      stateHook = stateHook.memoizedState;
      currentStateHook = updateWorkInProgressHook();
      var dispatch = currentStateHook.queue.dispatch;
      currentStateHook.memoizedState = action;
      return [stateHook, dispatch, false];
    }
    function pushSimpleEffect(tag, inst, create, deps) {
      tag = { tag, create, deps, inst, next: null };
      inst = currentlyRenderingFiber.updateQueue;
      inst === null && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
      create = inst.lastEffect;
      create === null ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
      return tag;
    }
    function updateRef() {
      return updateWorkInProgressHook().memoizedState;
    }
    function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = mountWorkInProgressHook();
      currentlyRenderingFiber.flags |= fiberFlags;
      hook.memoizedState = pushSimpleEffect(1 | hookFlags, { destroy: undefined }, create, deps === undefined ? null : deps);
    }
    function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = updateWorkInProgressHook();
      deps = deps === undefined ? null : deps;
      var inst = hook.memoizedState.inst;
      currentHook !== null && deps !== null && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(1 | hookFlags, inst, create, deps));
    }
    function mountEffect(create, deps) {
      mountEffectImpl(8390656, 8, create, deps);
    }
    function updateEffect(create, deps) {
      updateEffectImpl(2048, 8, create, deps);
    }
    function useEffectEventImpl(payload) {
      currentlyRenderingFiber.flags |= 4;
      var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
      if (componentUpdateQueue === null)
        componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
      else {
        var events = componentUpdateQueue.events;
        events === null ? componentUpdateQueue.events = [payload] : events.push(payload);
      }
    }
    function updateEvent(callback) {
      var ref = updateWorkInProgressHook().memoizedState;
      useEffectEventImpl({ ref, nextImpl: callback });
      return function() {
        if ((executionContext & 2) !== 0)
          throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(undefined, arguments);
      };
    }
    function updateInsertionEffect(create, deps) {
      return updateEffectImpl(4, 2, create, deps);
    }
    function updateLayoutEffect(create, deps) {
      return updateEffectImpl(4, 4, create, deps);
    }
    function imperativeHandleEffect(create, ref) {
      if (typeof ref === "function") {
        create = create();
        var refCleanup = ref(create);
        return function() {
          typeof refCleanup === "function" ? refCleanup() : ref(null);
        };
      }
      if (ref !== null && ref !== undefined)
        return create = create(), ref.current = create, function() {
          ref.current = null;
        };
    }
    function updateImperativeHandle(ref, create, deps) {
      deps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
      updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
    }
    function mountDebugValue() {}
    function updateCallback(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = deps === undefined ? null : deps;
      var prevState = hook.memoizedState;
      if (deps !== null && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    }
    function updateMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = deps === undefined ? null : deps;
      var prevState = hook.memoizedState;
      if (deps !== null && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      prevState = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [prevState, deps];
      return prevState;
    }
    function mountDeferredValueImpl(hook, value, initialValue) {
      if (initialValue === undefined || (renderLanes & 1073741824) !== 0 && (workInProgressRootRenderLanes & 261930) === 0)
        return hook.memoizedState = value;
      hook.memoizedState = initialValue;
      hook = requestDeferredLane();
      currentlyRenderingFiber.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return initialValue;
    }
    function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
      if (objectIs(value, prevValue))
        return value;
      if (currentTreeHiddenStackCursor.current !== null)
        return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
      if ((renderLanes & 106) === 0 || (renderLanes & 1073741824) !== 0 && (workInProgressRootRenderLanes & 261930) === 0)
        return didReceiveUpdate = true, hook.memoizedState = value;
      hook = requestDeferredLane();
      currentlyRenderingFiber.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return prevValue;
    }
    function startTransition(fiber, queue, pendingState, finishedState, callback) {
      var previousPriority = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = previousPriority !== 0 && 8 > previousPriority ? previousPriority : 8;
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = prevTransition !== null ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      dispatchOptimisticSetState(fiber, false, queue, pendingState);
      try {
        var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        if (returnValue !== null && typeof returnValue === "object" && typeof returnValue.then === "function") {
          var thenableForFinishedState = chainThenableValue(returnValue, finishedState);
          dispatchSetStateInternal(fiber, queue, thenableForFinishedState, requestUpdateLane(fiber));
        } else
          dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
      } catch (error) {
        dispatchSetStateInternal(fiber, queue, { then: function() {}, status: "rejected", reason: error }, requestUpdateLane());
      } finally {
        ReactDOMSharedInternals.p = previousPriority, prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    }
    function noop() {}
    function startHostTransition(formFiber, pendingState, action, formData) {
      if (formFiber.tag !== 5)
        throw Error(formatProdErrorMessage(476));
      var queue = ensureFormComponentIsStateful(formFiber).queue;
      startTransition(formFiber, queue, pendingState, sharedNotPendingObject, action === null ? noop : function() {
        requestFormReset$1(formFiber);
        return action(formData);
      });
    }
    function ensureFormComponentIsStateful(formFiber) {
      var existingStateHook = formFiber.memoizedState;
      if (existingStateHook !== null)
        return existingStateHook;
      existingStateHook = {
        memoizedState: sharedNotPendingObject,
        baseState: sharedNotPendingObject,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: sharedNotPendingObject
        },
        next: null
      };
      var initialResetState = {};
      existingStateHook.next = {
        memoizedState: initialResetState,
        baseState: initialResetState,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialResetState
        },
        next: null
      };
      formFiber.memoizedState = existingStateHook;
      formFiber = formFiber.alternate;
      formFiber !== null && (formFiber.memoizedState = existingStateHook);
      return existingStateHook;
    }
    function requestFormReset$1(formFiber) {
      var stateHook = ensureFormComponentIsStateful(formFiber);
      stateHook.next === null && (stateHook = formFiber.alternate.memoizedState);
      dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane());
    }
    function useHostTransitionStatus() {
      return readContext(HostTransitionContext);
    }
    function updateId() {
      return updateWorkInProgressHook().memoizedState;
    }
    function updateRefresh() {
      return updateWorkInProgressHook().memoizedState;
    }
    function refreshCache(fiber) {
      for (var provider = fiber.return;provider !== null; ) {
        switch (provider.tag) {
          case 24:
          case 3:
            var lane = requestUpdateLane();
            fiber = createUpdate(lane);
            var root$73 = enqueueUpdate(provider, fiber, lane);
            root$73 !== null && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
            provider = { cache: createCache() };
            fiber.payload = provider;
            return;
        }
        provider = provider.return;
      }
    }
    function dispatchReducerAction(fiber, queue, action) {
      var lane = requestUpdateLane();
      action = {
        lane,
        revertLane: 0,
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), action !== null && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
    }
    function dispatchSetState(fiber, queue, action) {
      var lane = requestUpdateLane();
      dispatchSetStateInternal(fiber, queue, action, lane);
    }
    function dispatchSetStateInternal(fiber, queue, action, lane) {
      var update = {
        lane,
        revertLane: 0,
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber))
        enqueueRenderPhaseUpdate(queue, update);
      else {
        var alternate = fiber.alternate;
        if (fiber.lanes === 0 && (alternate === null || alternate.lanes === 0) && (alternate = queue.lastRenderedReducer, alternate !== null))
          try {
            var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
            update.hasEagerState = true;
            update.eagerState = eagerState;
            if (objectIs(eagerState, currentState))
              return enqueueUpdate$1(fiber, queue, update, 0), workInProgressRoot === null && finishQueueingConcurrentUpdates(), false;
          } catch (error) {} finally {}
        action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
        if (action !== null)
          return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
      }
      return false;
    }
    function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
      action = {
        lane: 2,
        revertLane: requestTransitionLane(),
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber)) {
        if (throwIfDuringRender)
          throw Error(formatProdErrorMessage(479));
      } else
        throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), throwIfDuringRender !== null && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
    }
    function isRenderPhaseUpdate(fiber) {
      var alternate = fiber.alternate;
      return fiber === currentlyRenderingFiber || alternate !== null && alternate === currentlyRenderingFiber;
    }
    function enqueueRenderPhaseUpdate(queue, update) {
      didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
      var pending = queue.pending;
      pending === null ? update.next = update : (update.next = pending.next, pending.next = update);
      queue.pending = update;
    }
    function entangleTransitionUpdate(root2, queue, lane) {
      if ((lane & 4194048) !== 0) {
        var queueLanes = queue.lanes;
        queueLanes &= root2.pendingLanes;
        lane |= queueLanes;
        queue.lanes = lane;
        markRootEntangled(root2, lane);
      }
    }
    var ContextOnlyDispatcher = {
      readContext,
      use,
      useCallback: throwInvalidHookError,
      useContext: throwInvalidHookError,
      useEffect: throwInvalidHookError,
      useImperativeHandle: throwInvalidHookError,
      useLayoutEffect: throwInvalidHookError,
      useInsertionEffect: throwInvalidHookError,
      useMemo: throwInvalidHookError,
      useReducer: throwInvalidHookError,
      useRef: throwInvalidHookError,
      useState: throwInvalidHookError,
      useDebugValue: throwInvalidHookError,
      useDeferredValue: throwInvalidHookError,
      useTransition: throwInvalidHookError,
      useSyncExternalStore: throwInvalidHookError,
      useId: throwInvalidHookError,
      useHostTransitionStatus: throwInvalidHookError,
      useFormState: throwInvalidHookError,
      useActionState: throwInvalidHookError,
      useOptimistic: throwInvalidHookError,
      useMemoCache: throwInvalidHookError,
      useCacheRefresh: throwInvalidHookError,
      useEffectEvent: throwInvalidHookError
    };
    var HooksDispatcherOnMount = {
      readContext,
      use,
      useCallback: function(callback, deps) {
        mountWorkInProgressHook().memoizedState = [
          callback,
          deps === undefined ? null : deps
        ];
        return callback;
      },
      useContext: readContext,
      useEffect: mountEffect,
      useImperativeHandle: function(ref, create, deps) {
        deps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
        mountEffectImpl(4194308, 4, imperativeHandleEffect.bind(null, create, ref), deps);
      },
      useLayoutEffect: function(create, deps) {
        return mountEffectImpl(4194308, 4, create, deps);
      },
      useInsertionEffect: function(create, deps) {
        mountEffectImpl(4, 2, create, deps);
      },
      useMemo: function(nextCreate, deps) {
        var hook = mountWorkInProgressHook();
        deps = deps === undefined ? null : deps;
        var nextValue = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [nextValue, deps];
        return nextValue;
      },
      useReducer: function(reducer, initialArg, init) {
        var hook = mountWorkInProgressHook();
        if (init !== undefined) {
          var initialState = init(initialArg);
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              init(initialArg);
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        } else
          initialState = initialArg;
        hook.memoizedState = hook.baseState = initialState;
        reducer = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: reducer,
          lastRenderedState: initialState
        };
        hook.queue = reducer;
        reducer = reducer.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, reducer);
        return [hook.memoizedState, reducer];
      },
      useRef: function(initialValue) {
        var hook = mountWorkInProgressHook();
        initialValue = { current: initialValue };
        return hook.memoizedState = initialValue;
      },
      useState: function(initialState) {
        initialState = mountStateImpl(initialState);
        var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
        queue.dispatch = dispatch;
        return [initialState.memoizedState, dispatch];
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = mountWorkInProgressHook();
        return mountDeferredValueImpl(hook, value, initialValue);
      },
      useTransition: function() {
        var stateHook = mountStateImpl(false);
        stateHook = startTransition.bind(null, currentlyRenderingFiber, stateHook.queue, true, false);
        mountWorkInProgressHook().memoizedState = stateHook;
        return [false, stateHook];
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
        if (isHydrating) {
          if (getServerSnapshot === undefined)
            throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else {
          getServerSnapshot = getSnapshot();
          if (workInProgressRoot === null)
            throw Error(formatProdErrorMessage(349));
          (workInProgressRootRenderLanes & 127) !== 0 || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        hook.memoizedState = getServerSnapshot;
        var inst = { value: getServerSnapshot, getSnapshot };
        hook.queue = inst;
        mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
          subscribe
        ]);
        fiber.flags |= 2048;
        pushSimpleEffect(9, { destroy: undefined }, updateStoreInstance.bind(null, fiber, inst, getServerSnapshot, getSnapshot), null);
        return getServerSnapshot;
      },
      useId: function() {
        var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
        if (isHydrating) {
          var JSCompiler_inline_result = treeContextOverflow;
          var idWithLeadingBit = treeContextId;
          JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
          identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
          JSCompiler_inline_result = localIdCounter++;
          0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
          identifierPrefix += "_";
        } else
          JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
        return hook.memoizedState = identifierPrefix;
      },
      useHostTransitionStatus,
      useFormState: mountActionState,
      useActionState: mountActionState,
      useOptimistic: function(passthrough) {
        var hook = mountWorkInProgressHook();
        hook.memoizedState = hook.baseState = passthrough;
        var queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        hook.queue = queue;
        hook = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, true, queue);
        queue.dispatch = hook;
        return [passthrough, hook];
      },
      useMemoCache,
      useCacheRefresh: function() {
        return mountWorkInProgressHook().memoizedState = refreshCache.bind(null, currentlyRenderingFiber);
      },
      useEffectEvent: function(callback) {
        var hook = mountWorkInProgressHook(), ref = { impl: callback };
        hook.memoizedState = ref;
        return function() {
          if ((executionContext & 2) !== 0)
            throw Error(formatProdErrorMessage(440));
          return ref.impl.apply(undefined, arguments);
        };
      }
    };
    var HooksDispatcherOnUpdate = {
      readContext,
      use,
      useCallback: updateCallback,
      useContext: readContext,
      useEffect: updateEffect,
      useImperativeHandle: updateImperativeHandle,
      useInsertionEffect: updateInsertionEffect,
      useLayoutEffect: updateLayoutEffect,
      useMemo: updateMemo,
      useReducer: updateReducer,
      useRef: updateRef,
      useState: function() {
        return updateReducer(basicStateReducer);
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
      },
      useTransition: function() {
        var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          typeof booleanOrThenable === "boolean" ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      },
      useSyncExternalStore: updateSyncExternalStore,
      useId: updateId,
      useHostTransitionStatus,
      useFormState: updateActionState,
      useActionState: updateActionState,
      useOptimistic: function(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      },
      useMemoCache,
      useCacheRefresh: updateRefresh,
      useEffectEvent: updateEvent
    };
    var HooksDispatcherOnRerender = {
      readContext,
      use,
      useCallback: updateCallback,
      useContext: readContext,
      useEffect: updateEffect,
      useImperativeHandle: updateImperativeHandle,
      useInsertionEffect: updateInsertionEffect,
      useLayoutEffect: updateLayoutEffect,
      useMemo: updateMemo,
      useReducer: rerenderReducer,
      useRef: updateRef,
      useState: function() {
        return rerenderReducer(basicStateReducer);
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return currentHook === null ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
      },
      useTransition: function() {
        var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          typeof booleanOrThenable === "boolean" ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      },
      useSyncExternalStore: updateSyncExternalStore,
      useId: updateId,
      useHostTransitionStatus,
      useFormState: rerenderActionState,
      useActionState: rerenderActionState,
      useOptimistic: function(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        if (currentHook !== null)
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        hook.baseState = passthrough;
        return [passthrough, hook.queue.dispatch];
      },
      useMemoCache,
      useCacheRefresh: updateRefresh,
      useEffectEvent: updateEvent
    };
    function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
      ctor = workInProgress2.memoizedState;
      getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
      getDerivedStateFromProps = getDerivedStateFromProps === null || getDerivedStateFromProps === undefined ? ctor : assign({}, ctor, getDerivedStateFromProps);
      workInProgress2.memoizedState = getDerivedStateFromProps;
      workInProgress2.lanes === 0 && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
    }
    var classComponentUpdater = {
      enqueueSetState: function(inst, payload, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.payload = payload;
        callback !== undefined && callback !== null && (update.callback = callback);
        payload = enqueueUpdate(inst, update, lane);
        payload !== null && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
      },
      enqueueReplaceState: function(inst, payload, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.tag = 1;
        update.payload = payload;
        callback !== undefined && callback !== null && (update.callback = callback);
        payload = enqueueUpdate(inst, update, lane);
        payload !== null && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
      },
      enqueueForceUpdate: function(inst, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.tag = 2;
        callback !== undefined && callback !== null && (update.callback = callback);
        callback = enqueueUpdate(inst, update, lane);
        callback !== null && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
      }
    };
    function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
      workInProgress2 = workInProgress2.stateNode;
      return typeof workInProgress2.shouldComponentUpdate === "function" ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
    }
    function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
      workInProgress2 = instance.state;
      typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps(newProps, nextContext);
      typeof instance.UNSAFE_componentWillReceiveProps === "function" && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
      instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
    }
    function resolveClassComponentProps(Component, baseProps) {
      var newProps = baseProps;
      if ("ref" in baseProps) {
        newProps = {};
        for (var propName in baseProps)
          propName !== "ref" && (newProps[propName] = baseProps[propName]);
      }
      if (Component = Component.defaultProps) {
        newProps === baseProps && (newProps = assign({}, newProps));
        for (var propName$77 in Component)
          newProps[propName$77] === undefined && (newProps[propName$77] = Component[propName$77]);
      }
      return newProps;
    }
    function defaultOnUncaughtError(error) {
      reportGlobalError(error);
    }
    function defaultOnCaughtError(error) {
      console.error(error);
    }
    function defaultOnRecoverableError(error) {
      reportGlobalError(error);
    }
    function logUncaughtError(root2, errorInfo) {
      try {
        var onUncaughtError = root2.onUncaughtError;
        onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
      } catch (e$78) {
        setTimeout(function() {
          throw e$78;
        });
      }
    }
    function logCaughtError(root2, boundary, errorInfo) {
      try {
        var onCaughtError = root2.onCaughtError;
        onCaughtError(errorInfo.value, {
          componentStack: errorInfo.stack,
          errorBoundary: boundary.tag === 1 ? boundary.stateNode : null
        });
      } catch (e$79) {
        setTimeout(function() {
          throw e$79;
        });
      }
    }
    function createRootErrorUpdate(root2, errorInfo, lane) {
      lane = createUpdate(lane);
      lane.tag = 3;
      lane.payload = { element: null };
      lane.callback = function() {
        logUncaughtError(root2, errorInfo);
      };
      return lane;
    }
    function createClassErrorUpdate(lane) {
      lane = createUpdate(lane);
      lane.tag = 3;
      return lane;
    }
    function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
      var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
      if (typeof getDerivedStateFromError === "function") {
        var error = errorInfo.value;
        update.payload = function() {
          return getDerivedStateFromError(error);
        };
        update.callback = function() {
          logCaughtError(root2, fiber, errorInfo);
        };
      }
      var inst = fiber.stateNode;
      inst !== null && typeof inst.componentDidCatch === "function" && (update.callback = function() {
        logCaughtError(root2, fiber, errorInfo);
        typeof getDerivedStateFromError !== "function" && (legacyErrorBoundariesThatAlreadyFailed === null ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
        var stack = errorInfo.stack;
        this.componentDidCatch(errorInfo.value, {
          componentStack: stack !== null ? stack : ""
        });
      });
    }
    function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
      sourceFiber.flags |= 32768;
      if (value !== null && typeof value === "object" && typeof value.then === "function") {
        returnFiber = sourceFiber.alternate;
        returnFiber !== null && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, true);
        sourceFiber = suspenseHandlerStackCursor.current;
        if (sourceFiber !== null) {
          switch (sourceFiber.tag) {
            case 31:
            case 13:
            case 19:
              return shellBoundary === null ? renderDidSuspendDelayIfPossible() : sourceFiber.alternate === null && workInProgressRootExitStatus === 0 && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, returnFiber === null ? sourceFiber.updateQueue = new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
            case 22:
              return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, returnFiber === null ? (returnFiber = {
                transitions: null,
                markerInstances: null,
                retryQueue: new Set([value])
              }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, sourceFiber === null ? returnFiber.retryQueue = new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
          }
          throw Error(formatProdErrorMessage(435, sourceFiber.tag));
        }
        attachPingListener(root2, value, rootRenderLanes);
        renderDidSuspendDelayIfPossible();
        return false;
      }
      if (isHydrating)
        return returnFiber = suspenseHandlerStackCursor.current, returnFiber !== null ? ((returnFiber.flags & 65536) === 0 && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
          cause: value
        }), queueHydrationError(createCapturedValueAtFiber(returnFiber, sourceFiber))), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root2.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root2, rootRenderLanes), workInProgressRootExitStatus !== 4 && (workInProgressRootExitStatus = 2)), false;
      var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
      wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
      workInProgressRootConcurrentErrors === null ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
      workInProgressRootExitStatus !== 4 && (workInProgressRootExitStatus = 2);
      if (returnFiber === null)
        return true;
      value = createCapturedValueAtFiber(value, sourceFiber);
      sourceFiber = returnFiber;
      do {
        switch (sourceFiber.tag) {
          case 3:
            return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
          case 1:
            returnFiber = sourceFiber.type;
            wrapperError = sourceFiber.stateNode;
            if ((sourceFiber.flags & 128) === 0 && (typeof returnFiber.getDerivedStateFromError === "function" || wrapperError !== null && typeof wrapperError.componentDidCatch === "function" && (legacyErrorBoundariesThatAlreadyFailed === null || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
              return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root2, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
            break;
          case 22:
            if (sourceFiber.memoizedState !== null)
              return sourceFiber.flags |= 65536, false;
        }
        sourceFiber = sourceFiber.return;
      } while (sourceFiber !== null);
      return false;
    }
    var SelectiveHydrationException = Error(formatProdErrorMessage(461));
    var didReceiveUpdate = false;
    function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
      workInProgress2.child = current === null ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(workInProgress2, current.child, nextChildren, renderLanes2);
    }
    function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
      Component = Component.render;
      var ref = workInProgress2.ref;
      if ("ref" in nextProps) {
        var propsWithoutRef = {};
        for (var key in nextProps)
          key !== "ref" && (propsWithoutRef[key] = nextProps[key]);
      } else
        propsWithoutRef = nextProps;
      prepareToReadContext(workInProgress2);
      nextProps = renderWithHooks(current, workInProgress2, Component, propsWithoutRef, ref, renderLanes2);
      key = checkDidRenderIdHook();
      if (current !== null && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      isHydrating && key && pushMaterializedTreeId(workInProgress2);
      workInProgress2.flags |= 1;
      reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
      return workInProgress2.child;
    }
    function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      if (current === null) {
        var type = Component.type;
        if (typeof type === "function" && !shouldConstruct(type) && type.defaultProps === undefined && Component.compare === null)
          return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(current, workInProgress2, type, nextProps, renderLanes2);
        current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress2, workInProgress2.mode, renderLanes2);
        current.ref = workInProgress2.ref;
        current.return = workInProgress2;
        return workInProgress2.child = current;
      }
      type = current.child;
      if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
        var prevProps = type.memoizedProps;
        Component = Component.compare;
        Component = Component !== null ? Component : shallowEqual;
        if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
          return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      workInProgress2.flags |= 1;
      current = createWorkInProgress(type, nextProps);
      current.ref = workInProgress2.ref;
      current.return = workInProgress2;
      return workInProgress2.child = current;
    }
    function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      if (current !== null) {
        var prevProps = current.memoizedProps;
        if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
          if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
            (current.flags & 131072) !== 0 && (didReceiveUpdate = true);
          else
            return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      return updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2);
    }
    function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
      var nextChildren = nextProps.children, prevState = current !== null ? current.memoizedState : null;
      current === null && workInProgress2.stateNode === null && (workInProgress2.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      });
      if (nextProps.mode === "hidden") {
        if ((workInProgress2.flags & 128) !== 0) {
          prevState = prevState !== null ? prevState.baseLanes | renderLanes2 : renderLanes2;
          if (current !== null) {
            nextProps = workInProgress2.child = current.child;
            for (nextChildren = 0;nextProps !== null; )
              nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
            nextProps = nextChildren & ~prevState;
          } else
            nextProps = 0, workInProgress2.child = null;
          return deferHiddenOffscreenComponent(current, workInProgress2, prevState, renderLanes2, nextProps);
        }
        if ((renderLanes2 & 536870912) !== 0)
          workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, current !== null && pushTransition(workInProgress2, prevState !== null ? prevState.cachePool : null), prevState !== null ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
        else
          return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress2, prevState !== null ? prevState.baseLanes | renderLanes2 : renderLanes2, renderLanes2, nextProps);
      } else
        prevState !== null ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (current !== null && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
      reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
      return workInProgress2.child;
    }
    function bailoutOffscreenComponent(current, workInProgress2) {
      current !== null && current.tag === 22 || workInProgress2.stateNode !== null || (workInProgress2.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      });
      return workInProgress2.sibling;
    }
    function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
      var JSCompiler_inline_result = peekCacheFromPool();
      JSCompiler_inline_result = JSCompiler_inline_result === null ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
      workInProgress2.memoizedState = {
        baseLanes: nextBaseLanes,
        cachePool: JSCompiler_inline_result
      };
      current !== null && pushTransition(workInProgress2, null);
      reuseHiddenContextOnStack();
      pushOffscreenSuspenseHandler(workInProgress2);
      current !== null && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
      workInProgress2.childLanes = remainingChildLanes;
      return null;
    }
    function mountActivityChildren(workInProgress2, nextProps) {
      nextProps = mountWorkInProgressOffscreenFiber({ mode: nextProps.mode, children: nextProps.children }, workInProgress2.mode);
      nextProps.ref = workInProgress2.ref;
      workInProgress2.child = nextProps;
      nextProps.return = workInProgress2;
      return nextProps;
    }
    function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
      current.flags |= 2;
      popSuspenseHandler(workInProgress2);
      workInProgress2.memoizedState = null;
      return current;
    }
    function updateActivityComponent(current, workInProgress2, renderLanes2) {
      var nextProps = workInProgress2.pendingProps, didSuspend = (workInProgress2.flags & 128) !== 0;
      workInProgress2.flags &= -129;
      if (current === null) {
        if (isHydrating) {
          if (nextProps.mode === "hidden")
            return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, current.memoizedState = { baseLanes: 0, cachePool: null }, bailoutOffscreenComponent(null, current);
          pushDehydratedActivitySuspenseHandler(workInProgress2);
          (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = current !== null && current.data === "&" ? current : null, current !== null && (workInProgress2.memoizedState = {
            dehydrated: current,
            treeContext: treeContextProvider !== null ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
          if (current === null)
            throw throwOnHydrationMismatch(workInProgress2);
          workInProgress2.lanes = 536870912;
          return null;
        }
        return mountActivityChildren(workInProgress2, nextProps);
      }
      var prevState = current.memoizedState;
      if (prevState !== null) {
        var dehydrated = prevState.dehydrated;
        pushDehydratedActivitySuspenseHandler(workInProgress2);
        if (didSuspend)
          if (workInProgress2.flags & 256)
            workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2);
          else if (workInProgress2.memoizedState !== null)
            workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
          else
            throw Error(formatProdErrorMessage(558));
        else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = (renderLanes2 & current.childLanes) !== 0, didReceiveUpdate || didSuspend) {
          if (currentTreeHiddenStackCursor.current === null) {
            nextProps = workInProgressRoot;
            if (nextProps !== null && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), dehydrated !== 0 && dehydrated !== prevState.retryLane))
              throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
            renderDidSuspendDelayIfPossible();
          }
          workInProgress2 = retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2);
        } else
          current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, current !== null && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 134221824;
        return workInProgress2;
      }
      current = createWorkInProgress(current.child, {
        mode: nextProps.mode,
        children: nextProps.children
      });
      current.ref = workInProgress2.ref;
      workInProgress2.child = current;
      current.return = workInProgress2;
      return current;
    }
    function markRef(current, workInProgress2) {
      var ref = workInProgress2.ref;
      if (ref === null)
        current !== null && current.ref !== null && (workInProgress2.flags |= 4194816);
      else {
        if (typeof ref !== "function" && typeof ref !== "object")
          throw Error(formatProdErrorMessage(284));
        if (current === null || current.ref !== ref)
          workInProgress2.flags |= 4194816;
      }
    }
    function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      prepareToReadContext(workInProgress2);
      Component = renderWithHooks(current, workInProgress2, Component, nextProps, undefined, renderLanes2);
      nextProps = checkDidRenderIdHook();
      if (current !== null && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
      workInProgress2.flags |= 1;
      reconcileChildren(current, workInProgress2, Component, renderLanes2);
      return workInProgress2.child;
    }
    function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
      prepareToReadContext(workInProgress2);
      workInProgress2.updateQueue = null;
      nextProps = renderWithHooksAgain(workInProgress2, Component, nextProps, secondArg);
      finishRenderingHooks(current);
      Component = checkDidRenderIdHook();
      if (current !== null && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      isHydrating && Component && pushMaterializedTreeId(workInProgress2);
      workInProgress2.flags |= 1;
      reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
      return workInProgress2.child;
    }
    function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      prepareToReadContext(workInProgress2);
      if (workInProgress2.stateNode === null) {
        var context = emptyContextObject, contextType = Component.contextType;
        typeof contextType === "object" && contextType !== null && (context = readContext(contextType));
        context = new Component(nextProps, context);
        workInProgress2.memoizedState = context.state !== null && context.state !== undefined ? context.state : null;
        context.updater = classComponentUpdater;
        workInProgress2.stateNode = context;
        context._reactInternals = workInProgress2;
        context = workInProgress2.stateNode;
        context.props = nextProps;
        context.state = workInProgress2.memoizedState;
        context.refs = {};
        initializeUpdateQueue(workInProgress2);
        contextType = Component.contextType;
        context.context = typeof contextType === "object" && contextType !== null ? readContext(contextType) : emptyContextObject;
        context.state = workInProgress2.memoizedState;
        contextType = Component.getDerivedStateFromProps;
        typeof contextType === "function" && (applyDerivedStateFromProps(workInProgress2, Component, contextType, nextProps), context.state = workInProgress2.memoizedState);
        typeof Component.getDerivedStateFromProps === "function" || typeof context.getSnapshotBeforeUpdate === "function" || typeof context.UNSAFE_componentWillMount !== "function" && typeof context.componentWillMount !== "function" || (contextType = context.state, typeof context.componentWillMount === "function" && context.componentWillMount(), typeof context.UNSAFE_componentWillMount === "function" && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
        typeof context.componentDidMount === "function" && (workInProgress2.flags |= 4194308);
        nextProps = true;
      } else if (current === null) {
        context = workInProgress2.stateNode;
        var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
        context.props = oldProps;
        var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
        contextType = emptyContextObject;
        typeof contextType$jscomp$0 === "object" && contextType$jscomp$0 !== null && (contextType = readContext(contextType$jscomp$0));
        var getDerivedStateFromProps = Component.getDerivedStateFromProps;
        contextType$jscomp$0 = typeof getDerivedStateFromProps === "function" || typeof context.getSnapshotBeforeUpdate === "function";
        unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
        contextType$jscomp$0 || typeof context.UNSAFE_componentWillReceiveProps !== "function" && typeof context.componentWillReceiveProps !== "function" || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress2, context, nextProps, contextType);
        hasForceUpdate = false;
        var oldState = workInProgress2.memoizedState;
        context.state = oldState;
        processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
        suspendIfUpdateReadFromEntangledAsyncAction();
        oldContext = workInProgress2.memoizedState;
        unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? (typeof getDerivedStateFromProps === "function" && (applyDerivedStateFromProps(workInProgress2, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress2, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (contextType$jscomp$0 || typeof context.UNSAFE_componentWillMount !== "function" && typeof context.componentWillMount !== "function" || (typeof context.componentWillMount === "function" && context.componentWillMount(), typeof context.UNSAFE_componentWillMount === "function" && context.UNSAFE_componentWillMount()), typeof context.componentDidMount === "function" && (workInProgress2.flags |= 4194308)) : (typeof context.componentDidMount === "function" && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : (typeof context.componentDidMount === "function" && (workInProgress2.flags |= 4194308), nextProps = false);
      } else {
        context = workInProgress2.stateNode;
        cloneUpdateQueue(current, workInProgress2);
        contextType = workInProgress2.memoizedProps;
        contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
        context.props = contextType$jscomp$0;
        getDerivedStateFromProps = workInProgress2.pendingProps;
        oldState = context.context;
        oldContext = Component.contextType;
        oldProps = emptyContextObject;
        typeof oldContext === "object" && oldContext !== null && (oldProps = readContext(oldContext));
        unresolvedOldProps = Component.getDerivedStateFromProps;
        (oldContext = typeof unresolvedOldProps === "function" || typeof context.getSnapshotBeforeUpdate === "function") || typeof context.UNSAFE_componentWillReceiveProps !== "function" && typeof context.componentWillReceiveProps !== "function" || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(workInProgress2, context, nextProps, oldProps);
        hasForceUpdate = false;
        oldState = workInProgress2.memoizedState;
        context.state = oldState;
        processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
        suspendIfUpdateReadFromEntangledAsyncAction();
        var newState = workInProgress2.memoizedState;
        contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || current !== null && current.dependencies !== null && checkIfContextChanged(current.dependencies) ? (typeof unresolvedOldProps === "function" && (applyDerivedStateFromProps(workInProgress2, Component, unresolvedOldProps, nextProps), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(workInProgress2, Component, contextType$jscomp$0, nextProps, oldState, newState, oldProps) || current !== null && current.dependencies !== null && checkIfContextChanged(current.dependencies)) ? (oldContext || typeof context.UNSAFE_componentWillUpdate !== "function" && typeof context.componentWillUpdate !== "function" || (typeof context.componentWillUpdate === "function" && context.componentWillUpdate(nextProps, newState, oldProps), typeof context.UNSAFE_componentWillUpdate === "function" && context.UNSAFE_componentWillUpdate(nextProps, newState, oldProps)), typeof context.componentDidUpdate === "function" && (workInProgress2.flags |= 4), typeof context.getSnapshotBeforeUpdate === "function" && (workInProgress2.flags |= 1024)) : (typeof context.componentDidUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), typeof context.getSnapshotBeforeUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : (typeof context.componentDidUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), typeof context.getSnapshotBeforeUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
      }
      context = nextProps;
      markRef(current, workInProgress2);
      nextProps = (workInProgress2.flags & 128) !== 0;
      context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && typeof Component.getDerivedStateFromError !== "function" ? null : context.render(), workInProgress2.flags |= 1, current !== null && nextProps ? (workInProgress2.child = reconcileChildFibers(workInProgress2, current.child, null, renderLanes2), workInProgress2.child = reconcileChildFibers(workInProgress2, null, Component, renderLanes2)) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      return current;
    }
    function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
      resetHydrationState();
      workInProgress2.flags |= 256;
      reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
      return workInProgress2.child;
    }
    var SUSPENDED_MARKER = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function mountSuspenseOffscreenState(renderLanes2) {
      return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
    }
    function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
      current = current !== null ? current.childLanes & ~renderLanes2 : 0;
      primaryTreeDidDefer && (current |= workInProgressDeferredLane);
      return current;
    }
    function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
      var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = (workInProgress2.flags & 128) !== 0, JSCompiler_temp;
      (JSCompiler_temp = didSuspend) || (JSCompiler_temp = current !== null && current.memoizedState === null ? false : (suspenseStackCursor.current & 2) !== 0);
      JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
      JSCompiler_temp = (workInProgress2.flags & 32) !== 0;
      workInProgress2.flags &= -33;
      if (current === null) {
        if (isHydrating) {
          showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
          (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = current !== null && current.data !== "&" ? current : null, current !== null && (workInProgress2.memoizedState = {
            dehydrated: current,
            treeContext: treeContextProvider !== null ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
          if (current === null)
            throw throwOnHydrationMismatch(workInProgress2);
          isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
          return null;
        }
        didSuspend = nextProps.children;
        nextProps = nextProps.fallback;
        if (showFallback)
          return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, didSuspend = mountWorkInProgressOffscreenFiber({ mode: "hidden", children: didSuspend }, showFallback), nextProps = createFiberFromFragment(nextProps, showFallback, renderLanes2, null), didSuspend.return = workInProgress2, nextProps.return = workInProgress2, didSuspend.sibling = nextProps, workInProgress2.child = didSuspend, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes2), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        return mountSuspensePrimaryChildren(workInProgress2, didSuspend);
      }
      var prevState = current.memoizedState;
      if (prevState !== null) {
        var dehydrated$96 = prevState.dehydrated;
        if (dehydrated$96 !== null)
          return updateDehydratedSuspenseComponent(current, workInProgress2, didSuspend, JSCompiler_temp, nextProps, dehydrated$96, prevState, renderLanes2);
      }
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress2.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
          mode: "hidden",
          children: nextProps.children
        }), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, dehydrated$96 !== null ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(showFallback, didSuspend, renderLanes2, null), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, showFallback = current.child.memoizedState, showFallback === null ? showFallback = mountSuspenseOffscreenState(renderLanes2) : (didSuspend = showFallback.cachePool, didSuspend !== null ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? { parent: prevState, pool: prevState } : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
          baseLanes: showFallback.baseLanes | renderLanes2,
          cachePool: didSuspend
        }), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes2), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      renderLanes2 = current.child;
      current = renderLanes2.sibling;
      renderLanes2 = createWorkInProgress(renderLanes2, {
        mode: "visible",
        children: nextProps.children
      });
      renderLanes2.return = workInProgress2;
      renderLanes2.sibling = null;
      current !== null && (JSCompiler_temp = workInProgress2.deletions, JSCompiler_temp === null ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
      workInProgress2.child = renderLanes2;
      workInProgress2.memoizedState = null;
      return renderLanes2;
    }
    function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
      primaryChildren = mountWorkInProgressOffscreenFiber({ mode: "visible", children: primaryChildren }, workInProgress2.mode);
      primaryChildren.return = workInProgress2;
      return workInProgress2.child = primaryChildren;
    }
    function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
      offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
      offscreenProps.lanes = 0;
      return offscreenProps;
    }
    function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      current = mountSuspensePrimaryChildren(workInProgress2, workInProgress2.pendingProps.children);
      current.flags |= 2;
      workInProgress2.memoizedState = null;
      return current;
    }
    function updateDehydratedSuspenseComponent(current, workInProgress2, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes2) {
      if (didSuspend) {
        if (workInProgress2.flags & 256)
          return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2);
        if (workInProgress2.memoizedState !== null)
          return reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, null;
        reuseSuspenseHandlerOnStack();
        suspenseInstance = nextProps.fallback;
        suspenseState = workInProgress2.mode;
        nextProps = mountWorkInProgressOffscreenFiber({ mode: "visible", children: nextProps.children }, suspenseState);
        suspenseInstance = createFiberFromFragment(suspenseInstance, suspenseState, renderLanes2, null);
        suspenseInstance.flags |= 2;
        nextProps.return = workInProgress2;
        suspenseInstance.return = workInProgress2;
        nextProps.sibling = suspenseInstance;
        workInProgress2.child = nextProps;
        reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
        nextProps = workInProgress2.child;
        nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2);
        nextProps.childLanes = getRemainingWorkInPrimaryTree(current, didPrimaryChildrenDefer, renderLanes2);
        workInProgress2.memoizedState = SUSPENDED_MARKER;
        return bailoutOffscreenComponent(null, nextProps);
      }
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      if (isSuspenseInstanceFallback(suspenseInstance)) {
        didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
        if (didPrimaryChildrenDefer)
          var digest = didPrimaryChildrenDefer.dgst;
        didPrimaryChildrenDefer = digest;
        didPrimaryChildrenDefer !== "" && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({ value: nextProps, source: null, stack: null }));
        return retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2);
      }
      didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false);
      didPrimaryChildrenDefer = (renderLanes2 & current.childLanes) !== 0;
      if (didReceiveUpdate || didPrimaryChildrenDefer) {
        if (currentTreeHiddenStackCursor.current !== null)
          return retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2);
        didPrimaryChildrenDefer = workInProgressRoot;
        if (didPrimaryChildrenDefer !== null && (nextProps = getBumpedLaneForHydration(didPrimaryChildrenDefer, renderLanes2), nextProps !== 0 && nextProps !== suspenseState.retryLane))
          throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
        isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
        return retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2);
      }
      if (isSuspenseInstancePending(suspenseInstance))
        return workInProgress2.flags |= 192, workInProgress2.child = current.child, null;
      current = suspenseState.treeContext;
      nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
      hydrationParentFiber = workInProgress2;
      isHydrating = true;
      hydrationErrors = null;
      rootOrSingletonContext = false;
      current !== null && restoreSuspendedTreeContext(workInProgress2, current);
      workInProgress2 = mountSuspensePrimaryChildren(workInProgress2, nextProps.children);
      workInProgress2.flags |= 134221824;
      return workInProgress2;
    }
    function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
      fiber.lanes |= renderLanes2;
      var alternate = fiber.alternate;
      alternate !== null && (alternate.lanes |= renderLanes2);
      scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
    }
    function findLastContentRow(firstChild) {
      for (var lastContentRow = null;firstChild !== null; ) {
        var currentRow = firstChild.alternate;
        currentRow !== null && findFirstSuspended(currentRow) === null && (lastContentRow = firstChild);
        firstChild = firstChild.sibling;
      }
      return lastContentRow;
    }
    function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
      var renderState = workInProgress2.memoizedState;
      renderState === null ? workInProgress2.memoizedState = {
        isBackwards,
        rendering: null,
        renderingStartTime: 0,
        last: lastContentRow,
        tail,
        tailMode,
        treeForkCount: treeForkCount2
      } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
    }
    function reverseChildren(fiber) {
      var row = fiber.child;
      for (fiber.child = null;row !== null; ) {
        var nextRow = row.sibling;
        row.sibling = fiber.child;
        fiber.child = row;
        row = nextRow;
      }
    }
    function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
      var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
      nextProps = nextProps.children;
      var suspenseContext = suspenseStackCursor.current;
      if (workInProgress2.flags & 128)
        return pushSuspenseListContext(workInProgress2, suspenseContext), null;
      var shouldForceFallback = (suspenseContext & 2) !== 0;
      shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
      pushSuspenseListContext(workInProgress2, suspenseContext);
      revealOrder === "backwards" && current !== null ? (reverseChildren(current), reconcileChildren(current, workInProgress2, nextProps, renderLanes2), reverseChildren(current)) : reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
      nextProps = isHydrating ? treeForkCount : 0;
      if (!shouldForceFallback && current !== null && (current.flags & 128) !== 0)
        a:
          for (current = workInProgress2.child;current !== null; ) {
            if (current.tag === 13)
              current.memoizedState !== null && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (current.tag === 19)
              scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
            else if (current.child !== null) {
              current.child.return = current;
              current = current.child;
              continue;
            }
            if (current === workInProgress2)
              break a;
            for (;current.sibling === null; ) {
              if (current.return === null || current.return === workInProgress2)
                break a;
              current = current.return;
            }
            current.sibling.return = current.return;
            current = current.sibling;
          }
      switch (revealOrder) {
        case "backwards":
          renderLanes2 = findLastContentRow(workInProgress2.child);
          renderLanes2 === null ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null, reverseChildren(workInProgress2));
          initSuspenseListRenderState(workInProgress2, true, revealOrder, null, tailMode, nextProps);
          break;
        case "unstable_legacy-backwards":
          renderLanes2 = null;
          revealOrder = workInProgress2.child;
          for (workInProgress2.child = null;revealOrder !== null; ) {
            current = revealOrder.alternate;
            if (current !== null && findFirstSuspended(current) === null) {
              workInProgress2.child = revealOrder;
              break;
            }
            current = revealOrder.sibling;
            revealOrder.sibling = renderLanes2;
            renderLanes2 = revealOrder;
            revealOrder = current;
          }
          initSuspenseListRenderState(workInProgress2, true, renderLanes2, null, tailMode, nextProps);
          break;
        case "together":
          initSuspenseListRenderState(workInProgress2, false, null, null, undefined, nextProps);
          break;
        case "independent":
          workInProgress2.memoizedState = null;
          break;
        default:
          renderLanes2 = findLastContentRow(workInProgress2.child), renderLanes2 === null ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null), initSuspenseListRenderState(workInProgress2, false, revealOrder, renderLanes2, tailMode, nextProps);
      }
      return workInProgress2.child;
    }
    function updateContextProvider(current, workInProgress2, renderLanes2) {
      var newProps = workInProgress2.pendingProps;
      pushProvider(workInProgress2, workInProgress2.type, newProps.value);
      reconcileChildren(current, workInProgress2, newProps.children, renderLanes2);
      return workInProgress2.child;
    }
    function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
      current !== null && (workInProgress2.dependencies = current.dependencies);
      workInProgressRootSkippedLanes |= workInProgress2.lanes;
      if ((renderLanes2 & workInProgress2.childLanes) === 0)
        if (current !== null) {
          if (propagateParentContextChanges(current, workInProgress2, renderLanes2, false), (renderLanes2 & workInProgress2.childLanes) === 0)
            return null;
        } else
          return null;
      if (current !== null && workInProgress2.child !== current.child)
        throw Error(formatProdErrorMessage(153));
      if (workInProgress2.child !== null) {
        current = workInProgress2.child;
        renderLanes2 = createWorkInProgress(current, current.pendingProps);
        workInProgress2.child = renderLanes2;
        for (renderLanes2.return = workInProgress2;current.sibling !== null; )
          current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
        renderLanes2.sibling = null;
      }
      return workInProgress2.child;
    }
    function checkScheduledUpdateOrContext(current, renderLanes2) {
      if ((current.lanes & renderLanes2) !== 0)
        return true;
      current = current.dependencies;
      return current !== null && checkIfContextChanged(current) ? true : false;
    }
    function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
      switch (workInProgress2.tag) {
        case 3:
          pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
          pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
          resetHydrationState();
          break;
        case 27:
        case 5:
          pushHostContext(workInProgress2);
          break;
        case 4:
          pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
          break;
        case 10:
          pushProvider(workInProgress2, workInProgress2.type, workInProgress2.memoizedProps.value);
          break;
        case 31:
          if (workInProgress2.memoizedState !== null)
            return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
          break;
        case 13:
          var state$108 = workInProgress2.memoizedState;
          if (state$108 !== null) {
            if (state$108.dehydrated !== null)
              return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
            state$108 = propagateParentContextChanges(current, workInProgress2, renderLanes2, false);
            var primaryChildLanes = workInProgress2.child.childLanes;
            if (state$108 || (renderLanes2 & primaryChildLanes) !== 0)
              return updateSuspenseComponent(current, workInProgress2, renderLanes2);
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            current = bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
            return current !== null ? current.sibling : null;
          }
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          break;
        case 19:
          if (workInProgress2.flags & 128)
            return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
          primaryChildLanes = (current.flags & 128) !== 0;
          state$108 = (renderLanes2 & workInProgress2.childLanes) !== 0;
          state$108 || (propagateParentContextChanges(current, workInProgress2, renderLanes2, false), state$108 = (renderLanes2 & workInProgress2.childLanes) !== 0);
          if (primaryChildLanes) {
            if (state$108)
              return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
            workInProgress2.flags |= 128;
          }
          primaryChildLanes = workInProgress2.memoizedState;
          primaryChildLanes !== null && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
          pushSuspenseListContext(workInProgress2, suspenseStackCursor.current);
          if (state$108)
            break;
          else
            return null;
        case 22:
          return workInProgress2.lanes = 0, updateOffscreenComponent(current, workInProgress2, renderLanes2, workInProgress2.pendingProps);
        case 24:
          pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    function beginWork(current, workInProgress2, renderLanes2) {
      if (current !== null)
        if (current.memoizedProps !== workInProgress2.pendingProps)
          didReceiveUpdate = true;
        else {
          if (!checkScheduledUpdateOrContext(current, renderLanes2) && (workInProgress2.flags & 128) === 0)
            return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2);
          didReceiveUpdate = (current.flags & 131072) !== 0 ? true : false;
        }
      else
        didReceiveUpdate = false, isHydrating && (workInProgress2.flags & 1048576) !== 0 && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
      workInProgress2.lanes = 0;
      switch (workInProgress2.tag) {
        case 16:
          a: {
            var props = workInProgress2.pendingProps;
            current = resolveLazy(workInProgress2.elementType);
            workInProgress2.type = current;
            if (typeof current === "function")
              shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(null, workInProgress2, current, props, renderLanes2)) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(null, workInProgress2, current, props, renderLanes2));
            else {
              if (current !== undefined && current !== null) {
                var $$typeof = current.$$typeof;
                if ($$typeof === REACT_FORWARD_REF_TYPE) {
                  workInProgress2.tag = 11;
                  workInProgress2 = updateForwardRef(null, workInProgress2, current, props, renderLanes2);
                  break a;
                } else if ($$typeof === REACT_MEMO_TYPE) {
                  workInProgress2.tag = 14;
                  workInProgress2 = updateMemoComponent(null, workInProgress2, current, props, renderLanes2);
                  break a;
                } else if ($$typeof === REACT_CONTEXT_TYPE) {
                  workInProgress2.tag = 10;
                  workInProgress2.type = current;
                  workInProgress2 = updateContextProvider(null, workInProgress2, renderLanes2);
                  break a;
                }
              }
              workInProgress2 = getComponentNameFromType(current) || current;
              throw Error(formatProdErrorMessage(306, workInProgress2, ""));
            }
          }
          return workInProgress2;
        case 0:
          return updateFunctionComponent(current, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, renderLanes2);
        case 1:
          return props = workInProgress2.type, $$typeof = resolveClassComponentProps(props, workInProgress2.pendingProps), updateClassComponent(current, workInProgress2, props, $$typeof, renderLanes2);
        case 3:
          a: {
            pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
            if (current === null)
              throw Error(formatProdErrorMessage(387));
            props = workInProgress2.pendingProps;
            var prevState = workInProgress2.memoizedState;
            $$typeof = prevState.element;
            cloneUpdateQueue(current, workInProgress2);
            processUpdateQueue(workInProgress2, props, null, renderLanes2);
            var nextState = workInProgress2.memoizedState;
            props = nextState.cache;
            pushProvider(workInProgress2, CacheContext, props);
            props !== prevState.cache && propagateContextChanges(workInProgress2, [CacheContext], renderLanes2, true);
            suspendIfUpdateReadFromEntangledAsyncAction();
            props = nextState.element;
            if (prevState.isDehydrated)
              if (prevState = {
                element: props,
                isDehydrated: false,
                cache: nextState.cache
              }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                workInProgress2 = mountHostRootWithoutHydrating(current, workInProgress2, props, renderLanes2);
                break a;
              } else if (props !== $$typeof) {
                $$typeof = createCapturedValueAtFiber(Error(formatProdErrorMessage(424)), workInProgress2);
                queueHydrationError($$typeof);
                workInProgress2 = mountHostRootWithoutHydrating(current, workInProgress2, props, renderLanes2);
                break a;
              } else {
                current = workInProgress2.stateNode.containerInfo;
                switch (current.nodeType) {
                  case 9:
                    current = current.body;
                    break;
                  default:
                    current = current.nodeName === "HTML" ? current.ownerDocument.body : current;
                }
                nextHydratableInstance = getNextHydratable(current.firstChild);
                hydrationParentFiber = workInProgress2;
                isHydrating = true;
                hydrationErrors = null;
                rootOrSingletonContext = true;
                renderLanes2 = mountChildFibers(workInProgress2, null, props, renderLanes2);
                for (workInProgress2.child = renderLanes2;renderLanes2; )
                  renderLanes2.flags = renderLanes2.flags & -3 | 134221824, renderLanes2 = renderLanes2.sibling;
              }
            else {
              resetHydrationState();
              if (props === $$typeof) {
                workInProgress2 = bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
                break a;
              }
              reconcileChildren(current, workInProgress2, props, renderLanes2);
            }
            workInProgress2 = workInProgress2.child;
          }
          return workInProgress2;
        case 26:
          return markRef(current, workInProgress2), current === null ? (renderLanes2 = getResource(workInProgress2.type, null, workInProgress2.pendingProps, null)) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (workInProgress2.stateNode = createHoistableInstance(workInProgress2.type, workInProgress2.pendingProps, rootInstanceStackCursor.current, workInProgress2)) : workInProgress2.memoizedState = getResource(workInProgress2.type, current.memoizedProps, workInProgress2.pendingProps, current.memoizedState), null;
        case 27:
          return pushHostContext(workInProgress2), current === null && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(workInProgress2.type, workInProgress2.pendingProps, rootInstanceStackCursor.current), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(current, workInProgress2, workInProgress2.pendingProps.children, renderLanes2), markRef(current, workInProgress2), current === null && (workInProgress2.flags |= 4194304), workInProgress2.child;
        case 5:
          if (current === null && isHydrating) {
            if ($$typeof = props = nextHydratableInstance)
              props = canHydrateInstance(props, workInProgress2.type, workInProgress2.pendingProps, rootOrSingletonContext), props !== null ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
            $$typeof || throwOnHydrationMismatch(workInProgress2);
          }
          pushHostContext(workInProgress2);
          $$typeof = workInProgress2.type;
          prevState = workInProgress2.pendingProps;
          nextState = current !== null ? current.memoizedProps : null;
          props = prevState.children;
          shouldSetTextContent($$typeof, prevState) ? props = null : nextState !== null && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
          workInProgress2.memoizedState !== null && ($$typeof = renderWithHooks(current, workInProgress2, TransitionAwareHostComponent, null, null, renderLanes2), HostTransitionContext._currentValue = $$typeof);
          markRef(current, workInProgress2);
          reconcileChildren(current, workInProgress2, props, renderLanes2);
          return workInProgress2.child;
        case 6:
          if (current === null && isHydrating) {
            if (current = renderLanes2 = nextHydratableInstance)
              renderLanes2 = canHydrateTextInstance(renderLanes2, workInProgress2.pendingProps, rootOrSingletonContext), renderLanes2 !== null ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
            current || throwOnHydrationMismatch(workInProgress2);
          }
          return null;
        case 13:
          return updateSuspenseComponent(current, workInProgress2, renderLanes2);
        case 4:
          return pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo), props = workInProgress2.pendingProps, current === null ? workInProgress2.child = reconcileChildFibers(workInProgress2, null, props, renderLanes2) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
        case 11:
          return updateForwardRef(current, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, renderLanes2);
        case 7:
          return props = workInProgress2.pendingProps, markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
        case 8:
          return reconcileChildren(current, workInProgress2, workInProgress2.pendingProps.children, renderLanes2), workInProgress2.child;
        case 12:
          return reconcileChildren(current, workInProgress2, workInProgress2.pendingProps.children, renderLanes2), workInProgress2.child;
        case 10:
          return updateContextProvider(current, workInProgress2, renderLanes2);
        case 9:
          return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
        case 14:
          return updateMemoComponent(current, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, renderLanes2);
        case 15:
          return updateSimpleMemoComponent(current, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, renderLanes2);
        case 19:
          return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
        case 31:
          return updateActivityComponent(current, workInProgress2, renderLanes2);
        case 22:
          return updateOffscreenComponent(current, workInProgress2, renderLanes2, workInProgress2.pendingProps);
        case 24:
          return prepareToReadContext(workInProgress2), props = readContext(CacheContext), current === null ? ($$typeof = peekCacheFromPool(), $$typeof === null && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, prevState !== null && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : ((current.lanes & renderLanes2) !== 0 && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, workInProgress2.lanes === 0 && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(workInProgress2, [CacheContext], renderLanes2, true))), reconcileChildren(current, workInProgress2, workInProgress2.pendingProps.children, renderLanes2), workInProgress2.child;
        case 30:
          return workInProgress2.stateNode === null && (workInProgress2.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }), props = workInProgress2.pendingProps, props.name != null && props.name !== "auto" ? workInProgress2.flags |= current === null ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress2), current !== null && current.memoizedProps.name !== props.name ? workInProgress2.flags |= 4194816 : markRef(current, workInProgress2), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
        case 29:
          throw workInProgress2.pendingProps;
      }
      throw Error(formatProdErrorMessage(156, workInProgress2.tag));
    }
    function markUpdate(workInProgress2) {
      workInProgress2.flags |= 4;
    }
    function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
      var JSCompiler_temp;
      if (JSCompiler_temp = (workInProgress2.mode & 32) !== 0)
        JSCompiler_temp = oldProps === null ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
      if (JSCompiler_temp) {
        if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
          if (workInProgress2.stateNode.complete)
            workInProgress2.flags |= 8192;
          else if (shouldRemainOnPreviousScreen())
            workInProgress2.flags |= 8192;
          else
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
      } else
        workInProgress2.flags &= -16777217;
    }
    function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
      if (resource.type !== "stylesheet" || (resource.state.loading & 4) !== 0)
        workInProgress2.flags &= -16777217;
      else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
        if (shouldRemainOnPreviousScreen())
          workInProgress2.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    }
    function scheduleRetryEffect(workInProgress2, retryQueue) {
      retryQueue !== null && (workInProgress2.flags |= 4);
      workInProgress2.flags & 16384 && (retryQueue = workInProgress2.tag !== 22 ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
    }
    function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
      if (!isHydrating)
        switch (renderState.tailMode) {
          case "visible":
            break;
          case "collapsed":
            for (var tailNode = renderState.tail, lastTailNode = null;tailNode !== null; )
              tailNode.alternate !== null && (lastTailNode = tailNode), tailNode = tailNode.sibling;
            lastTailNode === null ? hasRenderedATailFallback || renderState.tail === null ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
            break;
          default:
            hasRenderedATailFallback = renderState.tail;
            for (tailNode = null;hasRenderedATailFallback !== null; )
              hasRenderedATailFallback.alternate !== null && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
            tailNode === null ? renderState.tail = null : tailNode.sibling = null;
        }
    }
    function bubbleProperties(completedWork) {
      var didBailout = completedWork.alternate !== null && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
      if (didBailout)
        for (var child$113 = completedWork.child;child$113 !== null; )
          newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
      else
        for (child$113 = completedWork.child;child$113 !== null; )
          newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
      completedWork.subtreeFlags |= subtreeFlags;
      completedWork.childLanes = newChildLanes;
      return didBailout;
    }
    function completeWork(current, workInProgress2, renderLanes2) {
      var newProps = workInProgress2.pendingProps;
      popTreeContext(workInProgress2);
      switch (workInProgress2.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return bubbleProperties(workInProgress2), null;
        case 1:
          return bubbleProperties(workInProgress2), null;
        case 3:
          renderLanes2 = workInProgress2.stateNode;
          newProps = null;
          current !== null && (newProps = current.memoizedState.cache);
          workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
          popProvider(CacheContext);
          popHostContainer();
          renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
          if (current === null || current.child === null)
            popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : current === null || current.memoizedState.isDehydrated && (workInProgress2.flags & 256) === 0 || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
          bubbleProperties(workInProgress2);
          return null;
        case 26:
          var { type, memoizedState: nextResource } = workInProgress2;
          current === null ? (markUpdate(workInProgress2), nextResource !== null ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(workInProgress2, type, null, newProps, renderLanes2))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(workInProgress2, type, current, newProps, renderLanes2));
          return null;
        case 27:
          popHostContext(workInProgress2);
          renderLanes2 = rootInstanceStackCursor.current;
          type = workInProgress2.type;
          if (current !== null && workInProgress2.stateNode != null)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else {
            if (!newProps) {
              if (workInProgress2.stateNode === null)
                throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress2);
              workInProgress2.subtreeFlags &= -33554433;
              return null;
            }
            current = contextStackCursor.current;
            popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
          }
          bubbleProperties(workInProgress2);
          workInProgress2.subtreeFlags &= -33554433;
          return null;
        case 5:
          popHostContext(workInProgress2);
          type = workInProgress2.type;
          if (current !== null && workInProgress2.stateNode != null)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else {
            if (!newProps) {
              if (workInProgress2.stateNode === null)
                throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress2);
              workInProgress2.subtreeFlags &= -33554433;
              return null;
            }
            nextResource = contextStackCursor.current;
            if (popHydrationState(workInProgress2))
              prepareToHydrateHostInstance(workInProgress2, nextResource);
            else {
              var ownerDocument = getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current);
              switch (nextResource) {
                case 1:
                  nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
                  break;
                case 2:
                  nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
                  break;
                default:
                  switch (type) {
                    case "svg":
                      nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
                      break;
                    case "math":
                      nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
                      break;
                    case "script":
                      nextResource = ownerDocument.createElement("div");
                      nextResource.innerHTML = "<script></script>";
                      nextResource = nextResource.removeChild(nextResource.firstChild);
                      break;
                    case "select":
                      nextResource = typeof newProps.is === "string" ? ownerDocument.createElement("select", {
                        is: newProps.is
                      }) : ownerDocument.createElement("select");
                      newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                      break;
                    default:
                      nextResource = typeof newProps.is === "string" ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                  }
              }
              nextResource[internalInstanceKey] = workInProgress2;
              nextResource[internalPropsKey] = newProps;
              a:
                for (ownerDocument = workInProgress2.child;ownerDocument !== null; ) {
                  if (ownerDocument.tag === 5 || ownerDocument.tag === 6)
                    nextResource.appendChild(ownerDocument.stateNode);
                  else if (ownerDocument.tag !== 4 && ownerDocument.tag !== 27 && ownerDocument.child !== null) {
                    ownerDocument.child.return = ownerDocument;
                    ownerDocument = ownerDocument.child;
                    continue;
                  }
                  if (ownerDocument === workInProgress2)
                    break a;
                  for (;ownerDocument.sibling === null; ) {
                    if (ownerDocument.return === null || ownerDocument.return === workInProgress2)
                      break a;
                    ownerDocument = ownerDocument.return;
                  }
                  ownerDocument.sibling.return = ownerDocument.return;
                  ownerDocument = ownerDocument.sibling;
                }
              workInProgress2.stateNode = nextResource;
              a:
                switch (setInitialProperties(nextResource, type, newProps), type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    newProps = !!newProps.autoFocus;
                    break a;
                  case "img":
                    newProps = true;
                    break a;
                  default:
                    newProps = false;
                }
              newProps && markUpdate(workInProgress2);
            }
          }
          bubbleProperties(workInProgress2);
          workInProgress2.subtreeFlags &= -33554433;
          preloadInstanceAndSuspendIfNeeded(workInProgress2, workInProgress2.type, current === null ? null : current.memoizedProps, workInProgress2.pendingProps, renderLanes2);
          return null;
        case 6:
          if (current && workInProgress2.stateNode != null)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else {
            if (typeof newProps !== "string" && workInProgress2.stateNode === null)
              throw Error(formatProdErrorMessage(166));
            current = rootInstanceStackCursor.current;
            if (popHydrationState(workInProgress2)) {
              current = workInProgress2.stateNode;
              renderLanes2 = workInProgress2.memoizedProps;
              newProps = null;
              type = hydrationParentFiber;
              if (type !== null)
                switch (type.tag) {
                  case 27:
                  case 5:
                    newProps = type.memoizedProps;
                }
              current[internalInstanceKey] = workInProgress2;
              current = current.nodeValue === renderLanes2 || newProps !== null && newProps.suppressHydrationWarning === true || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
              current || throwOnHydrationMismatch(workInProgress2, true);
            } else
              current = getOwnerDocumentFromRootContainer(current).createTextNode(newProps), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
          }
          bubbleProperties(workInProgress2);
          return null;
        case 31:
          renderLanes2 = workInProgress2.memoizedState;
          if (current === null || current.memoizedState !== null) {
            newProps = popHydrationState(workInProgress2);
            if (renderLanes2 !== null) {
              if (current === null) {
                if (!newProps)
                  throw Error(formatProdErrorMessage(318));
                current = workInProgress2.memoizedState;
                current = current !== null ? current.dehydrated : null;
                if (!current)
                  throw Error(formatProdErrorMessage(557));
                current[internalInstanceKey] = workInProgress2;
              } else
                resetHydrationState(), (workInProgress2.flags & 128) === 0 && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
              bubbleProperties(workInProgress2);
              current = false;
            } else
              renderLanes2 = upgradeHydrationErrorsToRecoverable(), current !== null && current.memoizedState !== null && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
            if (!current) {
              if (workInProgress2.flags & 256)
                return popSuspenseHandler(workInProgress2), workInProgress2;
              popSuspenseHandler(workInProgress2);
              return null;
            }
            if ((workInProgress2.flags & 128) !== 0)
              throw Error(formatProdErrorMessage(558));
          }
          bubbleProperties(workInProgress2);
          return null;
        case 13:
          newProps = workInProgress2.memoizedState;
          if (current === null || current.memoizedState !== null && current.memoizedState.dehydrated !== null) {
            type = popHydrationState(workInProgress2);
            if (newProps !== null && newProps.dehydrated !== null) {
              if (current === null) {
                if (!type)
                  throw Error(formatProdErrorMessage(318));
                type = workInProgress2.memoizedState;
                type = type !== null ? type.dehydrated : null;
                if (!type)
                  throw Error(formatProdErrorMessage(317));
                type[internalInstanceKey] = workInProgress2;
              } else
                resetHydrationState(), (workInProgress2.flags & 128) === 0 && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
              bubbleProperties(workInProgress2);
              type = false;
            } else
              type = upgradeHydrationErrorsToRecoverable(), current !== null && current.memoizedState !== null && (current.memoizedState.hydrationErrors = type), type = true;
            if (!type) {
              if (workInProgress2.flags & 256)
                return popSuspenseHandler(workInProgress2), workInProgress2;
              popSuspenseHandler(workInProgress2);
              return null;
            }
          }
          popSuspenseHandler(workInProgress2);
          if ((workInProgress2.flags & 128) !== 0)
            return workInProgress2.lanes = renderLanes2, workInProgress2;
          renderLanes2 = newProps !== null;
          current = current !== null && current.memoizedState !== null;
          renderLanes2 && (newProps = workInProgress2.child, type = null, newProps.alternate !== null && newProps.alternate.memoizedState !== null && newProps.alternate.memoizedState.cachePool !== null && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, newProps.memoizedState !== null && newProps.memoizedState.cachePool !== null && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
          renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
          scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
          bubbleProperties(workInProgress2);
          return null;
        case 4:
          return popHostContainer(), current === null && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), workInProgress2.flags |= 67108864, bubbleProperties(workInProgress2), null;
        case 10:
          return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
        case 19:
          popSuspenseListContext(workInProgress2);
          newProps = workInProgress2.memoizedState;
          if (newProps === null)
            return bubbleProperties(workInProgress2), null;
          type = (workInProgress2.flags & 128) !== 0;
          nextResource = newProps.rendering;
          if (nextResource === null)
            if (type)
              cutOffTailIfNeeded(newProps, false);
            else {
              if (workInProgressRootExitStatus !== 0 || current !== null && (current.flags & 128) !== 0)
                for (current = workInProgress2.child;current !== null; ) {
                  nextResource = findFirstSuspended(current);
                  if (nextResource !== null) {
                    workInProgress2.flags |= 128;
                    cutOffTailIfNeeded(newProps, false);
                    current = nextResource.updateQueue;
                    workInProgress2.updateQueue = current;
                    scheduleRetryEffect(workInProgress2, current);
                    workInProgress2.subtreeFlags = 0;
                    current = renderLanes2;
                    for (renderLanes2 = workInProgress2.child;renderLanes2 !== null; )
                      resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                    pushSuspenseListContext(workInProgress2, suspenseStackCursor.current & 1 | 2);
                    isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                    return workInProgress2.child;
                  }
                  current = current.sibling;
                }
              newProps.tail !== null && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
            }
          else {
            if (!type)
              if (current = findFirstSuspended(nextResource), current !== null) {
                if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), newProps.tail === null && newProps.tailMode !== "collapsed" && newProps.tailMode !== "visible" && !nextResource.alternate && !isHydrating)
                  return bubbleProperties(workInProgress2), null;
              } else
                2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && renderLanes2 !== 536870912 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
            newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, current !== null ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
          }
          if (newProps.tail !== null) {
            current = newProps.tail;
            a: {
              for (renderLanes2 = current;renderLanes2 !== null; ) {
                if (renderLanes2.alternate !== null) {
                  renderLanes2 = false;
                  break a;
                }
                renderLanes2 = renderLanes2.sibling;
              }
              renderLanes2 = true;
            }
            newProps.rendering = current;
            newProps.tail = current.sibling;
            newProps.renderingStartTime = now();
            current.sibling = null;
            nextResource = suspenseStackCursor.current;
            nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
            newProps.tailMode === "visible" || newProps.tailMode === "collapsed" || !renderLanes2 || isHydrating ? pushSuspenseListContext(workInProgress2, nextResource) : (renderLanes2 = nextResource, push(suspenseHandlerStackCursor, workInProgress2), push(suspenseStackCursor, renderLanes2), shellBoundary === null && (shellBoundary = workInProgress2));
            isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
            return current;
          }
          bubbleProperties(workInProgress2);
          return null;
        case 22:
        case 23:
          return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = workInProgress2.memoizedState !== null, current !== null ? current.memoizedState !== null !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? (renderLanes2 & 536870912) !== 0 && (workInProgress2.flags & 128) === 0 && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, renderLanes2 !== null && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, workInProgress2.memoizedState !== null && workInProgress2.memoizedState.cachePool !== null && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), current !== null && pop(resumedCache), null;
        case 24:
          return renderLanes2 = null, current !== null && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
        case 25:
          return null;
        case 30:
          return workInProgress2.flags |= 33554432, bubbleProperties(workInProgress2), null;
      }
      throw Error(formatProdErrorMessage(156, workInProgress2.tag));
    }
    function unwindWork(current, workInProgress2) {
      popTreeContext(workInProgress2);
      switch (workInProgress2.tag) {
        case 1:
          return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 3:
          return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, (current & 65536) !== 0 && (current & 128) === 0 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 26:
        case 27:
        case 5:
          return popHostContext(workInProgress2), null;
        case 31:
          if (workInProgress2.memoizedState !== null) {
            popSuspenseHandler(workInProgress2);
            if (workInProgress2.alternate === null)
              throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
          current = workInProgress2.flags;
          return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 13:
          popSuspenseHandler(workInProgress2);
          current = workInProgress2.memoizedState;
          if (current !== null && current.dehydrated !== null) {
            if (workInProgress2.alternate === null)
              throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
          current = workInProgress2.flags;
          return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 19:
          return popSuspenseListContext(workInProgress2), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, current = workInProgress2.memoizedState, current !== null && (current.rendering = null, current.tail = null), workInProgress2.flags |= 4, workInProgress2) : null;
        case 4:
          return popHostContainer(), null;
        case 10:
          return popProvider(workInProgress2.type), null;
        case 22:
        case 23:
          return popSuspenseHandler(workInProgress2), popHiddenContext(), current !== null && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 24:
          return popProvider(CacheContext), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function unwindInterruptedWork(current, interruptedWork) {
      popTreeContext(interruptedWork);
      switch (interruptedWork.tag) {
        case 3:
          popProvider(CacheContext);
          popHostContainer();
          break;
        case 26:
        case 27:
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer();
          break;
        case 31:
          interruptedWork.memoizedState !== null && popSuspenseHandler(interruptedWork);
          break;
        case 13:
          popSuspenseHandler(interruptedWork);
          break;
        case 19:
          popSuspenseListContext(interruptedWork);
          break;
        case 10:
          popProvider(interruptedWork.type);
          break;
        case 22:
        case 23:
          popSuspenseHandler(interruptedWork);
          popHiddenContext();
          current !== null && pop(resumedCache);
          break;
        case 24:
          popProvider(CacheContext);
      }
    }
    function commitHookEffectListMount(flags, finishedWork) {
      try {
        var updateQueue = finishedWork.updateQueue, lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
        if (lastEffect !== null) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              lastEffect = undefined;
              var { create, inst } = updateQueue;
              lastEffect = create();
              inst.destroy = lastEffect;
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
      try {
        var updateQueue = finishedWork.updateQueue, lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
        if (lastEffect !== null) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              var inst = updateQueue.inst, destroy = inst.destroy;
              if (destroy !== undefined) {
                inst.destroy = undefined;
                lastEffect = finishedWork;
                var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                try {
                  destroy_();
                } catch (error) {
                  captureCommitPhaseError(lastEffect, nearestMountedAncestor, error);
                }
              }
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitClassCallbacks(finishedWork) {
      var updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        var instance = finishedWork.stateNode;
        try {
          commitCallbacks(updateQueue, instance);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
      instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
      instance.state = current.memoizedState;
      try {
        instance.componentWillUnmount();
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyAttachRef(current, nearestMountedAncestor) {
      try {
        var ref = current.ref;
        if (ref !== null) {
          switch (current.tag) {
            case 26:
            case 27:
            case 5:
              var instanceToUse = current.stateNode;
              break;
            case 30:
              var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
              if (instance.ref === null || instance.ref.name !== name)
                instance.ref = createViewTransitionInstance(name);
              instanceToUse = instance.ref;
              break;
            case 7:
              if (current.stateNode === null) {
                var fragmentInstance = new FragmentInstance(current);
                traverseVisibleInstancesAndTextInstances(current.child, false, addFragmentHandleToFiber, fragmentInstance, undefined, undefined);
                current.stateNode = fragmentInstance;
              }
              instanceToUse = current.stateNode;
              break;
            default:
              instanceToUse = current.stateNode;
          }
          typeof ref === "function" ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
        }
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyDetachRef(current, nearestMountedAncestor) {
      var { ref, refCleanup } = current;
      if (ref !== null)
        if (typeof refCleanup === "function")
          try {
            refCleanup();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          } finally {
            current.refCleanup = null, current = current.alternate, current != null && (current.refCleanup = null);
          }
        else if (typeof ref === "function")
          try {
            ref(null);
          } catch (error$148) {
            captureCommitPhaseError(current, nearestMountedAncestor, error$148);
          }
        else
          ref.current = null;
    }
    function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
      if ((fiber.tag === 5 || fiber.tag === 27 || fiber.tag === 6) && fiber.alternate === null && parentFragmentInstances !== null)
        for (var i = 0;i < parentFragmentInstances.length; i++)
          commitNewChildToFragmentInstance(fiber.stateNode, parentFragmentInstances[i]);
    }
    function commitFragmentInstanceInsertionEffects(fiber) {
      for (var parent = fiber.return;parent !== null; ) {
        isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
        if (isFragmentInstanceHostBoundary(parent))
          break;
        parent = parent.return;
      }
    }
    function commitFragmentInstanceDeletionEffects(fiber) {
      for (var parent = fiber.return;parent !== null; ) {
        isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
        if (isFragmentInstanceHostBoundary(parent))
          break;
        parent = parent.return;
      }
    }
    function isFragmentInstanceHostBoundary(fiber) {
      return fiber.tag === 5 || fiber.tag === 3 || fiber.tag === 27;
    }
    function isFragmentInstanceParent(fiber) {
      return fiber && fiber.tag === 7 && fiber.stateNode !== null;
    }
    function commitHostMount(finishedWork) {
      var { type, memoizedProps: props, stateNode: instance } = finishedWork;
      try {
        a:
          switch (type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              props.autoFocus && instance.focus();
              break a;
            case "img":
              props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
          }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHostUpdate(finishedWork, newProps, oldProps) {
      try {
        var domElement = finishedWork.stateNode;
        updateProperties(domElement, finishedWork.type, oldProps, newProps);
        domElement[internalPropsKey] = newProps;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function isHostParent(fiber) {
      return fiber.tag === 5 || fiber.tag === 3 || fiber.tag === 26 || fiber.tag === 27 && isSingletonScope(fiber.type) || fiber.tag === 4;
    }
    function getHostSibling(fiber) {
      a:
        for (;; ) {
          for (;fiber.sibling === null; ) {
            if (fiber.return === null || isHostParent(fiber.return))
              return null;
            fiber = fiber.return;
          }
          fiber.sibling.return = fiber.return;
          for (fiber = fiber.sibling;fiber.tag !== 5 && fiber.tag !== 6 && fiber.tag !== 18; ) {
            if (fiber.tag === 27 && isSingletonScope(fiber.type))
              continue a;
            if (fiber.flags & 2)
              continue a;
            if (fiber.child === null || fiber.tag === 4)
              continue a;
            else
              fiber.child.return = fiber, fiber = fiber.child;
          }
          if (!(fiber.flags & 2))
            return fiber.stateNode;
        }
    }
    function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
      var tag = node.tag;
      if (tag === 5 || tag === 6)
        tag = node.stateNode, before ? (parent.nodeType === 9 ? parent.body : parent.nodeName === "HTML" ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = parent.nodeType === 9 ? parent.body : parent.nodeName === "HTML" ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, parent !== null && parent !== undefined || before.onclick !== null || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
      else if (tag !== 4 && (tag === 27 && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, node !== null))
        for (insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling;node !== null; )
          insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling;
    }
    function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
      var tag = node.tag;
      if (tag === 5 || tag === 6)
        tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
      else if (tag !== 4 && (tag === 27 && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, node !== null))
        for (insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling;node !== null; )
          insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling;
    }
    function commitHostSingletonAcquisition(finishedWork) {
      var { stateNode: singleton, memoizedProps: props } = finishedWork;
      try {
        for (var type = finishedWork.type, attributes = singleton.attributes;attributes.length; )
          singleton.removeAttributeNode(attributes[0]);
        setInitialProperties(singleton, type, props);
        singleton[internalInstanceKey] = finishedWork;
        singleton[internalPropsKey] = props;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    var shouldStartViewTransition = false;
    var appearingViewTransitions = null;
    function trackEnterViewTransitions(placement) {
      if (placement.tag === 30 || (placement.subtreeFlags & 33554432) !== 0)
        shouldStartViewTransition = true;
    }
    var viewTransitionCancelableChildren = null;
    function pushViewTransitionCancelableScope() {
      var prevChildren = viewTransitionCancelableChildren;
      viewTransitionCancelableChildren = null;
      return prevChildren;
    }
    var viewTransitionHostInstanceIdx = 0;
    function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
      viewTransitionHostInstanceIdx = 0;
      return applyViewTransitionToHostInstancesRecursive(fiber.child, name, className, collectMeasurements, stopAtNestedViewTransitions);
    }
    function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
      for (var inViewport = false;child !== null; ) {
        if (child.tag === 5) {
          var instance = child.stateNode;
          if (collectMeasurements !== null) {
            var measurement = measureInstance(instance);
            collectMeasurements.push(measurement);
            measurement.view && (inViewport = true);
          } else
            inViewport || measureInstance(instance).view && (inViewport = true);
          shouldStartViewTransition = true;
          applyViewTransitionName(instance, viewTransitionHostInstanceIdx === 0 ? name : name + "_" + viewTransitionHostInstanceIdx, className);
          viewTransitionHostInstanceIdx++;
        } else if (child.tag !== 22 || child.memoizedState === null)
          child.tag === 30 && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(child.child, name, className, collectMeasurements, stopAtNestedViewTransitions) && (inViewport = true);
        child = child.sibling;
      }
      return inViewport;
    }
    function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
      for (;child !== null; ) {
        if (child.tag === 5)
          restoreViewTransitionName(child.stateNode, child.memoizedProps);
        else if (child.tag !== 22 || child.memoizedState === null)
          child.tag === 30 && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(child.child, stopAtNestedViewTransitions);
        child = child.sibling;
      }
    }
    function commitAppearingPairViewTransitions(placement) {
      if ((placement.subtreeFlags & 18874368) !== 0)
        for (placement = placement.child;placement !== null; ) {
          if (placement.tag !== 22 || placement.memoizedState === null) {
            if (commitAppearingPairViewTransitions(placement), placement.tag === 30 && (placement.flags & 18874368) !== 0 && placement.stateNode.paired) {
              var props = placement.memoizedProps;
              if (props.name == null || props.name === "auto")
                throw Error(formatProdErrorMessage(544));
              var name = props.name;
              props = getViewTransitionClassName(props.default, props.share);
              props !== "none" && (applyViewTransitionToHostInstances(placement, name, props, null, false) || restoreViewTransitionOnHostInstances(placement.child, false));
            }
          }
          placement = placement.sibling;
        }
    }
    function commitEnterViewTransitions(placement, gesture) {
      if (placement.tag === 30) {
        var { stateNode: state, memoizedProps: props } = placement, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, state.paired ? props.share : props.enter);
        className !== "none" ? applyViewTransitionToHostInstances(placement, name, className, null, false) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, false) : commitAppearingPairViewTransitions(placement);
      } else if ((placement.subtreeFlags & 33554432) !== 0)
        for (placement = placement.child;placement !== null; )
          commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
      else
        commitAppearingPairViewTransitions(placement);
    }
    function commitDeletedPairViewTransitions(deletion) {
      if (appearingViewTransitions !== null && appearingViewTransitions.size !== 0) {
        var pairs = appearingViewTransitions;
        if ((deletion.subtreeFlags & 18874368) !== 0)
          for (deletion = deletion.child;deletion !== null; ) {
            if (deletion.tag !== 22 || deletion.memoizedState === null) {
              if (deletion.tag === 30 && (deletion.flags & 18874368) !== 0) {
                var props = deletion.memoizedProps, name = props.name;
                if (name != null && name !== "auto") {
                  var pair = pairs.get(name);
                  if (pair !== undefined) {
                    var className = getViewTransitionClassName(props.default, props.share);
                    className !== "none" && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, false));
                    pairs.delete(name);
                    if (pairs.size === 0)
                      break;
                  }
                }
              }
              commitDeletedPairViewTransitions(deletion);
            }
            deletion = deletion.sibling;
          }
      }
    }
    function commitExitViewTransitions(deletion) {
      if (deletion.tag === 30) {
        var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = appearingViewTransitions !== null ? appearingViewTransitions.get(name) : undefined, className = getViewTransitionClassName(props.default, pair !== undefined ? props.share : props.exit);
        className !== "none" && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? pair !== undefined ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, false));
        appearingViewTransitions !== null && commitDeletedPairViewTransitions(deletion);
      } else if ((deletion.subtreeFlags & 33554432) !== 0)
        for (deletion = deletion.child;deletion !== null; )
          commitExitViewTransitions(deletion), deletion = deletion.sibling;
      else
        appearingViewTransitions !== null && commitDeletedPairViewTransitions(deletion);
    }
    function commitNestedViewTransitions(changedParent) {
      for (changedParent = changedParent.child;changedParent !== null; ) {
        if (changedParent.tag === 30) {
          var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
          props = getViewTransitionClassName(props.default, props.update);
          changedParent.flags &= -5;
          props !== "none" && applyViewTransitionToHostInstances(changedParent, name, props, changedParent.memoizedState = [], false);
        } else
          (changedParent.subtreeFlags & 33554432) !== 0 && commitNestedViewTransitions(changedParent);
        changedParent = changedParent.sibling;
      }
    }
    function restorePairedViewTransitions(parent) {
      if ((parent.subtreeFlags & 18874368) !== 0)
        for (parent = parent.child;parent !== null; ) {
          if (parent.tag !== 22 || parent.memoizedState === null) {
            if (parent.tag === 30 && (parent.flags & 18874368) !== 0) {
              var instance = parent.stateNode;
              instance.paired !== null && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, false));
            }
            restorePairedViewTransitions(parent);
          }
          parent = parent.sibling;
        }
    }
    function restoreEnterOrExitViewTransitions(fiber) {
      if (fiber.tag === 30)
        fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, false), restorePairedViewTransitions(fiber);
      else if ((fiber.subtreeFlags & 33554432) !== 0)
        for (fiber = fiber.child;fiber !== null; )
          restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
      else
        restorePairedViewTransitions(fiber);
    }
    function restoreNestedViewTransitions(changedParent) {
      for (changedParent = changedParent.child;changedParent !== null; )
        changedParent.tag === 30 ? restoreViewTransitionOnHostInstances(changedParent.child, false) : (changedParent.subtreeFlags & 33554432) !== 0 && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
    }
    function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
      for (var inViewport = false;child !== null; ) {
        if (child.tag === 5) {
          var instance = child.stateNode;
          if (previousMeasurements !== null && viewTransitionHostInstanceIdx < previousMeasurements.length) {
            var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
            if (previousMeasurement.view || nextMeasurement.view)
              inViewport = true;
            var JSCompiler_temp;
            if (JSCompiler_temp = (parentViewTransition.flags & 4) === 0)
              if (nextMeasurement.clip)
                JSCompiler_temp = true;
              else {
                JSCompiler_temp = previousMeasurement.rect;
                var newRect = nextMeasurement.rect;
                JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
              }
            JSCompiler_temp && (parentViewTransition.flags |= 4);
            nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
            nextMeasurement && (parentViewTransition.flags |= 32);
          } else
            parentViewTransition.flags |= 32;
          (parentViewTransition.flags & 4) !== 0 && applyViewTransitionName(instance, viewTransitionHostInstanceIdx === 0 ? newName : newName + "_" + viewTransitionHostInstanceIdx, className);
          inViewport && (parentViewTransition.flags & 4) !== 0 || (viewTransitionCancelableChildren === null && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(instance, viewTransitionHostInstanceIdx === 0 ? oldName : oldName + "_" + viewTransitionHostInstanceIdx, child.memoizedProps));
          viewTransitionHostInstanceIdx++;
        } else if (child.tag !== 22 || child.memoizedState === null)
          child.tag === 30 && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(parentViewTransition, child.child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) && (inViewport = true);
        child = child.sibling;
      }
      return inViewport;
    }
    function measureNestedViewTransitions(changedParent, gesture) {
      for (changedParent = changedParent.child;changedParent !== null; ) {
        if (changedParent.tag === 30) {
          var { memoizedProps: props, stateNode: state } = changedParent, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
          if (gesture) {
            state = state.clones;
            var previousMeasurements = state === null ? null : state.map(measureClonedInstance);
          } else
            previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
          state = changedParent;
          var child = changedParent.child;
          viewTransitionHostInstanceIdx = 0;
          name = measureViewTransitionHostInstancesRecursive(state, child, name, name, className, previousMeasurements, false);
          (changedParent.flags & 4) !== 0 && name && (gesture || scheduleViewTransitionEvent(changedParent, props.onUpdate));
        } else
          (changedParent.subtreeFlags & 33554432) !== 0 && measureNestedViewTransitions(changedParent, gesture);
        changedParent = changedParent.sibling;
      }
    }
    var offscreenSubtreeIsHidden = false;
    var offscreenSubtreeWasHidden = false;
    var offscreenDirectParentIsHidden = false;
    var needsFormReset = false;
    var PossiblyWeakSet = typeof WeakSet === "function" ? WeakSet : Set;
    var nextEffect = null;
    var viewTransitionContextChanged = false;
    var inUpdateViewTransition = false;
    var rootViewTransitionAffected = false;
    var rootViewTransitionNameCanceled = false;
    function commitBeforeMutationEffects(root2, firstChild, committedLanes) {
      root2 = root2.containerInfo;
      eventsEnabled = _enabled;
      root2 = getActiveElementDeep(root2);
      if (hasSelectionCapabilities(root2)) {
        if ("selectionStart" in root2)
          var JSCompiler_temp = {
            start: root2.selectionStart,
            end: root2.selectionEnd
          };
        else
          a: {
            JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
            var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
            if (selection && selection.rangeCount !== 0) {
              JSCompiler_temp = selection.anchorNode;
              var { anchorOffset, focusNode } = selection;
              selection = selection.focusOffset;
              try {
                JSCompiler_temp.nodeType, focusNode.nodeType;
              } catch (e$21) {
                JSCompiler_temp = null;
                break a;
              }
              var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
              b:
                for (;; ) {
                  for (var next;; ) {
                    node !== JSCompiler_temp || anchorOffset !== 0 && node.nodeType !== 3 || (start = length + anchorOffset);
                    node !== focusNode || selection !== 0 && node.nodeType !== 3 || (end = length + selection);
                    node.nodeType === 3 && (length += node.nodeValue.length);
                    if ((next = node.firstChild) === null)
                      break;
                    parentNode = node;
                    node = next;
                  }
                  for (;; ) {
                    if (node === root2)
                      break b;
                    parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                    parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                    if ((next = node.nextSibling) !== null)
                      break;
                    node = parentNode;
                    parentNode = node.parentNode;
                  }
                  node = next;
                }
              JSCompiler_temp = start === -1 || end === -1 ? null : { start, end };
            } else
              JSCompiler_temp = null;
          }
        JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
      } else
        JSCompiler_temp = null;
      selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
      _enabled = false;
      committedLanes = (committedLanes & 335544064) === committedLanes;
      nextEffect = firstChild;
      for (firstChild = committedLanes ? 9270 : 1024;nextEffect !== null; ) {
        root2 = nextEffect;
        if (committedLanes && (JSCompiler_temp = root2.deletions, JSCompiler_temp !== null))
          for (anchorOffset = 0;anchorOffset < JSCompiler_temp.length; anchorOffset++)
            committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
        if (root2.alternate === null && (root2.flags & 2) !== 0)
          committedLanes && trackEnterViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes);
        else {
          if (root2.tag === 22) {
            if (JSCompiler_temp = root2.alternate, root2.memoizedState !== null) {
              JSCompiler_temp !== null && JSCompiler_temp.memoizedState === null && committedLanes && commitExitViewTransitions(JSCompiler_temp);
              commitBeforeMutationEffects_complete(committedLanes);
              continue;
            } else if (JSCompiler_temp !== null && JSCompiler_temp.memoizedState !== null) {
              committedLanes && trackEnterViewTransitions(root2);
              commitBeforeMutationEffects_complete(committedLanes);
              continue;
            }
          }
          JSCompiler_temp = root2.child;
          (root2.subtreeFlags & firstChild) !== 0 && JSCompiler_temp !== null ? (JSCompiler_temp.return = root2, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root2), commitBeforeMutationEffects_complete(committedLanes));
        }
      }
      appearingViewTransitions = null;
    }
    function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
      for (;nextEffect !== null; ) {
        var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
        switch (fiber.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ((flags & 1024) !== 0 && current !== null) {
              isViewTransitionEligible = undefined;
              flags = current.memoizedProps;
              current = current.memoizedState;
              var instance = fiber.stateNode;
              try {
                var resolvedPrevProps = resolveClassComponentProps(fiber.type, flags);
                isViewTransitionEligible = instance.getSnapshotBeforeUpdate(resolvedPrevProps, current);
                instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
              } catch (error) {
                captureCommitPhaseError(fiber, fiber.return, error);
              }
            }
            break;
          case 3:
            if ((flags & 1024) !== 0) {
              if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, isViewTransitionEligible === 9)
                clearContainerSparingly(current);
              else if (isViewTransitionEligible === 1)
                switch (current.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    clearContainerSparingly(current);
                    break;
                  default:
                    current.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          case 30:
            isViewTransitionEligible && current !== null && (isViewTransitionEligible = getViewTransitionName(current.memoizedProps, current.stateNode), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), flags !== "none" && applyViewTransitionToHostInstances(current, isViewTransitionEligible, flags, current.memoizedState = [], true));
            break;
          default:
            if ((flags & 1024) !== 0)
              throw Error(formatProdErrorMessage(163));
        }
        current = fiber.sibling;
        if (current !== null) {
          current.return = fiber.return;
          nextEffect = current;
          break;
        }
        nextEffect = fiber.return;
      }
    }
    function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitHookEffectListMount(5, finishedWork);
          break;
        case 1:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 4)
            if (finishedRoot = finishedWork.stateNode, current === null)
              try {
                finishedRoot.componentDidMount();
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            else {
              var prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
              current = current.memoizedState;
              try {
                finishedRoot.componentDidUpdate(prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
              } catch (error$146) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error$146);
              }
            }
          flags & 64 && commitClassCallbacks(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 3:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 64 && (finishedRoot = finishedWork.updateQueue, finishedRoot !== null)) {
            current = null;
            if (finishedWork.child !== null)
              switch (finishedWork.child.tag) {
                case 27:
                case 5:
                  current = finishedWork.child.stateNode;
                  break;
                case 1:
                  current = finishedWork.child.stateNode;
              }
            try {
              commitCallbacks(finishedRoot, current);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 27:
          current === null && flags & 4 && commitHostSingletonAcquisition(finishedWork);
        case 26:
        case 5:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          current === null && flags & 4 && commitHostMount(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          break;
        case 31:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          flags & 64 && (finishedRoot = finishedWork.memoizedState, finishedRoot !== null && (finishedRoot = finishedRoot.dehydrated, finishedRoot !== null && (finishedWork = retryDehydratedSuspenseBoundary.bind(null, finishedWork), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
          break;
        case 22:
          flags = finishedWork.memoizedState !== null || offscreenSubtreeIsHidden;
          if (!flags) {
            var newOffscreenSubtreeWasHidden = current !== null && current.memoizedState !== null || offscreenSubtreeWasHidden;
            current = offscreenSubtreeIsHidden;
            prevProps = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = flags;
            (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, (finishedWork.subtreeFlags & 8772) !== 0 && (flags |= 1), recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, flags)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            offscreenSubtreeIsHidden = current;
            offscreenSubtreeWasHidden = prevProps;
          }
          break;
        case 30:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 7:
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      }
    }
    function hideOrUnhideAllChildren(parentFiber, isHidden) {
      for (parentFiber = parentFiber.child;parentFiber !== null; )
        hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
    }
    function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
      switch (fiber.tag) {
        case 5:
        case 26:
          try {
            var instance = fiber.stateNode;
            if (isHidden) {
              var style2 = instance.style;
              typeof style2.setProperty === "function" ? style2.setProperty("display", "none", "important") : style2.display = "none";
            } else {
              var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = styleProp !== undefined && styleProp !== null && styleProp.hasOwnProperty("display") ? styleProp.display : null;
              instance$jscomp$0.style.display = display == null || typeof display === "boolean" ? "" : ("" + display).trim();
            }
          } catch (error) {
            captureCommitPhaseError(fiber, fiber.return, error);
          }
          hideOrUnhideNearestPortals(fiber, isHidden);
          break;
        case 6:
          try {
            fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(fiber, fiber.return, error);
          }
          break;
        case 18:
          try {
            var instance$jscomp$1 = fiber.stateNode;
            isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, true) : hideOrUnhideDehydratedBoundary(fiber.stateNode, false);
          } catch (error) {
            captureCommitPhaseError(fiber, fiber.return, error);
          }
          break;
        case 22:
        case 23:
          fiber.memoizedState === null && hideOrUnhideAllChildren(fiber, isHidden);
          break;
        default:
          hideOrUnhideAllChildren(fiber, isHidden);
      }
    }
    function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
      if (parentFiber.subtreeFlags & 67108864)
        for (parentFiber = parentFiber.child;parentFiber !== null; ) {
          a: {
            var fiber = parentFiber, isHidden = isHidden$jscomp$0;
            switch (fiber.tag) {
              case 4:
                hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
                break a;
              case 22:
                fiber.memoizedState === null && hideOrUnhideNearestPortals(fiber, isHidden);
                break a;
              default:
                hideOrUnhideNearestPortals(fiber, isHidden);
            }
          }
          parentFiber = parentFiber.sibling;
        }
    }
    function detachFiberAfterEffects(fiber) {
      var alternate = fiber.alternate;
      alternate !== null && (fiber.alternate = null, detachFiberAfterEffects(alternate));
      fiber.child = null;
      fiber.deletions = null;
      fiber.sibling = null;
      fiber.tag === 5 && (alternate = fiber.stateNode, alternate !== null && detachDeletedInstance(alternate));
      fiber.stateNode = null;
      fiber.return = null;
      fiber.dependencies = null;
      fiber.memoizedProps = null;
      fiber.memoizedState = null;
      fiber.pendingProps = null;
      fiber.stateNode = null;
      fiber.updateQueue = null;
    }
    var hostParent = null;
    var hostParentIsContainer = false;
    function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
      for (parent = parent.child;parent !== null; )
        commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
    }
    function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
      if (injectedHook && typeof injectedHook.onCommitFiberUnmount === "function")
        try {
          injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
        } catch (err) {}
      switch (deletedFiber.tag) {
        case 26:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
          break;
        case 27:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          commitFragmentInstanceDeletionEffects(deletedFiber);
          var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
          isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          releaseSingletonInstance(deletedFiber.stateNode, deletedFiber.type, deletedFiber.memoizedProps);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 5:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
        case 6:
          deletedFiber.tag === 6 && commitFragmentInstanceDeletionEffects(deletedFiber);
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = null;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          if (hostParent !== null)
            if (hostParentIsContainer)
              try {
                (hostParent.nodeType === 9 ? hostParent.body : hostParent.nodeName === "HTML" ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
              } catch (error) {
                captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
              }
            else
              try {
                hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
              } catch (error) {
                captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
              }
          break;
        case 18:
          hostParent !== null && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(finishedRoot.nodeType === 9 ? finishedRoot.body : finishedRoot.nodeName === "HTML" ? finishedRoot.ownerDocument.body : finishedRoot, deletedFiber.stateNode), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
          break;
        case 4:
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = deletedFiber.stateNode.containerInfo;
          hostParentIsContainer = true;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
          offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 1:
          offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, typeof prevHostParent.componentWillUnmount === "function" && safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 21:
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 22:
          offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || deletedFiber.memoizedState !== null;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          offscreenSubtreeWasHidden = prevHostParent;
          break;
        case 30:
          safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 7:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        default:
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
      }
    }
    function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
      if (finishedWork.memoizedState === null && (finishedRoot = finishedWork.alternate, finishedRoot !== null && (finishedRoot = finishedRoot.memoizedState, finishedRoot !== null))) {
        finishedRoot = finishedRoot.dehydrated;
        try {
          retryIfBlockedOn(finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
      if (finishedWork.memoizedState === null && (finishedRoot = finishedWork.alternate, finishedRoot !== null && (finishedRoot = finishedRoot.memoizedState, finishedRoot !== null && (finishedRoot = finishedRoot.dehydrated, finishedRoot !== null))))
        try {
          retryIfBlockedOn(finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
    }
    function getRetryCache(finishedWork) {
      switch (finishedWork.tag) {
        case 31:
        case 13:
        case 19:
          var retryCache = finishedWork.stateNode;
          retryCache === null && (retryCache = finishedWork.stateNode = new PossiblyWeakSet);
          return retryCache;
        case 22:
          return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, retryCache === null && (retryCache = finishedWork._retryCache = new PossiblyWeakSet), retryCache;
        default:
          throw Error(formatProdErrorMessage(435, finishedWork.tag));
      }
    }
    function attachSuspenseRetryListeners(finishedWork, wakeables) {
      var retryCache = getRetryCache(finishedWork);
      wakeables.forEach(function(wakeable) {
        if (!retryCache.has(wakeable)) {
          retryCache.add(wakeable);
          var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
          wakeable.then(retry, retry);
        }
      });
    }
    function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
      var deletions = parentFiber.deletions;
      if (deletions !== null)
        for (var i = 0;i < deletions.length; i++) {
          var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
          a:
            for (;parent !== null; ) {
              switch (parent.tag) {
                case 27:
                  if (isSingletonScope(parent.type)) {
                    hostParent = parent.stateNode;
                    hostParentIsContainer = false;
                    break a;
                  }
                  break;
                case 5:
                  hostParent = parent.stateNode;
                  hostParentIsContainer = false;
                  break a;
                case 3:
                case 4:
                  hostParent = parent.stateNode.containerInfo;
                  hostParentIsContainer = true;
                  break a;
              }
              parent = parent.return;
            }
          if (hostParent === null)
            throw Error(formatProdErrorMessage(160));
          commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
          hostParent = null;
          hostParentIsContainer = false;
          root2 = childToDelete.alternate;
          root2 !== null && (root2.return = null);
          childToDelete.return = null;
        }
      if (parentFiber.subtreeFlags & 13886)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
    }
    var currentHoistableRoot = null;
    function commitMutationEffectsOnFiber(finishedWork, root2, lanes) {
      var { alternate: current, flags } = finishedWork;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (flags & 4 && (current = finishedWork.updateQueue, current = current !== null ? current.events : null, current !== null))
            for (var ii = 0;ii < current.length; ii++) {
              var _eventPayloads$ii2 = current[ii];
              _eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
            }
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
          break;
        case 1:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, finishedWork !== null && (root2 = finishedWork.callbacks, root2 !== null && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = lanes === null ? root2 : lanes.concat(root2))));
          break;
        case 26:
          ii = currentHoistableRoot;
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          if (flags & 4)
            if (flags = current !== null ? current.memoizedState : null, lanes = finishedWork.memoizedState, current === null)
              if (lanes === null)
                if (finishedWork.stateNode === null)
                  if (offscreenSubtreeIsHidden)
                    finishedWork.stateNode = createHoistableInstance(finishedWork.type, finishedWork.memoizedProps, root2.containerInfo, finishedWork);
                  else {
                    a: {
                      root2 = finishedWork.type;
                      lanes = finishedWork.memoizedProps;
                      flags = ii.ownerDocument || ii;
                      b:
                        switch (root2) {
                          case "title":
                            current = flags.getElementsByTagName("title")[0];
                            if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || current.namespaceURI === "http://www.w3.org/2000/svg" || current.hasAttribute("itemprop"))
                              current = flags.createElement(root2), flags.head.insertBefore(current, flags.querySelector("head > title"));
                            setInitialProperties(current, root2, lanes);
                            current[internalInstanceKey] = finishedWork;
                            markNodeAsHoistable(current);
                            root2 = current;
                            break a;
                          case "link":
                            if (ii = getHydratableHoistableCache("link", "href", flags).get(root2 + (lanes.href || ""))) {
                              for (_eventPayloads$ii2 = 0;_eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                                if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (lanes.href == null || lanes.href === "" ? null : lanes.href) && current.getAttribute("rel") === (lanes.rel == null ? null : lanes.rel) && current.getAttribute("title") === (lanes.title == null ? null : lanes.title) && current.getAttribute("crossorigin") === (lanes.crossOrigin == null ? null : lanes.crossOrigin)) {
                                  ii.splice(_eventPayloads$ii2, 1);
                                  break b;
                                }
                            }
                            current = flags.createElement(root2);
                            setInitialProperties(current, root2, lanes);
                            flags.head.appendChild(current);
                            break;
                          case "meta":
                            if (ii = getHydratableHoistableCache("meta", "content", flags).get(root2 + (lanes.content || ""))) {
                              for (_eventPayloads$ii2 = 0;_eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                                if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (lanes.content == null ? null : "" + lanes.content) && current.getAttribute("name") === (lanes.name == null ? null : lanes.name) && current.getAttribute("property") === (lanes.property == null ? null : lanes.property) && current.getAttribute("http-equiv") === (lanes.httpEquiv == null ? null : lanes.httpEquiv) && current.getAttribute("charset") === (lanes.charSet == null ? null : lanes.charSet)) {
                                  ii.splice(_eventPayloads$ii2, 1);
                                  break b;
                                }
                            }
                            current = flags.createElement(root2);
                            setInitialProperties(current, root2, lanes);
                            flags.head.appendChild(current);
                            break;
                          default:
                            throw Error(formatProdErrorMessage(468, root2));
                        }
                      current[internalInstanceKey] = finishedWork;
                      markNodeAsHoistable(current);
                      root2 = current;
                    }
                    finishedWork.stateNode = root2;
                  }
                else
                  offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
              else
                finishedWork.stateNode = acquireResource(ii, lanes, finishedWork.memoizedProps);
            else
              flags !== lanes ? (flags === null ? (root2 = current.stateNode, root2 === null || offscreenSubtreeWasHidden || root2.parentNode.removeChild(root2)) : flags.count--, lanes === null ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : lanes === null && finishedWork.stateNode !== null && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
          break;
        case 27:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          current !== null && flags & 4 && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
          break;
        case 5:
          ii = offscreenDirectParentIsHidden;
          offscreenDirectParentIsHidden = false;
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          offscreenDirectParentIsHidden = ii;
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          if (finishedWork.flags & 32) {
            root2 = finishedWork.stateNode;
            try {
              setTextContent(root2, ""), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          flags & 4 && finishedWork.stateNode != null && (root2 = finishedWork.memoizedProps, commitHostUpdate(finishedWork, root2, current !== null ? current.memoizedProps : root2));
          flags & 1024 && (needsFormReset = true);
          break;
        case 6:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          if (flags & 4) {
            if (finishedWork.stateNode === null)
              throw Error(formatProdErrorMessage(162));
            root2 = finishedWork.memoizedProps;
            lanes = finishedWork.stateNode;
            try {
              lanes.nodeValue = root2, viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 3:
          viewTransitionMutationContext = false;
          tagCaches = null;
          ii = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(root2.containerInfo);
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          currentHoistableRoot = ii;
          commitReconciliationEffects(finishedWork);
          if (flags & 4 && current !== null && current.memoizedState.isDehydrated)
            try {
              retryIfBlockedOn(root2.containerInfo);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
          viewTransitionMutationContext = false;
          break;
        case 4:
          flags = offscreenDirectParentIsHidden;
          offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
          current = pushMutationContext();
          ii = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo);
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          currentHoistableRoot = ii;
          viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = true);
          viewTransitionMutationContext = current;
          offscreenDirectParentIsHidden = flags;
          break;
        case 12:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          break;
        case 31:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (root2 = finishedWork.updateQueue, root2 !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
          break;
        case 13:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          finishedWork.child.flags & 8192 && finishedWork.memoizedState !== null !== (current !== null && current.memoizedState !== null) && (globalMostRecentFallbackTime = now());
          flags & 4 && (root2 = finishedWork.updateQueue, root2 !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
          break;
        case 22:
          ii = finishedWork.memoizedState !== null;
          _eventPayloads$ii2 = current !== null && current.memoizedState !== null;
          var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
          offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
          commitReconciliationEffects(finishedWork);
          flags & 8192 && (root2 = finishedWork.stateNode, root2._visibility = ii ? root2._visibility & -2 : root2._visibility | 1, !ii || current === null || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root2 = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root2, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
          flags & 4 && (root2 = finishedWork.updateQueue, root2 !== null && (lanes = root2.retryQueue, lanes !== null && (root2.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
          break;
        case 19:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (root2 = finishedWork.updateQueue, root2 !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root2)));
          break;
        case 30:
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          flags = pushMutationContext();
          ii = inUpdateViewTransition;
          _eventPayloads$ii2 = (lanes & 335544064) === lanes;
          prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
          inUpdateViewTransition = _eventPayloads$ii2 && getViewTransitionClassName(prevOffscreenSubtreeIsHidden.default, prevOffscreenSubtreeIsHidden.update) !== "none";
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          _eventPayloads$ii2 && current !== null && viewTransitionMutationContext && (finishedWork.flags |= 4);
          inUpdateViewTransition = ii;
          viewTransitionMutationContext = flags;
          break;
        case 21:
          break;
        case 7:
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return)), current && current.stateNode !== null && (current.stateNode._fragmentFiber = finishedWork);
        default:
          recursivelyTraverseMutationEffects(root2, finishedWork, lanes), commitReconciliationEffects(finishedWork);
      }
    }
    function commitReconciliationEffects(finishedWork) {
      var flags = finishedWork.flags;
      if (flags & 2) {
        try {
          for (var hostParentFiber, parentFiber = finishedWork.return;parentFiber !== null; ) {
            if (isHostParent(parentFiber)) {
              hostParentFiber = parentFiber;
              break;
            }
            parentFiber = parentFiber.return;
          }
          parentFiber = null;
          for (var parent = finishedWork.return;parent !== null; ) {
            if (isFragmentInstanceParent(parent)) {
              var fragmentInstance = parent.stateNode;
              parentFiber === null ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
            }
            if (isFragmentInstanceHostBoundary(parent))
              break;
            parent = parent.return;
          }
          var JSCompiler_inline_result = parentFiber;
          if (hostParentFiber == null)
            throw Error(formatProdErrorMessage(160));
          switch (hostParentFiber.tag) {
            case 27:
              var parent$jscomp$0 = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before, parent$jscomp$0, JSCompiler_inline_result);
              break;
            case 5:
              var parent$149 = hostParentFiber.stateNode;
              hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
              var before$150 = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before$150, parent$149, JSCompiler_inline_result);
              break;
            case 3:
            case 4:
              var parent$151 = hostParentFiber.stateNode.containerInfo, before$152 = getHostSibling(finishedWork);
              insertOrAppendPlacementNodeIntoContainer(finishedWork, before$152, parent$151, JSCompiler_inline_result);
              break;
            default:
              throw Error(formatProdErrorMessage(161));
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
        finishedWork.flags &= -3;
      }
      flags & 4096 && (finishedWork.flags &= -4097);
    }
    function recursivelyResetForms(parentFiber) {
      if (parentFiber.subtreeFlags & 1024)
        for (parentFiber = parentFiber.child;parentFiber !== null; ) {
          var fiber = parentFiber;
          recursivelyResetForms(fiber);
          fiber.tag === 5 && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = true, fiber.reset(), _enabled = false);
          parentFiber = parentFiber.sibling;
        }
    }
    function recursivelyTraverseAfterMutationEffects(root2, parentFiber) {
      if (parentFiber.subtreeFlags & 9270)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitAfterMutationEffectsOnFiber(parentFiber, root2), parentFiber = parentFiber.sibling;
      else
        measureNestedViewTransitions(parentFiber, false);
    }
    function commitAfterMutationEffectsOnFiber(finishedWork, root2) {
      var current = finishedWork.alternate;
      if (current === null)
        commitEnterViewTransitions(finishedWork, false);
      else
        switch (finishedWork.tag) {
          case 3:
            rootViewTransitionNameCanceled = viewTransitionContextChanged = false;
            pushViewTransitionCancelableScope();
            recursivelyTraverseAfterMutationEffects(root2, finishedWork);
            if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
              finishedWork = viewTransitionCancelableChildren;
              if (finishedWork !== null)
                for (var i = 0;i < finishedWork.length; i += 3) {
                  current = finishedWork[i];
                  var oldName = finishedWork[i + 1];
                  restoreViewTransitionName(current, finishedWork[i + 2]);
                  current = current.ownerDocument.documentElement;
                  current !== null && current.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + oldName + ")"
                  });
                }
              finishedWork = root2.containerInfo;
              finishedWork = finishedWork.nodeType === 9 ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
              finishedWork !== null && finishedWork.style.viewTransitionName === "" && (finishedWork.style.viewTransitionName = "none", finishedWork.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }), finishedWork.animate({ width: [0, 0], height: [0, 0] }, {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }));
              rootViewTransitionNameCanceled = true;
            }
            viewTransitionCancelableChildren = null;
            break;
          case 5:
            recursivelyTraverseAfterMutationEffects(root2, finishedWork);
            break;
          case 4:
            i = viewTransitionContextChanged;
            viewTransitionContextChanged = false;
            recursivelyTraverseAfterMutationEffects(root2, finishedWork);
            viewTransitionContextChanged && (rootViewTransitionAffected = true);
            viewTransitionContextChanged = i;
            break;
          case 22:
            finishedWork.memoizedState === null && (current.memoizedState !== null ? commitEnterViewTransitions(finishedWork, false) : recursivelyTraverseAfterMutationEffects(root2, finishedWork));
            break;
          case 30:
            i = viewTransitionContextChanged;
            oldName = pushViewTransitionCancelableScope();
            viewTransitionContextChanged = false;
            recursivelyTraverseAfterMutationEffects(root2, finishedWork);
            viewTransitionContextChanged && (finishedWork.flags |= 4);
            var { memoizedProps: props, stateNode: state } = finishedWork;
            root2 = getViewTransitionName(props, state);
            state = getViewTransitionName(current.memoizedProps, state);
            var className = getViewTransitionClassName(props.default, props.update);
            className === "none" ? root2 = false : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root2 = measureViewTransitionHostInstancesRecursive(finishedWork, current, root2, state, className, props, true), viewTransitionHostInstanceIdx !== (props === null ? 0 : props.length) && (finishedWork.flags |= 32));
            (finishedWork.flags & 4) !== 0 && root2 ? (scheduleViewTransitionEvent(finishedWork, finishedWork.memoizedProps.onUpdate), viewTransitionCancelableChildren = oldName) : oldName !== null && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
            viewTransitionContextChanged = (finishedWork.flags & 32) !== 0 ? true : i;
            break;
          default:
            recursivelyTraverseAfterMutationEffects(root2, finishedWork);
        }
    }
    function recursivelyTraverseLayoutEffects(root2, parentFiber) {
      if (parentFiber.subtreeFlags & 8772)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
    }
    function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 1:
            safelyDetachRef(finishedWork, finishedWork.return);
            var instance = finishedWork.stateNode;
            typeof instance.componentWillUnmount === "function" && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 27:
            (layoutEffectTraversalFlags & 2) !== 0 && releaseSingletonInstance(finishedWork.stateNode, finishedWork.type, finishedWork.memoizedProps);
          case 5:
            safelyDetachRef(finishedWork, finishedWork.return);
            finishedWork.tag !== 5 && finishedWork.tag !== 27 || commitFragmentInstanceDeletionEffects(finishedWork);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 6:
            commitFragmentInstanceDeletionEffects(finishedWork);
            break;
          case 26:
            safelyDetachRef(finishedWork, finishedWork.return);
            instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null || instance === null || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 22:
            finishedWork.memoizedState === null && recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 30:
            safelyDetachRef(finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 7:
            safelyDetachRef(finishedWork, finishedWork.return);
          default:
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
      layoutEffectTraversalFlags = (parentFiber.subtreeFlags & 8772) !== 0 ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = (layoutEffectTraversalFlags & 1) !== 0;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            commitHookEffectListMount(4, finishedWork);
            break;
          case 1:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            current = finishedWork;
            finishedRoot = current.stateNode;
            if (typeof finishedRoot.componentDidMount === "function")
              try {
                finishedRoot.componentDidMount();
              } catch (error) {
                captureCommitPhaseError(current, current.return, error);
              }
            current = finishedWork;
            finishedRoot = current.updateQueue;
            if (finishedRoot !== null) {
              var instance = current.stateNode;
              try {
                var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                if (hiddenCallbacks !== null)
                  for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0;finishedRoot < hiddenCallbacks.length; finishedRoot++)
                    callCallback(hiddenCallbacks[finishedRoot], instance);
              } catch (error) {
                captureCommitPhaseError(current, current.return, error);
              }
            }
            includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 27:
            (layoutEffectTraversalFlags & 2) !== 0 && commitHostSingletonAcquisition(finishedWork);
          case 5:
            finishedWork.tag !== 5 && finishedWork.tag !== 27 || commitFragmentInstanceInsertionEffects(finishedWork);
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && current === null && flags & 4 && commitHostMount(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 6:
            commitFragmentInstanceInsertionEffects(finishedWork);
            break;
          case 26:
            instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null || instance === null || offscreenSubtreeIsHidden || mountHoistable(getHoistableRoot(instance.ownerDocument), finishedWork.type, instance);
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && current === null && flags & 4 && commitHostMount(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            break;
          case 31:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 22:
            finishedWork.memoizedState === null && recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 30:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 7:
            safelyAttachRef(finishedWork, finishedWork.return);
          default:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function commitOffscreenPassiveMountEffects(current, finishedWork) {
      var previousCache = null;
      current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null && (previousCache = current.memoizedState.cachePool.pool);
      current = null;
      finishedWork.memoizedState !== null && finishedWork.memoizedState.cachePool !== null && (current = finishedWork.memoizedState.cachePool.pool);
      current !== previousCache && (current != null && current.refCount++, previousCache != null && releaseCache(previousCache));
    }
    function commitCachePassiveMountEffect(current, finishedWork) {
      current = null;
      finishedWork.alternate !== null && (current = finishedWork.alternate.memoizedState.cache);
      finishedWork = finishedWork.memoizedState.cache;
      finishedWork !== current && (finishedWork.refCount++, current != null && releaseCache(current));
    }
    function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
      var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
      if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256))
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitPassiveMountOnFiber(root2, parentFiber, committedLanes, committedTransitions), parentFiber = parentFiber.sibling;
      else
        isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
    }
    function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
      var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
      isViewTransitionEligible && finishedWork.alternate === null && finishedWork.return !== null && finishedWork.return.alternate !== null && restoreEnterOrExitViewTransitions(finishedWork);
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          flags & 2048 && commitHookEffectListMount(9, finishedWork);
          break;
        case 1:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 3:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = finishedRoot.nodeType === 9 ? finishedRoot.body : finishedRoot.nodeName === "HTML" ? finishedRoot.ownerDocument.body : finishedRoot, finishedRoot.style.viewTransitionName === "root" && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, finishedRoot !== null && finishedRoot.style.viewTransitionName === "none" && (finishedRoot.style.viewTransitionName = ""));
          flags & 2048 && (flags = null, finishedWork.alternate !== null && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, flags != null && releaseCache(flags)));
          break;
        case 12:
          if (flags & 2048) {
            recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
            flags = finishedWork.stateNode;
            try {
              var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
              typeof onPostCommit === "function" && onPostCommit(id, finishedWork.alternate === null ? "mount" : "update", flags.passiveEffectDuration, -0);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          } else
            recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 31:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 13:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 23:
          break;
        case 22:
          _finishedWork$memoize2 = finishedWork.stateNode;
          id = finishedWork.alternate;
          finishedWork.memoizedState !== null ? (isViewTransitionEligible && id !== null && id.memoizedState === null && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork)) : (isViewTransitionEligible && id !== null && id.memoizedState !== null && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, (finishedWork.subtreeFlags & 10256) !== 0 || false)));
          flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
          break;
        case 24:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        case 30:
          isViewTransitionEligible && (flags = finishedWork.alternate, flags !== null && (restoreViewTransitionOnHostInstances(flags.child, true), restoreViewTransitionOnHostInstances(finishedWork.child, true)));
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        default:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
      }
    }
    function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
      includeWorkInProgressEffects = includeWorkInProgressEffects && ((parentFiber.subtreeFlags & 10256) !== 0 || false);
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
            commitHookEffectListMount(8, finishedWork);
            break;
          case 23:
            break;
          case 22:
            var instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects));
            includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
            break;
          case 24:
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
            includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child;parentFiber !== null; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 22:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
              break;
            case 24:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          }
          parentFiber = parentFiber.sibling;
        }
    }
    var suspenseyCommitFlag = 8192;
    function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
      if (parentFiber.subtreeFlags & suspenseyCommitFlag)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
    }
    function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
      switch (fiber.tag) {
        case 26:
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          fiber.flags & suspenseyCommitFlag && (fiber.memoizedState !== null ? suspendResource(suspendedState, currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
          break;
        case 5:
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
          break;
        case 3:
        case 4:
          var previousHoistableRoot = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          currentHoistableRoot = previousHoistableRoot;
          break;
        case 22:
          fiber.memoizedState === null && (previousHoistableRoot = fiber.alternate, previousHoistableRoot !== null && previousHoistableRoot.memoizedState !== null ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
          break;
        case 30:
          if ((fiber.flags & suspenseyCommitFlag) !== 0 && (previousHoistableRoot = fiber.memoizedProps.name, previousHoistableRoot != null && previousHoistableRoot !== "auto")) {
            var state = fiber.stateNode;
            state.paired = null;
            appearingViewTransitions === null && (appearingViewTransitions = new Map);
            appearingViewTransitions.set(previousHoistableRoot, state);
          }
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          break;
        default:
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
      }
    }
    function detachAlternateSiblings(parentFiber) {
      var previousFiber = parentFiber.alternate;
      if (previousFiber !== null && (parentFiber = previousFiber.child, parentFiber !== null)) {
        previousFiber.child = null;
        do
          previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
        while (parentFiber !== null);
      }
    }
    function recursivelyTraversePassiveUnmountEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if ((parentFiber.flags & 16) !== 0) {
        if (deletions !== null)
          for (var i = 0;i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
          }
        detachAlternateSiblings(parentFiber);
      }
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
    }
    function commitPassiveUnmountOnFiber(finishedWork) {
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
          break;
        case 3:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        case 12:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        case 22:
          var instance = finishedWork.stateNode;
          finishedWork.memoizedState !== null && instance._visibility & 2 && (finishedWork.return === null || finishedWork.return.tag !== 13) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        default:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
      }
    }
    function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if ((parentFiber.flags & 16) !== 0) {
        if (deletions !== null)
          for (var i = 0;i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
          }
        detachAlternateSiblings(parentFiber);
      }
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        deletions = parentFiber;
        switch (deletions.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectListUnmount(8, deletions, deletions.return);
            recursivelyTraverseDisconnectPassiveEffects(deletions);
            break;
          case 22:
            i = deletions.stateNode;
            i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
            break;
          default:
            recursivelyTraverseDisconnectPassiveEffects(deletions);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
      for (;nextEffect !== null; ) {
        var fiber = nextEffect;
        switch (fiber.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
            break;
          case 23:
          case 22:
            if (fiber.memoizedState !== null && fiber.memoizedState.cachePool !== null) {
              var cache = fiber.memoizedState.cachePool.pool;
              cache != null && cache.refCount++;
            }
            break;
          case 24:
            releaseCache(fiber.memoizedState.cache);
        }
        cache = fiber.child;
        if (cache !== null)
          cache.return = fiber, nextEffect = cache;
        else
          a:
            for (fiber = deletedSubtreeRoot;nextEffect !== null; ) {
              cache = nextEffect;
              var { sibling, return: returnFiber } = cache;
              detachFiberAfterEffects(cache);
              if (cache === fiber) {
                nextEffect = null;
                break a;
              }
              if (sibling !== null) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                break a;
              }
              nextEffect = returnFiber;
            }
      }
    }
    var DefaultAsyncDispatcher = {
      getCacheForType: function(resourceType) {
        var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
        cacheForType === undefined && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
        return cacheForType;
      },
      cacheSignal: function() {
        return readContext(CacheContext).controller.signal;
      }
    };
    var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
    var executionContext = 0;
    var workInProgressRoot = null;
    var workInProgress = null;
    var workInProgressRootRenderLanes = 0;
    var workInProgressSuspendedReason = 0;
    var workInProgressThrownValue = null;
    var workInProgressRootDidSkipSuspendedSiblings = false;
    var workInProgressRootIsPrerendering = false;
    var workInProgressRootDidAttachPingListener = false;
    var entangledRenderLanes = 0;
    var workInProgressRootExitStatus = 0;
    var workInProgressRootSkippedLanes = 0;
    var workInProgressRootInterleavedUpdatedLanes = 0;
    var workInProgressRootPingedLanes = 0;
    var workInProgressDeferredLane = 0;
    var workInProgressSuspendedRetryLanes = 0;
    var workInProgressRootConcurrentErrors = null;
    var workInProgressRootRecoverableErrors = null;
    var workInProgressRootDidIncludeRecursiveRenderUpdate = false;
    var globalMostRecentFallbackTime = 0;
    var globalMostRecentTransitionTime = 0;
    var workInProgressRootRenderTargetTime = Infinity;
    var workInProgressTransitions = null;
    var legacyErrorBoundariesThatAlreadyFailed = null;
    var pendingEffectsStatus = 0;
    var pendingEffectsRoot = null;
    var pendingFinishedWork = null;
    var pendingEffectsLanes = 0;
    var pendingEffectsRemainingLanes = 0;
    var pendingPassiveTransitions = null;
    var pendingRecoverableErrors = null;
    var pendingViewTransition = null;
    var pendingViewTransitionEvents = null;
    var pendingTransitionTypes = null;
    var nestedUpdateCount = 0;
    var rootWithNestedUpdates = null;
    function requestUpdateLane() {
      return (executionContext & 2) !== 0 && workInProgressRootRenderLanes !== 0 ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : ReactSharedInternals.T !== null ? requestTransitionLane() : resolveUpdatePriority();
    }
    function requestDeferredLane() {
      if (workInProgressDeferredLane === 0)
        if ((workInProgressRootRenderLanes & 536870912) === 0 || isHydrating) {
          var lane = nextTransitionDeferredLane;
          nextTransitionDeferredLane <<= 1;
          (nextTransitionDeferredLane & 3932160) === 0 && (nextTransitionDeferredLane = 262144);
          workInProgressDeferredLane = lane;
        } else
          workInProgressDeferredLane = 536870912;
      lane = suspenseHandlerStackCursor.current;
      lane !== null && (lane.flags |= 32);
      return workInProgressDeferredLane;
    }
    function scheduleViewTransitionEvent(fiber, callback) {
      if (callback != null) {
        var state = fiber.stateNode, instance = state.ref;
        instance === null && (instance = state.ref = createViewTransitionInstance(getViewTransitionName(fiber.memoizedProps, state)));
        pendingViewTransitionEvents === null && (pendingViewTransitionEvents = []);
        pendingViewTransitionEvents.push(callback.bind(null, instance));
      }
    }
    function scheduleUpdateOnFiber(root2, fiber, lane) {
      if (root2 === workInProgressRoot && (workInProgressSuspendedReason === 2 || workInProgressSuspendedReason === 9) || root2.cancelPendingCommit !== null)
        prepareFreshStack(root2, 0), markRootSuspended(root2, workInProgressRootRenderLanes, workInProgressDeferredLane, false);
      markRootUpdated$1(root2, lane);
      if ((executionContext & 2) === 0 || root2 !== workInProgressRoot)
        root2 === workInProgressRoot && ((executionContext & 2) === 0 && (workInProgressRootInterleavedUpdatedLanes |= lane), workInProgressRootExitStatus === 4 && markRootSuspended(root2, workInProgressRootRenderLanes, workInProgressDeferredLane, false)), ensureRootIsScheduled(root2);
    }
    function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
      if ((executionContext & 6) !== 0)
        throw Error(formatProdErrorMessage(327));
      var shouldTimeSlice = !forceSync && (lanes & 127) === 0 && (lanes & root$jscomp$0.expiredLanes) === 0 || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
      do {
        if (exitStatus === 0) {
          workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
          break;
        } else {
          forceSync = root$jscomp$0.current.alternate;
          if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
            exitStatus = renderRootSync(root$jscomp$0, lanes, false);
            renderWasConcurrent = false;
            continue;
          }
          if (exitStatus === 2) {
            renderWasConcurrent = lanes;
            if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
              var JSCompiler_inline_result = 0;
            else
              JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = JSCompiler_inline_result !== 0 ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
            if (JSCompiler_inline_result !== 0) {
              lanes = JSCompiler_inline_result;
              a: {
                var root2 = root$jscomp$0;
                exitStatus = workInProgressRootConcurrentErrors;
                var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
                wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
                JSCompiler_inline_result = renderRootSync(root2, JSCompiler_inline_result, false);
                if (JSCompiler_inline_result !== 2 && JSCompiler_inline_result !== 6) {
                  if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                    root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                    workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                    exitStatus = 4;
                    break a;
                  }
                  renderWasConcurrent = workInProgressRootRecoverableErrors;
                  workInProgressRootRecoverableErrors = exitStatus;
                  renderWasConcurrent !== null && (workInProgressRootRecoverableErrors === null ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, renderWasConcurrent));
                }
                exitStatus = JSCompiler_inline_result;
              }
              renderWasConcurrent = false;
              if (exitStatus !== 2)
                continue;
            }
          }
          if (exitStatus === 1) {
            prepareFreshStack(root$jscomp$0, 0);
            markRootSuspended(root$jscomp$0, lanes, 0, true);
            break;
          }
          a: {
            shouldTimeSlice = root$jscomp$0;
            renderWasConcurrent = exitStatus;
            switch (renderWasConcurrent) {
              case 0:
              case 1:
                throw Error(formatProdErrorMessage(345));
              case 4:
                if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes)
                  break;
              case 6:
                markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
                break a;
              case 2:
                workInProgressRootRecoverableErrors = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(formatProdErrorMessage(329));
            }
            if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
              markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
              if (getNextLanes(shouldTimeSlice, 0, true) !== 0)
                break a;
              pendingEffectsLanes = lanes;
              shouldTimeSlice.timeoutHandle = scheduleTimeout(completeRootWhenReady.bind(null, shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, "Throttled", -0, 0), exitStatus);
              break a;
            }
            completeRootWhenReady(shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, null, -0, 0);
          }
        }
        break;
      } while (1);
      ensureRootIsScheduled(root$jscomp$0);
    }
    function completeRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
      root2.timeoutHandle = -1;
      var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
      suspendedCommitReason = null;
      if (isViewTransitionEligible || subtreeFlags & 8192 || (subtreeFlags & 16785408) === 16785408) {
        if (suspendedCommitReason = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: noop$1
        }, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedCommitReason), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root2.containerInfo, isViewTransitionEligible = (isViewTransitionEligible.nodeType === 9 ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, isViewTransitionEligible != null && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = true, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(suspendedCommitReason, subtreeFlags), subtreeFlags !== null) {
          pendingEffectsLanes = lanes;
          root2.cancelPendingCommit = subtreeFlags(completeRoot.bind(null, root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, null, completedRenderStartTime, completedRenderEndTime));
          markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
          return;
        }
      }
      completeRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason);
    }
    function isRenderConsistentWithExternalStores(finishedWork) {
      for (var node = finishedWork;; ) {
        var tag = node.tag;
        if ((tag === 0 || tag === 11 || tag === 15) && node.flags & 16384 && (tag = node.updateQueue, tag !== null && (tag = tag.stores, tag !== null)))
          for (var i = 0;i < tag.length; i++) {
            var check = tag[i], getSnapshot = check.getSnapshot;
            check = check.value;
            try {
              if (!objectIs(getSnapshot(), check))
                return false;
            } catch (error) {
              return false;
            }
          }
        tag = node.child;
        if (node.subtreeFlags & 16384 && tag !== null)
          tag.return = node, node = tag;
        else {
          if (node === finishedWork)
            break;
          for (;node.sibling === null; ) {
            if (node.return === null || node.return === finishedWork)
              return true;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      }
      return true;
    }
    function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
      suspendedLanes = getEntangledLanes(root2, suspendedLanes);
      suspendedLanes &= ~workInProgressRootPingedLanes;
      suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
      root2.suspendedLanes |= suspendedLanes;
      root2.pingedLanes &= ~suspendedLanes;
      didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
      didAttemptEntireTree = root2.expirationTimes;
      for (var lanes = suspendedLanes;0 < lanes; ) {
        var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
        didAttemptEntireTree[index$6] = -1;
        lanes &= ~lane;
      }
      spawnedLane !== 0 && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
    }
    function flushSyncWork$1() {
      return (executionContext & 6) === 0 ? (flushSyncWorkAcrossRoots_impl(0, false), false) : true;
    }
    function resetWorkInProgressStack() {
      if (workInProgress !== null) {
        if (workInProgressSuspendedReason === 0)
          var interruptedWork = workInProgress.return;
        else
          interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
        for (;interruptedWork !== null; )
          unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
        workInProgress = null;
      }
    }
    function prepareFreshStack(root2, lanes) {
      var timeoutHandle = root2.timeoutHandle;
      timeoutHandle !== -1 && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
      timeoutHandle = root2.cancelPendingCommit;
      timeoutHandle !== null && (root2.cancelPendingCommit = null, timeoutHandle());
      pendingEffectsLanes = 0;
      resetWorkInProgressStack();
      workInProgressRoot = root2;
      workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
      workInProgressRootRenderLanes = lanes;
      workInProgressSuspendedReason = 0;
      workInProgressThrownValue = null;
      workInProgressRootDidSkipSuspendedSiblings = false;
      workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
      workInProgressRootDidAttachPingListener = false;
      workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
      workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
      workInProgressRootDidIncludeRecursiveRenderUpdate = false;
      entangledRenderLanes = getEntangledLanes(root2, lanes);
      finishQueueingConcurrentUpdates();
      return timeoutHandle;
    }
    function handleThrow(root2, thrownValue) {
      currentlyRenderingFiber = null;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : thrownValue !== null && typeof thrownValue === "object" && typeof thrownValue.then === "function" ? 6 : 1;
      workInProgressThrownValue = thrownValue;
      workInProgress === null && (workInProgressRootExitStatus = 1, logUncaughtError(root2, createCapturedValueAtFiber(thrownValue, root2.current)));
    }
    function shouldRemainOnPreviousScreen() {
      var handler = suspenseHandlerStackCursor.current;
      return handler === null ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? shellBoundary === null ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || (workInProgressRootRenderLanes & 536870912) !== 0 ? handler === shellBoundary : false;
    }
    function pushDispatcher() {
      var prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      return prevDispatcher === null ? ContextOnlyDispatcher : prevDispatcher;
    }
    function pushAsyncDispatcher() {
      var prevAsyncDispatcher = ReactSharedInternals.A;
      ReactSharedInternals.A = DefaultAsyncDispatcher;
      return prevAsyncDispatcher;
    }
    function renderDidSuspendDelayIfPossible() {
      workInProgressRootExitStatus = 4;
      workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && suspenseHandlerStackCursor.current !== null || (workInProgressRootIsPrerendering = true);
      (workInProgressRootSkippedLanes & 134217727) === 0 && (workInProgressRootInterleavedUpdatedLanes & 134217727) === 0 || workInProgressRoot === null || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, false);
    }
    function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
      var prevExecutionContext = executionContext;
      executionContext |= 2;
      var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
      if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
        workInProgressTransitions = null, prepareFreshStack(root2, lanes);
      lanes = false;
      var exitStatus = workInProgressRootExitStatus;
      a:
        do
          try {
            if (workInProgressSuspendedReason !== 0 && workInProgress !== null) {
              var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack();
                  exitStatus = 6;
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  suspenseHandlerStackCursor.current === null && (lanes = true);
                  var reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    break a;
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync();
            exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue$184) {
            handleThrow(root2, thrownValue$184);
          }
        while (1);
      lanes && root2.shellSuspendCounter++;
      lastContextDependency = currentlyRenderingFiber$1 = null;
      executionContext = prevExecutionContext;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      workInProgress === null && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
      return exitStatus;
    }
    function workLoopSync() {
      for (;workInProgress !== null; )
        performUnitOfWork(workInProgress);
    }
    function renderRootConcurrent(root2, lanes) {
      var prevExecutionContext = executionContext;
      executionContext |= 2;
      var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
      workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
      a:
        do
          try {
            if (workInProgressSuspendedReason !== 0 && workInProgress !== null) {
              lanes = workInProgress;
              var thrownValue = workInProgressThrownValue;
              b:
                switch (workInProgressSuspendedReason) {
                  case 1:
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
                    break;
                  case 2:
                  case 9:
                    if (isThenableResolved(thrownValue)) {
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = null;
                      replaySuspendedUnitOfWork(lanes);
                      break;
                    }
                    lanes = function() {
                      workInProgressSuspendedReason !== 2 && workInProgressSuspendedReason !== 9 || workInProgressRoot !== root2 || (workInProgressSuspendedReason = 7);
                      ensureRootIsScheduled(root2);
                    };
                    thrownValue.then(lanes, lanes);
                    break a;
                  case 3:
                    workInProgressSuspendedReason = 7;
                    break a;
                  case 4:
                    workInProgressSuspendedReason = 5;
                    break a;
                  case 7:
                    isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
                    break;
                  case 5:
                    var resource = null;
                    switch (workInProgress.tag) {
                      case 26:
                        resource = workInProgress.memoizedState;
                      case 5:
                      case 27:
                        var hostFiber = workInProgress;
                        if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                          workInProgressSuspendedReason = 0;
                          workInProgressThrownValue = null;
                          var sibling = hostFiber.sibling;
                          if (sibling !== null)
                            workInProgress = sibling;
                          else {
                            var returnFiber = hostFiber.return;
                            returnFiber !== null ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                          }
                          break b;
                        }
                    }
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
                    break;
                  case 6:
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
                    break;
                  case 8:
                    resetWorkInProgressStack();
                    workInProgressRootExitStatus = 6;
                    break a;
                  default:
                    throw Error(formatProdErrorMessage(462));
                }
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue$186) {
            handleThrow(root2, thrownValue$186);
          }
        while (1);
      lastContextDependency = currentlyRenderingFiber$1 = null;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      executionContext = prevExecutionContext;
      if (workInProgress !== null)
        return 0;
      workInProgressRoot = null;
      workInProgressRootRenderLanes = 0;
      finishQueueingConcurrentUpdates();
      return workInProgressRootExitStatus;
    }
    function workLoopConcurrentByScheduler() {
      for (;workInProgress !== null && !shouldYield(); )
        performUnitOfWork(workInProgress);
    }
    function performUnitOfWork(unitOfWork) {
      var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      next === null ? completeUnitOfWork(unitOfWork) : workInProgress = next;
    }
    function replaySuspendedUnitOfWork(unitOfWork) {
      var next = unitOfWork;
      var current = next.alternate;
      switch (next.tag) {
        case 15:
        case 0:
          next = replayFunctionComponent(current, next, next.pendingProps, next.type, undefined, workInProgressRootRenderLanes);
          break;
        case 11:
          next = replayFunctionComponent(current, next, next.pendingProps, next.type.render, next.ref, workInProgressRootRenderLanes);
          break;
        case 5:
          resetHooksOnUnwind(next);
          var fiber = next;
          fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), fiber.tag === 5 && fiber.stateNode != null && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = true));
        default:
          unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
      }
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      next === null ? completeUnitOfWork(unitOfWork) : workInProgress = next;
    }
    function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
      lastContextDependency = currentlyRenderingFiber$1 = null;
      resetHooksOnUnwind(unitOfWork);
      thenableState$1 = null;
      thenableIndexCounter$1 = 0;
      var returnFiber = unitOfWork.return;
      try {
        if (throwException(root2, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
          workInProgressRootExitStatus = 1;
          logUncaughtError(root2, createCapturedValueAtFiber(thrownValue, root2.current));
          workInProgress = null;
          return;
        }
      } catch (error) {
        if (returnFiber !== null)
          throw workInProgress = returnFiber, error;
        workInProgressRootExitStatus = 1;
        logUncaughtError(root2, createCapturedValueAtFiber(thrownValue, root2.current));
        workInProgress = null;
        return;
      }
      if (unitOfWork.flags & 32768) {
        if (isHydrating || suspendedReason === 1)
          root2 = true;
        else if (workInProgressRootIsPrerendering || (workInProgressRootRenderLanes & 536870912) !== 0)
          root2 = false;
        else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, suspendedReason === 2 || suspendedReason === 9 || suspendedReason === 3 || suspendedReason === 6)
          suspendedReason = suspenseHandlerStackCursor.current, suspendedReason !== null && suspendedReason.tag === 13 && (suspendedReason.flags |= 16384);
        unwindUnitOfWork(unitOfWork, root2);
      } else
        completeUnitOfWork(unitOfWork);
    }
    function completeUnitOfWork(unitOfWork) {
      var completedWork = unitOfWork;
      do {
        if ((completedWork.flags & 32768) !== 0) {
          unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
          return;
        }
        unitOfWork = completedWork.return;
        var next = completeWork(completedWork.alternate, completedWork, entangledRenderLanes);
        if (next !== null) {
          workInProgress = next;
          return;
        }
        completedWork = completedWork.sibling;
        if (completedWork !== null) {
          workInProgress = completedWork;
          return;
        }
        workInProgress = completedWork = unitOfWork;
      } while (completedWork !== null);
      workInProgressRootExitStatus === 0 && (workInProgressRootExitStatus = 5);
    }
    function unwindUnitOfWork(unitOfWork, skipSiblings) {
      do {
        var next = unwindWork(unitOfWork.alternate, unitOfWork);
        if (next !== null) {
          next.flags &= 32767;
          workInProgress = next;
          return;
        }
        next = unitOfWork.return;
        next !== null && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
        if (!skipSiblings && (unitOfWork = unitOfWork.sibling, unitOfWork !== null)) {
          workInProgress = unitOfWork;
          return;
        }
        workInProgress = unitOfWork = next;
      } while (unitOfWork !== null);
      workInProgressRootExitStatus = 6;
      workInProgress = null;
    }
    function completeRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
      root2.cancelPendingCommit = null;
      do
        flushPendingEffects();
      while (pendingEffectsStatus !== 0);
      if ((executionContext & 6) !== 0)
        throw Error(formatProdErrorMessage(327));
      if (finishedWork !== null) {
        if (finishedWork === root2.current)
          throw Error(formatProdErrorMessage(177));
        root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
        pendingFinishedWork = finishedWork;
        pendingEffectsRoot = root2;
        pendingEffectsLanes = lanes;
        pendingPassiveTransitions = transitions;
        pendingRecoverableErrors = recoverableErrors;
        commitRoot(root2, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState);
      }
    }
    function commitRoot(root2, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
      var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
      pendingEffectsRemainingLanes = remainingLanes;
      remainingLanes |= concurrentlyUpdatedLanes;
      markRootFinished(root2, lanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes);
      pendingViewTransitionEvents = null;
      (lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root2), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
      (finishedWork.subtreeFlags & spawnedLane) !== 0 || (finishedWork.flags & spawnedLane) !== 0 ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
        flushPassiveEffects();
        return null;
      })) : (root2.callbackNode = null, root2.callbackPriority = 0);
      shouldStartViewTransition = false;
      spawnedLane = (finishedWork.flags & 13878) !== 0;
      if ((finishedWork.subtreeFlags & 13878) !== 0 || spawnedLane) {
        spawnedLane = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        updatedLanes = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        suspendedRetryLanes = executionContext;
        executionContext |= 4;
        try {
          commitBeforeMutationEffects(root2, finishedWork, lanes);
        } finally {
          executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
        }
      }
      pendingEffectsStatus = 1;
      shouldStartViewTransition ? pendingViewTransition = startViewTransition(suspendedState, root2.containerInfo, pendingTransitionTypes, flushMutationEffects, flushLayoutEffects, flushAfterMutationEffects, flushSpawnedWork, flushPassiveEffects, reportViewTransitionError, null, null) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
    }
    function reportViewTransitionError(error) {
      if (pendingEffectsStatus !== 0) {
        var onRecoverableError = pendingEffectsRoot.onRecoverableError;
        onRecoverableError(error, { componentStack: null });
      }
    }
    function flushAfterMutationEffects() {
      pendingEffectsStatus === 3 && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
    }
    function flushMutationEffects() {
      if (pendingEffectsStatus === 1) {
        pendingEffectsStatus = 0;
        var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = (finishedWork.flags & 13878) !== 0;
        if ((finishedWork.subtreeFlags & 13878) !== 0 || rootMutationHasEffect) {
          rootMutationHasEffect = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          var previousPriority = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          try {
            inUpdateViewTransition = rootViewTransitionAffected = false;
            commitMutationEffectsOnFiber(finishedWork, root2, lanes);
            lanes = selectionInformation;
            var curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
            if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(priorFocusedElem.ownerDocument.documentElement, priorFocusedElem)) {
              if (priorSelectionRange !== null && hasSelectionCapabilities(priorFocusedElem)) {
                var { start, end } = priorSelectionRange;
                end === undefined && (end = start);
                if ("selectionStart" in priorFocusedElem)
                  priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(end, priorFocusedElem.value.length);
                else {
                  var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                  if (win.getSelection) {
                    var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = priorSelectionRange.end === undefined ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                    !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                    var startMarker = getNodeForCharacterOffset(priorFocusedElem, start$jscomp$0), endMarker = getNodeForCharacterOffset(priorFocusedElem, end$jscomp$0);
                    if (startMarker && endMarker && (selection.rangeCount !== 1 || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                      var range = doc.createRange();
                      range.setStart(startMarker.node, startMarker.offset);
                      selection.removeAllRanges();
                      start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                    }
                  }
                }
              }
              doc = [];
              for (selection = priorFocusedElem;selection = selection.parentNode; )
                selection.nodeType === 1 && doc.push({
                  element: selection,
                  left: selection.scrollLeft,
                  top: selection.scrollTop
                });
              typeof priorFocusedElem.focus === "function" && priorFocusedElem.focus();
              for (priorFocusedElem = 0;priorFocusedElem < doc.length; priorFocusedElem++) {
                var info = doc[priorFocusedElem];
                info.element.scrollLeft = info.left;
                info.element.scrollTop = info.top;
              }
            }
            _enabled = !!eventsEnabled;
            selectionInformation = eventsEnabled = null;
          } finally {
            executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
          }
        }
        root2.current = finishedWork;
        pendingEffectsStatus = 2;
      }
    }
    function flushLayoutEffects() {
      if (pendingEffectsStatus === 2) {
        pendingEffectsStatus = 0;
        var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = (finishedWork.flags & 8772) !== 0;
        if ((finishedWork.subtreeFlags & 8772) !== 0 || rootHasLayoutEffect) {
          rootHasLayoutEffect = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          var previousPriority = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          try {
            commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork);
          } finally {
            executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
          }
        }
        pendingEffectsStatus = 3;
      }
    }
    function flushSpawnedWork() {
      if (pendingEffectsStatus === 4 || pendingEffectsStatus === 3) {
        pendingEffectsStatus = 0;
        var committedViewTransition = pendingViewTransition;
        pendingViewTransition = null;
        requestPaint();
        var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
        (finishedWork.subtreeFlags & passiveSubtreeMask) !== 0 || (finishedWork.flags & passiveSubtreeMask) !== 0 ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes));
        passiveSubtreeMask = root2.pendingLanes;
        passiveSubtreeMask === 0 && (legacyErrorBoundariesThatAlreadyFailed = null);
        lanesToEventPriority(lanes);
        finishedWork = finishedWork.stateNode;
        if (injectedHook && typeof injectedHook.onCommitFiberRoot === "function")
          try {
            injectedHook.onCommitFiberRoot(rendererID, finishedWork, undefined, (finishedWork.current.flags & 128) === 128);
          } catch (err) {}
        if (recoverableErrors !== null) {
          finishedWork = ReactSharedInternals.T;
          passiveSubtreeMask = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          ReactSharedInternals.T = null;
          try {
            for (var onRecoverableError = root2.onRecoverableError, i = 0;i < recoverableErrors.length; i++) {
              var recoverableError = recoverableErrors[i];
              onRecoverableError(recoverableError.value, {
                componentStack: recoverableError.stack
              });
            }
          } finally {
            ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
          }
        }
        recoverableErrors = pendingViewTransitionEvents;
        onRecoverableError = pendingTransitionTypes;
        pendingTransitionTypes = null;
        if (recoverableErrors !== null && (pendingViewTransitionEvents = null, onRecoverableError === null && (onRecoverableError = []), committedViewTransition !== null))
          for (recoverableError = 0;recoverableError < recoverableErrors.length; recoverableError++)
            finishedWork = (0, recoverableErrors[recoverableError])(onRecoverableError), finishedWork !== undefined && committedViewTransition.finished.finally(finishedWork);
        (pendingEffectsLanes & 3) !== 0 && flushPendingEffects();
        ensureRootIsScheduled(root2);
        passiveSubtreeMask = root2.pendingLanes;
        (lanes & 261930) !== 0 && (passiveSubtreeMask & 42) !== 0 ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
        flushSyncWorkAcrossRoots_impl(0, false);
      }
    }
    function releaseRootPooledCache(root2, remainingLanes) {
      (root2.pooledCacheLanes &= remainingLanes) === 0 && (remainingLanes = root2.pooledCache, remainingLanes != null && (root2.pooledCache = null, releaseCache(remainingLanes)));
    }
    function flushPendingEffects() {
      pendingViewTransition !== null && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
      flushMutationEffects();
      flushLayoutEffects();
      flushSpawnedWork();
      return flushPassiveEffects();
    }
    function flushPassiveEffects() {
      if (pendingEffectsStatus !== 5)
        return false;
      var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
      pendingEffectsRemainingLanes = 0;
      var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
        ReactSharedInternals.T = null;
        renderPriority = pendingPassiveTransitions;
        pendingPassiveTransitions = null;
        var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
        pendingEffectsStatus = 0;
        pendingFinishedWork = pendingEffectsRoot = null;
        pendingEffectsLanes = 0;
        if ((executionContext & 6) !== 0)
          throw Error(formatProdErrorMessage(331));
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        commitPassiveUnmountOnFiber(root$jscomp$0.current);
        commitPassiveMountOnFiber(root$jscomp$0, root$jscomp$0.current, lanes, renderPriority);
        executionContext = prevExecutionContext;
        flushSyncWorkAcrossRoots_impl(0, false);
        if (injectedHook && typeof injectedHook.onPostCommitFiberRoot === "function")
          try {
            injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
          } catch (err) {}
        return true;
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root2, remainingLanes);
      }
    }
    function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
      sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
      sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
      rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
      rootFiber !== null && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
    }
    function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
      if (sourceFiber.tag === 3)
        captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
      else
        for (;nearestMountedAncestor !== null; ) {
          if (nearestMountedAncestor.tag === 3) {
            captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, error);
            break;
          } else if (nearestMountedAncestor.tag === 1) {
            var instance = nearestMountedAncestor.stateNode;
            if (typeof nearestMountedAncestor.type.getDerivedStateFromError === "function" || typeof instance.componentDidCatch === "function" && (legacyErrorBoundariesThatAlreadyFailed === null || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
              sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
              error = createClassErrorUpdate(2);
              instance = enqueueUpdate(nearestMountedAncestor, error, 2);
              instance !== null && (initializeClassErrorUpdate(error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
              break;
            }
          }
          nearestMountedAncestor = nearestMountedAncestor.return;
        }
    }
    function attachPingListener(root2, wakeable, lanes) {
      var pingCache = root2.pingCache;
      if (pingCache === null) {
        pingCache = root2.pingCache = new PossiblyWeakMap;
        var threadIDs = new Set;
        pingCache.set(wakeable, threadIDs);
      } else
        threadIDs = pingCache.get(wakeable), threadIDs === undefined && (threadIDs = new Set, pingCache.set(wakeable, threadIDs));
      threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
    }
    function pingSuspendedRoot(root2, wakeable, pingedLanes) {
      var pingCache = root2.pingCache;
      pingCache !== null && pingCache.delete(wakeable);
      root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
      root2.warmLanes &= ~pingedLanes;
      workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (workInProgressRootExitStatus === 4 || workInProgressRootExitStatus === 3 && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? (executionContext & 2) === 0 ? prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
      ensureRootIsScheduled(root2);
    }
    function retryTimedOutBoundary(boundaryFiber, retryLane) {
      retryLane === 0 && (retryLane = claimNextRetryLane());
      boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
      boundaryFiber !== null && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
    }
    function retryDehydratedSuspenseBoundary(boundaryFiber) {
      var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
      suspenseState !== null && (retryLane = suspenseState.retryLane);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function resolveRetryWakeable(boundaryFiber, wakeable) {
      var retryLane = 0;
      switch (boundaryFiber.tag) {
        case 31:
        case 13:
          var retryCache = boundaryFiber.stateNode;
          var suspenseState = boundaryFiber.memoizedState;
          suspenseState !== null && (retryLane = suspenseState.retryLane);
          break;
        case 19:
          retryCache = boundaryFiber.stateNode;
          break;
        case 22:
          retryCache = boundaryFiber.stateNode._retryCache;
          break;
        default:
          throw Error(formatProdErrorMessage(314));
      }
      retryCache !== null && retryCache.delete(wakeable);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function scheduleCallback$1(priorityLevel, callback) {
      return scheduleCallback$3(priorityLevel, callback);
    }
    var firstScheduledRoot = null;
    var lastScheduledRoot = null;
    var didScheduleMicrotask = false;
    var mightHavePendingSyncWork = false;
    var isFlushingWork = false;
    var currentEventTransitionLane = 0;
    function ensureRootIsScheduled(root2) {
      root2 !== lastScheduledRoot && root2.next === null && (lastScheduledRoot === null ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
      mightHavePendingSyncWork = true;
      didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
    }
    function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
      if (!isFlushingWork && mightHavePendingSyncWork) {
        isFlushingWork = true;
        do {
          var didPerformSomeWork = false;
          for (var root$190 = firstScheduledRoot;root$190 !== null; ) {
            if (!onlyLegacy)
              if (syncTransitionLanes !== 0) {
                var pendingLanes = root$190.pendingLanes;
                if (pendingLanes === 0)
                  var JSCompiler_inline_result = 0;
                else {
                  var { suspendedLanes, pingedLanes } = root$190;
                  JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                  JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                  JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                }
                JSCompiler_inline_result !== 0 && (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
              } else
                JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(root$190, root$190 === workInProgressRoot ? JSCompiler_inline_result : 0, root$190.cancelPendingCommit !== null || root$190.timeoutHandle !== -1), (JSCompiler_inline_result & 3) === 0 || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
            root$190 = root$190.next;
          }
        } while (didPerformSomeWork);
        isFlushingWork = false;
      }
    }
    function processRootScheduleInImmediateTask() {
      processRootScheduleInMicrotask();
    }
    function processRootScheduleInMicrotask() {
      mightHavePendingSyncWork = didScheduleMicrotask = false;
      var syncTransitionLanes = 0;
      currentEventTransitionLane !== 0 && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
      for (var currentTime = now(), prev = null, root2 = firstScheduledRoot;root2 !== null; ) {
        var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
        if (nextLanes === 0)
          root2.next = null, prev === null ? firstScheduledRoot = next : prev.next = next, next === null && (lastScheduledRoot = prev);
        else if (prev = root2, syncTransitionLanes !== 0 || (nextLanes & 3) !== 0)
          mightHavePendingSyncWork = true;
        root2 = next;
      }
      pendingEffectsStatus !== 0 && pendingEffectsStatus !== 5 || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, false);
      currentEventTransitionLane !== 0 && (currentEventTransitionLane = 0);
    }
    function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
      for (var { suspendedLanes, pingedLanes, expirationTimes } = root2, lanes = root2.pendingLanes & -62914561;0 < lanes; ) {
        var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
        if (expirationTime === -1) {
          if ((lane & suspendedLanes) === 0 || (lane & pingedLanes) !== 0)
            expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
        } else
          expirationTime <= currentTime && (root2.expiredLanes |= lane);
        lanes &= ~lane;
      }
      currentTime = workInProgressRoot;
      suspendedLanes = workInProgressRootRenderLanes;
      suspendedLanes = getNextLanes(root2, root2 === currentTime ? suspendedLanes : 0, root2.cancelPendingCommit !== null || root2.timeoutHandle !== -1);
      pingedLanes = root2.callbackNode;
      if (suspendedLanes === 0 || root2 === currentTime && (workInProgressSuspendedReason === 2 || workInProgressSuspendedReason === 9) || root2.cancelPendingCommit !== null)
        return pingedLanes !== null && pingedLanes !== null && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
      if ((suspendedLanes & 3) === 0 || checkIfRootIsPrerendering(root2, suspendedLanes)) {
        currentTime = suspendedLanes & -suspendedLanes;
        if (currentTime === root2.callbackPriority)
          return currentTime;
        pingedLanes !== null && cancelCallback$1(pingedLanes);
        switch (lanesToEventPriority(suspendedLanes)) {
          case 2:
          case 8:
            suspendedLanes = UserBlockingPriority;
            break;
          case 32:
            suspendedLanes = NormalPriority$1;
            break;
          case 268435456:
            suspendedLanes = IdlePriority;
            break;
          default:
            suspendedLanes = NormalPriority$1;
        }
        pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
        suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
        root2.callbackPriority = currentTime;
        root2.callbackNode = suspendedLanes;
        return currentTime;
      }
      pingedLanes !== null && pingedLanes !== null && cancelCallback$1(pingedLanes);
      root2.callbackPriority = 2;
      root2.callbackNode = null;
      return 2;
    }
    function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
      if (pendingEffectsStatus !== 0 && pendingEffectsStatus !== 5)
        return root2.callbackNode = null, root2.callbackPriority = 0, null;
      var originalCallbackNode = root2.callbackNode;
      if (flushPendingEffects() && root2.callbackNode !== originalCallbackNode)
        return null;
      var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
      workInProgressRootRenderLanes$jscomp$0 = getNextLanes(root2, root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0, root2.cancelPendingCommit !== null || root2.timeoutHandle !== -1);
      if (workInProgressRootRenderLanes$jscomp$0 === 0)
        return null;
      performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
      scheduleTaskForRootDuringMicrotask(root2, now());
      return root2.callbackNode != null && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
    }
    function performSyncWorkOnRoot(root2, lanes) {
      if (flushPendingEffects())
        return null;
      performWorkOnRoot(root2, lanes, true);
    }
    function scheduleImmediateRootScheduleTask() {
      scheduleMicrotask(function() {
        (executionContext & 6) !== 0 ? scheduleCallback$3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
      });
    }
    function requestTransitionLane() {
      if (currentEventTransitionLane === 0) {
        var actionScopeLane = currentEntangledLane;
        actionScopeLane === 0 && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, (nextTransitionUpdateLane & 261888) === 0 && (nextTransitionUpdateLane = 256));
        currentEventTransitionLane = actionScopeLane;
      }
      return currentEventTransitionLane;
    }
    function coerceFormActionProp(actionProp) {
      return actionProp == null || typeof actionProp === "symbol" || typeof actionProp === "boolean" ? null : typeof actionProp === "function" ? actionProp : sanitizeURL(actionProp);
    }
    function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
      if (domEventName === "submit" && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
        var action = coerceFormActionProp((nativeEventTarget[internalPropsKey] || null).action), submitter = nativeEvent.submitter;
        submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), domEventName !== null && (action = domEventName, submitter = null));
        var event = new SyntheticEvent("action", "action", null, nativeEvent, nativeEventTarget);
        dispatchQueue.push({
          event,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (nativeEvent.defaultPrevented) {
                  if (currentEventTransitionLane !== 0) {
                    var formData = new FormData(nativeEventTarget, submitter);
                    startHostTransition(maybeTargetInst, {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    }, null, formData);
                  }
                } else
                  typeof action === "function" && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(maybeTargetInst, {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  }, action, formData));
              },
              currentTarget: nativeEventTarget
            }
          ]
        });
      }
    }
    for (i$jscomp$inline_1667 = 0;i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
      eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667], domEventName$jscomp$inline_1669 = eventName$jscomp$inline_1668.toLowerCase(), capitalizedEvent$jscomp$inline_1670 = eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1);
      registerSimpleEvent(domEventName$jscomp$inline_1669, "on" + capitalizedEvent$jscomp$inline_1670);
    }
    var eventName$jscomp$inline_1668;
    var domEventName$jscomp$inline_1669;
    var capitalizedEvent$jscomp$inline_1670;
    var i$jscomp$inline_1667;
    registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
    registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
    registerSimpleEvent(ANIMATION_START, "onAnimationStart");
    registerSimpleEvent("dblclick", "onDoubleClick");
    registerSimpleEvent("focusin", "onFocus");
    registerSimpleEvent("focusout", "onBlur");
    registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
    registerSimpleEvent(TRANSITION_START, "onTransitionStart");
    registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
    registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
    registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
    registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
    registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
    registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
    registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    registerTwoPhaseEvent("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    registerTwoPhaseEvent("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]);
    registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var nonDelegatedEvents = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes));
    function processDispatchQueue(dispatchQueue, eventSystemFlags) {
      eventSystemFlags = (eventSystemFlags & 4) !== 0;
      for (var i = 0;i < dispatchQueue.length; i++) {
        var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
        _dispatchQueue$i = _dispatchQueue$i.listeners;
        a: {
          var previousInstance = undefined;
          if (eventSystemFlags)
            for (var i$jscomp$0 = _dispatchQueue$i.length - 1;0 <= i$jscomp$0; i$jscomp$0--) {
              var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = _dispatchListeners$i;
              event.currentTarget = currentTarget;
              try {
                previousInstance(event);
              } catch (error) {
                reportGlobalError(error);
              }
              event.currentTarget = null;
              previousInstance = instance;
            }
          else
            for (i$jscomp$0 = 0;i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
              _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
              instance = _dispatchListeners$i.instance;
              currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = _dispatchListeners$i;
              event.currentTarget = currentTarget;
              try {
                previousInstance(event);
              } catch (error) {
                reportGlobalError(error);
              }
              event.currentTarget = null;
              previousInstance = instance;
            }
        }
      }
    }
    function listenToNonDelegatedEvent(domEventName, targetElement) {
      var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
      JSCompiler_inline_result === undefined && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = new Set);
      var listenerSetKey = domEventName + "__bubble";
      JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
    }
    function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
      var eventSystemFlags = 0;
      isCapturePhaseListener && (eventSystemFlags |= 4);
      addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener);
    }
    var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
    function listenToAllSupportedEvents(rootContainerElement) {
      if (!rootContainerElement[listeningMarker]) {
        rootContainerElement[listeningMarker] = true;
        allNativeEvents.forEach(function(domEventName) {
          domEventName !== "selectionchange" && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
        });
        var ownerDocument = rootContainerElement.nodeType === 9 ? rootContainerElement : rootContainerElement.ownerDocument;
        ownerDocument === null || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
      }
    }
    function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
      switch (getEventPriority(domEventName)) {
        case 2:
          var listenerWrapper = dispatchDiscreteEvent;
          break;
        case 8:
          listenerWrapper = dispatchContinuousEvent;
          break;
        default:
          listenerWrapper = dispatchEvent;
      }
      eventSystemFlags = listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer);
      listenerWrapper = undefined;
      !passiveBrowserEventsSupported || domEventName !== "touchstart" && domEventName !== "touchmove" && domEventName !== "wheel" || (listenerWrapper = true);
      isCapturePhaseListener ? listenerWrapper !== undefined ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
        capture: true,
        passive: listenerWrapper
      }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : listenerWrapper !== undefined ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
        passive: listenerWrapper
      }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
    }
    function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
      var ancestorInst = targetInst$jscomp$0;
      if ((eventSystemFlags & 1) === 0 && (eventSystemFlags & 2) === 0 && targetInst$jscomp$0 !== null)
        a:
          for (;; ) {
            if (targetInst$jscomp$0 === null)
              return;
            var nodeTag = targetInst$jscomp$0.tag;
            if (nodeTag === 3 || nodeTag === 4) {
              var container = targetInst$jscomp$0.stateNode.containerInfo;
              if (container === targetContainer)
                break;
              if (nodeTag === 4)
                for (nodeTag = targetInst$jscomp$0.return;nodeTag !== null; ) {
                  var grandTag = nodeTag.tag;
                  if ((grandTag === 3 || grandTag === 4) && nodeTag.stateNode.containerInfo === targetContainer)
                    return;
                  nodeTag = nodeTag.return;
                }
              for (;container !== null; ) {
                nodeTag = getClosestInstanceFromNode(container);
                if (nodeTag === null)
                  return;
                grandTag = nodeTag.tag;
                if (grandTag === 5 || grandTag === 6 || grandTag === 26 || grandTag === 27) {
                  targetInst$jscomp$0 = ancestorInst = nodeTag;
                  continue a;
                }
                container = container.parentNode;
              }
            }
            targetInst$jscomp$0 = targetInst$jscomp$0.return;
          }
      batchedUpdates$1(function() {
        var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
        a: {
          var reactName = topLevelEventsToReactNames.get(domEventName);
          if (reactName !== undefined) {
            var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
            switch (domEventName) {
              case "keypress":
                if (getEventCharCode(nativeEvent) === 0)
                  break a;
              case "keydown":
              case "keyup":
                SyntheticEventCtor = SyntheticKeyboardEvent;
                break;
              case "focusin":
                reactEventType = "focus";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "focusout":
                reactEventType = "blur";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "beforeblur":
              case "afterblur":
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "click":
                if (nativeEvent.button === 2)
                  break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                SyntheticEventCtor = SyntheticMouseEvent;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                SyntheticEventCtor = SyntheticDragEvent;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                SyntheticEventCtor = SyntheticTouchEvent;
                break;
              case ANIMATION_END:
              case ANIMATION_ITERATION:
              case ANIMATION_START:
                SyntheticEventCtor = SyntheticAnimationEvent;
                break;
              case TRANSITION_END:
                SyntheticEventCtor = SyntheticTransitionEvent;
                break;
              case "scroll":
              case "scrollend":
                SyntheticEventCtor = SyntheticUIEvent;
                break;
              case "wheel":
                SyntheticEventCtor = SyntheticWheelEvent;
                break;
              case "copy":
              case "cut":
              case "paste":
                SyntheticEventCtor = SyntheticClipboardEvent;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                SyntheticEventCtor = SyntheticPointerEvent;
                break;
              case "submit":
                SyntheticEventCtor = SyntheticSubmitEvent;
                break;
              case "toggle":
              case "beforetoggle":
                SyntheticEventCtor = SyntheticToggleEvent;
            }
            var inCapturePhase = (eventSystemFlags & 4) !== 0, accumulateTargetOnly = !inCapturePhase && (domEventName === "scroll" || domEventName === "scrollend"), reactEventName = inCapturePhase ? reactName !== null ? reactName + "Capture" : null : reactName;
            inCapturePhase = [];
            for (var instance = targetInst, lastHostComponent;instance !== null; ) {
              var _instance = instance;
              lastHostComponent = _instance.stateNode;
              _instance = _instance.tag;
              _instance !== 5 && _instance !== 26 && _instance !== 27 || lastHostComponent === null || reactEventName === null || (_instance = getListener(instance, reactEventName), _instance != null && inCapturePhase.push(createDispatchListener(instance, _instance, lastHostComponent)));
              if (accumulateTargetOnly)
                break;
              instance = instance.return;
            }
            0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
          }
        }
        if ((eventSystemFlags & 7) === 0) {
          a: {
            SyntheticEventCtor = domEventName === "mouseover" || domEventName === "pointerover";
            reactName = domEventName === "mouseout" || domEventName === "pointerout";
            if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
              break a;
            if (reactName || SyntheticEventCtor) {
              reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
              if (reactName) {
                if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, SyntheticEventCtor !== null && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || inCapturePhase !== 5 && inCapturePhase !== 27 && inCapturePhase !== 6))
                  SyntheticEventCtor = null;
              } else
                reactName = null, SyntheticEventCtor = targetInst;
              if (reactName !== SyntheticEventCtor) {
                inCapturePhase = SyntheticMouseEvent;
                _instance = "onMouseLeave";
                reactEventName = "onMouseEnter";
                instance = "mouse";
                if (domEventName === "pointerout" || domEventName === "pointerover")
                  inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                accumulateTargetOnly = reactName == null ? reactEventType : getNodeFromInstance(reactName);
                lastHostComponent = SyntheticEventCtor == null ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
                reactEventType = new inCapturePhase(_instance, instance + "leave", reactName, nativeEvent, nativeEventTarget);
                reactEventType.target = accumulateTargetOnly;
                reactEventType.relatedTarget = lastHostComponent;
                _instance = null;
                getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", SyntheticEventCtor, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
                accumulateTargetOnly = _instance;
                inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(reactName, SyntheticEventCtor, getParent) : null;
                reactName !== null && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactEventType, reactName, inCapturePhase, false);
                SyntheticEventCtor !== null && accumulateTargetOnly !== null && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, SyntheticEventCtor, inCapturePhase, true);
              }
            }
          }
          a: {
            reactName = targetInst ? getNodeFromInstance(targetInst) : window;
            SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
            if (SyntheticEventCtor === "select" || SyntheticEventCtor === "input" && reactName.type === "file")
              var getTargetInstFunc = getTargetInstForChangeEvent;
            else if (isTextInputElement(reactName))
              if (isInputEventSupported)
                getTargetInstFunc = getTargetInstForInputOrChangeEvent;
              else {
                getTargetInstFunc = getTargetInstForInputEventPolyfill;
                var handleEventFunc = handleEventsForInputEventPolyfill;
              }
            else
              SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || SyntheticEventCtor.toLowerCase() !== "input" || reactName.type !== "checkbox" && reactName.type !== "radio" ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
            if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
              createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
              break a;
            }
            handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
          }
          handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
          switch (domEventName) {
            case "focusin":
              if (isTextInputElement(handleEventFunc) || handleEventFunc.contentEditable === "true")
                activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
              break;
            case "focusout":
              lastSelection = activeElementInst = activeElement = null;
              break;
            case "mousedown":
              mouseDown = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              mouseDown = false;
              constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
              break;
            case "selectionchange":
              if (skipSelectionChangeEvent)
                break;
            case "keydown":
            case "keyup":
              constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          }
          var fallbackData;
          if (canUseCompositionEvent)
            b: {
              switch (domEventName) {
                case "compositionstart":
                  var eventType = "onCompositionStart";
                  break b;
                case "compositionend":
                  eventType = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  eventType = "onCompositionUpdate";
                  break b;
              }
              eventType = undefined;
            }
          else
            isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : domEventName === "keydown" && nativeEvent.keyCode === 229 && (eventType = "onCompositionStart");
          eventType && (useFallbackCompositionData && nativeEvent.locale !== "ko" && (isComposing || eventType !== "onCompositionStart" ? eventType === "onCompositionEnd" && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = ("value" in root) ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), fallbackData !== null && (eventType.data = fallbackData))));
          if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
            eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
              event: handleEventFunc,
              listeners: eventType
            }), handleEventFunc.data = fallbackData);
          extractEvents$1(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget);
        }
        processDispatchQueue(dispatchQueue, eventSystemFlags);
      });
    }
    function createDispatchListener(instance, listener, currentTarget) {
      return {
        instance,
        listener,
        currentTarget
      };
    }
    function accumulateTwoPhaseListeners(targetFiber, reactName) {
      for (var captureName = reactName + "Capture", listeners = [];targetFiber !== null; ) {
        var _instance2 = targetFiber, stateNode = _instance2.stateNode;
        _instance2 = _instance2.tag;
        _instance2 !== 5 && _instance2 !== 26 && _instance2 !== 27 || stateNode === null || (_instance2 = getListener(targetFiber, captureName), _instance2 != null && listeners.unshift(createDispatchListener(targetFiber, _instance2, stateNode)), _instance2 = getListener(targetFiber, reactName), _instance2 != null && listeners.push(createDispatchListener(targetFiber, _instance2, stateNode)));
        if (targetFiber.tag === 3)
          return listeners;
        targetFiber = targetFiber.return;
      }
      return [];
    }
    function getParent(inst) {
      if (inst === null)
        return null;
      do
        inst = inst.return;
      while (inst && inst.tag !== 5 && inst.tag !== 27);
      return inst ? inst : null;
    }
    function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
      for (var registrationName = event._reactName, listeners = [];target !== null && target !== common; ) {
        var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
        _instance3 = _instance3.tag;
        if (alternate !== null && alternate === common)
          break;
        _instance3 !== 5 && _instance3 !== 26 && _instance3 !== 27 || stateNode === null || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), stateNode != null && listeners.unshift(createDispatchListener(target, stateNode, alternate))) : inCapturePhase || (stateNode = getListener(target, registrationName), stateNode != null && listeners.push(createDispatchListener(target, stateNode, alternate))));
        target = target.return;
      }
      listeners.length !== 0 && dispatchQueue.push({ event, listeners });
    }
    var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
    var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
    function normalizeMarkupForTextOrAttribute(markup) {
      return (typeof markup === "string" ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, `
`).replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
    }
    function checkForUnmatchedText(serverText, clientText) {
      clientText = normalizeMarkupForTextOrAttribute(clientText);
      return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
    }
    function setProp(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "children":
          if (typeof value === "string")
            tag === "body" || tag === "textarea" && value === "" || setTextContent(domElement, value);
          else if (typeof value === "number" || typeof value === "bigint")
            tag !== "body" && setTextContent(domElement, "" + value);
          else
            return;
          break;
        case "className":
          setValueForKnownAttribute(domElement, "class", value);
          break;
        case "tabIndex":
          setValueForKnownAttribute(domElement, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          setValueForKnownAttribute(domElement, key, value);
          break;
        case "style":
          setValueForStyles(domElement, value, prevValue);
          return;
        case "data":
          if (tag !== "object") {
            setValueForKnownAttribute(domElement, "data", value);
            break;
          }
        case "src":
        case "href":
          if (value === "" && (tag !== "a" || key !== "href")) {
            domElement.removeAttribute(key);
            break;
          }
          if (value == null || typeof value === "function" || typeof value === "symbol" || typeof value === "boolean") {
            domElement.removeAttribute(key);
            break;
          }
          value = sanitizeURL(value);
          domElement.setAttribute(key, value);
          break;
        case "action":
        case "formAction":
          if (typeof value === "function") {
            domElement.setAttribute(key, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else
            typeof prevValue === "function" && (key === "formAction" ? (tag !== "input" && setProp(domElement, tag, "name", props.name, props, null), setProp(domElement, tag, "formEncType", props.formEncType, props, null), setProp(domElement, tag, "formMethod", props.formMethod, props, null), setProp(domElement, tag, "formTarget", props.formTarget, props, null)) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
          if (value == null || typeof value === "symbol" || typeof value === "boolean") {
            domElement.removeAttribute(key);
            break;
          }
          value = sanitizeURL(value);
          domElement.setAttribute(key, value);
          break;
        case "onClick":
          value != null && (domElement.onclick = noop$1);
          return;
        case "onScroll":
          value != null && listenToNonDelegatedEvent("scroll", domElement);
          return;
        case "onScrollEnd":
          value != null && listenToNonDelegatedEvent("scrollend", domElement);
          return;
        case "dangerouslySetInnerHTML":
          if (value != null) {
            if (typeof value !== "object" || !("__html" in value))
              throw Error(formatProdErrorMessage(61));
            key = value.__html;
            if (key != null) {
              if (props.children != null)
                throw Error(formatProdErrorMessage(60));
              (prevValue != null ? prevValue.__html : undefined) !== key && (domElement.innerHTML = key);
            }
          }
          break;
        case "multiple":
          domElement.multiple = value && typeof value !== "function" && typeof value !== "symbol";
          break;
        case "muted":
          domElement.muted = value && typeof value !== "function" && typeof value !== "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (value == null || typeof value === "function" || typeof value === "boolean" || typeof value === "symbol") {
            domElement.removeAttribute("xlink:href");
            break;
          }
          key = sanitizeURL(value);
          domElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", key);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          value != null && typeof value !== "function" && typeof value !== "symbol" ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && typeof value !== "function" && typeof value !== "symbol" ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
          break;
        case "capture":
        case "download":
          value === true ? domElement.setAttribute(key, "") : value !== false && value != null && typeof value !== "function" && typeof value !== "symbol" ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          value != null && typeof value !== "function" && typeof value !== "symbol" && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "rowSpan":
        case "start":
          value == null || typeof value === "function" || typeof value === "symbol" || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
          break;
        case "popover":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          setValueForAttribute(domElement, "popover", value);
          break;
        case "xlinkActuate":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:arcrole", value);
          break;
        case "xlinkRole":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:role", value);
          break;
        case "xlinkShow":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:show", value);
          break;
        case "xlinkTitle":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:title", value);
          break;
        case "xlinkType":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:type", value);
          break;
        case "xmlBase":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:base", value);
          break;
        case "xmlLang":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:lang", value);
          break;
        case "xmlSpace":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:space", value);
          break;
        case "is":
          setValueForAttribute(domElement, "is", value);
          break;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!(2 < key.length) || key[0] !== "o" && key[0] !== "O" || key[1] !== "n" && key[1] !== "N")
            key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
          else
            return;
      }
      viewTransitionMutationContext = true;
    }
    function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "style":
          setValueForStyles(domElement, value, prevValue);
          return;
        case "dangerouslySetInnerHTML":
          if (value != null) {
            if (typeof value !== "object" || !("__html" in value))
              throw Error(formatProdErrorMessage(61));
            key = value.__html;
            if (key != null) {
              if (props.children != null)
                throw Error(formatProdErrorMessage(60));
              (prevValue != null ? prevValue.__html : undefined) !== key && (domElement.innerHTML = key);
            }
          }
          break;
        case "children":
          if (typeof value === "string")
            setTextContent(domElement, value);
          else if (typeof value === "number" || typeof value === "bigint")
            setTextContent(domElement, "" + value);
          else
            return;
          break;
        case "onScroll":
          value != null && listenToNonDelegatedEvent("scroll", domElement);
          return;
        case "onScrollEnd":
          value != null && listenToNonDelegatedEvent("scrollend", domElement);
          return;
        case "onClick":
          value != null && (domElement.onclick = noop$1);
          return;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          return;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!registrationNameDependencies.hasOwnProperty(key))
            a: {
              if (key[0] === "o" && key[1] === "n" && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : undefined), tag = domElement[internalPropsKey] || null, tag = tag != null ? tag[key] : null, typeof tag === "function" && domElement.removeEventListener(prevValue, tag, props), typeof value === "function")) {
                typeof tag !== "function" && tag !== null && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                domElement.addEventListener(prevValue, value, props);
                break a;
              }
              viewTransitionMutationContext = true;
              key in domElement ? domElement[key] = value : value === true ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
            }
          return;
      }
      viewTransitionMutationContext = true;
    }
    function setInitialProperties(domElement, tag, props) {
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          var hasSrc = false, hasSrcSet = false, propKey;
          for (propKey in props)
            if (props.hasOwnProperty(propKey)) {
              var propValue = props[propKey];
              if (propValue != null)
                switch (propKey) {
                  case "src":
                    hasSrc = true;
                    break;
                  case "srcSet":
                    hasSrcSet = true;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, propKey, propValue, props, null);
                }
            }
          hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
          hasSrc && setProp(domElement, tag, "src", props.src, props, null);
          return;
        case "input":
          listenToNonDelegatedEvent("invalid", domElement);
          var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
          for (hasSrc in props)
            if (props.hasOwnProperty(hasSrc)) {
              var propValue$204 = props[hasSrc];
              if (propValue$204 != null)
                switch (hasSrc) {
                  case "name":
                    hasSrcSet = propValue$204;
                    break;
                  case "type":
                    propValue = propValue$204;
                    break;
                  case "checked":
                    checked = propValue$204;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$204;
                    break;
                  case "value":
                    propKey = propValue$204;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$204;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (propValue$204 != null)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(domElement, tag, hasSrc, propValue$204, props, null);
                }
            }
          initInput(domElement, propKey, defaultValue, checked, defaultChecked, propValue, hasSrcSet, false);
          return;
        case "select":
          listenToNonDelegatedEvent("invalid", domElement);
          hasSrc = propValue = propKey = null;
          for (hasSrcSet in props)
            if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], defaultValue != null))
              switch (hasSrcSet) {
                case "value":
                  propKey = defaultValue;
                  break;
                case "defaultValue":
                  propValue = defaultValue;
                  break;
                case "multiple":
                  hasSrc = defaultValue;
                default:
                  setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
              }
          tag = propKey;
          props = propValue;
          domElement.multiple = !!hasSrc;
          tag != null ? updateOptions(domElement, !!hasSrc, tag, false) : props != null && updateOptions(domElement, !!hasSrc, props, true);
          return;
        case "textarea":
          listenToNonDelegatedEvent("invalid", domElement);
          propKey = hasSrcSet = hasSrc = null;
          for (propValue in props)
            if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], defaultValue != null))
              switch (propValue) {
                case "value":
                  hasSrc = defaultValue;
                  break;
                case "defaultValue":
                  hasSrcSet = defaultValue;
                  break;
                case "children":
                  propKey = defaultValue;
                  break;
                case "dangerouslySetInnerHTML":
                  if (defaultValue != null)
                    throw Error(formatProdErrorMessage(91));
                  break;
                default:
                  setProp(domElement, tag, propValue, defaultValue, props, null);
              }
          initTextarea(domElement, hasSrc, hasSrcSet, propKey);
          return;
        case "option":
          for (checked in props)
            if (props.hasOwnProperty(checked) && (hasSrc = props[checked], hasSrc != null))
              switch (checked) {
                case "selected":
                  domElement.selected = hasSrc && typeof hasSrc !== "function" && typeof hasSrc !== "symbol";
                  break;
                default:
                  setProp(domElement, tag, checked, hasSrc, props, null);
              }
          return;
        case "dialog":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          listenToNonDelegatedEvent("cancel", domElement);
          listenToNonDelegatedEvent("close", domElement);
          break;
        case "iframe":
        case "object":
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "video":
        case "audio":
          for (hasSrc = 0;hasSrc < mediaEventTypes.length; hasSrc++)
            listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
          break;
        case "image":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", domElement);
          break;
        case "embed":
        case "source":
        case "link":
          listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (defaultChecked in props)
            if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], hasSrc != null))
              switch (defaultChecked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, defaultChecked, hasSrc, props, null);
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (propValue$204 in props)
              props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], hasSrc !== undefined && setPropOnCustomElement(domElement, tag, propValue$204, hasSrc, props, undefined));
            return;
          }
      }
      for (defaultValue in props)
        props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], hasSrc != null && setProp(domElement, tag, defaultValue, hasSrc, props, null));
    }
    var emptyProps = {};
    function updateProperties(domElement, tag, lastProps, nextProps) {
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
          for (propKey in lastProps) {
            var lastProp = lastProps[propKey];
            if (lastProps.hasOwnProperty(propKey) && lastProp != null)
              switch (propKey) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  lastDefaultValue = lastProp;
                default:
                  nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
              }
          }
          for (var propKey$221 in nextProps) {
            var propKey = nextProps[propKey$221];
            lastProp = lastProps[propKey$221];
            if (nextProps.hasOwnProperty(propKey$221) && (propKey != null || lastProp != null))
              switch (propKey$221) {
                case "type":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  type = propKey;
                  break;
                case "name":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  name = propKey;
                  break;
                case "checked":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  checked = propKey;
                  break;
                case "defaultChecked":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  defaultChecked = propKey;
                  break;
                case "value":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  value = propKey;
                  break;
                case "defaultValue":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  defaultValue = propKey;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (propKey != null)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  propKey !== lastProp && setProp(domElement, tag, propKey$221, propKey, nextProps, lastProp);
              }
          }
          updateInput(domElement, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name);
          return;
        case "select":
          propKey = value = defaultValue = propKey$221 = null;
          for (type in lastProps)
            if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && lastDefaultValue != null)
              switch (type) {
                case "value":
                  break;
                case "multiple":
                  propKey = lastDefaultValue;
                default:
                  nextProps.hasOwnProperty(type) || setProp(domElement, tag, type, null, nextProps, lastDefaultValue);
              }
          for (name in nextProps)
            if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (type != null || lastDefaultValue != null))
              switch (name) {
                case "value":
                  type !== lastDefaultValue && (viewTransitionMutationContext = true);
                  propKey$221 = type;
                  break;
                case "defaultValue":
                  type !== lastDefaultValue && (viewTransitionMutationContext = true);
                  defaultValue = type;
                  break;
                case "multiple":
                  type !== lastDefaultValue && (viewTransitionMutationContext = true), value = type;
                default:
                  type !== lastDefaultValue && setProp(domElement, tag, name, type, nextProps, lastDefaultValue);
              }
          tag = defaultValue;
          lastProps = value;
          nextProps = propKey;
          propKey$221 != null ? updateOptions(domElement, !!lastProps, propKey$221, false) : !!nextProps !== !!lastProps && (tag != null ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
          return;
        case "textarea":
          propKey = propKey$221 = null;
          for (defaultValue in lastProps)
            if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && name != null && !nextProps.hasOwnProperty(defaultValue))
              switch (defaultValue) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  setProp(domElement, tag, defaultValue, null, nextProps, name);
              }
          for (value in nextProps)
            if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (name != null || type != null))
              switch (value) {
                case "value":
                  name !== type && (viewTransitionMutationContext = true);
                  propKey$221 = name;
                  break;
                case "defaultValue":
                  name !== type && (viewTransitionMutationContext = true);
                  propKey = name;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (name != null)
                    throw Error(formatProdErrorMessage(91));
                  break;
                default:
                  name !== type && setProp(domElement, tag, value, name, nextProps, type);
              }
          updateTextarea(domElement, propKey$221, propKey);
          return;
        case "option":
          for (var propKey$237 in lastProps)
            if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && propKey$221 != null && !nextProps.hasOwnProperty(propKey$237))
              switch (propKey$237) {
                case "selected":
                  domElement.selected = false;
                  break;
                default:
                  setProp(domElement, tag, propKey$237, null, nextProps, propKey$221);
              }
          for (lastDefaultValue in nextProps)
            if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (propKey$221 != null || propKey != null))
              switch (lastDefaultValue) {
                case "selected":
                  propKey$221 !== propKey && (viewTransitionMutationContext = true);
                  domElement.selected = propKey$221 && typeof propKey$221 !== "function" && typeof propKey$221 !== "symbol";
                  break;
                default:
                  setProp(domElement, tag, lastDefaultValue, propKey$221, nextProps, propKey);
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var propKey$242 in lastProps)
            propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && propKey$221 != null && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
          for (checked in nextProps)
            if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (propKey$221 != null || propKey != null))
              switch (checked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (propKey$221 != null)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(domElement, tag, checked, propKey$221, nextProps, propKey);
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (var propKey$247 in lastProps)
              propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && propKey$221 !== undefined && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(domElement, tag, propKey$247, undefined, nextProps, propKey$221);
            for (defaultChecked in nextProps)
              propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || propKey$221 === undefined && propKey === undefined || setPropOnCustomElement(domElement, tag, defaultChecked, propKey$221, nextProps, propKey);
            return;
          }
      }
      for (var propKey$252 in lastProps)
        propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && propKey$221 != null && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
      for (lastProp in nextProps)
        propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || propKey$221 == null && propKey == null || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
    }
    function isLikelyStaticResource(initiatorType) {
      switch (initiatorType) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return true;
        default:
          return false;
      }
    }
    function estimateBandwidth() {
      if (typeof performance.getEntriesByType === "function") {
        for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0;i < resourceEntries.length; i++) {
          var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
          if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
            initiatorType = 0;
            duration = entry.responseEnd;
            for (i += 1;i < resourceEntries.length; i++) {
              var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
              if (overlapStartTime > duration)
                break;
              var { transferSize: overlapTransferSize, initiatorType: overlapInitiatorType } = overlapEntry;
              overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
            }
            --i;
            bits += 8 * (transferSize + initiatorType) / (entry.duration / 1000);
            count++;
            if (10 < count)
              break;
          }
        }
        if (0 < count)
          return bits / count / 1e6;
      }
      return navigator.connection && (count = navigator.connection.downlink, typeof count === "number") ? count : 5;
    }
    var eventsEnabled = null;
    var selectionInformation = null;
    function getOwnerDocumentFromRootContainer(rootContainerElement) {
      return rootContainerElement.nodeType === 9 ? rootContainerElement : rootContainerElement.ownerDocument;
    }
    function getOwnHostContext(namespaceURI) {
      switch (namespaceURI) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function getChildHostContextProd(parentNamespace, type) {
      if (parentNamespace === 0)
        switch (type) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return parentNamespace === 1 && type === "foreignObject" ? 0 : parentNamespace;
    }
    function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
      rootContainerInstance = getOwnerDocumentFromRootContainer(rootContainerInstance).createElement(type);
      rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
      rootContainerInstance[internalPropsKey] = props;
      setInitialProperties(rootContainerInstance, type, props);
      markNodeAsHoistable(rootContainerInstance);
      return rootContainerInstance;
    }
    function shouldSetTextContent(type, props) {
      return type === "textarea" || type === "noscript" || typeof props.children === "string" || typeof props.children === "number" || typeof props.children === "bigint" || typeof props.dangerouslySetInnerHTML === "object" && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
    }
    var currentPopstateTransitionEvent = null;
    function shouldAttemptEagerTransition() {
      var event = window.event;
      if (event && event.type === "popstate") {
        if (event === currentPopstateTransitionEvent)
          return false;
        currentPopstateTransitionEvent = event;
        return true;
      }
      currentPopstateTransitionEvent = null;
      return false;
    }
    var scheduleTimeout = typeof setTimeout === "function" ? setTimeout : undefined;
    var cancelTimeout = typeof clearTimeout === "function" ? clearTimeout : undefined;
    var localPromise = typeof Promise === "function" ? Promise : undefined;
    var localRequestAnimationFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : scheduleTimeout;
    var scheduleMicrotask = typeof queueMicrotask === "function" ? queueMicrotask : typeof localPromise !== "undefined" ? function(callback) {
      return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
    } : scheduleTimeout;
    function handleErrorInNextTick(error) {
      setTimeout(function() {
        throw error;
      });
    }
    function isSingletonScope(type) {
      return type === "head";
    }
    function clearHydrationBoundary(parentInstance, hydrationInstance) {
      var node = hydrationInstance, depth = 0;
      do {
        var nextNode = node.nextSibling;
        parentInstance.removeChild(node);
        if (nextNode && nextNode.nodeType === 8)
          if (node = nextNode.data, node === "/$" || node === "/&") {
            if (depth === 0) {
              parentInstance.removeChild(nextNode);
              retryIfBlockedOn(hydrationInstance);
              return;
            }
            depth--;
          } else if (node === "$" || node === "$?" || node === "$~" || node === "$!" || node === "&")
            depth++;
          else if (node === "html")
            clearSingletonPreambleContribution(parentInstance.ownerDocument.documentElement);
          else if (node === "head") {
            node = parentInstance.ownerDocument.head;
            clearSingletonPreambleContribution(node);
            for (var node$jscomp$0 = node.firstChild;node$jscomp$0; ) {
              var { nextSibling: nextNode$jscomp$0, nodeName } = node$jscomp$0;
              node$jscomp$0[internalHoistableMarker] || nodeName === "SCRIPT" || nodeName === "STYLE" || nodeName === "LINK" && node$jscomp$0.rel.toLowerCase() === "stylesheet" || node.removeChild(node$jscomp$0);
              node$jscomp$0 = nextNode$jscomp$0;
            }
          } else
            node === "body" && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
        node = nextNode;
      } while (node);
      retryIfBlockedOn(hydrationInstance);
    }
    function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
      var node = suspenseInstance;
      suspenseInstance = 0;
      do {
        var nextNode = node.nextSibling;
        node.nodeType === 1 ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", node.getAttribute("style") === "" && node.removeAttribute("style")) : node.nodeType === 3 && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
        if (nextNode && nextNode.nodeType === 8)
          if (node = nextNode.data, node === "/$")
            if (suspenseInstance === 0)
              break;
            else
              suspenseInstance--;
          else
            node !== "$" && node !== "$?" && node !== "$~" && node !== "$!" || suspenseInstance++;
        node = nextNode;
      } while (node);
    }
    function applyViewTransitionName(instance, name, className) {
      name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
      instance.style.viewTransitionName = name;
      className != null && (instance.style.viewTransitionClass = className);
      className = getComputedStyle(instance);
      if (className.display === "inline") {
        name = instance.getClientRects();
        if (name.length === 1)
          var JSCompiler_inline_result = 1;
        else
          for (var i = JSCompiler_inline_result = 0;i < name.length; i++) {
            var rect = name[i];
            0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
          }
        JSCompiler_inline_result === 1 && (instance = instance.style, instance.display = name.length === 1 ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
      }
    }
    function restoreViewTransitionName(instance, props) {
      instance = instance.style;
      props = props.style;
      var viewTransitionName = props != null ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
      instance.viewTransitionName = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : ("" + viewTransitionName).trim();
      viewTransitionName = props != null ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
      instance.viewTransitionClass = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : ("" + viewTransitionName).trim();
      instance.display === "inline-block" && (props == null ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : viewTransitionName, viewTransitionName = props.margin, viewTransitionName != null ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = props == null || typeof props === "boolean" ? "" : props)));
    }
    function createMeasurement(rect, computedStyle, element) {
      element = element.ownerDocument.defaultView;
      return {
        rect,
        abs: computedStyle.position === "absolute" || computedStyle.position === "fixed",
        clip: computedStyle.clipPath !== "none" || computedStyle.overflow !== "visible" || computedStyle.filter !== "none" || computedStyle.mask !== "none" || computedStyle.mask !== "none" || computedStyle.borderRadius !== "0px",
        view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
      };
    }
    function measureInstance(instance) {
      var rect = instance.getBoundingClientRect(), computedStyle = getComputedStyle(instance);
      return createMeasurement(rect, computedStyle, instance);
    }
    function measureClonedInstance(instance) {
      var measuredRect = instance.getBoundingClientRect();
      measuredRect = new DOMRect(measuredRect.x + 20000, measuredRect.y + 20000, measuredRect.width, measuredRect.height);
      var computedStyle = getComputedStyle(instance);
      return createMeasurement(measuredRect, computedStyle, instance);
    }
    function forceLayout(ownerDocument) {
      return ownerDocument.documentElement.clientHeight;
    }
    function waitForImageToLoad(resolve) {
      this.addEventListener("load", resolve);
      this.addEventListener("error", resolve);
    }
    function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
      var ownerDocument = rootContainer.nodeType === 9 ? rootContainer : rootContainer.ownerDocument;
      try {
        var transition = ownerDocument.startViewTransition({
          update: function() {
            var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
            mutationCallback();
            var blockingPromises = [];
            previousFontLoadingStatus === "loaded" && (forceLayout(ownerDocument), ownerDocument.fonts.status === "loading" && blockingPromises.push(ownerDocument.fonts.ready));
            previousFontLoadingStatus = blockingPromises.length;
            if (suspendedState !== null)
              for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0;i < suspenseyImages.length; i++) {
                var suspenseyImage = suspenseyImages[i];
                if (!suspenseyImage.complete) {
                  var rect = suspenseyImage.getBoundingClientRect();
                  if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
                    imgBytes += estimateImageBytes(suspenseyImage);
                    if (imgBytes > estimatedBytesWithinLimit) {
                      blockingPromises.length = previousFontLoadingStatus;
                      break;
                    }
                    suspenseyImage = new Promise(waitForImageToLoad.bind(suspenseyImage));
                    blockingPromises.push(suspenseyImage);
                  }
                }
              }
            if (0 < blockingPromises.length)
              return ownerWindow = Promise.race([
                Promise.all(blockingPromises),
                new Promise(function(resolve) {
                  return setTimeout(resolve, 500);
                })
              ]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
            layoutCallback();
            if (pendingNavigation)
              return pendingNavigation.finished.then(afterMutationCallback, afterMutationCallback);
            afterMutationCallback();
          },
          types: transitionTypes
        });
        ownerDocument.__reactViewTransition = transition;
        var viewTransitionAnimations = [];
        transition.ready.then(function() {
          for (var animations = ownerDocument.documentElement.getAnimations({
            subtree: true
          }), i = 0;i < animations.length; i++) {
            var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
            if (pseudoElement != null && pseudoElement.startsWith("::view-transition")) {
              viewTransitionAnimations.push(animation);
              animation = effect.getKeyframes();
              for (var height = pseudoElement = undefined, unchangedDimensions = true, j = 0;j < animation.length; j++) {
                var keyframe = animation[j], w = keyframe.width;
                if (pseudoElement === undefined)
                  pseudoElement = w;
                else if (pseudoElement !== w) {
                  unchangedDimensions = false;
                  break;
                }
                w = keyframe.height;
                if (height === undefined)
                  height = w;
                else if (height !== w) {
                  unchangedDimensions = false;
                  break;
                }
                delete keyframe.width;
                delete keyframe.height;
                keyframe.transform === "none" && delete keyframe.transform;
              }
              unchangedDimensions && pseudoElement !== undefined && height !== undefined && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(effect.target, effect.pseudoElement), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
            }
          }
          spawnedWorkCallback();
        }, function(error) {
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          try {
            if (typeof error === "object" && error !== null)
              switch (error.name) {
                case "InvalidStateError":
                  if (error.message === "View transition was skipped because document visibility state is hidden." || error.message === "Skipping view transition because document visibility state has become hidden." || error.message === "Skipping view transition because viewport size changed." || error.message === "Transition was aborted because of invalid state")
                    error = null;
              }
            error !== null && errorCallback(error);
          } finally {
            mutationCallback(), layoutCallback(), spawnedWorkCallback();
          }
        });
        transition.finished.finally(function() {
          for (var i = 0;i < viewTransitionAnimations.length; i++)
            viewTransitionAnimations[i].cancel();
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          passiveCallback();
        });
        return transition;
      } catch (x) {
        return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
      }
    }
    function ViewTransitionPseudoElement(pseudo, name) {
      this._scope = document.documentElement;
      this._selector = "::view-transition-" + pseudo + "(" + name + ")";
    }
    ViewTransitionPseudoElement.prototype.animate = function(keyframes, options2) {
      options2 = typeof options2 === "number" ? { duration: options2 } : assign({}, options2);
      options2.pseudoElement = this._selector;
      return this._scope.animate(keyframes, options2);
    };
    ViewTransitionPseudoElement.prototype.getAnimations = function() {
      for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: true }), result = [], i = 0;i < animations.length; i++) {
        var effect = animations[i].effect;
        effect !== null && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
      }
      return result;
    };
    ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
      return getComputedStyle(this._scope, this._selector);
    };
    function createViewTransitionInstance(name) {
      return {
        name,
        group: new ViewTransitionPseudoElement("group", name),
        imagePair: new ViewTransitionPseudoElement("image-pair", name),
        old: new ViewTransitionPseudoElement("old", name),
        new: new ViewTransitionPseudoElement("new", name)
      };
    }
    function FragmentInstance(fragmentFiber) {
      this._fragmentFiber = fragmentFiber;
      this._observers = this._eventListeners = null;
    }
    FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
      var signal = null, cleanup = null;
      if (optionsOrUseCapture != null && typeof optionsOrUseCapture !== "boolean" && (signal = optionsOrUseCapture.signal || null, signal !== null && signal.aborted))
        return;
      this._eventListeners === null && (this._eventListeners = []);
      var listeners = this._eventListeners;
      if (indexOfEventListener(listeners, type, listener, optionsOrUseCapture) === -1) {
        var fragmentInstance = this, attachedListener = listener;
        optionsOrUseCapture != null && typeof optionsOrUseCapture !== "boolean" && optionsOrUseCapture.once === true && (attachedListener = function(event) {
          fragmentInstance.removeEventListener(type, listener, optionsOrUseCapture);
          typeof listener === "function" ? listener.call(this, event) : listener.handleEvent(event);
        });
        signal !== null && (cleanup = fragmentInstance.removeEventListener.bind(fragmentInstance, type, listener, optionsOrUseCapture), signal.addEventListener("abort", cleanup, { once: true }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
        signal = getAttachOptions(optionsOrUseCapture);
        listeners.push({
          type,
          listener,
          optionsOrUseCapture,
          attachedListener,
          cleanup
        });
        traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, addEventListenerToChild, type, attachedListener, signal);
      }
      this._eventListeners = listeners;
    };
    function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
      getInstanceFromHostFiber(child).addEventListener(type, listener, optionsOrUseCapture);
      return false;
    }
    FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
      var listeners = this._eventListeners;
      if (listeners !== null && (listener = indexOfEventListener(listeners, type, listener, optionsOrUseCapture), listener !== -1)) {
        var _listeners$index = listeners[listener];
        optionsOrUseCapture = _listeners$index.attachedListener;
        var cleanup = _listeners$index.cleanup;
        _listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
        traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, removeEventListenerFromChild, type, optionsOrUseCapture, _listeners$index);
        listeners.splice(listener, 1);
        cleanup !== null && cleanup();
      }
    };
    function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
      getInstanceFromHostFiber(child).removeEventListener(type, listener, optionsOrUseCapture);
      return false;
    }
    function getAttachOptions(opts) {
      return opts != null && typeof opts !== "boolean" && (opts.once === true || opts.signal instanceof AbortSignal) ? { capture: opts.capture, passive: opts.passive } : opts;
    }
    function normalizeListenerOptions(opts) {
      return opts == null ? "c=0" : typeof opts === "boolean" ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
    }
    function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
      if (eventListeners.length === 0)
        return -1;
      optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
      for (var i = 0;i < eventListeners.length; i++) {
        var item = eventListeners[i];
        if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture)
          return i;
      }
      return -1;
    }
    FragmentInstance.prototype.dispatchEvent = function(event) {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      if (parentHostFiber === null)
        return true;
      parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
      var eventListeners = this._eventListeners;
      if (eventListeners !== null && 0 < eventListeners.length || !event.bubbles) {
        var temp = parentHostFiber.nodeType === 9 ? parentHostFiber.createComment("") : document.createTextNode("");
        if (eventListeners)
          for (var i = 0;i < eventListeners.length; i++) {
            var _eventListeners$i = eventListeners[i];
            temp.addEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
          }
        parentHostFiber.appendChild(temp);
        event = temp.dispatchEvent(event);
        if (eventListeners)
          for (i = 0;i < eventListeners.length; i++)
            _eventListeners$i = eventListeners[i], temp.removeEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
        parentHostFiber.removeChild(temp);
        return event;
      }
      return parentHostFiber.dispatchEvent(event);
    };
    FragmentInstance.prototype.focus = function(focusOptions) {
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, true, setFocusOnFiberIfFocusable, focusOptions, undefined, undefined);
    };
    function setFocusOnFiberIfFocusable(fiber, focusOptions) {
      if (fiber.tag === 6)
        return false;
      fiber = getInstanceFromHostFiber(fiber);
      return setFocusIfFocusable(fiber, focusOptions);
    }
    FragmentInstance.prototype.focusLast = function(focusOptions) {
      var children = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, true, collectChildren, children, undefined, undefined);
      for (var i = children.length - 1;0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--)
        ;
    };
    function collectChildren(child, collection) {
      collection.push(child);
      return false;
    }
    FragmentInstance.prototype.blur = function() {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      parentHostFiber !== null && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, parentHostFiber !== null && traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, blurActiveElementWithinFragment, parentHostFiber, undefined, undefined));
    };
    function blurActiveElementWithinFragment(child, activeElement2) {
      if (child.tag === 6)
        return false;
      child = getInstanceFromHostFiber(child);
      return child === activeElement2 || child.contains(activeElement2) ? (activeElement2.blur(), true) : false;
    }
    FragmentInstance.prototype.observeUsing = function(observer) {
      this._observers === null && (this._observers = new Set);
      this._observers.add(observer);
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, observeChild, observer, undefined, undefined);
    };
    function observeChild(child, observer) {
      if (child.tag === 6)
        return false;
      child = getInstanceFromHostFiber(child);
      observer.observe(child);
      return false;
    }
    FragmentInstance.prototype.unobserveUsing = function(observer) {
      var observers = this._observers;
      if (observers !== null && observers.has(observer)) {
        observers.delete(observer);
        traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, unobserveChild, observer, undefined, undefined);
        for (var i = observers = 0;i < pendingIntersectionUnobserves.length; i++) {
          var pending = pendingIntersectionUnobserves[i];
          pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
        }
        pendingIntersectionUnobserves.length = observers;
      }
    };
    function unobserveChild(child, observer) {
      if (child.tag === 6)
        return false;
      child = getInstanceFromHostFiber(child);
      observer.unobserve(child);
      return false;
    }
    var pendingIntersectionUnobserves = [];
    var intersectionUnobserveScheduled = false;
    function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
      pendingIntersectionUnobserves.push({
        fragmentInstance,
        observer,
        instance
      });
      intersectionUnobserveScheduled || (intersectionUnobserveScheduled = true, requestPostPaintCallback(function() {
        intersectionUnobserveScheduled = false;
        var pending = pendingIntersectionUnobserves;
        pendingIntersectionUnobserves = [];
        for (var i = 0;i < pending.length; i++) {
          var item = pending[i];
          item.observer.unobserve(item.instance);
        }
      }));
    }
    FragmentInstance.prototype.getClientRects = function() {
      var rects = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, collectClientRects, rects, undefined, undefined);
      return rects;
    };
    function collectClientRects(child, rects) {
      if (child.tag === 6) {
        child = child.stateNode;
        var range = child.ownerDocument.createRange();
        range.selectNodeContents(child);
        rects.push.apply(rects, range.getClientRects());
      } else
        child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
      return false;
    }
    FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      return parentHostFiber === null ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
    };
    FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      if (parentHostFiber === null)
        return Node.DOCUMENT_POSITION_DISCONNECTED;
      var children = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, collectChildren, children, undefined, undefined);
      var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
      if (children.length === 0) {
        children = parentHostInstance;
        if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
          a: {
            for (parentHostFiber = this._fragmentFiber.return;parentHostFiber !== null; ) {
              if (parentHostFiber.tag === 4) {
                parentHostFiber = parentHostFiber.stateNode.containerInfo;
                break a;
              }
              if (parentHostFiber.tag === 3 || parentHostFiber.tag === 5 || parentHostFiber.tag === 27)
                break;
              parentHostFiber = parentHostFiber.return;
            }
            parentHostFiber = null;
          }
          parentHostFiber != null && (children = parentHostFiber);
        }
        parentHostFiber = this._fragmentFiber;
        var result = parentHostInstance = children.compareDocumentPosition(otherNode);
        children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], children === null ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(otherNode), result = otherNode === 0 || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
        return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
      }
      parentHostFiber = getInstanceFromHostFiber(children[0]);
      result = getInstanceFromHostFiber(children[children.length - 1]);
      var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
      if (parentHostInstanceFromDOM == null)
        return Node.DOCUMENT_POSITION_DISCONNECTED;
      parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
      lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
      parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
      return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(parentHostFiber, this._fragmentFiber, children[0], children[children.length - 1], otherNode) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    };
    function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
      var otherFiber = getClosestInstanceFromNode(otherNode);
      if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if (precedingBoundaryFiber = !!otherFiber)
          a: {
            for (;otherFiber !== null; ) {
              if (otherFiber.tag === 7 && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
                precedingBoundaryFiber = true;
                break a;
              }
              otherFiber = otherFiber.return;
            }
            precedingBoundaryFiber = false;
          }
        return precedingBoundaryFiber;
      }
      if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
        if (otherFiber === null)
          return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
        a: {
          otherFiber = fragmentFiber;
          for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber);otherFiber !== null; ) {
            if (!(otherFiber.tag !== 5 && otherFiber.tag !== 3 && otherFiber.tag !== 27 || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
              otherFiber = true;
              break a;
            }
            otherFiber = otherFiber.return;
          }
          otherFiber = false;
        }
        return otherFiber;
      }
      return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(precedingBoundaryFiber, otherFiber, getParentForFragmentAncestors), fragmentFiber === null ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(fragmentFiber, true, isFiberPrecedingCheck, otherFiber, precedingBoundaryFiber), otherFiber = searchTarget, searchTarget = null, fragmentFiber = otherFiber !== null)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(followingBoundaryFiber, otherFiber, getParentForFragmentAncestors), fragmentFiber === null ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(fragmentFiber, true, isFiberFollowingCheck, otherFiber, followingBoundaryFiber), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = otherFiber !== null)), fragmentFiber) : false;
    }
    function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
      var range = textNode.ownerDocument.createRange();
      range.selectNodeContents(textNode);
      textNode = range.getBoundingClientRect();
      window.scrollTo(window.scrollX + textNode.left, resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight);
    }
    FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
      if (typeof alignToTop === "object")
        throw Error(formatProdErrorMessage(566));
      var children = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, collectChildren, children, undefined, undefined);
      var resolvedAlignToTop = alignToTop !== false;
      if (children.length === 0) {
        var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(this._fragmentFiber);
        hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
        if (hostSiblings === null)
          return;
        if (hostSiblings.tag === 6) {
          alignToTop = getInstanceFromHostFiber(hostSiblings);
          scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
          return;
        }
        hostSiblings = getInstanceFromHostFiber(hostSiblings);
        if (hostSiblings.nodeType !== 9) {
          if (hostSiblings.nodeType === 11) {
            resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
            resolvedAlignToTop !== null && resolvedAlignToTop.scrollIntoView(alignToTop);
            return;
          }
          hostSiblings.scrollIntoView(alignToTop);
        }
      }
      for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0;hostSiblings !== (resolvedAlignToTop ? -1 : children.length); ) {
        var child = children[hostSiblings];
        child.tag === 6 ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
        hostSiblings += resolvedAlignToTop ? -1 : 1;
      }
    };
    function addFragmentHandleToFiber(child, fragmentInstance) {
      child = getInstanceFromHostFiber(child);
      addFragmentHandleToInstance(child, fragmentInstance);
      return false;
    }
    function addFragmentHandleToInstance(instance, fragmentInstance) {
      instance.reactFragments == null && (instance.reactFragments = new Set);
      instance.reactFragments.add(fragmentInstance);
    }
    function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
      var eventListeners = fragmentInstance._eventListeners;
      if (eventListeners !== null)
        for (var i$jscomp$0 = 0;i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
          var _eventListeners$i3 = eventListeners[i$jscomp$0];
          childInstance.addEventListener(_eventListeners$i3.type, _eventListeners$i3.attachedListener, getAttachOptions(_eventListeners$i3.optionsOrUseCapture));
        }
      childInstance.nodeType !== 3 && (eventListeners = fragmentInstance._observers, eventListeners !== null && eventListeners.forEach(function(observer) {
        for (var writeIdx = 0, i = 0;i < pendingIntersectionUnobserves.length; i++) {
          var pending = pendingIntersectionUnobserves[i];
          if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance)
            pendingIntersectionUnobserves[writeIdx++] = pending;
        }
        pendingIntersectionUnobserves.length = writeIdx;
        observer.observe(childInstance);
      }), addFragmentHandleToInstance(childInstance, fragmentInstance));
    }
    function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
      var eventListeners = fragmentInstance._eventListeners;
      if (eventListeners !== null)
        for (var i = 0;i < eventListeners.length; i++) {
          var _eventListeners$i4 = eventListeners[i];
          childInstance.removeEventListener(_eventListeners$i4.type, _eventListeners$i4.attachedListener, getAttachOptions(_eventListeners$i4.optionsOrUseCapture));
        }
      childInstance.nodeType !== 3 && (eventListeners = fragmentInstance._observers, eventListeners !== null && eventListeners.forEach(function(observer) {
        typeof observer.rootMargin === "string" ? schedulePendingIntersectionUnobserve(fragmentInstance, observer, childInstance) : observer.unobserve(childInstance);
      }), childInstance.reactFragments != null && childInstance.reactFragments.delete(fragmentInstance));
    }
    function clearContainerSparingly(container) {
      var nextNode = container.firstChild;
      nextNode && nextNode.nodeType === 10 && (nextNode = nextNode.nextSibling);
      for (;nextNode; ) {
        var node = nextNode;
        nextNode = nextNode.nextSibling;
        switch (node.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            clearContainerSparingly(node);
            detachDeletedInstance(node);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (node.rel.toLowerCase() === "stylesheet")
              continue;
        }
        container.removeChild(node);
      }
    }
    function canHydrateInstance(instance, type, props, inRootOrSingleton) {
      for (;instance.nodeType === 1; ) {
        var anyProps = props;
        if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
          if (!inRootOrSingleton && (instance.nodeName !== "INPUT" || instance.type !== "hidden"))
            break;
        } else if (!inRootOrSingleton)
          if (type === "input" && instance.type === "hidden") {
            var name = anyProps.name == null ? null : "" + anyProps.name;
            if (anyProps.type === "hidden" && instance.getAttribute("name") === name)
              return instance;
          } else
            return instance;
        else if (!instance[internalHoistableMarker])
          switch (type) {
            case "meta":
              if (!instance.hasAttribute("itemprop"))
                break;
              return instance;
            case "link":
              name = instance.getAttribute("rel");
              if (name === "stylesheet" && instance.hasAttribute("data-precedence"))
                break;
              else if (name !== anyProps.rel || instance.getAttribute("href") !== (anyProps.href == null || anyProps.href === "" ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (anyProps.crossOrigin == null ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (anyProps.title == null ? null : anyProps.title))
                break;
              return instance;
            case "style":
              if (instance.hasAttribute("data-precedence"))
                break;
              return instance;
            case "script":
              name = instance.getAttribute("src");
              if ((name !== (anyProps.src == null ? null : anyProps.src) || instance.getAttribute("type") !== (anyProps.type == null ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (anyProps.crossOrigin == null ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                break;
              return instance;
            default:
              return instance;
          }
        instance = getNextHydratable(instance.nextSibling);
        if (instance === null)
          break;
      }
      return null;
    }
    function canHydrateTextInstance(instance, text, inRootOrSingleton) {
      if (text === "")
        return null;
      for (;instance.nodeType !== 3; ) {
        if ((instance.nodeType !== 1 || instance.nodeName !== "INPUT" || instance.type !== "hidden") && !inRootOrSingleton)
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (instance === null)
          return null;
      }
      return instance;
    }
    function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
      for (;instance.nodeType !== 8; ) {
        if ((instance.nodeType !== 1 || instance.nodeName !== "INPUT" || instance.type !== "hidden") && !inRootOrSingleton)
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (instance === null)
          return null;
      }
      return instance;
    }
    function isSuspenseInstancePending(instance) {
      return instance.data === "$?" || instance.data === "$~";
    }
    function isSuspenseInstanceFallback(instance) {
      return instance.data === "$!" || instance.data === "$?" && instance.ownerDocument.readyState !== "loading";
    }
    function registerSuspenseInstanceRetry(instance, callback) {
      var ownerDocument = instance.ownerDocument;
      if (instance.data === "$~")
        instance._reactRetry = callback;
      else if (instance.data !== "$?" || ownerDocument.readyState !== "loading")
        callback();
      else {
        var listener = function() {
          callback();
          ownerDocument.removeEventListener("DOMContentLoaded", listener);
        };
        ownerDocument.addEventListener("DOMContentLoaded", listener);
        instance._reactRetry = listener;
      }
    }
    function getNextHydratable(node) {
      for (;node != null; node = node.nextSibling) {
        var nodeType = node.nodeType;
        if (nodeType === 1 || nodeType === 3)
          break;
        if (nodeType === 8) {
          nodeType = node.data;
          if (nodeType === "$" || nodeType === "$!" || nodeType === "$?" || nodeType === "$~" || nodeType === "&" || nodeType === "F!" || nodeType === "F")
            break;
          if (nodeType === "/$" || nodeType === "/&")
            return null;
        }
      }
      return node;
    }
    var previousHydratableOnEnteringScopedSingleton = null;
    function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
      hydrationInstance = hydrationInstance.nextSibling;
      for (var depth = 0;hydrationInstance; ) {
        if (hydrationInstance.nodeType === 8) {
          var data = hydrationInstance.data;
          if (data === "/$" || data === "/&") {
            if (depth === 0)
              return getNextHydratable(hydrationInstance.nextSibling);
            depth--;
          } else
            data !== "$" && data !== "$!" && data !== "$?" && data !== "$~" && data !== "&" || depth++;
        }
        hydrationInstance = hydrationInstance.nextSibling;
      }
      return null;
    }
    function getParentHydrationBoundary(targetInstance) {
      targetInstance = targetInstance.previousSibling;
      for (var depth = 0;targetInstance; ) {
        if (targetInstance.nodeType === 8) {
          var data = targetInstance.data;
          if (data === "$" || data === "$!" || data === "$?" || data === "$~" || data === "&") {
            if (depth === 0)
              return targetInstance;
            depth--;
          } else
            data !== "/$" && data !== "/&" || depth++;
        }
        targetInstance = targetInstance.previousSibling;
      }
      return null;
    }
    function setFocusIfFocusable(node, focusOptions) {
      function handleFocus() {
        didFocus = true;
      }
      if (node.ownerDocument.activeElement === node)
        return true;
      var didFocus = false;
      try {
        node.ownerDocument.addEventListener("focus", handleFocus, true), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
      } finally {
        node.ownerDocument.removeEventListener("focus", handleFocus, true);
      }
      return didFocus;
    }
    function requestPostPaintCallback(callback) {
      localRequestAnimationFrame(function() {
        localRequestAnimationFrame(function(time) {
          return callback(time);
        });
      });
    }
    function resolveSingletonInstance(type, props, rootContainerInstance) {
      props = getOwnerDocumentFromRootContainer(rootContainerInstance);
      switch (type) {
        case "html":
          type = props.documentElement;
          if (!type)
            throw Error(formatProdErrorMessage(452));
          return type;
        case "head":
          type = props.head;
          if (!type)
            throw Error(formatProdErrorMessage(453));
          return type;
        case "body":
          type = props.body;
          if (!type)
            throw Error(formatProdErrorMessage(454));
          return type;
        default:
          throw Error(formatProdErrorMessage(451));
      }
    }
    function releaseSingletonInstance(instance, type, props) {
      for (var propKey in props) {
        var propValue = props[propKey];
        props.hasOwnProperty(propKey) && propValue != null && setProp(instance, type, propKey, null, emptyProps, propValue);
      }
      props.dangerouslySetInnerHTML != null && (instance.textContent = "");
      instance.onclick === noop$1 && (instance.onclick = null);
      detachDeletedInstance(instance);
    }
    function clearSingletonPreambleContribution(instance) {
      for (var attributes = instance.attributes;attributes.length; )
        instance.removeAttributeNode(attributes[0]);
      detachDeletedInstance(instance);
    }
    var preloadPropsMap = new Map;
    var preconnectsSet = new Set;
    function getHoistableRoot(container) {
      if (typeof container.getRootNode === "function") {
        var rootNode = container.getRootNode();
        if (rootNode.nodeType === 9 || rootNode.nodeType === 11)
          return rootNode;
      }
      return container.nodeType === 9 ? container : container.ownerDocument;
    }
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: flushSyncWork,
      r: requestFormReset,
      D: prefetchDNS,
      C: preconnect,
      L: preload,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    function flushSyncWork() {
      var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
      return previousWasRendering || wasRendering;
    }
    function requestFormReset(form) {
      var formInst = getInstanceFromNode(form);
      formInst !== null && formInst.tag === 5 && formInst.type === "form" ? requestFormReset$1(formInst) : previousDispatcher.r(form);
    }
    var globalDocument = typeof document === "undefined" ? null : document;
    function preconnectAs(rel, href, crossOrigin) {
      var ownerDocument = globalDocument;
      if (ownerDocument && typeof href === "string" && href) {
        var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
        limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
        typeof crossOrigin === "string" && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
        preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, ownerDocument.querySelector(limitedEscapedHref) === null && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
      }
    }
    function prefetchDNS(href) {
      previousDispatcher.D(href);
      preconnectAs("dns-prefetch", href, null);
    }
    function preconnect(href, crossOrigin) {
      previousDispatcher.C(href, crossOrigin);
      preconnectAs("preconnect", href, crossOrigin);
    }
    function preload(href, as, options2) {
      previousDispatcher.L(href, as, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && href && as) {
        var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
        as === "image" ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(options2.imageSrcSet) + '"]', typeof options2.imageSizes === "string" && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(options2.imageSizes) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
        var key = preloadSelector;
        switch (as) {
          case "style":
            key = getStyleKey(href);
            break;
          case "script":
            key = getScriptKey(href);
        }
        if (!(preloadPropsMap.has(key) || (href = assign({
          rel: "preload",
          href: as === "image" && options2 && options2.imageSrcSet ? undefined : href,
          as
        }, options2), preloadPropsMap.set(key, href), ownerDocument.querySelector(preloadSelector) !== null || as === "style" && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || as === "script" && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
          var instance = ownerDocument.createElement("link");
          setInitialProperties(instance, "link", href);
          as === "style" && (instance[internalLoadPendingKey] = true, instance.onload = instance.onerror = function() {
            clearPendingLoadOnNode(instance);
          });
          markNodeAsHoistable(instance);
          ownerDocument.head.appendChild(instance);
        }
      }
    }
    function preloadModule(href, options2) {
      previousDispatcher.m(href, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && href) {
        var as = options2 && typeof options2.as === "string" ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            key = getScriptKey(href);
        }
        if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), ownerDocument.querySelector(preloadSelector) === null)) {
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                return;
          }
          as = ownerDocument.createElement("link");
          setInitialProperties(as, "link", href);
          markNodeAsHoistable(as);
          ownerDocument.head.appendChild(as);
        }
      }
    }
    function preinitStyle(href, precedence, options2) {
      previousDispatcher.S(href, precedence, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && href) {
        var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
        precedence = precedence || "default";
        var resource = styles.get(key);
        if (!resource) {
          var state = { loading: 0, preload: null };
          if (resource = ownerDocument.querySelector(getStylesheetSelectorFromKey(key)))
            state.loading = 5;
          else {
            href = assign({ rel: "stylesheet", href, "data-precedence": precedence }, options2);
            (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
            var link = resource = ownerDocument.createElement("link");
            markNodeAsHoistable(link);
            setInitialProperties(link, "link", href);
            link._p = new Promise(function(resolve, reject) {
              link.onload = resolve;
              link.onerror = reject;
            });
            link.addEventListener("load", function() {
              state.loading |= 1;
            });
            link.addEventListener("error", function() {
              state.loading |= 2;
            });
            state.loading |= 4;
            insertStylesheet(resource, precedence, ownerDocument);
          }
          resource = {
            type: "stylesheet",
            instance: resource,
            count: 1,
            state
          };
          styles.set(key, resource);
        }
      }
    }
    function preinitScript(src, options2) {
      previousDispatcher.X(src, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && src) {
        var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
        resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
          type: "script",
          instance: resource,
          count: 1,
          state: null
        }, scripts.set(key, resource));
      }
    }
    function preinitModuleScript(src, options2) {
      previousDispatcher.M(src, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && src) {
        var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
        resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
          type: "script",
          instance: resource,
          count: 1,
          state: null
        }, scripts.set(key, resource));
      }
    }
    function getResource(type, currentProps, pendingProps, currentResource) {
      var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
      if (!JSCompiler_inline_result)
        throw Error(formatProdErrorMessage(446));
      switch (type) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof pendingProps.precedence === "string" && typeof pendingProps.href === "string" ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (pendingProps.rel === "stylesheet" && typeof pendingProps.href === "string" && typeof pendingProps.precedence === "string") {
            type = getStyleKey(pendingProps.href);
            var styles$268 = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, resource$269 = styles$268.get(type);
            resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null }
            }, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(getStylesheetSelectorFromKey(type))) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
              rel: "preload",
              as: "style",
              href: pendingProps.href,
              crossOrigin: pendingProps.crossOrigin,
              integrity: pendingProps.integrity,
              media: pendingProps.media,
              hrefLang: pendingProps.hrefLang,
              referrerPolicy: pendingProps.referrerPolicy
            }, preloadPropsMap.set(type, styles$268)), preloadStylesheet(JSCompiler_inline_result, type, styles$268, resource$269.state)));
            if (currentProps && currentResource === null)
              throw Error(formatProdErrorMessage(528, ""));
            return resource$269;
          }
          if (currentProps && currentResource !== null)
            throw Error(formatProdErrorMessage(529, ""));
          return null;
        case "script":
          return currentProps = pendingProps.async, pendingProps = pendingProps.src, typeof pendingProps === "string" && currentProps && typeof currentProps !== "function" && typeof currentProps !== "symbol" ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(formatProdErrorMessage(444, type));
      }
    }
    function getStyleKey(href) {
      return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
    }
    function getStylesheetSelectorFromKey(key) {
      return 'link[rel="stylesheet"][' + key + "]";
    }
    function stylesheetPropsFromRawProps(rawProps) {
      return assign({}, rawProps, {
        "data-precedence": rawProps.precedence,
        precedence: null
      });
    }
    function preloadStylesheet(ownerDocument, key, preloadProps, state) {
      if (key = ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]")) {
        if (key[internalLoadPendingKey] !== true) {
          state.loading = 1;
          return;
        }
      } else
        key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = true, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
      state.preload = key;
      key.addEventListener("load", function() {
        return state.loading |= 1;
      });
      key.addEventListener("error", function() {
        return state.loading |= 2;
      });
    }
    function getScriptKey(src) {
      return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
    }
    function getScriptSelectorFromKey(key) {
      return "script[async]" + key;
    }
    function acquireResource(hoistableRoot, resource, props) {
      resource.count++;
      if (resource.instance === null)
        switch (resource.type) {
          case "style":
            var instance = hoistableRoot.querySelector('style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]');
            if (instance)
              return resource.instance = instance, markNodeAsHoistable(instance), instance;
            var styleProps = assign({}, props, {
              "data-href": props.href,
              "data-precedence": props.precedence,
              href: null,
              precedence: null
            });
            instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("style");
            markNodeAsHoistable(instance);
            setInitialProperties(instance, "style", styleProps);
            insertStylesheet(instance, props.precedence, hoistableRoot);
            return resource.instance = instance;
          case "stylesheet":
            styleProps = getStyleKey(props.href);
            var instance$274 = hoistableRoot.querySelector(getStylesheetSelectorFromKey(styleProps));
            if (instance$274)
              return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
            instance = stylesheetPropsFromRawProps(props);
            (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
            instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
            markNodeAsHoistable(instance$274);
            var linkInstance = instance$274;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance$274, "link", instance);
            resource.state.loading |= 4;
            insertStylesheet(instance$274, props.precedence, hoistableRoot);
            return resource.instance = instance$274;
          case "script":
            instance$274 = getScriptKey(props.src);
            if (styleProps = hoistableRoot.querySelector(getScriptSelectorFromKey(instance$274)))
              return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
            instance = props;
            if (styleProps = preloadPropsMap.get(instance$274))
              instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
            hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
            styleProps = hoistableRoot.createElement("script");
            markNodeAsHoistable(styleProps);
            setInitialProperties(styleProps, "link", instance);
            hoistableRoot.head.appendChild(styleProps);
            return resource.instance = styleProps;
          case "void":
            return null;
          default:
            throw Error(formatProdErrorMessage(443, resource.type));
        }
      else
        resource.type === "stylesheet" && (resource.state.loading & 4) === 0 && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
      return resource.instance;
    }
    function insertStylesheet(instance, precedence, root2) {
      for (var nodes = root2.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0;i < nodes.length; i++) {
        var node = nodes[i];
        if (node.dataset.precedence === precedence)
          prior = node;
        else if (prior !== last)
          break;
      }
      prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = root2.nodeType === 9 ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
    }
    function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
      stylesheetProps.crossOrigin == null && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
      stylesheetProps.referrerPolicy == null && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
      stylesheetProps.title == null && (stylesheetProps.title = preloadProps.title);
    }
    function adoptPreloadPropsForScript(scriptProps, preloadProps) {
      scriptProps.crossOrigin == null && (scriptProps.crossOrigin = preloadProps.crossOrigin);
      scriptProps.referrerPolicy == null && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
      scriptProps.integrity == null && (scriptProps.integrity = preloadProps.integrity);
    }
    var tagCaches = null;
    function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
      if (tagCaches === null) {
        var cache = new Map;
        var caches = tagCaches = new Map;
        caches.set(ownerDocument, cache);
      } else
        caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = new Map, caches.set(ownerDocument, cache));
      if (cache.has(type))
        return cache;
      cache.set(type, null);
      ownerDocument = ownerDocument.getElementsByTagName(type);
      for (caches = 0;caches < ownerDocument.length; caches++) {
        var node = ownerDocument[caches];
        if (!(node[internalHoistableMarker] || node[internalInstanceKey] || type === "link" && node.getAttribute("rel") === "stylesheet") && node.namespaceURI !== "http://www.w3.org/2000/svg") {
          var nodeKey = node.getAttribute(keyAttribute) || "";
          nodeKey = type + nodeKey;
          var existing = cache.get(nodeKey);
          existing ? existing.push(node) : cache.set(nodeKey, [node]);
        }
      }
      return cache;
    }
    function mountHoistable(hoistableRoot, type, instance) {
      hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
      hoistableRoot.head.insertBefore(instance, type === "title" ? hoistableRoot.querySelector("head > title") : null);
    }
    function isHostHoistableType(type, props, hostContext) {
      if (hostContext === 1 || props.itemProp != null)
        return false;
      switch (type) {
        case "meta":
        case "title":
          return true;
        case "style":
          if (typeof props.precedence !== "string" || typeof props.href !== "string" || props.href === "")
            break;
          return true;
        case "link":
          if (typeof props.rel !== "string" || typeof props.href !== "string" || props.href === "" || props.onLoad || props.onError)
            break;
          switch (props.rel) {
            case "stylesheet":
              return type = props.disabled, typeof props.precedence === "string" && type == null;
            default:
              return true;
          }
        case "script":
          if (props.async && typeof props.async !== "function" && typeof props.async !== "symbol" && !props.onLoad && !props.onError && props.src && typeof props.src === "string")
            return true;
      }
      return false;
    }
    function maySuspendCommit(type, props) {
      return type === "img" && props.src != null && props.src !== "" && props.onLoad == null && props.loading !== "lazy";
    }
    function preloadResource(resource) {
      return resource.type === "stylesheet" && (resource.state.loading & 3) === 0 ? false : true;
    }
    function estimateImageBytes(instance) {
      return (instance.width || 100) * (instance.height || 100) * (typeof devicePixelRatio === "number" ? devicePixelRatio : 1) * 0.25;
    }
    function suspendInstance(state, instance) {
      typeof instance.decode === "function" && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
    }
    function suspendResource(state, hoistableRoot, resource, props) {
      if (resource.type === "stylesheet" && (typeof props.media !== "string" || matchMedia(props.media).matches !== false) && (resource.state.loading & 4) === 0) {
        if (resource.instance === null) {
          var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(getStylesheetSelectorFromKey(key));
          if (instance) {
            hoistableRoot = instance._p;
            hoistableRoot !== null && typeof hoistableRoot === "object" && typeof hoistableRoot.then === "function" && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
            resource.state.loading |= 4;
            resource.instance = instance;
            markNodeAsHoistable(instance);
            return;
          }
          instance = hoistableRoot.ownerDocument || hoistableRoot;
          props = stylesheetPropsFromRawProps(props);
          (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
          instance = instance.createElement("link");
          markNodeAsHoistable(instance);
          var linkInstance = instance;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance, "link", props);
          resource.instance = instance;
        }
        state.stylesheets === null && (state.stylesheets = new Map);
        state.stylesheets.set(resource, hoistableRoot);
        (hoistableRoot = resource.state.preload) && (resource.state.loading & 3) === 0 && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
      }
    }
    var estimatedBytesWithinLimit = 0;
    function waitForCommitToBeReady(state, timeoutOffset) {
      state.stylesheets && state.count === 0 && insertSuspendedStylesheets(state, state.stylesheets);
      return 0 < state.count || 0 < state.imgCount ? function(commit) {
        var stylesheetTimer = setTimeout(function() {
          state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
          if (state.unsuspend) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        }, 60000 + timeoutOffset);
        0 < state.imgBytes && estimatedBytesWithinLimit === 0 && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
        var imgTimer = setTimeout(function() {
          state.waitingForImages = false;
          if (state.count === 0 && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        }, (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset);
        state.unsuspend = commit;
        return function() {
          state.unsuspend = null;
          clearTimeout(stylesheetTimer);
          clearTimeout(imgTimer);
        };
      } : null;
    }
    function checkIfFullyUnsuspended(state) {
      if (state.count === 0 && (state.imgCount === 0 || !state.waitingForImages)) {
        if (state.stylesheets)
          insertSuspendedStylesheets(state, state.stylesheets);
        else if (state.unsuspend) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      }
    }
    function onUnsuspend() {
      this.count--;
      checkIfFullyUnsuspended(this);
    }
    function onUnsuspendImg() {
      this.imgCount--;
      checkIfFullyUnsuspended(this);
    }
    var precedencesByRoot = null;
    function insertSuspendedStylesheets(state, resources) {
      state.stylesheets = null;
      state.unsuspend !== null && (state.count++, precedencesByRoot = new Map, resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
    }
    function insertStylesheetIntoRoot(root2, resource) {
      if (!(resource.state.loading & 4)) {
        var precedences = precedencesByRoot.get(root2);
        if (precedences)
          var last = precedences.get(null);
        else {
          precedences = new Map;
          precedencesByRoot.set(root2, precedences);
          for (var nodes = root2.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0;i < nodes.length; i++) {
            var node = nodes[i];
            if (node.nodeName === "LINK" || node.getAttribute("media") !== "not all")
              precedences.set(node.dataset.precedence, node), last = node;
          }
          last && precedences.set(null, last);
        }
        nodes = resource.instance;
        node = nodes.getAttribute("data-precedence");
        i = precedences.get(node) || last;
        i === last && precedences.set(null, nodes);
        precedences.set(node, nodes);
        this.count++;
        last = onUnsuspend.bind(this);
        nodes.addEventListener("load", last);
        nodes.addEventListener("error", last);
        i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = root2.nodeType === 9 ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
        resource.state.loading |= 4;
      }
    }
    var HostTransitionContext = {
      $$typeof: REACT_CONTEXT_TYPE,
      Provider: null,
      Consumer: null,
      _currentValue: sharedNotPendingObject,
      _currentValue2: sharedNotPendingObject,
      _threadCount: 0
    };
    function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
      this.tag = 1;
      this.containerInfo = containerInfo;
      this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
      this.callbackPriority = 0;
      this.expirationTimes = createLaneMap(-1);
      this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = createLaneMap(0);
      this.hiddenUpdates = createLaneMap(null);
      this.identifierPrefix = identifierPrefix;
      this.onUncaughtError = onUncaughtError;
      this.onCaughtError = onCaughtError;
      this.onRecoverableError = onRecoverableError;
      this.pooledCache = null;
      this.pooledCacheLanes = 0;
      this.formState = formState;
      this.transitionTypes = null;
      this.incompleteTransitions = new Map;
    }
    function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
      containerInfo = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
      tag = 1;
      isStrictMode === true && (tag |= 24);
      isStrictMode = createFiberImplClass(3, null, null, tag);
      containerInfo.current = isStrictMode;
      isStrictMode.stateNode = containerInfo;
      tag = createCache();
      tag.refCount++;
      containerInfo.pooledCache = tag;
      tag.refCount++;
      isStrictMode.memoizedState = {
        element: initialChildren,
        isDehydrated: hydrate,
        cache: tag
      };
      initializeUpdateQueue(isStrictMode);
      return containerInfo;
    }
    function getContextForSubtree(parentComponent) {
      if (!parentComponent)
        return emptyContextObject;
      parentComponent = emptyContextObject;
      return parentComponent;
    }
    function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
      parentComponent = getContextForSubtree(parentComponent);
      container.context === null ? container.context = parentComponent : container.pendingContext = parentComponent;
      container = createUpdate(lane);
      container.payload = { element };
      callback = callback === undefined ? null : callback;
      callback !== null && (container.callback = callback);
      element = enqueueUpdate(rootFiber, container, lane);
      element !== null && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
    }
    function markRetryLaneImpl(fiber, retryLane) {
      fiber = fiber.memoizedState;
      if (fiber !== null && fiber.dehydrated !== null) {
        var a = fiber.retryLane;
        fiber.retryLane = a !== 0 && a < retryLane ? a : retryLane;
      }
    }
    function markRetryLaneIfNotHydrated(fiber, retryLane) {
      markRetryLaneImpl(fiber, retryLane);
      (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
    }
    function attemptContinuousHydration(fiber) {
      if (fiber.tag === 13 || fiber.tag === 31) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
        root2 !== null && scheduleUpdateOnFiber(root2, fiber, 67108864);
        markRetryLaneIfNotHydrated(fiber, 67108864);
      }
    }
    function attemptHydrationAtCurrentPriority(fiber) {
      if (fiber.tag === 13 || fiber.tag === 31) {
        var lane = requestUpdateLane();
        lane = getBumpedLaneForHydrationByLane(lane);
        var root2 = enqueueConcurrentRenderForLane(fiber, lane);
        root2 !== null && scheduleUpdateOnFiber(root2, fiber, lane);
        markRetryLaneIfNotHydrated(fiber, lane);
      }
    }
    var _enabled = true;
    function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
      }
    }
    function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
      }
    }
    function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      if (_enabled) {
        var blockedOn = findInstanceBlockingEvent(nativeEvent);
        if (blockedOn === null)
          dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer), clearIfContinuousEvent(domEventName, nativeEvent);
        else if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent))
          nativeEvent.stopPropagation();
        else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
          for (;blockedOn !== null; ) {
            var fiber = getInstanceFromNode(blockedOn);
            if (fiber !== null)
              switch (fiber.tag) {
                case 3:
                  fiber = fiber.stateNode;
                  if (fiber.current.memoizedState.isDehydrated) {
                    var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                    if (lanes !== 0) {
                      var root2 = fiber;
                      root2.pendingLanes |= 2;
                      for (root2.entangledLanes |= 2;lanes; ) {
                        var lane = 1 << 31 - clz32(lanes);
                        root2.entanglements[1] |= lane;
                        lanes &= ~lane;
                      }
                      ensureRootIsScheduled(fiber);
                      (executionContext & 6) === 0 && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, false));
                    }
                  }
                  break;
                case 31:
                case 13:
                  root2 = enqueueConcurrentRenderForLane(fiber, 2), root2 !== null && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
              }
            fiber = findInstanceBlockingEvent(nativeEvent);
            fiber === null && dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer);
            if (fiber === blockedOn)
              break;
            blockedOn = fiber;
          }
          blockedOn !== null && nativeEvent.stopPropagation();
        } else
          dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer);
      }
    }
    function findInstanceBlockingEvent(nativeEvent) {
      nativeEvent = getEventTarget(nativeEvent);
      return findInstanceBlockingTarget(nativeEvent);
    }
    var return_targetInst = null;
    function findInstanceBlockingTarget(targetNode) {
      return_targetInst = null;
      targetNode = getClosestInstanceFromNode(targetNode);
      if (targetNode !== null) {
        var nearestMounted = getNearestMountedFiber(targetNode);
        if (nearestMounted === null)
          targetNode = null;
        else {
          var tag = nearestMounted.tag;
          if (tag === 13) {
            targetNode = getSuspenseInstanceFromFiber(nearestMounted);
            if (targetNode !== null)
              return targetNode;
            targetNode = null;
          } else if (tag === 31) {
            targetNode = getActivityInstanceFromFiber(nearestMounted);
            if (targetNode !== null)
              return targetNode;
            targetNode = null;
          } else if (tag === 3) {
            if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
              return nearestMounted.tag === 3 ? nearestMounted.stateNode.containerInfo : null;
            targetNode = null;
          } else
            nearestMounted !== targetNode && (targetNode = null);
        }
      }
      return_targetInst = targetNode;
      return null;
    }
    function getEventPriority(domEventName) {
      switch (domEventName) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "fullscreenerror":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "resize":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (getCurrentPriorityLevel()) {
            case ImmediatePriority:
              return 2;
            case UserBlockingPriority:
              return 8;
            case NormalPriority$1:
            case LowPriority:
              return 32;
            case IdlePriority:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var hasScheduledReplayAttempt = false;
    var queuedFocus = null;
    var queuedDrag = null;
    var queuedMouse = null;
    var queuedPointers = new Map;
    var queuedPointerCaptures = new Map;
    var queuedExplicitHydrationTargets = [];
    var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function clearIfContinuousEvent(domEventName, nativeEvent) {
      switch (domEventName) {
        case "focusin":
        case "focusout":
          queuedFocus = null;
          break;
        case "dragenter":
        case "dragleave":
          queuedDrag = null;
          break;
        case "mouseover":
        case "mouseout":
          queuedMouse = null;
          break;
        case "pointerover":
        case "pointerout":
          queuedPointers.delete(nativeEvent.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          queuedPointerCaptures.delete(nativeEvent.pointerId);
      }
    }
    function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      if (existingQueuedEvent === null || existingQueuedEvent.nativeEvent !== nativeEvent)
        return existingQueuedEvent = {
          blockedOn,
          domEventName,
          eventSystemFlags,
          nativeEvent,
          targetContainers: [targetContainer]
        }, blockedOn !== null && (blockedOn = getInstanceFromNode(blockedOn), blockedOn !== null && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
      existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
      blockedOn = existingQueuedEvent.targetContainers;
      targetContainer !== null && blockedOn.indexOf(targetContainer) === -1 && blockedOn.push(targetContainer);
      return existingQueuedEvent;
    }
    function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      switch (domEventName) {
        case "focusin":
          return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
        case "dragenter":
          return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
        case "mouseover":
          return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
        case "pointerover":
          var pointerId = nativeEvent.pointerId;
          queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
          return true;
        case "gotpointercapture":
          return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), true;
      }
      return false;
    }
    function attemptExplicitHydrationTarget(queuedTarget) {
      var targetInst = getClosestInstanceFromNode(queuedTarget.target);
      if (targetInst !== null) {
        var nearestMounted = getNearestMountedFiber(targetInst);
        if (nearestMounted !== null) {
          if (targetInst = nearestMounted.tag, targetInst === 13) {
            if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), targetInst !== null) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function() {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
              return;
            }
          } else if (targetInst === 31) {
            if (targetInst = getActivityInstanceFromFiber(nearestMounted), targetInst !== null) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function() {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
              return;
            }
          } else if (targetInst === 3 && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
            queuedTarget.blockedOn = nearestMounted.tag === 3 ? nearestMounted.stateNode.containerInfo : null;
            return;
          }
        }
      }
      queuedTarget.blockedOn = null;
    }
    function attemptReplayContinuousQueuedEvent(queuedEvent) {
      if (queuedEvent.blockedOn !== null)
        return false;
      for (var targetContainers = queuedEvent.targetContainers;0 < targetContainers.length; ) {
        var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
        if (nextBlockedOn === null) {
          nextBlockedOn = queuedEvent.nativeEvent;
          var nativeEventClone = new nextBlockedOn.constructor(nextBlockedOn.type, nextBlockedOn);
          currentReplayingEvent = nativeEventClone;
          nextBlockedOn.target.dispatchEvent(nativeEventClone);
          currentReplayingEvent = null;
        } else
          return targetContainers = getInstanceFromNode(nextBlockedOn), targetContainers !== null && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
        targetContainers.shift();
      }
      return true;
    }
    function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
      attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
    }
    function replayUnblockedEvents() {
      hasScheduledReplayAttempt = false;
      queuedFocus !== null && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
      queuedDrag !== null && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
      queuedMouse !== null && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
      queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
      queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
    }
    function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
      queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents)));
    }
    var lastScheduledReplayQueue = null;
    function scheduleReplayQueueIfNeeded(formReplayingQueue) {
      lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, function() {
        lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
        for (var i = 0;i < formReplayingQueue.length; i += 3) {
          var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
          if (typeof submitterOrAction !== "function")
            if (findInstanceBlockingTarget(submitterOrAction || form) === null)
              continue;
            else
              break;
          var formInst = getInstanceFromNode(form);
          formInst !== null && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(formInst, {
            pending: true,
            data: formData,
            method: form.method,
            action: submitterOrAction
          }, submitterOrAction, formData));
        }
      }));
    }
    function retryIfBlockedOn(unblocked) {
      function unblock(queuedEvent) {
        return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
      }
      queuedFocus !== null && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
      queuedDrag !== null && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
      queuedMouse !== null && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
      queuedPointers.forEach(unblock);
      queuedPointerCaptures.forEach(unblock);
      for (var i = 0;i < queuedExplicitHydrationTargets.length; i++) {
        var queuedTarget = queuedExplicitHydrationTargets[i];
        queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
      }
      for (;0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], i.blockedOn === null); )
        attemptExplicitHydrationTarget(i), i.blockedOn === null && queuedExplicitHydrationTargets.shift();
      i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
      if (i != null)
        for (queuedTarget = 0;queuedTarget < i.length; queuedTarget += 3) {
          var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
          if (typeof submitterOrAction === "function")
            formProps || scheduleReplayQueueIfNeeded(i);
          else if (formProps) {
            var action = null;
            if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
              if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                action = formProps.formAction;
              else {
                if (findInstanceBlockingTarget(form) !== null)
                  continue;
              }
            else
              action = formProps.action;
            typeof action === "function" ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
            scheduleReplayQueueIfNeeded(i);
          }
        }
    }
    function defaultOnDefaultTransitionIndicator() {
      function handleNavigate(event) {
        event.canIntercept && event.info === "react-transition" && event.intercept({
          handler: function() {
            return new Promise(function(resolve) {
              return pendingResolve = resolve;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function handleNavigateComplete() {
        pendingResolve !== null && (pendingResolve(), pendingResolve = null);
        isCancelled || setTimeout(startFakeNavigation, 20);
      }
      function startFakeNavigation() {
        if (!isCancelled && !navigation.transition) {
          var currentEntry = navigation.currentEntry;
          currentEntry && currentEntry.url != null && navigation.navigate(currentEntry.url, {
            state: currentEntry.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation === "object") {
        var isCancelled = false, pendingResolve = null;
        navigation.addEventListener("navigate", handleNavigate);
        navigation.addEventListener("navigatesuccess", handleNavigateComplete);
        navigation.addEventListener("navigateerror", handleNavigateComplete);
        setTimeout(startFakeNavigation, 100);
        return function() {
          isCancelled = true;
          navigation.removeEventListener("navigate", handleNavigate);
          navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
          navigation.removeEventListener("navigateerror", handleNavigateComplete);
          pendingResolve !== null && (pendingResolve(), pendingResolve = null);
        };
      }
    }
    function ReactDOMRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
      var root2 = this._internalRoot;
      if (root2 === null)
        throw Error(formatProdErrorMessage(409));
      var current = root2.current, lane = requestUpdateLane();
      updateContainerImpl(current, lane, children, root2, null, null);
    };
    ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
      var root2 = this._internalRoot;
      if (root2 !== null) {
        this._internalRoot = null;
        var container = root2.containerInfo;
        updateContainerImpl(root2.current, 2, null, root2, null, null);
        flushSyncWork$1();
        container[internalContainerInstanceKey] = null;
      }
    };
    function ReactDOMHydrationRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
      if (target) {
        var updatePriority = resolveUpdatePriority();
        target = { blockedOn: null, target, priority: updatePriority };
        for (var i = 0;i < queuedExplicitHydrationTargets.length && updatePriority !== 0 && updatePriority < queuedExplicitHydrationTargets[i].priority; i++)
          ;
        queuedExplicitHydrationTargets.splice(i, 0, target);
        i === 0 && attemptExplicitHydrationTarget(target);
      }
    };
    var isomorphicReactPackageVersion$jscomp$inline_2043 = React.version;
    if (isomorphicReactPackageVersion$jscomp$inline_2043 !== "19.3.0")
      throw Error(formatProdErrorMessage(527, isomorphicReactPackageVersion$jscomp$inline_2043, "19.3.0"));
    ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
      var fiber = componentOrElement._reactInternals;
      if (fiber === undefined) {
        if (typeof componentOrElement.render === "function")
          throw Error(formatProdErrorMessage(188));
        componentOrElement = Object.keys(componentOrElement).join(",");
        throw Error(formatProdErrorMessage(268, componentOrElement));
      }
      componentOrElement = findCurrentFiberUsingSlowPath(fiber);
      componentOrElement = componentOrElement !== null ? findCurrentHostFiberImpl(componentOrElement) : null;
      componentOrElement = componentOrElement === null ? null : componentOrElement.stateNode;
      return componentOrElement;
    };
    var internals$jscomp$inline_2586 = {
      bundleType: 0,
      version: "19.3.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: ReactSharedInternals,
      reconcilerVersion: "19.3.0"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber)
        try {
          rendererID = hook$jscomp$inline_2587.inject(internals$jscomp$inline_2586), injectedHook = hook$jscomp$inline_2587;
        } catch (err) {}
    }
    var hook$jscomp$inline_2587;
    exports.createRoot = function(container, options2) {
      if (!isValidContainer(container))
        throw Error(formatProdErrorMessage(299));
      var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
      options2 !== null && options2 !== undefined && (options2.unstable_strictMode === true && (isStrictMode = true), options2.identifierPrefix !== undefined && (identifierPrefix = options2.identifierPrefix), options2.onUncaughtError !== undefined && (onUncaughtError = options2.onUncaughtError), options2.onCaughtError !== undefined && (onCaughtError = options2.onCaughtError), options2.onRecoverableError !== undefined && (onRecoverableError = options2.onRecoverableError));
      options2 = createFiberRoot(container, 1, false, null, null, isStrictMode, identifierPrefix, null, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
      container[internalContainerInstanceKey] = options2.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMRoot(options2);
    };
    exports.hydrateRoot = function(container, initialChildren, options2) {
      if (!isValidContainer(container))
        throw Error(formatProdErrorMessage(299));
      var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
      options2 !== null && options2 !== undefined && (options2.unstable_strictMode === true && (isStrictMode = true), options2.identifierPrefix !== undefined && (identifierPrefix = options2.identifierPrefix), options2.onUncaughtError !== undefined && (onUncaughtError = options2.onUncaughtError), options2.onCaughtError !== undefined && (onCaughtError = options2.onCaughtError), options2.onRecoverableError !== undefined && (onRecoverableError = options2.onRecoverableError), options2.formState !== undefined && (formState = options2.formState));
      initialChildren = createFiberRoot(container, 1, true, initialChildren, options2 != null ? options2 : null, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
      initialChildren.context = getContextForSubtree(null);
      options2 = initialChildren.current;
      isStrictMode = requestUpdateLane();
      isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
      identifierPrefix = createUpdate(isStrictMode);
      identifierPrefix.callback = null;
      enqueueUpdate(options2, identifierPrefix, isStrictMode);
      options2 = isStrictMode;
      initialChildren.current.lanes = options2;
      markRootUpdated$1(initialChildren, options2);
      ensureRootIsScheduled(initialChildren);
      container[internalContainerInstanceKey] = initialChildren.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMHydrationRoot(initialChildren);
    };
    exports.version = "19.3.0";
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS((exports, module) => {
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {}
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_client_production();
    } else {}
  });

  // src/settings/settings.tsx
  var React5 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // src/settings/settings_screen.tsx
  var React4 = __toESM(require_react(), 1);
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/styled-components/dist/styled-components.browser.esm.js
  var import_react = __toESM(require_react(), 1);

  // node_modules/stylis/src/Enum.js
  var MS = "-ms-";
  var MOZ = "-moz-";
  var WEBKIT = "-webkit-";
  var COMMENT = "comm";
  var RULESET = "rule";
  var DECLARATION = "decl";
  var IMPORT = "@import";
  var NAMESPACE = "@namespace";
  var KEYFRAMES = "@keyframes";
  var LAYER = "@layer";

  // node_modules/stylis/src/Utility.js
  var abs = Math.abs;
  var from = String.fromCharCode;
  var assign = Object.assign;
  function hash(value, length) {
    return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
  }
  function trim(value) {
    return value.trim();
  }
  function match(value, pattern) {
    return (value = pattern.exec(value)) ? value[0] : value;
  }
  function replace(value, pattern, replacement) {
    return value.replace(pattern, replacement);
  }
  function indexof(value, search, position) {
    return value.indexOf(search, position);
  }
  function charat(value, index) {
    return value.charCodeAt(index) | 0;
  }
  function substr(value, begin, end) {
    return value.slice(begin, end);
  }
  function strlen(value) {
    return value.length;
  }
  function sizeof(value) {
    return value.length;
  }
  function append(value, array) {
    return array.push(value), value;
  }
  function combine(array, callback) {
    return array.map(callback).join("");
  }
  function filter(array, pattern) {
    return array.filter(function(value) {
      return !match(value, pattern);
    });
  }

  // node_modules/stylis/src/Tokenizer.js
  var line = 1;
  var column = 1;
  var length = 0;
  var position = 0;
  var character = 0;
  var characters = "";
  function node(value, root, parent, type, props, children, length2, siblings) {
    return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
  }
  function copy(root, props) {
    return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
  }
  function lift(root) {
    while (root.root)
      root = copy(root.root, { children: [root] });
    append(root, root.siblings);
  }
  function char() {
    return character;
  }
  function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10)
      column = 1, line--;
    return character;
  }
  function next() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10)
      column = 1, line++;
    return character;
  }
  function peek() {
    return charat(characters, position);
  }
  function caret() {
    return position;
  }
  function slice(begin, end) {
    return substr(characters, begin, end);
  }
  function token(type) {
    switch (type) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function alloc(value) {
    return line = column = 1, length = strlen(characters = value), position = 0, [];
  }
  function dealloc(value) {
    return characters = "", value;
  }
  function delimit(type) {
    return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
  }
  function whitespace(type) {
    while (character = peek())
      if (character < 33)
        next();
      else
        break;
    return token(type) > 2 || token(character) > 3 ? "" : " ";
  }
  function escaping(index, count) {
    while (--count && next())
      if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
        break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
  }
  function delimiter(type) {
    while (next())
      switch (character) {
        case type:
          return position;
        case 34:
        case 39:
          if (type !== 34 && type !== 39)
            delimiter(character);
          break;
        case 40:
          if (type === 41)
            delimiter(type);
          break;
        case 92:
          next();
          break;
      }
    return position;
  }
  function commenter(type, index) {
    while (next())
      if (type + character === 47 + 10)
        break;
      else if (type + character === 42 + 42 && peek() === 47)
        break;
    return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
  }
  function identifier(index) {
    while (!token(peek()))
      next();
    return slice(index, position);
  }

  // node_modules/stylis/src/Parser.js
  function compile(value) {
    return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
  }
  function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
    var index = 0;
    var offset = 0;
    var length2 = pseudo;
    var atrule = 0;
    var property = 0;
    var previous = 0;
    var variable = 1;
    var scanning = 1;
    var ampersand = 1;
    var character2 = 0;
    var type = "";
    var props = rules;
    var children = rulesets;
    var reference = rule;
    var characters2 = type;
    while (scanning)
      switch (previous = character2, character2 = next()) {
        case 40:
          if (previous != 108 && charat(characters2, length2 - 1) == 58) {
            if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f", abs(index ? points[index - 1] : 0)) != -1)
              ampersand = -1;
            break;
          }
        case 34:
        case 39:
        case 91:
          characters2 += delimit(character2);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          characters2 += whitespace(previous);
          break;
        case 92:
          characters2 += escaping(caret() - 1, 7);
          continue;
        case 47:
          switch (peek()) {
            case 42:
            case 47:
              append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
              if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters2) && substr(characters2, -1, undefined) !== " ")
                characters2 += " ";
              break;
            default:
              characters2 += "/";
          }
          break;
        case 123 * variable:
          points[index++] = strlen(characters2) * ampersand;
        case 125 * variable:
        case 59:
        case 0:
          switch (character2) {
            case 0:
            case 125:
              scanning = 0;
            case 59 + offset:
              if (ampersand == -1)
                characters2 = replace(characters2, /\f/g, "");
              if (property > 0 && (strlen(characters2) - length2 || variable === 0 && previous === 47))
                append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
              break;
            case 59:
              characters2 += ";";
            default:
              append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
              if (character2 === 123)
                if (offset === 0)
                  parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
                else {
                  switch (atrule) {
                    case 99:
                      if (charat(characters2, 3) === 110)
                        break;
                    case 108:
                      if (charat(characters2, 2) === 97)
                        break;
                    default:
                      offset = 0;
                    case 100:
                    case 109:
                    case 115:
                  }
                  if (offset)
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                  else
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
          }
          index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
          break;
        case 58:
          length2 = 1 + strlen(characters2), property = previous;
        default:
          if (variable < 1) {
            if (character2 == 123)
              --variable;
            else if (character2 == 125 && variable++ == 0 && prev() == 125)
              continue;
          }
          switch (characters2 += from(character2), character2 * variable) {
            case 38:
              ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
              break;
            case 44:
              points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
              break;
            case 64:
              if (peek() === 45)
                characters2 += delimit(next());
              atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
              break;
            case 45:
              if (previous === 45 && strlen(characters2) == 2)
                variable = 0;
          }
      }
    return rulesets;
  }
  function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [""];
    var size = sizeof(rule);
    for (var i = 0, j = 0, k = 0;i < index; ++i)
      for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value;x < size; ++x)
        if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
          props[k++] = z;
    return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
  }
  function comment(value, root, parent, siblings) {
    return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
  }
  function declaration(value, root, parent, length2, siblings) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
  }

  // node_modules/stylis/src/Prefixer.js
  function prefix(value, length2, children) {
    switch (hash(value, length2)) {
      case 5103:
        return WEBKIT + "print-" + value + value;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
        return WEBKIT + value + value;
      case 4855:
        return WEBKIT + value.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + value;
      case 4789:
        return MOZ + value + value;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return WEBKIT + value + MOZ + value + MS + value + value;
      case 5936:
        switch (charat(value, length2 + 11)) {
          case 114:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
          case 108:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
          case 45:
            return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
        }
      case 6828:
      case 4268:
      case 2903:
        return WEBKIT + value + MS + value + value;
      case 6165:
        return WEBKIT + value + MS + "flex-" + value + value;
      case 5187:
        return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
      case 5443:
        return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
      case 4675:
        return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
      case 5548:
        return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
      case 5292:
        return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
      case 6060:
        return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
      case 4554:
        return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
      case 6187:
        return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
      case 5495:
      case 3959:
        return replace(value, /(image-set\([^]*)/, WEBKIT + "$1" + "$`$1");
      case 4968:
        return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /space-between/, "justify") + WEBKIT + value + value;
      case 4200:
        if (!match(value, /flex-|baseline/))
          return MS + "grid-column-align" + substr(value, length2) + value;
        break;
      case 2592:
      case 3360:
        return MS + replace(value, "template-", "") + value;
      case 4384:
      case 3616:
        if (children && children.some(function(element, index) {
          return length2 = index, match(element.props, /grid-\w+-end/);
        })) {
          return ~indexof(value + (children = children[length2].value), "span", 0) ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span", 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
        }
        return MS + replace(value, "-start", "") + value;
      case 4896:
      case 4128:
        return children && children.some(function(element) {
          return match(element.props, /grid-\w+-start/);
        }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (strlen(value) - 1 - length2 > 6)
          switch (charat(value, length2 + 1)) {
            case 109:
              if (charat(value, length2 + 4) !== 45)
                break;
            case 102:
              return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3" + "$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
            case 115:
              return ~indexof(value, "stretch", 0) ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
          }
        break;
      case 5152:
      case 5920:
        return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e, f) {
          return MS + a + ":" + b + f + (c ? MS + a + "-span:" + (d ? e : +e - +b) + f : "") + value;
        });
      case 4949:
        if (charat(value, length2 + 6) === 121)
          return replace(value, ":", ":" + WEBKIT) + value;
        break;
      case 6444:
        switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
          case 120:
            return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3" + "$1" + WEBKIT + "$2$3" + "$1" + MS + "$2box$3") + value;
          case 100:
            return replace(value, ":", ":" + MS) + value;
        }
        break;
      case 5719:
      case 2647:
      case 2135:
      case 3927:
      case 2391:
        return replace(value, "scroll-", "scroll-snap-") + value;
    }
    return value;
  }

  // node_modules/stylis/src/Serializer.js
  function serialize(children, callback) {
    var output = "";
    for (var i = 0;i < children.length; i++)
      output += callback(children[i], i, children, callback) || "";
    return output;
  }
  function stringify(element, index, children, callback) {
    switch (element.type) {
      case LAYER:
        if (element.children.length)
          break;
      case IMPORT:
      case NAMESPACE:
      case DECLARATION:
        return element.return = element.return || element.value;
      case COMMENT:
        return "";
      case KEYFRAMES:
        return element.return = element.value + "{" + serialize(element.children, callback) + "}";
      case RULESET:
        if (!strlen(element.value = element.props.join(",")))
          return "";
    }
    return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
  }

  // node_modules/stylis/src/Middleware.js
  function middleware(collection) {
    var length2 = sizeof(collection);
    return function(element, index, children, callback) {
      var output = "";
      for (var i = 0;i < length2; i++)
        output += collection[i](element, index, children, callback) || "";
      return output;
    };
  }
  function rulesheet(callback) {
    return function(element) {
      if (!element.root) {
        if (element = element.return)
          callback(element);
      }
    };
  }
  function prefixer(element, index, children, callback) {
    if (element.length > -1) {
      if (!element.return)
        switch (element.type) {
          case DECLARATION:
            element.return = prefix(element.value, element.length, children);
            return;
          case KEYFRAMES:
            return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
          case RULESET:
            if (element.length)
              return combine(children = element.props, function(value) {
                switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                    lift(copy(element, { props: [value] }));
                    assign(element, { props: filter(children, callback) });
                    break;
                  case "::placeholder":
                    lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                    lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                    lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                    lift(copy(element, { props: [value] }));
                    assign(element, { props: filter(children, callback) });
                    break;
                }
                return "";
              });
        }
    }
  }

  // node_modules/styled-components/dist/styled-components.browser.esm.js
  var r;
  var i;
  var c = typeof process != "undefined" && process.env !== undefined && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled";
  var a = "active";
  var l = "data-styled-version";
  var u = "6.5.3";
  var h = `/*!sc*/
`;
  var d = typeof window != "undefined" && typeof document != "undefined";
  function p(e) {
    if (typeof process != "undefined" && process.env !== undefined) {
      const t2 = process.env[e];
      if (t2 !== undefined && t2 !== "")
        return t2 !== "false";
    }
  }
  var f = Boolean(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : (i = (r = p("REACT_APP_SC_DISABLE_SPEEDY")) !== null && r !== undefined ? r : p("SC_DISABLE_SPEEDY")) !== null && i !== undefined ? i : typeof process != "undefined" && process.env !== undefined && false);
  var m = "sc-keyframes-";
  function v(e, ...t2) {
    return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t2.length > 0 ? ` Args: ${t2.join(", ")}` : ""}`);
  }
  var S = 1 << 30;
  var b = new Map;
  var w = new Map;
  var N = 1;
  var C = (e) => {
    if (b.has(e))
      return b.get(e);
    for (;w.has(N); )
      N++;
    const t2 = N++;
    if (false)
      ;
    return b.set(e, t2), w.set(t2, e), t2;
  };
  var O = (e) => w.get(e);
  var E = (e, t2) => {
    N = t2 + 1, b.set(e, t2), w.set(t2, e);
  };
  var P = new Set;
  var I = Object.freeze([]);
  var $ = Object.freeze({});
  function R(e, t2, n2 = $) {
    return e.theme !== n2.theme && e.theme || t2 || n2.theme;
  }
  var j = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
  var x = /(^-|-$)/g;
  function T(e) {
    return e.replace(j, "-").replace(x, "");
  }
  var k = /(a)(d)/gi;
  var D = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97));
  function V(e) {
    let t2, n2 = "";
    for (t2 = Math.abs(e);t2 > 52; t2 = t2 / 52 | 0)
      n2 = D(t2 % 52) + n2;
    return (D(t2 % 52) + n2).replace(k, "$1-$2");
  }
  var M = 5381;
  var G = (e, t2) => {
    let n2 = t2.length;
    for (;n2; )
      e = 33 * e ^ t2.charCodeAt(--n2);
    return e;
  };
  var F = (e) => G(M, e);
  function z(e) {
    return V(F(e) >>> 0);
  }
  function W(e) {
    return e.displayName || e.name || "Component";
  }
  function L(e) {
    return typeof e == "string" && true;
  }
  function B(e) {
    return L(e) ? `styled.${e}` : `Styled(${W(e)})`;
  }
  var q = Symbol.for("react.memo");
  var H = Symbol.for("react.forward_ref");
  var Y = { contextType: true, defaultProps: true, displayName: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, propTypes: true, type: true };
  var U = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true };
  var J = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true };
  var X = { [H]: { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, [q]: J };
  function K(e) {
    return (("type" in (t2 = e)) && t2.type.$$typeof) === q ? J : ("$$typeof" in e) ? X[e.$$typeof] : Y;
    var t2;
  }
  var Q = Object.defineProperty;
  var Z = Object.getOwnPropertyNames;
  var ee = Object.getOwnPropertySymbols;
  var te = Object.getOwnPropertyDescriptor;
  var ne = Object.getPrototypeOf;
  var oe = Object.prototype;
  function se(e, t2, n2) {
    if (typeof t2 != "string") {
      const o = ne(t2);
      o && o !== oe && se(e, o, n2);
      const s = Z(t2).concat(ee(t2)), r2 = K(e), i2 = K(t2);
      for (let o2 = 0;o2 < s.length; ++o2) {
        const c2 = s[o2];
        if (!((c2 in U) || n2 && n2[c2] || i2 && (c2 in i2) || r2 && (c2 in r2))) {
          const n3 = te(t2, c2);
          try {
            Q(e, c2, n3);
          } catch (e2) {}
        }
      }
    }
    return e;
  }
  function re(e) {
    return typeof e == "function";
  }
  var ie = Symbol.for("react.forward_ref");
  function ce(e) {
    return e != null && (typeof e == "object" || typeof e == "function") && e.$$typeof === ie && "styledComponentId" in e;
  }
  function ae(e, t2) {
    return e && t2 ? e + " " + t2 : e || t2 || "";
  }
  function le(e, t2) {
    return e.join(t2 || "");
  }
  function ue(e) {
    return e !== null && typeof e == "object" && e.constructor.name === Object.name && !(("props" in e) && e.$$typeof);
  }
  function he(e, t2, n2 = false) {
    if (!n2 && !ue(e) && !Array.isArray(e))
      return t2;
    if (Array.isArray(t2))
      for (let n3 = 0;n3 < t2.length; n3++)
        e[n3] = he(e[n3], t2[n3]);
    else if (ue(t2))
      for (const n3 in t2)
        e[n3] = he(e[n3], t2[n3]);
    return e;
  }
  function de(e, t2) {
    Object.defineProperty(e, "toString", { value: t2 });
  }
  var pe = class {
    constructor(e) {
      this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e, this._cGroup = 0, this._cIndex = 0;
    }
    indexOfGroup(e) {
      if (e === this._cGroup)
        return this._cIndex;
      let t2 = this._cIndex;
      if (e > this._cGroup)
        for (let n2 = this._cGroup;n2 < e; n2++)
          t2 += this.groupSizes[n2];
      else
        for (let n2 = this._cGroup - 1;n2 >= e; n2--)
          t2 -= this.groupSizes[n2];
      return this._cGroup = e, this._cIndex = t2, t2;
    }
    insertRules(e, t2) {
      if (e >= this.groupSizes.length) {
        const t3 = this.groupSizes, n3 = t3.length;
        let o2 = n3;
        for (;e >= o2; )
          if (o2 <<= 1, o2 < 0)
            throw v(16, `${e}`);
        this.groupSizes = new Uint32Array(o2), this.groupSizes.set(t3), this.length = o2;
        for (let e2 = n3;e2 < o2; e2++)
          this.groupSizes[e2] = 0;
      }
      let n2 = this.indexOfGroup(e + 1), o = 0;
      for (let s = 0, r2 = t2.length;s < r2; s++)
        this.tag.insertRule(n2, t2[s]) && (this.groupSizes[e]++, n2++, o++);
      o > 0 && this._cGroup > e && (this._cIndex += o);
    }
    clearGroup(e) {
      if (e < this.length) {
        const t2 = this.groupSizes[e], n2 = this.indexOfGroup(e), o = n2 + t2;
        this.groupSizes[e] = 0;
        for (let e2 = n2;e2 < o; e2++)
          this.tag.deleteRule(n2);
        t2 > 0 && this._cGroup > e && (this._cIndex -= t2);
      }
    }
    getGroup(e) {
      let t2 = "";
      if (e >= this.length || this.groupSizes[e] === 0)
        return t2;
      const n2 = this.groupSizes[e], o = this.indexOfGroup(e), s = o + n2;
      for (let e2 = o;e2 < s; e2++)
        t2 += this.tag.getRule(e2) + h;
      return t2;
    }
  };
  var fe = `style[${c}][${l}="${u}"]`;
  var me = new RegExp(`^${c}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`);
  var ye = (e) => typeof ShadowRoot != "undefined" && e instanceof ShadowRoot || ("host" in e) && e.nodeType === 11;
  var ge = (e) => {
    if (!e)
      return document;
    if (ye(e))
      return e;
    if ("getRootNode" in e) {
      const t2 = e.getRootNode();
      if (ye(t2))
        return t2;
    }
    return document;
  };
  var ve = (e, t2, n2) => {
    const o = n2.split(",");
    let s;
    for (let n3 = 0, r2 = o.length;n3 < r2; n3++)
      (s = o[n3]) && e.registerName(t2, s);
  };
  var Se = (e, t2) => {
    var n2;
    const o = ((n2 = t2.textContent) !== null && n2 !== undefined ? n2 : "").split(h), s = [];
    for (let t3 = 0, n3 = o.length;t3 < n3; t3++) {
      const n4 = o[t3].trim();
      if (!n4)
        continue;
      const r2 = n4.match(me);
      if (r2) {
        const t4 = 0 | parseInt(r2[1], 10), n5 = r2[2];
        t4 !== 0 && (E(n5, t4), ve(e, n5, r2[3]), e.getTag().insertRules(t4, s)), s.length = 0;
      } else
        s.push(n4);
    }
  };
  var be = (e) => {
    const t2 = ge(e.options.target).querySelectorAll(fe);
    for (let n2 = 0, o = t2.length;n2 < o; n2++) {
      const o2 = t2[n2];
      o2 && o2.getAttribute(c) !== a && (Se(e, o2), o2.parentNode && o2.parentNode.removeChild(o2));
    }
  };
  var we = false;
  function Ne() {
    if (we !== false)
      return we;
    if (typeof document != "undefined") {
      const e = document.head.querySelector('meta[property="csp-nonce"]');
      if (e)
        return we = e.nonce || e.getAttribute("content") || undefined;
      const t2 = document.head.querySelector('meta[name="sc-nonce"]');
      if (t2)
        return we = t2.getAttribute("content") || undefined;
    }
    return we = typeof __webpack_nonce__ != "undefined" ? __webpack_nonce__ : undefined;
  }
  var Ce = (e, t2) => {
    const n2 = document.head, o = e || n2, s = document.createElement("style"), r2 = ((e2) => {
      const t3 = Array.from(e2.querySelectorAll(`style[${c}]`));
      return t3[t3.length - 1];
    })(o), i2 = r2 !== undefined ? r2.nextSibling : null;
    s.setAttribute(c, a), s.setAttribute(l, u);
    const h2 = t2 || Ne();
    return h2 && s.setAttribute("nonce", h2), o.insertBefore(s, i2), s;
  };
  var Oe = class {
    constructor(e, t2) {
      this.element = Ce(e, t2), this.element.appendChild(document.createTextNode("")), this.sheet = ((e2) => {
        var t3;
        if (e2.sheet)
          return e2.sheet;
        const n2 = (t3 = e2.getRootNode().styleSheets) !== null && t3 !== undefined ? t3 : document.styleSheets;
        for (let t4 = 0, o = n2.length;t4 < o; t4++) {
          const o2 = n2[t4];
          if (o2.ownerNode === e2)
            return o2;
        }
        throw v(17);
      })(this.element), this.length = 0;
    }
    insertRule(e, t2) {
      try {
        return this.sheet.insertRule(t2, e), this.length++, true;
      } catch (e2) {
        return false;
      }
    }
    deleteRule(e) {
      this.sheet.deleteRule(e), this.length--;
    }
    getRule(e) {
      const t2 = this.sheet.cssRules[e];
      return t2 && t2.cssText ? t2.cssText : "";
    }
  };
  var Ee = class {
    constructor(e, t2) {
      this.element = Ce(e, t2), this.nodes = this.element.childNodes, this.length = 0;
    }
    insertRule(e, t2) {
      if (e <= this.length && e >= 0) {
        const n2 = document.createTextNode(t2);
        return this.element.insertBefore(n2, this.nodes[e] || null), this.length++, true;
      }
      return false;
    }
    deleteRule(e) {
      this.element.removeChild(this.nodes[e]), this.length--;
    }
    getRule(e) {
      return e < this.length ? this.nodes[e].textContent : "";
    }
  };
  var Ae = d;
  var Pe = { isServer: !d, useCSSOMInjection: !f };

  class _e {
    static registerId(e) {
      return C(e);
    }
    constructor(e = $, t2 = {}, n2) {
      this.options = Object.assign(Object.assign({}, Pe), e), this.gs = t2, this.keyframeIds = new Set, this.names = new Map(n2), this.server = !!e.isServer, !this.server && d && Ae && (Ae = false, be(this)), de(this, () => ((e2) => {
        const t3 = e2.getTag(), { length: n3 } = t3;
        let o = "";
        for (let s = 0;s < n3; s++) {
          const n4 = O(s);
          if (n4 === undefined)
            continue;
          const r2 = e2.names.get(n4);
          if (r2 === undefined || !r2.size)
            continue;
          const i2 = t3.getGroup(s);
          if (i2.length === 0)
            continue;
          const a2 = c + ".g" + s + '[id="' + n4 + '"]';
          let l2 = "";
          for (const e3 of r2)
            e3.length > 0 && (l2 += e3 + ",");
          o += i2 + a2 + '{content:"' + l2 + '"}' + h;
        }
        return o;
      })(this));
    }
    rehydrate() {
      !this.server && d && be(this);
    }
    reconstructWithOptions(e, t2 = true) {
      const n2 = new _e(Object.assign(Object.assign({}, this.options), e), this.gs, t2 && this.names || undefined);
      return n2.keyframeIds = new Set(this.keyframeIds), !this.server && d && e.target !== this.options.target && ge(this.options.target) !== ge(e.target) && be(n2), n2;
    }
    allocateGSInstance(e) {
      return this.gs[e] = (this.gs[e] || 0) + 1;
    }
    getTag() {
      return this.tag || (this.tag = (e = (({ useCSSOMInjection: e2, target: t2, nonce: n2 }) => e2 ? new Oe(t2, n2) : new Ee(t2, n2))(this.options), new pe(e)));
      var e;
    }
    hasNameForId(e, t2) {
      var n2, o;
      return (o = (n2 = this.names.get(e)) === null || n2 === undefined ? undefined : n2.has(t2)) !== null && o !== undefined && o;
    }
    registerName(e, t2) {
      C(e), e.startsWith(m) && this.keyframeIds.add(e);
      const n2 = this.names.get(e);
      n2 ? n2.add(t2) : this.names.set(e, new Set([t2]));
    }
    insertRules(e, t2, n2) {
      this.registerName(e, t2), this.getTag().insertRules(C(e), n2);
    }
    clearNames(e) {
      this.names.has(e) && this.names.get(e).clear();
    }
    clearRules(e) {
      this.getTag().clearGroup(C(e)), this.clearNames(e);
    }
    clearTag() {
      this.tag = undefined;
    }
  }
  var Ie = new WeakSet;
  var $e = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexShrink: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, scale: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
  function Re(e, t2) {
    return t2 == null || typeof t2 == "boolean" || t2 === "" ? "" : typeof t2 != "number" || t2 === 0 || (e in $e) || e.startsWith("--") ? String(t2).trim() : t2 + "px";
  }
  var je = 47;
  function xe(e) {
    if (e.charCodeAt(0) === 45 && e.charCodeAt(1) === 45)
      return e;
    let t2 = "";
    for (let n2 = 0;n2 < e.length; n2++) {
      const o = e.charCodeAt(n2);
      t2 += o >= 65 && o <= 90 ? "-" + String.fromCharCode(o + 32) : e[n2];
    }
    return t2.startsWith("ms-") ? "-" + t2 : t2;
  }
  var Te = Symbol.for("sc-keyframes");
  function ke(e) {
    return typeof e == "object" && e !== null && Te in e;
  }
  function De(e) {
    return re(e) && !(e.prototype && e.prototype.isReactComponent);
  }
  var Ve = (e) => e == null || e === false || e === "";
  var Me = Symbol.for("react.client.reference");
  function Ge(e) {
    return e.$$typeof === Me;
  }
  function ze(e, t2) {
    for (const n2 in e) {
      const o = e[n2];
      e.hasOwnProperty(n2) && !Ve(o) && (Array.isArray(o) && Ie.has(o) || re(o) ? t2.push(xe(n2) + ":", o, ";") : ue(o) ? (t2.push(n2 + " {"), ze(o, t2), t2.push("}")) : t2.push(xe(n2) + ": " + Re(n2, o) + ";"));
    }
  }
  function We(e, t2, n2, o, s = []) {
    if (Ve(e))
      return s;
    const r2 = typeof e;
    if (r2 === "string")
      return s.push(e), s;
    if (r2 === "function") {
      if (Ge(e))
        return false, s;
      if (De(e) && t2) {
        const r3 = e(t2);
        return true, We(r3, t2, n2, o, s);
      }
      return s.push(e), s;
    }
    if (Array.isArray(e)) {
      for (let r3 = 0;r3 < e.length; r3++)
        We(e[r3], t2, n2, o, s);
      return s;
    }
    return ce(e) ? (s.push(`.${e.styledComponentId}`), s) : ke(e) ? (n2 ? (e.inject(n2, o), s.push(e.getName(o))) : s.push(e), s) : Ge(e) ? (false, s) : ue(e) ? e.toString !== Object.prototype.toString ? (s.push(e.toString()), s) : (ze(e, s), s) : (s.push(e.toString()), s);
  }
  var Le = F(u);

  class Be {
    constructor(e, t2, n2) {
      this.rules = e, this.componentId = t2, this.baseHash = G(Le, t2), this.baseStyle = n2, _e.registerId(t2);
    }
    generateAndInjectStyles(e, t2, n2) {
      let o = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, t2, n2) : "";
      {
        let s = "";
        for (let o2 = 0;o2 < this.rules.length; o2++) {
          const r2 = this.rules[o2];
          if (typeof r2 == "string")
            s += r2;
          else if (r2)
            if (De(r2)) {
              const o3 = r2(e);
              typeof o3 == "string" ? s += o3 : o3 != null && o3 !== false && (s += le(We(o3, e, t2, n2)));
            } else
              s += le(We(r2, e, t2, n2));
        }
        if (s) {
          this.dynamicNameCache || (this.dynamicNameCache = new Map);
          const e2 = n2.hash ? n2.hash + s : s;
          let r2 = this.dynamicNameCache.get(e2);
          if (!r2) {
            if (r2 = V(G(G(this.baseHash, n2.hash), s) >>> 0), this.dynamicNameCache.size >= 200) {
              const e3 = this.dynamicNameCache.keys().next().value;
              e3 !== undefined && this.dynamicNameCache.delete(e3);
            }
            this.dynamicNameCache.set(e2, r2);
          }
          if (!t2.hasNameForId(this.componentId, r2)) {
            const e3 = n2(s, "." + r2, undefined, this.componentId);
            t2.insertRules(this.componentId, r2, e3);
          }
          o = ae(o, r2);
        }
      }
      return o;
    }
  }
  var qe = /&/g;
  function He(e, t2) {
    let n2 = 0;
    for (;--t2 >= 0 && e.charCodeAt(t2) === 92; )
      n2++;
    return !(1 & ~n2);
  }
  function Ye(e) {
    const t2 = e.length;
    let n2 = "", o = 0, s = 0, r2 = 0, i2 = false, c2 = false;
    for (let a2 = 0;a2 < t2; a2++) {
      const l2 = e.charCodeAt(a2);
      if (r2 !== 0 || i2 || l2 !== je || e.charCodeAt(a2 + 1) !== 42)
        if (i2)
          l2 === 42 && e.charCodeAt(a2 + 1) === je && (i2 = false, a2++);
        else if (l2 !== 34 && l2 !== 39 || He(e, a2)) {
          if (r2 === 0)
            if (l2 === 123)
              s++;
            else if (l2 === 125) {
              if (s--, s < 0) {
                c2 = true;
                let n3 = a2 + 1;
                for (;n3 < t2; ) {
                  const t3 = e.charCodeAt(n3);
                  if (t3 === 59 || t3 === 10)
                    break;
                  n3++;
                }
                n3 < t2 && e.charCodeAt(n3) === 59 && n3++, s = 0, a2 = n3 - 1, o = n3;
                continue;
              }
              s === 0 && (n2 += e.substring(o, a2 + 1), o = a2 + 1);
            } else
              l2 === 59 && s === 0 && (n2 += e.substring(o, a2 + 1), o = a2 + 1);
        } else
          r2 === 0 ? r2 = l2 : r2 === l2 && (r2 = 0);
      else
        i2 = true, a2++;
    }
    return c2 || s !== 0 || r2 !== 0 ? (o < t2 && s === 0 && r2 === 0 && (n2 += e.substring(o)), n2) : e;
  }
  function Ue(e, t2) {
    const n2 = t2 + " ", o = "," + n2;
    for (let s = 0;s < e.length; s++) {
      const r2 = e[s];
      if (r2.type === "rule") {
        r2.value = (n2 + r2.value).replaceAll(",", o);
        const e2 = r2.props, t3 = [];
        for (let o2 = 0;o2 < e2.length; o2++)
          t3[o2] = n2 + e2[o2];
        r2.props = t3;
      }
      Array.isArray(r2.children) && r2.type !== "@keyframes" && Ue(r2.children, t2);
    }
    return e;
  }
  function Je({ options: e = $, plugins: t2 = I } = $) {
    let n2, s, r2;
    const i2 = (e2, t3, o) => o.startsWith(s) && o.endsWith(s) && o.replaceAll(s, "").length > 0 ? `.${n2}` : e2, c2 = t2.slice();
    c2.push((e2) => {
      e2.type === RULESET && e2.value.includes("&") && (r2 || (r2 = new RegExp(`\\${s}\\b`, "g")), e2.props[0] = e2.props[0].replace(qe, s).replace(r2, i2));
    }), e.prefix && c2.push(prefixer), c2.push(stringify);
    let a2 = [];
    const l2 = middleware(c2.concat(rulesheet((e2) => a2.push(e2)))), u2 = (t3, i3 = "", c3 = "", u3 = "&") => {
      n2 = u3, s = i3, r2 = undefined;
      const h3 = function(e2) {
        const t4 = e2.indexOf("//") !== -1, n3 = e2.indexOf("}") !== -1;
        if (!t4 && !n3)
          return e2;
        if (!t4)
          return Ye(e2);
        const o = e2.length;
        let s2 = "", r3 = 0, i4 = 0, c4 = 0, a3 = 0, l3 = 0, u4 = false;
        for (;i4 < o; ) {
          const t5 = e2.charCodeAt(i4);
          if (t5 !== 34 && t5 !== 39 || He(e2, i4))
            if (c4 === 0)
              if (t5 === je && i4 + 1 < o && e2.charCodeAt(i4 + 1) === 42) {
                for (i4 += 2;i4 + 1 < o && (e2.charCodeAt(i4) !== 42 || e2.charCodeAt(i4 + 1) !== je); )
                  i4++;
                i4 += 2;
              } else if (t5 !== 40)
                if (t5 !== 41)
                  if (a3 > 0)
                    i4++;
                  else if (t5 === 42 && i4 + 1 < o && e2.charCodeAt(i4 + 1) === je)
                    s2 += e2.substring(r3, i4), i4 += 2, r3 = i4, u4 = true;
                  else if (t5 === je && i4 + 1 < o && e2.charCodeAt(i4 + 1) === je) {
                    for (s2 += e2.substring(r3, i4);i4 < o && e2.charCodeAt(i4) !== 10; )
                      i4++;
                    r3 = i4, u4 = true;
                  } else
                    t5 === 123 ? l3++ : t5 === 125 && l3--, i4++;
                else
                  a3 > 0 && a3--, i4++;
              else
                a3++, i4++;
            else
              i4++;
          else
            c4 === 0 ? c4 = t5 : c4 === t5 && (c4 = 0), i4++;
        }
        return u4 ? (r3 < o && (s2 += e2.substring(r3)), l3 === 0 ? s2 : Ye(s2)) : l3 === 0 ? e2 : Ye(e2);
      }(t3);
      let d3 = compile(c3 || i3 ? c3 + " " + i3 + " { " + h3 + " }" : h3);
      return e.namespace && (d3 = Ue(d3, e.namespace)), a2 = [], serialize(d3, l2), a2;
    }, h2 = e;
    let d2 = M;
    for (let e2 = 0;e2 < t2.length; e2++)
      t2[e2].name || v(15), d2 = G(d2, t2[e2].name);
    return (h2 == null ? undefined : h2.namespace) && (d2 = G(d2, h2.namespace)), (h2 == null ? undefined : h2.prefix) && (d2 = G(d2, "p")), u2.hash = d2 !== M ? d2.toString() : "", u2;
  }
  var Xe = new _e;
  var Ke = Je();
  var Qe = import_react.default.createContext({ shouldForwardProp: undefined, styleSheet: Xe, stylis: Ke, stylisPlugins: undefined });
  var Ze = Qe.Consumer;
  function et() {
    return import_react.default.useContext(Qe);
  }
  var nt = import_react.default.createContext(undefined);
  var ot = nt.Consumer;
  var it = Object.prototype.hasOwnProperty;
  var ct = {};
  function at(e, t2) {
    const n2 = typeof e != "string" ? "sc" : T(e);
    ct[n2] = (ct[n2] || 0) + 1;
    const o = n2 + "-" + z(u + n2 + ct[n2]);
    return t2 ? t2 + "-" + o : o;
  }
  function ut(o, s, r2) {
    const i2 = ce(o), c2 = o, a2 = !L(o), { attrs: l2 = I, componentId: u2 = at(s.displayName, s.parentComponentId), displayName: h2 = B(o) } = s, d2 = s.displayName && s.componentId ? T(s.displayName) + "-" + s.componentId : s.componentId || u2, p2 = i2 && c2.attrs ? c2.attrs.concat(l2).filter(Boolean) : l2;
    let { shouldForwardProp: f2 } = s;
    if (i2 && c2.shouldForwardProp) {
      const e = c2.shouldForwardProp;
      if (s.shouldForwardProp) {
        const t2 = s.shouldForwardProp;
        f2 = (n2, o2) => e(n2, o2) && t2(n2, o2);
      } else
        f2 = e;
    }
    const m2 = new Be(r2, d2, i2 ? c2.componentStyle : undefined);
    function y(o2, s2) {
      return function(o3, s3, r3) {
        const { attrs: i3, componentStyle: c3, defaultProps: a3, foldedComponentIds: l3, styledComponentId: u3, target: h3 } = o3, d3 = import_react.default.useContext(nt), p3 = et(), f3 = o3.shouldForwardProp || p3.shouldForwardProp;
        const m3 = R(s3, d3, a3) || $;
        let y2, g2;
        {
          const e = import_react.default.useRef(null), n2 = e.current;
          if (n2 !== null && n2[1] === m3 && n2[2] === p3.styleSheet && n2[3] === p3.stylis && n2[7] === c3 && function(e2, t2, n3) {
            const o4 = e2, s4 = t2;
            let r4 = 0;
            for (const e3 in s4)
              if (it.call(s4, e3) && (r4++, o4[e3] !== s4[e3]))
                return false;
            return r4 === n3;
          }(n2[0], s3, n2[4]))
            y2 = n2[5], g2 = n2[6];
          else {
            y2 = function(e2, t3, n3) {
              const o4 = Object.assign(Object.assign({}, t3), { className: undefined, theme: n3 }), s4 = e2.length > 1;
              for (let n4 = 0;n4 < e2.length; n4++) {
                const r4 = e2[n4], i4 = re(r4) ? r4(s4 ? Object.assign({}, o4) : o4) : r4;
                for (const e3 in i4)
                  e3 === "className" ? o4.className = ae(o4.className, i4[e3]) : e3 === "style" ? o4.style = Object.assign(Object.assign({}, o4.style), i4[e3]) : (e3 in t3) && t3[e3] === undefined || (o4[e3] = i4[e3]);
              }
              return "className" in t3 && typeof t3.className == "string" && (o4.className = ae(o4.className, t3.className)), o4;
            }(i3, s3, m3), g2 = c3.generateAndInjectStyles(y2, p3.styleSheet, p3.stylis);
            let t2 = 0;
            for (const e2 in s3)
              it.call(s3, e2) && t2++;
            e.current = [s3, m3, p3.styleSheet, p3.stylis, t2, y2, g2, c3];
          }
        }
        const v2 = y2.as || h3, S2 = function(t2, n2, o4, s4) {
          const r4 = {};
          for (const i4 in t2)
            t2[i4] === undefined || i4[0] === "$" || i4 === "as" || i4 === "theme" && t2.theme === o4 || (i4 === "forwardedAs" ? r4.as = t2.forwardedAs : s4 && !s4(i4, n2) || (r4[i4] = t2[i4]));
          return r4;
        }(y2, v2, m3, f3);
        let b2 = ae(l3, u3);
        return g2 && (b2 += " " + g2), y2.className && (b2 += " " + y2.className), S2[L(v2) && v2.includes("-") ? "class" : "className"] = b2, r3 && (S2.ref = r3), import_react.createElement(v2, S2);
      }(g, o2, s2);
    }
    y.displayName = h2;
    let g = import_react.default.forwardRef(y);
    return g.attrs = p2, g.componentStyle = m2, g.displayName = h2, g.shouldForwardProp = f2, g.foldedComponentIds = i2 ? ae(c2.foldedComponentIds, c2.styledComponentId) : "", g.styledComponentId = d2, g.target = i2 ? c2.target : o, Object.defineProperty(g, "defaultProps", { get() {
      return this._foldedDefaultProps;
    }, set(e) {
      this._foldedDefaultProps = i2 ? function(e2, ...t2) {
        for (const n2 of t2)
          he(e2, n2, true);
        return e2;
      }({}, c2.defaultProps, e) : e;
    } }), false, de(g, () => `.${g.styledComponentId}`), a2 && se(g, o, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), g;
  }
  var ht = new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "button", "br", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "slot", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use"]);
  function dt(e, t2) {
    const n2 = [e[0]];
    for (let o = 0, s = t2.length;o < s; o += 1)
      n2.push(t2[o], e[o + 1]);
    return n2;
  }
  var pt = (e) => (Ie.add(e), e);
  function ft(e, ...t2) {
    if (re(e) || ue(e))
      return pt(We(dt(I, [e, ...t2])));
    const n2 = e;
    return t2.length === 0 && n2.length === 1 && typeof n2[0] == "string" ? We(n2) : pt(We(dt(n2, t2)));
  }
  function mt(e, t2, n2 = $) {
    if (!t2)
      throw v(1, t2);
    const o = (o2, ...s) => e(t2, n2, ft(o2, ...s));
    return o.attrs = (o2) => mt(e, t2, Object.assign(Object.assign({}, n2), { attrs: Array.prototype.concat(n2.attrs, o2).filter(Boolean) })), o.withConfig = (o2) => mt(e, t2, Object.assign(Object.assign({}, n2), o2)), o;
  }
  var yt = (e) => mt(ut, e);
  var gt = yt;
  ht.forEach((e) => {
    gt[e] = yt(e);
  });
  var Ct;
  Ct = Te;
  var It = `__sc-${c}__`;
  var Rt = `:not(style[${c}])`;
  var jt = `style[${c}]`;

  // src/settings/settings_screen.styled.ts
  var Body = gt.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 50px;
    background-color: #F7F9F9;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
`;
  var Container = gt.div`
    width: 600px;
    padding: 35px 25px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
`;
  var Logo = gt.img`
    width: 80px;
    height: 80px;
    margin-bottom: 25px;
`;
  var SettingsBlock = gt.div`
    width: 100%;
    margin-top: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
`;

  // src/settings/components/checkbox.tsx
  var React = __toESM(require_react(), 1);
  var icons = {
    checked: chrome.runtime.getURL("assets/checked.svg"),
    uncheked: chrome.runtime.getURL("assets/unchecked.svg")
  };
  var Checkbox = ({ value, label, onChange }) => {
    const src = value && icons.checked || icons.uncheked;
    return /* @__PURE__ */ React.createElement(Container2, {
      onClick: () => onChange(!value)
    }, /* @__PURE__ */ React.createElement("div", {
      className: "iconContainer"
    }, /* @__PURE__ */ React.createElement(Icon, {
      src
    }), /* @__PURE__ */ React.createElement(CheckboxSquare, {
      type: "checkbox",
      name: label,
      checked: value
    })), /* @__PURE__ */ React.createElement(Label, {
      htmlFor: label
    }, label));
  };
  var Container2 = gt.div`
    cursor: pointer;

    .iconContainer {
        /* padding: 10px; */
        border-radius: 3px;
        float:left;
        position: relative;
    }

    &:hover {
        .iconContainer {
            outline: 5px solid rgba(0,0,0,0.07);
        }
    }
`;
  var CheckboxSquare = gt.input`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
`;
  var Icon = gt.img`
    width: 18px;
    height: 18px;
`;
  var Label = gt.label`
    margin-left: 10px;
    font-size: 15px;
    cursor: pointer;
    color: #181C21;
    user-select: none;
`;

  // src/settings/components/selector.tsx
  var React2 = __toESM(require_react(), 1);
  var Selector = ({ value, onChange, options }) => {
    return /* @__PURE__ */ React2.createElement(Container3, null, /* @__PURE__ */ React2.createElement(Select, {
      value,
      onChange: (e) => onChange(e.target.value)
    }, options.map((option) => /* @__PURE__ */ React2.createElement("option", {
      key: option.value,
      value: option.value
    }, option.label))));
  };
  var Container3 = gt.div`
    border: 1px solid #ccc;
    border-radius: 3px;
    padding-right: 10px;
    width: 100%;
`;
  var Select = gt.select`
    border-radius: 3px;
    border-width: 0;
    padding: 7px 10px;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    color: #333;
    cursor: pointer;
    outline: none;
    width: 100%;
    box-sizing: border-box;
`;

  // src/settings/components/text.tsx
  var H1 = gt.h1`
    font-size: 25px;
    font-weight: bold;
    color: #181C21;
    margin: 0;
`;
  var H2 = gt.h2`
    font-size: 18px;
    font-weight: 600;
    color: #181C21;
    margin: 0;
`;
  var Subtitle = gt.span`
    font-size: 15px;
    color: #566370;

    a {
        color: #566370;
    }
`;

  // src/settings/components/space.tsx
  var React3 = __toESM(require_react(), 1);
  var Space = ({ height }) => /* @__PURE__ */ React3.createElement("div", {
    style: { height }
  });

  // src/shared/locales.ts
  var locales = {
    "af-ZA": [
      "Afrikaans",
      "Afrikaans"
    ],
    ar: [
      "العربية",
      "Arabic"
    ],
    "bg-BG": [
      "Български",
      "Bulgarian"
    ],
    "ca-AD": [
      "Català",
      "Catalan"
    ],
    "cs-CZ": [
      "Čeština",
      "Czech"
    ],
    "cy-GB": [
      "Cymraeg",
      "Welsh"
    ],
    "da-DK": [
      "Dansk",
      "Danish"
    ],
    "de-AT": [
      "Deutsch (Österreich)",
      "German (Austria)"
    ],
    "de-CH": [
      "Deutsch (Schweiz)",
      "German (Switzerland)"
    ],
    "de-DE": [
      "Deutsch (Deutschland)",
      "German (Germany)"
    ],
    "el-GR": [
      "Ελληνικά",
      "Greek"
    ],
    "en-GB": [
      "English (UK)",
      "English (UK)"
    ],
    "en-US": [
      "English (US)",
      "English (US)"
    ],
    "es-CL": [
      "Español (Chile)",
      "Spanish (Chile)"
    ],
    "es-ES": [
      "Español (España)",
      "Spanish (Spain)"
    ],
    "es-MX": [
      "Español (México)",
      "Spanish (Mexico)"
    ],
    "et-EE": [
      "Eesti keel",
      "Estonian"
    ],
    eu: [
      "Euskara",
      "Basque"
    ],
    "fa-IR": [
      "فارسی",
      "Persian"
    ],
    "fi-FI": [
      "Suomi",
      "Finnish"
    ],
    "fr-CA": [
      "Français (Canada)",
      "French (Canada)"
    ],
    "fr-FR": [
      "Français (France)",
      "French (France)"
    ],
    "he-IL": [
      "עברית",
      "Hebrew"
    ],
    "hi-IN": [
      "हिंदी",
      "Hindi"
    ],
    "hr-HR": [
      "Hrvatski",
      "Croatian"
    ],
    "hu-HU": [
      "Magyar",
      "Hungarian"
    ],
    "id-ID": [
      "Bahasa Indonesia",
      "Indonesian"
    ],
    "is-IS": [
      "Íslenska",
      "Icelandic"
    ],
    "it-IT": [
      "Italiano",
      "Italian"
    ],
    "ja-JP": [
      "日本語",
      "Japanese"
    ],
    "km-KH": [
      "ភាសាខ្មែរ",
      "Khmer"
    ],
    "ko-KR": [
      "한국어",
      "Korean"
    ],
    la: [
      "Latina",
      "Latin"
    ],
    "lt-LT": [
      "Lietuvių kalba",
      "Lithuanian"
    ],
    "lv-LV": [
      "Latviešu",
      "Latvian"
    ],
    "mn-MN": [
      "Монгол",
      "Mongolian"
    ],
    "nb-NO": [
      "Norsk bokmål",
      "Norwegian (Bokmål)"
    ],
    "nl-NL": [
      "Nederlands",
      "Dutch"
    ],
    "nn-NO": [
      "Norsk nynorsk",
      "Norwegian (Nynorsk)"
    ],
    "pl-PL": [
      "Polski",
      "Polish"
    ],
    "pt-BR": [
      "Português (Brasil)",
      "Portuguese (Brazil)"
    ],
    "pt-PT": [
      "Português (Portugal)",
      "Portuguese (Portugal)"
    ],
    "ro-RO": [
      "Română",
      "Romanian"
    ],
    "ru-RU": [
      "Русский",
      "Russian"
    ],
    "sk-SK": [
      "Slovenčina",
      "Slovak"
    ],
    "sl-SI": [
      "Slovenščina",
      "Slovenian"
    ],
    "sr-RS": [
      "Српски / Srpski",
      "Serbian"
    ],
    "sv-SE": [
      "Svenska",
      "Swedish"
    ],
    "th-TH": [
      "ไทย",
      "Thai"
    ],
    "tr-TR": [
      "Türkçe",
      "Turkish"
    ],
    "uk-UA": [
      "Українська",
      "Ukrainian"
    ],
    "ur-PK": [
      "اردو",
      "Urdu"
    ],
    "vi-VN": [
      "Tiếng Việt",
      "Vietnamese"
    ],
    "zh-CN": [
      "中文 (中国大陆)",
      "Chinese (PRC)"
    ],
    "zh-TW": [
      "中文 (台灣)",
      "Chinese (Taiwan)"
    ]
  };
  var defaultLocale = "en-US";

  // src/shared/legacy_storage_keys.ts
  var LEGACY_OPENAI_TOKEN_KEY = "openAIToken";

  // src/shared/storage_keys.ts
  var STORAGE_KEYS = {
    language: "language",
    isAddSignature: "isAddSignature",
    isAddTopicForReplies: "isAddTopicForReplies",
    lastTopic: "lastTopic"
  };

  // src/shared/helper_protocol.ts
  var HELPER_PROTOCOL_VERSION = 1;
  var HELPER_GENERATE_OP = "tweet.generate";
  var HELPER_BASE_URL = "http://127.0.0.1:31415";

  // src/settings/settings_screen.tsx
  var sendHelperHealthCheck = () => {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (status) => {
        if (settled)
          return;
        settled = true;
        clearTimeout(timeout);
        resolve(status);
      };
      const timeout = setTimeout(() => {
        finish({ reachable: false, message: "Helper check timed out. Reload the extension from chrome://extensions and try again." });
      }, 45000);
      chrome.runtime.sendMessage({ type: "helper_health_check" }, (response) => {
        if (chrome.runtime.lastError) {
          finish({ reachable: false, message: `${chrome.runtime.lastError.message ?? "Helper check failed."} Reload the extension from chrome://extensions and try again.` });
          return;
        }
        finish(response ?? { reachable: false, message: "Helper check failed. Reload the extension from chrome://extensions and try again." });
      });
    });
  };
  var SettingsScreen = () => {
    const logoPath = import_react2.useMemo(() => chrome.runtime.getURL("icons/128.png"), []);
    const [helperStatus, setHelperStatus] = import_react2.useState();
    const [isTestingHelper, setTestingHelper] = import_react2.useState(false);
    const [selectedLanguage, setLanguage] = import_react2.useState(defaultLocale);
    const [isAddSignature, setAddSignature] = import_react2.useState(false);
    const [isAddTopicForReplies, setTopicForReplies] = import_react2.useState(false);
    const changeSignature = import_react2.useCallback(async (isNewAddSignature) => {
      await chrome.storage.local.set({ [STORAGE_KEYS.isAddSignature]: isNewAddSignature });
      setAddSignature(isNewAddSignature);
    }, []);
    const changeTopic = import_react2.useCallback(async (isAddTopicForReplies2) => {
      await chrome.storage.local.set({ [STORAGE_KEYS.isAddTopicForReplies]: isAddTopicForReplies2 });
      setTopicForReplies(isAddTopicForReplies2);
    }, []);
    const changeLanguage = import_react2.useCallback(async (language) => {
      await chrome.storage.local.set({ [STORAGE_KEYS.language]: language });
      setLanguage(language);
    }, []);
    const testHelperConnection = import_react2.useCallback(async () => {
      if (isTestingHelper)
        return;
      setTestingHelper(true);
      setHelperStatus({ reachable: false, message: "Testing helper connection..." });
      try {
        const status = await sendHelperHealthCheck();
        setHelperStatus(status);
      } finally {
        setTestingHelper(false);
      }
    }, [isTestingHelper]);
    import_react2.useEffect(() => {
      chrome.storage.local.remove(LEGACY_OPENAI_TOKEN_KEY);
      chrome.storage.local.get([
        STORAGE_KEYS.language,
        STORAGE_KEYS.isAddSignature,
        STORAGE_KEYS.isAddTopicForReplies
      ]).then((state) => {
        if (state.language) {
          setLanguage(state.language);
        }
        if (state.isAddSignature != null) {
          setAddSignature(state.isAddSignature);
        }
        if (state.isAddTopicForReplies != null) {
          setTopicForReplies(state.isAddTopicForReplies);
        }
      });
    }, []);
    const languageOptions = import_react2.useMemo(() => {
      const codes = Object.keys(locales);
      return codes.map((code) => ({
        value: code,
        label: locales[code][0]
      }));
    }, []);
    return /* @__PURE__ */ React4.createElement(Body, null, /* @__PURE__ */ React4.createElement(Logo, {
      src: logoPath
    }), /* @__PURE__ */ React4.createElement(Container, null, /* @__PURE__ */ React4.createElement(H1, null, "TweetGPT Settings"), /* @__PURE__ */ React4.createElement(SettingsBlock, null, /* @__PURE__ */ React4.createElement(H2, null, "Local Helper"), /* @__PURE__ */ React4.createElement(Space, {
      height: 3
    }), /* @__PURE__ */ React4.createElement(Subtitle, null, "TweetGPT talks to a local helper at ", HELPER_BASE_URL, ". The helper owns Codex/ChatGPT subscription auth; nothing needs to be configured here."), /* @__PURE__ */ React4.createElement(Space, {
      height: 10
    }), /* @__PURE__ */ React4.createElement("button", {
      onClick: testHelperConnection,
      disabled: isTestingHelper
    }, isTestingHelper ? "Testing helper connection..." : "Test helper connection"), helperStatus && /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement(Space, {
      height: 10
    }), /* @__PURE__ */ React4.createElement(Subtitle, null, helperStatus.message), helperStatus.authConfigured === false && /* @__PURE__ */ React4.createElement(Subtitle, null, "Codex auth is not configured in the helper. Run bun run --cwd helper auth:login."))), /* @__PURE__ */ React4.createElement(SettingsBlock, null, /* @__PURE__ */ React4.createElement(H2, null, "Local setup"), /* @__PURE__ */ React4.createElement(Space, {
      height: 3
    }), /* @__PURE__ */ React4.createElement(Subtitle, null, "Run these commands from the repository root. Login is only needed once."), /* @__PURE__ */ React4.createElement("pre", null, `bun run --cwd helper auth:login
bun run --cwd helper dev`)), /* @__PURE__ */ React4.createElement(SettingsBlock, null, /* @__PURE__ */ React4.createElement(H2, null, "Text Generation"), /* @__PURE__ */ React4.createElement(Space, {
      height: 10
    }), /* @__PURE__ */ React4.createElement(Checkbox, {
      value: isAddSignature,
      onChange: changeSignature,
      label: "Add TweetGPT signature (less natural)"
    }), /* @__PURE__ */ React4.createElement(Space, {
      height: 10
    }), /* @__PURE__ */ React4.createElement(Checkbox, {
      value: isAddTopicForReplies,
      onChange: changeTopic,
      label: "Ask for tweet topic in replies"
    })), /* @__PURE__ */ React4.createElement(SettingsBlock, null, /* @__PURE__ */ React4.createElement(H2, null, "Language"), /* @__PURE__ */ React4.createElement(Space, {
      height: 10
    }), /* @__PURE__ */ React4.createElement(Selector, {
      value: selectedLanguage,
      onChange: changeLanguage,
      options: languageOptions
    }))));
  };

  // src/settings/settings.tsx
  var root = import_client.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React5.createElement(SettingsScreen, null));
})();
