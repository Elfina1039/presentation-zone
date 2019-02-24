import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    @Output() soundLoaded = new EventEmitter<string>();
    slide: any;
    zones: any;
    description: string;
    imgData: ImgData;
    imgUrl: string;
    songUrl:string;
    commentUrl:string;
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
     // this.cats=new Set(catList);
      console.log(this.cats);
      
      
      console.log(this.zones);
  }
    
displayClicked(e){
    console.log("clicked");
    console.log(e);
    this.name=e.word;
    this.description=e.fields.description.value;
    this.imgUrl="assets/images/"+e.fields.image.value;
    if(e.fields.music.value){
       this.songUrl="assets/audio/music/"+e.fields.music.value; 
    }
    
    //if(e.fields.comment.value){
    //   this.commentUrl="assets/audio/voice/"+e.fields.voice.value; 
    //}
    
    this.soundLoaded.emit(this.songUrl);
}

}
