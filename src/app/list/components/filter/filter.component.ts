import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {MediaFormat, MediaType} from "../../../../generated/graphql";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  formats = MediaFormat;

  public readonly filter = new FormGroup({
    searchTerm: new FormControl(null),
    type: new FormControl(null),
    format_in: new FormControl(['MANGA', 'MOVIE', 'ONE_SHOT']),
  });

  public MediaType = MediaType;

  public get searchTerm(): FormControl {
    return this.filter.get('searchTerm') as FormControl;
  }

  public get type(): FormControl {
    return this.filter.get('type') as FormControl;
  }

  public get formatIn(): FormControl {
    return this.filter.get('format_in') as FormControl;
  }

  constructor(
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(queryParams => {
      const searchTerm = queryParams.get('searchTerm');
      const type = queryParams.get('type');
      const format_in = queryParams.getAll('format_in');

      this.filter.setValue({
        searchTerm, type, format_in
      }, { emitEvent: true });
    });
  }

  public onApply(): void {
    this.dataService.setFilter(this.filter.value);
    this.router.navigate(
      ['/list'],
      {queryParams: {page: 1, searchTerm: this.searchTerm.value, type: this.type.value, format_in: this.formatIn.value}})
  }
}
