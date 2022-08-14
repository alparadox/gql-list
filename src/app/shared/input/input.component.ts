import {Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnDestroy {

  @Input() control!: FormControl;

  public placeholderShow: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
      (value) => {
        if (value.length === 0) {
          this.placeholderShow = true;
        } else {
          this.placeholderShow = false;
        }
      }
    )
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
