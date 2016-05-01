
import {EventEmitter} from 'angular2/core';

export class SocketService {
  settingsChanged: EventEmitter = new EventEmitter();
  statusChanged: EventEmitter = new EventEmitter();
  imageChanged: EventEmitter = new EventEmitter();
  messagesChanged: EventEmitter = new EventEmitter();

  status = {};
  settings: any = {};
  messages: any = [];
  private host = window.document.location.host.replace(/:.*/, '');
  private ws:any;

  host = "52.51.75.200";

  connect(): void {
    this.ws = new WebSocket('ws://' + this.host + ':8080');
    console.log('CONNECTIng');


    this.ws.onopen = (event:Event) => {
      this.ws.onmessage = (event) => {
        this.onmessage(event);
      };
      this.ws.send(JSON.stringify({topic: 'TEST',type: 'CLIENT', action: 'SUBSCRIBE'}));
    };
  }
  getSettings(): any {
    return this.settings;
  }
  getStatus(): any {
    return this.status;
  }
  sendSettings(settings): void {
    var message: any= {};
    Object.assign(message, settings);
    message.topic = "TEST";
    message.action = "SETTINGS";
    console.log("Sending settings");
    console.log(JSON.stringify(message));
    this.ws.send(JSON.stringify(message));
  }

  onmessage(event): void {
    var data = JSON.parse(event.data);
    if (data.action === 'STATUS') {
      Object.assign(this.status, data);
      console.log('NEW STATUS');
      console.log(this.status);
      this.statusChanged.next(this.status);

    }
    if (data.action === 'SETTINGS') {
      Object.assign(this.settings, data);
      this.settingsChanged.next(this.status);

      console.log('NEW SETTINGS');
      console.log(this.settings);

    }
    if (data.action === 'MESSAGE') {
      this.messages.unshift(data.message);
      if (this.messages.length > 10) {
        this.messages.splice(this.messages.length - 1,1);
      }
      this.messagesChanged.next(data.image);
    }
    if (data.action === 'IMAGE') {
      this.imageChanged.next(data.image);
    }
  }
  constructor() {
    console.log('Socket service');
    this.connect();
  }
}


