import {Component, OnInit} from '@angular/core';
import {AppWeb3VerifierRegistryService} from "../../app-common/app-service/app-web3-verifier-registry.service";

@Component({
  selector: 'app-app-immigration-verifiers',
  templateUrl: './app-immigration-verifiers.component.html',
  styleUrls: ['./app-immigration-verifiers.component.css']
})
export class AppImmigrationVerifiersComponent implements OnInit {
  verifiers: any[];
  ethAddress: string;

  constructor(private appWeb3VerifierRegistrySvc: AppWeb3VerifierRegistryService) {
    this.ethAddress = localStorage.getItem("ethAddress");
  }

  ngOnInit() {
    //TODO we need a verifier contract
    this.appWeb3VerifierRegistrySvc
      .findAll(this.ethAddress)
      .subscribe(verifier => this.verifiers.push(verifier),
        error => alert("Unable to find verifiers: " + error));
  }

  onAddClick() {
    this.appWeb3VerifierRegistrySvc
      .addVerifier(this.ethAddress)
      .subscribe(verifier => this.verifiers.push(verifier),
        error => alert("Unable to add the verifier: " + error));
  }

  onDeleteClick() {
    alert("Not implemented");
  }

}
