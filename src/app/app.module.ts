import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from './core/pipes/pipes.module';
import { AppComponent } from './app.component';
import { YoutubeModule } from './modules/youtube/youtube.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PipesModule,
    YoutubeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
