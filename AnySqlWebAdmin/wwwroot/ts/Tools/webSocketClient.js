var WebSocketClient = (function () {
    function WebSocketClient() {
        this._reset();
    }
    Object.defineProperty(WebSocketClient.prototype, "connected", {
        get: function () {
            return this._socket != null && this._socket.readyState === WebSocket.OPEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "dataAvailable", {
        get: function () {
            return this._receiveDataQueue.length;
        },
        enumerable: true,
        configurable: true
    });
    WebSocketClient.prototype.connect = function (url, protocols) {
        var _this = this;
        return this.disconnect().then(function () {
            _this._reset();
            _this._socket = new WebSocket(url, protocols);
            _this._socket.binaryType = 'arraybuffer';
            return _this._setupListenersOnConnect();
        });
    };
    WebSocketClient.prototype.send = function (data) {
        if (!this.connected) {
            throw this._closeEvent || new Error('Not connected.');
        }
        this._socket.send(data);
    };
    WebSocketClient.prototype.receive = function () {
        var _this = this;
        if (this._receiveDataQueue.length !== 0) {
            return Promise.resolve(this._receiveDataQueue.shift());
        }
        if (!this.connected) {
            return Promise.reject(this._closeEvent || new Error('Not connected.'));
        }
        var receivePromise = new Promise(function (resolve, reject) {
            _this._receiveCallbacksQueue.push({ resolve: resolve, reject: reject });
        });
        return receivePromise;
    };
    WebSocketClient.prototype.disconnect = function (code, reason) {
        var _this = this;
        if (!this.connected) {
            return Promise.resolve(this._closeEvent);
        }
        return new Promise(function (resolve, reject) {
            var callbacks = {
                resolve: function () {
                    this._receiveCallbacksQueue.push(callbacks);
                },
                reject: resolve
            };
            _this._receiveCallbacksQueue.push(callbacks);
            _this._socket.close(code, reason);
        });
    };
    WebSocketClient.prototype._setupListenersOnConnect = function () {
        var socket = this._socket;
        return new Promise(function (resolve, reject) {
            var handleMessage = function (event) {
                if (this._receiveCallbacksQueue.length !== 0) {
                    this._receiveCallbacksQueue.shift().resolve(event.data);
                    return;
                }
                this._receiveDataQueue.push(event.data);
            };
            var handleOpen = function (event) {
                socket.addEventListener('message', handleMessage);
                resolve();
            };
            socket.addEventListener('error', reject);
            socket.addEventListener('open', handleOpen);
        });
    };
    WebSocketClient.prototype._reset = function () {
        this._receiveDataQueue = [];
        this._receiveCallbacksQueue = [];
        this._closeEvent = null;
    };
    return WebSocketClient;
}());
export default WebSocketClient;
