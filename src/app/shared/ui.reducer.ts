import { UIAction, START_LOADING, STOP_LOADING } from './ui.actions'
export interface State {
  isLoading: boolean
}

const initialState = {
  isLoading: false
}

export function uiReducer(state = initialState, action: UIAction): State {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      }
    case STOP_LOADING:
      return {
        isLoading: false
      }
    default:
      return state
  }
}

export const getIsLoaading = (state: State) => state.isLoading
