import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnChanges {
    
    @Input('imgUrl') imgUrl : string;
    @Input('name') name : string;
    @Input('description') description : string;
    @Input('mapTitle') mapTitle : string;

  constructor() { }

  ngOnChanges() {
     
  }

}
