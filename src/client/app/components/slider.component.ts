/* AWful hack to try to make a slider that works nicely (browser native slider in iOS is way too small) */


import {Component,EventEmitter, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,Validators,
    Control,
    ControlGroup,
    NgControl,
    ControlValueAccessor} from 'angular2/common';
import {SocketService} from '../shared/index';

@Component({
  selector: 'sd-slider',
  templateUrl: 'app/components/slider.component.html',
  styleUrls: ['app/components/slider.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})

export class SliderComponent implements ControlValueAccessor {
  private _disabled: boolean;
  private _value: number ;
  private _min: number ;
  private _max: number ;

  myvertical: boolean = false;
  @Input() set min (value) {
    this._min = parseFloat(value);
  }
  @Input() set max (value) {
    this._max = parseFloat(value);
  }
  @Input() set vertical (value) {
    console.log("LAKSJDLAKJSDLKASDLKJLJKASD");
    console.log(value);
    if (value == "true") this.myvertical = true;
  }
  @Input() set disabled(value) {
    this._disabled = value;
  }
  myvertical = false;
  get disabled() {
    return this._disabled;
  }

  onChange: EventEmitter<any> = new EventEmitter();
  onTouched: any;

  constructor(private cd: NgControl) {
    cd.valueAccessor = this;
  }

  x:number = 0;
  private width:number = 300;
  constructor() {
    // this.setPlace();
  }

  touchEvent(event) {
    this.mouseEvent(event);
  }
  mouseEvent(event) {
    var positionInfo;
    if (this.myvertical) {
      if (event.path[0].id === "slider2") {
        positionInfo = event.path[0].getBoundingClientRect();
        this.width = positionInfo.height - 30;
        this.offsetCount(this.width - event.offsetY);
      } else if (event.path[0].id === "sliderpointer2") {
        positionInfo = event.path[1].getBoundingClientRect();
        this.width = positionInfo.height - 30;
        this.offsetCount(this.width - event.offsetY - this.x);
      }
    } else {
      if (event.path[0].id === "slider") {
        positionInfo = event.path[0].getBoundingClientRect();
        this.width = positionInfo.width - 30;
        this.offsetCount(event.offsetX);
      } else if (event.path[0].id === "sliderpointer") {
        positionInfo = event.path[1].getBoundingClientRect();
        this.width = positionInfo.width - 30;
        this.offsetCount(event.offsetX + this.x);
      }
    }
  }
  mousemoveEvent(event) {
    if (event.buttons != 1) return;
    this.mouseEvent(event);
  }
  offsetCount(offsetX) {
     var diff: number = this._max - this._min;
    if (offsetX < 0) {
      this._value = this._min;
      this.setPlace();
      return;
    }
    if (offsetX > this.width) {
      this._value = this._max;
      this.setPlace();
      return;
    }
    // Implement step here. 2 decimals always is enough for me
    this._value = Math.round((this._min + (diff * offsetX / this.width)) * 100) / 100;

    this.setPlace();
  }
  setPlace() {
    var place = (this._value - this._min) / ( this._max - this._min); // Get a value from 0 - 1
    if (this.myvertical) place = 1 - place; // Bottom is 0 - top is 1

    this.x =  place * (this.width); // 15 = half of the size of pointer
    console.log(this.x);
    this.onChange.emit(this._value);
  }

  /**
   * ControlValueAccessor
   */
  writeValue(value: any) {
    this._value = value;
  }
  registerOnChange(fn): void {
    this.onChange.subscribe(fn);
  }
  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
  _reset() {

  }
}
