import { ActivatedRoute, Router } from '@angular/router';
import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Country } from '../models/Country';
import { CountryStateService } from '../services/country-state.service';
import { State } from '../models/state';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterContentChecked{

  isSubmitted: boolean = false;
  maxDate: string;
  countries: Country[];
  states: State[];
  guardianTypes = ['Father', 'Husband'];
  citizenshipTypes = ['Indian', 'Other'];
  maritalStat = ['Single', 'Married', 'Divorced', 'Widowed'];
  public citizenStatus = ['Minor', 'Normal', 'Senior'];
  invalidMessage = "";
  user = new User();

  constructor(private cdref: ChangeDetectorRef, private csService: CountryStateService, private dataService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.maxDate = new Date().toISOString().substring(0, 10);
    this.countries = this.csService.getCountries();
    this.onSelect(this.user.country);
  }

  ngAfterContentChecked() {

    this.cdref.detectChanges();
  }

  onSelect(country) {

    this.user.state = '';
    this.states = this.csService.getStates().filter((item) => item.countryName == country);
  }

  save(isValid: boolean): void {
    if (isValid) {
      if (this.user.age >= 18 && this.user.age <= 96) {
        this.invalidMessage = "";
        this.user.uId = this.GenerateUId();
        this.user.accountNumber = this.GenerateAccountNo();
        this.user.dob = this.user.dob.toString();
        this.dataService.register(this.user).subscribe(result => {
          if (result) {
            this.isSubmitted = true;
            this.router.navigate(['register-success', this.user.uId]);
          }
          
        });
        
      }
      else
        this.invalidMessage = "* The minimum age & maximum age limit for the opening account is 18 & 96 !"

    }
    else
      this.invalidMessage = "Please fill all the mandatory(*) details";
  }

  private GenerateUId() {
    return 'R-' + Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  private GenerateAccountNo() {
    return (Math.floor(Math.random() * (9 * Math.pow(10, 16 - 1))) + Math.pow(10, 16 - 1)).toString();
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
    let status = "";
    let ageYears = this.user.age;
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
