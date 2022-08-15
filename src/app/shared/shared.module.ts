import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    CheckboxComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
    exports: [
        InputComponent,
        RadioComponent,
        CheckboxComponent,
        DropdownComponent
    ]
})
export class SharedModule { }
