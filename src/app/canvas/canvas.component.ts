import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DrawingSvc } from '../services/drawing.service';
import { ImgData } from '../interfaces/img-data';
import { ZoneCategory } from '../interfaces/zone-category';
import { Zone } from '../classes/zone';



@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
    providers:[DrawingSvc]
})
export class CanvasComponent implements OnInit, OnChanges, AfterViewInit {
     @ViewChild("msWrapper") wrapper;
     @ViewChild("manuscript") outer;
    @ViewChild("msCanvas") canvas;
     @ViewChild("interactiveCanvas") interaction;
    @ViewChild("animationCanvas") animation;
    @ViewChild("les") les;
    @Input("zones") zones: any;
     @Input("zoneCategories") zoneCategories : any;
    @Input("imgData") imgData: ImgData;
    @Input("mode") mode: string;
    @Input("startTime") startTime: number;
    @Input("slideDuration") slideDuration: number;
    @Output() clicked = new EventEmitter<string>();
    drawing : DrawingSvc;
    title: string;
    bgImage: string;
    zoom:number;
    fitZoom : number;
    selectedZone : Zone;
    displayedZones : Zone[] = [];
    
    ctx: any;
    interCtx: any;
    animCtx: any;
    
    

  constructor (private _drawingSvc : DrawingSvc) { 
   this.zoom=1;
    this.fitZoom = 0.4;
      

  }
    

ngOnInit() {
   // console.log("--CANVAS--ON INIT--");

  }    
    
    
    ngAfterViewInit(){
     //  console.log("--CANVAS--AFTER VIEW INIT--");
                       this.ctx=this.canvas.nativeElement.getContext("2d");
     this.interCtx=this.interaction.nativeElement.getContext("2d");
      this.animCtx=this.animation.nativeElement.getContext("2d");
         //  let zones = this.zones.filter((z)=>z.category=="Území");
          this.displayedZones = this.zones;
      this.processZones(this.displayedZones);
                     }
    

 ngOnChanges() {
   console.log("--CANVAS--ON CHANGES--");
     this.bgImage="assets/images/"+this.imgData.url;
    this.canvas.nativeElement.style.backgroundImage="url("+this.bgImage+")";
     this.zoom=this.calcZoomToFit();
    this.fitZoom=this.zoom;
     this.scaleCanvas([this.canvas, this.interaction, this.animation],this.wrapper, this.outer,this.zoom, this.fitZoom);
     
  
     
  if(this.ctx && this.interCtx && this.animCtx){
   this.displayedZones = this.zones.
      this.processZones(this.displayedZones);
  }
  }
   
    
processZones(zones){
    
    this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height);
     this.interCtx.clearRect(0,0,this.interaction.nativeElement.width,this.interaction.nativeElement.height);
    this._drawingSvc.animations=[];
     
   zones.forEach((zone)=>{
       // console.log("canvas drawing zones: ");
        //console.log(zone);
        
        
            if(zone.category=="Slide" || this.mode=="presentation"){
              //  console.log("adding to animations");
            //    console.log(zone);
             //   this._drawingSvc.animations.push({img:zone.img,imgCoords:zone.imgCoords,cat:zone.cat, source:zone.fields.icon.value, destination:zone.fields.destination.value.split(","),shift:[<number>0,<number>0] });
                this._drawingSvc.animations=this._drawingSvc.animations.concat(zone.addToAnimations(this.canvas, this.zoom));
            }else{
                zone.draw(this.ctx);
            }
        
    });
     
if(this._drawingSvc.animations.length>0){
    
//console.log("RUNNING ANIMATIONS");
 //   console.log(this._drawingSvc.animations);
    this._drawingSvc.animationStage=0;
   this._drawingSvc.runAnimations(this.ctx,this.animCtx, this.animation, this.zoom, this.startTime, this.slideDuration); 
}  
    
  
   
    
    
}    
   
    
 locatePolygon(mouse, ctx, display) {
     if(this.mode=="interaction"){
           var rZone;
         let ref = this;
         //z.cat!="movement" && 
  this.displayedZones.filter((z)=>(z!=ref.selectedZone && z.category!="Mrak")).forEach(function(zone, zid) {

    let points = zone.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    //console.log(zone.WORD["#text"]+"="+points[0].x+":"+ points[0].y);

    for (let p = 1; p < points.length; p++) {
      //  console.log(zone);
      ctx.lineTo(points[p].x, points[p].y);

      //console.log(points[p].x+":"+ points[p].y);
    }

    ctx.closePath();

    if (ctx.isPointInPath(mouse.offsetX, mouse.offsetY)) {
      rZone = zone;


    }

  });
     if(rZone){
      //  console.log(rZone.word);
        
     this.interCtx.clearRect(0,0,this.interaction.nativeElement.width,this.interaction.nativeElement.height);
    // this._drawingSvc.drawPolygon(this.interCtx, rZone.points,"highlight");
    rZone.highlight(this.interCtx);
     if(display==true){
      //   console.log(rZone);
        this.clicked.emit(rZone); 
         if(rZone.category=="Území"){
             this.focusOn(rZone); 
             this.selectedZone = rZone;
         }
        
     } 
     }

  
     }



}
    
