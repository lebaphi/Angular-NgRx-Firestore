import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  AuthActions
} from './auth.actions'

export interface State {
  isAuthenticated: boolean
}

const initialState = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      }
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      }
    default:
      return state
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated
