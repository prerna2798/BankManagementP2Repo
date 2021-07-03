import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoan } from '../models/userLoan';
import { User } from '../models/user';
import { ApplyLoanService } from '../services/apply-loan.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-apply-loan-success',
  templateUrl: './apply-loan-success.component.html',
  styleUrls: ['./apply-loan-success.component.css']
})

export class ApplyLoanSuccessComponent implements OnInit {
  id: string;
  user: User = new User;
  userLoan: UserLoan = new UserLoan;

  constructor(private loanService: ApplyLoanService, private dataService: LoginService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.dataService.getUserById(this.id).subscribe(user => {
      if (user != null) {
        this.user = user;
      }
    });
    this.loanService.getLoanById(this.id).subscribe(userloan => {
      if (userloan != null) {
        this.userLoan = userloan;
      }
    });
  }

  onContinue(): void {
    this.router.navigate(['profile', this.id]);
  }

}
