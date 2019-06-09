import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ZoneCategory } from '../interfaces/zone-category';


@Component({
  selector: 'app-canvas-controls',
  templateUrl: './canvas-controls.component.html',
  styleUrls: ['./canvas-controls.component.css']
})
export class CanvasControlsComponent implements OnInit {

    @Output() changeZoom = new EventEmitter<number>(); 
    @Output() changeSelection = new EventEmitter<any>(); 
     @Input("zoom") zoom : number;
     @Input("fitZoom") fitZoom : number;
     @Input("zoneCategories") zoneCategories : ZoneCategory[];
    
  constructor() { }

  ngOnInit() {
  }
    
    zoomChng(value){
        this.changeZoom.emit(value);
        
    }
    
    selectionChng(){
        
        let selected = {};
        this.zoneCategories.forEach((zc)=>selected[zc.name] = zc.selected);
        
        this.changeSelection.emit(selected);
        
    }

}
