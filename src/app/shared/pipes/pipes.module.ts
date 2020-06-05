import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';
import { YoutubeVideoThumbnailPipe } from './youtube-video-thumbnail.pipe';


@NgModule({
  declarations: [
    SafePipe,
    YoutubeVideoThumbnailPipe,
  ],
  imports: [],
  exports: [
    SafePipe,
    YoutubeVideoThumbnailPipe,
  ]
})

export class PipesModule { }
