import { Router } from "@angular/router";
import { User } from "../models/user";
import { LoginService } from "../services/login.service";
import { HomeComponent } from "./home.component";
import { FormBuilder, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from "rxjs";


describe('Component: Home', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let MockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  class MockLoginService {
    mockUser: User=
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

    login(user: User): Observable<boolean> {
      return of((user.uId === this.mockUser.uId) && (user.password === this.mockUser.password));
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [HomeComponent],
      providers: [FormBuilder, { provide: Router, useValue: MockRouter }, { provide: LoginService, useClass: MockLoginService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('testing onSubmit() with valid credentials', () => {
    component.user.uId = "R-800";
    component.user.password = "P@ssw0rd";
    component.onSubmit();
    expect(component.isSubmitted).toBeTruthy();
  });

  it('testing onSubmit() with invalid credentials', () => {
    component.user.uId = "wrong";
    component.user.password = "wrong";
    component.onSubmit();
    expect(component.isSubmitted).toBeFalsy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

