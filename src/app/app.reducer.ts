import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store'
import * as fromUI from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reducer'
import * as fromTraining from './training/training.reducer'

export interface State {
  ui: fromUI.State
  auth: fromAuth.State
  training: fromTraining.TrainingState
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  training: fromTraining.trainingReducer
}

export const getUIState = createFeatureSelector<fromUI.State>('ui')
export const getIsLoading = createSelector(
  getUIState,
  fromUI.getIsLoaading
)
export const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
)
export const getTrainingState = createFeatureSelector<
  fromTraining.TrainingState
>('training')
export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: fromTraining.TrainingState) => state.availableExercises
)
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: fromTraining.TrainingState) => state.finishExercises
)
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: fromTraining.TrainingState) => state.activeTraining
)
export const getIsTraining = createSelector(
  getTrainingState,
  (state: fromTraining.TrainingState) => state.activeTraining !== null
)
