import {Component, OnInit} from '@angular/core';
import {AppWeb3VerifierService} from "../../app-common/app-service/app-web3-verifier.service";
import {VerifierEntity} from "../../app-common/app-domain/app-verifier";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-app-immigration-verifiers',
  templateUrl: './app-immigration-verifiers.component.html',
  styleUrls: ['./app-immigration-verifiers.component.css']
})
export class AppImmigrationVerifiersComponent implements OnInit {
  verifiers: any[] = [];
  ethAddress: string;
  loading = false;
  role: string;
  docTypes: string[];

  constructor(private appWeb3VerifierSvc: AppWeb3VerifierService) {
    this.ethAddress = localStorage.getItem("ethAddress");
    this.role = localStorage.getItem('role');
    this.docTypes = environment.docTypes;
  }

  ngOnInit() {
    this.loading = true;
    //TODO we need a verifier contract
    this.appWeb3VerifierSvc
      .findAll(this.ethAddress)
      .subscribe(verifier => {
          this.loading = false;
          this.verifiers.push(verifier);
        },
        error => {
          alert("Unable to find verifiers: " + error)
          this.loading = false;
        },
        () => this.loading = false);
  }

  onAddClick(data) {
    this.loading = true;
    let verifier = new VerifierEntity();
    verifier.name = data.verifierName;
    verifier.wallet = data.verifierAddress;
    this.docTypes.forEach(docType => {
      if (data[docType] === true) {
        verifier.docTypes.push(docType);
      }
    });
    this.appWeb3VerifierSvc
      .addVerifier(verifier, this.ethAddress)
      .subscribe(verifier => {
          this.loading = false;
          this.verifiers.push(verifier);
        }, error => {
          this.loading = false;
          alert("Unable to add the verifier: " + error);
        },
        () => this.loading = false);
  }

  onStatusClick(verifierAddress: string, status: boolean) {
    this.loading = true;
    this.appWeb3VerifierSvc
      .changeStatus(verifierAddress, status, this.ethAddress)
      .subscribe(success => {
          this.loading = false;
          this.verifiers
            .filter(verifier => verifier.address === verifierAddress)[0]
            .status = status;
        }, error => {
          this.loading = false;
          alert("Unable to change the status verifier: " + error);
        },
        () => this.loading = false);
  }

}
