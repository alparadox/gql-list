import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./components/list/list.component";
import {FilterComponent} from "./components/filter/filter.component";
import {CardComponent} from "./components/card/card.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ListModule { }
