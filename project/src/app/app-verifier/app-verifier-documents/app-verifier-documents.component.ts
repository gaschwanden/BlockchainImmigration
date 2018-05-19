import {Component, OnInit} from '@angular/core';
import {AppWeb3VerifierService} from "../../app-common/app-service/app-web3-verifier.service";
import {ArtifactEntity} from "../../app-common/app-domain/app-artifact";
import {AppWeb3ArtifactService} from "../../app-common/app-service/app-web3-artifact.service";

@Component({
  selector: 'app-app-verifier-documents',
  templateUrl: './app-verifier-documents.component.html',
  styleUrls: ['./app-verifier-documents.component.css']
})
export class AppVerifierDocumentsComponent implements OnInit {
  ethAddress: string;
  artifacts: ArtifactEntity[] = [];
  role: string;
  loading = false;

  constructor(private appWeb3VerifierSvc: AppWeb3VerifierService,
              private appWeb3ArtifactSvc: AppWeb3ArtifactService) {
    this.ethAddress = localStorage.getItem('ethAddress');
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    this.loading = true;
    this.appWeb3VerifierSvc
      .findArtifacts(this.ethAddress)
      .subscribe(artifactAddress => {
          this.loading = false;
			  this.artifacts.push(this.appWeb3ArtifactSvc.findOne(artifactAddress));
        },
        error => {
          this.loading = false;
          alert("Unable to find artifacts: " + error);
        },
        () => this.loading = false)
  }

  onVerifyClick(artifact: ArtifactEntity) {
    this.loading = true;
    this.appWeb3ArtifactSvc
		.verify(artifact.address, this.ethAddress)
      .subscribe(result => {
          this.loading = false;
          artifact.isVerified = true;
        }, error => {
          this.loading = false;
          alert("Unable to verify the artifact: " + error);
        },
        () => this.loading = false)
  }
}
