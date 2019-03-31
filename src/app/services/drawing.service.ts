import { Injectable } from '@angular/core';
import { DrawingSettings } from '../interfaces/drawing-settings';

@Injectable({
  providedIn: 'root'
})

export class DrawingSvc {
    drawingSettings={uzemi:{}, highlight:{},  Flora:{} , region_white:{}, region_green:{}, region_blue:{}, region_red:{}, region_purple:{}, region_yellow:{},
                     text:{},  image:{}, cloud:{}, blackness:{}};
    animations=[];
    dynamics = [];
    animationStage=0;
  
constructor(
    ) { 
    
    this.drawingSettings.uzemi=<DrawingSettings>{fillStyle:"transparent", strokeStyle:"red", lineWidth:5, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.Flora=<DrawingSettings>{fillStyle:"rgba(0,255,0,0.5)", strokeStyle:"transparent", lineWidth:1, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.region_white=<DrawingSettings>{fillStyle:"rgba(255,255,255,0.3)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
        this.drawingSettings.region_green=<DrawingSettings>{fillStyle:"rgba(0,255,0,0.3)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
         this.drawingSettings.region_blue=<DrawingSettings>{ fillStyle:"rgba(0,0,255,0.3)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
          this.drawingSettings.region_red=<DrawingSettings>{ fillStyle:"rgba(255,0,0,0.3)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
         this.drawingSettings.region_purple=<DrawingSettings>{ fillStyle:"rgba(255,0,255,0.3)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
         this.drawingSettings.region_yellow=<DrawingSettings>{ fillStyle:"rgba(239, 222, 28)", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.text=<DrawingSettings>{fillStyle:"yellow", strokeStyle:"black", lineWidth:3, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.highlight=<DrawingSettings>{ fillStyle:"white", strokeStyle:"transparent", lineWidth:5, shadowColor:"white", shadowBlur:10};
    this.drawingSettings.image=<DrawingSettings>{ fillStyle:"white", strokeStyle:"transparent", lineWidth:5, shadowColor:"white", shadowBlur:10};
        
     this.drawingSettings.cloud=<DrawingSettings>{fillStyle:"rgba(255,255,255,0.8)", strokeStyle:"transparent", lineWidth:0, shadowColor:"rgba(255,255,255,0.8)", shadowBlur:5};    
        
          this.drawingSettings.blackness=<DrawingSettings>{fillStyle:"black", strokeStyle:"transparent", lineWidth:0, shadowColor:"black", shadowBlur:5}; 
   
        
    }
    

    
    runAnimations(ctx, animCtx, canvas, zoom, startTime, duration){
    //  console.log("animating");
        // this.applySetting(animCtx,"image");
        let ref=this;
        var requestAnimationFrame=window.requestAnimationFrame;
        requestAnimationFrame(function(){ref.animate(ctx, animCtx, canvas, zoom, startTime, duration)});
    }
 
    
    animate(ctx, animCtx, canvas, zoom, startTime, duration){
     animCtx.clearRect(0,0,canvas.nativeElement.width,canvas.nativeElement.height);
        let ref=this;
        this.animations.forEach(function(a, ai){
            let now = Date.now();
            let runningTime = now-startTime;
           // console.log("running: "+runningTime);
            if(a.offset<=runningTime && a.offset+a.duration>=runningTime){
               a.animate(animCtx, ref.calcStage(startTime+a.offset, a.duration), canvas, zoom);
               }
               
             
            
        });
        
    
        
        if(this.animationStage<1){
            this.animationStage=this.calcStage(startTime, duration);
            requestAnimationFrame(function(){ref.runAnimations(ctx,animCtx, canvas, zoom, startTime, duration)});
        }else{
            console.log("animation finished");
            animCtx.clearRect(0,0,canvas.nativeElement.width,canvas.nativeElement.height);
          //  this.animations.forEach(function(a){
            //    if(a.static==true){
            //        a.animate(ctx, 1, canvas, zoom);
            //    }
            
     //   });
            console.log(this.animations);
        }
        
    }
    
    
    calcStage(startTime, duration){
        let now = Date.now();
        let diff = now - startTime;
        let stage = diff/duration;
        return stage;
    }
  
    
    writeText(ctx, text){
        this.applySetting(ctx, "text");
 
        ctx.textAlign="center";
        ctx.fillStyle="yellow";
       
  
        ctx.font="800 150px Arial";
       
    
        ctx.fillText(text.text, 1700, 2000);
        
         ctx.lineWidth=6;
        ctx.strokeStyle="black";
       
        ctx.strokeText(text.text, 1700, 2000);
    
 
    }
    

 
    drawPolygon(ctx, points, setting){
      // this.applySetting(ctx,this.drawingSettings[setting]);
     
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
    
    drawTransparentImage(ctx,zone, zoom){
        //console.log(zone.alpha);
    this.applySetting(ctx, "image");   
this.applyTransform(ctx, zone.transformSetting);
   
       // ctx.scale(zone.maxScale, zone.maxScale);
         
       
        // console.log(zone.img+" / "+zzoone.imgCoords.topLeft.x+" / "+ zone.imgCoords.topLeft.y+" / "+ zone.imgCoords.width+" / "+ zone.imgCoords.height);
        ctx.drawImage(zone.img,0, 0, zone.imgCoords.width, zone.imgCoords.height);
       
    
    
    }
    
        
    drawCurtain(ctx,zone){
  
  
        ctx.fillStyle="rgba(0,0,0,0.7)";
      
        // console.log(zone.img+" / "+zzoone.imgCoords.topLeft.x+" / "+ zone.imgCoords.topLeft.y+" / "+ zone.imgCoords.width+" / "+ zone.imgCoords.height);
        ctx.fillRect(0, 0, zone.imgCoords.width, zone.imgCoords.height);
 
    
    
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
       // ctx.globalAlpha=this.drawingSettings[stg].globalAlpha;
        ctx.fillStyle=this.drawingSettings[stg].fillStyle;
        ctx.strokeStyle=this.drawingSettings[stg].strokeStyle;
        ctx.lineWidth=this.drawingSettings[stg].lineWidth;
        ctx.shadowColor=this.drawingSettings[stg].shadowColor;
        ctx.shadowBlur=this.drawingSettings[stg].shadowBlur;
    }
    
    applyTransform(ctx,transformSetting){
      // console.log(">>> TRANSFORMING: " + transformSetting.globalAlpha);
        //console.log(transformSetting);
    let scale = transformSetting.scale;

        ctx.globalAlpha = transformSetting.globalAlpha;
        ctx.translate(transformSetting.translate.x, transformSetting.translate.y); 
        ctx.scale(scale, scale); 
        
    }
    
    
    calcScaleToFit(img,canvas, zoom){
  // console.log(canvas);
    let wrapperWidth=canvas.nativeElement.offsetWidth;
    let wrapperHeight=canvas.nativeElement.offsetHeight;
    
    console.log(wrapperWidth*zoom +" <> "+wrapperHeight*zoom);
    console.log(img.width);
    let ratioX=parseInt(wrapperWidth)/parseInt(img.width);
    let ratioY=parseInt(wrapperHeight)/parseInt(img.height);
    
  //  console.log(ratioX +" - "+ratioY);
    
        let maxScale : number;
        
    if(ratioX<=ratioY){
        maxScale = ratioX;
    }else{
        maxScale = ratioY;
    }
        
    let centerX = (wrapperWidth-(img.width*maxScale))/2;   
    let centerY = (wrapperHeight-(img.height*maxScale))/2;  
        
    let centerOrigX = (wrapperWidth-(img.width))/2;   
    let centerOrigY = (wrapperHeight-(img.height))/2;  
        
     //   console.log({maxScale: maxScale, center : {x:centerX, y:centerY}});
        
        return {maxScale: maxScale, center : {x:centerX, y:centerY}, centerOrig:{x:centerOrigX, y:centerOrigY}};
}
 
        
       stringToPath(pathString){
        let coords=pathString.trim().split(/\s+/);
        let rsl=[];
        coords.forEach((c)=>{
            let xy=c.trim().split(",");
         
            rsl.push({x:xy[0], y:xy[1]});
        });
        return rsl;
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

