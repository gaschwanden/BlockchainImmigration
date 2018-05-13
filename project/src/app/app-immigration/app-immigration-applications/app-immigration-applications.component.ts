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
  loading = false;

  constructor(private appWeb3ApplicationSvc: AppWeb3ApplicationService) {
    this.ethAddress = localStorage.getItem('ethAddress');
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
          alert("Unable to find all application for: " + this.ethAddress + "\n" + error);
          this.applications = [];
        });
  }
}

