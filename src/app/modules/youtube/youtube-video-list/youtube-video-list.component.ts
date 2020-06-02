import { ChangeDetectionStrategy, Component } from '@angular/core';
import Video = gapi.client.youtube.Video;
import { YoutubeCommonService } from '../../../core/services/youtube/youtube-common.service';


@Component({
  selector: 'app-youtube-video-list',
  templateUrl: './youtube-video-list.component.html',
  styleUrls: ['./youtube-video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideoListComponent {

  get videosFiltered$() {
    return this.youtubeCommonService.videosFiltered$;
  }

  get videosLoading$() {
    return this.youtubeCommonService.videosLoading$;
  }

  constructor(
    private youtubeCommonService: YoutubeCommonService,
  ) { }

  videosTrackBy(index: number, video: Video) {
    return video.id;
  }
}
