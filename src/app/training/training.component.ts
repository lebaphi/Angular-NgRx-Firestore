import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onGoingTraining: Observable<boolean>

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.onGoingTraining = this.store.select(fromRoot.getIsTraining)
  }
}
