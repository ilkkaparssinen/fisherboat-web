
import {EventEmitter} from 'angular2/core';

export class SocketService {
  settingsChanged: EventEmitter = new EventEmitter();
  statusChanged: EventEmitter = new EventEmitter();

  status = {};
  settings: any = {};
  private host = window.document.location.host.replace(/:.*/, '');
  private ws:any;


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
    this.ws.send(JSON.stringify(message));
  }

  onmessage(event): void {
    console.log(event);
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
  }
  constructor() {
    console.log('Socket service');
    this.connect();
  }
}


