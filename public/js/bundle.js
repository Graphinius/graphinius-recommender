
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('path'), require('fs'), require('https')) :
    typeof define === 'function' && define.amd ? define(['path', 'fs', 'https'], factory) :
    (global = global || self, factory(global.path, global.fs, global.https));
}(this, function (path, fs, https) { 'use strict';

    path = path && path.hasOwnProperty('default') ? path['default'] : path;
    fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
    https = https && https.hasOwnProperty('default') ? https['default'] : https;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var interfaces = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var DIR;
    (function (DIR) {
        DIR["in"] = "ins";
        DIR["out"] = "outs";
        DIR["und"] = "unds";
    })(DIR = exports.DIR || (exports.DIR = {}));
    var GraphMode;
    (function (GraphMode) {
        GraphMode[GraphMode["INIT"] = 0] = "INIT";
        GraphMode[GraphMode["DIRECTED"] = 1] = "DIRECTED";
        GraphMode[GraphMode["UNDIRECTED"] = 2] = "UNDIRECTED";
        GraphMode[GraphMode["MIXED"] = 3] = "MIXED";
    })(GraphMode = exports.GraphMode || (exports.GraphMode = {}));
    });

    unwrapExports(interfaces);
    var interfaces_1 = interfaces.DIR;
    var interfaces_2 = interfaces.GraphMode;

    var run_config = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var CMD_ENV_LOG = 'G_LOG';
    var GENERIC_TYPES = {
        Node: 'GENERIC',
        Edge: 'GENERIC',
        Graph: 'GENERIC'
    };
    exports.GENERIC_TYPES = GENERIC_TYPES;
    var LOG_LEVELS = {
        debug: 'debug',
        production: 'production'
    };
    exports.LOG_LEVELS = LOG_LEVELS;
    function runLevel() {
        var log_level = LOG_LEVELS.production;
        if (typeof window === 'undefined' && typeof process !== 'undefined' && process.env && process.env[CMD_ENV_LOG]) {
            log_level = process.env[CMD_ENV_LOG];
        }
        return log_level;
    }
    exports.runLevel = runLevel;
    });

    unwrapExports(run_config);
    var run_config_1 = run_config.GENERIC_TYPES;
    var run_config_2 = run_config.LOG_LEVELS;
    var run_config_3 = run_config.runLevel;

    var Logger_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var LogColors;
    (function (LogColors) {
        LogColors[LogColors["FgBlack"] = 30] = "FgBlack";
        LogColors[LogColors["FgRed"] = 31] = "FgRed";
        LogColors[LogColors["FgGreen"] = 32] = "FgGreen";
        LogColors[LogColors["FgYellow"] = 33] = "FgYellow";
        LogColors[LogColors["FgBlue"] = 34] = "FgBlue";
        LogColors[LogColors["FgMagenta"] = 35] = "FgMagenta";
        LogColors[LogColors["FgCyan"] = 36] = "FgCyan";
        LogColors[LogColors["FgWhite"] = 37] = "FgWhite";
        LogColors[LogColors["BgBlack"] = 40] = "BgBlack";
        LogColors[LogColors["BgRed"] = 41] = "BgRed";
        LogColors[LogColors["BgGreen"] = 42] = "BgGreen";
        LogColors[LogColors["BgYellow"] = 43] = "BgYellow";
        LogColors[LogColors["BgBlue"] = 44] = "BgBlue";
        LogColors[LogColors["BgMagenta"] = 45] = "BgMagenta";
        LogColors[LogColors["BgCyan"] = 46] = "BgCyan";
        LogColors[LogColors["BgWhite"] = 47] = "BgWhite";
    })(LogColors = exports.LogColors || (exports.LogColors = {}));
    var DEFAULT_COLOR = 37;
    var Logger = (function () {
        function Logger(config) {
            this.config = config || {
                log_level: run_config.runLevel()
            };
        }
        Logger.prototype.log = function (msg, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                if (color) {
                    console.log.call(console, Logger.colorize(DEFAULT_COLOR, msg, bright));
                }
                else {
                    console.log.call(console, msg);
                }
                return true;
            }
            return false;
        };
        Logger.prototype.error = function (err, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                if (color) {
                    console.error.call(console, Logger.colorize(color, err, bright));
                }
                else {
                    console.error.call(console, err);
                }
                return true;
            }
            return false;
        };
        Logger.prototype.dir = function (obj, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                if (color) {
                    console.dir.call(console, Logger.colorize(DEFAULT_COLOR, obj, bright));
                }
                else {
                    console.dir.call(console, obj);
                }
                return true;
            }
            return false;
        };
        Logger.prototype.info = function (msg, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                if (color) {
                    console.info.call(console, Logger.colorize(DEFAULT_COLOR, msg, bright));
                }
                else {
                    console.info.call(console, msg);
                }
                return true;
            }
            return false;
        };
        Logger.prototype.warn = function (msg, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                if (color) {
                    console.warn.call(console, Logger.colorize(DEFAULT_COLOR, msg, bright));
                }
                else {
                    console.warn.call(console, msg);
                }
                return true;
            }
            return false;
        };
        Logger.prototype.write = function (msg, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                if (color) {
                    process.stdout.write.call(process.stdout, Logger.colorize(DEFAULT_COLOR, msg, bright));
                }
                else {
                    process.stdout.write.call(process.stdout, msg);
                }
                return true;
            }
            return false;
        };
        Logger.colorize = function (color, output, bright) {
            var out_bright = bright ? '\x1b[1m' : null;
            return [out_bright, '\x1b[', color, 'm', output, '\x1b[0m'].join('');
        };
        return Logger;
    }());
    exports.Logger = Logger;
    });

    unwrapExports(Logger_1);
    var Logger_2 = Logger_1.LogColors;
    var Logger_3 = Logger_1.Logger;

    var ComputeGraph_1 = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    var logger = new Logger_1.Logger();
    var DEFAULT_WEIGHT = 1;
    var ComputeGraph = (function () {
        function ComputeGraph(_g, _tf) {
            this._g = _g;
            this._tf = _tf;
        }
        ComputeGraph.prototype.nextArray = function (incoming) {
            if (incoming === void 0) { incoming = false; }
            var next = [], node_keys = Object.keys(this._g.getNodes());
            var adjDict = this.adjListW(incoming, true, 0);
            for (var i = 0; i < this._g.nrNodes(); ++i) {
                next.push([]);
                for (var j = 0; j < this._g.nrNodes(); ++j) {
                    next[i].push([]);
                    next[i][j].push(i === j ? j : isFinite(adjDict[node_keys[i]][node_keys[j]]) ? j : null);
                }
            }
            return next;
        };
        ComputeGraph.prototype.adjMatrix = function () {
            var adjList = [], node_keys = Object.keys(this._g.getNodes());
            var adjDict = this.adjListW();
            for (var i = 0; i < this._g.nrNodes(); ++i) {
                adjList.push([]);
                for (var j = 0; j < this._g.nrNodes(); ++j) {
                    adjList[i].push(i === j ? 0 : isFinite(adjDict[node_keys[i]][node_keys[j]]) ? 1 : 0);
                }
            }
            return adjList;
        };
        ComputeGraph.prototype.adjMatrixW = function (incoming, include_self, self_dist) {
            if (incoming === void 0) { incoming = false; }
            if (include_self === void 0) { include_self = false; }
            if (self_dist === void 0) { self_dist = 0; }
            var adjList = [], node_keys = Object.keys(this._g.getNodes());
            var adjDict = this.adjListW(incoming, include_self, self_dist);
            for (var i = 0; i < this._g.nrNodes(); ++i) {
                adjList.push([]);
                for (var j = 0; j < this._g.nrNodes(); ++j) {
                    adjList[i].push(i === j ? self_dist : isFinite(adjDict[node_keys[i]][node_keys[j]]) ? adjDict[node_keys[i]][node_keys[j]] : Number.POSITIVE_INFINITY);
                }
            }
            return adjList;
        };
        ComputeGraph.prototype.adjListW = function (incoming, include_self, self_dist) {
            if (incoming === void 0) { incoming = false; }
            if (include_self === void 0) { include_self = false; }
            if (self_dist === void 0) { self_dist = 0; }
            var adj_list_dict = {}, nodes = this._g.getNodes(), cur_dist, key, cur_edge_weight;
            for (key in nodes) {
                adj_list_dict[key] = {};
                if (include_self) {
                    adj_list_dict[key][key] = self_dist;
                }
            }
            for (key in nodes) {
                var neighbors = incoming ? nodes[key].reachNodes().concat(nodes[key].prevNodes()) : nodes[key].reachNodes();
                neighbors.forEach(function (ne) {
                    cur_dist = adj_list_dict[key][ne.node.getID()] || Number.POSITIVE_INFINITY;
                    cur_edge_weight = isNaN(ne.edge.getWeight()) ? DEFAULT_WEIGHT : ne.edge.getWeight();
                    if (cur_edge_weight < cur_dist) {
                        adj_list_dict[key][ne.node.getID()] = cur_edge_weight;
                        if (incoming) {
                            adj_list_dict[ne.node.getID()][key] = cur_edge_weight;
                        }
                    }
                    else {
                        adj_list_dict[key][ne.node.getID()] = cur_dist;
                        if (incoming) {
                            adj_list_dict[ne.node.getID()][key] = cur_dist;
                        }
                    }
                });
            }
            return adj_list_dict;
        };
        ComputeGraph.prototype.triadCount = function (directed) {
            if (directed === void 0) { directed = false; }
            var e_1, _a;
            var triangle_count = 0;
            var nodes = Object.values(this._g.getNodes());
            var deg;
            try {
                for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var n = nodes_1_1.value;
                    if (directed) {
                        triangle_count += (n.in_deg - n.self_in_deg) * (n.out_deg - n.self_out_deg);
                    }
                    else {
                        deg = n.deg - n.self_deg;
                        triangle_count += deg * (deg - 1) / 2;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return triangle_count;
        };
        ComputeGraph.prototype.triangleCount = function (directed) {
            if (directed === void 0) { directed = false; }
            return __awaiter(this, void 0, void 0, function () {
                var adj_list, a, aux2, aux3, trace, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._tf || !this._tf.matMul) {
                                throw new Error("Tensorflow & TF matMul function must be present in order to compute transitivity.");
                            }
                            adj_list = this.adjMatrix();
                            a = this._tf.tensor2d(adj_list);
                            return [4, a.matMul(a).array()];
                        case 1:
                            aux2 = _a.sent();
                            return [4, a.matMul(aux2).array()];
                        case 2:
                            aux3 = _a.sent();
                            trace = 0;
                            for (i = 0; i < aux3.length; i++) {
                                trace += aux3[i][i];
                            }
                            return [2, directed ? trace / 3 : trace / 6];
                    }
                });
            });
        };
        ComputeGraph.prototype.transitivity = function (directed) {
            if (directed === void 0) { directed = false; }
            return __awaiter(this, void 0, void 0, function () {
                var triangles, triads;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.triangleCount(directed)];
                        case 1:
                            triangles = _a.sent();
                            triads = this.triadCount(directed);
                            return [2, 3 * triangles / triads];
                    }
                });
            });
        };
        ComputeGraph.prototype.clustCoef = function (directed) {
            if (directed === void 0) { directed = false; }
            return __awaiter(this, void 0, void 0, function () {
                var result, adj_list, a, aux2, aux3, deg, node, cci, keys, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._tf || !this._tf.matMul) {
                                throw new Error("Tensorflow & TF matMul function must be present in order to compute clustering coef.");
                            }
                            result = {};
                            adj_list = this.adjMatrix();
                            a = this._tf.tensor2d(adj_list);
                            return [4, a.matMul(a).array()];
                        case 1:
                            aux2 = _a.sent();
                            return [4, a.matMul(aux2).array()];
                        case 2:
                            aux3 = _a.sent();
                            keys = Object.keys(this._g.getNodes());
                            for (i in aux3[0]) {
                                node = this._g.getNodeById(keys[i]);
                                deg = directed ? node.in_deg + node.out_deg : node.deg;
                                cci = (aux3[i][i] / (deg * (deg - 1))) || 0;
                                result[i] = directed ? 2 * cci : cci;
                            }
                            return [2, result];
                    }
                });
            });
        };
        return ComputeGraph;
    }());
    exports.ComputeGraph = ComputeGraph;
    });

    unwrapExports(ComputeGraph_1);
    var ComputeGraph_2 = ComputeGraph_1.ComputeGraph;

    var StructUtils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof BaseNode_1.BaseNode || obj instanceof BaseEdge_1.BaseEdge) {
            return;
        }
        var cloneObj = obj.constructor ? obj.constructor() : {};
        for (var attribute in obj) {
            if (!obj.hasOwnProperty(attribute)) {
                continue;
            }
            if (typeof obj[attribute] === "object") {
                cloneObj[attribute] = clone(obj[attribute]);
            }
            else {
                cloneObj[attribute] = obj[attribute];
            }
        }
        return cloneObj;
    }
    exports.clone = clone;
    function shuffleArray(arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = itemAtIndex;
        }
        return arr;
    }
    exports.shuffleArray = shuffleArray;
    function mergeArrays(args, cb) {
        if (cb === void 0) { cb = undefined; }
        for (var arg_idx in args) {
            if (!Array.isArray(args[arg_idx])) {
                throw new Error('Will only mergeArrays arrays');
            }
        }
        var seen = {}, result = [], identity;
        for (var i = 0; i < args.length; i++) {
            for (var j = 0; j < args[i].length; j++) {
                identity = typeof cb !== 'undefined' ? cb(args[i][j]) : args[i][j];
                if (seen[identity] !== true) {
                    result.push(args[i][j]);
                    seen[identity] = true;
                }
            }
        }
        return result;
    }
    exports.mergeArrays = mergeArrays;
    function mergeObjects(args) {
        for (var i = 0; i < args.length; i++) {
            if (Object.prototype.toString.call(args[i]) !== '[object Object]') {
                throw new Error('Will only take objects as inputs');
            }
        }
        var result = {};
        for (var i = 0; i < args.length; i++) {
            for (var key in args[i]) {
                if (args[i].hasOwnProperty(key)) {
                    result[key] = args[i][key];
                }
            }
        }
        return result;
    }
    exports.mergeObjects = mergeObjects;
    function findKey(obj, cb) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && cb(obj[key])) {
                return key;
            }
        }
        return undefined;
    }
    exports.findKey = findKey;
    function mergeOrderedArraysNoDups(a, b) {
        var ret = [];
        var idx_a = 0;
        var idx_b = 0;
        if (a[0] != null && b[0] != null) {
            while (true) {
                if (idx_a >= a.length || idx_b >= b.length)
                    break;
                if (a[idx_a] == b[idx_b]) {
                    if (ret[ret.length - 1] != a[idx_a])
                        ret.push(a[idx_a]);
                    idx_a++;
                    idx_b++;
                    continue;
                }
                if (a[idx_a] < b[idx_b]) {
                    ret.push(a[idx_a]);
                    idx_a++;
                    continue;
                }
                if (b[idx_b] < a[idx_a]) {
                    ret.push(b[idx_b]);
                    idx_b++;
                }
            }
        }
        while (idx_a < a.length) {
            if (a[idx_a] != null)
                ret.push(a[idx_a]);
            idx_a++;
        }
        while (idx_b < b.length) {
            if (b[idx_b] != null)
                ret.push(b[idx_b]);
            idx_b++;
        }
        return ret;
    }
    exports.mergeOrderedArraysNoDups = mergeOrderedArraysNoDups;
    });

    unwrapExports(StructUtils);
    var StructUtils_1 = StructUtils.clone;
    var StructUtils_2 = StructUtils.shuffleArray;
    var StructUtils_3 = StructUtils.mergeArrays;
    var StructUtils_4 = StructUtils.mergeObjects;
    var StructUtils_5 = StructUtils.findKey;
    var StructUtils_6 = StructUtils.mergeOrderedArraysNoDups;

    var BaseNode_1 = createCommonjsModule(function (module, exports) {
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    var BaseNode = (function () {
        function BaseNode(_id, config) {
            if (config === void 0) { config = {}; }
            this._id = _id;
            this._in_deg = 0;
            this._out_deg = 0;
            this._deg = 0;
            this._self_in_deg = 0;
            this._self_out_deg = 0;
            this._self_deg = 0;
            this._in_edges = {};
            this._out_edges = {};
            this._und_edges = {};
            this._label = config.label || _id;
            this._features = config.features != null ? StructUtils.clone(config.features) : {};
        }
        BaseNode.isTyped = function (arg) {
            return !!arg.type;
        };
        Object.defineProperty(BaseNode.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "label", {
            get: function () {
                return this._label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "features", {
            get: function () {
                return this._features;
            },
            enumerable: true,
            configurable: true
        });
        BaseNode.prototype.getID = function () {
            return this._id;
        };
        BaseNode.prototype.getLabel = function () {
            return this._label;
        };
        BaseNode.prototype.setLabel = function (label) {
            this._label = label;
        };
        BaseNode.prototype.getFeatures = function () {
            return this._features;
        };
        BaseNode.prototype.getFeature = function (key) {
            return this._features[key];
        };
        BaseNode.prototype.f = function (key) {
            return this.getFeature(key);
        };
        BaseNode.prototype.setFeatures = function (features) {
            this._features = StructUtils.clone(features);
        };
        BaseNode.prototype.setFeature = function (key, value) {
            this._features[key] = value;
        };
        BaseNode.prototype.deleteFeature = function (key) {
            var feat = this._features[key];
            delete this._features[key];
            return feat;
        };
        BaseNode.prototype.clearFeatures = function () {
            this._features = {};
        };
        Object.defineProperty(BaseNode.prototype, "deg", {
            get: function () {
                return this._deg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "in_deg", {
            get: function () {
                return this._in_deg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "out_deg", {
            get: function () {
                return this._out_deg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "self_deg", {
            get: function () {
                return this._self_deg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "self_in_deg", {
            get: function () {
                return this._self_in_deg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "self_out_deg", {
            get: function () {
                return this._self_out_deg;
            },
            enumerable: true,
            configurable: true
        });
        BaseNode.prototype.addEdge = function (edge) {
            var ends = edge.getNodes();
            if (ends.a !== this && ends.b !== this) {
                throw new Error("Cannot add edge that does not connect to this node");
            }
            var id = edge.id;
            if (edge.isDirected()) {
                if (ends.a === this && !this._out_edges[id]) {
                    this._out_edges[id] = edge;
                    this._out_deg += 1;
                    if (ends.b === this && !this._in_edges[id]) {
                        this._in_edges[id] = edge;
                        this._in_deg += 1;
                        this._self_in_deg += 1;
                        this._self_out_deg += 1;
                    }
                }
                else if (!this._in_edges[id]) {
                    this._in_edges[id] = edge;
                    this._in_deg += 1;
                }
            }
            else {
                if (this._und_edges[edge.id]) {
                    throw new Error("Cannot add same undirected edge multiple times.");
                }
                this._und_edges[id] = edge;
                this._deg += 1;
                if (ends.a === ends.b) {
                    this._self_deg += 1;
                }
            }
            return edge;
        };
        BaseNode.prototype.hasEdge = function (edge) {
            return !!this._in_edges[edge.getID()] || !!this._out_edges[edge.getID()] || !!this._und_edges[edge.getID()];
        };
        BaseNode.prototype.hasEdgeID = function (id) {
            return !!this._in_edges[id] || !!this._out_edges[id] || !!this._und_edges[id];
        };
        BaseNode.prototype.getEdge = function (id) {
            var edge = this._in_edges[id] || this._out_edges[id] || this._und_edges[id];
            if (!edge) {
                throw new Error("Cannot retrieve non-existing edge.");
            }
            return edge;
        };
        BaseNode.prototype.inEdges = function () {
            return this._in_edges;
        };
        BaseNode.prototype.outEdges = function () {
            return this._out_edges;
        };
        BaseNode.prototype.undEdges = function () {
            return this._und_edges;
        };
        BaseNode.prototype.dirEdges = function () {
            return StructUtils.mergeObjects([this._in_edges, this._out_edges]);
        };
        BaseNode.prototype.allEdges = function () {
            return StructUtils.mergeObjects([this._in_edges, this._out_edges, this._und_edges]);
        };
        BaseNode.prototype.removeEdge = function (edge) {
            if (!this.hasEdge(edge)) {
                throw new Error("Cannot remove unconnected edge.");
            }
            var id = edge.id;
            var ends = edge.getNodes();
            var e = this._und_edges[id];
            if (e) {
                delete this._und_edges[id];
                this._deg -= 1;
                (ends.a === ends.b) && (this._self_deg -= 1);
            }
            e = this._in_edges[id];
            if (e) {
                delete this._in_edges[id];
                this._in_deg -= 1;
                (ends.a === ends.b) && (this._self_in_deg -= 1);
            }
            e = this._out_edges[id];
            if (e) {
                delete this._out_edges[id];
                this._out_deg -= 1;
                (ends.a === ends.b) && (this._self_out_deg -= 1);
            }
        };
        BaseNode.prototype.removeEdgeByID = function (id) {
            if (!this.hasEdgeID(id)) {
                throw new Error("Cannot remove unconnected edge.");
            }
            this.removeEdge(this.getEdge(id));
        };
        BaseNode.prototype.clearOutEdges = function () {
            var e_1, _a;
            try {
                for (var _b = __values(Object.values(this.outEdges())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    this.removeEdge(e);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        BaseNode.prototype.clearInEdges = function () {
            var e_2, _a;
            try {
                for (var _b = __values(Object.values(this.inEdges())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    this.removeEdge(e);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        BaseNode.prototype.clearUndEdges = function () {
            this._und_edges = {};
            this._deg = 0;
            this._self_deg = 0;
        };
        BaseNode.prototype.clearEdges = function () {
            this.clearUndEdges();
            this._in_edges = {};
            this._out_edges = {};
            this._deg = this._self_deg = this._in_deg = this._self_in_deg = this._out_deg = this._self_out_deg = 0;
        };
        BaseNode.prototype.prevNodes = function () {
            var prevs = [];
            var key, edge;
            for (key in this._in_edges) {
                if (this._in_edges.hasOwnProperty(key)) {
                    edge = this._in_edges[key];
                    prevs.push({
                        node: edge.getNodes().a,
                        edge: edge
                    });
                }
            }
            return prevs;
        };
        BaseNode.prototype.nextNodes = function () {
            var nexts = [];
            var key, edge;
            for (key in this._out_edges) {
                if (this._out_edges.hasOwnProperty(key)) {
                    edge = this._out_edges[key];
                    nexts.push({
                        node: edge.getNodes().b,
                        edge: edge
                    });
                }
            }
            return nexts;
        };
        BaseNode.prototype.connNodes = function () {
            var conns = [];
            var key, edge;
            for (key in this._und_edges) {
                if (this._und_edges.hasOwnProperty(key)) {
                    edge = this._und_edges[key];
                    var nodes = edge.getNodes();
                    if (nodes.a === this) {
                        conns.push({
                            node: edge.getNodes().b,
                            edge: edge
                        });
                    }
                    else {
                        conns.push({
                            node: edge.getNodes().a,
                            edge: edge
                        });
                    }
                }
            }
            return conns;
        };
        BaseNode.prototype.reachNodes = function (identityFunc) {
            var identity = 0;
            return StructUtils.mergeArrays([this.nextNodes(), this.connNodes()], identityFunc || (function (ne) { return identity++; }));
        };
        BaseNode.prototype.allNeighbors = function (identityFunc) {
            var identity = 0;
            return StructUtils.mergeArrays([this.prevNodes(), this.nextNodes(), this.connNodes()], identityFunc || function (ne) { return identity++; });
        };
        BaseNode.prototype.clone = function () {
            var new_node = new BaseNode(this._id);
            new_node._label = this._label;
            new_node.setFeatures(StructUtils.clone(this.getFeatures()));
            return new_node;
        };
        return BaseNode;
    }());
    exports.BaseNode = BaseNode;
    });

    unwrapExports(BaseNode_1);
    var BaseNode_2 = BaseNode_1.BaseNode;

    var BaseEdge_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    var BaseEdge = (function () {
        function BaseEdge(_id, _node_a, _node_b, config) {
            this._id = _id;
            this._node_a = _node_a;
            this._node_b = _node_b;
            if (!(_node_a instanceof BaseNode_1.BaseNode) || !(_node_b instanceof BaseNode_1.BaseNode)) {
                throw new Error("cannot instantiate edge without two valid node objects");
            }
            config = config || {};
            this._directed = config.directed || false;
            this._weighted = config.weighted || false;
            this._weight = this._weighted ? (isNaN(config.weight) ? 1 : config.weight) : undefined;
            this._label = config.label || this._id;
            this._features = config.features != null ? StructUtils.clone(config.features) : {};
        }
        Object.defineProperty(BaseEdge.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseEdge.prototype, "label", {
            get: function () {
                return this._label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseEdge.prototype, "features", {
            get: function () {
                return this._features;
            },
            enumerable: true,
            configurable: true
        });
        BaseEdge.prototype.getID = function () {
            return this._id;
        };
        BaseEdge.prototype.getLabel = function () {
            return this._label;
        };
        BaseEdge.prototype.setLabel = function (label) {
            this._label = label;
        };
        BaseEdge.prototype.getFeatures = function () {
            return this._features;
        };
        BaseEdge.prototype.getFeature = function (key) {
            return this._features[key];
        };
        BaseEdge.prototype.f = function (key) {
            return this.getFeature(key);
        };
        BaseEdge.prototype.setFeatures = function (features) {
            this._features = StructUtils.clone(features);
        };
        BaseEdge.prototype.setFeature = function (key, value) {
            this._features[key] = value;
        };
        BaseEdge.prototype.deleteFeature = function (key) {
            var feat = this._features[key];
            delete this._features[key];
            return feat;
        };
        BaseEdge.prototype.clearFeatures = function () {
            this._features = {};
        };
        BaseEdge.prototype.isDirected = function () {
            return this._directed;
        };
        BaseEdge.prototype.isWeighted = function () {
            return this._weighted;
        };
        BaseEdge.prototype.getWeight = function () {
            return this._weight;
        };
        BaseEdge.prototype.setWeight = function (w) {
            if (!this._weighted) {
                throw new Error("Cannot set weight on unweighted edge.");
            }
            this._weight = w;
        };
        BaseEdge.prototype.getNodes = function () {
            return { a: this._node_a, b: this._node_b };
        };
        BaseEdge.prototype.clone = function (new_node_a, new_node_b) {
            if (!(new_node_a instanceof BaseNode_1.BaseNode) || !(new_node_b instanceof BaseNode_1.BaseNode)) {
                throw new Error("refusing to clone edge if any new node is invalid");
            }
            return new BaseEdge(this._id, new_node_a, new_node_b, {
                directed: this._directed,
                weighted: this._weighted,
                weight: this._weight,
                label: this._label
            });
        };
        BaseEdge.isTyped = function (arg) {
            return !!arg.type;
        };
        return BaseEdge;
    }());
    exports.BaseEdge = BaseEdge;
    });

    unwrapExports(BaseEdge_1);
    var BaseEdge_2 = BaseEdge_1.BaseEdge;

    var CallbackUtils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function execCallbacks(cbs, context) {
        cbs.forEach(function (cb) {
            if (typeof cb === 'function') {
                cb(context);
            }
            else {
                throw new Error('Provided callback is not a function.');
            }
        });
    }
    exports.execCallbacks = execCallbacks;
    });

    unwrapExports(CallbackUtils);
    var CallbackUtils_1 = CallbackUtils.execCallbacks;

    var BFS_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    function BFS(graph, v, config) {
        config = config || prepareBFSStandardConfig();
        var callbacks = config.callbacks;
        var dir_mode = config.dir_mode;
        if (graph.getMode() === interfaces.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === interfaces.GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        var bfsScope = {
            nodes: graph.getNodes(),
            queue: [],
            current: null,
            next_node: null,
            next_edge: null,
            root_node: v,
            adj_nodes: []
        };
        if (callbacks.init_bfs) {
            CallbackUtils.execCallbacks(callbacks.init_bfs, bfsScope);
        }
        bfsScope.queue.push(v);
        var i = 0;
        while (i < bfsScope.queue.length) {
            bfsScope.current = bfsScope.queue[i++];
            if (dir_mode === interfaces.GraphMode.MIXED) {
                bfsScope.adj_nodes = bfsScope.current.reachNodes();
            }
            else if (dir_mode === interfaces.GraphMode.UNDIRECTED) {
                bfsScope.adj_nodes = bfsScope.current.connNodes();
            }
            else if (dir_mode === interfaces.GraphMode.DIRECTED) {
                bfsScope.adj_nodes = bfsScope.current.nextNodes();
            }
            else {
                bfsScope.adj_nodes = [];
            }
            if (typeof callbacks.sort_nodes === 'function') {
                callbacks.sort_nodes(bfsScope);
            }
            for (var adj_idx in bfsScope.adj_nodes) {
                bfsScope.next_node = bfsScope.adj_nodes[adj_idx].node;
                bfsScope.next_edge = bfsScope.adj_nodes[adj_idx].edge;
                if (config.result[bfsScope.next_node.getID()].distance === Number.POSITIVE_INFINITY) {
                    if (callbacks.node_unmarked) {
                        CallbackUtils.execCallbacks(callbacks.node_unmarked, bfsScope);
                    }
                }
                else {
                    if (callbacks.node_marked) {
                        CallbackUtils.execCallbacks(callbacks.node_marked, bfsScope);
                    }
                }
            }
        }
        return config.result;
    }
    exports.BFS = BFS;
    function prepareBFSStandardConfig() {
        var config = {
            result: {},
            callbacks: {
                init_bfs: [],
                node_unmarked: [],
                node_marked: [],
                sort_nodes: undefined
            },
            dir_mode: interfaces.GraphMode.MIXED,
            messages: {},
            filters: {}
        }, result = config.result, callbacks = config.callbacks;
        var count = 0;
        var counter = function () {
            return count++;
        };
        var initBFS = function (context) {
            for (var key in context.nodes) {
                config.result[key] = {
                    distance: Number.POSITIVE_INFINITY,
                    parent: null,
                    counter: -1
                };
            }
            config.result[context.root_node.getID()] = {
                distance: 0,
                parent: context.root_node,
                counter: counter()
            };
        };
        callbacks.init_bfs.push(initBFS);
        var nodeUnmarked = function (context) {
            config.result[context.next_node.getID()] = {
                distance: result[context.current.getID()].distance + 1,
                parent: context.current,
                counter: counter()
            };
            context.queue.push(context.next_node);
        };
        callbacks.node_unmarked.push(nodeUnmarked);
        return config;
    }
    exports.prepareBFSStandardConfig = prepareBFSStandardConfig;
    });

    unwrapExports(BFS_1);
    var BFS_2 = BFS_1.BFS;
    var BFS_3 = BFS_1.prepareBFSStandardConfig;

    var DFS_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    function DFSVisit(graph, current_root, config) {
        var dfsVisitScope = {
            stack: [],
            adj_nodes: [],
            stack_entry: null,
            current: null,
            current_root: current_root
        };
        config = config || prepareDFSVisitStandardConfig();
        var callbacks = config.callbacks, dir_mode = config.dir_mode;
        if (graph.getMode() === interfaces.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === interfaces.GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        if (callbacks.init_dfs_visit) {
            CallbackUtils.execCallbacks(callbacks.init_dfs_visit, dfsVisitScope);
        }
        dfsVisitScope.stack.push({
            node: current_root,
            parent: current_root,
            weight: 0
        });
        while (dfsVisitScope.stack.length) {
            dfsVisitScope.stack_entry = dfsVisitScope.stack.pop();
            dfsVisitScope.current = dfsVisitScope.stack_entry.node;
            if (callbacks.node_popped) {
                CallbackUtils.execCallbacks(callbacks.node_popped, dfsVisitScope);
            }
            if (!config.dfs_visit_marked[dfsVisitScope.current.getID()]) {
                config.dfs_visit_marked[dfsVisitScope.current.getID()] = true;
                if (callbacks.node_unmarked) {
                    CallbackUtils.execCallbacks(callbacks.node_unmarked, dfsVisitScope);
                }
                if (dir_mode === interfaces.GraphMode.MIXED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.reachNodes();
                }
                else if (dir_mode === interfaces.GraphMode.UNDIRECTED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.connNodes();
                }
                else if (dir_mode === interfaces.GraphMode.DIRECTED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.nextNodes();
                }
                if (typeof callbacks.sort_nodes === 'function') {
                    callbacks.sort_nodes(dfsVisitScope);
                }
                for (var adj_idx in dfsVisitScope.adj_nodes) {
                    dfsVisitScope.stack.push({
                        node: dfsVisitScope.adj_nodes[adj_idx].node,
                        parent: dfsVisitScope.current,
                        weight: dfsVisitScope.adj_nodes[adj_idx].edge.getWeight()
                    });
                }
                if (callbacks.adj_nodes_pushed) {
                    CallbackUtils.execCallbacks(callbacks.adj_nodes_pushed, dfsVisitScope);
                }
            }
            else {
                if (callbacks.node_marked) {
                    CallbackUtils.execCallbacks(callbacks.node_marked, dfsVisitScope);
                }
            }
        }
        return config.visit_result;
    }
    exports.DFSVisit = DFSVisit;
    function DFS(graph, root, config) {
        config = config || prepareDFSStandardConfig();
        var callbacks = config.callbacks, dir_mode = config.dir_mode;
        if (graph.getMode() === interfaces.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === interfaces.GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        var dfsScope = {
            marked: {},
            nodes: graph.getNodes()
        };
        if (callbacks.init_dfs) {
            CallbackUtils.execCallbacks(callbacks.init_dfs, dfsScope);
        }
        callbacks.adj_nodes_pushed = callbacks.adj_nodes_pushed || [];
        var markNode = function (context) {
            dfsScope.marked[context.current.getID()] = true;
        };
        callbacks.adj_nodes_pushed.push(markNode);
        var dfs_result = [{}];
        var dfs_idx = 0;
        var count = 0;
        var counter = function () {
            return count++;
        };
        var addToProperSegment = function (context) {
            dfs_result[dfs_idx][context.current.getID()] = {
                parent: context.stack_entry.parent,
                counter: counter()
            };
        };
        if (callbacks && callbacks.node_unmarked) {
            callbacks.node_unmarked.push(addToProperSegment);
        }
        DFSVisit(graph, root, config);
        for (var node_key in dfsScope.nodes) {
            if (!dfsScope.marked[node_key]) {
                dfs_idx++;
                dfs_result.push({});
                DFSVisit(graph, dfsScope.nodes[node_key], config);
            }
        }
        return dfs_result;
    }
    exports.DFS = DFS;
    function prepareDFSVisitStandardConfig() {
        var config = {
            visit_result: {},
            callbacks: {},
            messages: {},
            dfs_visit_marked: {},
            dir_mode: interfaces.GraphMode.MIXED
        }, result = config.visit_result, callbacks = config.callbacks;
        var count = 0;
        var counter = function () {
            return count++;
        };
        callbacks.init_dfs_visit = callbacks.init_dfs_visit || [];
        var initDFSVisit = function (context) {
            result[context.current_root.getID()] = {
                parent: context.current_root
            };
        };
        callbacks.init_dfs_visit.push(initDFSVisit);
        callbacks.node_unmarked = callbacks.node_unmarked || [];
        var setResultEntry = function (context) {
            result[context.current.getID()] = {
                parent: context.stack_entry.parent,
                counter: counter()
            };
        };
        callbacks.node_unmarked.push(setResultEntry);
        return config;
    }
    exports.prepareDFSVisitStandardConfig = prepareDFSVisitStandardConfig;
    function prepareDFSStandardConfig() {
        var config = prepareDFSVisitStandardConfig(), callbacks = config.callbacks;
        callbacks.init_dfs = callbacks.init_dfs || [];
        var setInitialResultEntries = function (context) {
        };
        callbacks.init_dfs.push(setInitialResultEntries);
        return config;
    }
    exports.prepareDFSStandardConfig = prepareDFSStandardConfig;
    });

    unwrapExports(DFS_1);
    var DFS_2 = DFS_1.DFSVisit;
    var DFS_3 = DFS_1.DFS;
    var DFS_4 = DFS_1.prepareDFSVisitStandardConfig;
    var DFS_5 = DFS_1.prepareDFSStandardConfig;

    var BinaryHeap_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var BinaryHeapMode;
    (function (BinaryHeapMode) {
        BinaryHeapMode[BinaryHeapMode["MIN"] = 0] = "MIN";
        BinaryHeapMode[BinaryHeapMode["MAX"] = 1] = "MAX";
    })(BinaryHeapMode = exports.BinaryHeapMode || (exports.BinaryHeapMode = {}));
    var BinaryHeap = (function () {
        function BinaryHeap(_mode, _evalPriority, _evalObjID) {
            if (_mode === void 0) { _mode = BinaryHeapMode.MIN; }
            if (_evalPriority === void 0) { _evalPriority = function (obj) {
                if (typeof obj !== 'number' && typeof obj !== 'string') {
                    return NaN;
                }
                if (typeof obj === 'number') {
                    return obj | 0;
                }
                return parseInt(obj);
            }; }
            if (_evalObjID === void 0) { _evalObjID = function (obj) {
                return obj;
            }; }
            this._mode = _mode;
            this._evalPriority = _evalPriority;
            this._evalObjID = _evalObjID;
            this._nr_removes = 0;
            this._array = [];
            this._positions = {};
        }
        BinaryHeap.prototype.getMode = function () {
            return this._mode;
        };
        BinaryHeap.prototype.getArray = function () {
            return this._array;
        };
        BinaryHeap.prototype.getPositions = function () {
            return this._positions;
        };
        BinaryHeap.prototype.size = function () {
            return this._array.length;
        };
        BinaryHeap.prototype.getEvalPriorityFun = function () {
            return this._evalPriority;
        };
        BinaryHeap.prototype.evalInputScore = function (obj) {
            return this._evalPriority(obj);
        };
        BinaryHeap.prototype.getEvalObjIDFun = function () {
            return this._evalObjID;
        };
        BinaryHeap.prototype.evalInputObjID = function (obj) {
            return this._evalObjID(obj);
        };
        BinaryHeap.prototype.peek = function () {
            return this._array[0];
        };
        BinaryHeap.prototype.pop = function () {
            if (this.size()) {
                return this.remove(this._array[0]);
            }
        };
        BinaryHeap.prototype.find = function (obj) {
            var pos = this.getNodePosition(obj);
            return this._array[pos];
        };
        BinaryHeap.prototype.insert = function (obj) {
            if (isNaN(this._evalPriority(obj))) {
                throw new Error("Cannot insert object without numeric priority.");
            }
            this._array.push(obj);
            this.setNodePosition(obj, this.size() - 1);
            this.trickleUp(this.size() - 1);
        };
        BinaryHeap.prototype.remove = function (obj) {
            this._nr_removes++;
            if (isNaN(this._evalPriority(obj))) {
                throw new Error('Object invalid.');
            }
            var pos = this.getNodePosition(obj), found = this._array[pos] != null ? this._array[pos] : null;
            if (found === null) {
                return undefined;
            }
            var last_array_obj = this._array.pop();
            this.removeNodePosition(obj);
            if (this.size() && found !== last_array_obj) {
                this._array[pos] = last_array_obj;
                this.setNodePosition(last_array_obj, pos);
                this.trickleUp(pos);
                this.trickleDown(pos);
            }
            return found;
        };
        BinaryHeap.prototype.trickleDown = function (i) {
            var parent = this._array[i];
            while (true) {
                var right_child_idx = (i + 1) * 2, left_child_idx = right_child_idx - 1, right_child = this._array[right_child_idx], left_child = this._array[left_child_idx], swap = null;
                if (left_child_idx < this.size() && !this.orderCorrect(parent, left_child)) {
                    swap = left_child_idx;
                }
                if (right_child_idx < this.size() && !this.orderCorrect(parent, right_child)
                    && !this.orderCorrect(left_child, right_child)) {
                    swap = right_child_idx;
                }
                if (swap === null) {
                    break;
                }
                this._array[i] = this._array[swap];
                this._array[swap] = parent;
                this.setNodePosition(this._array[i], i);
                this.setNodePosition(this._array[swap], swap);
                i = swap;
            }
        };
        BinaryHeap.prototype.trickleUp = function (i) {
            var child = this._array[i];
            while (i) {
                var parent_idx = Math.floor((i + 1) / 2) - 1, parent_1 = this._array[parent_idx];
                if (this.orderCorrect(parent_1, child)) {
                    break;
                }
                else {
                    this._array[parent_idx] = child;
                    this._array[i] = parent_1;
                    this.setNodePosition(child, parent_idx);
                    this.setNodePosition(parent_1, i);
                    i = parent_idx;
                }
            }
        };
        BinaryHeap.prototype.orderCorrect = function (obj_a, obj_b) {
            var obj_a_pr = this._evalPriority(obj_a);
            var obj_b_pr = this._evalPriority(obj_b);
            if (this._mode === BinaryHeapMode.MIN) {
                return obj_a_pr <= obj_b_pr;
            }
            else {
                return obj_a_pr >= obj_b_pr;
            }
        };
        BinaryHeap.prototype.setNodePosition = function (obj, pos) {
            if (obj == null || pos == null || pos !== (pos | 0)) {
                throw new Error('minium required arguments are obj and new_pos');
            }
            var pos_obj = {
                score: this.evalInputScore(obj),
                position: pos
            };
            var obj_key = this.evalInputObjID(obj);
            this._positions[obj_key] = pos_obj;
        };
        BinaryHeap.prototype.getNodePosition = function (obj) {
            var obj_key = this.evalInputObjID(obj);
            var occurrence = this._positions[obj_key];
            return occurrence ? occurrence.position : null;
        };
        BinaryHeap.prototype.removeNodePosition = function (obj) {
            var obj_key = this.evalInputObjID(obj);
            delete this._positions[obj_key];
        };
        return BinaryHeap;
    }());
    exports.BinaryHeap = BinaryHeap;
    });

    unwrapExports(BinaryHeap_1);
    var BinaryHeap_2 = BinaryHeap_1.BinaryHeapMode;
    var BinaryHeap_3 = BinaryHeap_1.BinaryHeap;

    var PFS_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });




    exports.DEFAULT_WEIGHT = 1;
    function PFS(graph, v, config) {
        config = config || preparePFSStandardConfig();
        var callbacks = config.callbacks, dir_mode = config.dir_mode, evalPriority = config.evalPriority, evalObjID = config.evalObjID;
        if (graph.getMode() === interfaces.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === interfaces.GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        var start_ne = {
            node: v,
            edge: new BaseEdge_1.BaseEdge('virtual start edge', v, v, { weighted: true, weight: 0 }),
            best: 0
        };
        var scope = {
            OPEN_HEAP: new BinaryHeap_1.BinaryHeap(BinaryHeap_1.BinaryHeapMode.MIN, evalPriority, evalObjID),
            OPEN: {},
            CLOSED: {},
            nodes: graph.getNodes(),
            root_node: v,
            current: start_ne,
            adj_nodes: [],
            next: null,
            proposed_dist: Number.POSITIVE_INFINITY,
        };
        callbacks.init_pfs && CallbackUtils.execCallbacks(callbacks.init_pfs, scope);
        scope.OPEN_HEAP.insert(start_ne);
        scope.OPEN[start_ne.node.getID()] = start_ne;
        while (scope.OPEN_HEAP.size()) {
            scope.current = scope.OPEN_HEAP.pop();
            callbacks.new_current && CallbackUtils.execCallbacks(callbacks.new_current, scope);
            if (scope.current == null) {
                console.log("HEAP popped undefined - HEAP size: " + scope.OPEN_HEAP.size());
            }
            scope.OPEN[scope.current.node.getID()] = undefined;
            scope.CLOSED[scope.current.node.getID()] = scope.current;
            if (scope.current.node === config.goal_node) {
                config.callbacks.goal_reached && CallbackUtils.execCallbacks(config.callbacks.goal_reached, scope);
                return config.result;
            }
            if (dir_mode === interfaces.GraphMode.MIXED) {
                scope.adj_nodes = scope.current.node.reachNodes();
            }
            else if (dir_mode === interfaces.GraphMode.UNDIRECTED) {
                scope.adj_nodes = scope.current.node.connNodes();
            }
            else if (dir_mode === interfaces.GraphMode.DIRECTED) {
                scope.adj_nodes = scope.current.node.nextNodes();
            }
            else {
                throw new Error('Unsupported traversal mode. Please use directed, undirected, or mixed');
            }
            for (var adj_idx in scope.adj_nodes) {
                scope.next = scope.adj_nodes[adj_idx];
                if (scope.CLOSED[scope.next.node.getID()]) {
                    config.callbacks.node_closed && CallbackUtils.execCallbacks(config.callbacks.node_closed, scope);
                    continue;
                }
                if (scope.OPEN[scope.next.node.getID()]) {
                    scope.next.best = scope.OPEN[scope.next.node.getID()].best;
                    config.callbacks.node_open && CallbackUtils.execCallbacks(config.callbacks.node_open, scope);
                    scope.proposed_dist = scope.current.best + (isNaN(scope.next.edge.getWeight()) ? exports.DEFAULT_WEIGHT : scope.next.edge.getWeight());
                    if (scope.next.best > scope.proposed_dist) {
                        config.callbacks.better_path && CallbackUtils.execCallbacks(config.callbacks.better_path, scope);
                        scope.OPEN_HEAP.remove(scope.next);
                        scope.next.best = scope.proposed_dist;
                        scope.OPEN_HEAP.insert(scope.next);
                        scope.OPEN[scope.next.node.getID()].best = scope.proposed_dist;
                    }
                    else if (scope.next.best === scope.proposed_dist) {
                        config.callbacks.equal_path && CallbackUtils.execCallbacks(config.callbacks.equal_path, scope);
                    }
                    continue;
                }
                config.callbacks.not_encountered && CallbackUtils.execCallbacks(config.callbacks.not_encountered, scope);
                scope.OPEN_HEAP.insert(scope.next);
                scope.OPEN[scope.next.node.getID()] = scope.next;
            }
        }
        return config.result;
    }
    exports.PFS = PFS;
    function preparePFSStandardConfig() {
        var config = {
            result: {},
            callbacks: {
                init_pfs: [],
                new_current: [],
                not_encountered: [],
                node_open: [],
                node_closed: [],
                better_path: [],
                equal_path: [],
                goal_reached: []
            },
            messages: {
                init_pfs_msgs: [],
                new_current_msgs: [],
                not_enc_msgs: [],
                node_open_msgs: [],
                node_closed_msgs: [],
                better_path_msgs: [],
                equal_path_msgs: [],
                goal_reached_msgs: []
            },
            dir_mode: interfaces.GraphMode.MIXED,
            goal_node: null,
            evalPriority: function (ne) {
                return ne.best || exports.DEFAULT_WEIGHT;
            },
            evalObjID: function (ne) {
                return ne.node.getID();
            }
        };
        var callbacks = config.callbacks;
        var count = 0;
        var counter = function () {
            return count++;
        };
        var initPFS = function (context) {
            for (var key in context.nodes) {
                config.result[key] = {
                    distance: Number.POSITIVE_INFINITY,
                    parent: null,
                    counter: -1
                };
            }
            config.result[context.root_node.getID()] = {
                distance: 0,
                parent: context.root_node,
                counter: counter()
            };
        };
        callbacks.init_pfs.push(initPFS);
        var notEncountered = function (context) {
            context.next.best = context.current.best + (isNaN(context.next.edge.getWeight()) ? exports.DEFAULT_WEIGHT : context.next.edge.getWeight());
            config.result[context.next.node.getID()] = {
                distance: context.next.best,
                parent: context.current.node,
                counter: undefined
            };
        };
        callbacks.not_encountered.push(notEncountered);
        var betterPathFound = function (context) {
            config.result[context.next.node.getID()].distance = context.proposed_dist;
            config.result[context.next.node.getID()].parent = context.current.node;
        };
        callbacks.better_path.push(betterPathFound);
        return config;
    }
    exports.preparePFSStandardConfig = preparePFSStandardConfig;
    });

    unwrapExports(PFS_1);
    var PFS_2 = PFS_1.DEFAULT_WEIGHT;
    var PFS_3 = PFS_1.PFS;
    var PFS_4 = PFS_1.preparePFSStandardConfig;

    var BellmanFord = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    function BFSanityChecks(graph, start) {
        if (graph == null || start == null) {
            throw new Error('Graph as well as start node have to be valid objects.');
        }
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error('Cowardly refusing to traverse a graph without edges.');
        }
        if (!graph.hasNodeID(start.getID())) {
            throw new Error('Cannot start from an outside node.');
        }
    }
    function BellmanFordArray(graph, start) {
        BFSanityChecks(graph, start);
        var distances = [], nodes = graph.getNodes(), edge, node_keys = Object.keys(nodes), node, id_idx_map = {}, new_weight, neg_cycle = false;
        for (var n_idx = 0; n_idx < node_keys.length; ++n_idx) {
            node = nodes[node_keys[n_idx]];
            distances[n_idx] = (node === start) ? 0 : Number.POSITIVE_INFINITY;
            id_idx_map[node.getID()] = n_idx;
        }
        var graph_edges = graph.getDirEdgesArray().concat(graph.getUndEdgesArray());
        var bf_edges = [];
        for (var e_idx = 0; e_idx < graph_edges.length; ++e_idx) {
            edge = graph_edges[e_idx];
            var bf_edge_entry_1 = bf_edges.push([
                id_idx_map[edge.getNodes().a.getID()],
                id_idx_map[edge.getNodes().b.getID()],
                isFinite(edge.getWeight()) ? edge.getWeight() : PFS_1.DEFAULT_WEIGHT,
                edge.isDirected()
            ]);
        }
        for (var i = 0; i < node_keys.length - 1; ++i) {
            for (var e_idx = 0; e_idx < bf_edges.length; ++e_idx) {
                edge = bf_edges[e_idx];
                updateDist(edge[0], edge[1], edge[2]);
                !edge[3] && updateDist(edge[1], edge[0], edge[2]);
            }
        }
        for (var e_idx = 0; e_idx < bf_edges.length; ++e_idx) {
            edge = bf_edges[e_idx];
            if (betterDist(edge[0], edge[1], edge[2]) || (!edge[3] && betterDist(edge[1], edge[0], edge[2]))) {
                neg_cycle = true;
                break;
            }
        }
        function updateDist(u, v, weight) {
            new_weight = distances[u] + weight;
            if (distances[v] > new_weight) {
                distances[v] = new_weight;
            }
        }
        function betterDist(u, v, weight) {
            return (distances[v] > distances[u] + weight);
        }
        return { distances: distances, neg_cycle: neg_cycle };
    }
    exports.BellmanFordArray = BellmanFordArray;
    function BellmanFordDict(graph, start) {
        BFSanityChecks(graph, start);
        var distances = {}, edges, edge, a, b, weight, new_weight, nodes_size, neg_cycle = false;
        distances = {};
        edges = graph.getDirEdgesArray().concat(graph.getUndEdgesArray());
        nodes_size = graph.nrNodes();
        for (var node in graph.getNodes()) {
            distances[node] = Number.POSITIVE_INFINITY;
        }
        distances[start.getID()] = 0;
        for (var i = 0; i < nodes_size - 1; ++i) {
            for (var e_idx = 0; e_idx < edges.length; ++e_idx) {
                edge = edges[e_idx];
                a = edge.getNodes().a.getID();
                b = edge.getNodes().b.getID();
                weight = isFinite(edge.getWeight()) ? edge.getWeight() : PFS_1.DEFAULT_WEIGHT;
                updateDist(a, b, weight);
                !edge.isDirected() && updateDist(b, a, weight);
            }
        }
        for (var edgeID in edges) {
            edge = edges[edgeID];
            a = edge.getNodes().a.getID();
            b = edge.getNodes().b.getID();
            weight = isFinite(edge.getWeight()) ? edge.getWeight() : PFS_1.DEFAULT_WEIGHT;
            if (betterDist(a, b, weight) || (!edge.isDirected() && betterDist(b, a, weight))) {
                neg_cycle = true;
            }
        }
        function updateDist(u, v, weight) {
            new_weight = distances[u] + weight;
            if (distances[v] > new_weight) {
                distances[v] = new_weight;
            }
        }
        function betterDist(u, v, weight) {
            return (distances[v] > distances[u] + weight);
        }
        return { distances: distances, neg_cycle: neg_cycle };
    }
    exports.BellmanFordDict = BellmanFordDict;
    });

    unwrapExports(BellmanFord);
    var BellmanFord_1 = BellmanFord.BellmanFordArray;
    var BellmanFord_2 = BellmanFord.BellmanFordDict;

    var Johnsons_1 = createCommonjsModule(function (module, exports) {
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });





    function Johnsons(graph) {
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error("Cowardly refusing to traverse graph without edges.");
        }
        if (graph.hasNegativeEdge()) {
            var extraNode = new BaseNode_1.BaseNode("extraNode");
            graph = addExtraNandE(graph, extraNode);
            var BFresult = BellmanFord.BellmanFordDict(graph, extraNode);
            if (BFresult.neg_cycle) {
                throw new Error("The graph contains a negative cycle, thus it can not be processed");
            }
            else {
                var newWeights = BFresult.distances;
                graph = reWeighGraph(graph, newWeights, extraNode);
                graph.deleteNode(extraNode);
                return PFSFromAllNodes(graph);
            }
        }
        return PFSFromAllNodes(graph);
    }
    exports.Johnsons = Johnsons;
    function addExtraNandE(target, nodeToAdd) {
        var allNodes = target.getNodes();
        target.addNode(nodeToAdd);
        var tempCounter = 0;
        for (var nodeKey in allNodes) {
            if (allNodes[nodeKey].getID() != nodeToAdd.getID()) {
                target.addEdgeByNodeIDs("temp" + tempCounter, nodeToAdd.getID(), allNodes[nodeKey].getID(), { directed: true, weighted: true, weight: 0 });
                tempCounter++;
            }
        }
        return target;
    }
    exports.addExtraNandE = addExtraNandE;
    function reWeighGraph(target, distDict, tempNode) {
        var e_1, _a;
        var edges = target.getDirEdgesArray().concat(target.getUndEdgesArray());
        try {
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
                var edge = edges_1_1.value;
                var a = edge.getNodes().a.getID();
                var b = edge.getNodes().b.getID();
                if (a !== tempNode.getID() && edge.isWeighted) {
                    var oldWeight = edge.getWeight();
                    var newWeight = oldWeight + distDict[a] - distDict[b];
                    edge.setWeight(newWeight);
                }
                else {
                    var newWeight = PFS_1.DEFAULT_WEIGHT + distDict[a] - distDict[b];
                    var edgeID = edge.getID();
                    var dirNess = edge.isDirected();
                    target.deleteEdge(edge);
                    target.addEdgeByNodeIDs(edgeID, a, b, { directed: dirNess, weighted: true, weight: newWeight });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return target;
    }
    exports.reWeighGraph = reWeighGraph;
    function PFSFromAllNodes(graph) {
        var cg = new ComputeGraph_1.ComputeGraph(graph);
        var dists = cg.adjMatrixW();
        var next = cg.nextArray();
        var nodesDict = graph.getNodes();
        var nodeIDIdxMap = {};
        var i = 0;
        for (var key in nodesDict) {
            nodeIDIdxMap[nodesDict[key].getID()] = i++;
        }
        var specialConfig = PFS_1.preparePFSStandardConfig();
        var notEncounteredJohnsons = function (context) {
            context.next.best = context.current.best + context.next.edge.getWeight();
            var i = nodeIDIdxMap[context.root_node.getID()], j = nodeIDIdxMap[context.next.node.getID()];
            if (context.current.node == context.root_node) {
                dists[i][j] = context.next.best;
                next[i][j][0] = j;
            }
            else {
                dists[i][j] = context.next.best;
                next[i][j][0] = nodeIDIdxMap[context.current.node.getID()];
            }
        };
        specialConfig.callbacks.not_encountered.splice(0, 1, notEncounteredJohnsons);
        var betterPathJohnsons = function (context) {
            var i = nodeIDIdxMap[context.root_node.getID()], j = nodeIDIdxMap[context.next.node.getID()];
            dists[i][j] = context.proposed_dist;
            if (context.current.node !== context.root_node) {
                next[i][j].splice(0, next[i][j].length, nodeIDIdxMap[context.current.node.getID()]);
            }
        };
        specialConfig.callbacks.better_path.splice(0, 1, betterPathJohnsons);
        var equalPathJohnsons = function (context) {
            var i = nodeIDIdxMap[context.root_node.getID()], j = nodeIDIdxMap[context.next.node.getID()];
            if (context.current.node !== context.root_node) {
                next[i][j] = StructUtils.mergeOrderedArraysNoDups(next[i][j], [nodeIDIdxMap[context.current.node.getID()]]);
            }
        };
        specialConfig.callbacks.equal_path.push(equalPathJohnsons);
        for (var key in nodesDict) {
            PFS_1.PFS(graph, nodesDict[key], specialConfig);
        }
        return [dists, next];
    }
    exports.PFSFromAllNodes = PFSFromAllNodes;
    });

    unwrapExports(Johnsons_1);
    var Johnsons_2 = Johnsons_1.Johnsons;
    var Johnsons_3 = Johnsons_1.addExtraNandE;
    var Johnsons_4 = Johnsons_1.reWeighGraph;
    var Johnsons_5 = Johnsons_1.PFSFromAllNodes;

    var BaseGraph_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseGraph = (function () {
        function BaseGraph(_label) {
            this._label = _label;
            this._nr_nodes = 0;
            this._nr_dir_edges = 0;
            this._nr_und_edges = 0;
            this._mode = interfaces.GraphMode.INIT;
            this._nodes = {};
            this._dir_edges = {};
            this._und_edges = {};
        }
        BaseGraph.isTyped = function (arg) {
            return !!arg.type;
        };
        Object.defineProperty(BaseGraph.prototype, "label", {
            get: function () {
                return this._label;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "mode", {
            get: function () {
                return this._mode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "stats", {
            get: function () {
                return this.getStats();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "inHist", {
            get: function () {
                return this.degreeHist(interfaces.DIR.in);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "outHist", {
            get: function () {
                return this.degreeHist(interfaces.DIR.out);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "connHist", {
            get: function () {
                return this.degreeHist(interfaces.DIR.und);
            },
            enumerable: true,
            configurable: true
        });
        BaseGraph.prototype.degreeHist = function (dir) {
            var result = [];
            for (var nid in this._nodes) {
                var node = this._nodes[nid];
                var deg = void 0;
                switch (dir) {
                    case interfaces.DIR.in:
                        deg = node.in_deg;
                        break;
                    case interfaces.DIR.out:
                        deg = node.out_deg;
                        break;
                    default:
                        deg = node.deg;
                }
                if (!result[deg]) {
                    result[deg] = new Set([node]);
                }
                else {
                    result[deg].add(node);
                }
            }
            return result;
        };
        BaseGraph.prototype.reweighIfHasNegativeEdge = function (clone) {
            if (clone === void 0) { clone = false; }
            if (this.hasNegativeEdge()) {
                var result_graph = clone ? this.cloneStructure() : this;
                var extraNode = new BaseNode_1.BaseNode("extraNode");
                result_graph = Johnsons_1.addExtraNandE(result_graph, extraNode);
                var BFresult = BellmanFord.BellmanFordDict(result_graph, extraNode);
                if (BFresult.neg_cycle) {
                    throw new Error("The graph contains a negative cycle, thus it can not be processed");
                }
                else {
                    var newWeights = BFresult.distances;
                    result_graph = Johnsons_1.reWeighGraph(result_graph, newWeights, extraNode);
                    result_graph.deleteNode(extraNode);
                }
                return result_graph;
            }
        };
        BaseGraph.prototype.toDirectedGraph = function (copy) {
            if (copy === void 0) { copy = false; }
            var result_graph = copy ? this.cloneStructure() : this;
            if (this._nr_dir_edges === 0 && this._nr_und_edges === 0) {
                throw new Error("Cowardly refusing to re-interpret an empty graph.");
            }
            return result_graph;
        };
        BaseGraph.prototype.toUndirectedGraph = function () {
            return this;
        };
        BaseGraph.prototype.hasNegativeEdge = function () {
            var has_neg_edge = false, edge;
            for (var edge_id in this._und_edges) {
                edge = this._und_edges[edge_id];
                if (!edge.isWeighted()) {
                    continue;
                }
                if (edge.getWeight() < 0) {
                    return true;
                }
            }
            for (var edge_id in this._dir_edges) {
                edge = this._dir_edges[edge_id];
                if (!edge.isWeighted()) {
                    continue;
                }
                if (edge.getWeight() < 0) {
                    has_neg_edge = true;
                    break;
                }
            }
            return has_neg_edge;
        };
        BaseGraph.prototype.hasNegativeCycles = function (node) {
            var _this = this;
            if (!this.hasNegativeEdge()) {
                return false;
            }
            var negative_cycle = false, start = node ? node : this.getRandomNode();
            DFS_1.DFS(this, start).forEach(function (comp) {
                var min_count = Number.POSITIVE_INFINITY, comp_start_node = "";
                Object.keys(comp).forEach(function (node_id) {
                    if (min_count > comp[node_id].counter) {
                        min_count = comp[node_id].counter;
                        comp_start_node = node_id;
                    }
                });
                if (BellmanFord.BellmanFordArray(_this, _this._nodes[comp_start_node]).neg_cycle) {
                    negative_cycle = true;
                }
            });
            return negative_cycle;
        };
        BaseGraph.prototype.getMode = function () {
            return this._mode;
        };
        BaseGraph.prototype.getStats = function () {
            return {
                mode: this._mode,
                nr_nodes: this._nr_nodes,
                nr_und_edges: this._nr_und_edges,
                nr_dir_edges: this._nr_dir_edges,
                density_dir: this._nr_dir_edges / (this._nr_nodes * (this._nr_nodes - 1)),
                density_und: 2 * this._nr_und_edges / (this._nr_nodes * (this._nr_nodes - 1))
            };
        };
        BaseGraph.prototype.nrNodes = function () {
            return this._nr_nodes;
        };
        BaseGraph.prototype.nrDirEdges = function () {
            return this._nr_dir_edges;
        };
        BaseGraph.prototype.nrUndEdges = function () {
            return this._nr_und_edges;
        };
        BaseGraph.prototype.addNodeByID = function (id, opts) {
            if (this.hasNodeID(id)) {
                throw new Error("Won't add node with duplicate ID.");
            }
            var node = new BaseNode_1.BaseNode(id, opts);
            return this.addNode(node) ? node : null;
        };
        BaseGraph.prototype.addNode = function (node) {
            if (this.hasNodeID(node.getID())) {
                throw new Error("Won't add node with duplicate ID.");
            }
            this._nodes[node.getID()] = node;
            this._nr_nodes += 1;
            return node;
        };
        BaseGraph.prototype.hasNodeID = function (id) {
            return !!this._nodes[id];
        };
        BaseGraph.prototype.getNodeById = function (id) {
            return this._nodes[id];
        };
        BaseGraph.prototype.n = function (id) {
            return this.getNodeById(id);
        };
        BaseGraph.prototype.getNodes = function () {
            return this._nodes;
        };
        BaseGraph.prototype.getRandomNode = function () {
            return this.pickRandomProperty(this._nodes);
        };
        BaseGraph.prototype.deleteNode = function (node) {
            var rem_node = this._nodes[node.getID()];
            if (!rem_node) {
                throw new Error('Cannot remove a foreign node.');
            }
            var in_deg = node.in_deg;
            var out_deg = node.out_deg;
            var deg = node.deg;
            if (in_deg) {
                this.deleteInEdgesOf(node);
            }
            if (out_deg) {
                this.deleteOutEdgesOf(node);
            }
            if (deg) {
                this.deleteUndEdgesOf(node);
            }
            delete this._nodes[node.getID()];
            this._nr_nodes -= 1;
        };
        BaseGraph.prototype.hasEdgeID = function (id) {
            return !!this._dir_edges[id] || !!this._und_edges[id];
        };
        BaseGraph.prototype.getEdgeById = function (id) {
            var edge = this._dir_edges[id] || this._und_edges[id];
            if (!edge) {
                throw new Error("cannot retrieve edge with non-existing ID.");
            }
            return edge;
        };
        BaseGraph.checkExistanceOfEdgeNodes = function (node_a, node_b) {
            if (!node_a) {
                throw new Error("Cannot find edge. Node A does not exist (in graph).");
            }
            if (!node_b) {
                throw new Error("Cannot find edge. Node B does not exist (in graph).");
            }
        };
        BaseGraph.prototype.getDirEdgeByNodeIDs = function (node_a_id, node_b_id) {
            var node_a = this.getNodeById(node_a_id);
            var node_b = this.getNodeById(node_b_id);
            BaseGraph.checkExistanceOfEdgeNodes(node_a, node_b);
            var edges_dir = node_a.outEdges(), edges_dir_keys = Object.keys(edges_dir);
            for (var i = 0; i < edges_dir_keys.length; i++) {
                var edge = edges_dir[edges_dir_keys[i]];
                if (edge.getNodes().b.getID() == node_b_id) {
                    return edge;
                }
            }
            throw new Error("Cannot find edge. There is no edge between Node " + node_a_id + " and " + node_b_id + ".");
        };
        BaseGraph.prototype.getUndEdgeByNodeIDs = function (node_a_id, node_b_id) {
            var node_a = this.getNodeById(node_a_id);
            var node_b = this.getNodeById(node_b_id);
            BaseGraph.checkExistanceOfEdgeNodes(node_a, node_b);
            var edges_und = node_a.undEdges(), edges_und_keys = Object.keys(edges_und);
            for (var i = 0; i < edges_und_keys.length; i++) {
                var edge = edges_und[edges_und_keys[i]];
                var b = void 0;
                (edge.getNodes().a.getID() == node_a_id) ? (b = edge.getNodes().b.getID()) : (b = edge.getNodes().a.getID());
                if (b == node_b_id) {
                    return edge;
                }
            }
        };
        BaseGraph.prototype.getDirEdges = function () {
            return this._dir_edges;
        };
        BaseGraph.prototype.getUndEdges = function () {
            return this._und_edges;
        };
        BaseGraph.prototype.getDirEdgesArray = function () {
            var edges = [];
            for (var e_id in this._dir_edges) {
                edges.push(this._dir_edges[e_id]);
            }
            return edges;
        };
        BaseGraph.prototype.getUndEdgesArray = function () {
            var edges = [];
            for (var e_id in this._und_edges) {
                edges.push(this._und_edges[e_id]);
            }
            return edges;
        };
        BaseGraph.prototype.addEdgeByNodeIDs = function (label, node_a_id, node_b_id, opts) {
            var node_a = this.getNodeById(node_a_id), node_b = this.getNodeById(node_b_id);
            if (!node_a) {
                throw new Error("Cannot add edge. Node A does not exist");
            }
            else if (!node_b) {
                throw new Error("Cannot add edge. Node B does not exist");
            }
            else {
                return this.addEdgeByID(label, node_a, node_b, opts);
            }
        };
        BaseGraph.prototype.addEdgeByID = function (id, node_a, node_b, opts) {
            var edge = new BaseEdge_1.BaseEdge(id, node_a, node_b, opts || {});
            return this.addEdge(edge) ? edge : null;
        };
        BaseGraph.prototype.addEdge = function (edge) {
            var node_a = edge.getNodes().a, node_b = edge.getNodes().b;
            if (!this.hasNodeID(node_a.getID()) || !this.hasNodeID(node_b.getID())
                || this._nodes[node_a.getID()] !== node_a || this._nodes[node_b.getID()] !== node_b) {
                throw new Error("can only add edge between two nodes existing in graph");
            }
            node_a.addEdge(edge);
            if (edge.isDirected()) {
                node_b.addEdge(edge);
                this._dir_edges[edge.getID()] = edge;
                this._nr_dir_edges += 1;
                this.updateGraphMode();
            }
            else {
                if (node_a !== node_b) {
                    node_b.addEdge(edge);
                }
                this._und_edges[edge.getID()] = edge;
                this._nr_und_edges += 1;
                this.updateGraphMode();
            }
            return edge;
        };
        BaseGraph.prototype.deleteEdge = function (edge) {
            var dir_edge = this._dir_edges[edge.getID()];
            var und_edge = this._und_edges[edge.getID()];
            if (!dir_edge && !und_edge) {
                throw new Error('cannot remove non-existing edge.');
            }
            var nodes = edge.getNodes();
            nodes.a.removeEdge(edge);
            if (nodes.a !== nodes.b) {
                nodes.b.removeEdge(edge);
            }
            if (dir_edge) {
                delete this._dir_edges[edge.getID()];
                this._nr_dir_edges -= 1;
            }
            else {
                delete this._und_edges[edge.getID()];
                this._nr_und_edges -= 1;
            }
            this.updateGraphMode();
        };
        BaseGraph.prototype.deleteInEdgesOf = function (node) {
            this.checkConnectedNodeOrThrow(node);
            var in_edges = node.inEdges();
            var key, edge;
            for (key in in_edges) {
                edge = in_edges[key];
                edge.getNodes().a.removeEdge(edge);
                delete this._dir_edges[edge.getID()];
                this._nr_dir_edges -= 1;
            }
            node.clearInEdges();
            this.updateGraphMode();
        };
        BaseGraph.prototype.deleteOutEdgesOf = function (node) {
            this.checkConnectedNodeOrThrow(node);
            var out_edges = node.outEdges();
            var key, edge;
            for (key in out_edges) {
                edge = out_edges[key];
                edge.getNodes().b.removeEdge(edge);
                delete this._dir_edges[edge.getID()];
                this._nr_dir_edges -= 1;
            }
            node.clearOutEdges();
            this.updateGraphMode();
        };
        BaseGraph.prototype.deleteDirEdgesOf = function (node) {
            this.deleteInEdgesOf(node);
            this.deleteOutEdgesOf(node);
        };
        BaseGraph.prototype.deleteUndEdgesOf = function (node) {
            this.checkConnectedNodeOrThrow(node);
            var und_edges = node.undEdges();
            var key, edge;
            for (key in und_edges) {
                edge = und_edges[key];
                var conns = edge.getNodes();
                conns.a.removeEdge(edge);
                if (conns.a !== conns.b) {
                    conns.b.removeEdge(edge);
                }
                delete this._und_edges[edge.getID()];
                this._nr_und_edges -= 1;
            }
            node.clearUndEdges();
            this.updateGraphMode();
        };
        BaseGraph.prototype.deleteAllEdgesOf = function (node) {
            this.deleteDirEdgesOf(node);
            this.deleteUndEdgesOf(node);
        };
        BaseGraph.prototype.clearAllDirEdges = function () {
            for (var edge in this._dir_edges) {
                this.deleteEdge(this._dir_edges[edge]);
            }
        };
        BaseGraph.prototype.clearAllUndEdges = function () {
            for (var edge in this._und_edges) {
                this.deleteEdge(this._und_edges[edge]);
            }
        };
        BaseGraph.prototype.clearAllEdges = function () {
            this.clearAllDirEdges();
            this.clearAllUndEdges();
        };
        BaseGraph.prototype.getRandomDirEdge = function () {
            return this.pickRandomProperty(this._dir_edges);
        };
        BaseGraph.prototype.getRandomUndEdge = function () {
            return this.pickRandomProperty(this._und_edges);
        };
        BaseGraph.prototype.cloneStructure = function () {
            var new_graph = new BaseGraph(this._label), old_nodes = this.getNodes(), old_edge, new_node_a = null, new_node_b = null;
            for (var node_id in old_nodes) {
                new_graph.addNode(old_nodes[node_id].clone());
            }
            [this.getDirEdges(), this.getUndEdges()].forEach(function (old_edges) {
                for (var edge_id in old_edges) {
                    old_edge = old_edges[edge_id];
                    new_node_a = new_graph.getNodeById(old_edge.getNodes().a.getID());
                    new_node_b = new_graph.getNodeById(old_edge.getNodes().b.getID());
                    new_graph.addEdge(old_edge.clone(new_node_a, new_node_b));
                }
            });
            return new_graph;
        };
        BaseGraph.prototype.cloneSubGraphStructure = function (root, cutoff) {
            var new_graph = new BaseGraph(this._label);
            var config = BFS_1.prepareBFSStandardConfig();
            var bfsNodeUnmarkedTestCallback = function (context) {
                if (config.result[context.next_node.getID()].counter > cutoff) {
                    context.queue = [];
                }
                else {
                    new_graph.addNode(context.next_node.clone());
                }
            };
            config.callbacks.node_unmarked.push(bfsNodeUnmarkedTestCallback);
            BFS_1.BFS(this, root, config);
            var old_edge, new_node_a = null, new_node_b = null;
            [this.getDirEdges(), this.getUndEdges()].forEach(function (old_edges) {
                for (var edge_id in old_edges) {
                    old_edge = old_edges[edge_id];
                    new_node_a = new_graph.getNodeById(old_edge.getNodes().a.getID());
                    new_node_b = new_graph.getNodeById(old_edge.getNodes().b.getID());
                    if (new_node_a != null && new_node_b != null)
                        new_graph.addEdge(old_edge.clone(new_node_a, new_node_b));
                }
            });
            return new_graph;
        };
        BaseGraph.prototype.checkConnectedNodeOrThrow = function (node) {
            var inGraphNode = this._nodes[node.getID()];
            if (!inGraphNode) {
                throw new Error('Cowardly refusing to delete edges of a foreign node.');
            }
        };
        BaseGraph.prototype.updateGraphMode = function () {
            var nr_dir = this._nr_dir_edges, nr_und = this._nr_und_edges;
            if (nr_dir && nr_und) {
                this._mode = interfaces.GraphMode.MIXED;
            }
            else if (nr_dir) {
                this._mode = interfaces.GraphMode.DIRECTED;
            }
            else if (nr_und) {
                this._mode = interfaces.GraphMode.UNDIRECTED;
            }
            else {
                this._mode = interfaces.GraphMode.INIT;
            }
        };
        BaseGraph.prototype.pickRandomProperty = function (propList) {
            var tmpList = Object.keys(propList);
            var randomPropertyName = tmpList[Math.floor(Math.random() * tmpList.length)];
            return propList[randomPropertyName];
        };
        BaseGraph.prototype.pickRandomProperties = function (propList, amount) {
            var ids = [];
            var keys = Object.keys(propList);
            var fraction = amount / keys.length;
            var used_keys = {};
            for (var i = 0; ids.length < amount && i < keys.length; i++) {
                if (Math.random() < fraction) {
                    ids.push(keys[i]);
                    used_keys[keys[i]] = i;
                }
            }
            var diff = amount - ids.length;
            for (var i = 0; i < keys.length && diff; i++) {
                if (used_keys[keys[i]] == null) {
                    ids.push(keys[i]);
                    diff--;
                }
            }
            return ids;
        };
        return BaseGraph;
    }());
    exports.BaseGraph = BaseGraph;
    });

    unwrapExports(BaseGraph_1);
    var BaseGraph_2 = BaseGraph_1.BaseGraph;

    var TypedEdge_1 = createCommonjsModule(function (module, exports) {
    var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });


    var TypedEdge = (function (_super) {
        __extends(TypedEdge, _super);
        function TypedEdge(_id, _node_a, _node_b, config) {
            if (config === void 0) { config = {}; }
            var _this = _super.call(this, _id, _node_a, _node_b, config) || this;
            _this._id = _id;
            _this._node_a = _node_a;
            _this._node_b = _node_b;
            _this._type = config.type || run_config.GENERIC_TYPES.Edge;
            return _this;
        }
        Object.defineProperty(TypedEdge.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        return TypedEdge;
    }(BaseEdge_1.BaseEdge));
    exports.TypedEdge = TypedEdge;
    });

    unwrapExports(TypedEdge_1);
    var TypedEdge_2 = TypedEdge_1.TypedEdge;

    var TypedNode_1 = createCommonjsModule(function (module, exports) {
    var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });


    var TypedNode = (function (_super) {
        __extends(TypedNode, _super);
        function TypedNode(_id, config) {
            var _a;
            if (config === void 0) { config = {}; }
            var _this = _super.call(this, _id, config) || this;
            _this._id = _id;
            _this._type = config.type || run_config.GENERIC_TYPES.Node;
            _this._typedAdjSets = (_a = {},
                _a[run_config.GENERIC_TYPES.Edge] = {
                    ins: new Set(),
                    outs: new Set(),
                    conns: new Set()
                },
                _a);
            return _this;
        }
        Object.defineProperty(TypedNode.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypedNode.prototype, "stats", {
            get: function () {
                var e_1, _a;
                var result = {
                    typed_edges: {}
                };
                try {
                    for (var _b = __values(Object.keys(this._typedAdjSets)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var type = _c.value;
                        result.typed_edges[type] = { ins: 0, outs: 0, conns: 0 };
                        result.typed_edges[type].ins = this._typedAdjSets[type].ins ? this._typedAdjSets[type].ins.size : 0;
                        result.typed_edges[type].outs = this._typedAdjSets[type].outs ? this._typedAdjSets[type].outs.size : 0;
                        result.typed_edges[type].conns = this._typedAdjSets[type].conns ? this._typedAdjSets[type].conns.size : 0;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        TypedNode.prototype.addEdge = function (edge) {
            if (!_super.prototype.addEdge.call(this, edge)) {
                return null;
            }
            var type = edge.type || run_config.GENERIC_TYPES.Edge;
            var dir = edge.isDirected();
            var uid = this.uniqueNID(edge);
            if (!this._typedAdjSets[type]) {
                this._typedAdjSets[type] = {};
            }
            if (!dir) {
                if (!this._typedAdjSets[type].conns) {
                    this._typedAdjSets[type].conns = new Set();
                }
                this._typedAdjSets[type].conns.add(uid);
            }
            else if (edge.getNodes().a === this) {
                if (!this._typedAdjSets[type].outs) {
                    this._typedAdjSets[type].outs = new Set();
                }
                this._typedAdjSets[type].outs.add(uid);
            }
            else {
                if (!this._typedAdjSets[type].ins) {
                    this._typedAdjSets[type].ins = new Set();
                }
                this._typedAdjSets[type].ins.add(uid);
            }
            return edge;
        };
        TypedNode.prototype.removeEdge = function (edge) {
            _super.prototype.removeEdge.call(this, edge);
            var type = edge.type || run_config.GENERIC_TYPES.Edge;
            var dir = edge.isDirected();
            var uid = this.uniqueNID(edge);
            if (!dir) {
                this._typedAdjSets[type].conns.delete(uid);
            }
            else if (edge.getNodes().a === this) {
                this._typedAdjSets[type].outs.delete(uid);
            }
            else {
                this._typedAdjSets[type].ins.delete(uid);
            }
            if (type !== run_config.GENERIC_TYPES.Edge && this.noEdgesOfTypeLeft(type)) {
                delete this._typedAdjSets[type];
            }
        };
        TypedNode.prototype.ins = function (type) {
            return this._typedAdjSets[type] ? this._typedAdjSets[type].ins : undefined;
        };
        TypedNode.prototype.outs = function (type) {
            return this._typedAdjSets[type] ? this._typedAdjSets[type].outs : undefined;
        };
        TypedNode.prototype.unds = function (type) {
            return this._typedAdjSets[type] ? this._typedAdjSets[type].conns : undefined;
        };
        TypedNode.prototype.all = function (type) {
            var result = new Set();
            if (this._typedAdjSets[type]) {
                this._typedAdjSets[type].ins && result.add(__spread(this._typedAdjSets[type].ins));
                this._typedAdjSets[type].outs && result.add(__spread(this._typedAdjSets[type].outs));
                this._typedAdjSets[type].conns && result.add(__spread(this._typedAdjSets[type].conns));
            }
            return result;
        };
        TypedNode.prototype.uniqueNID = function (e) {
            var _a = e.getNodes(), a = _a.a, b = _a.b;
            var node = a === this ? b : a;
            var string = node.id + "#" + e.id + "#";
            string += e.isWeighted() ? 'w#' + e.getWeight() : 'u';
            return string;
        };
        TypedNode.nIDFromUID = function (uid) {
            return uid.split('#')[0];
        };
        TypedNode.prototype.noEdgesOfTypeLeft = function (type) {
            return (!this._typedAdjSets[type].ins || !this._typedAdjSets[type].ins.size)
                && (!this._typedAdjSets[type].outs || !this._typedAdjSets[type].outs.size)
                && (!this._typedAdjSets[type].conns || !this._typedAdjSets[type].conns.size);
        };
        return TypedNode;
    }(BaseNode_1.BaseNode));
    exports.TypedNode = TypedNode;
    });

    unwrapExports(TypedNode_1);
    var TypedNode_2 = TypedNode_1.TypedNode;

    var TypedGraph_1 = createCommonjsModule(function (module, exports) {
    var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });







    var TypedGraph = (function (_super) {
        __extends(TypedGraph, _super);
        function TypedGraph(_label) {
            var _this = _super.call(this, _label) || this;
            _this._label = _label;
            _this._typedNodes = new Map();
            _this._typedEdges = new Map();
            _this._type = run_config.GENERIC_TYPES.Graph;
            _this._typedNodes.set(run_config.GENERIC_TYPES.Node, new Map());
            _this._typedEdges.set(run_config.GENERIC_TYPES.Edge, new Map());
            return _this;
        }
        TypedGraph.prototype.n = function (id) {
            return this.getNodeById(id);
        };
        Object.defineProperty(TypedGraph.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        TypedGraph.prototype.nodeTypes = function () {
            return Array.from(this._typedNodes.keys());
        };
        TypedGraph.prototype.edgeTypes = function () {
            return Array.from(this._typedEdges.keys());
        };
        TypedGraph.prototype.nrTypedNodes = function (type) {
            type = type.toUpperCase();
            return this._typedNodes.get(type) ? this._typedNodes.get(type).size : null;
        };
        TypedGraph.prototype.nrTypedEdges = function (type) {
            type = type.toUpperCase();
            return this._typedEdges.get(type) ? this._typedEdges.get(type).size : null;
        };
        TypedGraph.prototype.ins = function (node, type) {
            var _this = this;
            return new Set(__spread(node.ins(type)).map(function (uid) { return _this.n(TypedNode_1.TypedNode.nIDFromUID(uid)); }));
        };
        TypedGraph.prototype.outs = function (node, type) {
            var _this = this;
            return new Set(__spread(node.outs(type)).map(function (uid) { return _this.n(TypedNode_1.TypedNode.nIDFromUID(uid)); }));
        };
        TypedGraph.prototype.unds = function (node, type) {
            var _this = this;
            return new Set(__spread(node.unds(type)).map(function (uid) { return _this.n(TypedNode_1.TypedNode.nIDFromUID(uid)); }));
        };
        TypedGraph.prototype.expand = function (input, dir, type) {
            var e_1, _a, e_2, _b;
            var nodes = BaseNode_1.BaseNode.isTyped(input) ? new Set([input]) : input;
            var resultSet = new Set();
            var nodeRef;
            try {
                for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    var targets = node[dir](type);
                    if (!targets) {
                        continue;
                    }
                    try {
                        for (var targets_1 = __values(targets), targets_1_1 = targets_1.next(); !targets_1_1.done; targets_1_1 = targets_1.next()) {
                            var target = targets_1_1.value;
                            nodeRef = this.n(TypedNode_1.TypedNode.nIDFromUID(target));
                            resultSet.add(nodeRef);
                            if (resultSet.size >= this._nr_nodes) {
                                return resultSet;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (targets_1_1 && !targets_1_1.done && (_b = targets_1.return)) _b.call(targets_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return resultSet;
        };
        TypedGraph.prototype.expandK = function (input, dir, type, k) {
            var e_3, _a;
            if (k < 0) {
                throw new Error('cowardly refusing to expand a negative number of steps.');
            }
            var nodes = BaseNode_1.BaseNode.isTyped(input) ? new Set([input]) : input;
            var resultSet = new Set();
            var periphery = nodes;
            k = k || this._nr_nodes - 1;
            while (k-- || resultSet.size >= this._nr_nodes) {
                periphery = this.expand(periphery, dir, type);
                var old_size = resultSet.size;
                try {
                    for (var periphery_1 = __values(periphery), periphery_1_1 = periphery_1.next(); !periphery_1_1.done; periphery_1_1 = periphery_1.next()) {
                        var target = periphery_1_1.value;
                        resultSet.add(target);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (periphery_1_1 && !periphery_1_1.done && (_a = periphery_1.return)) _a.call(periphery_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (old_size === resultSet.size) {
                    break;
                }
            }
            return resultSet;
        };
        TypedGraph.prototype.peripheryAtK = function (input, dir, type, k) {
            if (k < 0) {
                throw new Error('cowardly refusing to expand a negative number of steps.');
            }
            var nodes = BaseNode_1.BaseNode.isTyped(input) ? new Set([input]) : input;
            var resultSet = new Set();
            var periphery = nodes;
            k = k || this._nr_nodes - 1;
            while (k-- || resultSet.size >= this._nr_nodes) {
                periphery = this.expand(periphery, dir, type);
            }
            return periphery;
        };
        TypedGraph.prototype.inHistT = function (nType, eType) {
            return this.degreeHistT(interfaces.DIR.in, nType, eType);
        };
        TypedGraph.prototype.outHistT = function (nType, eType) {
            return this.degreeHistT(interfaces.DIR.out, nType, eType);
        };
        TypedGraph.prototype.connHistT = function (nType, eType) {
            return this.degreeHistT(interfaces.DIR.und, nType, eType);
        };
        TypedGraph.prototype.degreeHistT = function (dir, nType, eType) {
            var e_4, _a;
            var result = [];
            try {
                for (var _b = __values(this._typedNodes.get(nType)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), node_id = _d[0], node = _d[1];
                    var deg = void 0;
                    switch (dir) {
                        case interfaces.DIR.in:
                            deg = node.ins(eType) ? node.ins(eType).size : 0;
                            break;
                        case interfaces.DIR.out:
                            deg = node.outs(eType) ? node.outs(eType).size : 0;
                            break;
                        default:
                            deg = node.unds(eType) ? node.unds(eType).size : 0;
                    }
                    if (!result[deg]) {
                        result[deg] = new Set([node]);
                    }
                    else {
                        result[deg].add(node);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return result;
        };
        TypedGraph.prototype.addNodeByID = function (id, opts) {
            if (this.hasNodeID(id)) {
                throw new Error("Won't add node with duplicate ID.");
            }
            var node = new TypedNode_1.TypedNode(id, opts);
            return this.addNode(node) ? node : null;
        };
        TypedGraph.prototype.addNode = function (node) {
            if (!_super.prototype.addNode.call(this, node)) {
                return null;
            }
            var id = node.getID(), type = node.type ? node.type.toUpperCase() : null;
            if (!type) {
                this._typedNodes.get(run_config.GENERIC_TYPES.Node).set(id, node);
            }
            else {
                if (!this._typedNodes.get(type)) {
                    this._typedNodes.set(type, new Map());
                }
                this._typedNodes.get(type).set(id, node);
            }
            return node;
        };
        TypedGraph.prototype.getNodeById = function (id) {
            return _super.prototype.getNodeById.call(this, id);
        };
        TypedGraph.prototype.getNodesT = function (type) {
            return this._typedNodes.get(type.toUpperCase());
        };
        TypedGraph.prototype.getEdgesT = function (type) {
            return this._typedEdges.get(type.toUpperCase());
        };
        TypedGraph.prototype.deleteNode = function (node) {
            var id = node.getID(), type = node.type ? node.type.toUpperCase() : run_config.GENERIC_TYPES.Node;
            if (!this._typedNodes.get(type)) {
                throw Error('Node type does not exist on this TypedGraph.');
            }
            var removeNode = this._typedNodes.get(type).get(id);
            if (!removeNode) {
                throw Error('This particular node is nowhere to be found in its typed set.');
            }
            this._typedNodes.get(type).delete(id);
            if (this.nrTypedNodes(type) === 0) {
                this._typedNodes.delete(type);
            }
            _super.prototype.deleteNode.call(this, node);
        };
        TypedGraph.prototype.addEdgeByID = function (id, a, b, opts) {
            var edge = new TypedEdge_1.TypedEdge(id, a, b, opts || {});
            return this.addEdge(edge);
        };
        TypedGraph.prototype.addEdge = function (edge) {
            if (!_super.prototype.addEdge.call(this, edge)) {
                return null;
            }
            var id = edge.getID();
            var type = run_config.GENERIC_TYPES.Edge;
            if (BaseEdge_1.BaseEdge.isTyped(edge) && edge.type) {
                type = edge.type.toUpperCase();
            }
            if (id === type) {
                this._typedEdges.get(run_config.GENERIC_TYPES.Edge).set(id, edge);
            }
            else {
                if (!this._typedEdges.get(type)) {
                    this._typedEdges.set(type, new Map());
                }
                this._typedEdges.get(type).set(id, edge);
            }
            return edge;
        };
        TypedGraph.prototype.deleteEdge = function (edge) {
            var id = edge.getID();
            var type = run_config.GENERIC_TYPES.Edge;
            if (BaseEdge_1.BaseEdge.isTyped(edge) && edge.type) {
                type = edge.type.toUpperCase();
            }
            if (!this._typedEdges.get(type)) {
                throw Error('Edge type does not exist on this TypedGraph.');
            }
            var removeEdge = this._typedEdges.get(type).get(id);
            if (!removeEdge) {
                throw Error('This particular edge is nowhere to be found in its typed set.');
            }
            this._typedEdges.get(type).delete(id);
            if (this.nrTypedEdges(type) === 0) {
                this._typedEdges.delete(type);
            }
            _super.prototype.deleteEdge.call(this, edge);
        };
        TypedGraph.prototype.getStats = function () {
            var typed_nodes = {}, typed_edges = {};
            this._typedNodes.forEach(function (k, v) { return typed_nodes[v] = k.size; });
            this._typedEdges.forEach(function (k, v) { return typed_edges[v] = k.size; });
            return __assign({}, _super.prototype.getStats.call(this), { typed_nodes: typed_nodes,
                typed_edges: typed_edges });
        };
        return TypedGraph;
    }(BaseGraph_1.BaseGraph));
    exports.TypedGraph = TypedGraph;
    });

    unwrapExports(TypedGraph_1);
    var TypedGraph_2 = TypedGraph_1.TypedGraph;

    var FloydWarshall = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function FloydWarshallAPSP(graph) {
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error("Cowardly refusing to traverse graph without edges.");
        }
        var cg = new ComputeGraph_1.ComputeGraph(graph);
        var dists = cg.adjMatrixW();
        var next = cg.nextArray();
        var N = dists.length;
        for (var k = 0; k < N; ++k) {
            for (var i = 0; i < N; ++i) {
                for (var j = 0; j < N; ++j) {
                    if (k != i && k != j && i != j && dists[i][j] == (dists[i][k] + dists[k][j])) {
                        if (dists[i][j] !== Number.POSITIVE_INFINITY) {
                            next[i][j] = StructUtils.mergeOrderedArraysNoDups(next[i][j], next[i][k]);
                        }
                    }
                    if (k != i && k != j && i != j && dists[i][j] > dists[i][k] + dists[k][j]) {
                        next[i][j] = next[i][k].slice(0);
                        dists[i][j] = dists[i][k] + dists[k][j];
                    }
                }
            }
        }
        return [dists, next];
    }
    exports.FloydWarshallAPSP = FloydWarshallAPSP;
    function FloydWarshallArray(graph) {
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error("Cowardly refusing to traverse graph without edges.");
        }
        var cg = new ComputeGraph_1.ComputeGraph(graph);
        var dists = cg.adjMatrixW();
        var N = dists.length;
        for (var k = 0; k < N; ++k) {
            for (var i = 0; i < N; ++i) {
                for (var j = 0; j < N; ++j) {
                    if (k != i && k != j && i != j && dists[i][j] > dists[i][k] + dists[k][j]) {
                        dists[i][j] = dists[i][k] + dists[k][j];
                    }
                }
            }
        }
        return dists;
    }
    exports.FloydWarshallArray = FloydWarshallArray;
    function changeNextToDirectParents(input) {
        var output = [];
        for (var a = 0; a < input.length; a++) {
            output.push([]);
            for (var b = 0; b < input.length; b++) {
                output[a].push([]);
                output[a][b] = input[a][b];
            }
        }
        for (var a = 0; a < input.length; a++) {
            for (var b = 0; b < input.length; b++) {
                if (input[a][b][0] != null
                    && a != b && !(input[a][b].length === 1
                    && input[a][b][0] === b)) {
                    output[a][b] = [];
                    findDirectParents(a, b, input, output);
                }
            }
        }
        return output;
    }
    exports.changeNextToDirectParents = changeNextToDirectParents;
    function findDirectParents(u, v, inNext, outNext) {
        var nodesInTracking = [u];
        var counter = 0;
        while (nodesInTracking.length > 0) {
            var currNode = nodesInTracking.pop();
            if (currNode == u && counter > 0) {
                continue;
            }
            else {
                for (var e = 0; e < inNext[currNode][v].length; e++) {
                    if (inNext[currNode][v][e] == v && counter == 0) {
                        outNext[u][v] = StructUtils.mergeOrderedArraysNoDups(outNext[u][v], [v]);
                    }
                    else if (inNext[currNode][v][e] == v) {
                        outNext[u][v] = StructUtils.mergeOrderedArraysNoDups(outNext[u][v], [currNode]);
                    }
                    else {
                        nodesInTracking = StructUtils.mergeOrderedArraysNoDups(nodesInTracking, [inNext[currNode][v][e]]);
                    }
                }
            }
            counter++;
        }
    }
    });

    unwrapExports(FloydWarshall);
    var FloydWarshall_1 = FloydWarshall.FloydWarshallAPSP;
    var FloydWarshall_2 = FloydWarshall.FloydWarshallArray;
    var FloydWarshall_3 = FloydWarshall.changeNextToDirectParents;

    var Betweenness = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    function betweennessCentrality(graph, directed, sparse) {
        var paths;
        sparse = sparse || false;
        if (sparse) {
            paths = Johnsons_1.Johnsons(graph)[1];
        }
        else {
            paths = FloydWarshall.changeNextToDirectParents(FloydWarshall.FloydWarshallAPSP(graph)[1]);
        }
        var nodes = graph.getNodes();
        var nodeKeys = Object.keys(nodes);
        var map = {};
        for (var key in nodes) {
            map[key] = 0;
        }
        var N = paths.length;
        for (var a = 0; a < N; ++a) {
            for (var b = 0; b < N; ++b) {
                if (a != b && !(paths[a][b].length == 1 && paths[a][b][0] == b) && paths[a][b][0] != null) {
                    var tempMap = {};
                    var leadArray = [];
                    var pathCount = 0;
                    do {
                        var tracer = b;
                        var leadCounter = 0;
                        pathCount++;
                        while (true) {
                            var previous = paths[a][tracer];
                            var terminate = false;
                            if (previous.length == 1 && previous[0] == tracer) {
                                break;
                            }
                            else if (previous.length == 1) {
                                tracer = previous[0];
                                tracer in tempMap ? tempMap[tracer] += 1 : tempMap[tracer] = 1;
                            }
                            if (previous.length > 1) {
                                if (leadArray.length == 0) {
                                    leadArray.push([0, previous.length]);
                                    if (previous[0] == tracer) {
                                        terminate = true;
                                    }
                                    else {
                                        tracer = previous[0];
                                        tracer in tempMap ? tempMap[tracer] += 1 : tempMap[tracer] = 1;
                                    }
                                    leadCounter++;
                                }
                                else if (leadCounter < leadArray.length) {
                                    var choice = leadArray[leadCounter][0];
                                    if (previous[choice] == tracer) {
                                        terminate = true;
                                    }
                                    else {
                                        tracer = previous[choice];
                                        tracer in tempMap ? tempMap[tracer] += 1 : tempMap[tracer] = 1;
                                    }
                                    leadCounter++;
                                }
                                else {
                                    leadArray.push([0, previous.length]);
                                    if (previous[0] == tracer) {
                                        terminate = true;
                                    }
                                    else {
                                        tracer = previous[0];
                                        tracer in tempMap ? tempMap[tracer] += 1 : tempMap[tracer] = 1;
                                    }
                                    leadCounter++;
                                }
                            }
                            if (terminate) {
                                break;
                            }
                        }
                        if (leadArray.length > 0) {
                            leadArray[leadArray.length - 1][0]++;
                            while (leadArray[leadArray.length - 1][0] == leadArray[leadArray.length - 1][1]) {
                                leadArray.splice(leadArray.length - 1, 1);
                                if (leadArray.length == 0) {
                                    break;
                                }
                                leadArray[leadArray.length - 1][0]++;
                            }
                        }
                    } while (leadArray.length != 0);
                    for (var key in tempMap) {
                        var mapKey = nodeKeys[key];
                        map[mapKey] += tempMap[key] / pathCount;
                    }
                }
            }
        }
        return map;
    }
    exports.betweennessCentrality = betweennessCentrality;
    });

    unwrapExports(Betweenness);
    var Betweenness_1 = Betweenness.betweennessCentrality;

    var Brandes_1 = createCommonjsModule(function (module, exports) {
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });






    var Brandes = (function () {
        function Brandes(_graph) {
            this._graph = _graph;
            this._cg = new ComputeGraph_1.ComputeGraph(this._graph);
        }
        Brandes.prototype.computeUnweighted = function (normalize, directed) {
            if (normalize === void 0) { normalize = false; }
            if (directed === void 0) { directed = false; }
            var e_1, _a;
            if (this._graph.nrDirEdges() === 0 && this._graph.nrUndEdges() === 0) {
                throw new Error("Cowardly refusing to traverse graph without edges.");
            }
            var nodes = this._graph.getNodes();
            var adjList = this._cg.adjListW();
            var s, v, w, Pred = {}, sigma = {}, delta = {}, dist = {}, Q = [], S = [], CB = {};
            var closedNodes = {};
            for (var n in nodes) {
                var node_id = nodes[n].getID();
                CB[node_id] = 0;
                dist[node_id] = Number.POSITIVE_INFINITY;
                sigma[node_id] = 0;
                delta[node_id] = 0;
                Pred[node_id] = [];
                closedNodes[node_id] = false;
            }
            for (var i in nodes) {
                s = nodes[i];
                var id = s.getID();
                dist[id] = 0;
                sigma[id] = 1;
                Q.push(id);
                closedNodes[id] = true;
                while (Q.length) {
                    v = Q.shift();
                    S.push(v);
                    var neighbors = adjList[v];
                    closedNodes[v] = true;
                    for (var w_1 in neighbors) {
                        if (closedNodes[w_1]) {
                            continue;
                        }
                        if (dist[w_1] === Number.POSITIVE_INFINITY) {
                            Q.push(w_1);
                            dist[w_1] = dist[v] + 1;
                        }
                        if (dist[w_1] === dist[v] + 1) {
                            sigma[w_1] += sigma[v];
                            Pred[w_1].push(v);
                        }
                    }
                }
                while (S.length >= 1) {
                    w = S.pop();
                    try {
                        for (var _b = __values(Pred[w]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var parent_1 = _c.value;
                            delta[parent_1] += (sigma[parent_1] / sigma[w] * (1 + delta[w]));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (w != s.getID()) {
                        CB[w] += delta[w];
                    }
                    sigma[w] = 0;
                    delta[w] = 0;
                    dist[w] = Number.POSITIVE_INFINITY;
                    Pred[w] = [];
                    closedNodes[w] = false;
                }
            }
            if (normalize) {
                this.normalizeScores(CB, this._graph.nrNodes(), directed);
            }
            return CB;
        };
        Brandes.prototype.computeWeighted = function (normalize, directed) {
            var e_2, _a;
            if (this._graph.nrDirEdges() === 0 && this._graph.nrUndEdges() === 0) {
                throw new Error("Cowardly refusing to traverse graph without edges.");
            }
            if (this._graph.hasNegativeEdge()) {
                var extraNode = new BaseNode_1.BaseNode("extraNode");
                var graph = Johnsons_1.addExtraNandE(this._graph, extraNode);
                var BFresult = BellmanFord.BellmanFordDict(graph, extraNode);
                if (BFresult.neg_cycle) {
                    throw new Error("The graph contains a negative cycle, thus it can not be processed");
                }
                else {
                    var newWeights = BFresult.distances;
                    graph = Johnsons_1.reWeighGraph(graph, newWeights, extraNode);
                    graph.deleteNode(extraNode);
                }
                this._graph = graph;
            }
            var nodes = this._graph.getNodes();
            var N = Object.keys(nodes).length;
            var adjList = this._cg.adjListW();
            var evalPriority = function (nb) { return nb.best; };
            var evalObjID = function (nb) { return nb.id; };
            var s, v, w, Pred = {}, sigma = {}, delta = {}, dist = {}, S = [], CB = {}, closedNodes = {}, Q = new BinaryHeap_1.BinaryHeap(BinaryHeap_1.BinaryHeapMode.MIN, evalPriority, evalObjID);
            for (var n in nodes) {
                var currID = nodes[n].getID();
                CB[currID] = 0;
                dist[currID] = Number.POSITIVE_INFINITY;
                sigma[currID] = 0;
                delta[currID] = 0;
                Pred[currID] = [];
                closedNodes[currID] = false;
            }
            for (var i in nodes) {
                s = nodes[i];
                var id_s = s.getID();
                dist[id_s] = 0;
                sigma[id_s] = 1;
                var source = { id: id_s, best: 0 };
                Q.insert(source);
                closedNodes[id_s] = true;
                while (Q.size() > 0) {
                    v = Q.pop();
                    var current_id = v.id;
                    S.push(current_id);
                    closedNodes[current_id] = true;
                    var neighbors = adjList[current_id];
                    for (var w_2 in neighbors) {
                        if (closedNodes[w_2]) {
                            continue;
                        }
                        var new_dist = dist[current_id] + neighbors[w_2];
                        var nextNode = { id: w_2, best: dist[w_2] };
                        if (dist[w_2] > new_dist) {
                            if (isFinite(dist[w_2])) {
                                var x = Q.remove(nextNode);
                                nextNode.best = new_dist;
                                Q.insert(nextNode);
                            }
                            else {
                                nextNode.best = new_dist;
                                Q.insert(nextNode);
                            }
                            sigma[w_2] = 0;
                            dist[w_2] = new_dist;
                            Pred[w_2] = [];
                        }
                        if (dist[w_2] === new_dist) {
                            sigma[w_2] += sigma[current_id];
                            Pred[w_2].push(current_id);
                        }
                    }
                }
                while (S.length >= 1) {
                    w = S.pop();
                    try {
                        for (var _b = __values(Pred[w]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var parent_2 = _c.value;
                            delta[parent_2] += (sigma[parent_2] / sigma[w] * (1 + delta[w]));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (w != s.getID()) {
                        CB[w] += delta[w];
                    }
                    sigma[w] = 0;
                    delta[w] = 0;
                    dist[w] = Number.POSITIVE_INFINITY;
                    Pred[w] = [];
                    closedNodes[w] = false;
                }
            }
            if (normalize) {
                this.normalizeScores(CB, N, directed);
            }
            return CB;
        };
        Brandes.prototype.computePFSbased = function (normalize, directed) {
            var e_3, _a;
            var nodes = this._graph.getNodes();
            var adjList = this._cg.adjListW();
            var Pred = {}, sigma = {}, delta = {}, S = [], CB = {};
            for (var n in nodes) {
                var currID = nodes[n].getID();
                CB[currID] = 0;
                sigma[currID] = 0;
                delta[currID] = 0;
                Pred[currID] = [];
            }
            var specialConfig = PFS_1.preparePFSStandardConfig();
            var notEncounteredBrandes = function (context) {
                context.next.best =
                    context.current.best + (isNaN(context.next.edge.getWeight()) ? PFS_1.DEFAULT_WEIGHT : context.next.edge.getWeight());
                var next_id = context.next.node.getID();
                var current_id = context.current.node.getID();
                Pred[next_id] = [current_id];
                sigma[next_id] += sigma[current_id];
            };
            specialConfig.callbacks.not_encountered.splice(0, 1, notEncounteredBrandes);
            var newCurrentBrandes = function (context) {
                S.push(context.current.node.getID());
            };
            specialConfig.callbacks.new_current.push(newCurrentBrandes);
            var betterPathBrandes = function (context) {
                var next_id = context.next.node.getID();
                var current_id = context.current.node.getID();
                sigma[next_id] = 0;
                sigma[next_id] += sigma[current_id];
                Pred[next_id] = [];
                Pred[next_id].push(current_id);
            };
            specialConfig.callbacks.better_path.splice(0, 1, betterPathBrandes);
            var equalPathBrandes = function (context) {
                var next_id = context.next.node.getID();
                var current_id = context.current.node.getID();
                sigma[next_id] += sigma[current_id];
                if (Pred[next_id].indexOf(current_id) === -1) {
                    Pred[next_id].push(current_id);
                }
            };
            specialConfig.callbacks.equal_path.push(equalPathBrandes);
            for (var i in nodes) {
                var s = nodes[i];
                sigma[s.getID()] = 1;
                PFS_1.PFS(this._graph, s, specialConfig);
                while (S.length >= 1) {
                    var w = S.pop();
                    try {
                        for (var _b = __values(Pred[w]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var parent_3 = _c.value;
                            delta[parent_3] += (sigma[parent_3] / sigma[w] * (1 + delta[w]));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    if (w != s.getID()) {
                        CB[w] += delta[w];
                    }
                    sigma[w] = 0;
                    delta[w] = 0;
                    Pred[w] = [];
                }
            }
            if (normalize) {
                this.normalizeScores(CB, this._graph.nrNodes(), directed);
            }
            return CB;
        };
        Brandes.prototype.normalizeScores = function (CB, N, directed) {
            var factor = directed ? ((N - 1) * (N - 2)) : ((N - 1) * (N - 2) / 2);
            for (var node in CB) {
                CB[node] /= factor;
            }
        };
        return Brandes;
    }());
    exports.Brandes = Brandes;
    });

    unwrapExports(Brandes_1);
    var Brandes_2 = Brandes_1.Brandes;

    var Closeness = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    var ClosenessCentrality = (function () {
        function ClosenessCentrality() {
        }
        ClosenessCentrality.prototype.getCentralityMapFW = function (graph) {
            var dists = FloydWarshall.FloydWarshallArray(graph);
            var ret = [];
            var N = dists.length;
            for (var a = 0; a < N; ++a) {
                var sum = 0;
                for (var b = 0; b < N; ++b) {
                    if (dists[a][b] != Number.POSITIVE_INFINITY)
                        sum += dists[a][b];
                }
                ret[a] = 1 / sum;
            }
            return ret;
        };
        ClosenessCentrality.prototype.getCentralityMap = function (graph) {
            var pfs_config = PFS_1.preparePFSStandardConfig();
            var accumulated_distance = 0;
            var not_encountered = function (context) {
                accumulated_distance += context.current.best + (isNaN(context.next.edge.getWeight()) ? 1 : context.next.edge.getWeight());
            };
            var betterPathFound = function (context) {
                accumulated_distance -= pfs_config.result[context.next.node.getID()].distance - context.proposed_dist;
            };
            var bp = pfs_config.callbacks.better_path.pop();
            pfs_config.callbacks.better_path.push(betterPathFound);
            pfs_config.callbacks.better_path.push(bp);
            pfs_config.callbacks.not_encountered.push(not_encountered);
            var ret = {};
            for (var key in graph.getNodes()) {
                var node = graph.getNodeById(key);
                if (node != null) {
                    accumulated_distance = 0;
                    PFS_1.PFS(graph, node, pfs_config);
                    ret[key] = 1 / accumulated_distance;
                }
            }
            return ret;
        };
        return ClosenessCentrality;
    }());
    exports.ClosenessCentrality = ClosenessCentrality;
    });

    unwrapExports(Closeness);
    var Closeness_1 = Closeness.ClosenessCentrality;

    var Degree = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var DegreeMode;
    (function (DegreeMode) {
        DegreeMode[DegreeMode["in"] = 0] = "in";
        DegreeMode[DegreeMode["out"] = 1] = "out";
        DegreeMode[DegreeMode["und"] = 2] = "und";
        DegreeMode[DegreeMode["dir"] = 3] = "dir";
        DegreeMode[DegreeMode["all"] = 4] = "all";
    })(DegreeMode = exports.DegreeMode || (exports.DegreeMode = {}));
    var DegreeCentrality = (function () {
        function DegreeCentrality() {
        }
        DegreeCentrality.prototype.getCentralityMap = function (graph, weighted, conf) {
            weighted = (weighted != null) ? !!weighted : true;
            conf = (conf == null) ? DegreeMode.all : conf;
            var ret = {};
            switch (conf) {
                case DegreeMode.in:
                    for (var key in graph.getNodes()) {
                        var node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.in_deg;
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                for (var k in node.inEdges()) {
                                    ret[key] += node.inEdges()[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.out:
                    for (var key in graph.getNodes()) {
                        var node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.out_deg;
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                for (var k in node.outEdges()) {
                                    ret[key] += node.outEdges()[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.und:
                    for (var key in graph.getNodes()) {
                        var node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.deg;
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                for (var k in node.undEdges()) {
                                    ret[key] += node.undEdges()[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.dir:
                    for (var key in graph.getNodes()) {
                        var node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.in_deg + node.out_deg;
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                var comb = StructUtils.mergeObjects([node.inEdges(), node.outEdges()]);
                                for (var k in comb) {
                                    ret[key] += comb[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.all:
                    for (var key in graph.getNodes()) {
                        var node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.deg + node.in_deg + node.out_deg;
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                var comb = StructUtils.mergeObjects([node.inEdges(), node.outEdges(), node.undEdges()]);
                                for (var k in comb) {
                                    ret[key] += comb[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
            }
            return ret;
        };
        DegreeCentrality.prototype.degreeDistribution = function (graph) {
            var max_deg = 0, key, nodes = graph.getNodes(), node, all_deg;
            for (key in nodes) {
                node = nodes[key];
                all_deg = node.in_deg + node.out_deg + node.deg + 1;
                max_deg = all_deg > max_deg ? all_deg : max_deg;
            }
            var deg_dist = {
                in: new Uint32Array(max_deg),
                out: new Uint32Array(max_deg),
                dir: new Uint32Array(max_deg),
                und: new Uint32Array(max_deg),
                all: new Uint32Array(max_deg)
            };
            for (key in nodes) {
                node = nodes[key];
                deg_dist.in[node.in_deg]++;
                deg_dist.out[node.out_deg]++;
                deg_dist.dir[node.in_deg + node.out_deg]++;
                deg_dist.und[node.deg]++;
                deg_dist.all[node.in_deg + node.out_deg + node.deg]++;
            }
            return deg_dist;
        };
        return DegreeCentrality;
    }());
    exports.DegreeCentrality = DegreeCentrality;
    });

    unwrapExports(Degree);
    var Degree_1 = Degree.DegreeMode;
    var Degree_2 = Degree.DegreeCentrality;

    var Pagerank_1 = createCommonjsModule(function (module, exports) {
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    var DEFAULT_WEIGHTED = false;
    var DEFAULT_ALPHA = 0.15;
    var DEFAULT_MAX_ITERATIONS = 1e3;
    var DEFAULT_EPSILON = 1e-6;
    var DEFAULT_NORMALIZE = false;
    var defaultInit = function (graph) { return 1 / graph.nrNodes(); };
    var Pagerank = (function () {
        function Pagerank(_graph, config) {
            this._graph = _graph;
            config = config || {};
            this._weighted = config.weighted || DEFAULT_WEIGHTED;
            this._alpha = config.alpha || DEFAULT_ALPHA;
            this._maxIterations = config.iterations || DEFAULT_MAX_ITERATIONS;
            this._epsilon = config.epsilon || DEFAULT_EPSILON;
            this._normalize = config.normalize || DEFAULT_NORMALIZE;
            this._personalized = config.personalized ? config.personalized : false;
            if (this._personalized && !config.tele_set) {
                throw Error("Personalized Pagerank requires tele_set as a config argument");
            }
            if (config.init_map && Object.keys(config.init_map).length !== this._graph.nrNodes()) {
                throw Error("init_map config parameter must be of size |nodes|");
            }
            this._PRArrayDS = config.PRArrays || {
                curr: [],
                old: [],
                out_deg: [],
                pull: [],
                pull_weight: this._weighted ? [] : null,
                teleport: config.tele_set ? [] : null,
                tele_size: config.tele_set ? 0 : null
            };
            config.PRArrays || this.constructPRArrayDataStructs(config);
        }
        Pagerank.prototype.getConfig = function () {
            return {
                _weighted: this._weighted,
                _alpha: this._alpha,
                _maxIterations: this._maxIterations,
                _epsilon: this._epsilon,
                _normalize: this._normalize,
            };
        };
        Pagerank.prototype.getDSs = function () {
            return this._PRArrayDS;
        };
        Pagerank.prototype.constructPRArrayDataStructs = function (config) {
            var nodes = this._graph.getNodes();
            var i = 0;
            var teleport_prob_sum = 0;
            var init_sum = 0;
            for (var key in nodes) {
                var node = this._graph.getNodeById(key);
                node.setFeature('PR_index', i);
                if (config.init_map) {
                    if (config.init_map[key] == null) {
                        throw Error("initial value must be given for each node in the graph.");
                    }
                    var val = config.init_map[key];
                    this._PRArrayDS.curr[i] = val;
                    this._PRArrayDS.old[i] = val;
                    init_sum += val;
                }
                else {
                    this._PRArrayDS.curr[i] = defaultInit(this._graph);
                    this._PRArrayDS.old[i] = defaultInit(this._graph);
                }
                this._PRArrayDS.out_deg[i] = node.out_deg + node.deg;
                if (this._personalized) {
                    var tele_prob_node = config.tele_set[node.getID()] || 0;
                    this._PRArrayDS.teleport[i] = tele_prob_node;
                    teleport_prob_sum += tele_prob_node;
                    tele_prob_node && this._PRArrayDS.tele_size++;
                }
                ++i;
            }
            if (config.init_map && init_sum !== 1) {
                this._PRArrayDS.curr = this._PRArrayDS.curr.map(function (n) { return n /= init_sum; });
                this._PRArrayDS.old = this._PRArrayDS.old.map(function (n) { return n /= init_sum; });
            }
            if (this._personalized && teleport_prob_sum !== 1) {
                this._PRArrayDS.teleport = this._PRArrayDS.teleport.map(function (n) { return n /= teleport_prob_sum; });
            }
            for (var key in nodes) {
                var node = this._graph.getNodeById(key);
                var node_idx = node.getFeature('PR_index');
                var pull_i = [];
                var pull_weight_i = [];
                var incoming_edges = StructUtils.mergeObjects([node.inEdges(), node.undEdges()]);
                for (var edge_key in incoming_edges) {
                    var edge = incoming_edges[edge_key];
                    var source = edge.getNodes().a;
                    if (edge.getNodes().a.getID() == node.getID()) {
                        source = edge.getNodes().b;
                    }
                    var parent_idx = source.getFeature('PR_index');
                    if (this._weighted) {
                        pull_weight_i.push(edge.getWeight());
                    }
                    pull_i.push(parent_idx);
                }
                this._PRArrayDS.pull[node_idx] = pull_i;
                if (this._weighted) {
                    this._PRArrayDS.pull_weight[node_idx] = pull_weight_i;
                }
            }
        };
        Pagerank.prototype.getRankMapFromArray = function () {
            var result = {};
            var nodes = this._graph.getNodes();
            if (this._normalize) {
                this.normalizePR();
            }
            for (var key in nodes) {
                var node_val = this._PRArrayDS.curr[nodes[key].getFeature('PR_index')];
                result[key] = node_val;
            }
            return result;
        };
        Pagerank.prototype.normalizePR = function () {
            var pr_sum = this._PRArrayDS.curr.reduce(function (i, j) { return i + j; }, 0);
            if (pr_sum !== 1) {
                this._PRArrayDS.curr = this._PRArrayDS.curr.map(function (n) { return n / pr_sum; });
            }
        };
        Pagerank.prototype.pull2DTo1D = function () {
            var e_1, _a;
            var p1d = [];
            var p2d = this._PRArrayDS.pull;
            for (var n in p2d) {
                try {
                    for (var _b = __values(p2d[n]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var i = _c.value;
                        p1d.push(i);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                +n !== p2d.length - 1 && p1d.push(-1);
            }
            return p1d;
        };
        Pagerank.prototype.computePR = function () {
            var e_2, _a;
            var ds = this._PRArrayDS;
            var N = this._graph.nrNodes();
            var visits = 0;
            for (var i = 0; i < this._maxIterations; ++i) {
                var delta_iter = 0.0;
                for (var node in ds.curr) {
                    var pull_rank = 0;
                    visits++;
                    var idx = 0;
                    try {
                        for (var _b = __values(ds.pull[node]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var source = _c.value;
                            visits++;
                            if (ds.out_deg[source] === 0) {
                                throw ('Encountered zero divisor!');
                            }
                            var weight = this._weighted ? ds.pull_weight[node][idx++] : 1.0;
                            pull_rank += ds.old[source] * weight / ds.out_deg[source];
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var link_pr = (1 - this._alpha) * pull_rank;
                    if (this._personalized) {
                        var jump_chance = ds.teleport[node] / ds.tele_size;
                        ds.curr[node] = link_pr + jump_chance;
                    }
                    else {
                        ds.curr[node] = link_pr + this._alpha / N;
                    }
                    delta_iter += Math.abs(ds.curr[node] - ds.old[node]);
                }
                if (delta_iter <= this._epsilon) {
                    return this.getRankMapFromArray();
                }
                ds.old = __spread(ds.curr);
            }
            return this.getRankMapFromArray();
        };
        return Pagerank;
    }());
    exports.Pagerank = Pagerank;
    });

    unwrapExports(Pagerank_1);
    var Pagerank_2 = Pagerank_1.Pagerank;

    var RemoteUtils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    var logger = new Logger_1.Logger();
    var SSL_PORT = '443';
    function retrieveRemoteFile(config, cb) {
        if (typeof cb !== 'function') {
            throw new Error('Provided callback is not a function.');
        }
        logger.log("Requesting file via NodeJS request: " + config.remote_host + config.remote_path + config.file_name);
        var options = {
            host: config.remote_host,
            port: SSL_PORT,
            path: config.remote_path + config.file_name,
            method: 'GET'
        };
        var req = https.get(options, function (response) {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                cb(body);
            });
        });
        req.on('error', function (e) {
            logger.log("Request error: " + e.message);
        });
        return req;
    }
    exports.retrieveRemoteFile = retrieveRemoteFile;
    function checkNodeEnvironment() {
        if (typeof window !== 'undefined') {
            throw new Error('When in Browser, do as the Browsers do! (use fetch and call readFromJSON() directly...) ');
        }
    }
    exports.checkNodeEnvironment = checkNodeEnvironment;
    });

    unwrapExports(RemoteUtils);
    var RemoteUtils_1 = RemoteUtils.retrieveRemoteFile;
    var RemoteUtils_2 = RemoteUtils.checkNodeEnvironment;

    var CSVInput_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });




    var DEFAULT_WEIGHT = 1;
    var CSVInput = (function () {
        function CSVInput(config) {
            if (config === void 0) { config = {}; }
            this._config = {
                separator: config.separator != null ? config.separator : ',',
                explicit_direction: config.explicit_direction != null ? config.explicit_direction : true,
                direction_mode: config.direction_mode != null ? config.direction_mode : false,
                weighted: config.weighted != null ? config.weighted : false
            };
        }
        CSVInput.prototype.readFromAdjacencyListURL = function (config, cb) {
            this.readGraphFromURL(config, cb, this.readFromAdjacencyList);
        };
        CSVInput.prototype.readFromEdgeListURL = function (config, cb) {
            this.readGraphFromURL(config, cb, this.readFromEdgeList);
        };
        CSVInput.prototype.readGraphFromURL = function (config, cb, localFun) {
            var self = this, graph_name = config.file_name, graph;
            RemoteUtils.checkNodeEnvironment();
            RemoteUtils.retrieveRemoteFile(config, function (raw_graph) {
                var input = raw_graph.toString().split('\n');
                graph = localFun.apply(self, [input, graph_name]);
                cb(graph, undefined);
            });
        };
        CSVInput.prototype.readFromAdjacencyListFile = function (filepath) {
            return this.readFileAndReturn(filepath, this.readFromAdjacencyList);
        };
        CSVInput.prototype.readFromEdgeListFile = function (filepath) {
            return this.readFileAndReturn(filepath, this.readFromEdgeList);
        };
        CSVInput.prototype.readFileAndReturn = function (filepath, func) {
            RemoteUtils.checkNodeEnvironment();
            var graph_name = path.basename(filepath);
            var input = fs.readFileSync(filepath).toString().split('\n');
            return func.apply(this, [input, graph_name]);
        };
        CSVInput.prototype.readFromAdjacencyList = function (input, graph_name) {
            var graph = new BaseGraph_1.BaseGraph(graph_name);
            for (var idx in input) {
                var line = input[idx], elements = this._config.separator.match(/\s+/g) ? line.match(/\S+/g) : line.replace(/\s+/g, '').split(this._config.separator), node_id = elements[0], node = void 0, edge_array = elements.slice(1), edge = void 0, target_node_id = void 0, target_node = void 0, dir_char = void 0, directed = void 0, edge_id = void 0, edge_id_u2 = void 0;
                if (!node_id) {
                    continue;
                }
                node = graph.hasNodeID(node_id) ? graph.getNodeById(node_id) : graph.addNodeByID(node_id);
                for (var e = 0; e < edge_array.length;) {
                    if (this._config.explicit_direction && (!edge_array || edge_array.length % 2)) {
                        throw new Error('Every edge entry has to contain its direction info in explicit mode.');
                    }
                    target_node_id = edge_array[e++];
                    target_node = graph.hasNodeID(target_node_id) ? graph.getNodeById(target_node_id) : graph.addNodeByID(target_node_id);
                    dir_char = this._config.explicit_direction ? edge_array[e++] : this._config.direction_mode ? 'd' : 'u';
                    if (dir_char !== 'd' && dir_char !== 'u') {
                        throw new Error("Specification of edge direction invalid (d and u are valid).");
                    }
                    directed = dir_char === 'd';
                    edge_id = node_id + "_" + target_node_id + "_" + dir_char;
                    edge_id_u2 = target_node_id + "_" + node_id + "_" + dir_char;
                    if (graph.hasEdgeID(edge_id) || (!directed && graph.hasEdgeID(edge_id_u2))) {
                        continue;
                    }
                    else {
                        edge = graph.addEdgeByID(edge_id, node, target_node, { directed: directed });
                    }
                }
            }
            return graph;
        };
        CSVInput.prototype.readFromEdgeList = function (input, graph_name, weighted) {
            var graph = new BaseGraph_1.BaseGraph(graph_name);
            for (var idx in input) {
                var line = input[idx], elements = this._config.separator.match(/\s+/g) ? line.match(/\S+/g) : line.replace(/\s+/g, '').split(this._config.separator);
                if (!elements) {
                    continue;
                }
                if (elements.length < 2 || elements.length > 3) {
                    throw new Error('Edge list is in wrong format - every line has to consist of two entries (the 2 nodes)');
                }
                var node_id = elements[0], node = void 0, target_node = void 0, edge = void 0, target_node_id = elements[1], dir_char = this._config.explicit_direction ? elements[2] : this._config.direction_mode ? 'd' : 'u', directed = void 0, edge_id = void 0, edge_id_u2 = void 0, parse_weight = void 0, edge_weight = void 0;
                node = graph.hasNodeID(node_id) ? graph.getNodeById(node_id) : graph.addNodeByID(node_id);
                target_node = graph.hasNodeID(target_node_id) ? graph.getNodeById(target_node_id) : graph.addNodeByID(target_node_id);
                if (dir_char !== 'd' && dir_char !== 'u') {
                    throw new Error("Specification of edge direction invalid (d and u are valid).");
                }
                directed = dir_char === 'd';
                edge_id = node_id + "_" + target_node_id + "_" + dir_char;
                edge_id_u2 = target_node_id + "_" + node_id + "_" + dir_char;
                parse_weight = parseFloat(elements[2]);
                edge_weight = this._config.weighted ? (isNaN(parse_weight) ? DEFAULT_WEIGHT : parse_weight) : null;
                if (graph.hasEdgeID(edge_id) || (!directed && graph.hasEdgeID(edge_id_u2))) {
                    continue;
                }
                else if (this._config.weighted) {
                    edge = graph.addEdgeByID(edge_id, node, target_node, { directed: directed, weighted: true, weight: edge_weight });
                }
                else {
                    edge = graph.addEdgeByID(edge_id, node, target_node, { directed: directed });
                }
            }
            return graph;
        };
        return CSVInput;
    }());
    exports.CSVInput = CSVInput;
    });

    unwrapExports(CSVInput_1);
    var CSVInput_2 = CSVInput_1.CSVInput;

    var CSVOutput_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var CSVOutput = (function () {
        function CSVOutput(config) {
            this._config = config || {
                separator: config && config.separator || ',',
                explicit_direction: config && config.explicit_direction || true,
                direction_mode: config && config.direction_mode || false
            };
        }
        CSVOutput.prototype.writeToAdjacencyListFile = function (filepath, graph) {
            if (typeof window !== 'undefined' && window !== null) {
                throw new Error('cannot write to File inside of Browser');
            }
            fs.writeFileSync(filepath, this.writeToAdjacencyList(graph));
        };
        CSVOutput.prototype.writeToAdjacencyList = function (graph) {
            var graphString = "";
            var nodes = graph.getNodes(), node = null, adj_nodes = null, adj_node = null;
            for (var node_key in nodes) {
                node = nodes[node_key];
                graphString += node.getID();
                adj_nodes = node.reachNodes(this.mergeFunc);
                for (var adj_idx in adj_nodes) {
                    adj_node = adj_nodes[adj_idx].node;
                    graphString += this._config.separator + adj_node.getID();
                }
                graphString += "\n";
            }
            return graphString;
        };
        CSVOutput.prototype.writeToEdgeListFile = function (filepath, graph, weighted) {
            if (weighted === void 0) { weighted = false; }
            if (typeof window !== 'undefined' && window !== null) {
                throw new Error('cannot write to File inside of Browser');
            }
            fs.writeFileSync(filepath, this.writeToEdgeList(graph, weighted));
        };
        CSVOutput.prototype.writeToEdgeList = function (graph, weighted) {
            if (weighted === void 0) { weighted = false; }
            var graphString = "", nodes = graph.getNodes(), node = null, adj_nodes = null, adj_entry, adj_node = null, weight_str;
            for (var node_key in nodes) {
                node = nodes[node_key];
                adj_nodes = node.reachNodes(this.mergeFunc);
                for (var adj_idx in adj_nodes) {
                    adj_entry = adj_nodes[adj_idx];
                    adj_node = adj_entry.node;
                    weight_str = '';
                    if (weighted) {
                        weight_str = this._config.separator;
                        weight_str += adj_entry.edge.isWeighted() ? adj_entry.edge.getWeight() : 1;
                    }
                    graphString += node.getID() + this._config.separator + adj_node.getID() + weight_str + '\n';
                }
            }
            return graphString;
        };
        CSVOutput.prototype.mergeFunc = function (ne) {
            return ne.node.getID();
        };
        return CSVOutput;
    }());
    exports.CSVOutput = CSVOutput;
    });

    unwrapExports(CSVOutput_1);
    var CSVOutput_2 = CSVOutput_1.CSVOutput;

    var interfaces$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.labelKeys = {
        coords: 'c',
        n_label: 'l',
        n_type: 'x',
        n_features: 'f',
        edges: 'e',
        e_to: 't',
        e_dir: 'd',
        e_weight: 'w',
        e_label: 'l',
        e_type: 'y'
    };
    });

    unwrapExports(interfaces$1);
    var interfaces_1$1 = interfaces$1.labelKeys;

    var Dupes = createCommonjsModule(function (module, exports) {
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    var EdgeDupeChecker = (function () {
        function EdgeDupeChecker(_graph) {
            this._graph = _graph;
        }
        EdgeDupeChecker.prototype.isDupe = function (e) {
            var e_1, _a;
            var pds = this.potentialEndpoints(e);
            if (!pds.size) {
                return false;
            }
            try {
                for (var _b = __values(pds.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pd = _c.value;
                    if (!EdgeDupeChecker.checkTypeWeightEquality(e, pd)
                        || !EdgeDupeChecker.typeWeightDupe(e, pd)) {
                        pds.delete(pd);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return !!pds.size;
        };
        EdgeDupeChecker.prototype.potentialEndpoints = function (e) {
            var result = new Set();
            if (e.dir) {
                e.a.nextNodes().forEach(function (ne) {
                    (ne.node === e.b) && result.add(ne.edge);
                });
            }
            else {
                e.a.connNodes().forEach(function (ne) {
                    (ne.node === e.b) && result.add(ne.edge);
                });
            }
            return result;
        };
        EdgeDupeChecker.checkTypeWeightEquality = function (e, oe) {
            return BaseEdge_1.BaseEdge.isTyped(oe) === e.typed && e.weighted === oe.isWeighted();
        };
        EdgeDupeChecker.typeWeightDupe = function (e, oe) {
            var neitherTypedNorWeighted = !e.typed && !e.weighted;
            var notTypedButWeighted = !e.typed && e.weighted;
            var weightEqual = e.weight === oe.getWeight();
            var typeEqual = e.typed && BaseEdge_1.BaseEdge.isTyped(oe) && e.type === oe.type;
            return (neitherTypedNorWeighted || notTypedButWeighted && weightEqual || typeEqual);
        };
        return EdgeDupeChecker;
    }());
    exports.EdgeDupeChecker = EdgeDupeChecker;
    });

    unwrapExports(Dupes);
    var Dupes_1 = Dupes.EdgeDupeChecker;

    var rngBrowser = createCommonjsModule(function (module) {
    // Unique ID creation requires a high quality random # generator.  In the
    // browser this is a little complicated due to unknown quality of Math.random()
    // and inconsistent support for the `crypto` API.  We do the best we can via
    // feature-detection

    // getRandomValues needs to be invoked in a context where "this" is a Crypto
    // implementation. Also, find the complete implementation of crypto on IE11.
    var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                          (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

    if (getRandomValues) {
      // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
      var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var rnds = new Array(16);

      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
          rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }

        return rnds;
      };
    }
    });

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */
    var byteToHex = [];
    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }

    function bytesToUuid(buf, offset) {
      var i = offset || 0;
      var bth = byteToHex;
      // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
      return ([bth[buf[i++]], bth[buf[i++]], 
    	bth[buf[i++]], bth[buf[i++]], '-',
    	bth[buf[i++]], bth[buf[i++]], '-',
    	bth[buf[i++]], bth[buf[i++]], '-',
    	bth[buf[i++]], bth[buf[i++]], '-',
    	bth[buf[i++]], bth[buf[i++]],
    	bth[buf[i++]], bth[buf[i++]],
    	bth[buf[i++]], bth[buf[i++]]]).join('');
    }

    var bytesToUuid_1 = bytesToUuid;

    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html

    var _nodeId;
    var _clockseq;

    // Previous uuid creation time
    var _lastMSecs = 0;
    var _lastNSecs = 0;

    // See https://github.com/broofa/node-uuid for API details
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];

      options = options || {};
      var node = options.node || _nodeId;
      var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

      // node and clockseq need to be initialized to random values if they're not
      // specified.  We do this lazily to minimize issues related to insufficient
      // system entropy.  See #189
      if (node == null || clockseq == null) {
        var seedBytes = rngBrowser();
        if (node == null) {
          // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
          node = _nodeId = [
            seedBytes[0] | 0x01,
            seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
          ];
        }
        if (clockseq == null) {
          // Per 4.2.2, randomize (14 bit) clockseq
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
      }

      // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
      var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

      // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock
      var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

      // Time since last uuid creation (in msecs)
      var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

      // Per 4.2.1.2, Bump clockseq on clock regression
      if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
      }

      // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
      // time interval
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
      }

      // Per 4.2.1.2 Throw error if too many uuids are requested
      if (nsecs >= 10000) {
        throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
      }

      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;

      // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
      msecs += 12219292800000;

      // `time_low`
      var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
      b[i++] = tl >>> 24 & 0xff;
      b[i++] = tl >>> 16 & 0xff;
      b[i++] = tl >>> 8 & 0xff;
      b[i++] = tl & 0xff;

      // `time_mid`
      var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
      b[i++] = tmh >>> 8 & 0xff;
      b[i++] = tmh & 0xff;

      // `time_high_and_version`
      b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
      b[i++] = tmh >>> 16 & 0xff;

      // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
      b[i++] = clockseq >>> 8 | 0x80;

      // `clock_seq_low`
      b[i++] = clockseq & 0xff;

      // `node`
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }

      return buf ? buf : bytesToUuid_1(b);
    }

    var v1_1 = v1;

    function v4(options, buf, offset) {
      var i = buf && offset || 0;

      if (typeof(options) == 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
      }
      options = options || {};

      var rnds = options.random || (options.rng || rngBrowser)();

      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = (rnds[6] & 0x0f) | 0x40;
      rnds[8] = (rnds[8] & 0x3f) | 0x80;

      // Copy bytes to buffer, if provided
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }

      return buf || bytesToUuid_1(rnds);
    }

    var v4_1 = v4;

    var uuid = v4_1;
    uuid.v1 = v1_1;
    uuid.v4 = v4_1;

    var uuid_1 = uuid;

    var JSONInput_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var logger = new Logger_1.Logger();
    var DEFAULT_WEIGHT = 1;
    var JSONInput = (function () {
        function JSONInput(config) {
            if (config === void 0) { config = {}; }
            this._config = {
                explicit_direction: config.explicit_direction != null ? config.explicit_direction : true,
                directed: config.directed != null ? config.directed : false,
                weighted: config.weighted != null ? config.weighted : false,
                dupeCheck: config.dupeCheck != null ? config.dupeCheck : true
            };
        }
        JSONInput.prototype.readFromJSONFile = function (filepath, graph) {
            RemoteUtils.checkNodeEnvironment();
            var json = JSON.parse(fs.readFileSync(filepath).toString());
            return this.readFromJSON(json, graph);
        };
        JSONInput.prototype.readFromJSONURL = function (config, cb, graph) {
            var self = this;
            RemoteUtils.checkNodeEnvironment();
            RemoteUtils.retrieveRemoteFile(config, function (raw_graph) {
                graph = self.readFromJSON(JSON.parse(raw_graph), graph);
                cb(graph, undefined);
            });
        };
        JSONInput.prototype.readFromJSON = function (json, graph) {
            graph = graph || new BaseGraph_1.BaseGraph(json.name);
            var edc = new Dupes.EdgeDupeChecker(graph);
            var rlt = json.typeRLT;
            this.addNodesToGraph(json, graph);
            for (var node_id in json.data) {
                var node = graph.getNodeById(node_id);
                var edges = json.data[node_id][interfaces$1.labelKeys.edges];
                for (var e in edges) {
                    var edge_input = edges[e];
                    var target_node = this.getTargetNode(graph, edge_input);
                    var edge_label = edge_input[interfaces$1.labelKeys.e_label];
                    var edge_type = rlt && rlt.edges[edge_input[interfaces$1.labelKeys.e_type]] || null;
                    var directed = this._config.explicit_direction ? !!edge_input[interfaces$1.labelKeys.e_dir] : this._config.directed;
                    var weight_float = JSONInput.handleEdgeWeights(edge_input);
                    var weight_info = weight_float === weight_float ? weight_float : DEFAULT_WEIGHT;
                    var edge_weight = this._config.weighted ? weight_info : undefined;
                    var target_node_id = edge_input[interfaces$1.labelKeys.e_to];
                    var dir_char = directed ? 'd' : 'u';
                    var edge_id = node_id + "_" + target_node_id + "_" + dir_char;
                    var newEdge = {
                        a: node,
                        b: target_node,
                        label: edge_label,
                        dir: directed,
                        weighted: this._config.weighted,
                        weight: edge_weight,
                        typed: !!edge_type,
                        type: edge_type
                    };
                    if (this._config.dupeCheck && edc.isDupe(newEdge)) {
                        continue;
                    }
                    graph.addEdgeByID(edge_id, node, target_node, {
                        label: edge_label,
                        directed: directed,
                        weighted: this._config.weighted,
                        weight: edge_weight,
                        typed: !!edge_type,
                        type: edge_type
                    });
                }
            }
            return graph;
        };
        JSONInput.prototype.addNodesToGraph = function (json, graph) {
            var rlt = json.typeRLT;
            var coords_json, coords, coord_idx, features;
            for (var node_id in json.data) {
                var type = BaseGraph_1.BaseGraph.isTyped(graph) ? rlt && rlt.nodes[json.data[node_id][interfaces$1.labelKeys.n_type]] : null;
                var label = json.data[node_id][interfaces$1.labelKeys.n_label];
                var node = graph.addNodeByID(node_id, { label: label, type: type });
                features = json.data[node_id][interfaces$1.labelKeys.n_features];
                if (features) {
                    node.setFeatures(features);
                }
                coords_json = json.data[node_id][interfaces$1.labelKeys.coords];
                if (coords_json) {
                    coords = {};
                    for (coord_idx in coords_json) {
                        coords[coord_idx] = +coords_json[coord_idx];
                    }
                    node.setFeature(interfaces$1.labelKeys.coords, coords);
                }
            }
        };
        JSONInput.prototype.getTargetNode = function (graph, edge_input) {
            var target_node_id = edge_input[interfaces$1.labelKeys.e_to];
            var target_node = graph.getNodeById(target_node_id);
            if (!target_node) {
                throw new Error('Node referenced by edge does not exist');
            }
            return target_node;
        };
        JSONInput.handleEdgeWeights = function (edge_input) {
            switch (edge_input[interfaces$1.labelKeys.e_weight]) {
                case "undefined":
                    return DEFAULT_WEIGHT;
                case "Infinity":
                    return Number.POSITIVE_INFINITY;
                case "-Infinity":
                    return Number.NEGATIVE_INFINITY;
                case "MAX":
                    return Number.MAX_VALUE;
                case "MIN":
                    return Number.MIN_VALUE;
                default:
                    return parseFloat(edge_input[interfaces$1.labelKeys.e_weight]);
            }
        };
        return JSONInput;
    }());
    exports.JSONInput = JSONInput;
    });

    unwrapExports(JSONInput_1);
    var JSONInput_2 = JSONInput_1.JSONInput;

    var JSONOutput_1 = createCommonjsModule(function (module, exports) {
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });





    var startChar = 64;
    var JSONOutput = (function () {
        function JSONOutput() {
        }
        JSONOutput.prototype.constructTypeRLUT = function (g) {
            var e_1, _a, e_2, _b;
            var nchar = startChar;
            var echar = startChar;
            var lut = {
                nodes: {},
                edges: {}
            };
            var rlut = {
                nodes: {},
                edges: {}
            };
            var ntypes = g.nodeTypes();
            try {
                for (var ntypes_1 = __values(ntypes), ntypes_1_1 = ntypes_1.next(); !ntypes_1_1.done; ntypes_1_1 = ntypes_1.next()) {
                    var t = ntypes_1_1.value;
                    lut.nodes[t] = String.fromCharCode(nchar);
                    rlut.nodes[String.fromCharCode(nchar++)] = t;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (ntypes_1_1 && !ntypes_1_1.done && (_a = ntypes_1.return)) _a.call(ntypes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var etypes = g.edgeTypes();
            try {
                for (var etypes_1 = __values(etypes), etypes_1_1 = etypes_1.next(); !etypes_1_1.done; etypes_1_1 = etypes_1.next()) {
                    var t = etypes_1_1.value;
                    lut.edges[t] = String.fromCharCode(echar);
                    rlut.edges[String.fromCharCode(echar++)] = t;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (etypes_1_1 && !etypes_1_1.done && (_b = etypes_1.return)) _b.call(etypes_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return [lut, rlut];
        };
        JSONOutput.prototype.writeToJSONFile = function (filepath, graph) {
            if (typeof window !== 'undefined' && window !== null) {
                throw new Error('cannot write to File inside of Browser');
            }
            fs.writeFileSync(filepath, this.writeToJSONString(graph));
        };
        JSONOutput.prototype.writeToJSONString = function (graph) {
            var _a, _b, _c, _d;
            var lut = null;
            var rlt = null;
            var nodes, node, node_struct, und_edges, dir_edges, edge, coords;
            var result = {
                name: graph.label,
                nodes: graph.nrNodes(),
                dir_e: graph.nrDirEdges(),
                und_e: graph.nrUndEdges(),
                data: {}
            };
            if (BaseGraph_1.BaseGraph.isTyped(graph)) {
                _a = __read(this.constructTypeRLUT(graph), 2), lut = _a[0], rlt = _a[1];
            }
            if (rlt) {
                result['typeRLT'] = rlt;
            }
            nodes = graph.getNodes();
            for (var node_key in nodes) {
                node = nodes[node_key];
                node_struct = result.data[node.getID()] = (_b = {},
                    _b[interfaces$1.labelKeys.edges] = [],
                    _b);
                if (node.getID() !== node.getLabel()) {
                    node_struct[interfaces$1.labelKeys.n_label] = node.label;
                }
                if (BaseNode_1.BaseNode.isTyped(node)) {
                    node_struct[interfaces$1.labelKeys.n_type] = lut && lut.nodes[node.type];
                }
                und_edges = node.undEdges();
                for (var edge_key in und_edges) {
                    edge = und_edges[edge_key];
                    var endPoints = edge.getNodes();
                    var edgeStruct = (_c = {},
                        _c[interfaces$1.labelKeys.e_to] = endPoints.a.getID() === node.getID() ? endPoints.b.getID() : endPoints.a.getID(),
                        _c[interfaces$1.labelKeys.e_dir] = edge.isDirected() ? 1 : 0,
                        _c[interfaces$1.labelKeys.e_weight] = JSONOutput.handleEdgeWeight(edge),
                        _c);
                    if (edge.getID() !== edge.getLabel()) {
                        edgeStruct[interfaces$1.labelKeys.e_label] = edge.getLabel();
                    }
                    if (BaseEdge_1.BaseEdge.isTyped(edge)) {
                        edgeStruct[interfaces$1.labelKeys.e_type] = lut && lut.edges[edge.type];
                    }
                    node_struct[interfaces$1.labelKeys.edges].push(edgeStruct);
                }
                dir_edges = node.outEdges();
                for (var edge_key in dir_edges) {
                    edge = dir_edges[edge_key];
                    var endPoints = edge.getNodes();
                    var edgeStruct = (_d = {},
                        _d[interfaces$1.labelKeys.e_to] = endPoints.b.getID(),
                        _d[interfaces$1.labelKeys.e_dir] = edge.isDirected() ? 1 : 0,
                        _d[interfaces$1.labelKeys.e_weight] = JSONOutput.handleEdgeWeight(edge),
                        _d);
                    if (edge.getID() !== edge.getLabel()) {
                        edgeStruct[interfaces$1.labelKeys.e_label] = edge.getLabel();
                    }
                    if (BaseEdge_1.BaseEdge.isTyped(edge)) {
                        edgeStruct[interfaces$1.labelKeys.e_type] = lut && lut.edges[edge.type];
                    }
                    node_struct[interfaces$1.labelKeys.edges].push(edgeStruct);
                }
                node_struct[interfaces$1.labelKeys.n_features] = node.getFeatures();
                if ((coords = node.getFeature(interfaces$1.labelKeys.coords)) != null) {
                    node_struct[interfaces$1.labelKeys.coords] = coords;
                }
            }
            return JSON.stringify(result);
        };
        JSONOutput.handleEdgeWeight = function (edge) {
            if (!edge.isWeighted()) {
                return undefined;
            }
            switch (edge.getWeight()) {
                case Number.POSITIVE_INFINITY:
                    return 'Infinity';
                case Number.NEGATIVE_INFINITY:
                    return '-Infinity';
                case Number.MAX_VALUE:
                    return 'MAX';
                case Number.MIN_VALUE:
                    return 'MIN';
                default:
                    return edge.getWeight();
            }
        };
        return JSONOutput;
    }());
    exports.JSONOutput = JSONOutput;
    });

    unwrapExports(JSONOutput_1);
    var JSONOutput_2 = JSONOutput_1.JSONOutput;

    var Dijkstra_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    function Dijkstra(graph, source, target) {
        var config = PFS_1.preparePFSStandardConfig();
        if (target) {
            config.goal_node = target;
        }
        return PFS_1.PFS(graph, source, config);
    }
    exports.Dijkstra = Dijkstra;
    });

    unwrapExports(Dijkstra_1);
    var Dijkstra_2 = Dijkstra_1.Dijkstra;

    var SimilarityCommons = createCommonjsModule(function (module, exports) {
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.simSort = {
        asc: function (se1, se2) { return se1.sim - se2.sim; },
        desc: function (se1, se2) { return se2.sim - se1.sim; }
    };
    exports.cutFuncs = {
        above: function (sim, threshold) { return sim >= threshold; },
        below: function (sim, threshold) { return sim <= threshold; },
    };
    function sim(algo, a, b) {
        return algo(a, b);
    }
    exports.sim = sim;
    function simSource(algo, s, t, cfg) {
        if (cfg === void 0) { cfg = {}; }
        var e_1, _a;
        var sort = cfg.sort || exports.simSort.desc;
        var cutFunc = cfg.cutFunc || exports.cutFuncs.above;
        var result = [];
        var start = t[s];
        try {
            for (var _b = __values(Object.entries(t)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                if (k === s) {
                    continue;
                }
                var sim_1 = algo(start, v);
                if (cfg.cutoff == null || cutFunc(sim_1.sim, cfg.cutoff)) {
                    result.push(__assign({ from: s, to: k }, sim_1));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        result.sort(sort);
        if (cfg.knn != null && cfg.knn <= result.length) {
            result = result.slice(0, cfg.knn);
        }
        return result;
    }
    exports.simSource = simSource;
    function simPairwise(algo, s, cfg) {
        if (cfg === void 0) { cfg = {}; }
        var sort = cfg.sort || exports.simSort.desc;
        var cutFunc = cfg.cutFunc || exports.cutFuncs.above;
        var result = [];
        var keys = Object.keys(s);
        for (var i in keys) {
            for (var j = 0; j < +i; j++) {
                var from = keys[i];
                var to = keys[j];
                if (from === to) {
                    continue;
                }
                var sim_2 = algo(s[keys[i]], s[keys[j]], i, j);
                if (cfg.cutoff == null || cutFunc(sim_2.sim, cfg.cutoff)) {
                    result.push(__assign({ from: from, to: to }, sim_2));
                }
            }
        }
        result.sort(sort);
        if (cfg.knn != null && cfg.knn <= result.length) {
            result = result.slice(0, cfg.knn);
        }
        return result;
    }
    exports.simPairwise = simPairwise;
    function simSubsets(algo, s1, s2, cfg) {
        if (cfg === void 0) { cfg = {}; }
        var sort = cfg.sort || exports.simSort.desc;
        var cutFunc = cfg.cutFunc || exports.cutFuncs.above;
        var result = [];
        var keys1 = Object.keys(s1);
        var keys2 = Object.keys(s2);
        for (var i in keys1) {
            var subRes = [];
            for (var j in keys2) {
                var from = keys1[i];
                var to = keys2[j];
                if (from === to) {
                    continue;
                }
                var sim_3 = algo(s1[keys1[i]], s2[keys2[j]]);
                if (cfg.cutoff == null || cutFunc(sim_3.sim, cfg.cutoff)) {
                    subRes.push(__assign({ from: from, to: to }, sim_3));
                }
            }
            subRes.sort(sort);
            if (cfg.knn != null && cfg.knn <= subRes.length) {
                subRes = subRes.slice(0, cfg.knn);
            }
            result = result.concat(subRes);
        }
        return result.sort(sort);
    }
    exports.simSubsets = simSubsets;
    function simGroups(algo, s1, s2, config) {
        throw new Error('not implemented yet');
        return { isect: 0, sim: 0 };
    }
    exports.simGroups = simGroups;
    function knnNodeArray(algo, s, cfg) {
        var e_2, _a;
        var sort = cfg.sort || exports.simSort.desc;
        var c = cfg.cutoff || 0;
        var topK = [];
        var dupes = {};
        try {
            for (var _b = __values(Object.keys(s)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                var topKEntries = simSource(algo, node, s, { knn: cfg.knn || 1, sort: cfg.sort });
                topKEntries.forEach(function (e) {
                    if (c == null || e.sim < c) {
                        return;
                    }
                    if (!cfg.dup && (dupes[e.from] && dupes[e.from][e.to] || dupes[e.to] && dupes[e.to][e.from])) {
                        return;
                    }
                    topK.push(e);
                    dupes[e.from] = dupes[e.from] || {};
                    dupes[e.from][e.to] = true;
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return topK.sort(sort);
    }
    exports.knnNodeArray = knnNodeArray;
    function knnNodeDict(algo, s, cfg) {
        var e_3, _a;
        var sort = cfg.sort || exports.simSort.desc;
        var c = cfg.cutoff || 0;
        var topK = {};
        var _loop_1 = function (node) {
            var e_4, _a;
            var topKEntries = simSource(algo, node, s, { knn: cfg.knn || 1, sort: cfg.sort });
            topKEntries.forEach(function (e) {
                if (c == null || e.sim < c) {
                    return;
                }
                delete e.from;
                topK[node] = topK[node] || [];
                topK[node].push(e);
            });
            try {
                for (var _b = __values(Object.values(topK)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var arr = _c.value;
                    arr.sort(sort);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        try {
            for (var _b = __values(Object.keys(s)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                _loop_1(node);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return topK;
    }
    exports.knnNodeDict = knnNodeDict;
    function viaSharedPrefs(g, algo, cfg) {
        var e_5, _a, e_6, _b;
        var sort = cfg.sort || exports.simSort.desc;
        var cutoff = cfg.co == null ? 1e-6 : cfg.co;
        var cutFunc = cfg.cutFunc || exports.cutFuncs.above;
        var sims = [];
        var t1Set = g.getNodesT(cfg.t1);
        var t2Set = g.getNodesT(cfg.t2);
        var prefCache = new Map();
        try {
            for (var _c = __values(t1Set.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), t1Name = _e[0], t1Node = _e[1];
                try {
                    for (var _f = __values(t2Set.entries()), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var _h = __read(_g.value, 2), t2Name = _h[0], t2Node = _h[1];
                        var prefSet1 = void 0, prefSet2 = void 0;
                        if (prefCache.get(t1Node.id)) {
                            prefSet1 = prefCache.get(t1Node.id);
                        }
                        else {
                            prefSet1 = g[cfg.d1](t1Node, cfg.e1.toUpperCase());
                            prefCache.set(t1Node.id, prefSet1);
                        }
                        if (prefCache.get(t2Node.id)) {
                            prefSet2 = prefCache.get(t2Node.id);
                        }
                        else {
                            prefSet2 = g[cfg.d2](t2Node, cfg.e2.toUpperCase());
                            prefCache.set(t2Node.id, prefSet2);
                        }
                        var sim_4 = algo(prefSet1, prefSet2);
                        if (cutFunc(sim_4.sim, cutoff)) {
                            sims.push(__assign({ from: t1Name, to: t2Name }, sim_4));
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return sims.sort(sort);
    }
    exports.viaSharedPrefs = viaSharedPrefs;
    function getBsNotInA(a, b) {
        var e_7, _a, e_8, _b;
        var result = new Set();
        var sa = new Set();
        try {
            for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
                var e = a_1_1.value;
                sa.add(e.label);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        try {
            for (var b_1 = __values(b), b_1_1 = b_1.next(); !b_1_1.done; b_1_1 = b_1.next()) {
                var e = b_1_1.value;
                if (!sa.has(e.label)) {
                    result.add(e);
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (b_1_1 && !b_1_1.done && (_b = b_1.return)) _b.call(b_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return result;
    }
    exports.getBsNotInA = getBsNotInA;
    });

    var SimilarityCommons$1 = unwrapExports(SimilarityCommons);
    var SimilarityCommons_1 = SimilarityCommons.simSort;
    var SimilarityCommons_2 = SimilarityCommons.cutFuncs;
    var SimilarityCommons_3 = SimilarityCommons.sim;
    var SimilarityCommons_4 = SimilarityCommons.simSource;
    var SimilarityCommons_5 = SimilarityCommons.simPairwise;
    var SimilarityCommons_6 = SimilarityCommons.simSubsets;
    var SimilarityCommons_7 = SimilarityCommons.simGroups;
    var SimilarityCommons_8 = SimilarityCommons.knnNodeArray;
    var SimilarityCommons_9 = SimilarityCommons.knnNodeDict;
    var SimilarityCommons_10 = SimilarityCommons.viaSharedPrefs;
    var SimilarityCommons_11 = SimilarityCommons.getBsNotInA;

    var $comSim = /*#__PURE__*/Object.freeze({
        'default': SimilarityCommons$1,
        __moduleExports: SimilarityCommons,
        simSort: SimilarityCommons_1,
        cutFuncs: SimilarityCommons_2,
        sim: SimilarityCommons_3,
        simSource: SimilarityCommons_4,
        simPairwise: SimilarityCommons_5,
        simSubsets: SimilarityCommons_6,
        simGroups: SimilarityCommons_7,
        knnNodeArray: SimilarityCommons_8,
        knnNodeDict: SimilarityCommons_9,
        viaSharedPrefs: SimilarityCommons_10,
        getBsNotInA: SimilarityCommons_11
    });

    var SetSimilarities = createCommonjsModule(function (module, exports) {
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.simFuncs = {
        jaccard: jaccard,
        overlap: overlap
    };
    var PRECISION = 5;
    function jaccard(a, b) {
        var ui = unionIntersect(a, b);
        return {
            isect: ui.isectSize,
            sim: +(ui.isectSize / ui.unionSize).toPrecision(PRECISION)
        };
    }
    function overlap(a, b) {
        var ui = unionIntersect(a, b);
        return {
            isect: ui.isectSize,
            sim: +(ui.isectSize / Math.min(a.size, b.size)).toPrecision(PRECISION)
        };
    }
    function unionIntersect(a, b) {
        var unionSize = new Set(__spread(a, b)).size;
        var isectSize = a.size + b.size - unionSize;
        return { unionSize: unionSize, isectSize: isectSize };
    }
    });

    var SetSimilarities$1 = unwrapExports(SetSimilarities);
    var SetSimilarities_1 = SetSimilarities.simFuncs;

    var $setSim = /*#__PURE__*/Object.freeze({
        'default': SetSimilarities$1,
        __moduleExports: SetSimilarities,
        simFuncs: SetSimilarities_1
    });

    var ScoreSimilarities = createCommonjsModule(function (module, exports) {
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var PRECISION = 5;
    exports.simFuncs = {
        cosine: cosine,
        cosineSets: cosineSets,
        euclidean: euclidean,
        euclideanSets: euclideanSets,
        pearson: pearson,
        pearsonSets: pearsonSets
    };
    function euclidean(a, b) {
        if (a.length !== b.length) {
            throw new Error('Vectors must be of same size');
        }
        var at = a.length < 1e4 ? a : new Float32Array(a);
        var bt = b.length < 1e4 ? b : new Float32Array(b);
        var sum = 0, diff = 0;
        for (var i = 0; i < at.length; i++) {
            diff = at[i] - bt[i];
            sum += diff * diff;
        }
        var sim = +Math.sqrt(sum).toPrecision(PRECISION);
        return { sim: sim };
    }
    function cosine(a, b) {
        if (a.length !== b.length) {
            throw new Error('Vectors must be of same size');
        }
        var fa1 = new Float32Array(a);
        var fa2 = new Float32Array(b);
        var numerator = 0;
        for (var i = 0; i < fa1.length; i++) {
            numerator += fa1[i] * fa2[i];
        }
        var dena = 0, denb = 0;
        for (var i = 0; i < fa1.length; i++) {
            dena += fa1[i] * fa1[i];
            denb += fa2[i] * fa2[i];
        }
        dena = Math.sqrt(dena);
        denb = Math.sqrt(denb);
        return { sim: +(numerator / (dena * denb)).toPrecision(PRECISION) };
    }
    function pearson(a, b, a_mean, b_mean) {
        if (a.length !== b.length) {
            throw new Error('Vectors must be of same size');
        }
        var sum_a = 0, sum_b = 0, mean_a = a_mean || 0, mean_b = b_mean || 0, numerator = 0, diff_a_sq = 0, diff_b_sq = 0, denominator, a_diff, b_diff, sim;
        if (!a_mean || !b_mean) {
            for (var i = 0; i < a.length; i++) {
                sum_a += a[i];
                sum_b += b[i];
            }
            mean_a = sum_a / a.length;
            mean_b = sum_b / b.length;
        }
        for (var i = 0; i < a.length; i++) {
            a_diff = a[i] - mean_a;
            b_diff = b[i] - mean_b;
            numerator += a_diff * b_diff;
            diff_a_sq += a_diff * a_diff;
            diff_b_sq += b_diff * b_diff;
        }
        denominator = Math.sqrt(diff_a_sq) * Math.sqrt(diff_b_sq);
        sim = +(numerator / denominator).toPrecision(PRECISION);
        return { sim: sim };
    }
    function cosineSets(a, b) {
        var _a = __read(extractCommonTargetScores(a, b), 2), aa = _a[0], ba = _a[1];
        if (!aa.length || !ba.length) {
            return { sim: 0 };
        }
        return cosine(aa, ba);
    }
    function euclideanSets(a, b) {
        var _a = __read(extractCommonTargetScores(a, b), 2), aa = _a[0], ba = _a[1];
        if (!aa.length || !ba.length) {
            return { sim: 0 };
        }
        return euclidean(aa, ba);
    }
    function pearsonSets(a, b) {
        var _a = __read(extractCommonTargetScores(a, b), 4), aa = _a[0], ba = _a[1], a_mean = _a[2], b_mean = _a[3];
        if (!aa.length || !ba.length) {
            return { sim: 0 };
        }
        return pearson(aa, ba, a_mean, b_mean);
    }
    function extractCommonTargetScores(a, b) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f;
        var a_id = new Set(), b_id = new Set();
        try {
            for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
                var e = a_1_1.value;
                a_id.add(e.split('#')[0]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var b_1 = __values(b), b_1_1 = b_1.next(); !b_1_1.done; b_1_1 = b_1.next()) {
                var e = b_1_1.value;
                b_id.add(e.split('#')[0]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (b_1_1 && !b_1_1.done && (_b = b_1.return)) _b.call(b_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var score, a_map = new Map(), b_map = new Map(), a_vec = [], b_vec = [], earr, a_mean = 0, b_mean = 0;
        try {
            for (var a_2 = __values(a), a_2_1 = a_2.next(); !a_2_1.done; a_2_1 = a_2.next()) {
                var e = a_2_1.value;
                earr = e.split('#');
                score = +earr[earr.length - 1];
                a_mean += score;
                if (b_id.has(earr[0])) {
                    a_map.set(earr[0], score);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (a_2_1 && !a_2_1.done && (_c = a_2.return)) _c.call(a_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var b_2 = __values(b), b_2_1 = b_2.next(); !b_2_1.done; b_2_1 = b_2.next()) {
                var e = b_2_1.value;
                var earr_1 = e.split('#');
                score = +earr_1[earr_1.length - 1];
                b_mean += score;
                if (a_id.has(earr_1[0])) {
                    b_map.set(earr_1[0], score);
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (b_2_1 && !b_2_1.done && (_d = b_2.return)) _d.call(b_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var a_keys = Array.from(a_map.keys()).sort();
        try {
            for (var a_keys_1 = __values(a_keys), a_keys_1_1 = a_keys_1.next(); !a_keys_1_1.done; a_keys_1_1 = a_keys_1.next()) {
                var key = a_keys_1_1.value;
                a_vec.push(a_map.get(key));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (a_keys_1_1 && !a_keys_1_1.done && (_e = a_keys_1.return)) _e.call(a_keys_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var b_keys = Array.from(b_map.keys()).sort();
        try {
            for (var b_keys_1 = __values(b_keys), b_keys_1_1 = b_keys_1.next(); !b_keys_1_1.done; b_keys_1_1 = b_keys_1.next()) {
                var key = b_keys_1_1.value;
                b_vec.push(b_map.get(key));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (b_keys_1_1 && !b_keys_1_1.done && (_f = b_keys_1.return)) _f.call(b_keys_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return [a_vec, b_vec, a_mean / a.size, b_mean / b.size];
    }
    });

    var ScoreSimilarities$1 = unwrapExports(ScoreSimilarities);
    var ScoreSimilarities_1 = ScoreSimilarities.simFuncs;

    var $scoSim = /*#__PURE__*/Object.freeze({
        'default': ScoreSimilarities$1,
        __moduleExports: ScoreSimilarities,
        simFuncs: ScoreSimilarities_1
    });

    var SimplePerturbations = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var v4 = uuid_1.v4;
    var SimplePerturber = (function () {
        function SimplePerturber(_graph) {
            this._graph = _graph;
        }
        SimplePerturber.prototype.deleteNodesPercentage = function (percentage) {
            if (percentage < 0) {
                throw new Error('Cowardly refusing to remove a negative amount of nodes');
            }
            if (percentage > 100) {
                percentage = 100;
            }
            var nr_nodes_to_delete = Math.ceil(this._graph.nrNodes() * percentage / 100);
            this.deleteNodesAmount(nr_nodes_to_delete);
        };
        SimplePerturber.prototype.deleteUndEdgesPercentage = function (percentage) {
            if (percentage > 100) {
                percentage = 100;
            }
            var nr_edges_to_delete = Math.ceil(this._graph.nrUndEdges() * percentage / 100);
            this.deleteUndEdgesAmount(nr_edges_to_delete);
        };
        SimplePerturber.prototype.deleteDirEdgesPercentage = function (percentage) {
            if (percentage > 100) {
                percentage = 100;
            }
            var nr_edges_to_delete = Math.ceil(this._graph.nrDirEdges() * percentage / 100);
            this.deleteDirEdgesAmount(nr_edges_to_delete);
        };
        SimplePerturber.prototype.deleteNodesAmount = function (amount) {
            if (amount < 0) {
                throw 'Cowardly refusing to remove a negative amount of nodes';
            }
            if (this._graph.nrNodes() === 0) {
                return;
            }
            for (var nodeID = 0, randomNodes = this._graph.pickRandomProperties(this._graph.getNodes(), amount); nodeID < randomNodes.length; nodeID++) {
                this._graph.deleteNode(this._graph.getNodes()[randomNodes[nodeID]]);
            }
        };
        SimplePerturber.prototype.deleteUndEdgesAmount = function (amount) {
            if (amount < 0) {
                throw 'Cowardly refusing to remove a negative amount of edges';
            }
            if (this._graph.nrUndEdges() === 0) {
                return;
            }
            for (var edgeID = 0, randomEdges = this._graph.pickRandomProperties(this._graph.getUndEdges(), amount); edgeID < randomEdges.length; edgeID++) {
                this._graph.deleteEdge(this._graph.getUndEdges()[randomEdges[edgeID]]);
            }
        };
        SimplePerturber.prototype.deleteDirEdgesAmount = function (amount) {
            if (amount < 0) {
                throw 'Cowardly refusing to remove a negative amount of edges';
            }
            if (this._graph.nrDirEdges() === 0) {
                return;
            }
            for (var edgeID = 0, randomEdges = this._graph.pickRandomProperties(this._graph.getDirEdges(), amount); edgeID < randomEdges.length; edgeID++) {
                this._graph.deleteEdge(this._graph.getDirEdges()[randomEdges[edgeID]]);
            }
        };
        SimplePerturber.prototype.addUndEdgesPercentage = function (percentage) {
            var nr_und_edges_to_add = Math.ceil(this._graph.nrUndEdges() * percentage / 100);
            this.addEdgesAmount(nr_und_edges_to_add, { directed: false });
        };
        SimplePerturber.prototype.addDirEdgesPercentage = function (percentage) {
            var nr_dir_edges_to_add = Math.ceil(this._graph.nrDirEdges() * percentage / 100);
            this.addEdgesAmount(nr_dir_edges_to_add, { directed: true });
        };
        SimplePerturber.prototype.addEdgesAmount = function (amount, config) {
            if (amount <= 0) {
                throw new Error('Cowardly refusing to add a non-positive amount of edges');
            }
            var node_a, node_b;
            var direction = (config && config.directed) ? config.directed : false, dir = direction ? "_d" : "_u";
            while (amount > 0) {
                node_a = this._graph.getRandomNode();
                while ((node_b = this._graph.getRandomNode()) === node_a) { }
                var edge_id = node_a.getID() + "_" + node_b.getID() + dir;
                if (node_a.hasEdgeID(edge_id)) {
                    continue;
                }
                else {
                    this._graph.addEdgeByID(edge_id, node_a, node_b, { directed: direction });
                    --amount;
                }
            }
        };
        SimplePerturber.prototype.addNodesPercentage = function (percentage, config) {
            if (percentage < 0) {
                throw 'Cowardly refusing to add a negative amount of nodes';
            }
            var nr_nodes_to_add = Math.ceil(this._graph.nrNodes() * percentage / 100);
            this.addNodesAmount(nr_nodes_to_add, config);
        };
        SimplePerturber.prototype.addNodesAmount = function (amount, config) {
            if (amount < 0) {
                throw 'Cowardly refusing to add a negative amount of nodes';
            }
            var new_nodes = {};
            while (--amount >= 0) {
                var new_node_id = v4();
                new_nodes[new_node_id] = this._graph.addNodeByID(new_node_id);
            }
            if (config == null) {
                return;
            }
            else {
                this.createEdgesByConfig(config, new_nodes);
            }
        };
        SimplePerturber.prototype.createEdgesByConfig = function (config, new_nodes) {
            var degree, min_degree, max_degree;
            if (config.und_degree != null ||
                config.dir_degree != null ||
                config.min_und_degree != null && config.max_und_degree != null ||
                config.min_dir_degree != null && config.max_dir_degree != null) {
                if ((degree = config.und_degree) != null) {
                    this.createEdgesSpan(degree, degree, false, new_nodes);
                }
                else if ((min_degree = config.min_und_degree) != null
                    && (max_degree = config.max_und_degree) != null) {
                    this.createEdgesSpan(min_degree, max_degree, false, new_nodes);
                }
                if (degree = config.dir_degree) {
                    this.createEdgesSpan(degree, degree, true, new_nodes);
                }
                else if ((min_degree = config.min_dir_degree) != null
                    && (max_degree = config.max_dir_degree) != null) {
                    this.createEdgesSpan(min_degree, max_degree, true, new_nodes);
                }
            }
            else {
                if (config.probability_dir != null) {
                    this.createEdgesProb(config.probability_dir, true, new_nodes);
                }
                if (config.probability_und != null) {
                    this.createEdgesProb(config.probability_und, false, new_nodes);
                }
            }
        };
        SimplePerturber.prototype.createEdgesProb = function (probability, directed, new_nodes) {
            if (0 > probability || 1 < probability) {
                throw new Error("Probability out of range.");
            }
            directed = directed || false;
            new_nodes = new_nodes || this._graph.getNodes();
            var all_nodes = this._graph.getNodes(), node_a, node_b, edge_id, dir = directed ? '_d' : '_u';
            for (node_a in new_nodes) {
                for (node_b in all_nodes) {
                    if (node_a !== node_b && Math.random() <= probability) {
                        edge_id = all_nodes[node_a].getID() + "_" + all_nodes[node_b].getID() + dir;
                        this._graph.addEdgeByID(edge_id, all_nodes[node_a], all_nodes[node_b], { directed: directed });
                    }
                }
            }
        };
        SimplePerturber.prototype.createEdgesSpan = function (min, max, directed, setOfNodes) {
            if (min < 0) {
                throw new Error('Minimum degree cannot be negative.');
            }
            if (max >= this._graph.nrNodes()) {
                throw new Error('Maximum degree exceeds number of reachable nodes.');
            }
            if (min > max) {
                throw new Error('Minimum degree cannot exceed maximum degree.');
            }
            directed = directed || false;
            var min = min | 0, max = max | 0, new_nodes = setOfNodes || this._graph.getNodes(), all_nodes = this._graph.getNodes(), idx_a, node_a, node_b, edge_id, node_keys = Object.keys(all_nodes), keys_len = node_keys.length, rand_idx, rand_deg, dir = directed ? '_d' : '_u';
            for (idx_a in new_nodes) {
                node_a = new_nodes[idx_a];
                rand_idx = 0;
                rand_deg = (Math.random() * (max - min) + min) | 0;
                while (rand_deg) {
                    rand_idx = (keys_len * Math.random()) | 0;
                    node_b = all_nodes[node_keys[rand_idx]];
                    if (node_a !== node_b) {
                        edge_id = node_a.getID() + "_" + node_b.getID() + dir;
                        if (node_a.hasEdgeID(edge_id)) {
                            continue;
                        }
                        this._graph.addEdgeByID(edge_id, node_a, node_b, { directed: directed });
                        --rand_deg;
                    }
                }
            }
        };
        return SimplePerturber;
    }());
    exports.SimplePerturber = SimplePerturber;
    });

    unwrapExports(SimplePerturbations);
    var SimplePerturbations_1 = SimplePerturbations.SimplePerturber;

    var KroneckerLeskovec = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    var KROL = (function () {
        function KROL(config) {
            this._config = config || this.prepareKROLStandardConfig();
            this._genMat = this._config.genMat;
            this._cycles = this._config.cycles;
            this._graph = new BaseGraph_1.BaseGraph('synth');
        }
        KROL.prototype.generate = function () {
            var gen_dims = this._genMat[0].length;
            var res_dims = Math.pow(gen_dims, this._cycles + 1);
            for (var index = 0; index < res_dims; index++) {
                this._graph.addNodeByID(index.toString());
            }
            for (var node1 = 0; node1 < res_dims; node1++) {
                for (var node2 = 0; node2 < res_dims; node2++) {
                    if (this.addEdge(node1, node2, gen_dims)) {
                        this._graph.addEdgeByNodeIDs(node1 + '_' + node2, node1.toString(), node2.toString());
                    }
                }
            }
            var result = {
                graph: this._graph
            };
            return result;
        };
        KROL.prototype.addEdge = function (node1, node2, dims) {
            var rprob = Math.random();
            var prob = 1.0;
            for (var level = 0; level < this._cycles; level++) {
                var id_1 = Math.floor(node1 / Math.pow(dims, level + 1)) % dims;
                var id_2 = Math.floor(node2 / Math.pow(dims, level + 1)) % dims;
                prob *= this._genMat[id_1][id_2];
                if (rprob > prob) {
                    return false;
                }
            }
            return true;
        };
        KROL.prototype.prepareKROLStandardConfig = function () {
            var genMat = [[0.9, 0.5], [0.5, 0.1]];
            return {
                genMat: genMat,
                cycles: 5
            };
        };
        return KROL;
    }());
    exports.KROL = KROL;
    });

    unwrapExports(KroneckerLeskovec);
    var KroneckerLeskovec_1 = KroneckerLeskovec.KROL;

    // CORE


    // Base



    // Typed



    // CENTRALITIES





    // IO




    // SEARCH







    // SIMILARITIES



    // UTILS



    // DATASTRUCTS

    // PERTURBATION

    // GENERATORS

    // MISC
    // var MCMFBoykov							= require("./dist/mincutmaxflow/minCutMaxFlowBoykov.js");
    // var PRGauss								= require("./lib/centralities/PageRankGaussian.js");


    // Define global object
    let out = typeof window !== 'undefined' ? window : commonjsGlobal;

    /**
     * Inside Global or Window object
     */
    out.$G = {
    	core: {
    		GraphMode								: interfaces.GraphMode,
    		DIR											: interfaces.DIR,
    		base: {
    			BaseEdge 								: BaseEdge_1.BaseEdge,
    			BaseNode 								: BaseNode_1.BaseNode,
    			BaseGraph 							: BaseGraph_1.BaseGraph
    		},
    		typed: {
    			TypedEdge								: TypedEdge_1.TypedEdge,
    			TypedNode								: TypedNode_1.TypedNode,
    			TypedGraph							: TypedGraph_1.TypedGraph
    		},
    		compute: {
    			ComputeGraph						: ComputeGraph_1.ComputeGraph
    		}
    	},
    	centralities: {
    		Betweenness								: Betweenness.betweennessCentrality,
    		Brandes										: Brandes_1.Brandes,
    		Closeness									: Closeness.ClosenessCentrality,
    		Degree										: Degree.DegreeCentrality,
    		Pagerank									: Pagerank_1.Pagerank
    	},
    	input: {
    		CSVInput 									: CSVInput_1.CSVInput,
    		JSONInput 								: JSONInput_1.JSONInput
    	},
    	output: {							
    		CSVOutput									: CSVOutput_1.CSVOutput,
    		JSONOutput								: JSONOutput_1.JSONOutput
    	},
    	search: {
    		BFS												: BFS_1,
    		DFS 											: DFS_1,
    		PFS           						: PFS_1,
    		Dijkstra									: Dijkstra_1,
    		BellmanFord								: BellmanFord,
    		FloydWarshall							: FloydWarshall,
    		Johnsons									: Johnsons_1
    	},
    	similarities: {
    		Commons										: SimilarityCommons,
    		Sets											: SetSimilarities,
    		Score											: ScoreSimilarities,
    	},
      utils: {						
        Struct        						: StructUtils,
    		Remote        						: RemoteUtils,
        Callback 									: CallbackUtils
      },
      datastructs: {
        BinaryHeap  							: BinaryHeap_1.BinaryHeap
      },
    	perturbation: {
    		SimplePerturber						: SimplePerturbations.SimplePerturber
    	},
    	generators: {
    		Kronecker									: KroneckerLeskovec.KROL
    	},
    	// mincut: {
    	// 	MCMFBoykov							: MCMFBoykov.MCMFBoykov
    	// },
    };

    /**
     * For NodeJS / CommonJS global object
     */
    var graphinius = out.$G;

    var jsonIn = new JSONInput_2({ directed: true, explicit_direction: false, weighted: false });
    function importGraph(config) {
        return __awaiter(this, void 0, void 0, function () {
            var tic, graph, toc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Loading " + config.graphName + "...");
                        tic = +new Date;
                        return [4, importGraphFromURL(config)];
                    case 1:
                        graph = _a.sent();
                        toc = +new Date;
                        console.log("Importing graph of |V|=" + graph.nrNodes() + " and |E_dir|=" + graph.nrDirEdges() + " took " + (toc - tic) + " ms.");
                        console.log(graph.stats);
                        return [2, graph];
                }
            });
        });
    }
    function importGraphFromURL(config) {
        return __awaiter(this, void 0, void 0, function () {
            var graphBytes, graphString, graph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(config.graphFile)];
                    case 1: return [4, (_a.sent())];
                    case 2:
                        graphBytes = _a.sent();
                        return [4, graphBytes.json()];
                    case 3:
                        graphString = _a.sent();
                        graph = new TypedGraph_2(config.graphName);
                        graph = jsonIn.readFromJSON(graphString, graph);
                        window.g = graph;
                        return [2, graph];
                }
            });
        });
    }

    var AllSubstringsIndexStrategy_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Indexes for all substring searches (e.g. the term "cat" is indexed as "c", "ca", "cat", "a", "at", and "t").
     */
    var AllSubstringsIndexStrategy = exports.AllSubstringsIndexStrategy = function () {
      function AllSubstringsIndexStrategy() {
        _classCallCheck(this, AllSubstringsIndexStrategy);
      }

      _createClass(AllSubstringsIndexStrategy, [{
        key: 'expandToken',


        /**
         * @inheritDocs
         */
        value: function expandToken(token) {
          var expandedTokens = [];
          var string;

          for (var i = 0, length = token.length; i < length; ++i) {
            string = '';

            for (var j = i; j < length; ++j) {
              string += token.charAt(j);
              expandedTokens.push(string);
            }
          }

          return expandedTokens;
        }
      }]);

      return AllSubstringsIndexStrategy;
    }();

    });

    unwrapExports(AllSubstringsIndexStrategy_1);
    var AllSubstringsIndexStrategy_2 = AllSubstringsIndexStrategy_1.AllSubstringsIndexStrategy;

    var ExactWordIndexStrategy_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Indexes for exact word matches.
     */
    var ExactWordIndexStrategy = exports.ExactWordIndexStrategy = function () {
      function ExactWordIndexStrategy() {
        _classCallCheck(this, ExactWordIndexStrategy);
      }

      _createClass(ExactWordIndexStrategy, [{
        key: 'expandToken',


        /**
         * @inheritDocs
         */
        value: function expandToken(token) {
          return token ? [token] : [];
        }
      }]);

      return ExactWordIndexStrategy;
    }();

    });

    unwrapExports(ExactWordIndexStrategy_1);
    var ExactWordIndexStrategy_2 = ExactWordIndexStrategy_1.ExactWordIndexStrategy;

    var PrefixIndexStrategy_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Indexes for prefix searches (e.g. the term "cat" is indexed as "c", "ca", and "cat" allowing prefix search lookups).
     */
    var PrefixIndexStrategy = exports.PrefixIndexStrategy = function () {
      function PrefixIndexStrategy() {
        _classCallCheck(this, PrefixIndexStrategy);
      }

      _createClass(PrefixIndexStrategy, [{
        key: 'expandToken',


        /**
         * @inheritDocs
         */
        value: function expandToken(token) {
          var expandedTokens = [];
          var string = '';

          for (var i = 0, length = token.length; i < length; ++i) {
            string += token.charAt(i);
            expandedTokens.push(string);
          }

          return expandedTokens;
        }
      }]);

      return PrefixIndexStrategy;
    }();

    });

    unwrapExports(PrefixIndexStrategy_1);
    var PrefixIndexStrategy_2 = PrefixIndexStrategy_1.PrefixIndexStrategy;

    var IndexStrategy = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });



    Object.defineProperty(exports, 'AllSubstringsIndexStrategy', {
      enumerable: true,
      get: function get() {
        return AllSubstringsIndexStrategy_1.AllSubstringsIndexStrategy;
      }
    });



    Object.defineProperty(exports, 'ExactWordIndexStrategy', {
      enumerable: true,
      get: function get() {
        return ExactWordIndexStrategy_1.ExactWordIndexStrategy;
      }
    });



    Object.defineProperty(exports, 'PrefixIndexStrategy', {
      enumerable: true,
      get: function get() {
        return PrefixIndexStrategy_1.PrefixIndexStrategy;
      }
    });

    });

    unwrapExports(IndexStrategy);

    var CaseSensitiveSanitizer_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Enforces case-sensitive text matches.
     */
    var CaseSensitiveSanitizer = exports.CaseSensitiveSanitizer = function () {
      function CaseSensitiveSanitizer() {
        _classCallCheck(this, CaseSensitiveSanitizer);
      }

      _createClass(CaseSensitiveSanitizer, [{
        key: 'sanitize',


        /**
         * @inheritDocs
         */
        value: function sanitize(text) {
          return text ? text.trim() : '';
        }
      }]);

      return CaseSensitiveSanitizer;
    }();

    });

    unwrapExports(CaseSensitiveSanitizer_1);
    var CaseSensitiveSanitizer_2 = CaseSensitiveSanitizer_1.CaseSensitiveSanitizer;

    var LowerCaseSanitizer_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Sanitizes text by converting to a locale-friendly lower-case version and triming leading and trailing whitespace.
     */
    var LowerCaseSanitizer = exports.LowerCaseSanitizer = function () {
      function LowerCaseSanitizer() {
        _classCallCheck(this, LowerCaseSanitizer);
      }

      _createClass(LowerCaseSanitizer, [{
        key: 'sanitize',


        /**
         * @inheritDocs
         */
        value: function sanitize(text) {
          return text ? text.toLocaleLowerCase().trim() : '';
        }
      }]);

      return LowerCaseSanitizer;
    }();

    });

    unwrapExports(LowerCaseSanitizer_1);
    var LowerCaseSanitizer_2 = LowerCaseSanitizer_1.LowerCaseSanitizer;

    var Sanitizer = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });



    Object.defineProperty(exports, 'CaseSensitiveSanitizer', {
      enumerable: true,
      get: function get() {
        return CaseSensitiveSanitizer_1.CaseSensitiveSanitizer;
      }
    });



    Object.defineProperty(exports, 'LowerCaseSanitizer', {
      enumerable: true,
      get: function get() {
        return LowerCaseSanitizer_1.LowerCaseSanitizer;
      }
    });

    });

    unwrapExports(Sanitizer);

    var getNestedFieldValue_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = getNestedFieldValue;
    /**
     * Find and return a nested object value.
     *
     * @param object to crawl
     * @param path Property path
     * @returns {any}
     */
    function getNestedFieldValue(object, path) {
      path = path || [];
      object = object || {};

      var value = object;

      // walk down the property path
      for (var i = 0; i < path.length; i++) {
        value = value[path[i]];

        if (value == null) {
          return null;
        }
      }

      return value;
    }

    });

    unwrapExports(getNestedFieldValue_1);

    var TfIdfSearchIndex_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TfIdfSearchIndex = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



    var _getNestedFieldValue2 = _interopRequireDefault(getNestedFieldValue_1);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Search index capable of returning results matching a set of tokens and ranked according to TF-IDF.
     */
    var TfIdfSearchIndex = exports.TfIdfSearchIndex = function () {
      function TfIdfSearchIndex(uidFieldName) {
        _classCallCheck(this, TfIdfSearchIndex);

        this._uidFieldName = uidFieldName;
        this._tokenToIdfCache = {};
        this._tokenMap = {};
      }

      /**
       * @inheritDocs
       */


      _createClass(TfIdfSearchIndex, [{
        key: 'indexDocument',
        value: function indexDocument(token, uid, doc) {
          this._tokenToIdfCache = {}; // New index invalidates previous IDF caches

          var tokenMap = this._tokenMap;
          var tokenDatum;

          if (_typeof(tokenMap[token]) !== 'object') {
            tokenMap[token] = tokenDatum = {
              $numDocumentOccurrences: 0,
              $totalNumOccurrences: 1,
              $uidMap: {}
            };
          } else {
            tokenDatum = tokenMap[token];
            tokenDatum.$totalNumOccurrences++;
          }

          var uidMap = tokenDatum.$uidMap;

          if (_typeof(uidMap[uid]) !== 'object') {
            tokenDatum.$numDocumentOccurrences++;
            uidMap[uid] = {
              $document: doc,
              $numTokenOccurrences: 1
            };
          } else {
            uidMap[uid].$numTokenOccurrences++;
          }
        }

        /**
         * @inheritDocs
         */

      }, {
        key: 'search',
        value: function search(tokens, corpus) {
          var uidToDocumentMap = {};

          for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
            var token = tokens[i];
            var tokenMetadata = this._tokenMap[token];

            // Short circuit if no matches were found for any given token.
            if (!tokenMetadata) {
              return [];
            }

            if (i === 0) {
              var keys = Object.keys(tokenMetadata.$uidMap);
              for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
                var uid = keys[j];

                uidToDocumentMap[uid] = tokenMetadata.$uidMap[uid].$document;
              }
            } else {
              var keys = Object.keys(uidToDocumentMap);
              for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
                var uid = keys[j];

                if (_typeof(tokenMetadata.$uidMap[uid]) !== 'object') {
                  delete uidToDocumentMap[uid];
                }
              }
            }
          }

          var documents = [];

          for (var uid in uidToDocumentMap) {
            documents.push(uidToDocumentMap[uid]);
          }

          var calculateTfIdf = this._createCalculateTfIdf();

          // Return documents sorted by TF-IDF
          return documents.sort(function (documentA, documentB) {
            return calculateTfIdf(tokens, documentB, corpus) - calculateTfIdf(tokens, documentA, corpus);
          });
        }
      }, {
        key: '_createCalculateIdf',
        value: function _createCalculateIdf() {
          var tokenMap = this._tokenMap;
          var tokenToIdfCache = this._tokenToIdfCache;

          return function calculateIdf(token, documents) {
            if (!tokenToIdfCache[token]) {
              var numDocumentsWithToken = typeof tokenMap[token] !== 'undefined' ? tokenMap[token].$numDocumentOccurrences : 0;

              tokenToIdfCache[token] = 1 + Math.log(documents.length / (1 + numDocumentsWithToken));
            }

            return tokenToIdfCache[token];
          };
        }
      }, {
        key: '_createCalculateTfIdf',
        value: function _createCalculateTfIdf() {
          var tokenMap = this._tokenMap;
          var uidFieldName = this._uidFieldName;
          var calculateIdf = this._createCalculateIdf();

          return function calculateTfIdf(tokens, document, documents) {
            var score = 0;

            for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
              var token = tokens[i];

              var inverseDocumentFrequency = calculateIdf(token, documents);

              if (inverseDocumentFrequency === Infinity) {
                inverseDocumentFrequency = 0;
              }

              var uid;
              if (uidFieldName instanceof Array) {
                uid = document && (0, _getNestedFieldValue2.default)(document, uidFieldName);
              } else {
                uid = document && document[uidFieldName];
              }

              var termFrequency = typeof tokenMap[token] !== 'undefined' && typeof tokenMap[token].$uidMap[uid] !== 'undefined' ? tokenMap[token].$uidMap[uid].$numTokenOccurrences : 0;

              score += termFrequency * inverseDocumentFrequency;
            }

            return score;
          };
        }
      }]);

      return TfIdfSearchIndex;
    }();

    });

    unwrapExports(TfIdfSearchIndex_1);
    var TfIdfSearchIndex_2 = TfIdfSearchIndex_1.TfIdfSearchIndex;

    var UnorderedSearchIndex_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Search index capable of returning results matching a set of tokens but without any meaningful rank or order.
     */
    var UnorderedSearchIndex = exports.UnorderedSearchIndex = function () {
      function UnorderedSearchIndex() {
        _classCallCheck(this, UnorderedSearchIndex);

        this._tokenToUidToDocumentMap = {};
      }

      /**
       * @inheritDocs
       */


      _createClass(UnorderedSearchIndex, [{
        key: 'indexDocument',
        value: function indexDocument(token, uid, doc) {
          if (_typeof(this._tokenToUidToDocumentMap[token]) !== 'object') {
            this._tokenToUidToDocumentMap[token] = {};
          }

          this._tokenToUidToDocumentMap[token][uid] = doc;
        }

        /**
         * @inheritDocs
         */

      }, {
        key: 'search',
        value: function search(tokens, corpus) {
          var intersectingDocumentMap = {};

          var tokenToUidToDocumentMap = this._tokenToUidToDocumentMap;

          for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
            var token = tokens[i];
            var documentMap = tokenToUidToDocumentMap[token];

            // Short circuit if no matches were found for any given token.
            if (!documentMap) {
              return [];
            }

            if (i === 0) {
              var keys = Object.keys(documentMap);

              for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
                var uid = keys[j];

                intersectingDocumentMap[uid] = documentMap[uid];
              }
            } else {
              var keys = Object.keys(intersectingDocumentMap);

              for (var j = 0, numKeys = keys.length; j < numKeys; j++) {
                var uid = keys[j];

                if (_typeof(documentMap[uid]) !== 'object') {
                  delete intersectingDocumentMap[uid];
                }
              }
            }
          }

          var keys = Object.keys(intersectingDocumentMap);
          var documents = [];

          for (var i = 0, numKeys = keys.length; i < numKeys; i++) {
            var uid = keys[i];

            documents.push(intersectingDocumentMap[uid]);
          }

          return documents;
        }
      }]);

      return UnorderedSearchIndex;
    }();

    });

    unwrapExports(UnorderedSearchIndex_1);
    var UnorderedSearchIndex_2 = UnorderedSearchIndex_1.UnorderedSearchIndex;

    var SearchIndex = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });



    Object.defineProperty(exports, 'TfIdfSearchIndex', {
      enumerable: true,
      get: function get() {
        return TfIdfSearchIndex_1.TfIdfSearchIndex;
      }
    });



    Object.defineProperty(exports, 'UnorderedSearchIndex', {
      enumerable: true,
      get: function get() {
        return UnorderedSearchIndex_1.UnorderedSearchIndex;
      }
    });

    });

    unwrapExports(SearchIndex);

    var SimpleTokenizer_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var REGEX = /[^a-zа-яё0-9\-']+/i;

    /**
     * Simple tokenizer that splits strings on whitespace characters and returns an array of all non-empty substrings.
     */


    var SimpleTokenizer = exports.SimpleTokenizer = function () {
      function SimpleTokenizer() {
        _classCallCheck(this, SimpleTokenizer);
      }

      _createClass(SimpleTokenizer, [{
        key: 'tokenize',


        /**
         * @inheritDocs
         */
        value: function tokenize(text) {
          return text.split(REGEX).filter(function (text) {
            return text;
          } // Filter empty tokens
          );
        }
      }]);

      return SimpleTokenizer;
    }();

    });

    unwrapExports(SimpleTokenizer_1);
    var SimpleTokenizer_2 = SimpleTokenizer_1.SimpleTokenizer;

    var StemmingTokenizer_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Stemming is the process of reducing search tokens to their root (or stem) so that searches for different forms of a
     * word will match. For example "search", "searching" and "searched" are all reduced to the stem "search".
     *
     * <p>This stemming tokenizer converts tokens (words) to their stem forms before returning them. It requires an
     * external stemming function to be provided; for this purpose I recommend the NPM 'porter-stemmer' library.
     *
     * <p>For more information see http : //tartarus.org/~martin/PorterStemmer/
     */
    var StemmingTokenizer = exports.StemmingTokenizer = function () {

      /**
       * Constructor.
       *
       * @param stemmingFunction Function capable of accepting a word and returning its stem.
       * @param decoratedIndexStrategy Index strategy to be run after all stop words have been removed.
       */
      function StemmingTokenizer(stemmingFunction, decoratedTokenizer) {
        _classCallCheck(this, StemmingTokenizer);

        this._stemmingFunction = stemmingFunction;
        this._tokenizer = decoratedTokenizer;
      }

      /**
       * @inheritDocs
       */


      _createClass(StemmingTokenizer, [{
        key: 'tokenize',
        value: function tokenize(text) {
          return this._tokenizer.tokenize(text).map(this._stemmingFunction);
        }
      }]);

      return StemmingTokenizer;
    }();

    });

    unwrapExports(StemmingTokenizer_1);
    var StemmingTokenizer_2 = StemmingTokenizer_1.StemmingTokenizer;

    var StopWordsMap_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StopWordsMap = exports.StopWordsMap = {
      a: true,
      able: true,
      about: true,
      across: true,
      after: true,
      all: true,
      almost: true,
      also: true,
      am: true,
      among: true,
      an: true,
      and: true,
      any: true,
      are: true,
      as: true,
      at: true,
      be: true,
      because: true,
      been: true,
      but: true,
      by: true,
      can: true,
      cannot: true,
      could: true,
      dear: true,
      did: true,
      'do': true,
      does: true,
      either: true,
      'else': true,
      ever: true,
      every: true,
      'for': true,
      from: true,
      'get': true,
      got: true,
      had: true,
      has: true,
      have: true,
      he: true,
      her: true,
      hers: true,
      him: true,
      his: true,
      how: true,
      however: true,
      i: true,
      'if': true,
      'in': true,
      into: true,
      is: true,
      it: true,
      its: true,
      just: true,
      least: true,
      let: true,
      like: true,
      likely: true,
      may: true,
      me: true,
      might: true,
      most: true,
      must: true,
      my: true,
      neither: true,
      no: true,
      nor: true,
      not: true,
      of: true,
      off: true,
      often: true,
      on: true,
      only: true,
      or: true,
      other: true,
      our: true,
      own: true,
      rather: true,
      said: true,
      say: true,
      says: true,
      she: true,
      should: true,
      since: true,
      so: true,
      some: true,
      than: true,
      that: true,
      the: true,
      their: true,
      them: true,
      then: true,
      there: true,
      these: true,
      they: true,
      'this': true,
      tis: true,
      to: true,
      too: true,
      twas: true,
      us: true,
      wants: true,
      was: true,
      we: true,
      were: true,
      what: true,
      when: true,
      where: true,
      which: true,
      'while': true,
      who: true,
      whom: true,
      why: true,
      will: true,
      'with': true,
      would: true,
      yet: true,
      you: true,
      your: true
    };

    // Prevent false positives for inherited properties
    StopWordsMap.constructor = false;
    StopWordsMap.hasOwnProperty = false;
    StopWordsMap.isPrototypeOf = false;
    StopWordsMap.propertyIsEnumerable = false;
    StopWordsMap.toLocaleString = false;
    StopWordsMap.toString = false;
    StopWordsMap.valueOf = false;

    });

    unwrapExports(StopWordsMap_1);
    var StopWordsMap_2 = StopWordsMap_1.StopWordsMap;

    var StopWordsTokenizer_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StopWordsTokenizer = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Stop words are very common (e.g. "a", "and", "the") and are often not semantically meaningful in the context of a
     * search. This tokenizer removes stop words from a set of tokens before passing the remaining tokens along for
     * indexing or searching purposes.
     */
    var StopWordsTokenizer = exports.StopWordsTokenizer = function () {

      /**
       * Constructor.
       *
       * @param decoratedIndexStrategy Index strategy to be run after all stop words have been removed.
       */
      function StopWordsTokenizer(decoratedTokenizer) {
        _classCallCheck(this, StopWordsTokenizer);

        this._tokenizer = decoratedTokenizer;
      }

      /**
       * @inheritDocs
       */


      _createClass(StopWordsTokenizer, [{
        key: 'tokenize',
        value: function tokenize(text) {
          return this._tokenizer.tokenize(text).filter(function (token) {
            return !StopWordsMap_1.StopWordsMap[token];
          });
        }
      }]);

      return StopWordsTokenizer;
    }();

    });

    unwrapExports(StopWordsTokenizer_1);
    var StopWordsTokenizer_2 = StopWordsTokenizer_1.StopWordsTokenizer;

    var Tokenizer = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });



    Object.defineProperty(exports, 'SimpleTokenizer', {
      enumerable: true,
      get: function get() {
        return SimpleTokenizer_1.SimpleTokenizer;
      }
    });



    Object.defineProperty(exports, 'StemmingTokenizer', {
      enumerable: true,
      get: function get() {
        return StemmingTokenizer_1.StemmingTokenizer;
      }
    });



    Object.defineProperty(exports, 'StopWordsTokenizer', {
      enumerable: true,
      get: function get() {
        return StopWordsTokenizer_1.StopWordsTokenizer;
      }
    });

    });

    unwrapExports(Tokenizer);

    var Search_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Search = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



    var _getNestedFieldValue2 = _interopRequireDefault(getNestedFieldValue_1);









    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * Simple client-side searching within a set of documents.
     *
     * <p>Documents can be searched by any number of fields. Indexing and search strategies are highly customizable.
     */
    var Search = exports.Search = function () {

      /**
       * Constructor.
       * @param uidFieldName Field containing values that uniquely identify search documents; this field's values are used
       *                     to ensure that a search result set does not contain duplicate objects.
       */


      /**
       * Array containing either a property name or a path (list of property names) to a nested value
       */
      function Search(uidFieldName) {
        _classCallCheck(this, Search);

        if (!uidFieldName) {
          throw Error('js-search requires a uid field name constructor parameter');
        }

        this._uidFieldName = uidFieldName;

        // Set default/recommended strategies
        this._indexStrategy = new IndexStrategy.PrefixIndexStrategy();
        this._searchIndex = new SearchIndex.TfIdfSearchIndex(uidFieldName);
        this._sanitizer = new Sanitizer.LowerCaseSanitizer();
        this._tokenizer = new Tokenizer.SimpleTokenizer();

        this._documents = [];
        this._searchableFields = [];
      }

      /**
       * Override the default index strategy.
       * @param value Custom index strategy
       * @throws Error if documents have already been indexed by this search instance
       */


      _createClass(Search, [{
        key: 'addDocument',


        /**
         * Add a searchable document to the index. Document will automatically be indexed for search.
         * @param document
         */
        value: function addDocument(document) {
          this.addDocuments([document]);
        }

        /**
         * Adds searchable documents to the index. Documents will automatically be indexed for search.
         * @param document
         */

      }, {
        key: 'addDocuments',
        value: function addDocuments(documents) {
          this._documents = this._documents.concat(documents);
          this.indexDocuments_(documents, this._searchableFields);
        }

        /**
         * Add a new searchable field to the index. Existing documents will automatically be indexed using this new field.
         *
         * @param field Searchable field or field path. Pass a string to index a top-level field and an array of strings for nested fields.
         */

      }, {
        key: 'addIndex',
        value: function addIndex(field) {
          this._searchableFields.push(field);
          this.indexDocuments_(this._documents, [field]);
        }

        /**
         * Search all documents for ones matching the specified query text.
         * @param query
         * @returns {Array<Object>}
         */

      }, {
        key: 'search',
        value: function search(query) {
          var tokens = this._tokenizer.tokenize(this._sanitizer.sanitize(query));

          return this._searchIndex.search(tokens, this._documents);
        }

        /**
         * @param documents
         * @param _searchableFields Array containing property names and paths (lists of property names) to nested values
         * @private
         */

      }, {
        key: 'indexDocuments_',
        value: function indexDocuments_(documents, _searchableFields) {
          this._initialized = true;

          var indexStrategy = this._indexStrategy;
          var sanitizer = this._sanitizer;
          var searchIndex = this._searchIndex;
          var tokenizer = this._tokenizer;
          var uidFieldName = this._uidFieldName;

          for (var di = 0, numDocuments = documents.length; di < numDocuments; di++) {
            var doc = documents[di];
            var uid;

            if (uidFieldName instanceof Array) {
              uid = (0, _getNestedFieldValue2.default)(doc, uidFieldName);
            } else {
              uid = doc[uidFieldName];
            }

            for (var sfi = 0, numSearchableFields = _searchableFields.length; sfi < numSearchableFields; sfi++) {
              var fieldValue;
              var searchableField = _searchableFields[sfi];

              if (searchableField instanceof Array) {
                fieldValue = (0, _getNestedFieldValue2.default)(doc, searchableField);
              } else {
                fieldValue = doc[searchableField];
              }

              if (fieldValue != null && typeof fieldValue !== 'string' && fieldValue.toString) {
                fieldValue = fieldValue.toString();
              }

              if (typeof fieldValue === 'string') {
                var fieldTokens = tokenizer.tokenize(sanitizer.sanitize(fieldValue));

                for (var fti = 0, numFieldValues = fieldTokens.length; fti < numFieldValues; fti++) {
                  var fieldToken = fieldTokens[fti];
                  var expandedTokens = indexStrategy.expandToken(fieldToken);

                  for (var eti = 0, nummExpandedTokens = expandedTokens.length; eti < nummExpandedTokens; eti++) {
                    var expandedToken = expandedTokens[eti];

                    searchIndex.indexDocument(expandedToken, uid, doc);
                  }
                }
              }
            }
          }
        }
      }, {
        key: 'indexStrategy',
        set: function set(value) {
          if (this._initialized) {
            throw Error('IIndexStrategy cannot be set after initialization');
          }

          this._indexStrategy = value;
        },
        get: function get() {
          return this._indexStrategy;
        }

        /**
         * Override the default text sanitizing strategy.
         * @param value Custom text sanitizing strategy
         * @throws Error if documents have already been indexed by this search instance
         */

      }, {
        key: 'sanitizer',
        set: function set(value) {
          if (this._initialized) {
            throw Error('ISanitizer cannot be set after initialization');
          }

          this._sanitizer = value;
        },
        get: function get() {
          return this._sanitizer;
        }

        /**
         * Override the default search index strategy.
         * @param value Custom search index strategy
         * @throws Error if documents have already been indexed
         */

      }, {
        key: 'searchIndex',
        set: function set(value) {
          if (this._initialized) {
            throw Error('ISearchIndex cannot be set after initialization');
          }

          this._searchIndex = value;
        },
        get: function get() {
          return this._searchIndex;
        }

        /**
         * Override the default text tokenizing strategy.
         * @param value Custom text tokenizing strategy
         * @throws Error if documents have already been indexed by this search instance
         */

      }, {
        key: 'tokenizer',
        set: function set(value) {
          if (this._initialized) {
            throw Error('ITokenizer cannot be set after initialization');
          }

          this._tokenizer = value;
        },
        get: function get() {
          return this._tokenizer;
        }
      }]);

      return Search;
    }();

    });

    unwrapExports(Search_1);
    var Search_2 = Search_1.Search;

    var TokenHighlighter_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TokenHighlighter = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * This utility highlights the occurrences of tokens within a string of text. It can be used to give visual indicators
     * of match criteria within searchable fields.
     *
     * <p>For performance purposes this highlighter only works with full-word or prefix token indexes.
     */
    var TokenHighlighter = exports.TokenHighlighter = function () {

      /**
       * Constructor.
       *
       * @param opt_indexStrategy Index strategy used by Search
       * @param opt_sanitizer Sanitizer used by Search
       * @param opt_wrapperTagName Optional wrapper tag name; defaults to 'mark' (e.g. <mark>)
       */
      function TokenHighlighter(opt_indexStrategy, opt_sanitizer, opt_wrapperTagName) {
        _classCallCheck(this, TokenHighlighter);

        this._indexStrategy = opt_indexStrategy || new IndexStrategy.PrefixIndexStrategy();
        this._sanitizer = opt_sanitizer || new Sanitizer.LowerCaseSanitizer();
        this._wrapperTagName = opt_wrapperTagName || 'mark';
      }

      /**
       * Highlights token occurrences within a string by wrapping them with a DOM element.
       *
       * @param text e.g. "john wayne"
       * @param tokens e.g. ["wa"]
       * @returns {string} e.g. "john <mark>wa</mark>yne"
       */


      _createClass(TokenHighlighter, [{
        key: 'highlight',
        value: function highlight(text, tokens) {
          var tagsLength = this._wrapText('').length;

          var tokenDictionary = Object.create(null);

          // Create a token map for easier lookup below.
          for (var i = 0, numTokens = tokens.length; i < numTokens; i++) {
            var token = this._sanitizer.sanitize(tokens[i]);
            var expandedTokens = this._indexStrategy.expandToken(token);

            for (var j = 0, numExpandedTokens = expandedTokens.length; j < numExpandedTokens; j++) {
              var expandedToken = expandedTokens[j];

              if (!tokenDictionary[expandedToken]) {
                tokenDictionary[expandedToken] = [token];
              } else {
                tokenDictionary[expandedToken].push(token);
              }
            }
          }

          // Track actualCurrentWord and sanitizedCurrentWord separately in case we encounter nested tags.
          var actualCurrentWord = '';
          var sanitizedCurrentWord = '';
          var currentWordStartIndex = 0;

          // Note this assumes either prefix or full word matching.
          for (var i = 0, textLength = text.length; i < textLength; i++) {
            var character = text.charAt(i);

            if (character === ' ') {
              actualCurrentWord = '';
              sanitizedCurrentWord = '';
              currentWordStartIndex = i + 1;
            } else {
              actualCurrentWord += character;
              sanitizedCurrentWord += this._sanitizer.sanitize(character);
            }

            if (tokenDictionary[sanitizedCurrentWord] && tokenDictionary[sanitizedCurrentWord].indexOf(sanitizedCurrentWord) >= 0) {

              actualCurrentWord = this._wrapText(actualCurrentWord);
              text = text.substring(0, currentWordStartIndex) + actualCurrentWord + text.substring(i + 1);

              i += tagsLength;
              textLength += tagsLength;
            }
          }

          return text;
        }

        /**
         * @param text to wrap
         * @returns Text wrapped by wrapper tag (e.g. "foo" becomes "<mark>foo</mark>")
         * @private
         */

      }, {
        key: '_wrapText',
        value: function _wrapText(text) {
          var tagName = this._wrapperTagName;
          return '<' + tagName + '>' + text + '</' + tagName + '>';
        }
      }]);

      return TokenHighlighter;
    }();

    });

    unwrapExports(TokenHighlighter_1);
    var TokenHighlighter_2 = TokenHighlighter_1.TokenHighlighter;

    var commonjs = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });



    Object.defineProperty(exports, 'AllSubstringsIndexStrategy', {
      enumerable: true,
      get: function get() {
        return IndexStrategy.AllSubstringsIndexStrategy;
      }
    });
    Object.defineProperty(exports, 'ExactWordIndexStrategy', {
      enumerable: true,
      get: function get() {
        return IndexStrategy.ExactWordIndexStrategy;
      }
    });
    Object.defineProperty(exports, 'PrefixIndexStrategy', {
      enumerable: true,
      get: function get() {
        return IndexStrategy.PrefixIndexStrategy;
      }
    });



    Object.defineProperty(exports, 'CaseSensitiveSanitizer', {
      enumerable: true,
      get: function get() {
        return Sanitizer.CaseSensitiveSanitizer;
      }
    });
    Object.defineProperty(exports, 'LowerCaseSanitizer', {
      enumerable: true,
      get: function get() {
        return Sanitizer.LowerCaseSanitizer;
      }
    });



    Object.defineProperty(exports, 'TfIdfSearchIndex', {
      enumerable: true,
      get: function get() {
        return SearchIndex.TfIdfSearchIndex;
      }
    });
    Object.defineProperty(exports, 'UnorderedSearchIndex', {
      enumerable: true,
      get: function get() {
        return SearchIndex.UnorderedSearchIndex;
      }
    });



    Object.defineProperty(exports, 'SimpleTokenizer', {
      enumerable: true,
      get: function get() {
        return Tokenizer.SimpleTokenizer;
      }
    });
    Object.defineProperty(exports, 'StemmingTokenizer', {
      enumerable: true,
      get: function get() {
        return Tokenizer.StemmingTokenizer;
      }
    });
    Object.defineProperty(exports, 'StopWordsTokenizer', {
      enumerable: true,
      get: function get() {
        return Tokenizer.StopWordsTokenizer;
      }
    });



    Object.defineProperty(exports, 'Search', {
      enumerable: true,
      get: function get() {
        return Search_1.Search;
      }
    });



    Object.defineProperty(exports, 'StopWordsMap', {
      enumerable: true,
      get: function get() {
        return StopWordsMap_1.StopWordsMap;
      }
    });



    Object.defineProperty(exports, 'TokenHighlighter', {
      enumerable: true,
      get: function get() {
        return TokenHighlighter_1.TokenHighlighter;
      }
    });

    });

    var index = unwrapExports(commonjs);

    var JSSearch = /*#__PURE__*/Object.freeze({
        'default': index,
        __moduleExports: commonjs
    });

    var JsSearch = index || JSSearch;
    function buildIdxJSSearch(graph, idxConfig) {
        var types = {};
        Object.keys(idxConfig).forEach(function (k) { return types[k] = []; });
        var indexes = {};
        Object.keys(idxConfig).forEach(function (k) { return indexes[k] = null; });
        Object.values(graph.getNodes()).forEach(function (n) {
            if (BaseGraph_2.isTyped(n) === false) {
                throw Error("Node Type not supported in this scenario...!");
            }
            var type = n.type.toLowerCase();
            var idxObj = idxConfig[type];
            if (!idxObj) {
                return false;
            }
            var idxEntry = { id: n.id };
            idxObj.fields.forEach(function (f) { return idxEntry[f] = n.f(f); });
            types[type].push(idxEntry);
        });
        Object.values(idxConfig).forEach(function (model) {
            indexes[model.string] = new JsSearch.Search(model.id);
            model.fields.forEach(function (f) { return indexes[model.string].addIndex(f); });
            indexes[model.string].addDocuments(types[model.string]);
        });
        window['idx'] = indexes;
        return indexes;
    }

    var nwModels;
    (function (nwModels) {
        nwModels["category"] = "category";
        nwModels["product"] = "product";
        nwModels["customer"] = "customer";
        nwModels["supplier"] = "supplier";
        nwModels["employee"] = "employee";
        nwModels["order"] = "order";
    })(nwModels || (nwModels = {}));
    var nwIdxConfig = {
        category: {
            string: nwModels.category,
            id: 'id',
            fields: ['name', 'description']
        },
        product: {
            string: nwModels.product,
            id: 'id',
            fields: ['name']
        },
        customer: {
            string: nwModels.customer,
            id: 'id',
            fields: ['name', 'contact', 'ctitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax']
        },
        supplier: {
            string: nwModels.supplier,
            id: 'id',
            fields: ['name', 'contact', 'ctitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax', 'homePage']
        },
        employee: {
            string: nwModels.employee,
            id: 'id',
            fields: ['lastName', 'firstName', 'title', 'titleOfCourtesy', 'birthDate', 'address', 'city', 'region', 'postalCode', 'country', 'homePhone', 'notes']
        },
        order: {
            string: nwModels.order,
            id: 'id',
            fields: ['orderDate', 'requiredDate', 'shippedDate', 'shipVia', 'freight', 'shipName', 'shipAddress', 'shipCity', 'shipRegion', 'shipPostalCode', 'shipCountry']
        }
    };

    var testGraphDir = "../test-data/graphs";
    var graphExt = "json";
    var northwindConfig = {
        graphName: "northwind",
        graphFile: testGraphDir + "/northwind." + graphExt,
        searchTerm: "apple",
        idxConfig: nwIdxConfig,
        models: nwIdxConfig,
        searchModel: nwModels.product
    };

    var _this = undefined;
    window.$G = graphinius;
    window.comSim = $comSim;
    window.setSim = $setSim;
    window.scoSim = $scoSim;
    (function () {
        [northwindConfig].forEach(function (config) { return __awaiter(_this, void 0, void 0, function () {
            var graph, indexes, searchRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, importGraph(config)];
                    case 1:
                        graph = _a.sent();
                        indexes = createJSSearchIndex(graph, config);
                        searchRes = executeSearch(indexes, config, graph);
                        return [4, transitivity_cc(graph)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    })();
    function transitivity_cc(g) {
        return __awaiter(this, void 0, void 0, function () {
            var tic, toc, cg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cg = new ComputeGraph_2(g, window.tf);
                        tic = +new Date;
                        return [4, cg.clustCoef(true)];
                    case 1:
                        _a.sent();
                        toc = +new Date;
                        console.log("Clustering coefficient on " + g.label + " graph took " + (toc - tic) + " ms.");
                        tic = +new Date;
                        return [4, cg.transitivity(true)];
                    case 2:
                        _a.sent();
                        toc = +new Date;
                        console.log("Transitivity on " + g.label + " graph took " + (toc - tic) + " ms.");
                        return [2];
                }
            });
        });
    }
    function createJSSearchIndex(graph, config) {
        var tic = +new Date;
        var indexes = buildIdxJSSearch(graph, config.idxConfig);
        var toc = +new Date;
        console.log("Building Indexes in JS-SEARCH took " + (toc - tic) + " ms.");
        return indexes;
    }
    function executeSearch(indexes, config, graph) {
        var tic = +new Date;
        var searchRes = indexes[config.searchModel].search(config.searchTerm);
        var toc = +new Date;
        console.log("executing search for '" + config.searchTerm + "' in JS-SEARCH took " + (toc - tic) + " ms.");
        console.log(searchRes);
        searchRes.forEach(function (res) {
            console.log(graph.getNodeById(res.id));
        });
        return searchRes;
    }

}));
//# sourceMappingURL=bundle.js.map
