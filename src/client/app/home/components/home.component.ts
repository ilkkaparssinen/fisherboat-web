import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {SocketService} from '../../shared/index';

import {VideoComponent} from '../../components/video.component';
import {MapComponent} from '../../components/map.component';

import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/home/components/home.component.html',
  styleUrls: ['app/home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES, VideoComponent, MapComponent]
})

export class HomeComponent  {
  newName: string;
  isSelectOpen: boolean = false;

  canvas: any;
  context:any;
  status = {};
  settings = {
    speed_change_cycle:  5,
    speed_motors_full_percent: 100,
    low_speed_percent:  100,
    speed: 0.2,
    turn: 0.0
  };
  messages: any;

  constructor(public socketService: SocketService) {
    console.log('Home component');
    console.log(socketService);
    this.status = socketService.getStatus();
    this.socketService = socketService;
    this.settings = socketService.getSettings();
    this.messages = socketService.getMessages();
  }

  changeSettings(event: any) {
    console.log("CHANGING SETTINGS BY USER");
    this.socketService.sendSettings(this.settings);
  }

}
