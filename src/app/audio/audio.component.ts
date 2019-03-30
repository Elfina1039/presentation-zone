import { Component, AfterViewInit, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements AfterViewInit {
     @ViewChild("music") music;
     @ViewChild("song") song;
     @ViewChild("voice") voice;
     @ViewChild("comment") comment;
    
    @Input("songUrl") songUrl: string;
    @Input("playing") playing: boolean;
     @Input("commentUrl") commentUrl: string;
    
     @Output() canPlay = new EventEmitter<string>();

  constructor() {}


  ngAfterViewInit() {
      let ref=this;
    this.music.nativeElement.oncanplay = function() {
    ref.canPlay.emit("ready");
};
  
      
      if(this.songUrl && this.playing){
          this.song.nativeElement.src=this.songUrl;
          this.song.nativeElement.load();
          this.music.nativeElement.play();
      }
  }
    
     ngOnChanges() {
          console.log("PLAY");
      if(this.songUrl && this.playing){
          this.music.nativeElement.load();
          this.music.nativeElement.play();
      }
  }

}
