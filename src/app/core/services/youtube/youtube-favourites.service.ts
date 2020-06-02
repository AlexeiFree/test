import { Inject, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { GoogleApiService } from '../google-api/google-api.service ';
import { YoutubeCommonService } from './youtube-common.service';
import { LocalStorageKeys } from '../../di-tokens/local-storage/local-storage-keys.di-token';
import { YOUTUBE_LIST_LIMIT } from '../../di-tokens/google-api/youtube.di-token';


@Injectable({
  providedIn: 'root'
})
export class YoutubeFavouritesService {
  private favouritesModeBehaviorSubject$ = new BehaviorSubject(false);
  private favouritesListBehaviorSubject$ = new BehaviorSubject<string[]>([]);

  favouritesMode$ = this.favouritesModeBehaviorSubject$.asObservable();
  favouritesList$ = this.favouritesListBehaviorSubject$.asObservable();

  constructor(
    private ngZone: NgZone,
    private localStorageService: LocalStorageService,
    private googleApiService: GoogleApiService,
    private youtubeCommonService: YoutubeCommonService,
    @Inject(LocalStorageKeys) private storageKeys: LocalStorageKeys,
    @Inject(YOUTUBE_LIST_LIMIT) private youtubeListLimit: number,
  ) {
    let favourites = this.localStorageService.getItem<string[]>(this.storageKeys.YOUTUBE_VIDEOS_FAVOURITES);

    if (!favourites) {
      favourites = [];

      this.localStorageService.setItem(storageKeys.YOUTUBE_VIDEOS_FAVOURITES, favourites);
    }

    this.favouritesListBehaviorSubject$.next(favourites);

    this.favouritesMode$
      .pipe(skip(1))
      .subscribe(
        value => {
          if (value) {
            this.getFavouritesVideos(true);

          } else {
            this.youtubeCommonService.getTopVideos(true);
          }
        }
      );

    this.favouritesList$.subscribe(
      favouritesList => this.localStorageService.setItem(storageKeys.YOUTUBE_VIDEOS_FAVOURITES, favouritesList)
    );
  }

  setFavouritesModes(favouritesModes: boolean): void {
    this.favouritesModeBehaviorSubject$.next(favouritesModes);
  }

  getFavouritesVideos(clear = false): void {
    const favourites = this.favouritesListBehaviorSubject$.value;

    this.youtubeCommonService.getVideos(
      {
        part: 'snippet',
        id: favourites.join(','),
        maxResults: this.youtubeListLimit,
      },
      clear
    );
  }

  addToFavourites(id: string) {
    this.favouritesListBehaviorSubject$.next(this.favouritesListBehaviorSubject$.value.concat(id));
  }

  removeFromFavourites(id: string) {
    this.favouritesListBehaviorSubject$.next(
      this.favouritesListBehaviorSubject$.value.filter(favourite => favourite !== id)
    );
  }
}
