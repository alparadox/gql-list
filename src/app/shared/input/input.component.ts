import {Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {AbstractControl, FormControl, NgControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, startWith, Subject, takeUntil} from "rxjs";
import {logMissingFieldErrors} from "@apollo/client/core/ObservableQuery";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnDestroy {
  public get value(): string {
    return this.ngControl.value;
  }


  public placeholderShow: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly ngControl: NgControl
  ) { }

  ngOnInit(): void {
    // @ts-ignore

    this.ngControl.control.valueChanges
      .pipe(
        // @ts-ignore
        startWith(this.ngControl.control.value),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {

        if (value?.length === 0 || value == null) {
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
