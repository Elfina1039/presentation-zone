import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
@Input("cats") cats: string[];
    
  constructor() { }

  ngOnInit() {
  }

}
