import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { TrainingComponent } from './training/training.component'
import { NewTrainingComponent } from './training/new-training/new-training.component'
import { PassTrainingComponent } from './training/pass-training/pass-training.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HeaderComponent } from './navigation/header/header.component'
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { CurrentTrainingComponent } from './training/current-training/current-training.component'
import { StopTrainingComponent } from './training/current-training/stop-training.component'
import { AuthService } from './auth/auth-service'
import { TrainingService } from './training/training.service'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { StoreModule } from '@ngrx/store'
import { environment } from 'src/environments/environment'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { UIService } from './shared/ui.service'
import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'
import { AuthRoutingModule } from './auth/auth-routing.module'
import { TrainingRoutingModule } from './training/training-routing.module'
import { reducers } from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PassTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    TrainingRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {}
