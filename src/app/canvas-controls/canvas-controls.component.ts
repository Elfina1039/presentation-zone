import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ZoneCategory } from '../interfaces/zone-category';


@Component({
  selector: 'app-canvas-controls',
  templateUrl: './canvas-controls.component.html',
  styleUrls: ['./canvas-controls.component.css']
})
export class CanvasControlsComponent implements OnInit {

    @Output() changeZoom = new EventEmitter<number>(); 
     @Input("zoom") zoom : number;
     @Input("zoneCategories") zoneCategories : number;
    
  constructor() { }

  ngOnInit() {
  }
    
    zoomChng(value){
        this.changeZoom.emit(value);
        
    }

}
