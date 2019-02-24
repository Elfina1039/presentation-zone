import { Injectable } from '@angular/core';
import { DrawingSettings } from '../interfaces/drawing-settings';

@Injectable({
  providedIn: 'root'
})

export class DrawingSvc {
    drawingSettings={uzemi:{}, highlight:{}};
    animations=[];
    animationStage=0;
  
    
constructor(
    ) { 
    this.drawingSettings.uzemi=<DrawingSettings>{globalAlpha:0.3, fillStyle:"transparent", strokeStyle:"red", lineWidth:5, shadowColor:"transparent", shadowBlur:0};
     this.drawingSettings.cat1=<DrawingSettings>{globalAlpha:1, fillStyle:"rgba(255,0,0,0.5)", strokeStyle:"transparent", lineWidth:1, shadowColor:"transparent", shadowBlur:0};
         this.drawingSettings.cat2=<DrawingSettings>{globalAlpha:1, fillStyle:"rgba(0,0,0,0.3)", strokeStyle:"transparent", lineWidth:1, shadowColor:"rgba(0,0,0,0.5)", shadowBlur:10};
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
            a.shift=ref.calcDestination(a.imgCoords.topLeft, a.destination, ref.animationStage);
            ref.drawImage(ctx, a.imgCoords, a.source, a.shift);
            
           
        });
        if(this.animationStage<1){
            this.animationStage+=0.007;
            requestAnimationFrame(function(){ref.runAnimations(ctx, canvas)});
        }else{
            console.log("animation finished");
            console.log(this.animations);
        }
        
    }
    

    

 
    drawPolygon(ctx, points, cat){
       // console.log("drawing");
       // console.log(ctx);
        this.applySetting(ctx,this.drawingSettings[cat]);
        
            ctx.beginPath();
            ctx.moveTo(points[0].x,points[0].y);
            
            for(var p=1;p<points.length;p++)
            {
                 //console.log(p);
                ctx.lineTo(points[p].x, points[p].y);
            }
            
            ctx.closePath();
            ctx.fill(); 
            ctx.stroke();
        return points;
    }
    
    applySetting(ctx, stg){
        ctx.globalAlpha=stg.globalAlpha;
        ctx.fillStyle=stg.fillStyle;
        ctx.strokeStyle=stg.strokeStyle;
        ctx.lineWidth=stg.lineWidth;
        ctx.shadowColor=stg.shadowColor;
        ctx.shadowBlur=stg.shadowBlur;
    }
    
    drawImage(ctx, imgCoords ,source, shift){
        if(!shift){
            shift=[0,0];
        }
             
        ctx.globalAlpha=1;
        //let points=this.stringToPath(path);
        //let imgCoords=this.calcImgCoords(points);
        //console.log("assets/images/icons/"+source);
        var img = new Image;
img.onload = function(){
   
    let ix= parseInt(imgCoords.topLeft.x+shift[0]);
    let iy=parseInt(imgCoords.topLeft.y+shift[1]);
    //console.log(ctx.globalAlpha);
   ctx.drawImage(img,ix, iy, imgCoords.width, imgCoords.height);
   //  document.getElementById("msWrapper").appendChild(img);
};
img.src = "assets/images/"+source;
      
        //return points;
        
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

  
        
        
    }

