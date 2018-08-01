import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Konva from 'konva';
import 'rxjs/add/observable/of';
import { StageConfig } from 'konva';
import { Output, Input } from '@angular/core/src/metadata/directives';
import { Hex } from 'hexmap-lib/dist/Hex';
import { Hexagon } from '../hexmap/hexagon';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stage') _stageElement: ElementRef;

  private _sceneWidth = 1;
  private _sceneHeight = 1;
  private _stage: Konva.Stage;
  private _mapLayers: Konva.Group[] = [];
  private _background: Konva.Layer;

  constructor(private _element: ElementRef) { }

  ngOnInit() {
    console.log('ngOnInit');
    this._stage = new Konva.Stage({
      container: this._stageElement.nativeElement,
      width: this.getRootWidth(),
      height: this.getRootWidth()
    });
    this._sceneWidth = this.getRootWidth();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this._stage.scaleX(this.getRootWidth() / this._sceneWidth);
    this._stage.scaleY(this.getRootWidth() / this._sceneWidth);

    this._background = new Konva.Layer({ name: 'background' });
    this._stage.add(this._background);
    this.initMapLayer();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this._stage.destroy();
  }

  private getRootWidth() { return this._stageElement.nativeElement.clientWidth; }
  private getRootHeight() { return this._stageElement.nativeElement.clientHeight; }

  initMapLayer() {
    const mapGroup = new Konva.Group({ x: 0, y: 0, width: this.getRootWidth(), height: this.getRootHeight(), listening: false });
    this._background.add(mapGroup);
    this._mapLayers.push(mapGroup);
  }

  updateMapLayer(layer: Hexagon[]) {
    const group = this._mapLayers[0];
    group.destroyChildren();
    layer.forEach(function (element) {
      group.add(new Konva.RegularPolygon({
        name: element.x + ':' + element.y,
        x: element.x,
        y: element.y,
        sides: 6,
        stroke: 'black',
        strokeWidth: 0.2,
        radius: element.radius,
        fill: element.fill
      }));
    });
    if (group.hasChildren()) {
      group.cache();
    }
    this._stage.batchDraw();
  }
}
