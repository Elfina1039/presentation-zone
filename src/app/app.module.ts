import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PortalComponent } from './portal/portal.component';
import { ImageComponent } from './image/image.component';
import { InteractionComponent } from './interaction/interaction.component';
//import { ControlsComponent } from './controls/controls.component';
import { AudioComponent } from './audio/audio.component';
import { CanvasControlsComponent } from './canvas-controls/canvas-controls.component';
import { PresentationComponent } from './presentation/presentation.component';




@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    PortalComponent,
    ImageComponent,
    InteractionComponent,
   // ControlsComponent,
    AudioComponent,
   CanvasControlsComponent,
   PresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
