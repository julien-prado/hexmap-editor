import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { KonvaComponent } from 'ng2-konva';
import { HexMap } from './hexmap/hexmap';
import 'rxjs/add/observable/of';
import { HexMapService } from './hexmap/hexmap.service';

declare const Konva: any;
let ng: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('stage') stage: KonvaComponent;
  @ViewChild('layer') layer: KonvaComponent;
  @ViewChild('dragLayer') dragLayer: KonvaComponent;
  private sceneWidth = 1;
  private sceneHeight = 1;

  private map: HexMap;
  public list: Array<any> = [];
  public configStage = Observable.of({
    width: this.getRootWidth(),
    height: this.getRootHeight(),
    draggable: false,
    dragBoundFunc: function (pos) {
      let newX = pos.x;
      let newY = pos.y;

      if (newX > 0 || this.width() > (this.scaleX() * this.sceneWidth)) {
        newX = 0;
      } else if (newX < this.width() - (this.scaleX() * this.sceneWidth)) {
        newX = this.width() - (this.scaleX() * this.sceneWidth);
      }
      if (newY > 0 || this.height() > (this.scaleY() * this.sceneHeight)) {
        newY = 0;
      } else if (newY < this.height() - (this.scaleY() * this.sceneHeight)) {
        newY = this.height() - (this.scaleY() * this.sceneHeight);
      }
      return {
        x: newX,
        y: newY
      };
    }
  });

  constructor(private myElement: ElementRef, private _mapService: HexMapService) { }

  getMap(): void {
    this._mapService.getMap()
        .subscribe(map => this.map = map);
  }

  private getRootWidth() { return this.myElement.nativeElement.clientWidth; }
  private getRootHeight() { return this.myElement.nativeElement.clientHeight; }

  public handleDragstart(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const dragLayer = ng.dragLayer.getStage();
    const stage = ng.stage.getStage();

    // moving to another layer will improve dragging performance
    shape.moveTo(dragLayer);
    stage.draw();

    ngComponent.config.next({
      shadowOffsetX: 15,
      shadowOffsetY: 15,
      scaleX: ngComponent.getConfig().startScale * 1.2,
      scaleY: ngComponent.getConfig().startScale * 1.2,
    });
  }

  public handleDragend(ngComponent: KonvaComponent) {
    const shape = ngComponent.getStage();
    const layer = ng.layer.getStage();
    const stage = ng.stage.getStage();

    shape.moveTo(layer);
    stage.draw();

    shape.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: ngComponent.getConfig().startScale,
      scaleY: ngComponent.getConfig().startScale,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  }

  public ngOnInit() {
    this._mapService.generate();
    this.getMap();
    ng = this;
    console.log(this.map);
    this.map.hexes.forEach(element => {
      this.list.push(
        new BehaviorSubject({
          name: element.q + ':' + element.r,
          q: element.q,
          r: element.r,
          x: element.x,
          y: element.y,
          sides: 6,
          stroke: 'black',
          strokeWidth: 0.2,
          radius: element.radius,
          fill: element.fill
        })
      );
    });
  }


}
