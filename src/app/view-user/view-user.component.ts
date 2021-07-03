import { AfterContentChecked, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit{
  id: string;
  user: User = new User();
  isDataLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private viewService: LoginService) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.viewService.getUserById(this.id).subscribe(user => {
      if (user != null) {
        this.user = user;
        this.isDataLoaded = true;
      }
      else
        alert("on no");
    });
  }

  onReturning(): void {
    this.router.navigate(['/profile', this.id]);
  }

}
