import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TestQueryGQL} from "../../../generated/graphql";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  constructor(
    private media: TestQueryGQL
  ) { }

  ngOnInit(): void {
    this.media.fetch({id: 15125}, {
      fetchPolicy: 'network-only'
    })
      .subscribe(data => {
        console.log(data)
      });
  }

}
