
import {EventEmitter} from 'angular2/core';

export class SocketService {
  settingsChanged: EventEmitter = new EventEmitter();
  statusChanged: EventEmitter = new EventEmitter();
  imageChanged: EventEmitter = new EventEmitter();
  photoReceived: EventEmitter = new EventEmitter();
  messagesChanged: EventEmitter = new EventEmitter();
  myid: string = "";
  status = {};
  settings: any = {};
  messages: any = [];
  photo: any = "";
  private online: bool = false;
  private host = window.document.location.host.replace(/:.*/, '');
  private ws:any;

  host = "52.51.75.200";

  connect(): void {
    this.ws = new WebSocket('ws://' + this.host + ':8080');

    this.ws.onopen = (event:Event) => {

      this.online = true;
      this.ws.onmessage = (event) => {
        this.onmessage(event);
      };
      this.ws.onclose = (event) => {
        this.online = false;
        this.reconnect();
      };
      this.ws.send(JSON.stringify({topic: 'TEST',type: 'CLIENT', action: 'SUBSCRIBE'}));
      this.sendChat({message: "Somebody started a web client", id: ""});
    };
  }
  reconnect(){
    if (!this.online) {
      setTimeout(() => this.reconnect()
      , 5000);
    }
    if (!this.online) this.connect();

  }

  getSettings(): any {
    return this.settings;
  }
  getStatus(): any {
    return this.status;
  }
  getMessages(): any {
    return this.messages;
  }
  sendSettings(settings): void {
    var message: any= {};
    Object.assign(message, settings);
    message.topic = "TEST";
    message.action = "SETTINGS";
    this.ws.send(JSON.stringify(message));
  }

  sendChat(chat): void {
    var message: any= {};
    message.topic = "TEST";
    message.action = "MESSAGE";
    message.message = chat.message;
    message.who = this.myid;
    message.id = chat.id;
    this.ws.send(JSON.stringify(message));
  }
  requestPhoto(): void {
    var message: any= {};
    message.topic = "TEST";
    message.action = "TAKEPHOTO";
    message.who = this.myid;
    this.ws.send(JSON.stringify(message));
  }
  getPhoto(): any {
    return this.photo;
  }
  onmessage(event): void {
    var data = JSON.parse(event.data);

    if (data.action === 'STATUS') {
      Object.assign(this.status, data);
      this.statusChanged.next(this.status);

    }
    if (data.action === 'SETTINGS') {
      Object.assign(this.settings, data);
      this.settingsChanged.next(this.status);


    }
    if (data.action === 'PHOTO') {
      this.photo =  data.image;
      this.photoReceived.next(data.image);
    }
    if (data.action === 'MESSAGE') {
      if (!data.who) data.who = "";
      if (data.id && data.id > "") {
        let found = false;
        // Update existing data
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === data.id) {
            this.messages[i].message = data.message;
            found = true;

            break;
          }
        }
        if (!found)  {
          this.messages.unshift({message: data.message, id: data.id, who: data.who});
        }
      } else {
        this.messages.unshift({message: data.message, id: "", who: data.who});
      }

      if (this.messages.length > 20) {
        this.messages.splice(this.messages.length - 1,1);
      }
      this.messagesChanged.next(data.image);
    }
    if (data.action === 'IMAGE') {
      this.imageChanged.next(data.image);
    }
  }
  constructor() {
    this.reconnect();
    this.myid = this.guidGenerator();
  }
  guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

}


