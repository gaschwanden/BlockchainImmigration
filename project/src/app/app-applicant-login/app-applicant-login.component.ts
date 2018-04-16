import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-applicant',
  templateUrl: './app-applicant-login.component.html',
  styleUrls: ['./app-applicant-login.component.css']
})
export class AppApplicantLoginComponent {
  constructor(private router: Router) {
  }

  onClickSubmit(data) {
    localStorage.setItem('ethAddress', data.ethAddress);
    this.router.navigateByUrl('/applicant/' + data.ethAddress + '/documents');
  }

}
