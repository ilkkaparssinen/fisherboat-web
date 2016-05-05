import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {SocketService} from '../shared/index';

@Component({
  selector: 'sd-video',
  templateUrl: 'app/components/video.component.html',
  styleUrls: ['app/components/video.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class VideoComponent implements OnInit {

  constructor(public socketService: SocketService) {
    console.log("CONSTRUCTING VIDEO COMPONENT");
    this.socketService = socketService;
    this.socketService.imageChanged.subscribe(image => this.changeImage(image));
  }
  public ngOnInit(): any {
    this.initImage();
  }
  initImage() {
    var canvas: any = document.getElementById('videostream');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
      ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    img.src = "/assets/png/videotest.png";
  }

  changeImage(image) {
    var canvas: any = document.getElementById('videostream');
    if (!canvas) return;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = 'data:image/jpeg;base64,'+image;
    imageObj.onload = function(){
      context.height = imageObj.height * 2;
      context.width = imageObj.width * 2;
      context.drawImage(imageObj,0,0,context.width,context.height);
    }
  }
}
