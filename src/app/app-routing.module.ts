import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/components/list/list.component";
import {CardComponent} from "./list/components/card/card.component";

const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'item/:id',
    component: CardComponent
  },
  { path: '**',   redirectTo: '/list'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
