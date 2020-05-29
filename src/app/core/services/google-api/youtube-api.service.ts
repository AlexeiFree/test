import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideoListRequstOptions } from '../../interfaces/youtube-video.interface';
import { fromPromise } from 'rxjs/internal-compatibility';
import VideoListResponse = gapi.client.youtube.VideoListResponse;


@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  constructor(
    private ngZone: NgZone,
  ) { }

  getVideoList(options: IVideoListRequstOptions): Observable<gapi.client.Response<VideoListResponse>> {
    return new Observable(subscriber => {
      fromPromise(gapi.client.youtube.videos.list(options)).subscribe(
        response => this.ngZone.run(() => subscriber.next(response)),
        error => this.ngZone.run(() => subscriber.error(error))
      );
    });
  }
}
