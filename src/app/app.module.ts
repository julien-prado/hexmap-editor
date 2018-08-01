import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HexMapService } from './hexmap/hexmap.service';
import { StageComponent } from './stage/stage.component';


@NgModule({
  declarations: [
    AppComponent,
    StageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HexMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
