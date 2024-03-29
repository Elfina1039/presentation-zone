import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

import { Islide } from '../interfaces/Islide';
import { Zone, Region, Icon, Slide, Poster, Cover} from '../classes/zone';
import { ImgData} from '../interfaces/img-data';
import { ZoneCategory } from '../interfaces/zone-category';

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
    imgData: any;
    imgUrl: string;
    songUrl:string;
    commentUrl:string;
    name: string;
    zoneCategories: ZoneCategory[];
    mode : string;
    
  constructor(protected _activatedRoute: ActivatedRoute, protected _dataService: DataService) { 
  this.zones=[];
      this.zoneCategories=[];
this.mode="interaction";
  }


  ngOnInit() {
    console.log("route at component: "+this._activatedRoute.snapshot.params['map']);
      console.log("selected zone: "+this._activatedRoute.snapshot.params['zone']);
      let map=this._activatedRoute.snapshot.params['map'];
      let zone=this._activatedRoute.snapshot.params['zone'];
      let ref=this;
    this._dataService.fetchJson(map).subscribe(function(data){
        console.log(data);
       let imgData=data["imgData"];
        ref.imgData=imgData;
        console.log(ref.imgData);
      ref.zones=ref.processIcons(data);
        console.log(ref.zones);
   
      let catList=ref.zones.map((zone)=>zone.category);
     // this.cats=new Set(catList);
      if(zone){
          ref.displayClicked(this.zones[zone]);
      }    
        
        
        
    });
       // let id=<string>this._activatedRoute.snapshot.params['zid'];
  
      
      
  }
    
displayClicked(e){
    console.log("clicked");
    console.log(e);
    this.name=e.word;
    this.description=e.description;
    this.imgUrl=e.image;
    if(e.music){
       this.songUrl="assets/audio/music/"+e.music; 
    }
    
    //if(e.fields.comment.value){
    //   this.commentUrl="assets/audio/voice/"+e.fields.voice.value; 
    //}
    
    this.soundLoaded.emit(this.songUrl);
}
    
       processIcons(slideSet){
        let ref=this;
        var result = [];
         let categories = {};
           
        slideSet.slides.forEach(function(slide){
            console.log("PROCESSING "+ slide.word);
            let newZone;
            switch(slide.cat){
                case "Stavby" : newZone= new Icon(slide); break;
                case "Flora" : newZone= new Region(slide); break;
                case "Území" : newZone= new Region(slide); break;
                 case "Mrak" : newZone= new Cover(slide); break;
                case "Město" : newZone= new Icon(slide); break;
                case "Postavy" : newZone= new Icon(slide); break;
                case "Poster" : newZone= new Poster(slide); break;
               // case "Prechod" : newZone= new Curtain(slide); break;
            }
            
            if(!categories[slide.cat]){
               categories[slide.cat] = {name: slide.cat, zoneCount:0, selected:true}; 
            }
            categories[slide.cat].zoneCount++;
            
            result.push(newZone);
            console.log(result);
        });
           
           for(let c in categories){
               this.zoneCategories.push(categories[c]);
           }
           
        return result;
    }

}
