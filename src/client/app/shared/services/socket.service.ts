
import {EventEmitter} from 'angular2/core';

export class SocketService {
  settingsChanged: EventEmitter = new EventEmitter();
  statusChanged: EventEmitter = new EventEmitter();
  imageChanged: EventEmitter = new EventEmitter();
  messagesChanged: EventEmitter = new EventEmitter();
  myid: string = "";
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
      this.sendChat({message: "Somebody started a web client", id: ""});
    };
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
    console.log("Sending settings");
    console.log(JSON.stringify(message));
    this.ws.send(JSON.stringify(message));
  }

  sendChat(chat): void {
    var message: any= {};
    message.topic = "TEST";
    message.action = "MESSAGE";
    message.message = chat.message;
    message.who = this.myid;
    message.id = chat.id;
    console.log("Sending chat message");
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
      if (!data.who) data.who = "";
      if (data.id && data.id > "") {
        let found = false;
        console.log(data.id);
        // Update existing data
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === data.id) {
            this.messages[i].message = data.message;
            found = true;
            console.log("FOUND");

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
      console.log(this.messages);
      this.messagesChanged.next(data.image);
    }
    if (data.action === 'IMAGE') {
      this.imageChanged.next(data.image);
    }
  }
  constructor() {
    console.log('Socket service');
    this.connect();
    this.myid = this.guidGenerator();
  }
  guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

}


