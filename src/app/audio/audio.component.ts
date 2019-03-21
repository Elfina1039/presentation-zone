import { Component, AfterViewInit, OnChanges, ViewChild, Input } from '@angular/core';

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
     @Input("commentUrl") commentUrl: string;

  constructor() { }

  ngAfterViewInit() {
      if(this.songUrl){
          this.song.nativeElement.src=this.songUrl;
          this.song.nativeElement.load();
          this.music.nativeElement.play();
      }
  }
    
     ngOnChanges() {
          console.log("PLAY");
      if(this.songUrl){
          this.music.nativeElement.load();
          this.music.nativeElement.play();
      }
  }

}
