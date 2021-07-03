import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onContinue(): void {
    this.router.navigate(['home']);
  }


}
