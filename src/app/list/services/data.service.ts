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
  private _currentMediaList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public currentMediaList$: Observable<any> = this._currentMediaList$.asObservable();

  private _pageInfo$: BehaviorSubject<Partial<PageInfo>> = new BehaviorSubject<Partial<PageInfo>>({});
  public pageInfo$: Observable<Partial<PageInfo>> = this._pageInfo$.asObservable();

  private _filter$: BehaviorSubject<QueryMediaArgs> = new BehaviorSubject<QueryMediaArgs>({});
  public filter$: Observable<QueryMediaArgs> = this._filter$.asObservable();

  private perPage = 5;

  constructor(
    private mediaListGQL: MediaListGQL,
    private mediaItemGQL: MediaItemGQL
  ) { }


  public getMediaList(page: number, filter: QueryMediaArgs):  Observable<ApolloQueryResult<MediaListQuery>> {
    console.log('get DATA', page, filter)
    return this.mediaListGQL.watch({
      page,
      perPage: this.perPage,
      search: filter.search,
      type: filter.type
    }, {fetchPolicy: "cache-first"})
      .valueChanges
      .pipe(
        tap(data => {
          this._currentMediaList$.next(data.data.Page?.media);
        })
      )
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
