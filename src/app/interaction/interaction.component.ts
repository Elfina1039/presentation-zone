import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

import { Islide } from '../interfaces/Islide';
import { ImgData } from '../interfaces/img-data';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
    slide: any;
    zones: any;
    description: string;
    imgData: ImgData;
    imgUrl: string;
    name: string;
    cats: string[];
  constructor( private _activatedRoute: ActivatedRoute, private _dataService: DataService) { }

  ngOnInit() {
         console.log("route at component: "+this._activatedRoute.snapshot.params['zid']);
      let map=this._activatedRoute.snapshot.params['zid'];
       // let id=<string>this._activatedRoute.snapshot.params['zid'];
    this.zones=this._dataService.getSlides(map).slides;
      this.imgData=this._dataService.getImgData(map);
      let catList=this.zones.map((zone)=>zone.cat);
      this.cats=new Set(catList);
      console.log(this.cats);
      
      
      console.log(this.zones);
  }
    
displayClicked(e){
    this.name=e.word;
    this.description=e.fields.description.value;
    this.imgUrl="assets/images/"+e.fields.image.value;
}

}
