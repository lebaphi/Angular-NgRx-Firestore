import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'
import { AuthService } from '../../auth/auth-service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>()
  isAuth: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth = this.store.select(fromRoot.getIsAuth)
  }

  onClose(): void {
    this.closeSidenav.emit()
  }

  onLogout(): void {
    this.onClose()
    this.authService.logout()
  }
}
