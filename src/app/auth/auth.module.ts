import { NgModule } from '@angular/core'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { FlexLayoutModule } from '@angular/flex-layout'

NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: []
})

export class AuthModule {}
