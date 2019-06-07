import { Component, OnInit, ViewChild } from '@angular/core';
import { InteractionComponent } from '../interaction/interaction.component';

import { DataService } from '../services/data.service';
import { Zone, Slide, Curtain } from '../classes/zone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent extends InteractionComponent{
    presentation : any[];
    slides : Slide[];
    currentSlide : number;
    startTime : number;
    slideDuration : number;
    playing : boolean;
    setsData : any[];
    @ViewChild("playButton") playButton;
    
    
  constructor(_activatedRoute: ActivatedRoute, _dataService: DataService) {
  super(_activatedRoute, _dataService);
      this.mode="presentation";
      this.slides = [];
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
        
        ref.setsData = data["sets"];
        
        data["sets"].forEach(function(set){
            console.log("making slide");
            
           // set.duration = 3000;
            
            if(set.type!="curtain"){
                 let zones = ref.presentation.filter((z)=>z.word==set.name);
            //set.zones = zones;
            ref.slides.push(new Slide(set, zones));
            }else{
                let zones = [];
              //  set.zones = zones;
                ref.slides.push(new Curtain(set, zones));
                
            }
           
            
            
        });
        
        ref.currentSlide=0;
         //ref.nextSlide(0);
           if(ref.slides[0].music){
         console.log("PLAYING MUSIC");
       ref.songUrl="assets/audio/music/"+ref.slides[ref.currentSlide].music; 
    }
   
        
    });
       // let id=<string>this._activatedRoute.snapshot.params['zid'];

  }
    
nextSlide(no){
    
    
    
    let now = Date.now();
    
    if(this.setsData[this.currentSlide-1]){
        this.setsData[this.currentSlide-1].duration = now-this.startTime;
       // console.log("TIMING ("+this.currentSlide-1+"): " + this.setsData[this.currentSlide-1].duration );
       // console.log(this.setsData[this.currentSlide-1]);
    }
  //  console.log(JSON.stringify(this.setsData));  
    
    this.startTime = now;
    console.log("DISPLAYING SLIDE "+this.currentSlide);
    console.log(this.slides[this.currentSlide]);
    
    if(this.setsData[this.currentSlide].newImage){
        console.log("NEW IMAGE!");
        this.imgData = this.setsData[this.currentSlide].newImage;
    }
    
    
    let duration=this.slides[this.currentSlide].duration;
     this.zones=this.slides[this.currentSlide].zones;
  //  this.displayClicked(this.zones[0]);
    
  this.slideDuration = duration-200;
     setTimeout(function(){ref.nextSlide(no)}, duration); 
    
    //if(e.fields.comment.value){
    //   this.commentUrl="assets/audio/voice/"+e.fields.voice.value; 
    //}
    
   // this.soundLoaded.emit(this.songUrl);
    
    this.currentSlide++;
    no++;
    let ref=this;
    console.log("NEXT "+this.currentSlide);

//console.log(JSON.stringify(this.setsData));    
         
    }
    
    disPlay(){
        this.playButton.nativeElement.style.visibility="visible";
        
       // this.nextSlide(0);
        
    }
    
    
}    
    
    

