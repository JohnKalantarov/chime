interface PictureInPictureWindowEventMap {
	'resize': Event;
}


interface PictureInPictureWindow extends EventTarget {
	readonly height: number;
	onresize: ((this: PictureInPictureWindow, ev: Event) => any) | null;
	readonly width: number;
	addEventListener<K extends keyof PictureInPictureWindowEventMap>(type: K, listener: (this: PictureInPictureWindow, ev: PictureInPictureWindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener<K extends keyof PictureInPictureWindowEventMap>(type: K, listener: (this: PictureInPictureWindow, ev: PictureInPictureWindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var PictureInPictureWindow: {
	prototype: PictureInPictureWindow;
	new(): PictureInPictureWindow;
};

interface DocumentPictureInPicture extends Document {
	exitPictureInPicture(): Promise<void>;
}

interface HTMLCanvasElement {
		captureStream(frameRate?: number): MediaStream;
}

interface DocumentOrShadowRoot {
	readonly pictureInPictureElement: Element | null;
}

interface Document extends Node, DocumentAndElementEventHandlers, DocumentOrShadowRoot, GlobalEventHandlers, NonElementParentNode, ParentNode, XPathEvaluatorBase {
	exitPictureInPicture(): Promise<void>;
	readonly pictureInPictureEnabled: boolean;
}

interface HTMLVideoElement extends HTMLMediaElement {
	disablePictureInPicture: boolean;
	requestPictureInPicture(): Promise<PictureInPictureWindow>;
}

interface DisplayMediaStreamConstraints {
	audio?: boolean | MediaTrackConstraints;
	video?: boolean | MediaTrackConstraints;
}

interface MediaDevices extends EventTarget {
	ondevicechange: ((this: MediaDevices, ev: Event) => any) | null;
	enumerateDevices(): Promise<MediaDeviceInfo[]>;
	getDisplayMedia(constraints?: DisplayMediaStreamConstraints): Promise<MediaStream>;
	getSupportedConstraints(): MediaTrackSupportedConstraints;
	getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
	addEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener<K extends keyof MediaDevicesEventMap>(type: K, listener: (this: MediaDevices, ev: MediaDevicesEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare var MediaDevices: {
	prototype: MediaDevices;
	new(): MediaDevices;
};