import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {DataService} from "../../services/data.service";
import {Media, MediaItemQuery} from "../../../../generated/graphql";
import {ApolloQueryResult} from "@apollo/client/core";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  item$!: Observable<Media>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {

    this.item$ = this.route.paramMap
      .pipe(
        // @ts-ignore
        switchMap(params => this.dataService.getMediaItem(+params.get('id'))),
        map(data => data.data.Media as Media)
      )
  }

  public goBack():void {
    this.location.back();
  }

  public getBooleanLabel(flag: boolean | null | undefined): string {
    if (flag == null) {
      return 'UNKNOWN'
    } else {
      return flag ? 'YES' : 'NO';
    }
  }
}
