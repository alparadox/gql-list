import {Injectable} from '@angular/core';
import {
  MediaItemGQL,
  MediaItemQuery,
  MediaListGQL,
  MediaListQuery,
  PageInfo,
  QueryMediaArgs
} from "../../../generated/graphql";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _pageInfo$: BehaviorSubject<Partial<PageInfo>> = new BehaviorSubject<Partial<PageInfo>>({});

  private _filter$: BehaviorSubject<QueryMediaArgs> = new BehaviorSubject<QueryMediaArgs>({});

  private perPage = 5;

  constructor(
    private mediaListGQL: MediaListGQL,
    private mediaItemGQL: MediaItemGQL
  ) { }


  public getMediaList(page: number, _filter: QueryMediaArgs):  Observable<ApolloQueryResult<MediaListQuery>> {
    const filter: QueryMediaArgs = {};

    if (_filter.search) {
      filter.search = _filter.search;
    }

    if (_filter.type) {
      filter.type = _filter.type;
    }

    // @ts-ignore
    if (_filter.format_in.length > 0) {
      filter.format_in = _filter.format_in;
    }



    return this.mediaListGQL.watch({
      page,
      perPage: this.perPage,
      search: filter.search,
      type: filter.type,
      format_in: filter.format_in,
    }, {fetchPolicy: "cache-first"})
      .valueChanges
  }

  public setPageInfo(pageInfo: PageInfo): void {
    this._pageInfo$.next(pageInfo);
  }

  public getPageInfo(): Partial<PageInfo> {
    return this._pageInfo$.value;
  }

  public getMediaItem(id: number):  Observable<ApolloQueryResult<MediaItemQuery>> {
    return this.mediaItemGQL.watch({id}, {fetchPolicy: "cache-first"}).valueChanges
  }

  public getFilter(): QueryMediaArgs {
    return this._filter$.value;
  }

  public setFilter(filter: QueryMediaArgs): void {
    this._filter$.next(filter);
  }

}
