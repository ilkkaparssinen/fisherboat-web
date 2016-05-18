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
  private lastImage: any;
  constructor(public socketService: SocketService) {
    this.socketService = socketService;
    this.socketService.imageChanged.subscribe(image => this.changeImage(image));
  }
  public ngOnInit(): any {
    this.initImage();
  }
  initImage() {
    var canvas: any = document.getElementById('videostream');
    var container: any = document.getElementById('stream-container');

    var context = canvas.getContext('2d');
    var rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.width * 0.75;

    context.width = rect.width;
    context.height = rect.width * 0.75;

    var img = new Image;
    img.onload = function(){
      context.drawImage(img,0,0,context.width,context.height);

    };
    img.src = "/assets/png/videotest.png";
  }
  onResize(event) {
    if (!this.lastImage) this.initImage();
    else this.changeImage(this.lastImage);
  }
  requestPhoto(event) {
    console.log("Request photo");
    this.socketService.requestPhoto();
  }

  changeImage(image) {
    this.lastImage = image;
    var canvas: any = document.getElementById('videostream');
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = 'data:image/jpeg;base64,'+image;
    imageObj.onload = function(){
      context.height = rect.height ;
      context.width = rect.width;
      context.drawImage(imageObj,0,0,context.width,context.height);
    }
  }
}
