import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplyloanComponent } from "./apply-loan.component";
import { ApplyLoanService } from "../services/apply-loan.service";
import { UserLoan } from "../models/userloan";
import { Observable, of } from "rxjs";


describe('Component: Applyloan', () => {
  let component : ApplyloanComponent;
  let fixture: ComponentFixture<ApplyloanComponent>;
  let userLoan : UserLoan = {
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
    applyLoan(userloan: UserLoan): Observable<boolean> {
      return of(true);
    }
  }

  const activatedRouteMock = {
    snapshot: {
      data: {
        importantData: {
          content: 'Really Important String',
        },
      },
      params: { id: 'R-800' }
    },
  };

  let MockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ApplyloanComponent],
      providers: [FormBuilder, { provide: ActivatedRoute, useValue: activatedRouteMock }, { provide: Router, useValue: MockRouter }, { provide: ApplyLoanService, useClass: MockLoanService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onClickSubmit() with valid loan details', () => {
    component.userLoan = userLoan;
    component.onClickSubmit(true);
    expect(component.isSubmitted).toBeTruthy();
  });

  it('test onClickSubmit() with invalid loan details', () => {
    component.userLoan = userLoan;
    component.onClickSubmit(false);
    expect(component.isSubmitted).toBeFalsy();
  });

});
