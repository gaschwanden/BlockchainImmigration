import {Component, OnInit} from '@angular/core';
import {AppWeb3ArtifactService} from "../../app-common/app-service/app-web3-artifact.service";
import {AppWeb3RoleMapperService} from "../../app-common/app-service/app-web3-role-mapper.service";

@Component({
  selector: 'app-app-applicant-dashboard',
  templateUrl: './app-applicant-documents.component.html',
  styleUrls: ['./app-applicant-documents.component.css']
})
export class AppApplicantDocumentsComponent implements OnInit {
  ethAddress: string;
  role: any;
  artifacts = [];

  constructor(private appWeb3ArtifactSvc: AppWeb3ArtifactService,
              private appWeb3RoleMapperSvc: AppWeb3RoleMapperService) {
    this.ethAddress = localStorage.getItem('ethAddress');
  }

  ngOnInit() {
    this.appWeb3ArtifactSvc
      .findAll(this.ethAddress)
      .subscribe(
        artifact => {
          console.log(artifact);
          this.artifacts.push(artifact);
        },
        error => this.artifacts = []);

    this.appWeb3RoleMapperSvc
      .get(this.ethAddress)
      .subscribe(role => this.role = role);
  }

  onUploadClick() {
    this.appWeb3ArtifactSvc
      .create(this.ethAddress)
      .subscribe(
        artifact => {
          console.log(artifact);
          this.artifacts.push(artifact);
        });
  }

  onDeleteClick() {
    // FIXME not sure if we want to expose delete on documents
  }
}
