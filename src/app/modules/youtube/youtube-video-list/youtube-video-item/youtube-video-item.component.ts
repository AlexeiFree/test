import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import Video = gapi.client.youtube.Video;
import { FormControl } from '@angular/forms';
import { YoutubeFavouritesService } from '../../../../core/services/youtube/youtube-favourites.service';
import { DomSanitizerOptionsToken } from '../../../../core/di-tokens/dom-sanitizer.di-token';
import { DomSanitizerOptions } from '../../../../core/constants/dom-sanitizer.constant';


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

  constructor(
    private youtubeFavouritesService: YoutubeFavouritesService,
    @Inject(DomSanitizerOptionsToken) private domSanitizerOptions: DomSanitizerOptions,
  ) { }

  ngOnInit(): void {
    this.youtubeFavouritesService.favouritesList$.pipe(first()).subscribe(
      favouritesList => this.isFavourite = new FormControl(favouritesList.findIndex(item => item === this.video.id) !== -1)
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
