import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

import {SocketService} from '../../shared/index';
import {ChatComponent} from './chat.component';

import {VideoComponent} from '../../components/video.component';
import {MapComponent} from '../../components/map.component';

import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/home/components/home.component.html',
  styleUrls: ['app/home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, DROPDOWN_DIRECTIVES, VideoComponent, MapComponent,ChatComponent]
})

export class HomeComponent  implements OnInit {
  newName: string;
  isSelectOpen: boolean = false;
  myid:string = "";
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

  constructor(public socketService: SocketService) {
    console.log('Home component');
    console.log(socketService);
    this.status = socketService.getStatus();
    this.socketService = socketService;
    this.settings = socketService.getSettings();
    this.myid = socketService.myid;


  }
  // Just making svg backgrounds
  public ngOnInit(): any
  {
    console.log("NGONINIT");
    var demo = document.getElementById('chatbg');
    var svg = document.getElementsByTagName('svg')[0];

// Convert the SVG node to HTML.
    var div = document.createElement('div');
    div.appendChild(svg.cloneNode(true));

// Encode the SVG as base64
    var b64 = 'data:image/svg+xml;base64,'+window.btoa(div.innerHTML);
    var url = 'url("' + b64 + '")';
    console.log(b64);
    demo.style.backgroundImage = url;
    demo = document.getElementById('videobg');
    demo.style.backgroundImage = url;
  }
  changeSettings(event: any) {
    console.log("CHANGING SETTINGS BY USER");
    this.socketService.sendSettings(this.settings);
    // Short script to encode our SVG in base64
// This can be reversed using window.atob('base64')


  }


}
