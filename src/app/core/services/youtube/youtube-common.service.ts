import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, of, Subscription } from 'rxjs';
import * as YOUTUBE from '../../../core/constants/google-api/youtube';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { IVideoListRequstOptions } from '../../interfaces/youtube-video.interface';
import { LocalStorageService } from '../local-storage.service';
import { asyncArrayPipe } from '../../utilities/rxjs.utilities';
import Video = gapi.client.youtube.Video;
import { GoogleApiService } from '../google-api/google-api.service ';
import { YoutubeApiService } from '../google-api/youtube-api.service';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private videosBehaviorSubject$ = new BehaviorSubject<Video[]>([]);
  private videosLoadingBehaviorSubject$ = new BehaviorSubject(false);
  private videosLoadedBehaviorSubject$ = new BehaviorSubject(false);
  private filterQueryBehaviorSubject$ = new BehaviorSubject('');

  private nextPageToken: string;
  private lastGetVideosRequestSub: Subscription;
  private videosAsyncEmitting = true;

  videosLoading$ = this.videosLoadingBehaviorSubject$.asObservable();
  videosLoaded$ = this.videosLoadedBehaviorSubject$.asObservable();
  filterQuery$ = this.filterQueryBehaviorSubject$.asObservable();

  videosFiltered$ =
    combineLatest(
      this.videosBehaviorSubject$,
      this.filterQueryBehaviorSubject$.pipe(debounceTime(250))
    )
      .pipe(
        map(([videoList, filterQuery]) =>
          videoList
            .filter(
              video => video.snippet.title.toLowerCase().includes(filterQuery.toLowerCase())
            )
        ),
        switchMap(data => iif(
          () => this.videosAsyncEmitting,
          of(data).pipe(asyncArrayPipe()),
          of(data)
        ))
      );

  constructor(
    private localStorageService: LocalStorageService,
    private googleApiService: GoogleApiService,
    private youtubeApiService: YoutubeApiService,
  ) {
    this.googleApiService.apiLoaded$.subscribe(() => this.getTopVideos());
  }

  setVideosAsyncEmitting(isAsync = true) {
    this.videosAsyncEmitting = isAsync;
  }

  filterVideosByTitle(query: string): void {
    this.setVideosAsyncEmitting(true);
    this.filterQueryBehaviorSubject$.next(query);
  }

  getTopVideos(clear = false): void {
    this.getVideos(
      {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: YOUTUBE.MAX_RESULTS,
        pageToken: clear ? null : this.nextPageToken,
      },
      clear
    );
  }

  getVideos(options: IVideoListRequstOptions, clear = false): void {
    if (!clear && this.videosLoadingBehaviorSubject$.value) {
      return;
    }

    this.videosLoadingBehaviorSubject$.next(true);

    if (clear) {
      this.videosBehaviorSubject$.next([]);

      if (this.videosLoadedBehaviorSubject$.value) {
        this.videosLoadedBehaviorSubject$.next(false);
      }
    }

    this.lastGetVideosRequestSub =
      this.youtubeApiService.getVideoList(options)
        .subscribe(
          response => {
            if (this.lastGetVideosRequestSub) {
              this.lastGetVideosRequestSub.unsubscribe();
            }

            this.videosLoadingBehaviorSubject$.next(false);

            const result = response.result.items;

            this.setVideosAsyncEmitting(clear);

            this.videosBehaviorSubject$.next(
              clear ?
                result :
                this.videosBehaviorSubject$.value.concat(result)
            );

            if (this.videosBehaviorSubject$.value.length === response.result.pageInfo.totalResults) {
              this.videosLoadedBehaviorSubject$.next(true);
            }

            this.nextPageToken = response.result.nextPageToken;
          },
          err => console.error('Execute error', err)
        );
  }
}
