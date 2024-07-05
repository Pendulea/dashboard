import { API_ROUTE } from "../constants";

const RPC_URL = `ws://${API_ROUTE}`;
const HTTP_URL = `http://${API_ROUTE}`;
const WS_RECONNECT_INTERVAL = 2000

interface IRequest {
    id: string;
    method: string;
    payload: { [key: string]: any };
}

interface IResponse {
    id: string;
    data: { [key: string]: any };
    error?: string;
}

class Service {
    private _service: WebSocket | null = null;
    private _reconnectTimeout: number | null = null;
    private _requests: Map<string, [(value: { [key: string]: any }) => void, (reason?: any) => void]> = new Map();
    private _reconnect: boolean = true;
    private _connected: boolean = false;

    constructor() {
        this.connect();
    }

    private waitForConnected = async (): Promise<void> => {
        while (!this._connected) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    public downloadArchive = async (buildID: string, onProgress: (percentage: number) => void): Promise<void> => {
        try {
            const response = await fetch(HTTP_URL + '/download/' + buildID + '.zip', { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.statusText}`);
            }
    
            const contentLength = response.headers.get('Content-Length');
            if (!contentLength) {
                throw new Error('Content-Length header is missing');
            }
    
            const totalSize = parseInt(contentLength, 10);
            let loaded = 0;
    
            const reader = response.body?.getReader();
            let prevPercentage = -1
            const stream = new ReadableStream({
                start(controller) {
                    function push() {
                        reader?.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            loaded += value.byteLength;
                            const percentage = Math.ceil((loaded / totalSize) * 100)
                            if (percentage < 100 && percentage != prevPercentage) {
                                onProgress(percentage)
                                prevPercentage = percentage
                            }
                            controller.enqueue(value);
                            push();
                        }).catch(error => {
                            controller.error(error);
                        });
                    }
                    push();
                }
            });
    
            const newResponse = new Response(stream);
            const blob = await newResponse.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = buildID + '.zip';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(downloadUrl);
                document.body.removeChild(a);
            }, 0);
            setTimeout(() => {
                onProgress(100);
            }, 1000)
        } catch (error: any) {
            alert('Failed to download the file: ' + error.toString());
        }
    }
    

    public request = async (type: string, payload: { [key: string]: any }): Promise<{ [key: string]: any }> => {
        if (!this._service) {
            throw new Error('Service not connected');
        }

        await this.waitForConnected();
        const id = Math.random().toString(36).substring(2);
        const promise = new Promise<{ [key: string]: any }>((resolve, reject) => {
            this._requests.set(id, [resolve, reject]);
        });

        const request: IRequest = {
            id: id,
            method: type,
            payload
        };
        this._service.send(JSON.stringify(request));
        return promise;
    }

    private _handleResponse = (message: string): void => {
        try {
            const json: IResponse = JSON.parse(message);
            const [resolve, reject] = this._requests.get(json.id) || [];
            if (!resolve || !reject) {
                return;
            }
            if (json.error) {
                reject(new Error(json.error));
            } else {
                resolve(json.data);
            }
            this._requests.delete(json.id);
        } catch (error) {
            console.error('Failed to process message:', error);
        }
    }

    public stop = (): void => {
        this._reconnect = false;
        if (this._service) {
            this._service.close();
        }
        this._service = null;
        if (this._reconnectTimeout !== null) {
            clearTimeout(this._reconnectTimeout);
        }
    }

    private connect = (): void => {
        if (this._service) {
            return;
        }

        this._service = new WebSocket(RPC_URL);

        this._service.onopen = () => {
            console.log('Connection with parser is open');
            this._connected = true;
        };

        this._service.onerror = (error: Event) => {
            console.error('Connection with parser encountered an error:', error);
        };

        this._service.onmessage = (event: MessageEvent) => {
            this._handleResponse(event.data.toString());
        };

        this._service.onclose = () => {
            this._connected = false;
            console.log('Connection with parser is closed');
            this._service = null;
            if (this._reconnect) {
                this._reconnectTimeout = window.setTimeout(this.connect, WS_RECONNECT_INTERVAL);
            }
        };
    }
}

export const service = new Service();