import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITypedFormGroup } from '../../../core/interfaces/forms.interface';
import { TypedFormBuilder } from '../../../core/services/typed-form-builder.service';
import { YoutubeCommonService } from '../../../core/services/youtube/youtube-common.service';
import { YoutubeFavouritesService } from '../../../core/services/youtube/youtube-favourites.service';


interface IFilterFormModel {
  searchQuery: string;
  favouritesMode: boolean;
}

@Component({
  selector: 'app-youtube-video-list-filter',
  templateUrl: './youtube-video-list-filter.component.html',
  styleUrls: ['./youtube-video-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideoListFilterComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef<HTMLElement>;

  filterForm: ITypedFormGroup<IFilterFormModel>;

  constructor(
    private youtubeCommonService: YoutubeCommonService,
    private youtubeFavouritesService: YoutubeFavouritesService,
    private typedFormBuilder: TypedFormBuilder<IFilterFormModel>,
  ) {
    this.filterForm = this.typedFormBuilder.group({
      searchQuery: '',
      favouritesMode: false,
    });
  }

  ngOnInit(): void {
    this.filterForm.controls.favouritesMode.valueChanges
      .subscribe(
        value => this.youtubeFavouritesService.setFavouritesModes(value)
      );

    this.filterForm.controls.searchQuery.valueChanges
      .subscribe(
        value => {
          this.youtubeCommonService.filterVideosByTitle(value);
        }
      );
  }
}
