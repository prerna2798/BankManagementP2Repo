import { getTestBed, TestBed } from "@angular/core/testing";
import { User } from "../models/user";
import { LoginService } from "./login.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { config } from "../../environments/environment";
import { of } from "rxjs";


describe('LoginService', () => {
  let injector: TestBed;
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let user1 : User =
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

  let user2: User = {
   
      userName:'Thomas J',
      uId:'wrong',
      email:'thomas234@gmail.com',
      guardianType:'Father',
      guardianName:'Steve Jobs',
      address: '45 Church Road Los Angeles',
      password: 'wrong',
      confirmPassword: 'wrong',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [
        HttpClientTestingModule
      ]});
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LoginService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getUserById() should return user data for valid Id', () => {
    service.getUserById('R-800').subscribe(user => {
      expect(user).not.toBe(null);
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/getUser/R-800`);
    req.flush(user1);
  });

  it('getUserById() should return null for invalid Id', () => {
    service.getUserById('wrong').subscribe(user => {
      expect(user).toBe(null);
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/getUser/wrong`);
    req.flush(null);
  });

  it('Login() should return true for valid credentials', () => {
    service.login(user1).subscribe(result => {
      expect(result).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/login`);
    req.flush(user1);
  });

  it('Login() should return false for invalid credentials', () => {
    service.login(user1).subscribe(result => {
      expect(result).toBeFalsy();
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/login`);
    req.error(new ErrorEvent('Not Found'));
  });

  it('Register() should return true for valid user details', () => {
    service.register(user1).subscribe(result => {
      expect(result).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/register`);
    req.flush(of());
  });

  it('Register() should return false for invalid user details', () => {
    service.register(user2).subscribe(result => {
      expect(result).toBeFalsy();
    });
    const req = httpTestingController.expectOne(`${config.apiUrl}/register`);
    req.error(new ErrorEvent('Bad Request'))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

