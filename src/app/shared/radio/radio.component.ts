import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() value!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
