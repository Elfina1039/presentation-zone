import { Injectable } from '@angular/core';
import { DrawingSettings } from '../interfaces/drawing-settings';

@Injectable({
  providedIn: 'root'
})

export class DrawingSvc {
    drawingSettings={uzemi:{}, highlight:{},  Flora:{} , region_white:{}, region_green:{},  default:{},  image:{}};
    animations=[];
    animationStage=0;
  
constructor(
    ) { 
    
    this.drawingSettings.uzemi=<DrawingSettings>{globalAlpha:0.3, fillStyle:"transparent", strokeStyle:"red", lineWidth:5, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.Flora=<DrawingSettings>{globalAlpha:1, fillStyle:"rgba(0,255,0,0.5)", strokeStyle:"transparent", lineWidth:1, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.region_white=<DrawingSettings>{globalAlpha:1, fillStyle:"rgba(255,255,255,0.1)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
        this.drawingSettings.region_green=<DrawingSettings>{globalAlpha:1, fillStyle:"rgba(0,255,0,0.1)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.default=<DrawingSettings>{globalAlpha:1, fillStyle:"rgba(0,0,255,0.5)", strokeStyle:"transparent", lineWidth:1, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.highlight=<DrawingSettings>{globalAlpha:0.05, fillStyle:"white", strokeStyle:"transparent", lineWidth:5, shadowColor:"white", shadowBlur:10};
    this.drawingSettings.image=<DrawingSettings>{globalAlpha:1, fillStyle:"white", strokeStyle:"transparent", lineWidth:5, shadowColor:"white", shadowBlur:10};
        
        
   
        
    }
    
    drawSmoothly(ctx, path, cat, interval, repeats, count){
        this.drawPolygon(ctx,path,cat);
        if(repeats>count){
            count++;
            console.log("setting timeout - " + count);
            let ref=this;
            setTimeout(function(){ref.drawSmoothly(ctx, path, cat, interval, repeats, count)},interval);
        }
    }
    
    runAnimations(ctx, canvas){
      //console.log("animating");
         this.applySetting(ctx,"image");
        let ref=this;
        var requestAnimationFrame=window.requestAnimationFrame;
        requestAnimationFrame(function(){ref.animate(ctx, canvas)});
    }
 
    
    animate(ctx, canvas){
     ctx.clearRect(0,0,canvas.nativeElement.width,canvas.nativeElement.height);
        let ref=this;
        this.animations.forEach(function(a){
            //console.log(a);
            //a.shift=ref.calcDestination(a.imgCoords.topLeft, a.destination, ref.animationStage);
            //ref.drawImage(ctx, a, a.shift);
            a.animate(ctx, ref.animationStage, canvas);
           
        });
        if(this.animationStage<1){
            this.animationStage+=0.007;
            requestAnimationFrame(function(){ref.runAnimations(ctx, canvas)});
        }else{
            console.log("animation finished");
            console.log(this.animations);
        }
        
    }
  
    

    

 
    drawPolygon(ctx, points, setting){
       this.applySetting(ctx,this.drawingSettings[setting]);
     
            ctx.beginPath();
            ctx.moveTo(points[0].x,points[0].y);
            
            for(var p=1;p<points.length;p++)
            {
                ctx.lineTo(points[p].x, points[p].y);
            }
            
            ctx.closePath();
            ctx.fill(); 
            ctx.stroke();
    }
    

    
    drawImage(ctx, zone, shift){
        ctx.globalAlpha=1;
//   zone.img.src = "assets/images/"+zone.source;
    let ix= parseInt(zone.imgCoords.topLeft.x+shift[0]);
    let iy=parseInt(zone.imgCoords.topLeft.y+shift[1]);
    //console.log(ctx.globalAlpha);
      //  console.log(zone.img.src);
    //    console.log(zone.img+" / "+ix+" / "+ iy+" / "+ zone.imgCoords.width+" / "+ zone.imgCoords.height);
   ctx.drawImage(zone.img,ix, iy, zone.imgCoords.width, zone.imgCoords.height);
 
    }
    
    drawStaticImage(ctx, zone){
        this.applySetting(ctx, "image");
        
       // let img=new Image();
        zone.img.onload=function(img){
             
         console.log(zone.img+" / "+zone.imgCoords.topLeft.x+" / "+ zone.imgCoords.topLeft.y+" / "+ zone.imgCoords.width+" / "+ zone.imgCoords.height);
        ctx.drawImage(zone.img,zone.imgCoords.topLeft.x, zone.imgCoords.topLeft.y, zone.imgCoords.width, zone.imgCoords.height);
        ctx.font = "20px Georgia";
        //ctx.fillStyle="black";
        ctx.globalAlpha=1;
        ctx.fillText(zone.word,  zone.imgCoords.topLeft.x ,zone.imgCoords.topLeft.y+zone.imgCoords.height);
        };
 
    }
    
    drawTransparentImage(ctx,zone){
        //console.log(zone.alpha);
       // ctx.globalAlpha=zone.alpha;
        let scale = zone.alpha*25;
     ctx.save();
           ctx.scale(scale, scale); 
        ctx.translate(scale, scale);  
       
        // console.log(zone.img+" / "+zzoone.imgCoords.topLeft.x+" / "+ zone.imgCoords.topLeft.y+" / "+ zone.imgCoords.width+" / "+ zone.imgCoords.height);
        ctx.drawImage(zone.img,0, 0, zone.img.width, zone.img.height);
         ctx.restore();  
        ctx.font = "20px Georgia";
        //ctx.fillStyle="black";
        ctx.globalAlpha=1;
        ctx.fillText(zone.word,  zone.imgCoords.topLeft.x ,zone.imgCoords.topLeft.y+zone.imgCoords.height);
    
    }
    

    calcDestination(position, destination, stage){
       // console.log(stage);
        let diffX=destination[0]-position.x;
        let diffY=destination[1]-position.y;
      //  console.log(diffY);
        let shift=[diffX*stage, diffY*stage];
      //  console.log(position);
     //    console.log(destination);
      //  console.log(shift);
        return shift;
    }
    
    
    
    applySetting(ctx, stg){
        ctx.globalAlpha=stg.globalAlpha;
        ctx.fillStyle=stg.fillStyle;
        ctx.strokeStyle=stg.strokeStyle;
        ctx.lineWidth=stg.lineWidth;
        ctx.shadowColor=stg.shadowColor;
        ctx.shadowBlur=stg.shadowBlur;
    }

  //NOt USED
    
         drawTexture(ctx, zone, cat){
             console.log("drawing texture");
      
           // console.log("texture loaded");
           // zone.img.src="assets/images/textures/forest_tile.png";
         let texture=ctx.createPattern(zone.img, "repeat");
            ctx.fillStyle=texture;
         ctx.strokeStyle="transparent";
                ctx.beginPath();
            ctx.moveTo(zone.points[0].x,zone.points[0].y);
            
            for(var p=1;p<zone.points.length;p++)
            {
                 console.log(p);
                ctx.lineTo(zone.points[p].x, zone.points[p].y);
            }
            
            ctx.closePath();
         
         ctx.fill();
            ctx.stroke();
           
       ctx.globalCompositeOperation='source-in';
      zone.source="textures/forest_tile.png";
         //this.drawStaticImage(ctx,zone);)
         console.log(texture);
        //console.log("TEXTURE: /"+texture+" / "+zone.imgCoords.topLeft.x+" / "+ zone.imgCoords.topLeft.y+" / "+ zone.imgCoords.width+" / "+ zone.imgCoords.height);
        // ctx.fillStyle="transparent";
      //  ctx.drawImage(texture,zone.imgCoords.topLeft.x, zone.imgCoords.topLeft.y, zone.imgCoords.width, zone.imgCoords.height);
       //ctx.fillStyle="blue";
        //ctx.fillRect(0,0,3000, 3000);
      
       ctx.globalCompositeOperation='source-over';
       //this.applySetting(ctx,this.drawingSettings[cat]);
           
   
       
    }
        
        
    }

