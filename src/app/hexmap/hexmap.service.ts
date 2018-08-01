import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { HexMap } from './hexmap';
import { Hexagon } from './hexagon';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Generator, Options } from 'hexmap-lib';

@Injectable()
export class HexMapService {
  private _ObsHexMap = new Subject<HexMap>();

  constructor() { }

  getMap(): Observable<HexMap> {
    return this._ObsHexMap.asObservable();
  }

  generate(opt: Options) {
    const map = new HexMap();
    const generator = new Generator(opt);
    map.hexes = generator.generate().reduce(function (accu, curr) {
      accu.push(new Hexagon(curr));
      return accu;
    }, []);
    this._ObsHexMap.next(map);
  }
}
