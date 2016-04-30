import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {SocketService} from '../../shared/index';

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
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})
export class StatusComponent {
  status = {latitude: 62.0, longitude: 20.0};
  settings = {};
  markers: Marker[] = [{lat: 62.0, lng: 20.0}];
  subscription: any;


    gapi = 'AIzaSyArY1fN3uUqsbNILQmjdVERZk7XmTv1mZI';
  constructor(public socketService: SocketService) {
        console.log('Home component');
        console.log(socketService);

        this.status = socketService.getStatus();
        this.settings = socketService.getSettings();
      this.subscription = socketService.statusChanged.subscribe((data) => {
          console.log("I'm the parent cmp and I got this data");
          this.onStatusChanged();
      });
  }

  onStatusChanged():void {
    if (!this) return;

      if (!this.status['longitude']) return;
        this.markers.push({lat: this.status['latitude'],
          lng: this.status['longitude'], draggable: false
    });
    console.log('Markers');
    console.log(this.markers);
  }
}

