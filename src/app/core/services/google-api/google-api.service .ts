import { Inject, Injectable, NgZone } from '@angular/core';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ReplaySubject } from 'rxjs';
import {GOOGLE_API_KEY} from '../../di-tokens/google-api/google-api.di-token';


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  private apiLoadedReplaySubject$ = new ReplaySubject(1);

  apiLoaded$ = this.apiLoadedReplaySubject$.asObservable();

  constructor(
    private ngZone: NgZone,
    @Inject(GOOGLE_API_KEY) private googleApiKey: string,
  ) {
    gapi.load('client', () => {
      this.loadClient();
    });
  }

  private loadClient(): void {
    gapi.client.setApiKey(this.googleApiKey);

    fromPromise(gapi.client.load('youtube', 'v3'))
      .subscribe(
        () =>
          this.ngZone.run(() => {
            this.apiLoadedReplaySubject$.next();
          }),
        err => console.error('Error loading GAPI client for API', err)
      );
  }
}
