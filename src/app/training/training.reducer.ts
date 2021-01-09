import {
  TrainingActions,
  SET_AVAILABLE_TRAINING,
  SET_FINISHED_TRAINING,
  START_TRAINING,
  STOP_TRAINING
} from './training.actions'
import { Exercise } from './exercise.model'
import * as fromRoot from '../app.reducer'

export interface TrainingState {
  availableExercises: Exercise[]
  finishExercises: Exercise[]
  activeTraining: Exercise
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState = {
  availableExercises: [],
  finishExercises: [],
  activeTraining: null
}

export function trainingReducer(
  state = initialState,
  action: TrainingActions
): TrainingState {
  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableExercises: action.payload
      }
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finishExercises: action.payload
      }
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableExercises.find(ex => ex.id === action.payload)
        }
      }
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      }
    default:
      return state
  }
}

export const getAvailableExercises = (state: State) =>
  state.training.availableExercises
export const getFinishedExercises = (state: State) =>
  state.training.finishExercises
export const getActiveTraining = (state: State) => state.training.activeTraining
