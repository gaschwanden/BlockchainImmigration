import {Component, OnInit} from '@angular/core';
import {AppWeb3ApplicationService} from "../../app-common/app-service/app-web3-application.service";

@Component({
  selector: 'app-app-applicant-applications',
  templateUrl: './app-applicant-applications.component.html',
  styleUrls: ['./app-applicant-applications.component.css']
})
export class AppApplicantApplicationsComponent implements OnInit {
  applications = [];
  ethAddress: string;

  constructor(private appWeb3ApplicationSvc: AppWeb3ApplicationService) {
    this.ethAddress = localStorage.getItem('ethAddress');
  }

  ngOnInit() {
    this.appWeb3ApplicationSvc
      .findAll(this.ethAddress)
      .subscribe(
        application => {
          this.applications.push(application);
        },
        error => {
          console.error("Unable to find all application", error);
          this.applications = [];
        });
  }

  onCreateClick() {
    this.appWeb3ApplicationSvc
      .create(this.ethAddress)
      .subscribe(
        application => {
          this.applications.push(application);
        },
        error => console.error("Unable to create new application", error));
  }
}
