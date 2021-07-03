import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  id: string;
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  Profile() {
    this.id = this.loginService.loggedUser;
    this.router.navigate(['profile', this.id]);
  }

  View() {
    this.id = this.loginService.loggedUser;
    this.router.navigate(['view-user', this.id]);
  }

  Update() {
    this.id = this.loginService.loggedUser;
    this.router.navigate(['update-user', this.id]);
  }

  Loan() {
    this.id = this.loginService.loggedUser;
    this.router.navigate(['applyloan', this.id]);
  }

  checkLogin() {
    return this.loginService.isLoggedIn();
  }

  LogOut() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}
