import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as fromRoot from '../app.reducer'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1))
  }
}
