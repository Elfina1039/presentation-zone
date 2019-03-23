import { DrawingSettings } from '../interfaces/drawing-settings';
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
    
    points: any[]; 
    drawingSetting: string;
    
    
    
    constructor(slide){
        console.log("constructing zone");
        this.word = slide.word;
        this.category = slide.cat;
        
        this.title = slide.fields.title.value;
        this.image="assets/images/"+slide.fields.image.value;
        this.description = slide.fields.description.value;
        this.music = slide.fields.music.value;
        this.comment = slide.fields.comment.value;
        
        this.points=this.stringToPath(slide.shape);
        
        if(slide.fields.drawingSetting.value){
            this.drawingSetting = slide.fields.drawingSetting.value;
        }else{
            this.drawingSetting = slide.cat;
        }
       
             if(slide.fields.image.value){
            this.img=new Image();
                this.img.src="assets/images/"+slide.fields.image.value;
                console.log("image loaded: " + this.img.src);
           this.source=slide.fields.icon.value;
           
            }
        
        console.log(this);
        
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
                console.log("image loaded: " + this.img.src);
           this.source=slide.fields.icon.value;
    }
    
    draw(ctx){
        this.drawing.drawStaticImage(ctx, this);
    }
}


export class Region extends Zone {

    constructor(slide){
        super(slide);
        console.log("constructing region");
    }
        

    draw(ctx){
        console.log("drawing Region");
        this.drawing.drawPolygon(ctx, this.points, this.drawingSetting);
    }
    
        
   
}


export class Slide extends Zone {
    
    imgCoords : any;
    position: any;
    img : any;
    source : string;
    alpha : number;
    
    constructor(slide){
        super(slide);
      this.imgCoords=this.calcImgCoords(this.points); 
        
           this.position=this.imgCoords.topLeft;
            this.img=new Image();
                this.img.src="assets/images/"+slide.fields.icon.value;
                console.log("image loaded: " + this.img.src);
           this.source=slide.fields.icon.value;
    }
    
    addToAnimations(){
       return this;
    }
    
    animate(ctx, stage, canvas){
        this.alpha = stage;
        this.drawing.drawTransparentImage(ctx, this);
    }
    
    draw(ctx){
        this.drawing.drawStaticImage(ctx, this);
    }
}



