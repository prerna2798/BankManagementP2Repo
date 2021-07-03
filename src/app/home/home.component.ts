import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  exportAs: 'authForm'
})

export class HomeComponent implements OnInit {
  invalidMessage: string;
  user: User = new User();
  isSubmitted = false;
  
  constructor(private loginService: LoginService, private router: Router){  
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }

  onSubmit() {
    this.loginService.login(this.user)
      .subscribe(success => {
        if (success) {
          this.invalidMessage = "";
          this.isSubmitted = true;
          this.router.navigate(['profile', this.user.uId]);
        }
        else {
          this.isSubmitted = false;
          this.invalidMessage = "Invalid Username or Password !";
        }
      });
  }

}
