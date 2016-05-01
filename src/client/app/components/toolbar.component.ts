import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {SocketService} from '../shared/index';

@Component({
  selector: 'sd-toolbar',
  templateUrl: 'app/components/toolbar.component.html',
  styleUrls: ['app/components/toolbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ToolbarComponent   {
  chat: any = {message: "", id: ""};

  checkChat() {
    console.log("Check chat");
    console.log(this.chat.message);
    console.log(this.chat.id);
    console.log(this.chat.id);
    if (this.chat.message > "") this.socketService.sendChat(this.chat);
    this.chat.message = "";
    this.chat.id = this.guidGenerator();
  }
  constructor(public socketService: SocketService) {
    this.socketService = socketService;
    this.chat.id = this.guidGenerator();
    console.log(this.chat.id);
  }

  sendChat() {
    var send: any;
    Object.assign(send,this.chat);
    this.socketService.sendChat(send);
  }
  guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
}
