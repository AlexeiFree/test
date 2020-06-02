import { InjectionToken } from '@angular/core';
import { MAX_RESULTS } from '../../constants/google-api/youtube.constant';


export const YOUTUBE_LIST_LIMIT = new InjectionToken('Youtube list limit', {
  providedIn: 'root',
  factory: () => MAX_RESULTS
});
