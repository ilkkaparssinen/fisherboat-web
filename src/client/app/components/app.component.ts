import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
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
  }
}
