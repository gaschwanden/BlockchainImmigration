import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Artifact from '../../../../build/contracts/Artifact.json';
import * as UserArtifacts from '../../../../build/contracts/UserArtifacts.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ArtifactService {
  ARTIFACT = TruffleContract(Artifact);
  USER_ARTIFACTS = TruffleContract(UserArtifacts);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.ARTIFACT.setProvider(this.appWeb3Svc.currentProvider());
    this.USER_ARTIFACTS.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.ARTIFACT
        .new({
          from: ethAddress
        })
        .then(artifact => {
          this.USER_ARTIFACTS
            .deployed()
            .then(registry => {
              registry.registerArtifact(artifact.address, {from: ethAddress})
                .then(result => observer.next(artifact))
                .catch(error => observer.error(error));
            })
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }


  findAll(ethAddress: string):
    Observable<any[]> {
    return Observable.create(observer => {
      this.USER_ARTIFACTS
        .deployed()
        .then(factory => {
          factory.findUserArtifacts(ethAddress, {from: ethAddress})
            .then(addresses => {
              addresses.forEach(address => observer.next(this.ARTIFACT.at(address)));
            })
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }
}
