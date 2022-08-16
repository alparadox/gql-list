import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EMPTY, Subject, switchMap, takeUntil} from "rxjs";
import {DataService} from "../../services/data.service";
import {Media, MediaListQueryVariables, PageInfo} from "../../../../generated/graphql";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  pageInfo!: PageInfo;
  data!: Media[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private cdr: ChangeDetectorRef,
  ) {
    this.route.queryParamMap
      .pipe(
        // takeUntil(this.destroy$),
        switchMap((queryParams: ParamMap) => {
          const currentPage = queryParams.get('page');
          const search = queryParams.get('search');
          const type = queryParams.get('type');
          const format_in = queryParams.getAll('format_in');
          // @ts-ignore
          this.dataService.setFilter({search, type, format_in});


          if (!currentPage) {
            this.router.navigate(['/list'], {queryParams: {page: 1}});
            return EMPTY;
          } else {
            const filter = this.dataService.getFilter();
            console.log('FILTER', filter)
            return this.dataService.getMediaList(+currentPage, filter);
          }
        }),

      )
      .subscribe(data => {
        this.pageInfo = data.data.Page?.pageInfo as PageInfo;
        this.dataService.setPageInfo(this.pageInfo);

        this.data = data.data.Page?.media as Media[];
        this.cdr.detectChanges();

      });
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadAnotherPage(step: 'next' | 'back'):void {
    // @ts-ignore
    const currentPage = +this.dataService.getPageInfo().currentPage;
    let page;
    if (step === 'next') {
      page = currentPage + 1;
    } else if (step === 'back') {
      page = currentPage - 1;
    }

    const queryParams: MediaListQueryVariables = {page};

    const filter = this.dataService.getFilter();

    if (filter.search) {
      queryParams.search = filter.search;
    }
    if (filter.type) {
      queryParams.type = filter.type;
    }


    this.router.navigate(['/list'], {queryParams});

  }
}
