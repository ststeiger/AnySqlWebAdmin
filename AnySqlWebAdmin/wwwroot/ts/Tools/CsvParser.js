var __extends = (this && this.__extends) || (function () {
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
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var BlueMine;
(function (BlueMine) {
    var Data;
    (function (Data) {
        var ObjectDisposedException = (function (_super) {
            __extends(ObjectDisposedException, _super);
            function ObjectDisposedException(message) {
                var _this = _super.call(this, message) || this;
                _this.name = "ObjectDisposedException";
                Object.setPrototypeOf(_this, ObjectDisposedException.prototype);
                return _this;
            }
            return ObjectDisposedException;
        }(Error));
        Data.ObjectDisposedException = ObjectDisposedException;
        var ArgumentNullException = (function (_super) {
            __extends(ArgumentNullException, _super);
            function ArgumentNullException(message) {
                var _this = _super.call(this, message) || this;
                _this.name = "ArgumentNullException";
                Object.setPrototypeOf(_this, ObjectDisposedException.prototype);
                return _this;
            }
            return ArgumentNullException;
        }(Error));
        Data.ArgumentNullException = ArgumentNullException;
        var StringReader = (function () {
            function StringReader(source) {
                this.m_source = source;
                this.m_nextChar = 0;
                this.m_sourceLength = source.length;
                this.m_errorMessage = "Cannot read from a closed CsvReader";
            }
            StringReader.prototype.Read = function () {
                if (this.m_source == null)
                    throw new ObjectDisposedException(this.m_errorMessage);
                if (this.m_nextChar >= this.m_sourceLength)
                    return String.fromCharCode(-1);
                return this.m_source[this.m_nextChar++];
            };
            StringReader.prototype.Peek = function () {
                if (this.m_source == null)
                    throw new ObjectDisposedException(this.m_errorMessage);
                if (this.m_nextChar >= this.m_sourceLength)
                    return String.fromCharCode(-1);
                return this.m_source[this.m_nextChar];
            };
            StringReader.prototype.PeekNum = function () {
                if (this.m_nextChar >= this.m_sourceLength)
                    return -1;
                this.m_source.charCodeAt(this.m_nextChar);
            };
            StringReader.prototype.ReadToEnd = function () {
                var toEnd = this.m_source.substr(this.m_nextChar, this.m_sourceLength - this.m_nextChar);
                this.m_nextChar = this.m_sourceLength;
                return toEnd;
            };
            StringReader.prototype.Read2 = function (buffer, index, count) {
                if (this.m_source == null)
                    throw new ObjectDisposedException(this.m_errorMessage);
                var charsToRead;
                if (this.m_nextChar > this.m_sourceLength - count)
                    charsToRead = this.m_sourceLength - this.m_nextChar;
                else
                    charsToRead = count;
                var sub = this.m_source.substr(this.m_nextChar, charsToRead);
                var prebuffer = buffer.substr(0, index);
                var postBuffer = buffer.substr(index + sub.length);
                var newBuffer = prebuffer + sub + postBuffer;
                this.m_nextChar += charsToRead;
                return { "charsRead": charsToRead, "buffer": newBuffer };
            };
            StringReader.prototype.Dispose = function () {
                this.m_source = null;
                this.m_errorMessage = null;
            };
            return StringReader;
        }());
        function ParseSimple(reader, delimiter, qualifier) {
            var ls = [];
            var inQuote = false;
            var record = [];
            var sb = [];
            while (reader.PeekNum() != -1) {
                var readChar = reader.Read();
                if (readChar == '\n' || (readChar == '\r' && reader.Peek() == '\n')) {
                    if (readChar == '\r')
                        reader.Read();
                    if (inQuote) {
                        if (readChar == '\r')
                            sb.push('\r');
                        sb.push('\n');
                    }
                    else {
                        if (record.length > 0 || sb.length > 0) {
                            record.push(sb.join(''));
                            sb = [];
                        }
                        if (record.length > 0) {
                            ls.push(record);
                        }
                        record = [];
                    }
                }
                else if (sb.length == 0 && !inQuote) {
                    if (readChar == qualifier)
                        inQuote = true;
                    else if (readChar == delimiter) {
                        record.push(sb.join(''));
                        sb = [];
                    }
                    else if (/\s/.test(readChar)) {
                    }
                    else
                        sb.push(readChar);
                }
                else if (readChar == delimiter) {
                    if (inQuote)
                        sb.push(delimiter);
                    else {
                        record.push(sb.join(''));
                        sb = [];
                    }
                }
                else if (readChar == qualifier) {
                    if (inQuote) {
                        if (reader.Peek() == qualifier) {
                            reader.Read();
                            sb.push(qualifier);
                        }
                        else
                            inQuote = false;
                    }
                    else
                        sb.push(readChar);
                }
                else
                    sb.push(readChar);
            }
            if (record.length > 0 || sb.length > 0) {
                record.push(sb.join(''));
            }
            if (record.length > 0) {
                ls.push(record);
            }
            return ls;
        }
        Data.ParseSimple = ParseSimple;
        function Parse(reader, delimiter, qualifier) {
            var inQuote, record, sb, readChar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inQuote = false;
                        record = [];
                        sb = [];
                        _a.label = 1;
                    case 1:
                        if (!(reader.PeekNum() != -1)) return [3, 8];
                        readChar = reader.Read();
                        if (!(readChar == '\n' || (readChar == '\r' && reader.Peek() == '\n'))) return [3, 6];
                        if (readChar == '\r')
                            reader.Read();
                        if (!inQuote) return [3, 2];
                        if (readChar == '\r')
                            sb.push('\r');
                        sb.push('\n');
                        return [3, 5];
                    case 2:
                        if (record.length > 0 || sb.length > 0) {
                            record.push(sb.join(''));
                            sb = [];
                        }
                        if (!(record.length > 0)) return [3, 4];
                        return [4, record];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        record = [];
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        if (sb.length == 0 && !inQuote) {
                            if (readChar == qualifier)
                                inQuote = true;
                            else if (readChar == delimiter) {
                                record.push(sb.join(''));
                                sb = [];
                            }
                            else if (/\s/.test(readChar)) {
                            }
                            else
                                sb.push(readChar);
                        }
                        else if (readChar == delimiter) {
                            if (inQuote)
                                sb.push(delimiter);
                            else {
                                record.push(sb.join(''));
                                sb = [];
                            }
                        }
                        else if (readChar == qualifier) {
                            if (inQuote) {
                                if (reader.Peek() == qualifier) {
                                    reader.Read();
                                    sb.push(qualifier);
                                }
                                else
                                    inQuote = false;
                            }
                            else
                                sb.push(readChar);
                        }
                        else
                            sb.push(readChar);
                        _a.label = 7;
                    case 7: return [3, 1];
                    case 8:
                        if (record.length > 0 || sb.length > 0)
                            record.push(sb.join(''));
                        if (!(record.length > 0)) return [3, 10];
                        return [4, record];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2];
                }
            });
        }
        Data.Parse = Parse;
        function EnumerateTail(en) {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = en.next();
                        _a.label = 1;
                    case 1:
                        if (!!r.done) return [3, 3];
                        return [4, r.value];
                    case 2:
                        _a.sent();
                        r = en.next();
                        return [3, 1];
                    case 3: return [2];
                }
            });
        }
        function HeadAndTail(source) {
            if (source == null)
                throw new ArgumentNullException("source");
            var head = source.next().value;
            return { "head": head, "tail": EnumerateTail(source) };
        }
        function ParseHeadAndTail(reader, delimiter, qualifier) {
            return HeadAndTail(Parse(reader, delimiter, qualifier));
        }
        Data.ParseHeadAndTail = ParseHeadAndTail;
        function test() {
            var e_1, _a;
            var foo = "abc\tdef\tghi\nhelloWolrd\t\t\n\"Hello\tWorld\"\ttest1\ttest2\n\"\"\"Hello\tWorld\"\"\"\ttest3\ttest4\n\t\"\"\"Hello\tHell\"\"\"\t";
            var reader = new StringReader(foo);
            var delimiter = "\t";
            var qualifier = '"';
            var a = ParseHeadAndTail(reader, delimiter, qualifier);
            for (var i = 0; i < a.head.length; ++i) {
                console.log(i, a.head[i]);
            }
            try {
                for (var _b = __values(a.tail), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    console.log("value", value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        Data.test = test;
        function parseExcel(clipboardText) {
            var reader = new StringReader(clipboardText);
            var delimiter = "\t";
            var qualifier = '"';
            var result = ParseSimple(reader, delimiter, qualifier);
            return result;
        }
        Data.parseExcel = parseExcel;
        function copyPasteTest() {
            function determineTypes(data) {
                var itemFound = false;
                for (var i = 0; i < data.items.length; i++) {
                    var item = data.items[i];
                    if (item.type === 'image/png') {
                        itemFound = true;
                        break;
                    }
                }
            }
            document.onpaste = function (pasteEvent) {
                determineTypes(pasteEvent.clipboardData);
                var item = pasteEvent.clipboardData.items[0];
                if (item.type.indexOf("image") === 0) {
                    var blob = item.getAsFile();
                    var reader = new FileReader();
                    reader.onload = function (event) {
                    };
                    reader.readAsDataURL(blob);
                }
            };
            function pasteHandler(e) {
                if (e.clipboardData && e.clipboardData.getData) {
                    var pastedText = "";
                    if (window.clipboardData && window.clipboardData.getData) {
                        pastedText = window.clipboardData.getData('Text');
                    }
                    else if (e.clipboardData && e.clipboardData.getData) {
                        pastedText = e.clipboardData.getData('text/plain');
                    }
                    console.log(pastedText);
                    var tabularData = parseExcel(pastedText);
                    console.log("data from Excel", tabularData);
                }
                else {
                    console.log('Not paste object!');
                }
            }
        }
    })(Data = BlueMine.Data || (BlueMine.Data = {}));
})(BlueMine || (BlueMine = {}));
