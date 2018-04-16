import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-app-applicant',
  templateUrl: './app-applicant-login.component.html',
  styleUrls: ['./app-applicant-login.component.css']
})
export class AppApplicantLoginComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  onClickSubmit(data) {
    alert("Entered ETH Address : " + data.ethAddress);
  }

}
