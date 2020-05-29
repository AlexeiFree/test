import { Injectable } from '@angular/core';
import * as storageKeys from '../constants/local-storage-keys.constant';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getItem<T = any>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  isInArray(key: string, value): boolean {
    const array = this.getItem<string[]>(storageKeys.YOUTUBE_VIDEOS_FAVOURITES);

    if (!array) {
      return false;
    }

    const valueString = JSON.stringify(value);

    return array.findIndex(item => JSON.stringify(item) === valueString) !== -1;
  }

  addToArray(key: string, value): void {
    const array = this.getItem<string[]>(storageKeys.YOUTUBE_VIDEOS_FAVOURITES) || [];

    const valueString = JSON.stringify(value);

    if (array.findIndex(item => JSON.stringify(item) === valueString) === -1) {
      array.push(value);
    }

    this.setItem(key, array);
  }

  removeFromArray(key: string, value): void {
    const array = this.getItem<string[]>(storageKeys.YOUTUBE_VIDEOS_FAVOURITES);

    if (!array) {
      return;
    }

    const valueString = JSON.stringify(value);

    const deletingIndex = array.findIndex(item => JSON.stringify(item) === valueString);

    if (deletingIndex !== -1) {
      array.splice(deletingIndex, 1);

      this.setItem(key, array);
    }
  }
}
