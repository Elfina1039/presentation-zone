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
      this.slideSets=[{name:"Ernavorn", slides:[{"word":"Královské loďstvo","color":"#ffffff","shape":" 391,685  457,685  457,738  391,738 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":"icons/ship.png"},"description":{"name":"description","value":"Flotila krále Saldora"},"image":{"name":"image","value":"animations/fatcat.gif"},"music":{"name":"music","value":""}}},{"word":"","color":"#ffffff","shape":"undefined", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":""},"description":{"name":"description","value":""},"image":{"name":"image","value":""},"music":{"name":"music","value":""}}},{"word":"Drak","color":"#ffffff","shape":" 1172,412  1100,412  1100,481  1172,481 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":"animations/dragon_walking.gif"},"description":{"name":"description","value":"Chodící drak"},"image":{"name":"image","value":""},"music":{"name":"music","value":""}}},{"word":"","color":"#ffffff","shape":"undefined", "cat":"default", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":""},"description":{"name":"description","value":""},"image":{"name":"image","value":""},"music":{"name":"music","value":""}}},{"word":"Modrá skála","color":"#00ffff","shape":" 1256,304  1303,304  1303,261  1256,261 ", "cat":"landscape", "fields":{"title":{"name":"title","value":""},"icon":{"name":"icon","value":"icons/modra_skala.png"},"description":{"name":"description","value":"Modrá skála leží na severu. Modrá je proto, že je zasněžená. Žijí v ní eskymáci."},"image":{"name":"image","value":"icons/modra_skala.png"},"music":{"name":"music","value":""}}},{"word":"Maraburo","color":"#0000ff","shape":" 1130,326  1193,326  1193,370  1130,370 ", "cat":"default", "fields":{"description":{"name":"description","value":"Maledictus haven"},"image":{"name":"image","value":"animations/dragon.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Erebo","color":"#0000ff","shape":" 572,374  556,405  586,431  640,430  661,390  636,372 ", "cat":"default", "fields":{"description":{"name":"description","value":"The village of Erebo"},"image":{"name":"image","value":"animations/dragon_flying.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Tum","color":"#0000ff","shape":"undefined", "cat":"default", "fields":{"description":{"name":"description","value":"Aritre haven"},"image":{"name":"image","value":""},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Údolí_krve","color":"#00ff00","shape":" 705,526  727,514  874,549  834,567 ", "cat":"cat1", "fields":{"description":{"name":"description","value":"the site of the battle"},"image":{"name":"image","value":"animations/dragon_walking.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"Siege of Erebo","color":"#ff0000","shape":" 548,407  572,437  639,438  670,399  697,411  704,445  660,479  575,481  518,432  512,393 ", "cat":"cat2", "fields":{"description":{"name":"description","value":"Maledictus army"},"image":{"name":"image","value":"animations/gargoyle.gif"},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"coming of Rennard_0","color":"#ff0000","shape":" 1113,381  1200,381  1200,435  1113,435 ", "cat":"cat2", "fields":{"description":{"name":"description","value":""},"image":{"name":"image","value":""},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}},{"word":"coming of Rennard_1","color":"#ff0000","shape":" 1004,521  1102,521  1102,580  1004,580 ", "cat":"cat2", "fields":{"description":{"name":"description","value":"movement to the valley"},"image":{"name":"image","value":""},"icon":{"name":"icon","value":""},"music":{"name":"music","value":""}}} ]},
                     {name:"KLuci", slides:[
    {
        "word": "Jiříkie",
        "color": "#ffffff",
        "shape": " 468,115  633,320  650,342  639,379  645,395  624,431  616,457  624,494  593,565  508,563  491,530  430,508  442,477  459,437  423,407  370,404  379,431  368,482  342,482  303,455  280,422  255,402  239,399  209,434  210,469  186,468  150,495  82,531  43,510  22,487  25,431  29,382  31,343  21,300  50,276  84,261  65,197  99,147  145,130  207,116  256,122  267,151  305,118  325,155  357,182  376,205  370,137  401,120 ",
        "cat": "uzemi",
        "fields": {
            "title": {
                "name": "title",
                "value": ""
            },
            "description": {
                "name": "description",
                "value": "Když se vám zachce, můžete tam spát i v práci."
            },
            "image": {
                "name": "image",
                "value": ""
            },
            "icon": {
                "name": "icon",
                "value": ""
            },
            "music": {
                "name": "music",
                "value": ""
            }
        }
    },
    {
        "word": "Kubíkie",
        "color": "red",
        "shape": " 100,15  110,48  116,93  165,86  237,80  283,51  293,14  358,21  353,73  395,109  450,105  488,127  541,107  558,126  555,157  583,177  589,225  624,252  617,278  624,304  657,340  643,376  653,400  629,426  690,471  717,473  724,455  776,471  810,484  769,539  827,565  908,571  957,570  958,5  102,5 ",
        "cat": "uzemi",
        "fields": {
            "title": {
                "name": "title",
                "value": ""
            },
            "description": {
                "name": "description",
                "value": "Krásná země, ale v jednom hradu se vyrábí moc sladká čokoláda. Je totiž mléčná."
            },
            "image": {
                "name": "image",
                "value": ""
            },
            "icon": {
                "name": "icon",
                "value": ""
            },
            "music": {
                "name": "music",
                "value": ""
            }
        }
    },
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
    },{"word":"Hořký hrad","color":"#ff8000","shape":" 179,200  205,200  205,172  179,172 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"image":{"name":"image","value":"icons/castle_towers.png"},"icon":{"name":"icon","value":"icons/castle_towers.png"},"music":{"name":"music","value":""},"description":{"name":"description","value":"Vyrábí se v něm hořké kafe a nesmí do něj Kubík, protože by se stal ohavným Taurem. Tak si dávejte moc velký pozor, pane králíku."}}},{"word":"Mořský hrad","color":"#ff8000","shape":" 922,42  955,42  955,3  922,3 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"image":{"name":"image","value":"icons/castle_old.png"},"icon":{"name":"icon","value":"icons/castle_old.png"},"music":{"name":"music","value":""},"description":{"name":"description","value":"Jiříkijský král nesmí otevírat zlatou skříňku."}}}, {"word":"Mostový hrad","color":"#ff8000","shape":" 149,397  179,397  179,366  149,366 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"description": {
                "name": "description",
                "value": "Nesmí tam Kubíkijský král, protože by ho to zaklelo a navždy by se stal zlým černokněžníkem. Nikdo by ho nedokázal zastavit, kromě záblesku Slunce."
            },"image":{"name":"image","value":"icons/castle_bridge.png"},"icon":{"name":"icon","value":"icons/castle_bridge.png"},"music":{"name":"music","value":""}}},{"word":"Mléčný hrad","color":"#ff8000","shape":" 719,379  743,379  743,357  719,357 ", "cat":"default", "fields":{"title":{"name":"title","value":""},"description": {
                "name": "description",
                "value": "Nesmí do něj Jiřík, protože by se stal ohavným tvorem, kterej chodí na nožičkách, stal by se třeba lvem. A už vy ho nikdo nezastavil, kromě tmy."
            },"image":{"name":"image","value":"icons/castle_paint.png"},"icon":{"name":"icon","value":"icons/castle_paint.png"},"music":{"name":"music","value":""}}}
]}];
  }
    
    getImgData(i){
        return this.imgData[i];
    }
    
    getSlides(i){
        return this.slideSets[i];
    }
}
 
    