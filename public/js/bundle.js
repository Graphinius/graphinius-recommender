
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

    var StructUtils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    function clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof Nodes.BaseNode || obj instanceof Edges.BaseEdge) {
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
    function mergeArrays(args, cb = undefined) {
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
        let ret = [];
        let idx_a = 0;
        let idx_b = 0;
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

    var Nodes = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    class BaseNode {
        constructor(_id, features) {
            this._id = _id;
            this._in_degree = 0;
            this._out_degree = 0;
            this._und_degree = 0;
            this._in_edges = {};
            this._out_edges = {};
            this._und_edges = {};
            this._features = typeof features !== 'undefined' ? StructUtils.clone(features) : {};
            this._label = this._features["label"] || this._id;
        }
        getID() {
            return this._id;
        }
        getLabel() {
            return this._label;
        }
        setLabel(label) {
            this._label = label;
        }
        getFeatures() {
            return this._features;
        }
        getFeature(key) {
            return this._features[key];
        }
        setFeatures(features) {
            this._features = StructUtils.clone(features);
        }
        setFeature(key, value) {
            this._features[key] = value;
        }
        deleteFeature(key) {
            var feat = this._features[key];
            delete this._features[key];
            return feat;
        }
        clearFeatures() {
            this._features = {};
        }
        inDegree() {
            return this._in_degree;
        }
        outDegree() {
            return this._out_degree;
        }
        degree() {
            return this._und_degree;
        }
        addEdge(edge) {
            var nodes = edge.getNodes();
            if (nodes.a !== this && nodes.b !== this) {
                throw new Error("Cannot add edge that does not connect to this node");
            }
            var edge_id = edge.getID();
            if (edge.isDirected()) {
                if (nodes.a === this && !this._out_edges[edge_id]) {
                    this._out_edges[edge_id] = edge;
                    this._out_degree += 1;
                    if (nodes.b === this && !this._in_edges[edge_id]) {
                        this._in_edges[edge.getID()] = edge;
                        this._in_degree += 1;
                    }
                }
                else if (!this._in_edges[edge_id]) {
                    this._in_edges[edge.getID()] = edge;
                    this._in_degree += 1;
                }
            }
            else {
                if (this._und_edges[edge.getID()]) {
                    throw new Error("Cannot add same undirected edge multiple times.");
                }
                this._und_edges[edge.getID()] = edge;
                this._und_degree += 1;
            }
        }
        hasEdge(edge) {
            return !!this._in_edges[edge.getID()] || !!this._out_edges[edge.getID()] || !!this._und_edges[edge.getID()];
        }
        hasEdgeID(id) {
            return !!this._in_edges[id] || !!this._out_edges[id] || !!this._und_edges[id];
        }
        getEdge(id) {
            var edge = this._in_edges[id] || this._out_edges[id] || this._und_edges[id];
            if (!edge) {
                throw new Error("Cannot retrieve non-existing edge.");
            }
            return edge;
        }
        inEdges() {
            return this._in_edges;
        }
        outEdges() {
            return this._out_edges;
        }
        undEdges() {
            return this._und_edges;
        }
        dirEdges() {
            return StructUtils.mergeObjects([this._in_edges, this._out_edges]);
        }
        allEdges() {
            return StructUtils.mergeObjects([this._in_edges, this._out_edges, this._und_edges]);
        }
        removeEdge(edge) {
            if (!this.hasEdge(edge)) {
                throw new Error("Cannot remove unconnected edge.");
            }
            var id = edge.getID();
            var e = this._und_edges[id];
            if (e) {
                delete this._und_edges[id];
                this._und_degree -= 1;
            }
            e = this._in_edges[id];
            if (e) {
                delete this._in_edges[id];
                this._in_degree -= 1;
            }
            e = this._out_edges[id];
            if (e) {
                delete this._out_edges[id];
                this._out_degree -= 1;
            }
        }
        removeEdgeID(id) {
            if (!this.hasEdgeID(id)) {
                throw new Error("Cannot remove unconnected edge.");
            }
            var e = this._und_edges[id];
            if (e) {
                delete this._und_edges[id];
                this._und_degree -= 1;
            }
            e = this._in_edges[id];
            if (e) {
                delete this._in_edges[id];
                this._in_degree -= 1;
            }
            e = this._out_edges[id];
            if (e) {
                delete this._out_edges[id];
                this._out_degree -= 1;
            }
        }
        clearOutEdges() {
            this._out_edges = {};
            this._out_degree = 0;
        }
        clearInEdges() {
            this._in_edges = {};
            this._in_degree = 0;
        }
        clearUndEdges() {
            this._und_edges = {};
            this._und_degree = 0;
        }
        clearEdges() {
            this.clearInEdges();
            this.clearOutEdges();
            this.clearUndEdges();
        }
        prevNodes() {
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
        }
        nextNodes() {
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
        }
        connNodes() {
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
        }
        reachNodes(identityFunc) {
            var identity = 0;
            return StructUtils.mergeArrays([this.nextNodes(), this.connNodes()], identityFunc || (ne => identity++));
        }
        allNeighbors(identityFunc) {
            var identity = 0;
            return StructUtils.mergeArrays([this.prevNodes(), this.nextNodes(), this.connNodes()], identityFunc || function (ne) { return identity++; });
        }
        clone() {
            let new_node = new BaseNode(this._id);
            new_node._label = this._label;
            new_node.setFeatures(StructUtils.clone(this.getFeatures()));
            return new_node;
        }
    }
    exports.BaseNode = BaseNode;
    });

    unwrapExports(Nodes);
    var Nodes_1 = Nodes.BaseNode;

    var Edges = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    class BaseEdge {
        constructor(_id, _node_a, _node_b, options) {
            this._id = _id;
            this._node_a = _node_a;
            this._node_b = _node_b;
            if (!(_node_a instanceof Nodes.BaseNode) || !(_node_b instanceof Nodes.BaseNode)) {
                throw new Error("cannot instantiate edge without two valid node objects");
            }
            options = options || {};
            this._directed = options.directed || false;
            this._weighted = options.weighted || false;
            this._weight = this._weighted ? (isNaN(options.weight) ? 1 : options.weight) : undefined;
            this._label = options.label || this._id;
        }
        getID() {
            return this._id;
        }
        getLabel() {
            return this._label;
        }
        setLabel(label) {
            this._label = label;
        }
        isDirected() {
            return this._directed;
        }
        isWeighted() {
            return this._weighted;
        }
        getWeight() {
            return this._weight;
        }
        setWeight(w) {
            if (!this._weighted) {
                throw new Error("Cannot set weight on unweighted edge.");
            }
            this._weight = w;
        }
        getNodes() {
            return { a: this._node_a, b: this._node_b };
        }
        clone(new_node_a, new_node_b) {
            if (!(new_node_a instanceof Nodes.BaseNode) || !(new_node_b instanceof Nodes.BaseNode)) {
                throw new Error("refusing to clone edge if any new node is invalid");
            }
            return new BaseEdge(this._id, new_node_a, new_node_b, {
                directed: this._directed,
                weighted: this._weighted,
                weight: this._weight,
                label: this._label
            });
        }
    }
    exports.BaseEdge = BaseEdge;
    });

    unwrapExports(Edges);
    var Edges_1 = Edges.BaseEdge;

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
        var config = config || prepareBFSStandardConfig(), callbacks = config.callbacks, dir_mode = config.dir_mode;
        if (graph.getMode() === Graph.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === Graph.GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        var bfsScope = {
            marked: {},
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
            if (dir_mode === Graph.GraphMode.MIXED) {
                bfsScope.adj_nodes = bfsScope.current.reachNodes();
            }
            else if (dir_mode === Graph.GraphMode.UNDIRECTED) {
                bfsScope.adj_nodes = bfsScope.current.connNodes();
            }
            else if (dir_mode === Graph.GraphMode.DIRECTED) {
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
            dir_mode: Graph.GraphMode.MIXED,
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
        var config = config || prepareDFSVisitStandardConfig(), callbacks = config.callbacks, dir_mode = config.dir_mode;
        if (graph.getMode() === Graph.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === Graph.GraphMode.INIT) {
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
                if (dir_mode === Graph.GraphMode.MIXED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.reachNodes();
                }
                else if (dir_mode === Graph.GraphMode.UNDIRECTED) {
                    dfsVisitScope.adj_nodes = dfsVisitScope.current.connNodes();
                }
                else if (dir_mode === Graph.GraphMode.DIRECTED) {
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
        var config = config || prepareDFSStandardConfig(), callbacks = config.callbacks, dir_mode = config.dir_mode;
        if (graph.getMode() === Graph.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === Graph.GraphMode.INIT) {
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
            dir_mode: Graph.GraphMode.MIXED
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
    class BinaryHeap {
        constructor(_mode = BinaryHeapMode.MIN, _evalPriority = (obj) => {
            if (typeof obj !== 'number' && typeof obj !== 'string') {
                return NaN;
            }
            if (typeof obj === 'number') {
                return obj | 0;
            }
            return parseInt(obj);
        }, _evalObjID = (obj) => {
            return obj;
        }) {
            this._mode = _mode;
            this._evalPriority = _evalPriority;
            this._evalObjID = _evalObjID;
            this._nr_removes = 0;
            this._array = [];
            this._positions = {};
        }
        getMode() {
            return this._mode;
        }
        getArray() {
            return this._array;
        }
        getPositions() {
            return this._positions;
        }
        size() {
            return this._array.length;
        }
        getEvalPriorityFun() {
            return this._evalPriority;
        }
        evalInputScore(obj) {
            return this._evalPriority(obj);
        }
        getEvalObjIDFun() {
            return this._evalObjID;
        }
        evalInputObjID(obj) {
            return this._evalObjID(obj);
        }
        peek() {
            return this._array[0];
        }
        pop() {
            if (this.size()) {
                return this.remove(this._array[0]);
            }
        }
        find(obj) {
            var pos = this.getNodePosition(obj);
            return this._array[pos];
        }
        insert(obj) {
            if (isNaN(this._evalPriority(obj))) {
                throw new Error("Cannot insert object without numeric priority.");
            }
            this._array.push(obj);
            this.setNodePosition(obj, this.size() - 1);
            this.trickleUp(this.size() - 1);
        }
        remove(obj) {
            this._nr_removes++;
            if (isNaN(this._evalPriority(obj))) {
                throw new Error('Object invalid.');
            }
            var objID = this._evalObjID(obj), found = null;
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
        }
        trickleDown(i) {
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
        }
        trickleUp(i) {
            var child = this._array[i];
            while (i) {
                var parent_idx = Math.floor((i + 1) / 2) - 1, parent = this._array[parent_idx];
                if (this.orderCorrect(parent, child)) {
                    break;
                }
                else {
                    this._array[parent_idx] = child;
                    this._array[i] = parent;
                    this.setNodePosition(child, parent_idx);
                    this.setNodePosition(parent, i);
                    i = parent_idx;
                }
            }
        }
        orderCorrect(obj_a, obj_b) {
            var obj_a_pr = this._evalPriority(obj_a);
            var obj_b_pr = this._evalPriority(obj_b);
            if (this._mode === BinaryHeapMode.MIN) {
                return obj_a_pr <= obj_b_pr;
            }
            else {
                return obj_a_pr >= obj_b_pr;
            }
        }
        setNodePosition(obj, pos) {
            if (obj == null || pos == null || pos !== (pos | 0)) {
                throw new Error('minium required arguments are obj and new_pos');
            }
            var pos_obj = {
                score: this.evalInputScore(obj),
                position: pos
            };
            var obj_key = this.evalInputObjID(obj);
            this._positions[obj_key] = pos_obj;
        }
        getNodePosition(obj) {
            var obj_key = this.evalInputObjID(obj);
            var occurrence = this._positions[obj_key];
            return occurrence ? occurrence.position : null;
        }
        removeNodePosition(obj) {
            var obj_key = this.evalInputObjID(obj);
            delete this._positions[obj_key];
        }
    }
    exports.BinaryHeap = BinaryHeap;
    });

    unwrapExports(BinaryHeap_1);
    var BinaryHeap_2 = BinaryHeap_1.BinaryHeapMode;
    var BinaryHeap_3 = BinaryHeap_1.BinaryHeap;

    var PFS_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });




    exports.DEFAULT_WEIGHT = 1;
    function PFS(graph, v, config) {
        var config = config || preparePFSStandardConfig(), callbacks = config.callbacks, dir_mode = config.dir_mode, evalPriority = config.evalPriority, evalObjID = config.evalObjID;
        if (graph.getMode() === Graph.GraphMode.INIT) {
            throw new Error('Cowardly refusing to traverse graph without edges.');
        }
        if (dir_mode === Graph.GraphMode.INIT) {
            throw new Error('Cannot traverse a graph with dir_mode set to INIT.');
        }
        var start_ne = {
            node: v,
            edge: new Edges.BaseEdge('virtual start edge', v, v, { weighted: true, weight: 0 }),
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
            if (dir_mode === Graph.GraphMode.MIXED) {
                scope.adj_nodes = scope.current.node.reachNodes();
            }
            else if (dir_mode === Graph.GraphMode.UNDIRECTED) {
                scope.adj_nodes = scope.current.node.connNodes();
            }
            else if (dir_mode === Graph.GraphMode.DIRECTED) {
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
        let config = {
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
            dir_mode: Graph.GraphMode.MIXED,
            goal_node: null,
            evalPriority: function (ne) {
                return ne.best || exports.DEFAULT_WEIGHT;
            },
            evalObjID: function (ne) {
                return ne.node.getID();
            }
        };
        let callbacks = config.callbacks;
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
        let distances = [], nodes = graph.getNodes(), edge, node_keys = Object.keys(nodes), node, id_idx_map = {}, new_weight, neg_cycle = false;
        for (let n_idx = 0; n_idx < node_keys.length; ++n_idx) {
            node = nodes[node_keys[n_idx]];
            distances[n_idx] = (node === start) ? 0 : Number.POSITIVE_INFINITY;
            id_idx_map[node.getID()] = n_idx;
        }
        let graph_edges = graph.getDirEdgesArray().concat(graph.getUndEdgesArray());
        let bf_edges = [];
        for (let e_idx = 0; e_idx < graph_edges.length; ++e_idx) {
            edge = graph_edges[e_idx];
            let bf_edge_entry = bf_edges.push([
                id_idx_map[edge.getNodes().a.getID()],
                id_idx_map[edge.getNodes().b.getID()],
                isFinite(edge.getWeight()) ? edge.getWeight() : PFS_1.DEFAULT_WEIGHT,
                edge.isDirected()
            ]);
        }
        for (let i = 0; i < node_keys.length - 1; ++i) {
            for (let e_idx = 0; e_idx < bf_edges.length; ++e_idx) {
                edge = bf_edges[e_idx];
                updateDist(edge[0], edge[1], edge[2]);
                !edge[3] && updateDist(edge[1], edge[0], edge[2]);
            }
        }
        for (let e_idx = 0; e_idx < bf_edges.length; ++e_idx) {
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
        return { distances, neg_cycle };
    }
    exports.BellmanFordArray = BellmanFordArray;
    function BellmanFordDict(graph, start) {
        BFSanityChecks(graph, start);
        let distances = {}, edges, edge, a, b, weight, new_weight, nodes_size, neg_cycle = false;
        distances = {};
        edges = graph.getDirEdgesArray().concat(graph.getUndEdgesArray());
        nodes_size = graph.nrNodes();
        for (let node in graph.getNodes()) {
            distances[node] = Number.POSITIVE_INFINITY;
        }
        distances[start.getID()] = 0;
        for (let i = 0; i < nodes_size - 1; ++i) {
            for (let e_idx = 0; e_idx < edges.length; ++e_idx) {
                edge = edges[e_idx];
                a = edge.getNodes().a.getID();
                b = edge.getNodes().b.getID();
                weight = isFinite(edge.getWeight()) ? edge.getWeight() : PFS_1.DEFAULT_WEIGHT;
                updateDist(a, b, weight);
                !edge.isDirected() && updateDist(b, a, weight);
            }
        }
        for (let edgeID in edges) {
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
        return { distances, neg_cycle };
    }
    exports.BellmanFordDict = BellmanFordDict;
    });

    unwrapExports(BellmanFord);
    var BellmanFord_1 = BellmanFord.BellmanFordArray;
    var BellmanFord_2 = BellmanFord.BellmanFordDict;

    var Johnsons_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });




    function Johnsons(graph) {
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error("Cowardly refusing to traverse graph without edges.");
        }
        let allNodes = graph.getNodes();
        if (graph.hasNegativeEdge()) {
            var extraNode = new Nodes.BaseNode("extraNode");
            graph = addExtraNandE(graph, extraNode);
            let BFresult = BellmanFord.BellmanFordDict(graph, extraNode);
            if (BFresult.neg_cycle) {
                throw new Error("The graph contains a negative cycle, thus it can not be processed");
            }
            else {
                let newWeights = BFresult.distances;
                graph = reWeighGraph(graph, newWeights, extraNode);
                graph.deleteNode(extraNode);
                return PFSFromAllNodes(graph);
            }
        }
        return PFSFromAllNodes(graph);
    }
    exports.Johnsons = Johnsons;
    function addExtraNandE(target, nodeToAdd) {
        let allNodes = target.getNodes();
        target.addNode(nodeToAdd);
        let tempCounter = 0;
        for (let nodeKey in allNodes) {
            if (allNodes[nodeKey].getID() != nodeToAdd.getID()) {
                target.addEdgeByNodeIDs("temp" + tempCounter, nodeToAdd.getID(), allNodes[nodeKey].getID(), { directed: true, weighted: true, weight: 0 });
                tempCounter++;
            }
        }
        return target;
    }
    exports.addExtraNandE = addExtraNandE;
    function reWeighGraph(target, distDict, tempNode) {
        let edges = target.getDirEdgesArray().concat(target.getUndEdgesArray());
        for (let edge of edges) {
            var a = edge.getNodes().a.getID();
            var b = edge.getNodes().b.getID();
            if (a == tempNode.getID()) {
                continue;
            }
            else if (edge.isWeighted) {
                let oldWeight = edge.getWeight();
                let newWeight = oldWeight + distDict[a] - distDict[b];
                edge.setWeight(newWeight);
            }
            else {
                let oldWeight = PFS_1.DEFAULT_WEIGHT;
                let newWeight = oldWeight + distDict[a] - distDict[b];
                let edgeID = edge.getID();
                let dirNess = edge.isDirected();
                target.deleteEdge(edge);
                target.addEdgeByNodeIDs(edgeID, a, b, { directed: dirNess, weighted: true, weight: newWeight });
            }
        }
        return target;
    }
    exports.reWeighGraph = reWeighGraph;
    function PFSFromAllNodes(graph) {
        let dists = graph.adjListArray();
        let next = graph.nextArray();
        let nodesDict = graph.getNodes();
        let nodeIDIdxMap = {};
        let i = 0;
        for (let key in nodesDict) {
            nodeIDIdxMap[nodesDict[key].getID()] = i++;
        }
        let specialConfig = PFS_1.preparePFSStandardConfig();
        var notEncounteredJohnsons = function (context) {
            context.next.best =
                context.current.best + (isNaN(context.next.edge.getWeight()) ? PFS_1.DEFAULT_WEIGHT : context.next.edge.getWeight());
            let i = nodeIDIdxMap[context.root_node.getID()], j = nodeIDIdxMap[context.next.node.getID()];
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
            let i = nodeIDIdxMap[context.root_node.getID()], j = nodeIDIdxMap[context.next.node.getID()];
            dists[i][j] = context.proposed_dist;
            if (context.current.node !== context.root_node) {
                next[i][j].splice(0, next[i][j].length, nodeIDIdxMap[context.current.node.getID()]);
            }
        };
        specialConfig.callbacks.better_path.splice(0, 1, betterPathJohnsons);
        var equalPathJohnsons = function (context) {
            let i = nodeIDIdxMap[context.root_node.getID()], j = nodeIDIdxMap[context.next.node.getID()];
            if (context.current.node !== context.root_node) {
                next[i][j] = StructUtils.mergeOrderedArraysNoDups(next[i][j], [nodeIDIdxMap[context.current.node.getID()]]);
            }
        };
        specialConfig.callbacks.equal_path.push(equalPathJohnsons);
        for (let key in nodesDict) {
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

    var run_config = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const LOG_LEVELS = {
        debug: 'debug',
        production: 'production'
    };
    exports.LOG_LEVELS = LOG_LEVELS;
    let log_level = LOG_LEVELS.production;
    if (typeof window === 'undefined' && typeof process !== 'undefined' && process.env) {
        log_level = process.env['G_LOG'];
    }
    const RUN_CONFIG = {
        log_level
    };
    exports.RUN_CONFIG = RUN_CONFIG;
    });

    unwrapExports(run_config);
    var run_config_1 = run_config.LOG_LEVELS;
    var run_config_2 = run_config.RUN_CONFIG;

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
    const DEFAULT_COLOR = 37;
    class Logger {
        constructor(config) {
            this.config = null;
            this.config = config || run_config.RUN_CONFIG;
        }
        log(msg, color = DEFAULT_COLOR, bright = false) {
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                console.log.call(console, this.colorize(color, msg, bright));
                return true;
            }
            return false;
        }
        error(err, color = DEFAULT_COLOR, bright = false) {
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                console.error.call(console, this.colorize(color, err, bright));
                return true;
            }
            return false;
        }
        dir(obj, color = DEFAULT_COLOR, bright = false) {
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                console.dir.call(console, this.colorize(color, obj, bright));
                return true;
            }
            return false;
        }
        info(msg, color = DEFAULT_COLOR, bright = false) {
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                console.info.call(console, this.colorize(color, msg, bright));
                return true;
            }
            return false;
        }
        warn(msg, color = DEFAULT_COLOR, bright = false) {
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                console.warn.call(console, this.colorize(color, msg, bright));
                return true;
            }
            return false;
        }
        write(msg, color = DEFAULT_COLOR, bright = false) {
            if (this.config.log_level === run_config.LOG_LEVELS.debug) {
                process.stdout.write.call(process.stdout, this.colorize(color, msg, bright));
                return true;
            }
            return false;
        }
        colorize(color, output, bright) {
            let out_bright = bright ? '\x1b[1m' : null;
            return [out_bright, '\x1b[', color, 'm', output, '\x1b[0m'].join('');
        }
    }
    exports.Logger = Logger;
    });

    unwrapExports(Logger_1);
    var Logger_2 = Logger_1.LogColors;
    var Logger_3 = Logger_1.Logger;

    var Graph = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });







    let logger = new Logger_1.Logger();
    const DEFAULT_WEIGHT = 1;
    var GraphMode;
    (function (GraphMode) {
        GraphMode[GraphMode["INIT"] = 0] = "INIT";
        GraphMode[GraphMode["DIRECTED"] = 1] = "DIRECTED";
        GraphMode[GraphMode["UNDIRECTED"] = 2] = "UNDIRECTED";
        GraphMode[GraphMode["MIXED"] = 3] = "MIXED";
    })(GraphMode = exports.GraphMode || (exports.GraphMode = {}));
    class BaseGraph {
        constructor(_label) {
            this._label = _label;
            this._nr_nodes = 0;
            this._nr_dir_edges = 0;
            this._nr_und_edges = 0;
            this._mode = GraphMode.INIT;
            this._nodes = {};
            this._dir_edges = {};
            this._und_edges = {};
        }
        reweighIfHasNegativeEdge(clone = false) {
            if (this.hasNegativeEdge()) {
                let result_graph = clone ? this.cloneStructure() : this;
                var extraNode = new Nodes.BaseNode("extraNode");
                result_graph = Johnsons_1.addExtraNandE(result_graph, extraNode);
                let BFresult = BellmanFord.BellmanFordDict(result_graph, extraNode);
                if (BFresult.neg_cycle) {
                    throw new Error("The graph contains a negative cycle, thus it can not be processed");
                }
                else {
                    let newWeights = BFresult.distances;
                    result_graph = Johnsons_1.reWeighGraph(result_graph, newWeights, extraNode);
                    result_graph.deleteNode(extraNode);
                }
                return result_graph;
            }
        }
        toDirectedGraph(copy = false) {
            let result_graph = copy ? this.cloneStructure() : this;
            if (this._nr_dir_edges === 0 && this._nr_und_edges === 0) {
                throw new Error("Cowardly refusing to re-interpret an empty graph.");
            }
            return result_graph;
        }
        toUndirectedGraph() {
            return this;
        }
        hasNegativeEdge() {
            let has_neg_edge = false, edge;
            for (let edge_id in this._und_edges) {
                edge = this._und_edges[edge_id];
                if (!edge.isWeighted()) {
                    continue;
                }
                if (edge.getWeight() < 0) {
                    return true;
                }
            }
            for (let edge_id in this._dir_edges) {
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
        }
        hasNegativeCycles(node) {
            if (!this.hasNegativeEdge()) {
                return false;
            }
            let negative_cycle = false, start = node ? node : this.getRandomNode();
            DFS_1.DFS(this, start).forEach(comp => {
                let min_count = Number.POSITIVE_INFINITY, comp_start_node;
                Object.keys(comp).forEach(node_id => {
                    if (min_count > comp[node_id].counter) {
                        min_count = comp[node_id].counter;
                        comp_start_node = node_id;
                    }
                });
                if (BellmanFord.BellmanFordArray(this, this._nodes[comp_start_node]).neg_cycle) {
                    negative_cycle = true;
                }
            });
            return negative_cycle;
        }
        nextArray(incoming = false) {
            let next = [], node_keys = Object.keys(this._nodes);
            const adjDict = this.adjListDict(incoming, true, 0);
            for (let i = 0; i < this._nr_nodes; ++i) {
                next.push([]);
                for (let j = 0; j < this._nr_nodes; ++j) {
                    next[i].push([]);
                    next[i][j].push(i === j ? j : isFinite(adjDict[node_keys[i]][node_keys[j]]) ? j : null);
                }
            }
            return next;
        }
        adjListArray(incoming = false) {
            let adjList = [], node_keys = Object.keys(this._nodes);
            const adjDict = this.adjListDict(incoming, true, 0);
            for (let i = 0; i < this._nr_nodes; ++i) {
                adjList.push([]);
                for (let j = 0; j < this._nr_nodes; ++j) {
                    adjList[i].push(i === j ? 0 : isFinite(adjDict[node_keys[i]][node_keys[j]]) ? adjDict[node_keys[i]][node_keys[j]] : Number.POSITIVE_INFINITY);
                }
            }
            return adjList;
        }
        adjListDict(incoming = false, include_self = false, self_dist = 0) {
            let adj_list_dict = {}, nodes = this.getNodes(), cur_dist, key, cur_edge_weight;
            for (key in nodes) {
                adj_list_dict[key] = {};
                if (include_self) {
                    adj_list_dict[key][key] = self_dist;
                }
            }
            for (key in nodes) {
                let neighbors = incoming ? nodes[key].reachNodes().concat(nodes[key].prevNodes()) : nodes[key].reachNodes();
                neighbors.forEach((ne) => {
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
        }
        getMode() {
            return this._mode;
        }
        getStats() {
            return {
                mode: this._mode,
                nr_nodes: this._nr_nodes,
                nr_und_edges: this._nr_und_edges,
                nr_dir_edges: this._nr_dir_edges,
                density_dir: this._nr_dir_edges / (this._nr_nodes * (this._nr_nodes - 1)),
                density_und: 2 * this._nr_und_edges / (this._nr_nodes * (this._nr_nodes - 1))
            };
        }
        nrNodes() {
            return this._nr_nodes;
        }
        nrDirEdges() {
            return this._nr_dir_edges;
        }
        nrUndEdges() {
            return this._nr_und_edges;
        }
        addNodeByID(id, opts) {
            if (this.hasNodeID(id)) {
                throw new Error("Won't add node with duplicate ID.");
            }
            var node = new Nodes.BaseNode(id, opts);
            return this.addNode(node) ? node : null;
        }
        addNode(node) {
            if (this.hasNodeID(node.getID())) {
                throw new Error("Won't add node with duplicate ID.");
            }
            this._nodes[node.getID()] = node;
            this._nr_nodes += 1;
            return true;
        }
        hasNodeID(id) {
            return !!this._nodes[id];
        }
        getNodeById(id) {
            return this._nodes[id];
        }
        getNodes() {
            return this._nodes;
        }
        getRandomNode() {
            return this.pickRandomProperty(this._nodes);
        }
        deleteNode(node) {
            var rem_node = this._nodes[node.getID()];
            if (!rem_node) {
                throw new Error('Cannot remove un-added node.');
            }
            var in_deg = node.inDegree();
            var out_deg = node.outDegree();
            var deg = node.degree();
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
        }
        hasEdgeID(id) {
            return !!this._dir_edges[id] || !!this._und_edges[id];
        }
        getEdgeById(id) {
            var edge = this._dir_edges[id] || this._und_edges[id];
            if (!edge) {
                throw new Error("cannot retrieve edge with non-existing ID.");
            }
            return edge;
        }
        checkExistanceOfEdgeNodes(node_a, node_b) {
            if (!node_a) {
                throw new Error("Cannot find edge. Node A does not exist (in graph).");
            }
            if (!node_b) {
                throw new Error("Cannot find edge. Node B does not exist (in graph).");
            }
        }
        getDirEdgeByNodeIDs(node_a_id, node_b_id) {
            const node_a = this.getNodeById(node_a_id);
            const node_b = this.getNodeById(node_b_id);
            this.checkExistanceOfEdgeNodes(node_a, node_b);
            let edges_dir = node_a.outEdges(), edges_dir_keys = Object.keys(edges_dir);
            for (let i = 0; i < edges_dir_keys.length; i++) {
                var edge = edges_dir[edges_dir_keys[i]];
                if (edge.getNodes().b.getID() == node_b_id) {
                    return edge;
                }
            }
            throw new Error(`Cannot find edge. There is no edge between Node ${node_a_id} and ${node_b_id}.`);
        }
        getUndEdgeByNodeIDs(node_a_id, node_b_id) {
            const node_a = this.getNodeById(node_a_id);
            const node_b = this.getNodeById(node_b_id);
            this.checkExistanceOfEdgeNodes(node_a, node_b);
            let edges_und = node_a.undEdges(), edges_und_keys = Object.keys(edges_und);
            for (let i = 0; i < edges_und_keys.length; i++) {
                var edge = edges_und[edges_und_keys[i]];
                var b;
                (edge.getNodes().a.getID() == node_a_id) ? (b = edge.getNodes().b.getID()) : (b = edge.getNodes().a.getID());
                if (b == node_b_id) {
                    return edge;
                }
            }
        }
        getDirEdges() {
            return this._dir_edges;
        }
        getUndEdges() {
            return this._und_edges;
        }
        getDirEdgesArray() {
            let edges = [];
            for (let e_id in this._dir_edges) {
                edges.push(this._dir_edges[e_id]);
            }
            return edges;
        }
        getUndEdgesArray() {
            let edges = [];
            for (let e_id in this._und_edges) {
                edges.push(this._und_edges[e_id]);
            }
            return edges;
        }
        addEdgeByNodeIDs(label, node_a_id, node_b_id, opts) {
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
        }
        addEdgeByID(id, node_a, node_b, opts) {
            let edge = new Edges.BaseEdge(id, node_a, node_b, opts || {});
            return this.addEdge(edge);
        }
        addEdge(edge) {
            let node_a = edge.getNodes().a, node_b = edge.getNodes().b;
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
        }
        deleteEdge(edge) {
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
        }
        deleteInEdgesOf(node) {
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
        }
        deleteOutEdgesOf(node) {
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
        }
        deleteDirEdgesOf(node) {
            this.deleteInEdgesOf(node);
            this.deleteOutEdgesOf(node);
        }
        deleteUndEdgesOf(node) {
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
        }
        deleteAllEdgesOf(node) {
            this.deleteDirEdgesOf(node);
            this.deleteUndEdgesOf(node);
        }
        clearAllDirEdges() {
            for (var edge in this._dir_edges) {
                this.deleteEdge(this._dir_edges[edge]);
            }
        }
        clearAllUndEdges() {
            for (var edge in this._und_edges) {
                this.deleteEdge(this._und_edges[edge]);
            }
        }
        clearAllEdges() {
            this.clearAllDirEdges();
            this.clearAllUndEdges();
        }
        getRandomDirEdge() {
            return this.pickRandomProperty(this._dir_edges);
        }
        getRandomUndEdge() {
            return this.pickRandomProperty(this._und_edges);
        }
        cloneStructure() {
            let new_graph = new BaseGraph(this._label), old_nodes = this.getNodes(), old_edge, new_node_a = null, new_node_b = null;
            for (let node_id in old_nodes) {
                new_graph.addNode(old_nodes[node_id].clone());
            }
            [this.getDirEdges(), this.getUndEdges()].forEach((old_edges) => {
                for (let edge_id in old_edges) {
                    old_edge = old_edges[edge_id];
                    new_node_a = new_graph.getNodeById(old_edge.getNodes().a.getID());
                    new_node_b = new_graph.getNodeById(old_edge.getNodes().b.getID());
                    new_graph.addEdge(old_edge.clone(new_node_a, new_node_b));
                }
            });
            return new_graph;
        }
        cloneSubGraphStructure(root, cutoff) {
            let new_graph = new BaseGraph(this._label);
            let config = BFS_1.prepareBFSStandardConfig();
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
            let old_edge, new_node_a = null, new_node_b = null;
            [this.getDirEdges(), this.getUndEdges()].forEach((old_edges) => {
                for (let edge_id in old_edges) {
                    old_edge = old_edges[edge_id];
                    new_node_a = new_graph.getNodeById(old_edge.getNodes().a.getID());
                    new_node_b = new_graph.getNodeById(old_edge.getNodes().b.getID());
                    if (new_node_a != null && new_node_b != null)
                        new_graph.addEdge(old_edge.clone(new_node_a, new_node_b));
                }
            });
            return new_graph;
        }
        checkConnectedNodeOrThrow(node) {
            var node = this._nodes[node.getID()];
            if (!node) {
                throw new Error('Cowardly refusing to delete edges of un-added node.');
            }
        }
        updateGraphMode() {
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
        }
        pickRandomProperty(propList) {
            let tmpList = Object.keys(propList);
            let randomPropertyName = tmpList[Math.floor(Math.random() * tmpList.length)];
            return propList[randomPropertyName];
        }
        pickRandomProperties(propList, amount) {
            let ids = [];
            let keys = Object.keys(propList);
            let fraction = amount / keys.length;
            let used_keys = {};
            for (let i = 0; ids.length < amount && i < keys.length; i++) {
                if (Math.random() < fraction) {
                    ids.push(keys[i]);
                    used_keys[keys[i]] = i;
                }
            }
            let diff = amount - ids.length;
            for (let i = 0; i < keys.length && diff; i++) {
                if (used_keys[keys[i]] == null) {
                    ids.push(keys[i]);
                    diff--;
                }
            }
            return ids;
        }
    }
    exports.BaseGraph = BaseGraph;
    });

    unwrapExports(Graph);
    var Graph_1 = Graph.GraphMode;
    var Graph_2 = Graph.BaseGraph;

    var FloydWarshall = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    function initializeDistsWithEdges(graph) {
        let dists = {}, edges = StructUtils.mergeObjects([graph.getDirEdges(), graph.getUndEdges()]);
        for (let edge in edges) {
            let a = edges[edge].getNodes().a.getID();
            let b = edges[edge].getNodes().b.getID();
            if (dists[a] == null)
                dists[a] = {};
            dists[a][b] = (isNaN(edges[edge].getWeight()) ? 1 : edges[edge].getWeight());
            if (!edges[edge].isDirected()) {
                if (dists[b] == null)
                    dists[b] = {};
                dists[b][a] = (isNaN(edges[edge].getWeight()) ? 1 : edges[edge].getWeight());
            }
        }
        return dists;
    }
    function FloydWarshallAPSP(graph) {
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error("Cowardly refusing to traverse graph without edges.");
        }
        let dists = graph.adjListArray();
        let next = graph.nextArray();
        let N = dists.length;
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
        let dists = graph.adjListArray();
        let N = dists.length;
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
    function FloydWarshallDict(graph) {
        if (graph.nrDirEdges() === 0 && graph.nrUndEdges() === 0) {
            throw new Error("Cowardly refusing to traverse graph without edges.");
        }
        let dists = initializeDistsWithEdges(graph);
        for (var k in dists) {
            for (var i in dists) {
                for (var j in dists) {
                    if (i === j) {
                        continue;
                    }
                    if (dists[i][k] == null || dists[k][j] == null) {
                        continue;
                    }
                    if ((!dists[i][j] && dists[i][j] != 0) || (dists[i][j] > dists[i][k] + dists[k][j])) {
                        dists[i][j] = dists[i][k] + dists[k][j];
                    }
                }
            }
        }
        return dists;
    }
    exports.FloydWarshallDict = FloydWarshallDict;
    function changeNextToDirectParents(input) {
        let output = [];
        for (let a = 0; a < input.length; a++) {
            output.push([]);
            for (let b = 0; b < input.length; b++) {
                output[a].push([]);
                output[a][b] = input[a][b];
            }
        }
        for (let a = 0; a < input.length; a++) {
            for (let b = 0; b < input.length; b++) {
                if (input[a][b][0] == null) {
                    continue;
                }
                else if (a != b && !(input[a][b].length === 1 && input[a][b][0] === b)) {
                    output[a][b] = [];
                    findDirectParents(a, b, input, output);
                }
            }
        }
        return output;
    }
    exports.changeNextToDirectParents = changeNextToDirectParents;
    function findDirectParents(u, v, inNext, outNext) {
        let nodesInTracking = [u];
        let counter = 0;
        while (nodesInTracking.length > 0) {
            let currNode = nodesInTracking.pop();
            if (currNode == u && counter > 0) {
                continue;
            }
            else {
                for (let e = 0; e < inNext[currNode][v].length; e++) {
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
    var FloydWarshall_3 = FloydWarshall.FloydWarshallDict;
    var FloydWarshall_4 = FloydWarshall.changeNextToDirectParents;

    var Betweenness = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    function betweennessCentrality(graph, directed, sparse) {
        let paths;
        var sparse = sparse || false;
        if (sparse) {
            paths = Johnsons_1.Johnsons(graph)[1];
        }
        else {
            paths = FloydWarshall.changeNextToDirectParents(FloydWarshall.FloydWarshallAPSP(graph)[1]);
        }
        let nodes = graph.getNodes();
        let nodeKeys = Object.keys(nodes);
        let map = {};
        for (let key in nodes) {
            map[key] = 0;
        }
        let N = paths.length;
        for (var a = 0; a < N; ++a) {
            for (var b = 0; b < N; ++b) {
                if (a != b && !(paths[a][b].length == 1 && paths[a][b][0] == b) && paths[a][b][0] != null) {
                    let tempMap = {};
                    let leadArray = [];
                    let pathCount = 0;
                    do {
                        let tracer = b;
                        let leadCounter = 0;
                        pathCount++;
                        while (true) {
                            let previous = paths[a][tracer];
                            let terminate = false;
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
                                    let choice = leadArray[leadCounter][0];
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
                    for (let key in tempMap) {
                        let mapKey = nodeKeys[key];
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
    Object.defineProperty(exports, "__esModule", { value: true });





    class Brandes {
        constructor(_graph) {
            this._graph = _graph;
        }
        computeUnweighted(normalize = false, directed = false) {
            if (this._graph.nrDirEdges() === 0 && this._graph.nrUndEdges() === 0) {
                throw new Error("Cowardly refusing to traverse graph without edges.");
            }
            let nodes = this._graph.getNodes();
            let adjList = this._graph.adjListDict();
            let s, v, w, Pred = {}, sigma = {}, delta = {}, dist = {}, Q = [], S = [], CB = {};
            let closedNodes = {};
            for (let n in nodes) {
                let node_id = nodes[n].getID();
                CB[node_id] = 0;
                dist[node_id] = Number.POSITIVE_INFINITY;
                sigma[node_id] = 0;
                delta[node_id] = 0;
                Pred[node_id] = [];
                closedNodes[node_id] = false;
            }
            for (let i in nodes) {
                s = nodes[i];
                let id = s.getID();
                dist[id] = 0;
                sigma[id] = 1;
                Q.push(id);
                closedNodes[id] = true;
                while (Q.length) {
                    v = Q.shift();
                    S.push(v);
                    let neighbors = adjList[v];
                    closedNodes[v] = true;
                    for (let w in neighbors) {
                        if (closedNodes[w]) {
                            continue;
                        }
                        if (dist[w] === Number.POSITIVE_INFINITY) {
                            Q.push(w);
                            dist[w] = dist[v] + 1;
                        }
                        if (dist[w] === dist[v] + 1) {
                            sigma[w] += sigma[v];
                            Pred[w].push(v);
                        }
                    }
                }
                while (S.length >= 1) {
                    w = S.pop();
                    for (let parent of Pred[w]) {
                        delta[parent] += (sigma[parent] / sigma[w] * (1 + delta[w]));
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
        }
        computeWeighted(normalize, directed) {
            if (this._graph.nrDirEdges() === 0 && this._graph.nrUndEdges() === 0) {
                throw new Error("Cowardly refusing to traverse graph without edges.");
            }
            if (this._graph.hasNegativeEdge()) {
                var extraNode = new Nodes.BaseNode("extraNode");
                let graph = Johnsons_1.addExtraNandE(this._graph, extraNode);
                let BFresult = BellmanFord.BellmanFordDict(graph, extraNode);
                if (BFresult.neg_cycle) {
                    throw new Error("The graph contains a negative cycle, thus it can not be processed");
                }
                else {
                    let newWeights = BFresult.distances;
                    graph = Johnsons_1.reWeighGraph(graph, newWeights, extraNode);
                    graph.deleteNode(extraNode);
                }
                this._graph = graph;
            }
            let nodes = this._graph.getNodes();
            let N = Object.keys(nodes).length;
            let adjList = this._graph.adjListDict();
            const evalPriority = (nb) => nb.best;
            const evalObjID = (nb) => nb.id;
            let s, v, w, Pred = {}, sigma = {}, delta = {}, dist = {}, S = [], CB = {}, closedNodes = {}, Q = new BinaryHeap_1.BinaryHeap(BinaryHeap_1.BinaryHeapMode.MIN, evalPriority, evalObjID);
            for (let n in nodes) {
                let currID = nodes[n].getID();
                CB[currID] = 0;
                dist[currID] = Number.POSITIVE_INFINITY;
                sigma[currID] = 0;
                delta[currID] = 0;
                Pred[currID] = [];
                closedNodes[currID] = false;
            }
            for (let i in nodes) {
                s = nodes[i];
                let id_s = s.getID();
                dist[id_s] = 0;
                sigma[id_s] = 1;
                let source = { id: id_s, best: 0 };
                Q.insert(source);
                closedNodes[id_s] = true;
                while (Q.size() > 0) {
                    v = Q.pop();
                    let current_id = v.id;
                    S.push(current_id);
                    closedNodes[current_id] = true;
                    let neighbors = adjList[current_id];
                    for (let w in neighbors) {
                        if (closedNodes[w]) {
                            continue;
                        }
                        let new_dist = dist[current_id] + neighbors[w];
                        let nextNode = { id: w, best: dist[w] };
                        if (dist[w] > new_dist) {
                            if (isFinite(dist[w])) {
                                let x = Q.remove(nextNode);
                                nextNode.best = new_dist;
                                Q.insert(nextNode);
                            }
                            else {
                                nextNode.best = new_dist;
                                Q.insert(nextNode);
                            }
                            sigma[w] = 0;
                            dist[w] = new_dist;
                            Pred[w] = [];
                        }
                        if (dist[w] === new_dist) {
                            sigma[w] += sigma[current_id];
                            Pred[w].push(current_id);
                        }
                    }
                }
                while (S.length >= 1) {
                    w = S.pop();
                    for (let parent of Pred[w]) {
                        delta[parent] += (sigma[parent] / sigma[w] * (1 + delta[w]));
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
        }
        computePFSbased(normalize, directed) {
            let nodes = this._graph.getNodes();
            let adjList = this._graph.adjListDict();
            let Pred = {}, sigma = {}, delta = {}, S = [], CB = {};
            for (let n in nodes) {
                let currID = nodes[n].getID();
                CB[currID] = 0;
                sigma[currID] = 0;
                delta[currID] = 0;
                Pred[currID] = [];
            }
            let specialConfig = PFS_1.preparePFSStandardConfig();
            var notEncounteredBrandes = function (context) {
                context.next.best =
                    context.current.best + (isNaN(context.next.edge.getWeight()) ? PFS_1.DEFAULT_WEIGHT : context.next.edge.getWeight());
                let next_id = context.next.node.getID();
                let current_id = context.current.node.getID();
                Pred[next_id] = [current_id];
                sigma[next_id] += sigma[current_id];
            };
            specialConfig.callbacks.not_encountered.splice(0, 1, notEncounteredBrandes);
            var newCurrentBrandes = function (context) {
                S.push(context.current.node.getID());
            };
            specialConfig.callbacks.new_current.push(newCurrentBrandes);
            var betterPathBrandes = function (context) {
                let next_id = context.next.node.getID();
                let current_id = context.current.node.getID();
                sigma[next_id] = 0;
                sigma[next_id] += sigma[current_id];
                Pred[next_id] = [];
                Pred[next_id].push(current_id);
            };
            specialConfig.callbacks.better_path.splice(0, 1, betterPathBrandes);
            var equalPathBrandes = function (context) {
                let next_id = context.next.node.getID();
                let current_id = context.current.node.getID();
                sigma[next_id] += sigma[current_id];
                if (Pred[next_id].indexOf(current_id) === -1) {
                    Pred[next_id].push(current_id);
                }
            };
            specialConfig.callbacks.equal_path.push(equalPathBrandes);
            for (let i in nodes) {
                let s = nodes[i];
                sigma[s.getID()] = 1;
                PFS_1.PFS(this._graph, s, specialConfig);
                while (S.length >= 1) {
                    let w = S.pop();
                    for (let parent of Pred[w]) {
                        delta[parent] += (sigma[parent] / sigma[w] * (1 + delta[w]));
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
        }
        normalizeScores(CB, N, directed) {
            let factor = directed ? ((N - 1) * (N - 2)) : ((N - 1) * (N - 2) / 2);
            for (let node in CB) {
                CB[node] /= factor;
            }
        }
    }
    exports.Brandes = Brandes;
    });

    unwrapExports(Brandes_1);
    var Brandes_2 = Brandes_1.Brandes;

    var Closeness = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    class ClosenessCentrality {
        constructor() { }
        getCentralityMapFW(graph) {
            let dists = FloydWarshall.FloydWarshallArray(graph);
            let ret = [];
            let N = dists.length;
            for (let a = 0; a < N; ++a) {
                let sum = 0;
                for (let b = 0; b < N; ++b) {
                    if (dists[a][b] != Number.POSITIVE_INFINITY)
                        sum += dists[a][b];
                }
                ret[a] = 1 / sum;
            }
            return ret;
        }
        getCentralityMap(graph) {
            let pfs_config = PFS_1.preparePFSStandardConfig();
            let accumulated_distance = 0;
            let not_encountered = function (context) {
                accumulated_distance += context.current.best + (isNaN(context.next.edge.getWeight()) ? 1 : context.next.edge.getWeight());
            };
            var betterPathFound = function (context) {
                accumulated_distance -= pfs_config.result[context.next.node.getID()].distance - context.proposed_dist;
            };
            let bp = pfs_config.callbacks.better_path.pop();
            pfs_config.callbacks.better_path.push(betterPathFound);
            pfs_config.callbacks.better_path.push(bp);
            pfs_config.callbacks.not_encountered.push(not_encountered);
            let ret = {};
            for (let key in graph.getNodes()) {
                let node = graph.getNodeById(key);
                if (node != null) {
                    accumulated_distance = 0;
                    PFS_1.PFS(graph, node, pfs_config);
                    ret[key] = 1 / accumulated_distance;
                }
            }
            return ret;
        }
    }
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
    class DegreeCentrality {
        constructor() { }
        getCentralityMap(graph, weighted, conf) {
            weighted = (weighted != null) ? !!weighted : true;
            conf = (conf == null) ? DegreeMode.all : conf;
            let ret = {};
            switch (conf) {
                case DegreeMode.in:
                    for (let key in graph.getNodes()) {
                        let node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.inDegree();
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                for (let k in node.inEdges()) {
                                    ret[key] += node.inEdges()[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.out:
                    for (let key in graph.getNodes()) {
                        let node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.outDegree();
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                for (let k in node.outEdges()) {
                                    ret[key] += node.outEdges()[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.und:
                    for (let key in graph.getNodes()) {
                        let node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.degree();
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                for (let k in node.undEdges()) {
                                    ret[key] += node.undEdges()[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.dir:
                    for (let key in graph.getNodes()) {
                        let node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.inDegree() + node.outDegree();
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                let comb = StructUtils.mergeObjects([node.inEdges(), node.outEdges()]);
                                for (let k in comb) {
                                    ret[key] += comb[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
                case DegreeMode.all:
                    for (let key in graph.getNodes()) {
                        let node = graph.getNodeById(key);
                        if (node != null) {
                            if (!weighted) {
                                ret[key] = node.degree() + node.inDegree() + node.outDegree();
                            }
                            else {
                                ret[key] = ret[key] || 0;
                                let comb = StructUtils.mergeObjects([node.inEdges(), node.outEdges(), node.undEdges()]);
                                for (let k in comb) {
                                    ret[key] += comb[k].getWeight();
                                }
                            }
                        }
                    }
                    break;
            }
            return ret;
        }
        degreeDistribution(graph) {
            var max_deg = 0, key, nodes = graph.getNodes(), node, all_deg;
            for (key in nodes) {
                node = nodes[key];
                all_deg = node.inDegree() + node.outDegree() + node.degree() + 1;
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
                deg_dist.in[node.inDegree()]++;
                deg_dist.out[node.outDegree()]++;
                deg_dist.dir[node.inDegree() + node.outDegree()]++;
                deg_dist.und[node.degree()]++;
                deg_dist.all[node.inDegree() + node.outDegree() + node.degree()]++;
            }
            return deg_dist;
        }
    }
    exports.DegreeCentrality = DegreeCentrality;
    });

    unwrapExports(Degree);
    var Degree_1 = Degree.DegreeMode;
    var Degree_2 = Degree.DegreeCentrality;

    var Pagerank_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    const logger = new Logger_1.Logger();
    const DEFAULT_WEIGHTED = false;
    const DEFAULT_ALPHA = 0.15;
    const DEFAULT_MAX_ITERATIONS = 1e3;
    const DEFAULT_EPSILON = 1e-6;
    const DEFAULT_NORMALIZE = false;
    const defaultInit = (graph) => 1 / graph.nrNodes();
    class Pagerank {
        constructor(_graph, config) {
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
        getConfig() {
            return {
                _weighted: this._weighted,
                _alpha: this._alpha,
                _maxIterations: this._maxIterations,
                _epsilon: this._epsilon,
                _normalize: this._normalize,
            };
        }
        getDSs() {
            return this._PRArrayDS;
        }
        constructPRArrayDataStructs(config) {
            let tic = +new Date;
            let nodes = this._graph.getNodes();
            let i = 0;
            let teleport_prob_sum = 0;
            let init_sum = 0;
            for (let key in nodes) {
                let node = this._graph.getNodeById(key);
                node.setFeature('PR_index', i);
                if (config.init_map) {
                    if (config.init_map[key] == null) {
                        throw Error("initial value must be given for each node in the graph.");
                    }
                    let val = config.init_map[key];
                    this._PRArrayDS.curr[i] = val;
                    this._PRArrayDS.old[i] = val;
                    init_sum += val;
                }
                else {
                    this._PRArrayDS.curr[i] = defaultInit(this._graph);
                    this._PRArrayDS.old[i] = defaultInit(this._graph);
                }
                this._PRArrayDS.out_deg[i] = node.outDegree() + node.degree();
                if (this._personalized) {
                    let tele_prob_node = config.tele_set[node.getID()] || 0;
                    this._PRArrayDS.teleport[i] = tele_prob_node;
                    teleport_prob_sum += tele_prob_node;
                    tele_prob_node && this._PRArrayDS.tele_size++;
                }
                ++i;
            }
            if (config.init_map && init_sum !== 1) {
                this._PRArrayDS.curr = this._PRArrayDS.curr.map(n => n /= init_sum);
                this._PRArrayDS.old = this._PRArrayDS.old.map(n => n /= init_sum);
            }
            if (this._personalized && teleport_prob_sum !== 1) {
                this._PRArrayDS.teleport = this._PRArrayDS.teleport.map(n => n /= teleport_prob_sum);
            }
            for (let key in nodes) {
                let node = this._graph.getNodeById(key);
                let node_idx = node.getFeature('PR_index');
                let pull_i = [];
                let pull_weight_i = [];
                let incoming_edges = StructUtils.mergeObjects([node.inEdges(), node.undEdges()]);
                for (let edge_key in incoming_edges) {
                    let edge = incoming_edges[edge_key];
                    let source = edge.getNodes().a;
                    if (edge.getNodes().a.getID() == node.getID()) {
                        source = edge.getNodes().b;
                    }
                    let parent_idx = source.getFeature('PR_index');
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
            let toc = +new Date;
            logger.log(`PR Array DS init took ${toc - tic} ms.`);
        }
        getRankMapFromArray() {
            let result = {};
            let nodes = this._graph.getNodes();
            if (this._normalize) {
                this.normalizePR();
            }
            for (let key in nodes) {
                let node_val = this._PRArrayDS.curr[nodes[key].getFeature('PR_index')];
                result[key] = node_val;
            }
            return result;
        }
        normalizePR() {
            let pr_sum = this._PRArrayDS.curr.reduce((i, j) => i + j, 0);
            if (pr_sum !== 1) {
                this._PRArrayDS.curr = this._PRArrayDS.curr.map(n => n / pr_sum);
            }
        }
        pull2DTo1D() {
            let p1d = [];
            let p2d = this._PRArrayDS.pull;
            for (let n in p2d) {
                for (let i of p2d[n]) {
                    p1d.push(i);
                }
                +n !== p2d.length - 1 && p1d.push(-1);
            }
            return p1d;
        }
        computePR() {
            const ds = this._PRArrayDS;
            const N = this._graph.nrNodes();
            for (let i = 0; i < this._maxIterations; ++i) {
                let delta_iter = 0.0;
                for (let node in ds.curr) {
                    let pull_rank = 0;
                    let idx = 0;
                    for (let source of ds.pull[node]) {
                        if (ds.out_deg[source] === 0) {
                            logger.log(`Node: ${node}`);
                            logger.log(`Source: ${source} `);
                            throw ('Encountered zero divisor!');
                        }
                        let weight = this._weighted ? ds.pull_weight[node][idx++] : 1.0;
                        pull_rank += ds.old[source] * weight / ds.out_deg[source];
                    }
                    let link_pr = (1 - this._alpha) * pull_rank;
                    if (this._personalized) {
                        let jump_chance = ds.teleport[node] / ds.tele_size;
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
                ds.old = [...ds.curr];
            }
            return this.getRankMapFromArray();
        }
    }
    exports.Pagerank = Pagerank;
    });

    unwrapExports(Pagerank_1);
    var Pagerank_2 = Pagerank_1.Pagerank;

    var RemoteUtils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    const logger = new Logger_1.Logger();
    const SSL_PORT = '443';
    function retrieveRemoteFile(config, cb) {
        if (typeof cb !== 'function') {
            throw new Error('Provided callback is not a function.');
        }
        logger.log(`Requesting file via NodeJS request: ${config.remote_host}${config.remote_path}${config.file_name}`);
        let options = {
            host: config.remote_host,
            port: SSL_PORT,
            path: config.remote_path + config.file_name,
            method: 'GET'
        };
        let req = https.get(options, response => {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                cb(body);
            });
        });
        req.on('error', e => {
            logger.log(`Request error: ${e.message}`);
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





    let logger = new Logger_1.Logger();
    const DEFAULT_WEIGHT = 1;
    class CSVInput {
        constructor(config) {
            this._config = config || {
                separator: config && config.separator || ',',
                explicit_direction: config && config.explicit_direction || true,
                direction_mode: config && config.direction_mode || false,
                weighted: config && config.weighted || false
            };
        }
        readFromAdjacencyListURL(config, cb) {
            this.readGraphFromURL(config, cb, this.readFromAdjacencyList);
        }
        readFromEdgeListURL(config, cb) {
            this.readGraphFromURL(config, cb, this.readFromEdgeList);
        }
        readGraphFromURL(config, cb, localFun) {
            var self = this, graph_name = config.file_name, graph;
            RemoteUtils.checkNodeEnvironment();
            RemoteUtils.retrieveRemoteFile(config, function (raw_graph) {
                var input = raw_graph.toString().split('\n');
                graph = localFun.apply(self, [input, graph_name]);
                cb(graph, undefined);
            });
        }
        readFromAdjacencyListFile(filepath) {
            return this.readFileAndReturn(filepath, this.readFromAdjacencyList);
        }
        readFromEdgeListFile(filepath) {
            return this.readFileAndReturn(filepath, this.readFromEdgeList);
        }
        readFileAndReturn(filepath, func) {
            RemoteUtils.checkNodeEnvironment();
            var graph_name = path.basename(filepath);
            var input = fs.readFileSync(filepath).toString().split('\n');
            return func.apply(this, [input, graph_name]);
        }
        readFromAdjacencyList(input, graph_name) {
            var graph = new Graph.BaseGraph(graph_name);
            for (var idx in input) {
                var line = input[idx], elements = this._config.separator.match(/\s+/g) ? line.match(/\S+/g) : line.replace(/\s+/g, '').split(this._config.separator), node_id = elements[0], node, edge_array = elements.slice(1), edge, target_node_id, target_node, dir_char, directed, edge_id, edge_id_u2;
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
        }
        readFromEdgeList(input, graph_name, weighted = false) {
            var graph = new Graph.BaseGraph(graph_name);
            for (var idx in input) {
                var line = input[idx], elements = this._config.separator.match(/\s+/g) ? line.match(/\S+/g) : line.replace(/\s+/g, '').split(this._config.separator);
                if (!elements) {
                    continue;
                }
                if (elements.length < 2 || elements.length > 3) {
                    logger.log(elements);
                    throw new Error('Edge list is in wrong format - every line has to consist of two entries (the 2 nodes)');
                }
                var node_id = elements[0], node, target_node, edge, target_node_id = elements[1], dir_char = this._config.explicit_direction ? elements[2] : this._config.direction_mode ? 'd' : 'u', directed, edge_id, edge_id_u2, parse_weight, edge_weight;
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
        }
    }
    exports.CSVInput = CSVInput;
    });

    unwrapExports(CSVInput_1);
    var CSVInput_2 = CSVInput_1.CSVInput;

    var CSVOutput_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    class CSVOutput {
        constructor(config) {
            this._config = config || {
                separator: config && config.separator || ',',
                explicit_direction: config && config.explicit_direction || true,
                direction_mode: config && config.direction_mode || false
            };
        }
        writeToAdjacencyListFile(filepath, graph) {
            if (typeof window !== 'undefined' && window !== null) {
                throw new Error('cannot write to File inside of Browser');
            }
            fs.writeFileSync(filepath, this.writeToAdjacencyList(graph));
        }
        writeToAdjacencyList(graph) {
            let graphString = "";
            let nodes = graph.getNodes(), node = null, adj_nodes = null, adj_node = null;
            for (let node_key in nodes) {
                node = nodes[node_key];
                graphString += node.getID();
                adj_nodes = node.reachNodes(this.mergeFunc);
                for (let adj_idx in adj_nodes) {
                    adj_node = adj_nodes[adj_idx].node;
                    graphString += this._config.separator + adj_node.getID();
                }
                graphString += "\n";
            }
            return graphString;
        }
        writeToEdgeListFile(filepath, graph, weighted = false) {
            if (typeof window !== 'undefined' && window !== null) {
                throw new Error('cannot write to File inside of Browser');
            }
            fs.writeFileSync(filepath, this.writeToEdgeList(graph, weighted));
        }
        writeToEdgeList(graph, weighted = false) {
            let graphString = "", nodes = graph.getNodes(), node = null, adj_nodes = null, adj_entry, adj_node = null, weight_str;
            for (let node_key in nodes) {
                node = nodes[node_key];
                adj_nodes = node.reachNodes(this.mergeFunc);
                for (let adj_idx in adj_nodes) {
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
        }
        mergeFunc(ne) {
            return ne.node.getID();
        }
    }
    exports.CSVOutput = CSVOutput;
    });

    unwrapExports(CSVOutput_1);
    var CSVOutput_2 = CSVOutput_1.CSVOutput;

    var JSONInput_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });




    const logger = new Logger_1.Logger();
    const DEFAULT_WEIGHT = 1;
    class JSONInput {
        constructor(config) {
            this._config = config || {
                explicit_direction: config && config.explicit_direction || true,
                directed: config && config.directed || false,
                weighted: config && config.weighted || false
            };
        }
        readFromJSONFile(filepath) {
            RemoteUtils.checkNodeEnvironment();
            var json = JSON.parse(fs.readFileSync(filepath).toString());
            return this.readFromJSON(json);
        }
        readFromJSONURL(config, cb) {
            var self = this, graph;
            RemoteUtils.checkNodeEnvironment();
            RemoteUtils.retrieveRemoteFile(config, function (raw_graph) {
                graph = self.readFromJSON(JSON.parse(raw_graph));
                cb(graph, undefined);
            });
        }
        readFromJSON(json) {
            var graph = new Graph.BaseGraph(json.name), coords_json, coords, coord_idx, features;
            for (var node_id in json.data) {
                var node = graph.hasNodeID(node_id) ? graph.getNodeById(node_id) : graph.addNodeByID(node_id);
                let label = json.data[node_id]['label'];
                if (label) {
                    node.setLabel(label);
                }
                if (features = json.data[node_id].features) {
                    node.setFeatures(features);
                }
                if (coords_json = json.data[node_id].coords) {
                    coords = {};
                    for (coord_idx in coords_json) {
                        coords[coord_idx] = +coords_json[coord_idx];
                    }
                    node.setFeature('coords', coords);
                }
                var edges = json.data[node_id].edges;
                for (let e in edges) {
                    let edge_input = edges[e], target_node_id = edge_input.to, directed = this._config.explicit_direction ? edge_input.directed : this._config.directed, dir_char = directed ? 'd' : 'u', weight_float = this.handleEdgeWeights(edge_input), weight_info = weight_float === weight_float ? weight_float : DEFAULT_WEIGHT, edge_weight = this._config.weighted ? weight_info : undefined, target_node = graph.hasNodeID(target_node_id) ? graph.getNodeById(target_node_id) : graph.addNodeByID(target_node_id);
                    let edge_id = node_id + "_" + target_node_id + "_" + dir_char, edge_id_u2 = target_node_id + "_" + node_id + "_" + dir_char;
                    if (graph.hasEdgeID(edge_id)) {
                        continue;
                    }
                    if ((!directed && graph.hasEdgeID(edge_id_u2))) {
                        if (this._config.weighted) {
                            let edge = graph.getEdgeById(edge_id_u2);
                            if (edge_weight != edge.getWeight()) {
                                throw new Error('Input JSON flawed! Found duplicate edge with different weights!');
                            }
                        }
                        continue;
                    }
                    else {
                        var edge = graph.addEdgeByID(edge_id, node, target_node, {
                            directed: directed,
                            weighted: this._config.weighted,
                            weight: edge_weight
                        });
                    }
                }
            }
            return graph;
        }
        handleEdgeWeights(edge_input) {
            switch (edge_input.weight) {
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
                    return parseFloat(edge_input.weight);
            }
        }
    }
    exports.JSONInput = JSONInput;
    });

    unwrapExports(JSONInput_1);
    var JSONInput_2 = JSONInput_1.JSONInput;

    var JSONOutput_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    class JSONOutput {
        constructor() { }
        writeToJSONFile(filepath, graph) {
            if (typeof window !== 'undefined' && window !== null) {
                throw new Error('cannot write to File inside of Browser');
            }
            fs.writeFileSync(filepath, this.writeToJSONString(graph));
        }
        writeToJSONString(graph) {
            let nodes, node, node_struct, und_edges, dir_edges, edge, coords;
            var result = {
                name: graph._label,
                nodes: graph.nrNodes(),
                dir_edges: graph.nrDirEdges(),
                und_edges: graph.nrUndEdges(),
                data: {}
            };
            nodes = graph.getNodes();
            for (let node_key in nodes) {
                node = nodes[node_key];
                node_struct = result.data[node.getID()] = {
                    label: node.getLabel(),
                    edges: []
                };
                und_edges = node.undEdges();
                for (let edge_key in und_edges) {
                    edge = und_edges[edge_key];
                    let connected_nodes = edge.getNodes();
                    node_struct.edges.push({
                        to: connected_nodes.a.getID() === node.getID() ? connected_nodes.b.getID() : connected_nodes.a.getID(),
                        directed: edge.isDirected(),
                        weight: edge.isWeighted() ? edge.getWeight() : undefined
                    });
                }
                dir_edges = node.outEdges();
                for (let edge_key in dir_edges) {
                    edge = dir_edges[edge_key];
                    let connected_nodes = edge.getNodes();
                    node_struct.edges.push({
                        to: connected_nodes.b.getID(),
                        directed: edge.isDirected(),
                        weight: this.handleEdgeWeight(edge)
                    });
                }
                node_struct.features = node.getFeatures();
                if ((coords = node.getFeature('coords')) != null) {
                    node_struct['coords'] = coords;
                }
            }
            return JSON.stringify(result);
        }
        handleEdgeWeight(edge) {
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
        }
    }
    exports.JSONOutput = JSONOutput;
    });

    unwrapExports(JSONOutput_1);
    var JSONOutput_2 = JSONOutput_1.JSONOutput;

    var Dijkstra_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    function Dijkstra(graph, source, target) {
        let config = PFS_1.preparePFSStandardConfig();
        if (target) {
            config.goal_node = target;
        }
        return PFS_1.PFS(graph, source, config);
    }
    exports.Dijkstra = Dijkstra;
    });

    unwrapExports(Dijkstra_1);
    var Dijkstra_2 = Dijkstra_1.Dijkstra;

    var SimplePerturbations = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    let logger = new Logger_1.Logger();
    class SimplePerturber {
        constructor(_graph) {
            this._graph = _graph;
        }
        randomlyDeleteNodesPercentage(percentage) {
            if (percentage > 100) {
                percentage = 100;
            }
            let nr_nodes_to_delete = Math.ceil(this._graph.nrNodes() * percentage / 100);
            this.randomlyDeleteNodesAmount(nr_nodes_to_delete);
        }
        randomlyDeleteUndEdgesPercentage(percentage) {
            if (percentage > 100) {
                percentage = 100;
            }
            let nr_edges_to_delete = Math.ceil(this._graph.nrUndEdges() * percentage / 100);
            this.randomlyDeleteUndEdgesAmount(nr_edges_to_delete);
        }
        randomlyDeleteDirEdgesPercentage(percentage) {
            if (percentage > 100) {
                percentage = 100;
            }
            let nr_edges_to_delete = Math.ceil(this._graph.nrDirEdges() * percentage / 100);
            this.randomlyDeleteDirEdgesAmount(nr_edges_to_delete);
        }
        randomlyDeleteNodesAmount(amount) {
            if (amount < 0) {
                throw 'Cowardly refusing to remove a negative amount of nodes';
            }
            if (this._graph.nrNodes() === 0) {
                return;
            }
            for (let nodeID = 0, randomNodes = this._graph.pickRandomProperties(this._graph.getNodes(), amount); nodeID < randomNodes.length; nodeID++) {
                this._graph.deleteNode(this._graph.getNodes()[randomNodes[nodeID]]);
            }
        }
        randomlyDeleteUndEdgesAmount(amount) {
            if (amount < 0) {
                throw 'Cowardly refusing to remove a negative amount of edges';
            }
            if (this._graph.nrUndEdges() === 0) {
                return;
            }
            for (let edgeID = 0, randomEdges = this._graph.pickRandomProperties(this._graph.getUndEdges(), amount); edgeID < randomEdges.length; edgeID++) {
                this._graph.deleteEdge(this._graph.getUndEdges()[randomEdges[edgeID]]);
            }
        }
        randomlyDeleteDirEdgesAmount(amount) {
            if (amount < 0) {
                throw 'Cowardly refusing to remove a negative amount of edges';
            }
            if (this._graph.nrDirEdges() === 0) {
                return;
            }
            for (let edgeID = 0, randomEdges = this._graph.pickRandomProperties(this._graph.getDirEdges(), amount); edgeID < randomEdges.length; edgeID++) {
                this._graph.deleteEdge(this._graph.getDirEdges()[randomEdges[edgeID]]);
            }
        }
        randomlyAddUndEdgesPercentage(percentage) {
            let nr_und_edges_to_add = Math.ceil(this._graph.nrUndEdges() * percentage / 100);
            this.randomlyAddEdgesAmount(nr_und_edges_to_add, { directed: false });
        }
        randomlyAddDirEdgesPercentage(percentage) {
            let nr_dir_edges_to_add = Math.ceil(this._graph.nrDirEdges() * percentage / 100);
            this.randomlyAddEdgesAmount(nr_dir_edges_to_add, { directed: true });
        }
        randomlyAddEdgesAmount(amount, config) {
            if (amount <= 0) {
                throw new Error('Cowardly refusing to add a non-positive amount of edges');
            }
            let node_a, node_b;
            let direction = (config && config.directed) ? config.directed : false, dir = direction ? "_d" : "_u";
            while (amount) {
                node_a = this._graph.getRandomNode();
                while ((node_b = this._graph.getRandomNode()) === node_a) { }
                let edge_id = `${node_a.getID()}_${node_b.getID()}${dir}`;
                if (node_a.hasEdgeID(edge_id)) {
                    continue;
                }
                else {
                    this._graph.addEdgeByID(edge_id, node_a, node_b, { directed: direction });
                    --amount;
                }
            }
        }
        randomlyAddNodesPercentage(percentage, config) {
            let nr_nodes_to_add = Math.ceil(this._graph.nrNodes() * percentage / 100);
            this.randomlyAddNodesAmount(nr_nodes_to_add, config);
        }
        randomlyAddNodesAmount(amount, config) {
            if (amount < 0) {
                throw 'Cowardly refusing to add a negative amount of nodes';
            }
            let new_nodes = {};
            while (amount--) {
                let new_node_id = (Math.random() + 1).toString(36).substr(2, 32) + (Math.random() + 1).toString(36).substr(2, 32);
                new_nodes[new_node_id] = this._graph.addNodeByID(new_node_id);
            }
            if (config == null) {
                return;
            }
            else {
                this.createEdgesByConfig(config, new_nodes);
            }
        }
        createEdgesByConfig(config, new_nodes) {
            let degree, min_degree, max_degree;
            if (config.und_degree != null ||
                config.dir_degree != null ||
                config.min_und_degree != null && config.max_und_degree != null ||
                config.min_dir_degree != null && config.max_dir_degree != null) {
                if ((degree = config.und_degree) != null) {
                    this.createRandomEdgesSpan(degree, degree, false, new_nodes);
                }
                else if ((min_degree = config.min_und_degree) != null
                    && (max_degree = config.max_und_degree) != null) {
                    this.createRandomEdgesSpan(min_degree, max_degree, false, new_nodes);
                }
                if (degree = config.dir_degree) {
                    this.createRandomEdgesSpan(degree, degree, true, new_nodes);
                }
                else if ((min_degree = config.min_dir_degree) != null
                    && (max_degree = config.max_dir_degree) != null) {
                    this.createRandomEdgesSpan(min_degree, max_degree, true, new_nodes);
                }
            }
            else {
                if (config.probability_dir != null) {
                    this.createRandomEdgesProb(config.probability_dir, true, new_nodes);
                }
                if (config.probability_und != null) {
                    this.createRandomEdgesProb(config.probability_und, false, new_nodes);
                }
            }
        }
        createRandomEdgesProb(probability, directed, new_nodes) {
            if (0 > probability || 1 < probability) {
                throw new Error("Probability out of range.");
            }
            directed = directed || false;
            new_nodes = new_nodes || this._graph.getNodes();
            let all_nodes = this._graph.getNodes(), node_a, node_b, edge_id, dir = directed ? '_d' : '_u';
            for (node_a in new_nodes) {
                for (node_b in all_nodes) {
                    if (node_a !== node_b && Math.random() <= probability) {
                        edge_id = all_nodes[node_a].getID() + "_" + all_nodes[node_b].getID() + dir;
                        if (this._graph.getNodes()[node_a].hasEdgeID(edge_id)) {
                            continue;
                        }
                        this._graph.addEdgeByID(edge_id, all_nodes[node_a], all_nodes[node_b], { directed: directed });
                    }
                }
            }
        }
        createRandomEdgesSpan(min, max, directed, setOfNodes) {
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
        }
    }
    exports.SimplePerturber = SimplePerturber;
    });

    unwrapExports(SimplePerturbations);
    var SimplePerturbations_1 = SimplePerturbations.SimplePerturber;

    var KroneckerLeskovec = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    class KROL {
        constructor(config) {
            this._config = config || this.prepareKROLStandardConfig();
            this._genMat = this._config.genMat;
            this._cycles = this._config.cycles;
            this._graph = new Graph.BaseGraph('synth');
        }
        generate() {
            var gen_dims = this._genMat[0].length;
            var res_dims = Math.pow(gen_dims, this._cycles + 1);
            for (let index = 0; index < res_dims; index++) {
                this._graph.addNodeByID(index.toString());
            }
            for (let node1 = 0; node1 < res_dims; node1++) {
                for (let node2 = 0; node2 < res_dims; node2++) {
                    if (this.addEdge(node1, node2, gen_dims)) {
                        this._graph.addEdgeByNodeIDs(node1 + '_' + node2, node1.toString(), node2.toString());
                    }
                }
            }
            var result = {
                graph: this._graph
            };
            return result;
        }
        addEdge(node1, node2, dims) {
            var rprob = Math.random();
            var prob = 1.0;
            for (let level = 0; level < this._cycles; level++) {
                var id_1 = Math.floor(node1 / Math.pow(dims, level + 1)) % dims;
                var id_2 = Math.floor(node2 / Math.pow(dims, level + 1)) % dims;
                prob *= this._genMat[id_1][id_2];
                if (rprob > prob) {
                    return false;
                }
            }
            return true;
        }
        prepareKROLStandardConfig() {
            var genMat = [[0.9, 0.5], [0.5, 0.1]];
            return {
                genMat: genMat,
                cycles: 5
            };
        }
    }
    exports.KROL = KROL;
    });

    unwrapExports(KroneckerLeskovec);
    var KroneckerLeskovec_1 = KroneckerLeskovec.KROL;

    // CORE



    // CENTRALITIES





    // IO




    // SEARCH







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
    		BaseEdge 									: Edges.BaseEdge,
    		BaseNode 									: Nodes.BaseNode,
    		BaseGraph 								: Graph.BaseGraph,
    		GraphMode									: Graph.GraphMode
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
    var GraphiniusJS = out.$G;

    var jsonIn = new JSONInput_2({ directed: true, explicit_direction: false, weighted: false });
    function importGraphFromURL(graphFile) {
        return __awaiter(this, void 0, void 0, function () {
            var graphBytes, graphString, graph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(graphFile)];
                    case 1: return [4, (_a.sent())];
                    case 2:
                        graphBytes = _a.sent();
                        return [4, graphBytes.json()];
                    case 3:
                        graphString = _a.sent();
                        graph = jsonIn.readFromJSON(graphString);
                        return [2, graph];
                }
            });
        });
    }
    //# sourceMappingURL=importGraph.js.map

    var fuse = createCommonjsModule(function (module, exports) {
    /*!
     * Fuse.js v3.4.5 - Lightweight fuzzy-search (http://fusejs.io)
     * 
     * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
     * All Rights Reserved. Apache Software License 2.0
     * 
     * http://www.apache.org/licenses/LICENSE-2.0
     */
    !function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)};},function(e,t,n){function r(e){return (r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}var i=n(2),a=n(8),s=n(0),c=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,h=void 0===c?.6:c,l=n.maxPatternLength,u=void 0===l?32:l,f=n.caseSensitive,d=void 0!==f&&f,v=n.tokenSeparator,p=void 0===v?/ +/g:v,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m,S=n.id,x=void 0===S?null:S,b=n.keys,M=void 0===b?[]:b,_=n.shouldSort,L=void 0===_||_,w=n.getFn,A=void 0===w?a:w,C=n.sortFn,I=void 0===C?function(e,t){return e.score-t.score}:C,O=n.tokenize,j=void 0!==O&&O,P=n.matchAllTokens,F=void 0!==P&&P,T=n.includeMatches,z=void 0!==T&&T,E=n.includeScore,K=void 0!==E&&E,$=n.verbose,J=void 0!==$&&$;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k,id:x,keys:M,includeMatches:z,includeScore:K,shouldSort:L,getFn:A,sortFn:I,verbose:J,tokenize:j,matchAllTokens:F},this.setCollection(t);}var t,n;return t=e,(n=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var n=this._prepareSearchers(e),r=n.tokenSearchers,o=n.fullSearcher,i=this._search(r,o),a=i.weights,s=i.results;return this._computeScore(a,s),this.options.shouldSort&&this._sort(s),t.limit&&"number"==typeof t.limit&&(s=s.slice(0,t.limit)),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var n=e.split(this.options.tokenSeparator),r=0,o=n.length;r<o;r+=1)t.push(new i(n[r],this.options));return {tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=this.list,r={},o=[];if("string"==typeof n[0]){for(var i=0,a=n.length;i<a;i+=1)this._analyze({key:"",value:n[i],record:i,index:i},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t});return {weights:null,results:o}}for(var s={},c=0,h=n.length;c<h;c+=1)for(var l=n[c],u=0,f=this.options.keys.length;u<f;u+=1){var d=this.options.keys[u];if("string"!=typeof d){if(s[d.name]={weight:1-d.weight||1},d.weight<=0||d.weight>1)throw new Error("Key weight has to be > 0 and <= 1");d=d.name;}else s[d]={weight:1};this._analyze({key:d,value:this.options.getFn(l,d),record:l,index:c},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t});}return {weights:s,results:o}}},{key:"_analyze",value:function(e,t){var n=e.key,r=e.arrayIndex,o=void 0===r?-1:r,i=e.value,a=e.record,c=e.index,h=t.tokenSearchers,l=void 0===h?[]:h,u=t.fullSearcher,f=void 0===u?[]:u,d=t.resultMap,v=void 0===d?{}:d,p=t.results,g=void 0===p?[]:p;if(null!=i){var y=!1,m=-1,k=0;if("string"==typeof i){this._log("\nKey: ".concat(""===n?"-":n));var S=f.search(i);if(this._log('Full text: "'.concat(i,'", score: ').concat(S.score)),this.options.tokenize){for(var x=i.split(this.options.tokenSeparator),b=[],M=0;M<l.length;M+=1){var _=l[M];this._log('\nPattern: "'.concat(_.pattern,'"'));for(var L=!1,w=0;w<x.length;w+=1){var A=x[w],C=_.search(A),I={};C.isMatch?(I[A]=C.score,y=!0,L=!0,b.push(C.score)):(I[A]=1,this.options.matchAllTokens||b.push(1)),this._log('Token: "'.concat(A,'", score: ').concat(I[A]));}L&&(k+=1);}m=b[0];for(var O=b.length,j=1;j<O;j+=1)m+=b[j];m/=O,this._log("Token score average:",m);}var P=S.score;m>-1&&(P=(P+m)/2),this._log("Score average:",P);var F=!this.options.tokenize||!this.options.matchAllTokens||k>=l.length;if(this._log("\nCheck Matches: ".concat(F)),(y||S.isMatch)&&F){var T=v[c];T?T.output.push({key:n,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}):(v[c]={item:a,output:[{key:n,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}]},g.push(v[c]));}}else if(s(i))for(var z=0,E=i.length;z<E;z+=1)this._analyze({key:n,arrayIndex:z,value:i[z],record:a,index:c},{resultMap:v,results:g,tokenSearchers:l,fullSearcher:f});}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var n=0,r=t.length;n<r;n+=1){for(var o=t[n].output,i=o.length,a=1,s=1,c=0;c<i;c+=1){var h=e?e[o[c].key].weight:1,l=(1===h?o[c].score:o[c].score||.001)*h;1!==h?s=Math.min(s,l):(o[c].nScore=l,a*=l);}t[n].score=1===s?a:s,this._log(t[n]);}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn);}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var n=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===r(t)&&null!==t){if(-1!==n.indexOf(t))return;n.push(t);}return t})),n=null;}var o=[];this.options.includeMatches&&o.push(function(e,t){var n=e.output;t.matches=[];for(var r=0,o=n.length;r<o;r+=1){var i=n[r];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a);}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score;});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c);}else t.push(s.item);}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments);}}])&&o(t.prototype,n),e}();e.exports=c;},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}var o=n(3),i=n(4),a=n(7),s=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,h=void 0===c?.6:c,l=n.maxPatternLength,u=void 0===l?32:l,f=n.isCaseSensitive,d=void 0!==f&&f,v=n.tokenSeparator,p=void 0===v?/ +/g:v,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern));}var t,n;return t=e,(n=[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return {isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,n=t.maxPatternLength,r=t.tokenSeparator;if(this.pattern.length>n)return o(e,this.pattern,r);var a=this.options,s=a.location,c=a.distance,h=a.threshold,l=a.findAllMatches,u=a.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:s,distance:c,threshold:h,findAllMatches:l,minMatchCharLength:u})}}])&&r(t.prototype,n),e}();e.exports=s;},function(e,t){var n=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(n,"\\$&").replace(r,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1]);}return {score:a?.5:1,isMatch:a,matchedIndices:s}};},function(e,t,n){var r=n(5),o=n(6);e.exports=function(e,t,n,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,d=void 0!==f&&f,v=i.minMatchCharLength,p=void 0===v?1:v,g=s,y=e.length,m=u,k=e.indexOf(t,g),S=t.length,x=[],b=0;b<y;b+=1)x[b]=0;if(-1!==k){var M=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});if(m=Math.min(M,m),-1!==(k=e.lastIndexOf(t,g+S))){var _=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});m=Math.min(_,m);}}k=-1;for(var L=[],w=1,A=S+y,C=1<<S-1,I=0;I<S;I+=1){for(var O=0,j=A;O<j;){r(t,{errors:I,currentLocation:g+j,expectedLocation:g,distance:h})<=m?O=j:A=j,j=Math.floor((A-O)/2+O);}A=j;var P=Math.max(1,g-j+1),F=d?y:Math.min(g+j,y)+S,T=Array(F+2);T[F+1]=(1<<I)-1;for(var z=F;z>=P;z-=1){var E=z-1,K=n[e.charAt(E)];if(K&&(x[E]=1),T[z]=(T[z+1]<<1|1)&K,0!==I&&(T[z]|=(L[z+1]|L[z])<<1|1|L[z+1]),T[z]&C&&(w=r(t,{errors:I,currentLocation:E,expectedLocation:g,distance:h}))<=m){if(m=w,(k=E)<=g)break;P=Math.max(1,2*g-k);}}if(r(t,{errors:I+1,currentLocation:g,expectedLocation:g,distance:h})>m)break;L=T;}return {isMatch:k>=0,score:0===w?.001:w,matchedIndices:o(x,p)}};},function(e,t){e.exports=function(e,t){var n=t.errors,r=void 0===n?0:n,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=r/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l};},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===r?r=i:s||-1===r||((o=i-1)-r+1>=t&&n.push([r,o]),r=-1);}return e[i-1]&&i-r>=t&&n.push([r,i-1]),n};},function(e,t){e.exports=function(e){for(var t={},n=e.length,r=0;r<n;r+=1)t[e.charAt(r)]=0;for(var o=0;o<n;o+=1)t[e.charAt(o)]|=1<<n-o-1;return t};},function(e,t,n){var r=n(0);e.exports=function(e,t){return function e(t,n,o){if(n){var i=n.indexOf("."),a=n,s=null;-1!==i&&(a=n.slice(0,i),s=n.slice(i+1));var c=t[a];if(null!=c)if(s||"string"!=typeof c&&"number"!=typeof c)if(r(c))for(var h=0,l=c.length;h<l;h+=1)e(c[h],s,o);else s&&e(c,s,o);else o.push(c.toString());}else o.push(t);return o}(e,t,[])};}])});
    });

    var Fuse = unwrapExports(fuse);
    var fuse_1 = fuse.Fuse;

    var types = {
        Groups: [],
        Topics: [],
        Members: [],
        Events: []
    };
    var fuseCfg = {
        distance: 100,
        findAllMatches: true,
        id: 'id',
        includeMatches: true,
        includeScore: true,
        isCaseSensitive: false,
        location: 0,
        matchAllTokens: false,
        maxPatternLength: 32,
        minMatchCharLength: 3,
        shouldSort: true,
        sortFn: function (e, t) { return t.score - e.score; },
        threshold: 0.6,
        tokenSeparator: / +/g,
        tokenize: false,
        verbose: false
    };
    function buildIndexesFuse(graph) {
        var indexes = {
            groupIdx: null,
            topicIdx: null,
            memberIdx: null,
            eventIdx: null
        };
        Object.values(graph.getNodes()).forEach(function (n) {
            switch (n.getLabel()) {
                case 'Group':
                    var groupIdxEntry = {
                        id: n.getID(),
                        name: n.getFeature('name'),
                        description: n.getFeature('description'),
                        organiserName: n.getFeature('organiserName')
                    };
                    types.Groups.push(groupIdxEntry);
                    break;
                case 'Topic':
                    var topicIdxEntry = {
                        id: n.getID(),
                        name: n.getFeature('name'),
                        urlkey: n.getFeature('urlkey')
                    };
                    types.Topics.push(topicIdxEntry);
                    break;
                case 'Member':
                    var memberIdxEntry = {
                        id: n.getID(),
                        name: n.getFeature('name')
                    };
                    types.Members.push(memberIdxEntry);
                    break;
                case 'Event':
                    var eventIdxEntry = {
                        id: n.getID(),
                        name: n.getFeature('name'),
                        description: n.getFeature('description')
                    };
                    types.Events.push(eventIdxEntry);
                    break;
                default:
                    console.log("Node Type not supported in Meetup scenario...!");
                    return false;
            }
        });
        Object.keys(types).forEach(function (k) { return console.log(types[k].length + " nodes of type " + k + " registered."); });
        indexes.groupIdx = new Fuse(types.Groups, __assign({ keys: ['name', 'description', 'organiserName'] }, fuseCfg));
        indexes.topicIdx = new Fuse(types.Topics, __assign({ keys: ['name', 'urlkey'] }, fuseCfg));
        indexes.memberIdx = new Fuse(types.Members, __assign({ keys: ['name'] }, fuseCfg));
        indexes.eventIdx = new Fuse(types.Events, __assign({ keys: ['name', 'description'] }, fuseCfg));
        window.idxFuse = indexes;
        return indexes;
    }
    //# sourceMappingURL=meetupIndexesFuse.js.map

    const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

    let idbProxyableTypes;
    let cursorAdvanceMethods;
    // This is a function to prevent it throwing up in node environments.
    function getIdbProxyableTypes() {
        return idbProxyableTypes ||
            (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
    }
    // This is a function to prevent it throwing up in node environments.
    function getCursorAdvanceMethods() {
        return cursorAdvanceMethods || (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]);
    }
    const cursorRequestMap = new WeakMap();
    const transactionDoneMap = new WeakMap();
    const transactionStoreNamesMap = new WeakMap();
    const transformCache = new WeakMap();
    const reverseTransformCache = new WeakMap();
    function promisifyRequest(request) {
        const promise = new Promise((resolve, reject) => {
            const unlisten = () => {
                request.removeEventListener('success', success);
                request.removeEventListener('error', error);
            };
            const success = () => {
                resolve(wrap(request.result));
                unlisten();
            };
            const error = () => {
                reject(request.error);
                unlisten();
            };
            request.addEventListener('success', success);
            request.addEventListener('error', error);
        });
        promise.then((value) => {
            // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
            // (see wrapFunction).
            if (value instanceof IDBCursor) {
                cursorRequestMap.set(value, request);
            }
            // Catching to avoid "Uncaught Promise exceptions"
        }).catch(() => { });
        // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
        // is because we create many promises from a single IDBRequest.
        reverseTransformCache.set(promise, request);
        return promise;
    }
    function cacheDonePromiseForTransaction(tx) {
        // Early bail if we've already created a done promise for this transaction.
        if (transactionDoneMap.has(tx))
            return;
        const done = new Promise((resolve, reject) => {
            const unlisten = () => {
                tx.removeEventListener('complete', complete);
                tx.removeEventListener('error', error);
                tx.removeEventListener('abort', error);
            };
            const complete = () => {
                resolve();
                unlisten();
            };
            const error = () => {
                reject(tx.error);
                unlisten();
            };
            tx.addEventListener('complete', complete);
            tx.addEventListener('error', error);
            tx.addEventListener('abort', error);
        });
        // Cache it for later retrieval.
        transactionDoneMap.set(tx, done);
    }
    let idbProxyTraps = {
        get(target, prop, receiver) {
            if (target instanceof IDBTransaction) {
                // Special handling for transaction.done.
                if (prop === 'done')
                    return transactionDoneMap.get(target);
                // Polyfill for objectStoreNames because of Edge.
                if (prop === 'objectStoreNames') {
                    return target.objectStoreNames || transactionStoreNamesMap.get(target);
                }
                // Make tx.store return the only store in the transaction, or undefined if there are many.
                if (prop === 'store') {
                    return receiver.objectStoreNames[1] ?
                        undefined : receiver.objectStore(receiver.objectStoreNames[0]);
                }
            }
            // Else transform whatever we get back.
            return wrap(target[prop]);
        },
        has(target, prop) {
            if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store'))
                return true;
            return prop in target;
        },
    };
    function addTraps(callback) {
        idbProxyTraps = callback(idbProxyTraps);
    }
    function wrapFunction(func) {
        // Due to expected object equality (which is enforced by the caching in `wrap`), we
        // only create one new func per func.
        // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
        if (func === IDBDatabase.prototype.transaction &&
            !('objectStoreNames' in IDBTransaction.prototype)) {
            return function (storeNames, ...args) {
                const tx = func.call(unwrap(this), storeNames, ...args);
                transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
                return wrap(tx);
            };
        }
        // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
        // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
        // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
        // with real promises, so each advance methods returns a new promise for the cursor object, or
        // undefined if the end of the cursor has been reached.
        if (getCursorAdvanceMethods().includes(func)) {
            return function (...args) {
                // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
                // the original object.
                func.apply(unwrap(this), args);
                return wrap(cursorRequestMap.get(this));
            };
        }
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            return wrap(func.apply(unwrap(this), args));
        };
    }
    function transformCachableValue(value) {
        if (typeof value === 'function')
            return wrapFunction(value);
        // This doesn't return, it just creates a 'done' promise for the transaction,
        // which is later returned for transaction.done (see idbObjectHandler).
        if (value instanceof IDBTransaction)
            cacheDonePromiseForTransaction(value);
        if (instanceOfAny(value, getIdbProxyableTypes()))
            return new Proxy(value, idbProxyTraps);
        // Return the same value back if we're not going to transform it.
        return value;
    }
    function wrap(value) {
        // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
        // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
        if (value instanceof IDBRequest)
            return promisifyRequest(value);
        // If we've already transformed this value before, reuse the transformed value.
        // This is faster, but it also provides object equality.
        if (transformCache.has(value))
            return transformCache.get(value);
        const newValue = transformCachableValue(value);
        // Not all types are transformed.
        // These may be primitive types, so they can't be WeakMap keys.
        if (newValue !== value) {
            transformCache.set(value, newValue);
            reverseTransformCache.set(newValue, value);
        }
        return newValue;
    }
    const unwrap = (value) => reverseTransformCache.get(value);

    const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
    const writeMethods = ['put', 'add', 'delete', 'clear'];
    const cachedMethods = new Map();
    function getMethod(target, prop) {
        if (!(target instanceof IDBDatabase &&
            !(prop in target) &&
            typeof prop === 'string'))
            return;
        if (cachedMethods.get(prop))
            return cachedMethods.get(prop);
        const targetFuncName = prop.replace(/FromIndex$/, '');
        const useIndex = prop !== targetFuncName;
        const isWrite = writeMethods.includes(targetFuncName);
        if (
        // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
        !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
            !(isWrite || readMethods.includes(targetFuncName)))
            return;
        const method = async function (storeName, ...args) {
            // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
            const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
            let target = tx.store;
            if (useIndex)
                target = target.index(args.shift());
            const returnVal = target[targetFuncName](...args);
            if (isWrite)
                await tx.done;
            return returnVal;
        };
        cachedMethods.set(prop, method);
        return method;
    }
    addTraps(oldTraps => ({
        get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
        has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
    }));

    var _this = undefined;
    var testGraphDir = "../test-data/graphs";
    var graphExt = "json";
    var graphName = "meetupGraph";
    var meetupFile = testGraphDir + "/" + graphName + "." + graphExt;
    var SEARCH_TERM = "pottery";
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var tic, mug, toc, indexesFuse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Loading Meetup graph...");
                    tic = +new Date;
                    return [4, getOrCreateGraph()];
                case 1:
                    mug = _a.sent();
                    toc = +new Date;
                    console.log("Importing graph of |V|=" + mug.nrNodes() + " and |E_dir|=" + mug.nrDirEdges() + " took " + (toc - tic) + " ms.");
                    indexesFuse = createFuseIndex(mug);
                    return [2];
            }
        });
    }); })();
    function createFuseIndex(graph) {
        var tic = +new Date;
        var indexes = buildIndexesFuse(graph);
        var toc = +new Date;
        console.log("Building Indexes in FUSE took " + (toc - tic) + " ms.");
        var searchRes = indexes.groupIdx.search(SEARCH_TERM);
        console.log("FUSE search on '" + SEARCH_TERM + "' returned " + Object.keys(searchRes).length + " results.");
        console.log(searchRes);
        searchRes.forEach(function (res) {
            if (res['matches'].length) {
                var node = graph.getNodeById(res['item']);
                console.log(node.getFeatures());
            }
        });
        return indexes;
    }
    function getOrCreateGraph(graphName) {
        return __awaiter(this, void 0, void 0, function () {
            var graph;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, importGraphFromURL(meetupFile)];
                    case 1:
                        graph = _a.sent();
                        window.$G = GraphiniusJS;
                        window.graph = graph;
                        return [2, graph];
                }
            });
        });
    }

}));
//# sourceMappingURL=bundle.js.map
