import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { domSanitizerOptions } from '../../../../core/constants/dom-sanitizer.constant';
import { first } from 'rxjs/operators';
import Video = gapi.client.youtube.Video;
import { FormControl } from '@angular/forms';
import { YoutubeFavouritesService } from '../../../../core/services/youtube/youtube-favourites.service';


@Component({
  selector: 'app-youtube-video-item',
  templateUrl: './youtube-video-item.component.html',
  styleUrls: ['./youtube-video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideoItemComponent implements OnInit {

  @Input() video: Video;

  isTriggered = false;
  isFavourite: FormControl;

  get domSanitizerOptions() {
    return domSanitizerOptions;
  }

  constructor(
    private youtubeFavouritesService: YoutubeFavouritesService,
  ) { }

  ngOnInit(): void {
    this.youtubeFavouritesService.favouritesList$.pipe(first()).subscribe(
      favouritesList => this.isFavourite =  new FormControl(favouritesList.findIndex(item => item === this.video.id) !== -1)
    );

    this.isFavourite.valueChanges
      .subscribe(
        isFavourite => {
          if (isFavourite) {
            this.youtubeFavouritesService.addToFavourites(this.video.id);

          } else {
            this.youtubeFavouritesService.removeFromFavourites(this.video.id);
          }
        }
      );
  }

  onThumbClick(): void {
    this.isTriggered = true;
  }
}
