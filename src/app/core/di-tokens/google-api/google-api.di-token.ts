import { InjectionToken } from '@angular/core';
import { GOOGLE_API_KEY as GOOGLE_API_KEY_CONSTANT } from '../../constants/google-api/google-api.constant';


export const GOOGLE_API_KEY = new InjectionToken('Google Api Key', {
  providedIn: 'root',
  factory: () => GOOGLE_API_KEY_CONSTANT
});
