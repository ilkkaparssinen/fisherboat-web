import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {SocketService} from '../../shared/index';

@Component({
  selector: 'sd-video',
  templateUrl: 'app/home/components/photo.component.html',
  styleUrls: ['app/home/components/photo.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class PhotoComponent implements OnInit {
  photo: any = null;
  constructor(public socketService: SocketService) {
    this.socketService = socketService;
  }
  public ngOnInit(): any {
    this.photo = this.socketService.getPhoto();
    this.changeImage();
  }

  changeImage() {
   console.log("DRAW");
    var canvas: any = document.getElementById('fullphoto');
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    imageObj.src = 'data:image/jpeg;base64,'+ this.photo;
    imageObj.onload = function(){
      context.height = rect.height ;
      context.width = rect.width;
      context.drawImage(imageObj,0,0,context.width,context.height);
    }
  }

  savePhoto() {
      var imageObj = new Image();
      imageObj.src = 'data:image/jpeg;base64,'+ this.photo;
      window.location.href = imageObj.src.replace('image/jpeg', 'image/octet-stream');
  }
}
