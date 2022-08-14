import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';



@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    RadioComponent,
    CheckboxComponent
  ]
})
export class SharedModule { }
