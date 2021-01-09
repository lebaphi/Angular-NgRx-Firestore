import { Exercise } from './exercise.model'
import { Subscription } from 'rxjs'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { take } from 'rxjs/operators'
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Training from './training.actions'
import { UIService } from '../shared/ui.service'

@Injectable()
export class TrainingService {
  private fsSubs: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  fetchAvailableExercise(): void {
    this.store.dispatch(new UI.StartLoading())
    this.fsSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              const {
                name,
                duration,
                calories
              } = doc.payload.doc.data() as Exercise
              return {
                id: doc.payload.doc.id,
                name,
                duration,
                calories
              }
            })
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading())
            this.store.dispatch(new Training.SetAvailableTraining(exercises))
          },
          err => {
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackBar(
              'Fetching exercises failed, please try again later',
              null,
              3000
            )
          }
        )
    )
  }

  fetchCompletedOrCancelledExercises(): void {
    this.store.dispatch(new UI.StartLoading())
    this.fsSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading())
            this.store.dispatch(new Training.SetFinishedTraining(exercises))
          },
          err => {
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackBar(
              'Fetching exercises failed, please try again later',
              null,
              3000
            )
          }
        )
    )
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise(): void {
    this.store
      .select(fromRoot.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDatatoDatabase({
          ...ex,
          date: new Date(),
          state: 'completed'
        })
        this.store.dispatch(new Training.StopTraining())
      })
  }

  cancelExercise(progress: number): void {
    this.store
      .select(fromRoot.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDatatoDatabase({
          duration: ex.duration * (progress / 100),
          calories: ex.duration * (progress / 100),
          ...ex,
          date: new Date(),
          state: 'cancelled'
        })
        this.store.dispatch(new Training.StopTraining())
      })
  }

  addDatatoDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise)
  }

  cancelSubscription(): void {
    this.fsSubs.forEach(sub => sub.unsubscribe())
  }
}
