import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    
    @Input('imgUrl') imgUrl : string;
    @Input('name') name : string;
    @Input('description') description : string;
    

  constructor() { }

  ngOnInit() {
      console.log(this.imgUrl);
  }

}
