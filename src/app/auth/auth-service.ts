import { AuthData } from './auth-data.modal'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { TrainingService } from '../training/training.service'
import { UIService } from '../shared/ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'
import * as Auth from './auth.actions'

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ ui: fromRoot.State }>
  ) {}

  initAuthListener(): void {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated())
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscription()
        this.store.dispatch(new Auth.SetUnauthenticated())
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading())
    const { email, password } = authData
    this.afauth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading())
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackBar(err.message, null, 3000)
      })
  }

  login(authData: AuthData): void {
    this.store.dispatch(new UI.StartLoading())
    const { email, password } = authData
    this.afauth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading())
      })
      .catch(err => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackBar(err.message, null, 3000)
      })
  }

  logout(): void {
    this.afauth.signOut()
  }
}
