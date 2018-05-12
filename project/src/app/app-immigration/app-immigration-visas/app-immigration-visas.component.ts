import {Component, OnInit} from '@angular/core';
import {AppWeb3VisaService} from "../../app-common/app-service/app-web3-visa.service";

@Component({
  selector: 'app-app-immigration-visas',
  templateUrl: './app-immigration-visas.component.html',
  styleUrls: ['./app-immigration-visas.component.css']
})
export class AppImmigrationVisasComponent implements OnInit {
  visas: any[] = [];
  ethAddress: string;

  constructor(private appWeb3VisaSvc: AppWeb3VisaService) {
    this.ethAddress = localStorage.getItem('ethAddress');
  }

  ngOnInit() {
    this.appWeb3VisaSvc
      .findAll(this.ethAddress)
      .subscribe(
        visa => this.visas.push(visa),
        error => console.error("Unable to find all visas", error));
  }

  onAddClick() {
    this.appWeb3VisaSvc
      .create(this.ethAddress, "TST-001", "TEST 1")
      .subscribe(instance => this.visas.push(instance),
        error => {
          console.log("Unable to create visa", error);
        })
  }

  onDeleteClick() {
    alert("Not implemented");
  }

}
