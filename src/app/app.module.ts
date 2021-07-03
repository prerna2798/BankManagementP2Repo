import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ApplyloanComponent } from './apply-loan/apply-loan.component';
import { LoginService } from './services/login.service';
import { ApplyLoanService } from './services/apply-loan.service';
import { ApplyLoanSuccessComponent } from './apply-loan-success/apply-loan-success.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { EqualValidator } from './directives/equal-validator.directive';
import { CountryStateService } from './services/country-state.service';
import { AuthGuard } from './guards/auth.guard';
import { ComponentGuard } from './guards/component.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    RegisterSuccessComponent,
    ViewUserComponent,
    UpdateUserComponent,
    ApplyloanComponent,
    EqualValidator,
    ApplyLoanSuccessComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'profile/:id', component: ProfileComponent, canActivate: [ComponentGuard] },
      { path: 'register-success/:id', component: RegisterSuccessComponent },
      { path: 'view-user/:id', component: ViewUserComponent, canActivate: [ComponentGuard] },
      { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [ComponentGuard] },
      { path: 'applyloan/:id', component: ApplyloanComponent, canActivate: [ComponentGuard] },
      { path: 'apply-loan-success/:id', component: ApplyLoanSuccessComponent, canActivate: [ComponentGuard] }
    ])
  ],
  providers: [CountryStateService, LoginService, ApplyLoanService, AuthGuard, ComponentGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
