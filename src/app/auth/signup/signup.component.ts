import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../app.reducer'
import { AuthService } from '../auth-service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date
  isLoading: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date()
  }

  onSubmit(form: NgForm): void {
    this.isLoading = this.store.select(fromRoot.getIsLoading)
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
