import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, withLatestFrom } from 'rxjs/operators';
import { YoutubeService } from '../../core/services/youtube/youtube-common.service';
import { YoutubeFavouritesService } from '../../core/services/youtube/youtube-favourites.service';


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeComponent implements AfterViewInit {

  private maxScroll: number;

  @ViewChild('scrollContainer', {static: false}) scrollContainer: ElementRef<HTMLElement>;

  constructor(
    private youtubeService: YoutubeService,
    private youtubeFavouritesService: YoutubeFavouritesService,
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(
        debounceTime(100),
        withLatestFrom(
          this.youtubeService.videosLoaded$,
          this.youtubeService.filterQuery$,
          this.youtubeFavouritesService.favouritesMode$
        )
      )
      .subscribe(([event, isLoaded, filterQuery, favouritesMode]) => {
        this.calculateMaxScroll();

        if (
          !filterQuery &&
          !favouritesMode &&
          !isLoaded &&
          this.scrollContainer.nativeElement.scrollTop > this.maxScroll
        ) {
          this.youtubeService.getTopVideos();
        }
      });
  }

  private calculateMaxScroll() {
    this.maxScroll = this.scrollContainer.nativeElement.scrollHeight - this.scrollContainer.nativeElement.clientHeight - 200;
  }
}
