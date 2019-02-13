import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DrawingSvc } from '../services/drawing.service';
import { ImgData } from '../interfaces/img-data';



@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
    providers:[DrawingSvc]
})
export class CanvasComponent implements OnInit, AfterViewInit {
    @ViewChild("msCanvas") canvas;
     @ViewChild("interactiveCanvas") interaction;
    @Input("zones") zones: any;
    @Input("imgData") imgData: ImgData;
    @Output() clicked = new EventEmitter<string>();
    drawing : DrawingSvc;
    title: string;
    bgImage: string;
    
    
    ctx: any;
    interCtx: any;
    

  constructor (private _drawingSvc : DrawingSvc) { 
   
  }
    

ngOnInit() {

  }    
    

 ngAfterViewInit() {
     this.bgImage="assets/images/"+this.imgData.url;
     
    this.canvas.nativeElement.style.width=this.imgData.width;
    this.canvas.nativeElement.style.height=this.imgData.height;
     
     this.interaction.nativeElement.style.width=this.imgData.width;
    this.interaction.nativeElement.style.height=this.imgData.height;
     
    this.ctx=this.canvas.nativeElement.getContext("2d");
      this.interCtx=this.interaction.nativeElement.getContext("2d");
   this.canvas.nativeElement.style.backgroundImage="url("+this.bgImage+")";
    this.zones.forEach((zone)=>{
        
        if(zone.fields.icon.value){
           zone.points= this._drawingSvc.drawImage(this.ctx, zone.shape, zone.fields.icon.value);
        }else{
            zone.points=this._drawingSvc.drawPolygon(this.ctx,zone.shape,zone.cat);
        }
        
        
    });
    
  }
    
   
    
 locatePolygon(mouse, ctx, display) {
  let rZone;
  this.zones.forEach(function(zone, zid) {

    let points = zone.points;

    ctx.beginPath();
    ctx.moveTo(parseInt(points[0].x), parseInt(points[0].y));

    //console.log(zone.WORD["#text"]+"="+points[0].x+":"+ points[0].y);

    for (let p = 1; p < points.length; p++) {
      //  console.log(zone);
      ctx.lineTo(parseInt(points[p].x), parseInt(points[p].y));

      //console.log(points[p].x+":"+ points[p].y);
    }

    ctx.closePath();

    if (ctx.isPointInPath(mouse.offsetX, mouse.offsetY)) {
      rZone = zone;


    }

  });
console.log(rZone.word);
     this.interCtx.clearRect(0,0,2000,2000);
     this._drawingSvc.drawPolygon(this.interCtx, rZone.shape,"highlight" );
     
     if(display==true){
        this.clicked.emit(rZone); 
     }
  


}

}
