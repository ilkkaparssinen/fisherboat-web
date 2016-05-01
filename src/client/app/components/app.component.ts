import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {VideoComponent} from '../shared/components/video.component';

import {SocketService} from '../shared/index';
import {HomeComponent} from '../home/index';
import {AboutComponent} from '../about/index';
import {SettingsComponent} from '../settings/index';


@Component({
  selector: 'sd-app',
  viewProviders: [SocketService],
  templateUrl: 'app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES,NavbarComponent, ToolbarComponent]
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
  }
])
export class AppComponent {}
