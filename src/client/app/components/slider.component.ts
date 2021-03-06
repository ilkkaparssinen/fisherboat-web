/* AWful hack to try to make a slider that works nicely (browser native slider in iOS is way too small) */


import {Component,EventEmitter, Input,Output, ElementRef} from 'angular2/core';
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
  private _elementid: any;
  myvertical: boolean = false;
  @Input() set min (value) {
    this._min = parseFloat(value);
  }
  @Input() set max (value) {
    this._max = parseFloat(value);
  }
  @Input() set vertical (value) {
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
  @Output() modified = new EventEmitter();

  onTouched: any;
  mousedown = 0;


  constructor(myElement: ElementRef,private cd: NgControl) {
    this._elementid = myElement.nativeElement.id;
    cd.valueAccessor = this;
  }

  x:number = 0;
  private width:number = 300;
  constructor() {
    // this.setPlace();
  }

  touchEvent(evt) {
    evt.preventDefault();
    var touch = evt.changedTouches[0];
    if (touch) this.mouseEvent(touch); // Touch has the needed clientX and ClientY properties
  }
  mouseEvent(event) {
    var positionInfo;
    var slider;
    var offset;


    slider = document.getElementById(this._elementid).firstElementChild;
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = slider.getBoundingClientRect();


    if (this.myvertical) {
      offset = elemRect.top - bodyRect.top;
      offset = event.clientY - offset;
      this.width = elemRect.height - 15;
      offset = this.width - offset;

    } else {
      offset = elemRect.left - bodyRect.left;
      offset = event.clientX - offset;
      this.width = elemRect.width - 15;
    }
    this.offsetCount(offset);
    this.modified.emit(this._value);
  }

  onMouseDown(event) {
    this.mousedown = 1;
  }
  onMouseUp (event) {
    this.mousedown = 0;
  }

  mousemoveEvent(event) {
    if (this.mousedown != 1) return;
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
