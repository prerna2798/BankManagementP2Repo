import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserComponent } from "./update-user.component";
import { User } from "../models/user";
import { LoginService } from "../services/login.service";
import { CountryStateService } from "../services/country-state.service";
import { Observable, of } from "rxjs";



describe('Component: UpdateUser', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let user1: User = {
    userName: 'Martin Jacob',
    uId: null,
    email: 'martin234@gmail.com',
    guardianType: 'Father',
    guardianName: 'Steve Jacob',
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
    pan: '9088tytt4987',
    refName: 'Steeve Jacob',
    refAccountNo: '5600063211678820',
    refAddress: '23 Wiston Road Alaska',
    accountNumber: null
  };
  let user2: User = {
    userName: 'Bob',
    uId: null,
    email: 'Bob234@gmail.com',
    guardianType: 'Father',
    guardianName: 'Steve Jacob',
    address: '45 Church Road Los Angeles',
    password: 'P@ssw0rd',
    confirmPassword: 'P@ssw0rd',
    citizenship: 'Other',
    gender: 'Male',
    maritalStatus: 'Single',
    contact: '8811209400',
    dob: '2007-01-16',
    age: 14,
    citizenStatus: 'Normal',
    country: 'USA',
    state: 'Alaska',
    accountType: 'Savings',
    branchName: 'Alaska',
    initDeposit: 5000,
    identityProof: 'Aadhaar',
    pan: '9088tytt4987',
    refName: 'Martin J',
    refAccountNo: '5600063211678820',
    refAddress: '23 Wiston Road Alaska',
    accountNumber: null
  };

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

  class MockLoginService {
    updateUser(user: User): Observable<boolean> {
      return of(true);
    }

    getUserById(id: string): Observable<User> {
      return of(user1);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UpdateUserComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }, { provide: LoginService, useClass: MockLoginService }, { provide: Router, useValue: MockRouter }, CountryStateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save() should save the user when user details are valid', () => {
    component.user = user1;
    component.save(true);
    expect(component.isSubmitted).toBeTruthy();
  });

  it('save() should not save the user when user is under age', () => {
    component.user = user2;
    component.save(true);
    expect(component.isSubmitted).toBeFalsy();
  });

  it('save() should not save the invalid form details', () => {
    component.save(false);
    expect(component.isSubmitted).toBeFalsy();
  });

});
