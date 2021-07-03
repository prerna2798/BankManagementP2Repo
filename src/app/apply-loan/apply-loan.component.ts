import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplyLoanService } from "../services/apply-loan.service";
import { UserLoan } from "../models/userLoan";

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyloanComponent implements AfterContentChecked {

  userLoan = new UserLoan();
  id : string;
  rate : number;
  minDate : string;
  isSubmitted : boolean = false;

  constructor(private cdref: ChangeDetectorRef, private loanService: ApplyLoanService, private route: ActivatedRoute, private router: Router) {
    var now = new Date();
    this.minDate = now.toISOString().substring(0, 10);
    this.id = this.route.snapshot.params['id'];
    this.userLoan.uId = this.id;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onClickSubmit(isValid: boolean): void {
    if (isValid) {
      this.userLoan.applyDate = this.userLoan.applyDate.toString();
      this.loanService.applyLoan(this.userLoan).subscribe(result => {
        if (result) {
          this.isSubmitted = true;
          this.router.navigate(['apply-loan-success', this.id]);
        }
      });
    }
  }

  calculateInterestRate() {  
    if (this.userLoan.loanType == "personal") {
      this.rate = 20;
    }
    else if (this.userLoan.loanType == "housing") {
      this.rate = 15;
    }
    else {
      this.rate = 10;
    }
    if (this.userLoan.loanType != null)
      this.userLoan.rateOfInterest = this.rate;
  }

}
