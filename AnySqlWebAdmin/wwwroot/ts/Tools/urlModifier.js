var Tools;
(function (Tools) {
    var UrlModifier = (function () {
        function UrlModifier(url, caseSensitive) {
            this.autoBind(this);
            if (caseSensitive == null)
                caseSensitive = false;
            this.hash = null;
            this.keys = [];
            this.values = {};
            this.m_caseSensitive = caseSensitive;
            var hashStart = url.indexOf('#');
            var paramStart = url.indexOf('?');
            if (hashStart !== -1) {
                this.hash = url.substr(hashStart + 1);
                url = url.substr(0, hashStart);
            }
            if (paramStart < 0)
                return;
            this.url = url.substr(0, paramStart);
            var queryString = url.substr(paramStart + 1);
            var kvps = queryString.split('&');
            for (var i = 0; i < kvps.length; i++) {
                var kvp = kvps[i].split('=');
                kvp[0] = decodeURIComponent(kvp[0]);
                kvp[1] = decodeURIComponent(kvp[1]);
                var key = this.m_caseSensitive ? kvp[0] : kvp[0].toLowerCase();
                this.keys.push(key);
                this.values[key] = kvp[1];
            }
        }
        Object.defineProperty(UrlModifier.prototype, "queryString", {
            get: function () {
                var qs = "";
                for (var i = 0; i < this.keys.length; ++i) {
                    qs += (i === 0 ? "?" : "&")
                        + encodeURIComponent(this.keys[i])
                        + "=" + encodeURIComponent(this.values[this.keys[i]]);
                }
                return qs;
            },
            enumerable: true,
            configurable: true
        });
        UrlModifier.prototype.autoBind = function (self) {
            for (var _i = 0, _a = Object.getOwnPropertyNames(self.constructor.prototype); _i < _a.length; _i++) {
                var key = _a[_i];
                if (key !== 'constructor') {
                    var isFunction = true;
                    var desc = Object.getOwnPropertyDescriptor(self.constructor.prototype, key);
                    if (desc.get != null) {
                        desc.get = desc.get.bind(self);
                        isFunction = false;
                    }
                    if (desc.set != null) {
                        desc.set = desc.set.bind(self);
                        isFunction = false;
                    }
                    if (isFunction && typeof (self[key]) === 'function') {
                        var val = self[key];
                        self[key] = val.bind(self);
                    }
                }
            }
            return self;
        };
        UrlModifier.prototype.containsKey = function (key) {
            var caseKey = this.m_caseSensitive ? key : key.toLowerCase();
            var index = this.keys.indexOf(caseKey);
            return (index > -1);
        };
        UrlModifier.prototype.get = function (key) {
            var caseKey = this.m_caseSensitive ? key : key.toLowerCase();
            return this.values[caseKey];
        };
        UrlModifier.prototype.set = function (key, value) {
            var caseKey = this.m_caseSensitive ? key : key.toLowerCase();
            var index = this.keys.indexOf(caseKey);
            if (index == -1) {
                this.keys.push(caseKey);
            }
            this.values[caseKey] = value;
            return this;
        };
        UrlModifier.prototype.add = function (key, value) {
            return this.set(key, value);
        };
        UrlModifier.prototype.remove = function (key) {
            var caseKey = this.m_caseSensitive ? key : key.toLowerCase();
            var index = this.keys.indexOf(caseKey);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
            delete this.values[caseKey];
            return this;
        };
        UrlModifier.prototype.encode = function (pd) {
            var k;
            for (k in pd)
                this.add(k, pd[k]);
            return this;
        };
        UrlModifier.prototype.toUrl = function () {
            var newUrl = this.url + this.queryString;
            if (this.hash != null)
                newUrl += "#" + this.hash;
            return newUrl;
        };
        return UrlModifier;
    }());
    Tools.UrlModifier = UrlModifier;
})(Tools || (Tools = {}));
