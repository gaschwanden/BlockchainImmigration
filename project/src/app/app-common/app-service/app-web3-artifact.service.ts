import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Artifact from '../../../../build/contracts/Artifact.json';
import * as UserArtifacts from '../../../../build/contracts/UserArtifacts.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";
import {ArtifactEntity} from "../app-domain/app-artifact";
import {AppWeb3VerifierService} from "./app-web3-verifier.service";

declare var window: any;

@Injectable()
export class AppWeb3ArtifactService {
  ARTIFACT = TruffleContract(Artifact);
  USER_ARTIFACTS = TruffleContract(UserArtifacts);

  constructor(private appWeb3Svc: AppWeb3Service,
              private appWeb3VerifierSvc: AppWeb3VerifierService) {
    console.log("Injecting the provider");
    this.ARTIFACT.setProvider(this.appWeb3Svc.currentProvider());
    this.USER_ARTIFACTS.setProvider(this.appWeb3Svc.currentProvider());
  }

  userArtifact() {
    return this.USER_ARTIFACTS.deployed();
  }

  create(artifactEntity: ArtifactEntity, ethAddress: string): Observable<any> {
    return Observable.create(observer => {
      let userArtifact;
      //  //byte32 pName, bytes32 pLocation, address pVerifier, bytes32 pType
      this.userArtifact()
        .then(instance => {
          userArtifact = instance;
			return instance.createArtifact(artifactEntity.name,
            artifactEntity.ipfsHash, artifactEntity.verifier,
            artifactEntity.type, {from: ethAddress});
        })
        .then(result => userArtifact.findUserArtifacts(ethAddress))
		  .then(addresses => addresses.forEach(address => observer.next(this.addressToArtifactEntity(address))))
        .catch(error => observer.error(error));
    });
  }

  addressToArtifactEntity(address: string): ArtifactEntity {
    return this.toArtifactEntity(this.ARTIFACT.at(address));
  }

  findAll(ethAddress: string): Observable<ArtifactEntity> {
    return Observable.create(observer => {
      this.userArtifact()
        .then(factory => factory.findUserArtifacts(ethAddress, {from: ethAddress}))
        .then(addresses => {
          if (addresses.length > 0) {
            addresses.forEach(address => observer.next(this.addressToArtifactEntity(address)));
          } else {
            observer.complete();
          }
        })
        .catch(error => observer.error(error));
    });
  }

  verify(artifactAddress: string): Observable<any[]> {
    return Observable.create(observer => {
      let truffleArtifact = this.ARTIFACT.at(artifactAddress);
      truffleArtifact.setValid(true)
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }

  private toArtifactEntity(truffleArtifact: any): ArtifactEntity {
    let artifact = new ArtifactEntity();
    truffleArtifact.name()
      .then(value => artifact.name = this.appWeb3Svc.toString(value))
      .catch(error => console.log("Unable to get the name of the artifact: " + error));
    truffleArtifact.getUrl()
      .then(value => artifact.ipfsHash = this.appWeb3Svc.toString(value))
      .catch(error => console.log("Unable to get the IPFS hash of the artifact: " + error));
    truffleArtifact.is_valid()
      .then(value => artifact.isVerified = value)
      .catch(error => console.log("Unable to get the status of the artifact: " + error));
    truffleArtifact.verifier()
      .then(value => {
        artifact.verifier = value;
        return this.appWeb3VerifierSvc.findVerifierContract(value).name();
      })
      .then(name => artifact.verifierName = this.appWeb3Svc.toString(name))
      .catch(error => console.log("Unable to get the verifier address of the artifact: " + error));
    truffleArtifact.artifact_type()
      .then(value => artifact.type = this.appWeb3Svc.toString(value))
      .catch(error => console.log("Unable to get the type of the artifact: " + error));
    artifact.address = truffleArtifact.address;
    return artifact;
  }
}
