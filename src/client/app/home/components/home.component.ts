import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, RouteConfig,Router} from 'angular2/router';

import {SocketService} from '../../shared/index';
import {ChatComponent} from './chat.component';
import {SliderComponent} from '../../components/slider.component';
import {VideoComponent} from '../../components/video.component';
import {MapComponent} from '../../components/map.component';

import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/home/components/home.component.html',
  styleUrls: ['app/home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES, VideoComponent, MapComponent,ChatComponent,SliderComponent]
})



export class HomeComponent  {
  newName: string;
  isSelectOpen: boolean = false;
  myid:string = "";
  canvas: any;
  context:any;
  status = {};
  router: Router;

  settings = {
    speed_change_cycle:  5,
    speed_motors_full_percent: 100,
    low_speed_percent:  100,
    speed: 0.2,
    turn: 0.0
  };

  constructor(public socketService: SocketService,_router: Router) {
    this.status = socketService.getStatus();
    this.socketService = socketService;
    this.settings = socketService.getSettings();
    this.myid = socketService.myid;
    this.router = _router;
    this.socketService.photoReceived.subscribe(image => this.showPhoto(image));
  }

  showPhoto(image) {
    this.router.navigate(['Photo']);

  }
  changeSettings(event: any) {
    this.socketService.sendSettings(this.settings);
    // Short script to encode our SVG in base64
// This can be reversed using window.atob('base64')


  }


}
