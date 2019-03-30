import { Point } from './point';

export interface TransformSettings {
    globalAlpha?: number;
    center?: Point;
  //  origin: Point;
    maxScale: number;
    scale? : number;
    translate? : Point;
    rotate? : number;
    
}
