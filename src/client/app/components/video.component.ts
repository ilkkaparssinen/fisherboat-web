import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {SocketService} from '../shared/index';

@Component({
  selector: 'sd-video',
  templateUrl: 'app/components/video.component.html',
  styleUrls: ['app/components/video.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class VideoComponent  {

  constructor(public socketService: SocketService) {
    console.log("CONSTRUCTING VIDEO COMPONENT");
    this.socketService = socketService;
    this.socketService.imageChanged.subscribe(image => this.changeImage(image));
  }

  changeImage(image) {
    console.log("IMAGE CHANGED EVENT");
    var canvas: any = document.getElementById('videostream');
    if (!canvas) return;
    console.log("DRAW");
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = 'data:image/jpeg;base64,'+image;
    imageObj.onload = function(){
      context.height = imageObj.height;
      context.width = imageObj.width;
      context.drawImage(imageObj,0,0,context.width,context.height);
    }
  }
}
