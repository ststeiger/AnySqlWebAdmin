var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var Tree;
(function (Tree) {
    "use strict";
    var VanillaTree = (function () {
        function VanillaTree(options) {
            this.m_refetch = false;
            this.autoBind(this);
            this.m_refetch = false;
            this.m_url = options.url;
            this.m_container = (typeof options.id === 'string' || options.id instanceof String) ?
                document.querySelector(options.id) : options.id;
            this.m_tree = this.m_container.appendChild(this.create('ul', {
                className: 'vtree'
            }));
            this.m_placeholder = options && options.placeholder;
            this.placeholder();
            this.m_leafs = {};
            this.m_tree.addEventListener('click', function (evt) {
                if (evt.target.classList.contains("vtree-leaf-label")) {
                    this.select(evt.target.parentElement.getAttribute('data-vtree-id'));
                }
                else if (evt.target.classList.contains("vtree-toggle")) {
                    this.toggle(evt.target.parentElement.getAttribute('data-vtree-id'));
                }
                evt.target.focus();
            }.bind(this));
            this.m_tree.addEventListener('keydown', function (e) {
                e = e || window.event;
                var target = e.target;
                if (target.classList.contains("vtree-leaf-label"))
                    return;
                var id = target.getAttribute('data-vtree-id');
                if (e.keyCode > 36 && e.keyCode < 41) {
                    if (e.keyCode === 38) {
                        var previous = this.getPreviousTab(document.activeElement);
                        previous.click();
                    }
                    else if (e.keyCode === 40) {
                        var next = this.getNextTab(document.activeElement);
                        next.click();
                    }
                    else if (e.keyCode === 37) {
                        this.select(id);
                        this.close(id);
                    }
                    else if (e.keyCode === 39) {
                        this.select(id);
                        this.open(id);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
            }.bind(this));
            if (options && options.contextmenu) {
                this.m_tree.addEventListener('contextmenu', function (evt) {
                    var menu, contextMenus = this.m_tree.querySelectorAll('.vtree-contextmenu');
                    [].forEach.call(contextMenus, function (contextMenu) {
                        contextMenu.parentElement.removeChild(contextMenu);
                    });
                    if (evt.target.classList.contains("vtree-leaf-label")) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        menu = this.create('menu', {
                            className: 'vtree-contextmenu'
                        });
                        var rect = evt.target.getBoundingClientRect();
                        this.setProperties(menu.style, {
                            top: (evt.target.offsetTop + rect.height)
                                .toString() + "px",
                            left: evt.target.offsetLeft
                                .toString() + "px",
                            display: 'block'
                        });
                        options.contextmenu.forEach(function (item) {
                            menu.appendChild(this.create('li', {
                                className: 'vtree-contextmenu-item',
                                innerHTML: item.label
                            }))
                                .addEventListener('click', item.action.bind(item, evt.target.parentElement.getAttribute('data-vtree-id')));
                        }.bind(this));
                        evt.target.parentElement.appendChild(menu);
                    }
                }.bind(this));
                document.addEventListener('click', function (evt) {
                    var contextMenus = this.m_tree.querySelectorAll('.vtree-contextmenu');
                    [].forEach.call(contextMenus, function (menu) {
                        menu.parentElement.removeChild(menu);
                    });
                }.bind(this));
            }
        }
        VanillaTree.prototype.autoBind = function (self) {
            for (var _i = 0, _a = Object.getOwnPropertyNames(self.constructor.prototype); _i < _a.length; _i++) {
                var key = _a[_i];
                var val = self[key];
                if (key !== 'constructor' && typeof val === 'function') {
                    self[key] = val.bind(self);
                }
            }
            return self;
        };
        VanillaTree.prototype.createFilter = function (fn) {
            function acceptNode(node) {
                return NodeFilter.FILTER_ACCEPT;
            }
            if (fn == null)
                fn = acceptNode;
            var safeFilter = fn;
            safeFilter.acceptNode = fn;
            return safeFilter;
        };
        VanillaTree.prototype.createVisibleListNodesFilter = function () {
            function acceptNode(node) {
                if (!node)
                    return NodeFilter.FILTER_REJECT;
                if (node.nodeType !== Node.ELEMENT_NODE)
                    return NodeFilter.FILTER_REJECT;
                if (window.getComputedStyle(node).display === "none")
                    return NodeFilter.FILTER_REJECT;
                if (node.tagName !== "LI")
                    return NodeFilter.FILTER_SKIP;
                return NodeFilter.FILTER_ACCEPT;
            }
            return this.createFilter(acceptNode);
        };
        VanillaTree.prototype.getNextTab = function (el) {
            var currentNode;
            var ni = document.createTreeWalker(this.m_tree, NodeFilter.SHOW_ELEMENT, this.createVisibleListNodesFilter());
            ni.currentNode = el;
            while (currentNode = ni.nextNode()) {
                return currentNode;
            }
            return el;
        };
        VanillaTree.prototype.getPreviousTab = function (el) {
            var currentNode;
            var ni = document.createTreeWalker(this.m_tree, NodeFilter.SHOW_ELEMENT, this.createVisibleListNodesFilter());
            ni.currentNode = el;
            while (currentNode = ni.previousNode()) {
                return currentNode;
            }
            return el;
        };
        VanillaTree.prototype.setProperties = function (obj, props) {
            if (props) {
                for (var i = 0, keys = Object.keys(props); i < keys.length; i++) {
                    obj[keys[i]] = props[keys[i]];
                }
            }
            return obj;
        };
        VanillaTree.prototype.create = function (tagName, props) {
            return this.setProperties(document.createElement(tagName), props);
        };
        VanillaTree.prototype.dispatchEvent = function (name, id) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    try {
                        event = new CustomEvent('vtree-' + name, {
                            bubbles: true,
                            cancelable: true,
                            detail: { id: id }
                        });
                    }
                    catch (e) {
                        event = document.createEvent('CustomEvent');
                        event.initCustomEvent('vtree-' + name, true, true, { id: id });
                    }
                    (this.getLeaf(id, true) || this.m_tree)
                        .dispatchEvent(event);
                    return [2, new Promise(function (resolve) {
                            resolve(this);
                        }.bind(this))];
                });
            });
        };
        VanillaTree.prototype.placeholder = function () {
            var p;
            if (!this.m_tree.children.length && this.m_placeholder) {
                this.m_tree.innerHTML = '<li class="vtree-placeholder">' + this.m_placeholder + '</li>';
            }
            else if (p = this.m_tree.querySelector('.vtree-placeholder')) {
                this.m_tree.removeChild(p);
            }
            return this;
        };
        VanillaTree.prototype.getLeaf = function (id, notThrow) {
            var leaf = this.m_tree.querySelector('[data-vtree-id="' + id + '"]');
            if (!notThrow && !leaf)
                throw Error('No VanillaTree leaf with id "' + id + '"');
            return leaf;
        };
        VanillaTree.prototype.getChildList = function (id) {
            var list, parent;
            if (id) {
                parent = this.getLeaf(id);
                if (!(list = parent.querySelector('ul'))) {
                    list = parent.appendChild(this.create('ul', {
                        className: 'vtree-subtree'
                    }));
                }
            }
            else {
                list = this.m_tree;
            }
            return list;
        };
        VanillaTree.prototype.add = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var id, leaf, parentList, a;
                return __generator(this, function (_a) {
                    leaf = this.create('li', {
                        className: options.hasChildren ? 'vtree-leaf vtree-has-children' : 'vtree-leaf',
                        "tabIndex": "0"
                    }), parentList = this.getChildList(options.parent);
                    leaf.setAttribute('data-vtree-id', id = options.id || Math.random().toString());
                    leaf.appendChild(this.create('span', {
                        className: 'vtree-toggle'
                    }));
                    a = document.createElement("a");
                    a.className = "vtree-leaf-label";
                    a.appendChild(document.createTextNode(options.text));
                    leaf.appendChild(a);
                    parentList.appendChild(leaf);
                    if (parentList !== this.m_tree) {
                        parentList.parentElement.classList.add('vtree-has-children');
                    }
                    this.m_leafs[id] = options;
                    if (!options.opened) {
                        this.close(id);
                    }
                    if (options.selected) {
                        this.select(id);
                    }
                    return [2, this.placeholder().dispatchEvent('add', id)];
                });
            });
        };
        VanillaTree.prototype.move = function (id, parentId) {
            return __awaiter(this, void 0, void 0, function () {
                var leaf, oldParent, newParent;
                return __generator(this, function (_a) {
                    leaf = this.getLeaf(id), oldParent = leaf.parentElement, newParent = this.getLeaf(parentId, true);
                    if (newParent) {
                        newParent.classList.add('vtree-has-children');
                    }
                    this.getChildList(parentId).appendChild(leaf);
                    oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);
                    return [2, this.dispatchEvent('move', id)];
                });
            });
        };
        VanillaTree.prototype.getLeafData = function (id) {
            return this.m_leafs[id];
        };
        VanillaTree.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var leaf, oldParent;
                return __generator(this, function (_a) {
                    leaf = this.getLeaf(id), oldParent = leaf.parentElement;
                    oldParent.removeChild(leaf);
                    oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);
                    return [2, this.placeholder().dispatchEvent('remove', id)];
                });
            });
        };
        VanillaTree.prototype.newId = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        VanillaTree.prototype.getTable = function (url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var sendData, resp, json, obj, tab;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            sendData = {
                                "method": 'POST',
                                "headers": new Headers({ 'content-type': 'application/json' }),
                                "body": null
                            };
                            if (data != null)
                                sendData["body"] = JSON.stringify(data);
                            return [4, fetch(url, sendData)];
                        case 1:
                            resp = _a.sent();
                            return [4, resp.text()];
                        case 2:
                            json = _a.sent();
                            obj = JSON.parse(json);
                            tab = obj.tables[0];
                            return [2, tab];
                    }
                });
            });
        };
        VanillaTree.prototype.addBranch = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data, leafData, i, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            leafData = this.getLeafData(id);
                            return [4, this.getTable("sql?sql=Tree.Navigation.sql&format=3", { "__in_parent": id })];
                        case 2:
                            data = _a.sent();
                            for (i = 0; i < data.length; ++i) {
                                data[i].parent = id;
                                this.add(data[i]);
                            }
                            return [3, 4];
                        case 3:
                            e_1 = _a.sent();
                            console.log(e_1);
                            alert("error fetching branch data\n" + e_1);
                            return [3, 4];
                        case 4: return [2, data];
                    }
                });
            });
        };
        VanillaTree.prototype.open = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var leaf, children, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            leaf = this.getLeaf(id);
                            children = Array.prototype.slice.call(leaf.getElementsByTagName("ul")) || [];
                            leaf.classList.remove('closed');
                            if (!(children.length == 0)) return [3, 2];
                            return [4, this.addBranch(id)];
                        case 1:
                            _a.sent();
                            return [3, 4];
                        case 2:
                            if (!this.m_refetch) return [3, 4];
                            for (i = 0; i < children.length; ++i) {
                                leaf.removeChild(children[i]);
                            }
                            return [4, this.addBranch(id)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2, this.dispatchEvent('open', id)];
                    }
                });
            });
        };
        VanillaTree.prototype.close = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.getLeaf(id).classList.add('closed');
                    return [2, this.dispatchEvent('close', id)];
                });
            });
        };
        VanillaTree.prototype.toggle = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, this[this.getLeaf(id).classList.contains('closed') ? 'open' : 'close'](id)];
                });
            });
        };
        VanillaTree.prototype.select = function (id) {
            var selectedLeafs, leaf = this.getLeaf(id);
            if (!leaf.classList.contains('vtree-selected')) {
                selectedLeafs = this.m_tree.querySelectorAll('li.vtree-leaf');
                [].forEach.call(selectedLeafs, function (selectedLeaf) {
                    selectedLeaf.classList.remove('vtree-selected');
                });
                leaf.classList.add('vtree-selected');
                return this.dispatchEvent('select', id);
            }
            return new Promise(function (resolve) {
                resolve(this);
            }.bind(this));
        };
        return VanillaTree;
    }());
    Tree.VanillaTree = VanillaTree;
})(Tree || (Tree = {}));
