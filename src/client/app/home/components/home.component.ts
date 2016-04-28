import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {SocketService} from '../../shared/index';

import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/home/components/home.component.html',
  styleUrls: ['app/home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES]
})
export class HomeComponent {
  newName: string;
  isSelectOpen: boolean = false;
  status = {};
  settings = {
    speed_change_cycle:  5,
    speed_motors_full_percent: 100,
    low_speed_percent:  100,
    speed: 0.2,
    turn: 0.0
  };

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    console.log("NGONCHANGES");
    socketService.sendSettings(this.settings);
    if (changes['fontSize']) { // fire your event }
    }
  }

  constructor(public socketService: SocketService) {
    console.log('Home component');
    console.log(socketService);
    this.status = socketService.getStatus();
    this.settings = socketService.getSettings();
  }

  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  setVarying(): boolean {
    this.settings.speed_change_cycle = 8;
    this.settings.low_speed_percent = 50;
    this.settings.speed_motors_full_percent = 50;
    return false;
  }
  setStationary(): boolean {
    this.settings.speed = 0;
    this.settings.low_speed_percent = 100;
    this.settings.speed_motors_full_percent = 100;
    return false;
  }

  setJigging(): boolean {
    this.settings.speed_change_cycle = 8;
    this.settings.low_speed_percent = 0;
    this.settings.speed_motors_full_percent = 50;
    return false;
  }

  setNormal(): boolean {
    this.settings.speed_change_cycle = 8;
    this.settings.low_speed_percent = 100;
    this.settings.speed_motors_full_percent = 100;
    return false;
  }

}
