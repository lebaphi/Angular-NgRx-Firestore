import { Component, OnInit } from '@angular/core'
import { TrainingService } from '../training.service'
import { NgForm } from '@angular/forms'
import { Exercise } from '../exercise.model'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>
  isLoading: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading)
    this.exercises = this.store.select(fromRoot.getAvailableExercises)
    this.fetchExercises()
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercise()
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise)
  }
}
