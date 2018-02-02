import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { KonvaModule } from 'ng2-konva';
import { HexMapService } from './hexmap/hexmap.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KonvaModule
  ],
  providers: [HexMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
