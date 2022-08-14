import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';



@NgModule({
  declarations: [
    InputComponent,
    RadioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
