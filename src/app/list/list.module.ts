import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    FilterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListModule { }
