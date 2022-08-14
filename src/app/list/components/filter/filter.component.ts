import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  filter = new FormGroup({
    searchTerm: new FormControl(null),
    radio: new FormControl(null),
    multi: new FormControl(null),
  });

  public get searchTerm(): FormControl {
    return this.filter.get('searchTerm') as FormControl;
  }

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  public onApply(): void {
    this.dataService.setFilter(this.filter.value);
    this.router.navigate(['/list'], {queryParams: {page: 1, searchTerm: this.searchTerm.value}})
  }
}
