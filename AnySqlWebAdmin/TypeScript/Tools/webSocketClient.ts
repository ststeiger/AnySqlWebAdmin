﻿
/*
 // Set up connection.
 const webSocketClient = new WebSocketClient;
 // Connect.
 await webSocketClient.connect('ws://www.example.com/');
 // Send is synchronous.
 webSocketClient.send('Hello!');
 // Receive is asynchronous.
 console.log(await webSocketClient.receive());
 // See if there are any more messages received.
 if (webSocketClient.dataAvailable !== 0) { console.log(await webSocketClient.receive()); }
 // Close the connection.
 await webSocketClient.disconnect();
 */


// https://github.com/jcao219/websocket-async/blob/master/src/websocket-client.js

export default class WebSocketClient
{

    private _socket: WebSocket;
    private _closeEvent?: CloseEvent;
    private _receiveCallbacksQueue: Array<{ resolve: (data: any) => void, reject: (reason: any) => void }>;
    private _receiveDataQueue: Array<any>;


    constructor()
    {
        this._reset();
    }


    // Whether a connection is currently open.
    // @returns true if the connection is open.
    get connected(): boolean
    {
        // Checking != null also checks against undefined.
        return this._socket != null && this._socket.readyState === WebSocket.OPEN;
    }

    // The number of messages available to receive.
    // @returns The number of queued messages that can be retrieved with {@link #receive}
    get dataAvailable(): number
    {
        return this._receiveDataQueue.length;
    }


    // Sets up a WebSocket connection to specified url. Resolves when the 
    // connection is established. Can be called again to reconnect to any url.
    connect(url: string, protocols?: string): Promise<void>
    {
        return this.disconnect().then(() =>
        {
            this._reset();

            this._socket = new WebSocket(url, protocols);
            this._socket.binaryType = 'arraybuffer';
            return this._setupListenersOnConnect();
        });
    }


    // Send data through the websocket.
    // Must be connected. See {@link #connected}.
    send(data: any)
    {
        if (!this.connected)
        {
            throw this._closeEvent || new Error('Not connected.');
        }

        this._socket.send(data);
    }


    // Asynchronously receive data from the websocket.
    // Resolves immediately if there is buffered, unreceived data.
    // Otherwise, resolves with the next rececived message,
    // or rejects if disconnected.
    // @returns A promise that resolves with the data received.
    receive(): Promise<any>
    {
        if (this._receiveDataQueue.length !== 0)
        {
            return Promise.resolve(this._receiveDataQueue.shift());
        }

        if (!this.connected)
        {
            return Promise.reject(this._closeEvent || new Error('Not connected.'));
        }

        const receivePromise: Promise<any> = new Promise((resolve, reject) =>
        {
            this._receiveCallbacksQueue.push({ resolve, reject });
        });

        return receivePromise;
    }


    // Initiates the close handshake if there is an active connection.
    // Returns a promise that will never reject.
    // The promise resolves once the WebSocket connection is closed.
    disconnect(code?: number, reason?: string): Promise<CloseEvent?> 
    {
        if(!this.connected) 
        {
            return Promise.resolve(this._closeEvent);
        }

        return new Promise((resolve, reject) =>
        {
            // It's okay to call resolve/reject multiple times in a promise.
            const callbacks = {
                resolve: function()
                {
                    // Make sure this object always stays in the queue
                    // until callbacks.reject() (which is resolve) is called.
                    this._receiveCallbacksQueue.push(callbacks);
                },

                reject: resolve
            };

            this._receiveCallbacksQueue.push(callbacks);
            // After this, we will imminently get a close event.
            // Therefore, this promise will resolve.
            this._socket.close(code, reason);
        });
    }


    // Sets up the event listeners, which do the bulk of the work.
    private _setupListenersOnConnect(): Promise<void> 
    {
        const socket = this._socket;

        return new Promise((resolve, reject) =>
        {

            const handleMessage: EventListener = function (event: MessageEvent)
            {
                if (this._receiveCallbacksQueue.length !== 0)
                {
                    this._receiveCallbacksQueue.shift().resolve(event.data);
                    return;
                }

                this._receiveDataQueue.push(event.data);
            };

            const handleOpen: EventListener = function (event)
            {
                socket.addEventListener('message', handleMessage);
                //socket.addEventListener('close', function (event: CloseEvent)
                //{
                //    this._closeEvent = event;

                //    // Whenever a close event fires, the socket is effectively dead.
                //    // It's impossible for more messages to arrive.
                //    // If there are any promises waiting for messages, reject them.
                //    while (this._receiveCallbacksQueue.length !== 0)
                //    {
                //        this._receiveCallbacksQueue.shift().reject(this._closeEvent);
                //    }
                //});
                resolve();
            };

            socket.addEventListener('error', reject);
            socket.addEventListener('open', handleOpen);
        });
    }


    private _reset()
    {
        this._receiveDataQueue = [];
        this._receiveCallbacksQueue = [];
        this._closeEvent = null;
    }

}
