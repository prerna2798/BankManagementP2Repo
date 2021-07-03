import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../models/Country';
import { State } from '../models/state';
import { User } from '../models/user';
import { CountryStateService } from '../services/country-state.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements AfterContentChecked {
  isSubmitted: boolean = false;
  maxDate: string;
  index: number;
  uId: string;
  user: User = new User();
  guardianTypes = ['Father', 'Husband'];
  citizenshipTypes = ['Indian', 'Other'];
  maritalStat = ['Single', 'Married', 'Divorced', 'Widowed'];
  citizenStatus = ['Minor', 'Normal', 'Senior'];
  invalidMessage = "";
  countries: Country[];
  states: State[];

  constructor(private cdref: ChangeDetectorRef, private cscService: CountryStateService, private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
    this.maxDate = new Date().toISOString().substring(0, 10);
    this.countries = this.cscService.getCountries();
    this.onSelect(this.user.country);
    this.uId = this.route.snapshot.params['id'];
    this.loginService.getUserById(this.uId).subscribe(user => {
      if (user != null) {
        this.user = user;
      }
      else
        alert("on no");
    });
  }

  ngAfterContentChecked() {

    this.cdref.detectChanges();
  }



  onSelect(country) {
    this.user.state = '';
    this.states = this.cscService.getStates().filter((item) => item.countryName == country);
  }

  save(isValid: boolean): void {
    if (isValid) {
      this.invalidMessage = "";
      if (this.user.age >= 16 && this.user.age <= 96) {
        this.invalidMessage = "";
        this.user.dob = this.user.dob.toString();
        this.loginService.updateUser(this.user).subscribe(result => {
          if (result) {
            this.isSubmitted = true;
            alert("Updated Successfully !");
            this.router.navigate(['/profile', this.uId]);
          }
        });
      }
      else
        this.invalidMessage = "* The minimum age & maximum age limit for the opening account is 18 & 96 !";
    }
    else
      this.invalidMessage = "Please fill all the mandatory(*) details";
  }

  public initialDeposit() {
    let deposit = null;
    if (this.user.accountType == 'Savings')
      deposit = 5000;
    else
      deposit = 0;
    if (this.user.accountType != null) {
      this.user.initDeposit = deposit;
    }
  }

  public ageCalculator() {
    const today = new Date();
    const birthDate = new Date(this.user.dob);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
    }
    if (this.user.dob != null) {
      this.user.age = ageYears;
    }
  }

  public statusCalculator() {
    let ageYears = this.user.age;
    let status = "";
    if (ageYears < 18)
      status = this.citizenStatus[0];
    if (ageYears >= 18 && ageYears <= 60)
      status = this.citizenStatus[1];
    if (ageYears > 60)
      status = this.citizenStatus[2];

    if (ageYears != null) {
      this.user.citizenStatus = status;
    }
  }

}
