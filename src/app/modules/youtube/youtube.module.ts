import { NgModule } from '@angular/core';
import { YoutubeComponent } from './youtube.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { YoutubeVideoListComponent } from './youtube-video-list/youtube-video-list.component';
import { YoutubeVideoListFilterComponent } from './youtube-video-list-filter/youtube-video-list-filter.component';
import { YoutubeVideoItemComponent } from './youtube-video-list/youtube-video-item/youtube-video-item.component';
import { PipesModule } from '../../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    YoutubeComponent,
    YoutubeVideoListComponent,
    YoutubeVideoListFilterComponent,
    YoutubeVideoItemComponent,
  ],
  imports: [
    BrowserModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [
    YoutubeComponent,
    YoutubeVideoListComponent,
    YoutubeVideoListFilterComponent,
    YoutubeVideoItemComponent,
  ]
})
export class YoutubeModule { }
