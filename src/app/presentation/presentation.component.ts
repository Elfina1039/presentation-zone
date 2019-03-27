import { Component, OnInit } from '@angular/core';
import { InteractionComponent } from '../interaction/interaction.component';

import { DataService } from '../services/data.service';
import { Zone, Slide } from '../classes/zone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent extends InteractionComponent{
    presentation : any[];
    currentSlide : number;
  constructor(_activatedRoute: ActivatedRoute, _dataService: DataService) {
  super(_activatedRoute, _dataService);
      this.mode="presentation";
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
      ref.presentation=ref.processIcons(data);
        console.log(this.presentation);
        ref.currentSlide=0;
         ref.nextSlide(0);
   
        
        
        
    });
       // let id=<string>this._activatedRoute.snapshot.params['zid'];

  }
    
nextSlide(no){
    console.log("DISPLAYING SLIDE "+this.currentSlide);
    let duration=this.presentation[this.currentSlide].duration;
     this.zones=[this.presentation[this.currentSlide]];
    this.displayClicked(this.zones[0]);
    
    this.currentSlide++;
    no++;
    let ref=this;
    console.log("NEXT "+this.currentSlide);
    if(this.presentation[no])
       setTimeout(function(){ref.nextSlide(no)}, 6000); 
    }
    
    
}    
    
    

