import { Injectable } from '@angular/core';
import { DrawingSettings } from '../interfaces/drawing-settings';

@Injectable({
  providedIn: 'root'
})

export class DrawingSvc {
    drawingSettings={uzemi:{}, highlight:{}};
  
    
constructor(
    ) { 
    this.drawingSettings.uzemi=<DrawingSettings>{globalAlpha:0.3, fillStyle:"transparent", strokeStyle:"red", lineWidth:5, shadowColor:"transparent", shadowBlur:0};
    this.drawingSettings.highlight=<DrawingSettings>{globalAlpha:0.1, fillStyle:"white", strokeStyle:"transparent", lineWidth:5, shadowColor:"white", shadowBlur:10};
    
    }
    
 
    drawPolygon(ctx, path, cat){
        console.log("drawing");
        this.applySetting(ctx,this.drawingSettings[cat]);
            let points=this.stringToPath(path);
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
    
    drawImage(ctx, path ,source){
        ctx.globalAlpha=1;
        let points=this.stringToPath(path);
        let imgCoords=this.calcImgCoords(points);
        console.log("assets/images/icons/"+source);
        var img = new Image;
img.onload = function(){
    
   ctx.drawImage(img, imgCoords.topLeft.x, imgCoords.topLeft.y, imgCoords.width, imgCoords.height);
   //  document.getElementById("msWrapper").appendChild(img);
};
img.src = "assets/images/"+source;
      
        return points;
        
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
    
    calcImgCoords(points){
        let xs=points.map((p)=>p.x);
        let ys=points.map((p)=>p.y);
        
        let minX=this.myArrayMin(xs);
        let minY=this.myArrayMin(ys);
        
        let maxX=this.myArrayMax(xs);
        let maxY=this.myArrayMax(ys);
        
      return {topLeft:{x:minX, y:minY}, width:maxX-minX, height:maxY-minY}
    }
    
myArrayMin(arr) {
  return Math.min.apply(null, arr);
}
  
    myArrayMax(arr) {
  return Math.max.apply(null, arr);
}
  
    
  
        
        
    }

