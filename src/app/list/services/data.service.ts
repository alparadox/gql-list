import { Injectable } from '@angular/core';
import {Media, MediaListFragmentFragment, MediaListGQL, MediaListQuery, PageInfo} from "../../../generated/graphql";
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

  constructor(
    private mediaListGQL: MediaListGQL
  ) { }


  public getMediaList(page: number, perPage: number):  Observable<ApolloQueryResult<MediaListQuery>> {
    return this.mediaListGQL.watch({page, perPage}, {fetchPolicy: "cache-first"})
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


}
