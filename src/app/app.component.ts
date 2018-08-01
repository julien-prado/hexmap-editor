import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HexMap } from './hexmap/hexmap';
import { HexMapService } from './hexmap/hexmap.service';
import { StageComponent } from './stage/stage.component';
import { profileIsland, profileDefault } from 'hexmap-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(StageComponent) stage: StageComponent;
  seed = 0;
  depth = 0;
  width = 30;
  height = 30;
  noiseImpact = 0.1;
  profiles: { name: string, profile: number[][][][] }[] = [
    { name: '', profile: null },
    {
      name: 'profileIsland',
      profile: profileIsland
    },
    {
      name: 'profileDefault',
      profile: profileDefault
    },

  ];
  selectedProfile: { name: string, profile: number[][][][] } = this.profiles[0];
  private map: HexMap;

  constructor(private _mapService: HexMapService) { }

  getMap(): void {
    this._mapService.getMap()
      .subscribe(map => {
        this.map = map;
        this.stage.updateMapLayer(this.map.hexes);
      });
  }

  generateMap() {
    this._mapService.generate({
      seed: this.seed,
      depth: this.depth,
      width: this.width,
      height: this.height,
      noiseImpact: this.noiseImpact,
      profile: this.selectedProfile.profile
    });
  }

  public ngOnInit() {
    this.getMap();
  }


}
