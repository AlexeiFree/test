import { Pipe, PipeTransform } from '@angular/core';
import ThumbnailDetails = gapi.client.youtube.ThumbnailDetails;
import Thumbnail = gapi.client.youtube.Thumbnail;

@Pipe({
  name: 'youtubeVideoThumbnail'
})
export class YoutubeVideoThumbnailPipe implements PipeTransform {

  public transform(value: ThumbnailDetails): Thumbnail {
    if (value.maxres) {
      return value.maxres;

    } else if (value.standard) {
      return value.standard;

    } else if (value.high) {
      return value.high;

    } else if (value.medium) {
      return value.medium;

    } else if (value.default) {
      return value.default;
    }
  }
}
