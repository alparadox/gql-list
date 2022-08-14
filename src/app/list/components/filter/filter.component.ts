import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {MediaType} from "../../../../generated/graphql";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  public readonly filter = new FormGroup({
    search: new FormControl(null),
    type: new FormControl(null),
    format: new FormControl(null),
  });

  public MediaType = MediaType;

  public get searchTerm(): FormControl {
    return this.filter.get('search') as FormControl;
  }

  public get type(): FormControl {
    return this.filter.get('type') as FormControl;
  }

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  public onApply(): void {
    this.dataService.setFilter(this.filter.value);
    this.router.navigate(
      ['/list'],
      {queryParams: {page: 1, searchTerm: this.searchTerm.value, type: this.type.value}})
  }
}
