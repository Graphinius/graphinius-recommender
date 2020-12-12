
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('fs'), require('path'), require('https')) :
    typeof define === 'function' && define.amd ? define(['fs', 'path', 'https'], factory) :
    (global = global || self, factory(global.fs, global.path, global.https));
}(this, (function (fs, path, https) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /*----------------------------------------*/
    /*							BASE GRAPH								*/
    /*----------------------------------------*/
    /**
     * @todo maybe refactor to more sensible value(type)s...
     */
    var DIR;
    (function (DIR) {
        DIR["in"] = "ins";
        DIR["out"] = "outs";
        DIR["und"] = "unds";
    })(DIR || (DIR = {}));
    var GraphMode;
    (function (GraphMode) {
        GraphMode[GraphMode["INIT"] = 0] = "INIT";
        GraphMode[GraphMode["DIRECTED"] = 1] = "DIRECTED";
        GraphMode[GraphMode["UNDIRECTED"] = 2] = "UNDIRECTED";
        GraphMode[GraphMode["MIXED"] = 3] = "MIXED";
    })(GraphMode || (GraphMode = {}));

    var CMD_ENV_LOG = 'G_LOG';
    var GENERIC_TYPES = {
        Node: 'GENERIC',
        Edge: 'GENERIC',
        Graph: 'GENERIC'
    };
    var LOG_LEVELS = {
        debug: 'debug',
        production: 'production'
    };
    /**
     * Also checking if CMD line argument is given, which might not be the case
     * when running automated test cases.
     */
    function runLevel() {
        var log_level = LOG_LEVELS.production;
        if (typeof window === 'undefined' && typeof process !== 'undefined' && process.env && process.env[CMD_ENV_LOG]) {
            log_level = process.env[CMD_ENV_LOG];
        }
        return log_level;
    }

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
    })(LogColors || (LogColors = {}));
    var DEFAULT_COLOR = 37; // white
    var Logger = /** @class */ (function () {
        function Logger(config) {
            this.config = config || {
                log_level: runLevel()
            };
        }
        Logger.prototype.log = function (msg, color, bright) {
            if (bright === void 0) { bright = false; }
            if (this.config.log_level === LOG_LEVELS.debug) {
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
            if (this.config.log_level === LOG_LEVELS.debug) {
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
            if (this.config.log_level === LOG_LEVELS.debug) {
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
            if (this.config.log_level === LOG_LEVELS.debug) {
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
            if (this.config.log_level === LOG_LEVELS.debug) {
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
            if (this.config.log_level === LOG_LEVELS.debug) {
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
        /**
         * @todo this one prevents objects from being output in detail ([object Object])
         * @param color
         * @param output
         * @param bright
         */
        Logger.colorize = function (color, output, bright) {
            var out_bright = bright ? '\x1b[1m' : null;
            return [out_bright, '\x1b[', color, 'm', output, '\x1b[0m'].join('');
        };
        return Logger;
    }());

    var logger = new Logger();

    /**
     * @param cbs
     * @param context this pointer to the DFS or DFSVisit function
     */
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

    /**
     * Breadth first search - usually performed to see
     * reachability etc. Therefore we do not want 'segments'
     * or 'components' of our graph, but simply one well
     * defined result segment covering the whole graph.
     *
     * @param graph the graph to perform BFS on
     * @param v the vertex to use as a start vertex
     * @param config an optional config object, will be
     * automatically instantiated if not passed by caller
     * @returns {{}}
     * @constructor
     */
    function BFS(graph, v, config) {
        config = config || prepareBFSStandardConfig();
        var callbacks = config.callbacks;
        var dir_mode = config.dir_mode;
        /**
         * We are not traversing an empty graph...
         */
        if (graph.getMode() === GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        /**
         * We are not traversing a graph taking NO edges into account
         */
        if (dir_mode === GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        // scope to pass to callbacks at different stages of execution
        var bfsScope = {
            // marked: {},
            nodes: graph.getNodes(),
            queue: [],
            current: null,
            next_node: null,
            next_edge: null,
            root_node: v,
            adj_nodes: []
        };
        /**
           * HOOK 1: BFS INIT
           */
        if (callbacks.init_bfs) {
            execCallbacks(callbacks.init_bfs, bfsScope);
        }
        bfsScope.queue.push(v);
        var i = 0;
        while (i < bfsScope.queue.length) {
            bfsScope.current = bfsScope.queue[i++];
            /**
             * Do we move only in the directed subgraph,
             * undirected subgraph or complete (mixed) graph?
             */
            if (dir_mode === GraphMode.MIXED) {
                bfsScope.adj_nodes = bfsScope.current.reachNodes();
            }
            else if (dir_mode === GraphMode.UNDIRECTED) {
                bfsScope.adj_nodes = bfsScope.current.connNodes();
            }
            else if (dir_mode === GraphMode.DIRECTED) {
                bfsScope.adj_nodes = bfsScope.current.nextNodes();
            }
            else {
                bfsScope.adj_nodes = [];
            }
            /**
             * HOOK 2 - Sort adjacent nodes
             */
            if (typeof callbacks.sort_nodes === 'function') {
                callbacks.sort_nodes(bfsScope);
            }
            for (var adj_idx in bfsScope.adj_nodes) {
                bfsScope.next_node = bfsScope.adj_nodes[adj_idx].node;
                bfsScope.next_edge = bfsScope.adj_nodes[adj_idx].edge;
                /**
                 * HOOK 3 - Node unmarked
                 */
                if (config.result[bfsScope.next_node.getID()].distance === Number.POSITIVE_INFINITY) {
                    if (callbacks.node_unmarked) {
                        execCallbacks(callbacks.node_unmarked, bfsScope);
                    }
                }
                else {
                    /**
                     * HOOK 4 - Node marked
                     */
                    if (callbacks.node_marked) {
                        execCallbacks(callbacks.node_marked, bfsScope);
                    }
                }
            }
        }
        return config.result;
    }
    function prepareBFSStandardConfig() {
        var config = {
            result: {},
            callbacks: {
                init_bfs: [],
                node_unmarked: [],
                node_marked: [],
                sort_nodes: undefined
            },
            dir_mode: GraphMode.MIXED,
            messages: {},
            filters: {}
        }, result = config.result, callbacks = config.callbacks;
        var count = 0;
        var counter = function () {
            return count++;
        };
        /**
         * Standard INIT callback
         */
        var initBFS = function (context) {
            for (var key in context.nodes) {
                config.result[key] = {
                    distance: Number.POSITIVE_INFINITY,
                    parent: null,
                    counter: -1
                };
            }
            // initialize root node entry
            config.result[context.root_node.getID()] = {
                distance: 0,
                parent: context.root_node,
                counter: counter()
            };
        };
        callbacks.init_bfs.push(initBFS);
        // Standard Node unmarked callback
        // have to populate respective result entry
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

    /**
     * DFS Visit - one run to see what nodes are reachable
     * from a given "current" root node
     *
     * @param graph
     * @param current_root
     * @param config
     * @returns {{}}
     * @constructor
     */
    function DFSVisit(graph, current_root, config) {
        // scope to pass to callbacks at different stages of execution
        var dfsVisitScope = {
            stack: [],
            adj_nodes: [],
            stack_entry: null,
            current: null,
            current_root: current_root
        };
        config = config || prepareDFSVisitStandardConfig();
        var callbacks = config.callbacks, dir_mode = config.dir_mode;
        /**
         * We are not traversing an empty graph...
         */
        if (graph.getMode() === GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        /**
           * We are not traversing a graph taking NO edges into account
           */
        if (dir_mode === GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        /**
         * HOOK 1 - INIT (INNER DFS VISIT):
         * Initializing a possible result object,
         * possibly with the current_root;
         */
        if (callbacks.init_dfs_visit) {
            execCallbacks(callbacks.init_dfs_visit, dfsVisitScope);
        }
        // Start by pushing current root to the stack
        dfsVisitScope.stack.push({
            node: current_root,
            parent: current_root,
            weight: 0 // initial weight cost from current_root
        });
        while (dfsVisitScope.stack.length) {
            dfsVisitScope.stack_entry = dfsVisitScope.stack.pop();
            dfsVisitScope.current = dfsVisitScope.stack_entry.node;
            /**
             * HOOK 2 - AQUIRED CURRENT NODE / POPPED NODE
             */
            if (callbacks.node_popped) {
                execCallbacks(callbacks.node_popped, dfsVisitScope);
            }
            if (!config.dfs_visit_marked[dfsVisitScope.current.getID()]) {
                config.dfs_visit_marked[dfsVisitScope.current.getID()] = true;
                /**
                 * HOOK 3 - CURRENT NODE UNMARKED
                 */
                if (callbacks.node_unmarked) {
                    execCallbacks(callbacks.node_unmarked, dfsVisitScope);
                }
                /**
                 * Do we move only in the directed subgraph,
                 * undirected subgraph or complete (mixed) graph?
                 */
                if (dir_mode === GraphMode.MIXED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.reachNodes();
                }
                else if (dir_mode === GraphMode.UNDIRECTED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.connNodes();
                }
                else if (dir_mode === GraphMode.DIRECTED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.nextNodes();
                }
                /**
                 * HOOK 4 - SORT ADJACENT NODES
                 */
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
                /**
                 * HOOK 6 - ADJACENT NODES PUSHED - LEAVING CURRENT NODE
                 */
                if (callbacks.adj_nodes_pushed) {
                    execCallbacks(callbacks.adj_nodes_pushed, dfsVisitScope);
                }
            }
            else {
                /**
                 * HOOK 7 - CURRENT NODE ALREADY MARKED
                 */
                if (callbacks.node_marked) {
                    execCallbacks(callbacks.node_marked, dfsVisitScope);
                }
            }
        }
        return config.visit_result;
    }
    /**
     * Depth first search - used for reachability / exploration
     * of graph structure and as a basis for topological sorting
     * and component / community analysis.
     * Because DFS can be used as a basis for many other algorithms,
     * we want to keep the result as generic as possible to be
     * populated by the caller rather than the core DFS algorithm.
     *
     * @param graph
     * @param root
     * @param config
     * @returns {{}[]}
     * @constructor
     */
    function DFS(graph, root, config) {
        config = config || prepareDFSStandardConfig();
        var callbacks = config.callbacks, dir_mode = config.dir_mode;
        if (graph.getMode() === GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        var dfsScope = {
            marked: {},
            nodes: graph.getNodes()
        };
        /**
         * HOOK 1 - INIT (OUTER DFS)
         */
        if (callbacks.init_dfs) {
            execCallbacks(callbacks.init_dfs, dfsScope);
        }
        callbacks.adj_nodes_pushed = callbacks.adj_nodes_pushed || [];
        var markNode = function (context) {
            dfsScope.marked[context.current.getID()] = true;
        };
        callbacks.adj_nodes_pushed.push(markNode);
        // We need to put our results into segments
        // for easy counting of 'components'
        // TODO refactor for count & counter...
        var dfs_result = [{}];
        var dfs_idx = 0;
        var count = 0;
        var counter = function () {
            return count++;
        };
        /**
         * We not only add new nodes to the result object
         * of DFSVisit, but also to it's appropriate
         * segment of the dfs_result object
         */
        var addToProperSegment = function (context) {
            dfs_result[dfs_idx][context.current.getID()] = {
                parent: context.stack_entry.parent,
                counter: counter()
            };
        };
        // check if a callbacks object has been instantiated
        if (callbacks && callbacks.node_unmarked) {
            callbacks.node_unmarked.push(addToProperSegment);
        }
        // Start with root node, no matter what
        DFSVisit(graph, root, config);
        // Now take the rest in 'normal' order
        for (var node_key in dfsScope.nodes) {
            if (!dfsScope.marked[node_key]) {
                // Next segment in dfs_results
                dfs_idx++;
                dfs_result.push({});
                // Explore and fill next subsegment
                DFSVisit(graph, dfsScope.nodes[node_key], config);
            }
        }
        // console.dir(config.visit_result);
        return dfs_result;
    }
    /**
     * This is the only place in which a config object
     * is instantiated (except manually, of course)
     *
     * Therefore, we do not take any arguments
     */
    function prepareDFSVisitStandardConfig() {
        var config = {
            visit_result: {},
            callbacks: {},
            messages: {},
            dfs_visit_marked: {},
            dir_mode: GraphMode.MIXED
        }, result = config.visit_result, callbacks = config.callbacks;
        // internal letiable for order of visit
        // during DFS Visit                      
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
    /**
     * First instantiates config file for DFSVisit, then
     * enhances it with outer DFS init callback
     */
    function prepareDFSStandardConfig() {
        // First prepare DFS Visit callbacks
        var config = prepareDFSVisitStandardConfig(), callbacks = config.callbacks;
        // result = config.visit_result;
        // Now add outer DFS INIT callback
        callbacks.init_dfs = callbacks.init_dfs || [];
        var setInitialResultEntries = function (context) {
            // for ( let node_id in context.nodes ) {
            // 	result[node_id] = {
            // 		parent: null,
            // 		counter: -1
            // 	}
            // }
        };
        callbacks.init_dfs.push(setInitialResultEntries);
        return config;
    }

    var BinaryHeapMode;
    (function (BinaryHeapMode) {
        BinaryHeapMode[BinaryHeapMode["MIN"] = 0] = "MIN";
        BinaryHeapMode[BinaryHeapMode["MAX"] = 1] = "MAX";
    })(BinaryHeapMode || (BinaryHeapMode = {}));
    /**
     * We only support unique object ID's for now !!!
     * @TODO Rename into "ObjectBinaryHeap" or such...
     */
    var BinaryHeap = /** @class */ (function () {
        /**
         * Mode of a min heap should only be set upon
         * instantiation and never again afterwards...
         * @param _mode MIN or MAX heap
         * @param _evalObjID function to determine an object's identity
         * @param _evalPriority function to determine an objects score
         */
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
            this._nr_removes = 0; // just for debugging
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
        /**
         * Insert - Adding an object to the heap
         * @param obj the obj to add to the heap
         * @returns {number} the objects index in the internal array
         */
        BinaryHeap.prototype.insert = function (obj) {
            if (isNaN(this._evalPriority(obj))) {
                throw new Error("Cannot insert object without numeric priority.");
            }
            /**
             * @todo if we keep the unique ID stuff, check for it here and throw an Error if needed...
             */
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
                // check if left child exists && is larger than parent
                if (left_child_idx < this.size() && !this.orderCorrect(parent, left_child)) {
                    swap = left_child_idx;
                }
                // check if right child exists && is larger than parent
                if (right_child_idx < this.size() && !this.orderCorrect(parent, right_child)
                    && !this.orderCorrect(left_child, right_child)) {
                    swap = right_child_idx;
                }
                if (swap === null) {
                    break;
                }
                // we only have to swap one child, doesn't matter which one
                this._array[i] = this._array[swap];
                this._array[swap] = parent;
                // console.log(`Trickle down: swapping ${this._array[i]} and ${this._array[swap]}`);
                this.setNodePosition(this._array[i], i);
                this.setNodePosition(this._array[swap], swap);
                i = swap;
            }
        };
        BinaryHeap.prototype.trickleUp = function (i) {
            var child = this._array[i];
            // Can only trickle up from positive levels
            while (i) {
                var parent_idx = Math.floor((i + 1) / 2) - 1, parent = this._array[parent_idx];
                if (this.orderCorrect(parent, child)) {
                    break;
                }
                else {
                    this._array[parent_idx] = child;
                    this._array[i] = parent;
                    // console.log(`Trickle up: swapping ${child} and ${parent}`);
                    this.setNodePosition(child, parent_idx);
                    this.setNodePosition(parent, i);
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
        /**
         * Superstructure to enable search in BinHeap in O(1)
         * @param obj
         * @param pos
         */
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
        /**
         *
         */
        BinaryHeap.prototype.getNodePosition = function (obj) {
            var obj_key = this.evalInputObjID(obj);
            // console.log(obj_key);
            var occurrence = this._positions[obj_key];
            // console.log(occurrence);
            return occurrence ? occurrence.position : null;
        };
        /**
         * @param obj
         * @returns {number}
         */
        BinaryHeap.prototype.removeNodePosition = function (obj) {
            var obj_key = this.evalInputObjID(obj);
            delete this._positions[obj_key];
        };
        return BinaryHeap;
    }());

    var DEFAULT_WEIGHT = 1;
    /**
     * Priority first search
     *
     * Like BFS, we are not necessarily visiting the
     * whole graph, but only what's reachable from
     * a given start node.
     *
     * @param graph the graph to perform PFS only
     * @param v the node from which to start PFS
     * @param config a config object similar to that used
     * in BFS, automatically instantiated if not given..
     */
    function PFS(graph, v, config) {
        config = config || preparePFSStandardConfig();
        var callbacks = config.callbacks, dir_mode = config.dir_mode, evalPriority = config.evalPriority, evalObjID = config.evalObjID;
        /**
           * We are not traversing an empty graph...
           */
        if (graph.getMode() === GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        /**
           * We are not traversing a graph taking NO edges into account
           */
        if (dir_mode === GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        // Root NeighborEntries
        var start_ne = {
            node: v,
            edge: new BaseEdge('virtual start edge', v, v, { weighted: true, weight: 0 }),
            best: 0
        };
        var scope = {
            OPEN_HEAP: new BinaryHeap(BinaryHeapMode.MIN, evalPriority, evalObjID),
            OPEN: {},
            CLOSED: {},
            nodes: graph.getNodes(),
            root_node: v,
            current: start_ne,
            adj_nodes: [],
            next: null,
            proposed_dist: Number.POSITIVE_INFINITY,
        };
        /**
           * HOOK 1: PFS INIT
           */
        callbacks.init_pfs && execCallbacks(callbacks.init_pfs, scope);
        //initializes the result entry, gives the start node the final values, and default values for all others
        scope.OPEN_HEAP.insert(start_ne);
        scope.OPEN[start_ne.node.getID()] = start_ne;
        /**
         * Main loop
         */
        while (scope.OPEN_HEAP.size()) {
            scope.current = scope.OPEN_HEAP.pop();
            // console.log(`node: ${scope.current.node.getID()}`); //LOG!
            // console.log(`best: ${scope.current.best}`); //LOG!
            /**
             * HOOK 2: NEW CURRENT
             */
            callbacks.new_current && execCallbacks(callbacks.new_current, scope);
            if (scope.current == null) {
                console.log("HEAP popped undefined - HEAP size: " + scope.OPEN_HEAP.size());
            }
            // remove from OPEN
            scope.OPEN[scope.current.node.getID()] = undefined;
            // add it to CLOSED
            scope.CLOSED[scope.current.node.getID()] = scope.current;
            // TODO what if we already reached the goal?
            if (scope.current.node === config.goal_node) {
                /**
                 * HOOK 3: Goal node reached
                 */
                config.callbacks.goal_reached && execCallbacks(config.callbacks.goal_reached, scope);
                // If a goal node is set from the outside & we reach it, we stop.
                return config.result;
            }
            /**
             * Extend the current node, also called
             * "create n's successors"...
                 */
            // TODO: Reverse callback logic to NOT merge anything by default!!!
            if (dir_mode === GraphMode.MIXED) {
                scope.adj_nodes = scope.current.node.reachNodes();
            }
            else if (dir_mode === GraphMode.UNDIRECTED) {
                scope.adj_nodes = scope.current.node.connNodes();
            }
            else if (dir_mode === GraphMode.DIRECTED) {
                scope.adj_nodes = scope.current.node.nextNodes();
            }
            else {
                throw new Error('Unsupported traversal mode. Please use directed, undirected, or mixed');
            }
            /**
             * EXPAND AND EXAMINE NEIGHBORHOOD
             */
            for (var adj_idx in scope.adj_nodes) {
                scope.next = scope.adj_nodes[adj_idx];
                // console.log("scopeNext now:"); //LOG!
                // console.log(scope.next.node.getID());
                if (scope.CLOSED[scope.next.node.getID()]) {
                    /**
                     * HOOK 4: Goal node already closed
                     */
                    config.callbacks.node_closed && execCallbacks(config.callbacks.node_closed, scope);
                    continue;
                }
                if (scope.OPEN[scope.next.node.getID()]) {
                    // First let's recover the previous best solution from our OPEN structure,
                    // as the node's neighborhood-retrieving function cannot know it...
                    // console.log("MARKER - ALREADY OPEN"); //LOG!
                    scope.next.best = scope.OPEN[scope.next.node.getID()].best;
                    /**
                     * HOOK 5: Goal node already visited, but not yet closed
                     */
                    config.callbacks.node_open && execCallbacks(config.callbacks.node_open, scope);
                    scope.proposed_dist = scope.current.best + (isNaN(scope.next.edge.getWeight()) ? DEFAULT_WEIGHT : scope.next.edge.getWeight());
                    /**
                     * HOOK 6: Better path found
                     */
                    if (scope.next.best > scope.proposed_dist) {
                        config.callbacks.better_path && execCallbacks(config.callbacks.better_path, scope);
                        // HEAP operations are necessary for internal traversal,
                        // so we handle them here in the main loop
                        // removing next with the old weight and re-adding it with updated value
                        scope.OPEN_HEAP.remove(scope.next);
                        // console.log("MARKER - BETTER DISTANCE");
                        // console.log(scope.OPEN_HEAP);
                        scope.next.best = scope.proposed_dist;
                        scope.OPEN_HEAP.insert(scope.next);
                        scope.OPEN[scope.next.node.getID()].best = scope.proposed_dist;
                    }
                    /**
                     * HOOK 7: Equal path found (same weight)
                     */
                    //at the moment, this callback array is empty here in the PFS and in the Dijkstra, but used in the Johnsons
                    else if (scope.next.best === scope.proposed_dist) {
                        config.callbacks.equal_path && execCallbacks(config.callbacks.equal_path, scope);
                    }
                    continue;
                }
                // NODE NOT ENCOUNTERED
                config.callbacks.not_encountered && execCallbacks(config.callbacks.not_encountered, scope);
                // HEAP operations are necessary for internal traversal,
                // so we handle them here in the main loop
                scope.OPEN_HEAP.insert(scope.next);
                scope.OPEN[scope.next.node.getID()] = scope.next;
                // console.log("MARKER-NOT ENCOUNTERED"); //LOG!
            }
        }
        return config.result;
    }
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
            dir_mode: GraphMode.MIXED,
            goal_node: null,
            evalPriority: function (ne) {
                return ne.best || DEFAULT_WEIGHT;
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
        // Standard INIT callback
        var initPFS = function (context) {
            // initialize all nodes to infinite distance
            for (var key in context.nodes) {
                config.result[key] = {
                    distance: Number.POSITIVE_INFINITY,
                    parent: null,
                    counter: -1
                };
            }
            // initialize root node entry
            // maybe take heuristic into account right here...??
            config.result[context.root_node.getID()] = {
                distance: 0,
                parent: context.root_node,
                counter: counter()
            };
        };
        callbacks.init_pfs.push(initPFS);
        // Node not yet encountered callback
        var notEncountered = function (context) {
            // setting it's best score to actual distance + edge weight
            // and update result structure
            context.next.best = context.current.best + (isNaN(context.next.edge.getWeight()) ? DEFAULT_WEIGHT : context.next.edge.getWeight());
            config.result[context.next.node.getID()] = {
                distance: context.next.best,
                parent: context.current.node,
                counter: undefined
            };
        };
        callbacks.not_encountered.push(notEncountered);
        // Callback for when we find a better solution
        var betterPathFound = function (context) {
            config.result[context.next.node.getID()].distance = context.proposed_dist;
            config.result[context.next.node.getID()].parent = context.current.node;
        };
        callbacks.better_path.push(betterPathFound);
        return config;
    }

    /**
     *
     * @param graph
     * @param start
     */
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
        // Initialize an edge array just holding the node indices, weight and directed
        var graph_edges = graph.getDirEdgesArray().concat(graph.getUndEdgesArray());
        var bf_edges = [];
        for (var e_idx = 0; e_idx < graph_edges.length; ++e_idx) {
            edge = graph_edges[e_idx];
            var bf_edge_entry_1 = bf_edges.push([
                id_idx_map[edge.getNodes().a.getID()],
                id_idx_map[edge.getNodes().b.getID()],
                isFinite(edge.getWeight()) ? edge.getWeight() : DEFAULT_WEIGHT,
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
    /**
     *
     * @param graph
     * @param start
     */
    function BellmanFordDict(graph, start) {
        BFSanityChecks(graph, start);
        var distances = {}, edges, edge, a, b, weight, new_weight, nodes_size, neg_cycle = false;
        distances = {}; // Reset dists, TODO refactor
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
                weight = isFinite(edge.getWeight()) ? edge.getWeight() : DEFAULT_WEIGHT;
                updateDist(a, b, weight);
                !edge.isDirected() && updateDist(b, a, weight);
            }
        }
        for (var edgeID in edges) {
            edge = edges[edgeID];
            a = edge.getNodes().a.getID();
            b = edge.getNodes().b.getID();
            weight = isFinite(edge.getWeight()) ? edge.getWeight() : DEFAULT_WEIGHT;
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

    /**
     *
     * @param target
     * @param nodeToAdd
     *
     * @todo check if
     */
    function addExtraNandE(target, nodeToAdd) {
        var allNodes = target.getNodes();
        target.addNode(nodeToAdd);
        var tempCounter = 0;
        //now add a directed edge from the extranode to all graph nodes, excluding itself
        for (var nodeKey in allNodes) {
            if (allNodes[nodeKey].getID() != nodeToAdd.getID()) {
                target.addEdgeByNodeIDs("temp" + tempCounter, nodeToAdd.getID(), allNodes[nodeKey].getID(), { directed: true, weighted: true, weight: 0 });
                tempCounter++;
            }
        }
        return target;
    }
    function reWeighGraph(target, distDict, tempNode) {
        //reminder: w(e)'=w(e)+dist(a)-dist(b), a and b the start and end nodes of the edge
        var edges = target.getDirEdgesArray().concat(target.getUndEdgesArray());
        for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
            var edge = edges_1[_i];
            var a = edge.getNodes().a.getID();
            var b = edge.getNodes().b.getID();
            /**
             * no need to re-weigh the temporary edges starting from the extraNode, they will be deleted anyway
             * assuming that the node keys in the distDict correspond to the nodeIDs
             */
            if (a !== tempNode.getID() && edge.isWeighted) {
                var oldWeight = edge.getWeight();
                var newWeight = oldWeight + distDict[a] - distDict[b];
                edge.setWeight(newWeight);
            }
            else {
                var newWeight = DEFAULT_WEIGHT + distDict[a] - distDict[b];
                //collecting edgeID and directedness for later re-use
                var edgeID = edge.getID();
                var dirNess = edge.isDirected();
                // one does not simply change an edge to being weighted
                target.deleteEdge(edge);
                target.addEdgeByNodeIDs(edgeID, a, b, { directed: dirNess, weighted: true, weight: newWeight });
            }
        }
        return target;
    }

    var BaseGraph = /** @class */ (function () {
        function BaseGraph(_label) {
            this._label = _label;
            this._nr_nodes = 0;
            this._nr_dir_edges = 0;
            this._nr_und_edges = 0;
            this._mode = GraphMode.INIT;
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "mode", {
            get: function () {
                return this._mode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "stats", {
            get: function () {
                return this.getStats();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "inHist", {
            get: function () {
                return this.degreeHist(DIR.in);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "outHist", {
            get: function () {
                return this.degreeHist(DIR.out);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseGraph.prototype, "connHist", {
            get: function () {
                return this.degreeHist(DIR.und);
            },
            enumerable: false,
            configurable: true
        });
        BaseGraph.prototype.degreeHist = function (dir) {
            var result = [];
            for (var nid in this._nodes) {
                var node = this._nodes[nid];
                var deg = void 0;
                switch (dir) {
                    case DIR.in:
                        deg = node.in_deg;
                        break;
                    case DIR.out:
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
        /**
         *
         * @param clone
         *
         * @comment Convenience method -
         * Tests to be found in test suites for
         * BaseGraph, BellmanFord and Johnsons
         */
        BaseGraph.prototype.reweighIfHasNegativeEdge = function (clone) {
            if (clone === void 0) { clone = false; }
            if (this.hasNegativeEdge()) {
                var result_graph = clone ? this.cloneStructure() : this;
                var extraNode = new BaseNode("extraNode");
                result_graph = addExtraNandE(result_graph, extraNode);
                var BFresult = BellmanFordDict(result_graph, extraNode);
                if (BFresult.neg_cycle) {
                    throw new Error("The graph contains a negative cycle, thus it can not be processed");
                }
                else {
                    var newWeights = BFresult.distances;
                    result_graph = reWeighGraph(result_graph, newWeights, extraNode);
                    result_graph.deleteNode(extraNode);
                }
                return result_graph;
            }
        };
        /**
         * Version 1: do it in-place (to the object you receive)
         * Version 2: clone the graph first, return the mutated clone
         */
        BaseGraph.prototype.toDirectedGraph = function (copy) {
            if (copy === void 0) { copy = false; }
            var result_graph = copy ? this.cloneStructure() : this;
            // if graph has no edges, we want to throw an exception
            if (this._nr_dir_edges === 0 && this._nr_und_edges === 0) {
                throw new Error("Cowardly refusing to re-interpret an empty graph.");
            }
            return result_graph;
        };
        /**
         * @todo implement!!!
         */
        BaseGraph.prototype.toUndirectedGraph = function () {
            return this;
        };
        /**
         * what to do if some edges are not weighted at all?
         * Since graph traversal algortihms (and later maybe graphs themselves)
         * use default weights anyways, I am simply ignoring them for now...
         * @todo figure out how to test this...
         */
        BaseGraph.prototype.hasNegativeEdge = function () {
            var has_neg_edge = false, edge;
            // negative und_edges are always negative cycles
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
        /**
         * Do we want to throw an error if an edge is unweighted?
         * Or shall we let the traversal algorithm deal with DEFAULT weights like now?
         */
        BaseGraph.prototype.hasNegativeCycles = function (node) {
            var _this = this;
            if (!this.hasNegativeEdge()) {
                return false;
            }
            var negative_cycle = false, start = node ? node : this.getRandomNode();
            /**
             * Now do Bellman Ford over all graph components
             */
            DFS(this, start).forEach(function (comp) {
                var min_count = Number.POSITIVE_INFINITY, comp_start_node = "";
                Object.keys(comp).forEach(function (node_id) {
                    if (min_count > comp[node_id].counter) {
                        min_count = comp[node_id].counter;
                        comp_start_node = node_id;
                    }
                });
                if (BellmanFordArray(_this, _this._nodes[comp_start_node]).neg_cycle) {
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
        /**
         *
         * @param id
         * @param opts
         *
         * @todo addNode functions should check if a node with a given ID already exists -> node IDs have to be unique...
         */
        BaseGraph.prototype.addNodeByID = function (id, opts) {
            if (this.hasNodeID(id)) {
                throw new Error("Won't add node with duplicate ID.");
            }
            var node = new BaseNode(id, opts);
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
        /**
         * CAUTION - This function takes linear time in # nodes
         */
        BaseGraph.prototype.getRandomNode = function () {
            return this.pickRandomProperty(this._nodes);
        };
        BaseGraph.prototype.deleteNode = function (node) {
            var rem_node = this._nodes[node.getID()];
            if (!rem_node) {
                throw new Error('Cannot remove a foreign node.');
            }
            // Edges?
            var in_deg = node.in_deg;
            var out_deg = node.out_deg;
            var deg = node.deg;
            // Delete all edges brutally...
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
        // get the edge from node_a to node_b (or undirected)
        BaseGraph.prototype.getDirEdgeByNodeIDs = function (node_a_id, node_b_id) {
            var node_a = this.getNodeById(node_a_id);
            var node_b = this.getNodeById(node_b_id);
            BaseGraph.checkExistanceOfEdgeNodes(node_a, node_b);
            // check for outgoing directed edges
            var edges_dir = node_a.outEdges(), edges_dir_keys = Object.keys(edges_dir);
            for (var i = 0; i < edges_dir_keys.length; i++) {
                var edge = edges_dir[edges_dir_keys[i]];
                if (edge.getNodes().b.getID() == node_b_id) {
                    return edge;
                }
            }
            // if we managed to arrive here, there is no edge!
            throw new Error("Cannot find edge. There is no edge between Node " + node_a_id + " and " + node_b_id + ".");
        };
        BaseGraph.prototype.getUndEdgeByNodeIDs = function (node_a_id, node_b_id) {
            var node_a = this.getNodeById(node_a_id);
            var node_b = this.getNodeById(node_b_id);
            BaseGraph.checkExistanceOfEdgeNodes(node_a, node_b);
            // check for undirected edges
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
        /**
         * @description now all test cases pertaining addEdge() call this one...
         */
        BaseGraph.prototype.addEdgeByID = function (id, node_a, node_b, opts) {
            var edge = new BaseEdge(id, node_a, node_b, opts || {});
            return this.addEdge(edge) ? edge : null;
        };
        /**
         * @todo test cases should be reversed / completed
         * @todo make transactional
         */
        BaseGraph.prototype.addEdge = function (edge) {
            var node_a = edge.getNodes().a, node_b = edge.getNodes().b;
            if (!this.hasNodeID(node_a.getID()) || !this.hasNodeID(node_b.getID())
                || this._nodes[node_a.getID()] !== node_a || this._nodes[node_b.getID()] !== node_b) {
                throw new Error("can only add edge between two nodes existing in graph");
            }
            // connect edge to first node anyways
            node_a.addEdge(edge);
            if (edge.isDirected()) {
                // add edge to second node too
                node_b.addEdge(edge);
                this._dir_edges[edge.getID()] = edge;
                this._nr_dir_edges += 1;
                this.updateGraphMode();
            }
            else {
                // add edge to both nodes, except they are the same...
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
        // Some atomicity / rollback feature would be nice here...
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
        // Some atomicity / rollback feature would be nice here...
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
        // Some atomicity / rollback feature would be nice here...
        BaseGraph.prototype.deleteDirEdgesOf = function (node) {
            this.deleteInEdgesOf(node);
            this.deleteOutEdgesOf(node);
        };
        // Some atomicity / rollback feature would be nice here...
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
        // Some atomicity / rollback feature would be nice here...
        BaseGraph.prototype.deleteAllEdgesOf = function (node) {
            this.deleteDirEdgesOf(node);
            this.deleteUndEdgesOf(node);
        };
        /**
         * Remove all the (un)directed edges in the graph
         */
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
        /**
         * CAUTION - This function is linear in # directed edges
         */
        BaseGraph.prototype.getRandomDirEdge = function () {
            return this.pickRandomProperty(this._dir_edges);
        };
        /**
         * CAUTION - This function is linear in # undirected edges
         */
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
            var config = prepareBFSStandardConfig();
            var bfsNodeUnmarkedTestCallback = function (context) {
                if (config.result[context.next_node.getID()].counter > cutoff) {
                    context.queue = [];
                }
                else { //This means we only add cutoff -1 nodes to the cloned graph, # of nodes is then equal to cutoff
                    new_graph.addNode(context.next_node.clone());
                }
            };
            config.callbacks.node_unmarked.push(bfsNodeUnmarkedTestCallback);
            BFS(this, root, config);
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
                this._mode = GraphMode.MIXED;
            }
            else if (nr_dir) {
                this._mode = GraphMode.DIRECTED;
            }
            else if (nr_und) {
                this._mode = GraphMode.UNDIRECTED;
            }
            else {
                this._mode = GraphMode.INIT;
            }
        };
        BaseGraph.prototype.pickRandomProperty = function (propList) {
            var tmpList = Object.keys(propList);
            var randomPropertyName = tmpList[Math.floor(Math.random() * tmpList.length)];
            return propList[randomPropertyName];
        };
        /**
         * In some cases we need to return a large number of objects
         * in one swoop, as calls to Object.keys() are really slow
         * for large input objects.
         *
         * In order to do this, we only extract the keys once and then
         * iterate over the key list and add them to a result array
         * with probability = amount / keys.length
         *
         * We also mark all used keys in case we haven't picked up
         * enough entities for the result array after the first round.
         * We then just fill up the rest of the result array linearly
         * with as many unused keys as necessary
         *
         *
         * @todo include generic Test Cases
         * @todo check if amount is larger than propList size
         * @todo This seems like a simple hack - filling up remaining objects
         * Could be replaced by a better fraction-increasing function above...
         *
         * @param propList
         * @param amount
         * @returns {Array}
         */
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

    /**
     * Method to deep clone an object
     *
     * @param obj
     * @returns {*}
     *
     */
    function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        /**
         * @description for the sake of cloning graph structures, we have specialized
       *              clone methods within the BaseGraph, BaseNode & BaseEdge classes
         */
        if (obj instanceof BaseGraph || obj instanceof BaseNode || obj instanceof BaseEdge) {
            return null;
        }
        var cloneObj = Array.isArray(obj) ? [] : {};
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
    /**
     * @args an Array of any kind of objects
     * @cb callback to return a unique identifier;
     * if this is duplicate, the object will not be stored in result.
     * @returns {Array}
     *
     * @todo
     */
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
    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param args Array of all the object to take keys from
     * @returns result object
     */
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

    var BaseNode = /** @class */ (function () {
        /**
         * @param _id
         * @param config
         */
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
            this._features = config.features != null ? clone(config.features) : {};
        }
        BaseNode.isTyped = function (arg) {
            return !!arg.type;
        };
        Object.defineProperty(BaseNode.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "label", {
            get: function () {
                return this._label;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "features", {
            get: function () {
                return this._features;
            },
            enumerable: false,
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
            this._features = clone(features);
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "in_deg", {
            get: function () {
                return this._in_deg;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "out_deg", {
            get: function () {
                return this._out_deg;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "self_deg", {
            get: function () {
                return this._self_deg;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "self_in_deg", {
            get: function () {
                return this._self_in_deg;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "self_out_deg", {
            get: function () {
                return this._self_out_deg;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * We have to:
         * 1. throw an error if the edge is already attached
         * 2. add it to the edge array
         * 3. check type of edge (directed / undirected)
         * 4. update our degrees accordingly
         */
        BaseNode.prototype.addEdge = function (edge) {
            var ends = edge.getNodes();
            if (ends.a !== this && ends.b !== this) {
                throw new Error("Cannot add edge that does not connect to this node");
            }
            var id = edge.id;
            if (edge.isDirected()) {
                // is it outgoing or incoming?
                if (ends.a === this && !this._out_edges[id]) {
                    this._out_edges[id] = edge;
                    this._out_deg += 1;
                    // Directed self loop ?
                    if (ends.b === this && !this._in_edges[id]) {
                        this._in_edges[id] = edge;
                        this._in_deg += 1;
                        this._self_in_deg += 1;
                        this._self_out_deg += 1;
                    }
                }
                // No self loop
                else if (!this._in_edges[id]) { // nodes.b === this
                    this._in_edges[id] = edge;
                    this._in_deg += 1;
                }
            }
            // UNdirected
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
            return mergeObjects([this._in_edges, this._out_edges]);
        };
        BaseNode.prototype.allEdges = function () {
            return mergeObjects([this._in_edges, this._out_edges, this._und_edges]);
        };
        /**
         * @description automatically takes care of self-loops (since looking up in all internal data structures)
         * @param edge
         */
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
        /**
         * @description slow -> if possible, just clear ALL edges instead
         */
        BaseNode.prototype.clearOutEdges = function () {
            for (var _i = 0, _a = Object.values(this.outEdges()); _i < _a.length; _i++) {
                var e = _a[_i];
                this.removeEdge(e);
            }
        };
        /**
         * @description slow -> if possible, just clear ALL edges instead
         */
        BaseNode.prototype.clearInEdges = function () {
            for (var _i = 0, _a = Object.values(this.inEdges()); _i < _a.length; _i++) {
                var e = _a[_i];
                this.removeEdge(e);
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
        /**
         * return the set of all nodes that have
         * directed edges coming into this node
         */
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
        /**
         * return the set of all nodes that have
         * directed edges going out from this node
         */
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
        /**
         * return the set of all nodes that are
         * connected to this node via undirected edges
         */
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
        /**
         * return the set of all nodes 'reachable' from this node,
         * either via unconnected or outgoing edges
         *
         * @param identityFunc can be used to remove 'duplicates' from resulting array,
         * if necessary
         * @returns {Array}
         *
       */
        BaseNode.prototype.reachNodes = function (identityFunc) {
            var identity = 0;
            return mergeArrays([this.nextNodes(), this.connNodes()], identityFunc || (function (ne) { return identity++; }));
        };
        /**
         * return the set of all nodes connected to this node
         *
         * @param identityFunc can be used to remove 'duplicates' from resulting array,
         * if necessary
         * @returns {Array}
         *
       */
        BaseNode.prototype.allNeighbors = function (identityFunc) {
            var identity = 0;
            // console.log(this.nextNodes());
            return mergeArrays([this.prevNodes(), this.nextNodes(), this.connNodes()], identityFunc || function (ne) { return identity++; });
        };
        BaseNode.prototype.clone = function () {
            var new_node = new BaseNode(this._id);
            new_node._label = this._label;
            new_node.setFeatures(clone(this.getFeatures()));
            return new_node;
        };
        return BaseNode;
    }());

    var BaseEdge = /** @class */ (function () {
        function BaseEdge(_id, _node_a, _node_b, config) {
            this._id = _id;
            this._node_a = _node_a;
            this._node_b = _node_b;
            if (!(_node_a instanceof BaseNode) || !(_node_b instanceof BaseNode)) {
                throw new Error("cannot instantiate edge without two valid node objects");
            }
            config = config || {};
            this._directed = config.directed || false;
            this._weighted = config.weighted || false;
            // @NOTE isNaN and Number.isNaN confusion...
            this._weight = this._weighted ? (isNaN(config.weight) ? 1 : config.weight) : undefined;
            this._label = config.label || this._id;
            this._features = config.features != null ? clone(config.features) : {};
        }
        Object.defineProperty(BaseEdge.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseEdge.prototype, "label", {
            get: function () {
                return this._label;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseEdge.prototype, "features", {
            get: function () {
                return this._features;
            },
            enumerable: false,
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
            this._features = clone(features);
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
            if (!(new_node_a instanceof BaseNode) || !(new_node_b instanceof BaseNode)) {
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

    var TypedEdge = /** @class */ (function (_super) {
        __extends(TypedEdge, _super);
        function TypedEdge(_id, _node_a, _node_b, config) {
            if (config === void 0) { config = {}; }
            var _this = _super.call(this, _id, _node_a, _node_b, config) || this;
            _this._id = _id;
            _this._node_a = _node_a;
            _this._node_b = _node_b;
            _this._type = config.type || GENERIC_TYPES.Edge;
            return _this;
        }
        Object.defineProperty(TypedEdge.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: false,
            configurable: true
        });
        return TypedEdge;
    }(BaseEdge));

    var TypedNode = /** @class */ (function (_super) {
        __extends(TypedNode, _super);
        function TypedNode(_id, config) {
            var _a;
            if (config === void 0) { config = {}; }
            var _this = _super.call(this, _id, config) || this;
            _this._id = _id;
            _this._type = config.type || GENERIC_TYPES.Node;
            _this._typedAdjSets = (_a = {},
                _a[GENERIC_TYPES.Edge] = {
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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TypedNode.prototype, "stats", {
            get: function () {
                var result = {
                    typed_edges: {}
                };
                for (var _i = 0, _a = Object.keys(this._typedAdjSets); _i < _a.length; _i++) {
                    var type = _a[_i];
                    result.typed_edges[type] = { ins: 0, outs: 0, conns: 0 };
                    result.typed_edges[type].ins = this._typedAdjSets[type].ins ? this._typedAdjSets[type].ins.size : 0;
                    result.typed_edges[type].outs = this._typedAdjSets[type].outs ? this._typedAdjSets[type].outs.size : 0;
                    result.typed_edges[type].conns = this._typedAdjSets[type].conns ? this._typedAdjSets[type].conns.size : 0;
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        TypedNode.prototype.addEdge = function (edge) {
            if (!_super.prototype.addEdge.call(this, edge)) {
                return null;
            }
            var type = edge.type || GENERIC_TYPES.Edge;
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
            // logger.log(this._typedAdjSets);
            return edge;
        };
        /**
         * @description we assume
         * 							- type is present if super removes edge without throwing
         * @param edge
         */
        TypedNode.prototype.removeEdge = function (edge) {
            // Throws when something happens...
            _super.prototype.removeEdge.call(this, edge);
            var type = edge.type || GENERIC_TYPES.Edge;
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
            if (type !== GENERIC_TYPES.Edge && this.noEdgesOfTypeLeft(type)) {
                delete this._typedAdjSets[type];
            }
        };
        // removeEdgeByID(id: string): void {
        // 	super.removeEdgeByID(id);
        // }
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
            var result = new Set(); // spread operator has a problem with Set<string>...
            if (this._typedAdjSets[type]) {
                this._typedAdjSets[type].ins && result.add(__spreadArrays(this._typedAdjSets[type].ins));
                this._typedAdjSets[type].outs && result.add(__spreadArrays(this._typedAdjSets[type].outs));
                this._typedAdjSets[type].conns && result.add(__spreadArrays(this._typedAdjSets[type].conns));
            }
            return result;
        };
        /**
         * Unique ID for Neighbor (traversal)
         * @param e ITypedEdge
         * @description {node} `other / target` node
         * @returns unique neighbor entry ID
         */
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
    }(BaseNode));

    /**
     * @description TypedGraph only takes TypedNodes & TypedEdges
     * @description coding standard: following Neo4j / Cypher standard,
     * node types should be in capital letters & edge types expressive
     * two-pieces separated by underscore (except 'GENERIC')
     * @todo enforce uppercase?
     * @description we could couple edge type & direction in order to
     * make the system more stringent, but this would result in a more
     * complex setup with the possibility of too many Errors thrown.
     * @solution for now, leave the type / direction combination to the
     * programmer & just assume internal consistency
     * @todo how to handle traversal when direction given goes against
     *       direction information in the edge object ?
     * @todo just don't specify direction in traversal / expand and only
     *       follow the direction specified in edge !?
     * @todo in the last case, how to handle undirected edges ?
     * @todo allow 'GENERIC' edge types ? => yes!
     */
    var TypedGraph = /** @class */ (function (_super) {
        __extends(TypedGraph, _super);
        function TypedGraph(_label) {
            var _this = _super.call(this, _label) || this;
            _this._label = _label;
            /**
             * We don't need an extra array of registered types, since an
             * acceptable recommendation graph will only contain a few single
             * up to a few dozen different types, which are quickly obtained
             * via Object.keys()
             */
            _this._typedNodes = new Map();
            _this._typedEdges = new Map();
            _this._type = GENERIC_TYPES.Graph;
            _this._typedNodes.set(GENERIC_TYPES.Node, new Map());
            _this._typedEdges.set(GENERIC_TYPES.Edge, new Map());
            return _this;
        }
        /**
         * convenience methods
         */
        TypedGraph.prototype.n = function (id) {
            return this.getNodeById(id);
        };
        Object.defineProperty(TypedGraph.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: false,
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
        /**
         * Neighbor nodes depending on type
         */
        TypedGraph.prototype.ins = function (node, type) {
            var _this = this;
            var targets = node.ins(type);
            if (targets) {
                return new Set(__spreadArrays(targets).map(function (uid) { return _this.n(TypedNode.nIDFromUID(uid)); }));
            }
        };
        TypedGraph.prototype.outs = function (node, type) {
            var _this = this;
            var targets = node.outs(type);
            return new Set(__spreadArrays(targets).map(function (uid) { return _this.n(TypedNode.nIDFromUID(uid)); }));
        };
        TypedGraph.prototype.unds = function (node, type) {
            var _this = this;
            var targets = node.unds(type);
            if (targets) {
                return new Set(__spreadArrays(targets).map(function (uid) { return _this.n(TypedNode.nIDFromUID(uid)); }));
            }
        };
        /**
         * @todo abomination...
         */
        TypedGraph.convertToExpansionResult = function (input) {
            if (BaseNode.isTyped(input)) {
                return { set: new Set([input]), freq: new Map() };
            }
            else if (input instanceof Set) {
                return { set: input, freq: new Map() };
            }
            else {
                return input;
            }
        };
        /**
         * Neighbor nodes depending on type
         * @description takes either a single TypedNode or a Set of TypedNodes as input
         * @description we have to start with node objects, since dupe-checkable strings
         *              are only available once we deal with edge/neighborhood entries
         *              However, we then need to switch to an `intermediate representation`
         *              using those strings for dupe checking, and in the end map back to
         *              a node set...
         * @description In case of multiple input nodes, they could reference each other...
         *       -> Neo4j allows that, so we allow it as well (for now ;-))
         *
         * @todo decide if this difference in representation between node->neighbors &
         *       graph->nodeNeighbors is a problem or not (also performance-wise) !?
         * @todo decide if method call via [dir] is an abomination or not
         *       -> definitely screws up code assist / intellisense !
         *       -> (we all know it is...)
         *
         *
         *
         * @TODO draw a decision diagram...!
         * @TODO create a small, manageable test graph for expand(K)/periphery@K scenarios
         * 			 -> and put those test cases into the SYNC suite
         */
        TypedGraph.prototype.expand = function (input, dir, type) {
            // const expansionInbounds : ExpansionInbounds = {};
            var nodes = TypedGraph.convertToExpansionResult(input);
            var resultSet = new Set();
            var freqMap = new Map();
            for (var _i = 0, _a = nodes.set; _i < _a.length; _i++) {
                var node = _a[_i];
                var targets = node[dir](type);
                if (!targets) {
                    continue;
                }
                for (var _b = 0, targets_1 = targets; _b < targets_1.length; _b++) {
                    var target = targets_1[_b];
                    var nodeRef = this.n(TypedNode.nIDFromUID(target));
                    if (!freqMap.has(nodeRef)) {
                        // if we already have a frequency entry for this source node, we'll use it for initialization
                        // since if #paths already led to this node, and we have a path from this node to the
                        // target, then we got #paths to the target from whatever original source
                        if (nodes.freq.get(node)) {
                            freqMap.set(nodeRef, nodes.freq.get(node));
                        }
                        else {
                            freqMap.set(nodeRef, 1);
                        }
                    }
                    if (resultSet.has(nodeRef)) {
                        freqMap.set(nodeRef, freqMap.get(nodeRef) + nodes.freq.get(node));
                    }
                    resultSet.add(nodeRef);
                }
            }
            return { set: resultSet, freq: freqMap };
        };
        /**
         * expand over k steps
         *
         * @description like neo4j's `-[:REL*1..k]->`
         *              returning the node sets at distance <= `k`
         */
        TypedGraph.prototype.expandK = function (input, dir, type, cfg) {
            if (cfg === void 0) { cfg = {}; }
            if (cfg.k < 0) {
                throw new Error('cowardly refusing to expand a negative number of steps.');
            }
            var k = cfg.k && cfg.k < this._nr_nodes ? cfg.k : this._nr_nodes - 1;
            var nodes = TypedGraph.convertToExpansionResult(input);
            var resultSet = new Set();
            var freqMap = new Map();
            while (k--) {
                nodes = this.expand(nodes, dir, type);
                for (var _i = 0, _a = nodes.set; _i < _a.length; _i++) {
                    var nodeRef = _a[_i];
                    if (!freqMap.has(nodeRef)) {
                        freqMap.set(nodeRef, nodes.freq.get(nodeRef));
                    }
                    if (resultSet.has(nodeRef)) {
                        freqMap.set(nodeRef, freqMap.get(nodeRef) + nodes.freq.get(nodeRef));
                    }
                    resultSet.add(nodeRef);
                }
            }
            return { set: resultSet, freq: freqMap };
        };
        /**
         * @description like neo4j's `-[:REL*k]->`
         *              only returning the node set at distance `k`
         */
        TypedGraph.prototype.peripheryAtK = function (input, dir, type, cfg) {
            if (cfg === void 0) { cfg = {}; }
            if (cfg.k < 0) {
                throw new Error('cowardly refusing to expand a negative number of steps.');
            }
            var nodes = TypedGraph.convertToExpansionResult(input);
            var k = cfg.k && cfg.k < this._nr_nodes ? cfg.k : this._nr_nodes - 1;
            for (var it = 0; it < k; it++) {
                nodes = this.expand(nodes, dir, type);
            }
            return nodes;
        };
        /**
         * TYPED HISTOGRAMS
         */
        TypedGraph.prototype.inHistT = function (nType, eType) {
            return this.degreeHistT(DIR.in, nType, eType);
        };
        TypedGraph.prototype.outHistT = function (nType, eType) {
            return this.degreeHistT(DIR.out, nType, eType);
        };
        TypedGraph.prototype.connHistT = function (nType, eType) {
            return this.degreeHistT(DIR.und, nType, eType);
        };
        TypedGraph.prototype.degreeHistT = function (dir, nType, eType) {
            var result = [];
            for (var _i = 0, _a = this._typedNodes.get(nType); _i < _a.length; _i++) {
                var _b = _a[_i], node_id = _b[0], node = _b[1];
                var deg = void 0;
                switch (dir) {
                    case DIR.in:
                        deg = node.ins(eType) ? node.ins(eType).size : 0;
                        break;
                    case DIR.out:
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
            return result;
        };
        /**
         * @todo difference to super ??
         * @param id
         * @param opts
         */
        TypedGraph.prototype.addNodeByID = function (id, opts) {
            if (this.hasNodeID(id)) {
                throw new Error("Won't add node with duplicate ID.");
            }
            var node = new TypedNode(id, opts);
            return this.addNode(node) ? node : null;
        };
        TypedGraph.prototype.addNode = function (node) {
            if (!_super.prototype.addNode.call(this, node)) {
                return null;
            }
            // logger.log(JSON.stringify(node));
            var id = node.getID(), type = node.type ? node.type.toUpperCase() : null;
            /**
             *  Untyped nodes will be treated as `generic` type
             */
            if (!type) {
                // logger.log(`Received node type: ${type}`);
                this._typedNodes.get(GENERIC_TYPES.Node).set(id, node);
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
            var id = node.getID(), type = node.type ? node.type.toUpperCase() : GENERIC_TYPES.Node;
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
            var edge = new TypedEdge(id, a, b, opts || {});
            return this.addEdge(edge);
        };
        TypedGraph.prototype.addEdge = function (edge) {
            if (!_super.prototype.addEdge.call(this, edge)) {
                return null;
            }
            var id = edge.getID();
            var type = GENERIC_TYPES.Edge;
            if (BaseEdge.isTyped(edge) && edge.type) {
                type = edge.type.toUpperCase();
            }
            // logger.log('Got edge label: ' + edge.label);
            // logger.log('Got edge type: ' + type);
            /**
             *  Same procedure as every node...
             */
            if (id === type) {
                this._typedEdges.get(GENERIC_TYPES.Edge).set(id, edge);
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
            var type = GENERIC_TYPES.Edge;
            if (BaseEdge.isTyped(edge) && edge.type) {
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
            return __assign(__assign({}, _super.prototype.getStats.call(this)), { 
                // node_types: this.nodeTypes(),
                // edge_types: this.edgeTypes(),
                typed_nodes: typed_nodes,
                typed_edges: typed_edges });
        };
        return TypedGraph;
    }(BaseGraph));

    var DegreeMode;
    (function (DegreeMode) {
        DegreeMode[DegreeMode["in"] = 0] = "in";
        DegreeMode[DegreeMode["out"] = 1] = "out";
        DegreeMode[DegreeMode["und"] = 2] = "und";
        DegreeMode[DegreeMode["dir"] = 3] = "dir";
        DegreeMode[DegreeMode["all"] = 4] = "all";
    })(DegreeMode || (DegreeMode = {}));

    // import { Logger } from "../utils/Logger";
    // const logger = new Logger();
    var DEFAULT_WEIGHTED = false;
    var DEFAULT_ALPHA = 0.15;
    var DEFAULT_MAX_ITERATIONS = 1e3;
    var DEFAULT_EPSILON = 1e-6;
    var DEFAULT_NORMALIZE = false;
    var defaultInit = function (graph) { return 1 / graph.nrNodes(); };
    /**
     * PageRank for all nodes of a given graph by performing Random Walks
     * Implemented to give the same results as the NetworkX implementation, just faster!
     *
     * @description We assume that all necessary properties of a node's feature vector
     *              has been incorporated into it's initial rank or the link structure
     *              of the graph. This means we carefully have to construct our graph
     *              before interpreting Pagerank as anything meaninful for a particular
     *              application.
     *
     * @todo find a paper / article detailing this implementation (it's the networkx numpy version...)
     * @todo compute a ground truth for our sample social networks (python!)
     * @todo compute a ground truth for our jobs / beer / northwind / meetup sample graphs (neo4j / networkx)
     */
    var Pagerank = /** @class */ (function () {
        function Pagerank(_graph, config) {
            this._graph = _graph;
            config = config || {}; // just so we don't get `property of undefined` errors below
            this._weighted = config.weighted || DEFAULT_WEIGHTED;
            this._alpha = config.alpha || DEFAULT_ALPHA;
            this._maxIterations = config.maxIterations || DEFAULT_MAX_ITERATIONS;
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
            // logger.log(JSON.stringify(this._PRArrayDS));
        }
        Pagerank.prototype.getConfig = function () {
            return {
                weighted: this._weighted,
                alpha: this._alpha,
                maxIterations: this._maxIterations,
                epsilon: this._epsilon,
                normalize: this._normalize
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
                // set identifier to re-map later..
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
                /**
                 * @todo enhance this to actual weights!?
                 * @todo networkX requires a dict the size of the inputs, which is cumbersome for larger graphs
                 *       we want to do this smarter, but can we omit large parts of the (pseudo-)sparse matrix?
                 *       - where pseudo-sparse means containing only implicit values (jump chances)
                 */
                if (this._personalized) {
                    var tele_prob_node = config.tele_set[node.getID()] || 0;
                    this._PRArrayDS.teleport[i] = tele_prob_node;
                    teleport_prob_sum += tele_prob_node;
                    tele_prob_node && this._PRArrayDS.tele_size++;
                }
                ++i;
            }
            // normalize init values
            if (config.init_map && init_sum !== 1) {
                this._PRArrayDS.curr = this._PRArrayDS.curr.map(function (n) { return n /= init_sum; });
                this._PRArrayDS.old = this._PRArrayDS.old.map(function (n) { return n /= init_sum; });
            }
            // normalize teleport probabilities
            if (this._personalized && teleport_prob_sum !== 1) {
                this._PRArrayDS.teleport = this._PRArrayDS.teleport.map(function (n) { return n /= teleport_prob_sum; });
            }
            /**
             * We can only do this once all the mappings [node_id => arr_idx] have been established!
             */
            for (var key in nodes) {
                var node = this._graph.getNodeById(key);
                var node_idx = node.getFeature('PR_index');
                // set nodes to pull from
                var pull_i = [];
                var pull_weight_i = [];
                var incoming_edges = mergeObjects([node.inEdges(), node.undEdges()]);
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
                /**
                 * @todo test!
                 */
                if (this._weighted) {
                    this._PRArrayDS.pull_weight[node_idx] = pull_weight_i;
                }
            }
            // logger.log(`PR Array DS init took ${toc - tic} ms.`);
        };
        Pagerank.prototype.getRankMapFromArray = function () {
            var result = {};
            var nodes = this._graph.getNodes();
            if (this._normalize) {
                this.normalizePR();
            }
            for (var key in nodes) {
                result[key] = this._PRArrayDS.curr[nodes[key].getFeature('PR_index')];
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
            var p1d = [];
            var p2d = this._PRArrayDS.pull;
            for (var n in p2d) {
                for (var _i = 0, _a = p2d[n]; _i < _a.length; _i++) {
                    var i = _a[_i];
                    p1d.push(i);
                }
                +n !== p2d.length - 1 && p1d.push(-1);
            }
            return p1d;
        };
        Pagerank.prototype.computePR = function () {
            var ds = this._PRArrayDS;
            var N = this._graph.nrNodes();
            var delta_iter;
            for (var i = 0; i < this._maxIterations; ++i) {
                delta_iter = 0.0;
                // node is number...
                for (var node in ds.curr) {
                    var pull_rank = 0;
                    var idx = 0;
                    for (var _i = 0, _a = ds.pull[node]; _i < _a.length; _i++) {
                        var source = _a[_i];
                        /**
                         * This should never happen....
                         * IF the data structure _PRArrayDS was properly constructed
                         *
                         * @todo properly test _PRArrayDS as well as this beauty
                         *       (using a contrived, wrongly constructed pull 2D array)
                         */
                        if (ds.out_deg[source] === 0) {
                            throw ('Encountered zero divisor!');
                        }
                        var weight = this._weighted ? ds.pull_weight[node][idx++] : 1.0;
                        pull_rank += ds.old[source] * weight / ds.out_deg[source];
                    }
                    var link_pr = (1 - this._alpha) * pull_rank;
                    if (this._personalized) {
                        var jump_chance = ds.teleport[node] / ds.tele_size; // 0/x = 0
                        ds.curr[node] = link_pr + jump_chance;
                    }
                    else {
                        // logger.log(`Pulling PR for node ${node}: ${link_pr  + this._alpha / N}`);
                        ds.curr[node] = link_pr + this._alpha / N;
                    }
                    delta_iter += Math.abs(ds.curr[node] - ds.old[node]);
                }
                if (delta_iter <= this._epsilon) {
                    // logger.log(`CONVERGED after ${i} iterations with ${visits} visits and a final delta of ${delta_iter}.`);
                    return {
                        config: this.getConfig(),
                        map: this.getRankMapFromArray(),
                        iters: i,
                        delta: delta_iter
                    };
                }
                ds.old = __spreadArrays(ds.curr);
            }
            // logger.log(`ABORTED after ${this._maxIterations} iterations with ${visits} visits.`);
            return {
                config: this.getConfig(),
                map: this.getRankMapFromArray(),
                iters: this._maxIterations,
                delta: delta_iter
            };
        };
        return Pagerank;
    }());

    var logger$1 = new Logger();
    var SSL_PORT = '443';
    /**
     * @TODO: Test it !!!
     *
     * @param url
     * @param cb
     * @returns {ClientRequest}
     */
    function retrieveRemoteFile(config, cb) {
        if (typeof cb !== 'function') {
            throw new Error('Provided callback is not a function.');
        }
        logger$1.log("Requesting file via NodeJS request: " + config.remote_host + config.remote_path + config.file_name);
        var options = {
            host: config.remote_host,
            port: SSL_PORT,
            path: config.remote_path + config.file_name,
            method: 'GET'
        };
        var req = https.get(options, function (response) {
            // Continuously update stream with data
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                // Received data in body...
                cb(body);
            });
        });
        req.on('error', function (e) {
            logger$1.log("Request error: " + e.message);
        });
        return req;
    }
    function checkNodeEnvironment() {
        if (typeof window !== 'undefined') {
            throw new Error('When in Browser, do as the Browsers do! (use fetch and call readFromJSON() directly...) ');
        }
    }

    var labelKeys = {
        coords: 'c',
        n_label: 'l',
        n_type: 'x',
        n_features: 'f',
        edges: 'e',
        e_to: 't',
        e_dir: 'd',
        e_weight: 'w',
        e_label: 'l',
        e_type: 'y',
        e_features: 'f'
    };

    var EdgeDupeChecker = /** @class */ (function () {
        function EdgeDupeChecker(_graph) {
            this._graph = _graph;
        }
        EdgeDupeChecker.prototype.isDupe = function (e) {
            var pds = this.potentialEndpoints(e);
            if (!pds.size) {
                return false;
            }
            // logger.log(`Got ${pds.size} potential edge dupe`);
            for (var _i = 0, _a = pds.values(); _i < _a.length; _i++) {
                var pd = _a[_i];
                if (!EdgeDupeChecker.checkTypeWeightEquality(e, pd)
                    || !EdgeDupeChecker.typeWeightDupe(e, pd)) {
                    pds.delete(pd);
                }
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
        /**
         * @todo has no effect on test cases - either
         * 			 -) test cases are not granular enough
         * 			 -) typed-weighted-equality is irrelevant
         * @param e struct with potential edge info
         * @param oe other edge: IBaseEdge
         */
        EdgeDupeChecker.checkTypeWeightEquality = function (e, oe) {
            return BaseEdge.isTyped(oe) === e.typed && e.weighted === oe.isWeighted();
        };
        EdgeDupeChecker.typeWeightDupe = function (e, oe) {
            var neitherTypedNorWeighted = !e.typed && !e.weighted;
            var notTypedButWeighted = !e.typed && e.weighted;
            var weightEqual = e.weight === oe.getWeight();
            var typeEqual = e.typed && BaseEdge.isTyped(oe) && e.type === oe.type;
            return (neitherTypedNorWeighted || notTypedButWeighted && weightEqual || typeEqual);
        };
        return EdgeDupeChecker;
    }());

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

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
      return ([
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]]
      ]).join('');
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

    // See https://github.com/uuidjs/uuid for API details
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

    var uuid$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': uuid_1,
        __moduleExports: uuid_1
    });

    var logger$2 = new Logger();
    var DEFAULT_WEIGHT$1 = 1;
    var JSONInput = /** @class */ (function () {
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
            checkNodeEnvironment();
            // TODO test for existing file...
            var json = JSON.parse(fs.readFileSync(filepath).toString());
            return this.readFromJSON(json, graph);
        };
        JSONInput.prototype.readFromJSONURL = function (config, cb, graph) {
            var self = this;
            // Assert we are in Node.js environment
            checkNodeEnvironment();
            // Node.js
            retrieveRemoteFile(config, function (raw_graph) {
                graph = self.readFromJSON(JSON.parse(raw_graph), graph);
                cb(graph, undefined);
            });
        };
        JSONInput.prototype.readFromJSON = function (json, graph) {
            graph = graph || new BaseGraph(json.name);
            var edc = new EdgeDupeChecker(graph);
            var rlt = json.typeRLT;
            // logger.log(rlt);
            this.addNodesToGraph(json, graph);
            for (var node_id in json.data) {
                var node = graph.getNodeById(node_id);
                // Reading and instantiating edges
                var edges = json.data[node_id][labelKeys.edges];
                for (var e in edges) {
                    var edge_input = edges[e];
                    // BASE INFO
                    var target_node = this.getTargetNode(graph, edge_input);
                    var edge_label = edge_input[labelKeys.e_label];
                    var edge_type = rlt && rlt.edges[edge_input[labelKeys.e_type]] || null;
                    // DIRECTION
                    var directed = this._config.explicit_direction ? !!edge_input[labelKeys.e_dir] : this._config.directed;
                    // WEIGHTS
                    var weight_float = JSONInput.handleEdgeWeights(edge_input);
                    var weight_info = weight_float === weight_float ? weight_float : DEFAULT_WEIGHT$1;
                    var edge_weight = this._config.weighted ? weight_info : undefined;
                    // EDGE_ID creation
                    /**
                     * @todo replace with uuid v4() -> then clean up the mess... ;-)
                     */
                    var target_node_id = edge_input[labelKeys.e_to];
                    var dir_char = directed ? 'd' : 'u';
                    var edge_id = node_id + "_" + target_node_id + "_" + dir_char;
                    // DUPLICATE or CREATE ??
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
                        // Don't throw, just log
                        // logger.log(`Edge ${edge_id} is a duplicate according to assumptions... omitting.`);
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
                var type = BaseGraph.isTyped(graph) ? rlt && rlt.nodes[json.data[node_id][labelKeys.n_type]] : null;
                var label = json.data[node_id][labelKeys.n_label];
                var node = graph.addNodeByID(node_id, { label: label, type: type });
                // Here we set the reference...?
                features = json.data[node_id][labelKeys.n_features];
                if (features) {
                    node.setFeatures(features);
                }
                // Here we copy...?
                coords_json = json.data[node_id][labelKeys.coords];
                if (coords_json) {
                    coords = {};
                    for (coord_idx in coords_json) {
                        coords[coord_idx] = +coords_json[coord_idx];
                    }
                    node.setFeature(labelKeys.coords, coords);
                }
            }
        };
        /**
         * @todo implicitly add nodes referenced by edge
         *       but not present in graph input JSON ?
         */
        JSONInput.prototype.getTargetNode = function (graph, edge_input) {
            var target_node_id = edge_input[labelKeys.e_to];
            var target_node = graph.getNodeById(target_node_id);
            if (!target_node) {
                throw new Error('Node referenced by edge does not exist');
            }
            return target_node;
        };
        /**
         * Infinity & -Infinity cases are redundant, as JavaScript
         * handles them correctly anyways (for now)
         * @param edge_input
         */
        JSONInput.handleEdgeWeights = function (edge_input) {
            switch (edge_input[labelKeys.e_weight]) {
                case "undefined":
                    return DEFAULT_WEIGHT$1;
                case "Infinity":
                    return Number.POSITIVE_INFINITY;
                case "-Infinity":
                    return Number.NEGATIVE_INFINITY;
                case "MAX":
                    return Number.MAX_VALUE;
                case "MIN":
                    return Number.MIN_VALUE;
                default:
                    return parseFloat(edge_input[labelKeys.e_weight]);
            }
        };
        return JSONInput;
    }());

    var startChar = 64;
    var JSONOutput = /** @class */ (function () {
        function JSONOutput() {
        }
        // constructor() {}
        JSONOutput.prototype.constructTypeRLUT = function (g) {
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
            for (var _i = 0, ntypes_1 = ntypes; _i < ntypes_1.length; _i++) {
                var t = ntypes_1[_i];
                lut.nodes[t] = String.fromCharCode(nchar);
                rlut.nodes[String.fromCharCode(nchar++)] = t;
            }
            var etypes = g.edgeTypes();
            for (var _a = 0, etypes_1 = etypes; _a < etypes_1.length; _a++) {
                var t = etypes_1[_a];
                lut.edges[t] = String.fromCharCode(echar);
                rlut.edges[String.fromCharCode(echar++)] = t;
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
            if (BaseGraph.isTyped(graph)) {
                _a = this.constructTypeRLUT(graph), lut = _a[0], rlt = _a[1];
            }
            if (rlt) {
                result['typeRLT'] = rlt;
            }
            // Go through all nodes 
            nodes = graph.getNodes();
            for (var node_key in nodes) {
                node = nodes[node_key];
                node_struct = result.data[node.getID()] = (_b = {},
                    _b[labelKeys.edges] = [],
                    _b);
                if (node.getID() !== node.getLabel()) {
                    node_struct[labelKeys.n_label] = node.label;
                }
                if (BaseNode.isTyped(node)) {
                    node_struct[labelKeys.n_type] = lut && lut.nodes[node.type];
                }
                /* -------------------------------------- */
                /*					 UNDIRECTED edges							*/
                /* -------------------------------------- */
                und_edges = node.undEdges();
                for (var edge_key in und_edges) {
                    edge = und_edges[edge_key];
                    var endPoints = edge.getNodes();
                    var edgeStruct = (_c = {},
                        _c[labelKeys.e_to] = endPoints.a.getID() === node.getID() ? endPoints.b.getID() : endPoints.a.getID(),
                        _c[labelKeys.e_dir] = edge.isDirected() ? 1 : 0,
                        _c[labelKeys.e_weight] = JSONOutput.handleEdgeWeight(edge),
                        _c);
                    if (Object.keys(edge.getFeatures()).length) {
                        edgeStruct[labelKeys.e_features] = JSON.stringify(edge.getFeatures());
                    }
                    if (edge.getID() !== edge.getLabel()) {
                        edgeStruct[labelKeys.e_label] = edge.getLabel();
                    }
                    if (BaseEdge.isTyped(edge)) {
                        edgeStruct[labelKeys.e_type] = lut && lut.edges[edge.type];
                    }
                    node_struct[labelKeys.edges].push(edgeStruct);
                }
                /* -------------------------------------- */
                /*						DIRECTED edges							*/
                /* -------------------------------------- */
                dir_edges = node.outEdges();
                for (var edge_key in dir_edges) {
                    edge = dir_edges[edge_key];
                    var endPoints = edge.getNodes();
                    var edgeStruct = (_d = {},
                        _d[labelKeys.e_to] = endPoints.b.getID(),
                        _d[labelKeys.e_dir] = edge.isDirected() ? 1 : 0,
                        _d[labelKeys.e_weight] = JSONOutput.handleEdgeWeight(edge),
                        _d);
                    if (Object.keys(edge.getFeatures()).length) {
                        edgeStruct[labelKeys.e_features] = JSON.stringify(edge.getFeatures());
                    }
                    if (edge.getID() !== edge.getLabel()) {
                        edgeStruct[labelKeys.e_label] = edge.getLabel();
                    }
                    if (BaseEdge.isTyped(edge)) {
                        edgeStruct[labelKeys.e_type] = lut && lut.edges[edge.type];
                    }
                    node_struct[labelKeys.edges].push(edgeStruct);
                }
                // Features
                node_struct[labelKeys.n_features] = node.getFeatures();
                // Coords (shall we really?)
                if ((coords = node.getFeature(labelKeys.coords)) != null) {
                    node_struct[labelKeys.coords] = coords;
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

    /*----------------------------------*/
    /*							CONSTS							*/
    /*----------------------------------*/
    var setSimFuncs = {
        jaccard: jaccard,
        overlap: overlap
    };
    var PRECISION = 5;
    /*----------------------------------*/
    /*			SET SIMILARITY MEASURES			*/
    /*----------------------------------*/
    /**
     * @param a set A
     * @param b set B
     */
    function jaccard(a, b) {
        var ui = unionIntersect(a, b);
        return {
            isect: ui.isectSize,
            sim: +(ui.isectSize / ui.unionSize).toPrecision(PRECISION)
        };
    }
    /**
     * @description commonly used to detect sub/super relationships
     * @param a
     * @param b
     */
    function overlap(a, b) {
        var ui = unionIntersect(a, b);
        return {
            isect: ui.isectSize,
            sim: +(ui.isectSize / Math.min(a.size, b.size)).toPrecision(PRECISION)
        };
    }
    function unionIntersect(a, b) {
        var unionSize = new Set(__spreadArrays(Array.from(a), Array.from(b))).size;
        var isectSize = a.size + b.size - unionSize;
        return { unionSize: unionSize, isectSize: isectSize };
    }

    var PRECISION$1 = 5;
    var scoreSimFuncs = {
        cosine: cosine,
        cosineSets: cosineSets,
        euclidean: euclidean,
        euclideanSets: euclideanSets,
        pearson: pearson,
        pearsonSets: pearsonSets
    };
    /*----------------------------------*/
    /*			SET SIMILARITY MEASURES			*/
    /*----------------------------------*/
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
        var sim = +Math.sqrt(sum).toPrecision(PRECISION$1);
        // console.log(sim);
        return { sim: sim };
    }
    /**
     *
     * @param a
     * @param b
     */
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
        return { sim: +(numerator / (dena * denb)).toPrecision(PRECISION$1) };
    }
    /**
     *
     * @param a scores of user A for common targets
     * @param b scores of user B for common targets
     * @param a_mean avg rating for user a across ALL their ratings
     * @param b_mean avg rating for user b across ALL their ratings
     */
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
        sim = +(numerator / denominator).toPrecision(PRECISION$1);
        return { sim: sim };
    }
    /**
     * @description first extract
     * @param a
     * @param b
     */
    function cosineSets(a, b) {
        var _a = extractCommonTargetScores(a, b), aa = _a[0], ba = _a[1];
        if (!aa.length || !ba.length) {
            return { sim: 0 };
        }
        return cosine(aa, ba);
    }
    function euclideanSets(a, b) {
        var _a = extractCommonTargetScores(a, b), aa = _a[0], ba = _a[1];
        if (!aa.length || !ba.length) {
            return { sim: 0 };
        }
        return euclidean(aa, ba);
    }
    /**
     *
     * @param a
     * @param b
     */
    function pearsonSets(a, b) {
        var _a = extractCommonTargetScores(a, b), aa = _a[0], ba = _a[1], a_mean = _a[2], b_mean = _a[3];
        // console.log(aa, ba);
        if (!aa.length || !ba.length) {
            return { sim: 0 };
        }
        return pearson(aa, ba, a_mean, b_mean);
    }
    /**
     * @description this method implicitly ensures that sets given to cosine
     *              are always of the same length
     * @param a
     * @param b
     */
    function extractCommonTargetScores(a, b) {
        // we need to extract the target IDs first
        var a_id = new Set(), b_id = new Set();
        for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
            var e = a_1[_i];
            a_id.add(e.split('#')[0]);
        }
        for (var _a = 0, b_1 = b; _a < b_1.length; _a++) {
            var e = b_1[_a];
            b_id.add(e.split('#')[0]);
        }
        // now we collect the scores for common targets (in the same order)
        var score, a_map = new Map(), b_map = new Map(), a_vec = [], b_vec = [], earr, a_mean = 0, b_mean = 0;
        for (var _b = 0, a_2 = a; _b < a_2.length; _b++) {
            var e = a_2[_b];
            earr = e.split('#'); // we can assume 0 is the target...
            score = +earr[earr.length - 1];
            a_mean += score;
            if (b_id.has(earr[0])) {
                a_map.set(earr[0], score);
            }
        }
        for (var _c = 0, b_2 = b; _c < b_2.length; _c++) {
            var e = b_2[_c];
            var earr_1 = e.split('#');
            score = +earr_1[earr_1.length - 1];
            b_mean += score;
            if (a_id.has(earr_1[0])) {
                b_map.set(earr_1[0], score);
            }
        }
        // Maps preserve the order in which items were entered
        // console.log(a_map, b_map);
        var a_keys = Array.from(a_map.keys()).sort();
        for (var _d = 0, a_keys_1 = a_keys; _d < a_keys_1.length; _d++) {
            var key = a_keys_1[_d];
            a_vec.push(a_map.get(key));
        }
        var b_keys = Array.from(b_map.keys()).sort();
        for (var _e = 0, b_keys_1 = b_keys; _e < b_keys_1.length; _e++) {
            var key = b_keys_1[_e];
            b_vec.push(b_map.get(key));
        }
        return [a_vec, b_vec, a_mean / a.size, b_mean / b.size];
    }

    var v4$1 = undefined;

    var jsonIn = new JSONInput({ directed: true, explicit_direction: false, weighted: false });
    function importGraph(config) {
        return __awaiter(this, void 0, void 0, function () {
            var tic, graph, toc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Loading " + config.graphName + "...");
                        tic = +new Date;
                        return [4 /*yield*/, importGraphFromURL(config)];
                    case 1:
                        graph = _a.sent();
                        toc = +new Date;
                        console.log("Importing graph of |V|=" + graph.nrNodes() + " and |E_dir|=" + graph.nrDirEdges() + " took " + (toc - tic) + " ms.");
                        console.log(graph.stats);
                        return [2 /*return*/, graph];
                }
            });
        });
    }
    function importGraphFromURL(config) {
        return __awaiter(this, void 0, void 0, function () {
            var graphBytes, graphString, graph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(config.graphFile)];
                    case 1: return [4 /*yield*/, (_a.sent())];
                    case 2:
                        graphBytes = _a.sent();
                        return [4 /*yield*/, graphBytes.json()];
                    case 3:
                        graphString = _a.sent();
                        graph = new TypedGraph(config.graphName);
                        graph = jsonIn.readFromJSON(graphString, graph);
                        window.g = graph;
                        return [2 /*return*/, graph];
                }
            });
        });
    }

    var TheExpanse = /** @class */ (function () {
        function TheExpanse(_g) {
            this._g = _g;
        }
        /**
         * @description `expand` IDs to ITypedNodes -> 1:1 mapping
         * @param ids
         */
        TheExpanse.prototype.accumulateNodesFromIDs = function (ids) {
            var _this = this;
            var result = new Map();
            ids.forEach(function (id) { return result.set(id, _this._g.n(id)); });
            return result;
        };
        /**
         * @description expand & replace nodes with target nodes, for further expansion
         *
         * @example we want to
         *
         * @param nodes
         * @param dir
         * @param rel
         *
         * @todo incorporate frequencies ??
         *
         */
        TheExpanse.prototype.accumulateNodesFromNodes = function (nodes, dir, rel) {
            var _this = this;
            var result = new Map();
            nodes.forEach(function (node) {
                var targets;
                if (typeof node === 'string') {
                    targets = _this._g[dir](_this._g.n(node), rel);
                }
                else {
                    targets = _this._g[dir](node, rel);
                }
                if (targets) {
                    targets.forEach(function (t) { return result.set(t.id, t); });
                }
            });
            return result;
        };
        /**
         * @todo factor in / out / whatever
         */
        TheExpanse.prototype.nodeSetToMap = function (set) {
            var result = new Map();
            set.forEach(function (el) { return result.set(el.id, el); });
            return result;
        };
        /**
         * @description replace a node with a set of target nodes, but keep the original ID
         *
         * @example Map<companyID, Company> would be replaced with Map<companyID, Set<Employees>> through the 'WORKS_FOR' relation
         *          Map<personID, Person> would be replace with Map<personID, Set<Friends>> through the 'KNOWS' relation
         *
         * @param nodes either a node type as string or a Map of ITypedNodes
         * @param dir
         * @param rel
         * @returns expansion from a type of nodes or from a set of nodes
         *
         * @todo transfer to graphinius (core)?
         * @todo isn't the `set of nodes` version the same as our normal expander? Except we have a map here...?
         *       -> where is multiple dispatch when you need it !?
         */
        TheExpanse.prototype.accumulateSetsFromNodes = function (nodes, dir, rel) {
            var _this = this;
            var result = {};
            var sourceNodes = typeof nodes === 'string' ? this._g.getNodesT(nodes) : nodes;
            sourceNodes.forEach(function (n) {
                var targets = _this._g.expand(n, dir, rel).set;
                if (targets.size) {
                    result[n.label] = targets;
                }
            });
            return result;
        };
        /**
         * @description we get a map/dict of Set<ITypedNode>, a direction & a relation
         *
         * @example Map<companyID, Set<Employees>> would be replaced with Map<companyID, Set<Countries>> through the 'LIVES_IN' relation
         *          Map<personID, Set<Friends>> would be replaced with Map<personID, Set<Skills>> through the 'HAS_SKILL' relation
         *
         * @returns a object of key : Set<ITypedNode>, where each ex.set is an expansion of one input Set
         *
         * @todo this should give back sets with frequencies, so ExpansionResult objects
         */
        TheExpanse.prototype.accumulateSetsFromSets = function (sources, dir, rel) {
            var result = {};
            var keys = Object.keys(sources);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var i = keys_1[_i];
                for (var _a = 0, _b = sources[i]; _a < _b.length; _a++) {
                    var source = _b[_a];
                    if (!result[i]) {
                        result[i] = new Set();
                    }
                    var targets = this._g.expand(source, dir, rel);
                    if (!targets) {
                        continue;
                    }
                    for (var _c = 0, _d = targets.set; _c < _d.length; _c++) {
                        var target = _d[_c];
                        result[i].add(target);
                    }
                }
            }
            return result;
        };
        /**
         * @todo figure out how often we'll need that & test it !!!
         *
         * @param sources
         * @param dir
         * @param rel
         */
        TheExpanse.prototype.accumulateSetsFromSetsFreq = function (sources, dir, rel) {
            var result = {};
            var keys = Object.keys(sources);
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var i = keys_2[_i];
                if (!result[i]) {
                    result[i] = { set: new Set(), freq: new Map() };
                }
                var res = result[i];
                // convert each ExpansionInput into a properly formatted object
                var input_i = TypedGraph.convertToExpansionResult(sources[i]);
                // iterate over the set only? => Why not, it's delivering ITypedNodes
                // which simultaneously are the keys in the freq Map
                for (var _a = 0, _b = input_i.set; _a < _b.length; _a++) {
                    var source = _b[_a];
                    var targets = this._g.expand(source, dir, rel);
                    if (!targets.set.size) {
                        continue;
                    }
                    for (var _c = 0, _d = targets.set; _c < _d.length; _c++) {
                        var nodeRef = _d[_c];
                        if (!res.freq.has(nodeRef)) {
                            res.freq.set(nodeRef, targets.freq.get(nodeRef));
                        }
                        if (res.set.has(nodeRef)) {
                            res.freq.set(nodeRef, res.freq.get(nodeRef) + targets.freq.get(nodeRef));
                        }
                        res.set.add(nodeRef);
                    }
                }
            }
            return result;
        };
        /**
         *
         * @param obj
         * @param cfg
         */
        TheExpanse.prototype.setFromSetsTopK = function (obj, cfg) {
            if (cfg === void 0) { cfg = { k: 5, top: true }; }
            var sortFunc = cfg.top ? function (a, b) { return b[1] - a[1]; } : function (a, b) { return a[1] - b[1]; };
            var result = {};
            for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
                var _b = _a[_i], id = _b[0], e = _b[1];
                result[id] = { set: new Set(), freq: new Map() };
                result[id].freq = new Map(__spreadArrays(e.freq.entries()).sort(sortFunc).slice(0, cfg.k));
                result[id].set = new Set(__spreadArrays(result[id].freq.keys()));
            }
            return result;
        };
        /**
         * @description get a readable version of a SetFromSetsFreq object
         *
         * @param obj
         * @param idName
         * @param collectionName
         * @param itemName
         *
         * @returns object with source name & a list of plain item names with item frequencies
         *
         * @todo specify return value
         */
        TheExpanse.prototype.readableSetsFromSetsFreq = function (obj, idName, collectionName, itemName) {
            var _this = this;
            return Object.entries(obj).map(function (e) {
                var _a;
                return (_a = {},
                    _a[idName] = _this._g.n(e[0]).f('name'),
                    _a[collectionName] = Array.from(e[1].freq).map(function (v) {
                        var _a;
                        return (_a = { freq: v[1] }, _a[itemName] = v[0].f('name'), _a);
                    }),
                    _a);
            });
        };
        return TheExpanse;
    }());

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
        __proto__: null,
        'default': index,
        __moduleExports: commonjs
    });

    /**
     * Why does the import statement above work differently in TS / Bundled...
     */
    var JsSearch = index || JSSearch;
    function buildIdxJSSearch(graph, idxConfig) {
        var types = {};
        Object.keys(idxConfig).forEach(function (k) { return types[k] = []; });
        var indexes = {};
        Object.keys(idxConfig).forEach(function (k) { return indexes[k] = null; });
        Object.values(graph.getNodes()).forEach(function (n) {
            if (BaseGraph.isTyped(n) === false) {
                throw Error("Node Type not supported in this scenario...!");
            }
            var type = n.type.toLowerCase();
            // console.log(type);
            var idxObj = idxConfig[type];
            if (!idxObj) {
                return false;
            }
            var idxEntry = { id: n.id };
            idxObj.fields.forEach(function (f) { return idxEntry[f] = n.f(f); });
            // console.log(idxEntry);
            types[type].push(idxEntry);
        });
        // Object.keys(types).forEach(k => console.log(`${types[k].length} nodes of type ${k} registered.`));
        Object.values(idxConfig).forEach(function (model) {
            indexes[model.string] = new JsSearch.Search(model.id);
            model.fields.forEach(function (f) { return indexes[model.string].addIndex(f); });
            indexes[model.string].addDocuments(types[model.string]);
        });
        /**
         * In `jsdom` environment, we can use the first variant...
         */
        window['idx'] = indexes;
        // if ( typeof window != null ) {
        //   (<any>window)['idx'] = indexes;
        // }
        // console.log(indexes);
        return indexes;
    }

    /**
     * Just for declaring available Models
     *
     * @todo find more elegant solution (24/07/2019 -> too tired...)
     */
    var shopifyModels;
    (function (shopifyModels) {
        shopifyModels["tag"] = "tag";
        shopifyModels["vendor"] = "vendor";
        shopifyModels["product"] = "product";
        shopifyModels["product_type"] = "product_type";
    })(shopifyModels || (shopifyModels = {}));
    var shopifyIdxConfig = {
        tag: {
            string: 'tag',
            id: 'id',
            fields: ['name']
        },
        vendor: {
            string: 'vendor',
            id: 'id',
            fields: ['label']
        },
        product_type: {
            string: 'product_type',
            id: 'id',
            fields: ['label']
        },
        product: {
            string: 'product',
            id: 'id',
            fields: ['label', 'body_sanitized']
        }
    };

    var testGraphDir = "../test-data/graphs";
    var graphs = [
        'hauslondon',
        'www.mvmtwatches',
        'skinnydiplondon'
    ];
    var graph = graphs[1];
    var graphExt = "json";
    var shopifyConfig = {
        graphName: graph,
        graphFile: testGraphDir + "/" + graph + ".com." + graphExt,
        searchTerm: "caramel",
        idxConfig: shopifyIdxConfig,
        models: shopifyModels,
        searchModel: shopifyModels.product
    };

    /* HACKETY HACK */
    window.setSim = setSimFuncs;
    window.scoSim = scoreSimFuncs;
    (function () {
        [shopifyConfig].forEach(function (config) { return __awaiter(void 0, void 0, void 0, function () {
            var graph, indexes, searchRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importGraph(config)];
                    case 1:
                        graph = (_a.sent());
                        window.ex = new TheExpanse(graph);
                        indexes = createJSSearchIndex(graph, config);
                        searchRes = executeSearch(indexes, config, graph);
                        testBDPFS(graph);
                        testPagerank(graph);
                        return [2 /*return*/];
                }
            });
        }); });
    })();
    function testBDPFS(g) {
        var tic, toc;
        [BFS, DFS, PFS].forEach(function (traversal) {
            tic = +new Date();
            traversal(g, g.getRandomNode());
            toc = +new Date();
            console.log(traversal.name + " on " + g.label + " graph took " + (toc - tic) + " ms.");
        });
    }
    function testPagerank(g) {
        var PR = new Pagerank(g, { normalize: true, epsilon: 1e-6 });
        var tic = +new Date();
        PR.computePR();
        var toc = +new Date();
        console.log("Pagerank on " + g.label + " graph took " + (toc - tic) + " ms.");
    }
    function createJSSearchIndex(graph, config) {
        var tic = +new Date();
        var indexes = buildIdxJSSearch(graph, config.idxConfig);
        var toc = +new Date();
        console.log("Building Indexes in JS-SEARCH took " + (toc - tic) + " ms.");
        return indexes;
    }
    function executeSearch(indexes, config, graph) {
        var tic = +new Date();
        var searchRes = indexes[config.searchModel].search(config.searchTerm);
        var toc = +new Date();
        console.log("executing search for '" + config.searchTerm + "' in JS-SEARCH took " + (toc - tic) + " ms.");
        console.log(searchRes);
        searchRes.forEach(function (res) {
            console.log(graph.getNodeById(res.id));
        });
        return searchRes;
    }

})));
//# sourceMappingURL=bundle.js.map
