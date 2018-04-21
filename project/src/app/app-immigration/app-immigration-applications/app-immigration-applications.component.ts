import {Component, OnInit} from '@angular/core';
import {AppWeb3ApplicationService} from "../../app-common/app-service/app-web3-application.service";

@Component({
  selector: 'app-app-immigration-applications',
  templateUrl: './app-immigration-applications.component.html',
  styleUrls: ['./app-immigration-applications.component.css']
})
export class AppImmigrationApplicationsComponent implements OnInit {
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
          console.error("Unable to find all application for: " + this.ethAddress, error);
          this.applications = [];
        });
  }
}

