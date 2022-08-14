import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  placeholderShow: boolean = true;

  input = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.input.valueChanges.subscribe(
      (value) => {
        if (value.length === 0) {
          this.placeholderShow = true;
        } else {
          this.placeholderShow = false;
        }
      }
    )
  }

}
