import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { config } from "../../environments/environment";
import { UserLoan } from "../models/userLoan";
import { ApplyLoanService } from "./apply-loan.service";


describe('ApplyLoanService', () => {
  let injector: TestBed;
  let service: ApplyLoanService;
  let httpTestingController: HttpTestingController;
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplyLoanService],
      imports: [
        HttpClientTestingModule
      ]});
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(ApplyLoanService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getLoanById() should return user loan details for valid Id', () => {
    service.getLoanById('R-800').subscribe(userloan => {
      expect(userloan).not.toBe(null);
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/getUserLoan/R-800`);
    req.flush(userLoan);
  });

  it('getLoanById() should return null for invalid Id', () => {
    service.getLoanById('wrong').subscribe(userloan => {
      expect(userloan).toBe(null);
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/getUserLoan/wrong`);
    req.flush(null);
  });

  it('applyLoan() should return true for valid loan request', () => {
    service.applyLoan(userLoan).subscribe(result => {
      expect(result).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/applyloan`);
    req.flush(of());
  });

  it('applyLoan() should return false for invalid loan request', () => {
    service.applyLoan(null).subscribe(result => {
      expect(result).toBeFalsy();
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/applyloan`);
    req.error(new ErrorEvent('Bad Request'))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

