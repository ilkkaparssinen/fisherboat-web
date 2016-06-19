import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Location} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {SocketService} from '../shared/index';
import {HomeComponent} from '../home/index';
import {PhotoComponent} from '../home/index';
import {AboutComponent} from '../about/index';
import {SettingsComponent} from '../settings/index';


@Component({
  selector: 'sd-app',
  viewProviders: [SocketService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES,NavbarComponent, ToolbarComponent, HomeComponent, PhotoComponent]
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/about',
    name: 'About',
    component: AboutComponent
  }, {
    path: '/settings',
    name: 'Settings',
    component: SettingsComponent
  },
    {
      path: '/photo',
      name: 'Photo',
      component: PhotoComponent
    }
])
export class AppComponent implements OnInit {

  constructor(public socketService: SocketService, public location: Location) {
    this.location = location;
    this.socketService = socketService;
  }
  // Just making svg backgrounds
  public ngOnInit(): any
  {
    var svg = document.getElementsByTagName('svg')[0];

// Convert the SVG node to HTML.
    var div = document.createElement('div');
    div.appendChild(svg.cloneNode(true));

// Encode the SVG as base64
    var b64 = 'data:image/svg+xml;base64,'+window.btoa(div.innerHTML);
    var url = 'url("' + b64 + '")';
    var demo = document.getElementsByTagName('body')[0];
    demo.style.backgroundImage = url;

    this.socketService.topic = "TEST";
    console.log("START");
    console.log(this.location.path());
    var params = this.location.path().split('?');
    if (params.length >= 2) {
      var query = params[1].split("&");
      for (var i = 0; i < query.length;i++) {
        var param = query[i].split("=");
        if (param[0] == "boat" && param.length == 2) {
          this.socketService.topic = param[1]; // GOT BOAT PARAMETEr
          console.log("BOAT:" + param[1]);
        }
      }
    }
  }
}
