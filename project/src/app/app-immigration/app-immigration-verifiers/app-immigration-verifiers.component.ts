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
  public loading = false;
  docTypes = ["PROFESSIONAL", "PERSONAL"];

  constructor(private appWeb3VerifierRegistrySvc: AppWeb3VerifierRegistryService) {
    this.ethAddress = localStorage.getItem("ethAddress");
  }

  ngOnInit() {
    this.loading = true;
    //TODO we need a verifier contract
    this.appWeb3VerifierRegistrySvc
      .findAll(this.ethAddress)
      .subscribe(verifier => {
          this.loading = false;
          this.verifiers.push(verifier);
        },
        error => {
          alert("Unable to find verifiers: " + error)
          this.loading = false;
        });
  }

  onAddClick(data) {
    this.loading = true;
    this.appWeb3VerifierRegistrySvc
      .addVerifier(data.verifierAddress, this.ethAddress)
      .subscribe(this.addVerifier, this.showError);
  }

  private showError(error: any) {
    this.loading = false;
    alert("Unable to add the verifier: " + error);
  }

  private addVerifier(verifier: any) {
    this.loading = false;
    this.verifiers.push(verifier);
  }

  onDeleteClick() {
    alert("Not implemented");
  }

}
