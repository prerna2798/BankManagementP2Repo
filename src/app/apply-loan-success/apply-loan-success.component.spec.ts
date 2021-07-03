import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import {FormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplyLoanSuccessComponent } from "./apply-loan-success.component";
import { ApplyLoanService } from "../services/apply-loan.service";
import { Observable, of } from "rxjs";
import { UserLoan } from "../models/userLoan";
import { User } from "../models/user";


describe('Component: ApplyLoanSuccess', () => {
  let component: ApplyLoanSuccessComponent;
  let fixture: ComponentFixture<ApplyLoanSuccessComponent>;
  let userLoan: UserLoan = {
    uId: 'R-800',
    loanType: 'personal',
    loanAmount: '200000',
    applyDate: '09-09-2020',
    rateOfInterest: 10,
    loanDuration: '5',
    courseFee: null,
    courseName: null,
    fatherName: null,
    fatherOcc: null,
    fatherExp: null,
    rationCard: null,
    fatherInc: null,
    annualIncome: '400000',
    companyName: 'Cognizant',
    desig: 'PAT',
    totalExp: 1,
    currExp: 1
  }

  class MockLoanService {
    getLoanById(id: string): Observable<UserLoan> {
      return of(userLoan);
    }
  }

  class MockLoginService {
    mockUser: User =
      {
        userName: 'Thomas J',
        uId: 'R-800',
        email: 'thomas234@gmail.com',
        guardianType: 'Father',
        guardianName: 'Steve Jobs',
        address: '45 Church Road Los Angeles',
        password: 'P@ssw0rd',
        confirmPassword: 'P@ssw0rd',
        citizenship: 'Other',
        gender: 'Male',
        maritalStatus: 'Single',
        contact: '8811209877',
        dob: '2000-01-16',
        age: 21,
        citizenStatus: 'Normal',
        country: 'USA',
        state: 'Alaska',
        accountType: 'Savings',
        branchName: 'Alaska',
        initDeposit: 5000,
        identityProof: 'Aadhaar',
        pan: '1234tytt4987',
        refName: 'Martin P',
        refAccountNo: '5600063211678820',
        refAddress: '23 Wiston Road Alaska',
        accountNumber: '6700345528779000'
      };

    getUserById(id: string): Observable<User> {
      return of(this.mockUser);
    }
  }

  const activatedRouteMock = {
    snapshot: {
      data: {
        importantData: {
          content: 'Really Important String',
        },
      },
      params: {id:'R-800'}
    },
  };

  let MockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ApplyLoanSuccessComponent],
      providers: [{ provide: Router, useValue: MockRouter }, { provide: ActivatedRoute, useValue: activatedRouteMock }, { provide: ApplyLoanService, useClass: MockLoanService }, { provide: LoginService, useClass: MockLoginService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLoanSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

