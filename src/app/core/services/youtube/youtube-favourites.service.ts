import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as YOUTUBE from '../../../core/constants/google-api/youtube';
import { skip } from 'rxjs/operators';
import * as storageKeys from '../../../core/constants/local-storage-keys.constant';
import { LocalStorageService } from '../local-storage.service';
import { GoogleApiService } from '../google-api/google-api.service ';
import { YoutubeService } from './youtube-common.service';


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
    private youtubeService: YoutubeService,
  ) {
    let favourites = this.localStorageService.getItem<string[]>(storageKeys.YOUTUBE_VIDEOS_FAVOURITES);

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
            this.youtubeService.getTopVideos(true);
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

    this.youtubeService.getVideos(
      {
        part: 'snippet',
        id: favourites.join(','),
        maxResults: YOUTUBE.MAX_RESULTS,
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
