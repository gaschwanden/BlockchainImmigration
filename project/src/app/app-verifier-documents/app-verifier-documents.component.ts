import {Component, OnInit} from '@angular/core';
import {AppWeb3ArtifactService} from "../app-service/app-web3-artifact.service";

@Component({
  selector: 'app-app-verifier-documents',
  templateUrl: './app-verifier-documents.component.html',
  styleUrls: ['./app-verifier-documents.component.css']
})
export class AppVerifierDocumentsComponent implements OnInit {
  ethAddress: string;
  artifacts = [];

  constructor(private appWeb3ArtifactSvc: AppWeb3ArtifactService) {
    this.ethAddress = localStorage.getItem('ethAddress');
  }

  ngOnInit() {
  }

  onVerifyClick() {
  }
}
