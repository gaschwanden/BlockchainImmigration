import {Component, OnInit} from '@angular/core';
import {AppWeb3VisaService} from "../../app-common/app-service/app-web3-visa.service";
import {VisaEntity} from "../../app-common/app-domain/app-visa";

@Component({
  selector: 'app-app-immigration-visas',
  templateUrl: './app-immigration-visas.component.html',
  styleUrls: ['./app-immigration-visas.component.css']
})
export class AppImmigrationVisasComponent implements OnInit {
  visas: VisaEntity[] = [];
  ethAddress: string;

  constructor(private appWeb3VisaSvc: AppWeb3VisaService) {
    this.ethAddress = localStorage.getItem('ethAddress');
  }

  ngOnInit() {
    this.appWeb3VisaSvc
      .findAll(this.ethAddress)
      .subscribe(
        visa => {
          this.visas.push(visa);
        },
        error => console.error("Unable to find all visas", error));
  }

  onAddClick(data) {
    this.appWeb3VisaSvc
      .create(this.ethAddress, data.visaCode, data.visaName)
      .subscribe(instance => {
          console.log(instance);
          this.visas.push(instance);
        },
        error => {
          console.log("Unable to create visa", error);
        });
  }

  onDisableClick() {
    alert("Not implemented");
  }

}
