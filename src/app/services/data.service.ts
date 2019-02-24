import { Injectable } from '@angular/core';
import { Islide } from '../interfaces/Islide';
import { SlideSet } from '../interfaces/slide-set';
import { ImgData } from '../interfaces/img-data';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    presentation={jedna:"prvni", dva:"druha"};
    slide: string;
    imgData : ImgData[];
    slideSets : SlideSet[];
    

  constructor(private _activatedRoute: ActivatedRoute) { 
      console.log("data service construction");
     // console.log(this._activatedRoute.snapshot.params['zid']);
  //this.slide=this._activatedRoute.snapshot.params['zid'];
    //  console.log("SLIDE: "+ this.slide);
      this.imgData=[{url:"maps/ernavorn.jpg", width:"1600px", height:"1131px"},{url:"maps/jirikije_a_kubikije.jpg", width:"960px", height:"576px"}];
      this.slideSets=[{name:"Ernavorn", slides:[{"word":"Královské loďstvo","color":"#ffffff","shape":" 391,685  457,685  457,738  391,738 ", "cat":"movement", "fields":{"destination":{"name":"destination","value":"20,485"},"icon":{"name":"icon","value":"icons/ship.png"},"description":{"name":"description","value":"Flotila krále Saldora"},"image":{"name":"image","value":"animations/fatcat.gif"},"music":{"name":"music","value":""}}},{"word":"","color":"#ffffff","shape":"undefined", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":""},"description":{"name":"description","value":""},"image":{"name":"image","value":""},"music":{"name":"music","value":""}}},{"word":"Drak","color":"#ffffff","shape":" 1172,412  1100,412  1100,481  1172,481 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":"animations/dragon_walking.gif"},"description":{"name":"description","value":"Chodící drak"},"image":{"name":"image","value":""},"music":{"name":"music","value":""}}},{"word":"","color":"#ffffff","shape":"undefined", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":""},"description":{"name":"description","value":""},"image":{"name":"image","value":""},"music":{"name":"music","value":""}}},{"word":"Modrá skála","color":"#00ffff","shape":" 1256,304  1303,304  1303,261  1256,261 ", "cat":"landscape", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":"icons/modra_skala.png"},"description":{"name":"description","value":"Modrá skála leží na severu. Modrá je proto, že je zasněžená. Žijí v ní eskymáci."},"image":{"name":"image","value":"icons/modra_skala.png"},"music":{"name":"music","value":""}}},{"word":"Maraburo","color":"#0000ff","shape":" 1130,326  1193,326  1193,370  1130,370 ", "cat":"default", "fields":{"description":{"name":"description","value":"Maledictus haven"},"image":{"name":"image","value":"animations/dragon.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Erebo","color":"#0000ff","shape":" 572,374  556,405  586,431  640,430  661,390  636,372 ", "cat":"default", "fields":{"description":{"name":"description","value":"The village of Erebo"},"image":{"name":"image","value":"animations/dragon_flying.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":"04-TimeKeepers-AHambar-FWM010b.mp3"}}},{"word":"Tum","color":"#0000ff","shape":"undefined", "cat":"default", "fields":{"description":{"name":"description","value":"Aritre haven"},"image":{"name":"image","value":""},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Údolí_krve","color":"#00ff00","shape":" 705,526  727,514  874,549  834,567 ", "cat":"cat1", "fields":{"description":{"name":"description","value":"the site of the battle"},"image":{"name":"image","value":"animations/dragon_walking.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Siege of Erebo","color":"#ff0000","shape":" 548,407  572,437  639,438  670,399  697,411  704,445  660,479  575,481  518,432  512,393 ", "cat":"cat2", "fields":{"description":{"name":"description","value":"Maledictus army"},"image":{"name":"image","value":"animations/gargoyle.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":"02-ImmortalEmpire-AHambar-FWM010b.mp3"}}},{"word":"coming of Rennard_0","color":"#ff0000","shape":" 1113,381  1200,381  1200,435  1113,435 ", "cat":"cat2", "fields":{"description":{"name":"description","value":""},"image":{"name":"image","value":""},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"coming of Rennard_1","color":"#ff0000","shape":" 1004,521  1102,521  1102,580  1004,580 ", "cat":"movement", "fields":{"description":{"name":"description","value":"movement to the valley"},"image":{"name":"image","value":""},"icon":{"name":"icon","value":"icons/threeheaded_monster.png"},"music":{"name":"music","value":""},"destination":{"name":"destination","value":"700,600"}}} ]},
                     {name:"KLuci", slides:[{"word":"Dračí jezero","color":"#ff0000","shape":" 718,147  756,147  756,122  718,122 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"description":{"name":"description","value":"Dost pekelné jezero. Nesmí k němu létat vzducholodě a zabíjet tam ohnivé draky, protože by se stali nimi."},"icon":{"name":"icon","value":"icons/fire_lake.png"},"image":{"name":"image","value":"icons/dragon_breathes.gif"},"music":{"name":"music","value":""}}},{"word":"Jiříkův hrad","color":"#ff8000","shape":" 320,401  352,401  352,370  320,370 ", "cat":"cat2", "fields":{"title":{"name":"title","value":""},"description":{"name":"description","value":"Nesmí tam Kubík, protože vždycky, když přijde do naší Jiříkie, tak se stane strašná bouře. Boříse hrady, domy a my to pak všechno musíme postavit znovu."},"icon":{"name":"icon","value":"icons/castle_paint.png"},"image":{"name":"image","value":"icons/castle_paint.png"},"music":{"name":"music","value":""}}},
                                            {"word":"infernal","color":"#ffffff","shape":" 226,198  241,198  241,218  226,218 ", "cat":"movement", "fields":{"destination":{"name":"destination","value":"250,433"},"description":{"name":"description","value":"Infernál je strašný tvr a obývá většinu jeskyní Jiříkie"},"image":{"name":"image","value":"icons/Infernal.png"},"icon":{"name":"icon","value":"icons/Infernal.png"},"music":{"name":"music","value":""}}},{"word":"Plující loď","color":"#ffffff","shape":" 30,130  54,130  54,155  30,155 ", "cat":"movement", "fields":{"destination":{"name":"title","value":"590,165"},"description":{"name":"description","value":"loď"},"image":{"name":"image","value":"icons/ship.png"},"icon":{"name":"icon","value":"icons/ship.png"},"music":{"name":"music","value":""}}},
    
    {
        "word": "Velký most",
        "color": "#ff8000",
        "shape": " 351,383  434,383  434,346  351,346 ",
        "cat": "default",
        "fields": {
            "title": {
                "name": "title",
                "value": ""
            },
            "description": {
                "name": "description",
                "value": "Obrovitý most"
            },
            "image": {
                "name": "image",
                "value": "icons/tower_bridge.png"
            },
            "icon": {
                "name": "icon",
                "value": "icons/tower_bridge.png"
            },
            "music": {
                "name": "music",
                "value": ""
            }
        }
    },
    {
        "word": "Těžký most",
        "color": "#ff8000",
        "shape": " 423,59  479,59  479,10  423,10 ",
        "cat": "default",
        "fields": {
            "title": {
                "name": "title",
                "value": ""
            },
            "description": {
                "name": "description",
                "value": "Velmi těžký most"
            },
            "image": {
                "name": "image",
                "value": "icons/bridge_stone.png"
            },
            "icon": {
                "name": "icon",
                "value": "icons/bridge_stone.png"
            },
            "music": {
                "name": "music",
                "value": ""
            }
        }
    },{"word":"Hořký hrad","color":"#ff8000","shape":" 179,200  205,200  205,172  179,172 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"image":{"name":"image","value":"icons/castle_towers.png"},"icon":{"name":"icon","value":"icons/castle_towers.png"},"music":{"name":"music","value":"voice/skrinka.m4a"},"description":{"name":"description","value":"Vyrábí se v něm hořké kafe a nesmí do něj Kubík, protože by se stal ohavným Taurem. Tak si dávejte moc velký pozor, pane králíku."}}},{"word":"Mořský hrad","color":"#ff8000","shape":" 922,42  955,42  955,3  922,3 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"image":{"name":"image","value":"icons/castle_old.png"},"icon":{"name":"icon","value":"icons/castle_old.png"},"music":{"name":"music","value":"voice/kubikijsky_zakon.m4a"},"description":{"name":"description","value":"Jiříkijský král nesmí otevírat zlatou skříňku."}}}, {"word":"Mostový hrad","color":"#ff8000","shape":" 149,397  179,397  179,366  149,366 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"description": {
                "name": "description",
                "value": "Nesmí tam Kubíkijský král, protože by ho to zaklelo a navždy by se stal zlým černokněžníkem. Nikdo by ho nedokázal zastavit, kromě záblesku Slunce."
            },"image":{"name":"image","value":"icons/castle_bridge.png"},"icon":{"name":"icon","value":"icons/castle_bridge.png"},"music":{"name":"music","value":""}}},{"word":"Mléčný hrad","color":"#ff8000","shape":" 719,379  743,379  743,357  719,357 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"description": {
                "name": "description",
                "value": "Nesmí do něj Jiřík, protože by se stal ohavným tvorem, kterej chodí na nožičkách, stal by se třeba lvem. A už vy ho nikdo nezastavil, kromě tmy."
            },"image":{"name":"image","value":"icons/castle_paint.png"},"icon":{"name":"icon","value":"icons/castle_paint.png"},"music":{"name":"music","value":""}}}
]}];
  }
    
    processIcons(slideSet){
        let ref=this;
        slideSet.slides.forEach(function(slide){
             slide.points=ref.stringToPath(slide.shape);
            if(slide.fields.icon.value){
            slide.imgCoords=ref.calcImgCoords(slide.points);
            slide.position=slide.imgCoords.topLeft;
           
            }
        });
        
    }
    
    getImgData(i){
        return this.imgData[i];
    }
    
    getSlides(i){
        this.processIcons(this.slideSets[i]);
        return this.slideSets[i];
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
 
    