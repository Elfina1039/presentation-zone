import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DrawingSvc } from '../services/drawing.service';
import { ImgData } from '../interfaces/img-data';



@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
    providers:[DrawingSvc]
})
export class CanvasComponent implements OnInit, OnChanges, AfterViewInit {
     @ViewChild("msWrapper") wrapper;
    @ViewChild("msCanvas") canvas;
     @ViewChild("interactiveCanvas") interaction;
    @ViewChild("animationCanvas") animation;
    @ViewChild("les") les;
    @Input("zones") zones: any;
    @Input("imgData") imgData: ImgData;
    @Input("mode") mode: string;
    @Output() clicked = new EventEmitter<string>();
    drawing : DrawingSvc;
    title: string;
    bgImage: string;
    zoom:number;
    fitZoom : number;
    
    ctx: any;
    interCtx: any;
    animCtx: any;
    
    

  constructor (private _drawingSvc : DrawingSvc) { 
   this.zoom=1;
    this.fitZoom = 0.4;

  }
    

ngOnInit() {
    console.log("--CANVAS--ON INIT--");

  }    
    
    
    ngAfterViewInit(){
       console.log("--CANVAS--AFTER VIEW INIT--");
                       this.ctx=this.canvas.nativeElement.getContext("2d");
     this.interCtx=this.interaction.nativeElement.getContext("2d");
      this.animCtx=this.animation.nativeElement.getContext("2d");
        this.processZones();
                     }
    

 ngOnChanges() {
    console.log("--CANVAS--ON CHANGES--");
  if(this.ctx && this.interCtx && this.animCtx){
      this.processZones();
  }
  }
   
    
processZones(){
       this.bgImage="assets/images/"+this.imgData.url;
    this.canvas.nativeElement.style.backgroundImage="url("+this.bgImage+")";
     this.zoom=this.calcZoomToFit();
    this.fitZoom=this.zoom;
     this.scaleCanvas([this.canvas, this.interaction, this.animation],this.zoom, this.fitZoom);
    
    this._drawingSvc.animations=[];
     
    this.zones.forEach((zone)=>{
       // console.log("canvas drawing zones: ");
        //console.log(zone);
        
        
            if(zone.category=="Slide" || this.mode=="presentation"){
                console.log("adding to animations");
                console.log(zone);
             //   this._drawingSvc.animations.push({img:zone.img,imgCoords:zone.imgCoords,cat:zone.cat, source:zone.fields.icon.value, destination:zone.fields.destination.value.split(","),shift:[<number>0,<number>0] });
                this._drawingSvc.animations=this._drawingSvc.animations.concat(zone.addToAnimations(this.canvas, this.zoom));
            }else{
                zone.draw(this.ctx);
            }
        
    });
     
if(this._drawingSvc.animations.length>0 || this._drawingSvc.dynamics.length>0){
    
console.log("RUNNING ANIMATIONS");
    console.log(this._drawingSvc.animations);
    this._drawingSvc.animationStage=0;
   this._drawingSvc.runAnimations(this.ctx,this.animCtx, this.animation, this.zoom); 
}  
    
  
   
    
    
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
        
     this.interCtx.clearRect(0,0,this.interaction.nativeElement.width,this.interaction.nativeElement.height);
    // this._drawingSvc.drawPolygon(this.interCtx, rZone.points,"highlight");
    rZone.highlight(this.interCtx);
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
  this.zoom = newZoomLevel >= .1 ? newZoomLevel : .1;
  console.log("after:", this.zoom);
    this.scaleCanvas([this.canvas, this.interaction, this.animation], this.zoom, this.fitZoom);


}
    scaleCanvas(canvases, zoom, fitZoom){
    canvases.forEach(function(c){
        let shift=" ";
        if(zoom<fitZoom){
          //c.nativeElement.style["transform-origin"]= "center center";  
            shift=" translate(500px, 500px)";
        }else{
            c.nativeElement.style["transform-origin"]= "top left"; 
        }
        
        c.nativeElement.style.transform= "scale(" + zoom + "," + zoom + ")"+shift;
    });
    
}    


}
