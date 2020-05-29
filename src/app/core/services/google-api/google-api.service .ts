import {Injectable, NgZone} from '@angular/core';
import { GOOGLE_API_KEY } from '../../constants/google-api/google-api.constant';
import { fromPromise } from 'rxjs/internal-compatibility';
import {ReplaySubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  private apiLoadedReplaySubject$ = new ReplaySubject(1);

  apiLoaded$ = this.apiLoadedReplaySubject$.asObservable();

  constructor(
    private ngZone: NgZone,
  ) {
    gapi.load('client', () => {
      this.loadClient();
    });
  }

  private loadClient(): void {
    gapi.client.setApiKey(GOOGLE_API_KEY);

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
