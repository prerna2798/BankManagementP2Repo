import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { FormBuilder, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterSuccessComponent } from "./register-success.component";


describe('Component: RegisterSuccess', () => {
  let component: RegisterSuccessComponent;
  let fixture: ComponentFixture<RegisterSuccessComponent>;

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
      imports: [FormsModule, RouterTestingModule],
      declarations: [RegisterSuccessComponent],
      providers: [FormBuilder, { provide: Router, useValue: MockRouter }, { provide: ActivatedRoute, useValue: activatedRouteMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

