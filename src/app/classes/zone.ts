import { DrawingSettings } from '../interfaces/drawing-settings';
import { Point } from '../interfaces/point';
import { TransformSettings } from '../interfaces/transform-settings';

import { DrawingSvc } from '../services/drawing.service';

export class Zone {
    drawing : DrawingSvc  = new DrawingSvc();
    word: string;
    category: string;
    
    title : string;
    description: string;
    image: string;
    music: string;
    comment: string;
    
    img : any;
    source : string;
    
    points: Point[]; 
    drawingSetting: string;
    static: boolean;
    
    
    constructor(slide){
      //console.log("constructing zone");
        this.static = true;
        this.word = slide.word;
        this.category = slide.cat;
        
        this.title = slide.fields.title.value;
        this.image="assets/images/"+slide.fields.image.value;
        this.description = slide.fields.description.value;
        this.music = slide.fields.music.value;
       // this.comment = slide.fields.comment.value;
        
        this.points=this.stringToPath(slide.shape);
        
        if(slide.fields.drawingSetting){
            this.drawingSetting = slide.fields.drawingSetting.value;
        }else{
            this.drawingSetting = slide.cat;
        }
       
             if(slide.fields.image.value){
            this.img=new Image();
                this.img.src="assets/images/"+slide.fields.image.value;
              //console.log("image loaded: " + this.img.src);
           this.source=slide.fields.icon.value;
           
            }
        
      //console.log(this);
        
    }
    
   highlight(ctx){
        this.drawing.drawPolygon(ctx, this.points, "highlight");
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
        
      return {topLeft:{x:minX, y:minY}, width:maxX-minX, height:maxY-minY, min:{x:minX, y:minY}, max:{x:maxX, y:maxY}}
    }
    
        myArrayMin(arr) {
  return Math.min.apply(null, arr);
}
  
    myArrayMax(arr) {
  return Math.max.apply(null, arr);
}
    
    
}


export class Icon extends Zone {
    
    imgCoords : any;
    position: any;
    img : any;
    source : string;
    
    constructor(slide){
        super(slide);
      this.imgCoords=this.calcImgCoords(this.points); 
        
           this.position=this.imgCoords.topLeft;
            this.img=new Image();
                this.img.src="assets/images/"+slide.fields.icon.value;
              //console.log("image loaded: " + this.img.src);
           this.source=slide.fields.icon.value;
    }
    
    draw(ctx){
        this.drawing.drawStaticImage(ctx, this);
    }
}


export class Region extends Zone {

    constructor(slide){
        super(slide);
      //console.log("constructing region");
    }
        

    draw(ctx){
      //console.log("drawing Region");
        this.drawing.drawPolygon(ctx, this.points, this.drawingSetting);
    }
    
        addToAnimations(canvas, zoom){
     console.log("adding" + this.word);
        let text = new Text(this.description, 200, 500);
       return [this, text];
    }
    
    animate(ctx, stage, canvas, zoom){
       // console.log("animating region");
         ctx.save();
        ctx.globalAlpha=stage;
        this.draw(ctx);
         ctx.restore();
     
    }
    
        
   
}




export class Slide extends Zone {
    
    imgCoords : any;
    position: any;
    img : any;
    source : string;
    alpha : number;
    transform: any;
    duration : number;
    transformSetting : TransformSettings;
    
    constructor(slide){
        super(slide);
        this.duration = 5000;
        this.static = false;
      this.imgCoords=this.calcImgCoords(this.points); 
        
           this.position=this.imgCoords.topLeft;
            this.img=new Image();
                this.img.src="assets/images/"+slide.fields.image.value;
              //console.log("image loaded: " + this.img.src);
        
           this.source=slide.fields.icon.value;
    }
    
    addToAnimations(canvas, zoom){
      //console.log(this.img);
        this.transformSetting=this.drawing.calcScaleToFit(this.imgCoords, canvas, zoom);
  
      //console.log("TEXT: " + this.description);
        let text = new Text(this.description, 200, 500);
       return [this, text];
    }
    
    animate(ctx, stage, canvas, zoom){
         ctx.save();
        this.setTransformSetting(stage, "all");
        this.drawing.drawTransparentImage(ctx, this, zoom);
         ctx.restore();
       // this.drawing.drawCurtain(ctx, this);
          
    }
    
    draw(ctx){
        this.drawing.drawStaticImage(ctx, this);
    }
    
    setTransformSetting(stage, version){
      //console.log("SETTING V: " + version);
        switch(version){
            case "all": this.transformSetting.globalAlpha = this.calcAlpha(stage); this.transformSetting.scale = this.calcScale(stage, 0.5, 1); this.transformSetting.translate = this.calcTranslate(stage); break;
            case "alpha": this.transformSetting.globalAlpha = this.calcAlpha(stage); this.transformSetting.scale = this.transformSetting.maxScale ; this.transformSetting.translate = {x:0, y:0}; break;
             case "curtain": this.transformSetting.globalAlpha = 1-stage; this.transformSetting.scale = this.transformSetting.maxScale ; this.transformSetting.translate = {x:0, y:0}; break;
        }
        
    }
    
    calcAlpha(stage){
        let alpha:number;
             if(stage<0.5){
         alpha=stage/0.5;
     }else{
         alpha=(1-stage)*2;
     }   
      return alpha;
    }
    
      calcScale(stage, initial, target){
        let scale:number;
          scale = (this.transformSetting.maxScale*initial) + (((target-initial)*this.transformSetting.maxScale)*stage);
        return scale;
   
      }
    
    calcTranslate(stage){
        
          let x = this.transformSetting.center.x + ((this.transformSetting.center.x-this.imgCoords.topLeft.x)*stage);
        let y =  this.transformSetting.center.y + ((this.transformSetting.center.y-this.imgCoords.topLeft.y)*stage);
        return {x:y, y:y};
   
      }
}

export class Curtain extends Slide{
  transformSetting : TransformSettings = {maxScale:50, center:{x:0, y:0}, scale:25};
    constructor(slide){
        super(slide);
 
    }
        
    addToAnimations(canvas, zoom){
        
      //console.log("TEXT: " + this.description);
        let text = new Text(this.description, 200, 500);
       return [this, text];
    }
    
    animate(ctx, stage, canvas, zoom){
         ctx.save();
        this.setTransformSetting(stage, "curtain");
        this.draw(ctx);
         ctx.restore();
     
    }
    
    draw(ctx){
        this.drawing.drawCurtain(ctx, this);
    }
    
    
}


export class Text{
    drawing : DrawingSvc  = new DrawingSvc();
    text : string;
    x : number;
    y: number;
    
    constructor(text, x, y){
      //console.log(">> constructing TEXT: " + text);
        this.text = text;
        this.x= x;
        this.y = y;   
      //console.log(this);
    }
    
    animate(ctx){
        this.drawing.writeText(ctx,this);
    }
}



