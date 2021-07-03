import { ActivatedRoute, Router} from "@angular/router";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from "./profile.component";
import { LoginService } from "../services/login.service";
import { Observable, of } from "rxjs";
import { User } from "../models/user";


describe('Component: Profile', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

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
      params: { id: 'R-800' }
    },
  };

  let MockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProfileComponent],
      providers: [{ provide: Router, useValue: MockRouter }, { provide: ActivatedRoute, useValue: activatedRouteMock }, { provide: LoginService, useClass: MockLoginService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

