import { InjectionToken } from '@angular/core';
import * as localStorageKeys from '../../constants/local-storage-keys.constant';

export const LocalStorageKeys = new InjectionToken('LocalStorage Keys', {
  providedIn: 'root',
  factory: () => localStorageKeys
});

export type LocalStorageKeys = typeof localStorageKeys;
