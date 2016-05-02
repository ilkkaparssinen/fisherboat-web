import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {SocketService} from '../../shared/index';

@Component({
  selector: 'sd-chat',
  templateUrl: 'app/home/components/chat.component.html',
  styleUrls: ['app/home/components/chat.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class ChatComponent  {
  myid:string = "";
  messages: any;

  constructor(public socketService: SocketService) {
    console.log("CHAtCOMPONENT CONSTRUCTION");
    this.socketService = socketService;
    this.messages = socketService.getMessages();
    this.myid = socketService.myid;
  }
}
