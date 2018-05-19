import {Component, OnInit} from '@angular/core';
import {AppWeb3ArtifactService} from "../../app-common/app-service/app-web3-artifact.service";
import {environment} from "../../../environments/environment";
import {ArtifactEntity} from "../../app-common/app-domain/app-artifact";
import {AppWeb3VerifierService} from "../../app-common/app-service/app-web3-verifier.service";
import {VerifierEntity} from "../../app-common/app-domain/app-verifier";

@Component({
	selector: 'app-app-applicant-dashboard',
	templateUrl: './app-applicant-documents.component.html',
	styleUrls: ['./app-applicant-documents.component.css']
})
export class AppApplicantDocumentsComponent implements OnInit {
	ethAddress: string;
	role: string;
	artifacts: ArtifactEntity[] = [];
	docTypes: string[];
	loading = false;
	verifiers: VerifierEntity[] = [];

	constructor(private appWeb3ArtifactSvc: AppWeb3ArtifactService,
				private addWeb3VerifierSvc: AppWeb3VerifierService) {
		this.ethAddress = localStorage.getItem('ethAddress');
		this.role = localStorage.getItem('role');
		this.docTypes = environment.docTypes;
	}

	ngOnInit() {
		this.loading = true;

		this.addWeb3VerifierSvc
			.findAll(this.ethAddress)
			.subscribe(verifier => this.verifiers.push(verifier),
				error => alert("Unable to get verifiers: " + error));

		this.appWeb3ArtifactSvc
			.findAll(this.ethAddress)
			.subscribe(artifact => {
					this.artifacts.push(artifact);
					this.loading = false;
				},
				error => {
					console.log("Error while finding artifacts", error);
					this.artifacts = [];
					this.loading = false;
				},
				() => this.loading = false);
	}

	onUploadClick(data) {
		this.loading = true;
		let artifact = new ArtifactEntity();
		artifact.name = data.documentName;
		artifact.ipfsHash = "test";
		artifact.isVerified = false;
		artifact.verifier = data.verifier;
		artifact.type = data.documentType;
		this.appWeb3ArtifactSvc
			.create(artifact, this.ethAddress)
			.subscribe(
				artifact => {
					this.loading = false;
					console.log(artifact);
					let idx = this.artifacts.findIndex(existing => existing.address === artifact.address);
					if (idx === -1) {
						this.artifacts.push(artifact);
					}
				},
				error => {
					this.loading = false;
					alert("Error while creating artifact: " + error);
				}, () => {
					this.loading = false;
				});
	}

	onDeleteClick() {
		// FIXME not sure if we want to expose delete on documents
	}

	onDepositClick(artifactAddress: string) {
		this.loading = true;
		this.appWeb3ArtifactSvc.depositVerifierFee(artifactAddress, this.ethAddress)
			.subscribe(balance => {
					let idx = this.artifacts
						.findIndex(artifact => artifact.address === artifactAddress);
					let artifact = this.artifacts[idx];
					this.artifacts.splice(idx, 1);
					artifact.verifierFee = balance;
					this.artifacts.push(artifact);
					this.loading = false;
				},
				error => {
					this.loading = false;
					alert("Unable to deposit verifier fee: " + error);
				});
	}
}
