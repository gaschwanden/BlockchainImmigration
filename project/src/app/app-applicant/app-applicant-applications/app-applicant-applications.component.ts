import {Component, OnInit} from '@angular/core';
import {AppWeb3ApplicationService} from "../../app-common/app-service/app-web3-application.service";

@Component({
  selector: 'app-app-applicant-applications',
  templateUrl: './app-applicant-applications.component.html',
  styleUrls: ['./app-applicant-applications.component.css']
})
export class AppApplicantApplicationsComponent implements OnInit {
  applications = [];
  role: string;
  ethAddress: string;
  loading = false;

  constructor(private appWeb3ApplicationSvc: AppWeb3ApplicationService) {
    this.ethAddress = localStorage.getItem('ethAddress');
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    this.loading = true;
    this.appWeb3ApplicationSvc
      .findAll(this.ethAddress)
      .subscribe(
        application => {
          this.loading = false;
          this.applications.push(application);
        },
        error => {
          this.loading = false;
          console.error("Unable to find all application", error);
          alert(error);
          this.applications = [];
        }, () => this.loading = false);
  }

  onCreateClick() {
    this.loading = true;
    this.appWeb3ApplicationSvc
      .create(this.ethAddress)
      .subscribe(
        application => {
          this.loading = false;
          this.applications.push(application);
        },
        error => {
          alert(error);
          this.loading = false;
          console.error("Unable to create new application", error)
        }, () => this.loading = false);
  }
}
