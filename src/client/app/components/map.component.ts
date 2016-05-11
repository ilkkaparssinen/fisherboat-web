import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {SocketService} from '../shared/index';

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
    iconUrl: string;
}


@Component({
  selector: 'sd-map',
  templateUrl: 'app/components/map.component.html',
  styleUrls: ['app/components/map.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES,ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})
export class MapComponent {
  status = {latitude: 62.0, longitude: 20.0, speed: 0.0};
  mapsettings = {zoom: 17};
  calcspeed = 0;
  markers: Marker[] = [{lat: 62.0, lng: 20.0, draggable: false, iconUrl: ''}];

  constructor(public socketService: SocketService) {
        this.status = socketService.getStatus();
      socketService.statusChanged.subscribe((data) => {
          this.onStatusChanged();
      });
  }

  onStatusChanged():void {
    if (!this) return;

      if (!this.status['longitude']) return;
      // Take markers out
      if (this.markers.length > 20) {
          this.markers.splice(this.markers.length - 1,1);
      }

      this.markers.unshift({lat: this.status['latitude'],
          lng: this.status['longitude'], draggable: false,
          iconUrl: 'assets/png/ship.png'
        });
      var dirimage: any = document.getElementById('directionarrow');
      dirimage.style.transform='rotate(' + this.status["track"] + 'deg)';
      var speedtext: any = document.getElementById('speedtext');
      this.calcspeed = Math.round(this.status['speed'] * 36) / 10.0;

    //  speedtext.style.transform='rotate(' + this.status["track"] + 'deg)';

  }
}

