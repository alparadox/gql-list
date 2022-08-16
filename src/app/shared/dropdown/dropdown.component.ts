import {Component, OnInit, ChangeDetectionStrategy, forwardRef} from '@angular/core';
import {MediaFormat} from "../../../generated/graphql";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface ICheckboxData {
  data: string;
  checked: boolean;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  public value: string[] | undefined;

  private onChange!: (value: string[]) => void;
  private onTouched!: () => void;

  public showDropdown = false;

  public formats: ICheckboxData[] = [];

  private formatsSet = new Set();


  constructor() {
    for (let mediaFormatKey in MediaFormat) {
      this.formats.push({
        // @ts-ignore
        data: String(MediaFormat[mediaFormatKey]),
        checked: false,
      });
    }
  }

  onItemChange(item: ICheckboxData) {
    if (item.checked) {
      this.formatsSet.add(item.data);
    } else {
      this.formatsSet.delete(item.data);
    }

    this.value = [];

    this.formatsSet.forEach(item => {
      // @ts-ignore
      this.value?.push(item);
    })

    this.onChange(this.value);
  }

  public writeValue(value: string[]): void {
    this.value = value;
    value.forEach(item => {
      this.formatsSet.add(item);
    })

    this.formats.forEach(format => {
      const index = value.findIndex(item => String(item) == String(format.data));

      if (index !== -1) {

        format.checked = true;
      }
    });

  }

  public registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
