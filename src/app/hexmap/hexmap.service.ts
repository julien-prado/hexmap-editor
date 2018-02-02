import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { HexMap } from './hexmap';
import { Hexagon } from './hexagon';
import { Observable } from 'rxjs/Observable';
import { Generator, Options } from 'hexmap-lib';

@Injectable()
export class HexMapService {

  private _map: HexMap = new HexMap();
  private _ObsHexMap = new BehaviorSubject<HexMap>(this._map);
  private _Generator = new Generator({ seed: 30, patchSize: 20 });

  constructor() { }

  getMap(): BehaviorSubject<HexMap> {
    return this._ObsHexMap;
  }

  generate() {
    this._map.hexes = this._Generator.generate().reduce(function (accu, curr) {
      accu.push(new Hexagon(curr));
      return accu;
    }, []);
  }
}
