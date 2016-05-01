import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {SocketService} from '../../shared/index';
import {MapComponent} from '../../components/map.component';

import {
    MapsAPILoader,
    NoOpMapsAPILoader,
    MouseEvent,
    ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    ANGULAR2_GOOGLE_MAPS_DIRECTIVES
} from 'angular2-google-maps/core';

// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

@Component({
  selector: 'sd-home',
  templateUrl: 'app/status/components/status.component.html',
  styleUrls: ['app/status/components/status.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_DIRECTIVES,MapComponent]
})
export class StatusComponent {
  settings = {};
  subscription: any;
  constructor(public socketService: SocketService) {
      console.log('Status component');
      this.settings = socketService.getSettings();
      this.subscription = socketService.statusChanged.subscribe((data) => {
          console.log("I'm the parent cmp and I got this data");
          this.onStatusChanged();
      });
  }

  onStatusChanged():void {
    if (!this) return;
  }
}

