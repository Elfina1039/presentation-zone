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
     @ViewChild("msWrapper") wrapper;
    @ViewChild("msCanvas") canvas;
     @ViewChild("interactiveCanvas") interaction;
    @ViewChild("animationCanvas") animation;
    @Input("zones") zones: any;
    @Input("imgData") imgData: ImgData;
    @Output() clicked = new EventEmitter<string>();
    drawing : DrawingSvc;
    title: string;
    bgImage: string;
    zoom:number;
    
    ctx: any;
    interCtx: any;
    animCtx: any;
    

  constructor (private _drawingSvc : DrawingSvc) { 
   this.zoom=1;
  }
    

ngOnInit() {

  }    
    

 ngAfterViewInit() {
     this.bgImage="assets/images/"+this.imgData.url;
 
     
    this.ctx=this.canvas.nativeElement.getContext("2d");
     this.interCtx=this.interaction.nativeElement.getContext("2d");
      this.animCtx=this.animation.nativeElement.getContext("2d");
   this.canvas.nativeElement.style.backgroundImage="url("+this.bgImage+")";
     this.zoom=this.calcZoomToFit();
     this.scaleCanvas([this.canvas, this.interaction, this.animation],this.zoom);
    this.zones.forEach((zone)=>{
        
        if(zone.fields.icon.value){
            if(zone.cat=="movement"){
                this._drawingSvc.animations.push({imgCoords:zone.imgCoords,cat:zone.cat, source:zone.fields.icon.value, destination:zone.fields.destination.value.split(","),shift:[0,0] });
            }else{
                this._drawingSvc.drawImage(this.ctx, zone.imgCoords, zone.fields.icon.value, [0,0]);
            }
           
        }else{
            this._drawingSvc.drawPolygon(this.ctx,zone.points,zone.cat);
        }
        
        
    });
    this._drawingSvc.runAnimations(this.animCtx, this.animation);
  }
    
   
    
 locatePolygon(mouse, ctx, display) {
  var rZone;
  this.zones.filter((z)=>z.cat!="movement").forEach(function(zone, zid) {

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
     if(rZone){
        console.log(rZone.word);
        
     this.interCtx.clearRect(0,0,2000,2000);
     this._drawingSvc.drawPolygon(this.interCtx, rZone.points,"highlight");
      
     if(display==true){
         console.log(rZone);
        this.clicked.emit(rZone); 
     } 
     }

  


}
    
calcZoomToFit(){
    console.log(this.wrapper.nativeElement.offsetHeight);
    let wrapperWidth=this.wrapper.nativeElement.offsetWidth;
    let wrapperHeight=this.wrapper.nativeElement.offsetHeight;
    
    console.log(wrapperWidth +" <> "+wrapperHeight);
    
    let ratioX=parseInt(wrapperWidth)/parseInt(this.imgData.width);
    let ratioY=parseInt(wrapperWidth)/parseInt(this.imgData.height);
    
    console.log(ratioX +" - "+ratioY);
    
    if(ratioX<=ratioY){
        return ratioX;
    }else{
        return ratioY;
    }
}
    
    
zoomChng(zChng) {
  // console.log(zChng);
  console.log("before:", this.zoom);
  let newZoomLevel = this.zoom + parseFloat(zChng);
  this.zoom = newZoomLevel >= .4 ? newZoomLevel : .4;
  console.log("after:", this.zoom);
    this.scaleCanvas([this.canvas, this.interaction, this.animation], this.zoom);


}
    scaleCanvas(canvases, zoom){
    canvases.forEach(function(c){
        c.nativeElement.style.transform= "scale(" + zoom + "," + zoom + ")";
    });
    
}    


}