calcZoomToFit(){
//    console.log("calculating zoom");
  //   console.log(this.wrapper);
   // console.log(this.wrapper.nativeElement.offsetHeight);
    let wrapperWidth=this.wrapper.nativeElement.offsetWidth;
    let wrapperHeight=this.wrapper.nativeElement.offsetHeight;
    
 //   console.log(wrapperWidth +" <> "+wrapperHeight);
    
    let ratioX=parseInt(wrapperWidth)/parseInt(this.imgData.width);
    let ratioY=parseInt(wrapperHeight)/parseInt(this.imgData.height);
    
   // console.log(ratioX +" - "+ratioY);
    
    if(ratioX<=ratioY){
      //  console.log("returning X");
        return ratioX;
    }else{
        return ratioY;
    }
}
    
    
zoomChng(zChng) {
  // console.log(zChng);
 // console.log("before:", this.zoom);
  let newZoomLevel = this.zoom + parseFloat(zChng);
  this.zoom = newZoomLevel >= .1 ? newZoomLevel : .1;
//  console.log("after:", this.zoom);
    this.scaleCanvas([this.canvas, this.interaction, this.animation], this.wrapper, this.outer, this.zoom, this.fitZoom);


}
    
    
redrawSelected(e){
    console.log(e);
    this.displayedZones = this.zones.filter((z)=>e[z.category]==true);
    this.processZones(this.displayedZones);
}    
    
    
    scaleCanvas(canvases, inner, outer, zoom, fitZoom){
        
let dw=parseInt(outer.nativeElement.style.width);   // manuscript element
let dh=parseInt(outer.nativeElement.style.height);   
    
    
let nw : number=parseInt(this.imgData.width)*zoom;    
let nh : number=parseInt(this.imgData.height)*zoom;  
    
        
    canvases.forEach(function(c){
        let shift=" ";
        if(zoom<fitZoom){
          //c.nativeElement.style["transform-origin"]= "center center";  
            shift=" translate(500px, 500px)";
        }else{
            c.nativeElement.style["transform-origin"]= "top left"; 
        }
        
        c.nativeElement.style.transform= "scale(" + zoom + "," + zoom + ")"+shift;
        
         if(nw<dw && nh<dh)
        {
       c.nativeElement.style.overflow="hidden";
        }
    else
           {
            c.nativeElement.style.overflow="scroll";
        }
        
    });
    

   
    
   // console.log(nw + "--" + nh);
 inner.nativeElement.style.width=nw;
  inner.nativeElement.style.height=nh;
       
        
} 
    
  focusOn(zone){
    console.log("zooming in");
         
   this.displayedZones = this.zones.filter((z)=>z.word!=zone.word);
      this.processZones(this.displayedZones);
                      

    let xtr=zone.imgCoords;
    
    let sx=xtr.max.x-xtr.min.x;
    let sy=xtr.max.y-xtr.min.y;
    
    let vw=this.outer.nativeElement.clientWidth;
    let vh=this.outer.nativeElement.clientHeight;
      
      console.log(this.outer);
    
    let ox=(vw-sx)/2;
    let oy=(vh-sy)/2;
    
    let nzm : number = vw/sx;
      console.log(vw + " : " + sx);
      console.log("new zoom: "+nzm);
    
    this.zoomChng(nzm-this.zoom);
      let ref=this;
    setTimeout(function(){ref.moveScreen({x:xtr.min.x,y:xtr.min.y},ox,oy, nzm)},500);
   
                };
    
moveScreen(xy, ox, oy, nzm) {
  console.log(xy.x + "//" + xy.y);


    var x=Math.max(0,(xy.x*nzm));
    var y=Math.max(0,(xy.y*nzm));


  console.log(x + "-ss-" + y);
    console.log( this.outer);

  this.wrapper.nativeElement.scrollTop = y;
  this.wrapper.nativeElement.scrollLeft = x;


}
    

}


