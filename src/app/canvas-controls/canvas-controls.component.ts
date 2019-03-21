import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canvas-controls',
  templateUrl: './canvas-controls.component.html',
  styleUrls: ['./canvas-controls.component.css']
})
export class CanvasControlsComponent implements OnInit {

    @Output() changeZoom = new EventEmitter<number>(); 
     @Input("zoom") zoom : number;
    
  constructor() { }

  ngOnInit() {
  }
    
    zoomChng(value){
        this.changeZoom.emit(value);
        
    }

}
