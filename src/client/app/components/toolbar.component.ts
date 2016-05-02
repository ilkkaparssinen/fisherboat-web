import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {SocketService} from '../shared/index';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'sd-toolbar',
  templateUrl: 'app/components/toolbar.component.html',
  styleUrls: ['app/components/toolbar.component.css'],
  directives: [ROUTER_DIRECTIVES,DROPDOWN_DIRECTIVES]
})
export class ToolbarComponent   {
  chat: any = {message: "", id: ""};
  public status:{isopen:boolean} = {isopen: false};

  checkChat() {
    console.log("Check chat");
    console.log(this.chat.message);
    console.log(this.chat.id);
    console.log(this.chat.id);
    if (this.chat.message > "") this.socketService.sendChat(this.chat);
    this.chat.message = "";
    this.chat.id = this.socketService.guidGenerator();
  }
  constructor(public socketService: SocketService) {
    this.socketService = socketService;
    this.chat.id = this.socketService.guidGenerator();
    console.log(this.chat.id);
  }

  sendChat() {
    this.socketService.sendChat(this.chat);
  }
}
