import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";
import {Observable} from "rxjs/Observable";

const artifactContract = require('../../build/contracts/Artifact.json');
const contract = require('truffle-contract');

declare var window: any;

@Injectable()
export class AppWeb3ArtifactService {

  Artifact = contract(artifactContract);

  constructor(private appWeb3Svc: AppWeb3Service) {
    this.Artifact.setProvider(this.appWeb3Svc.web3.currentProvider);
  }

  getArtifacts(ethAddress: string): Observable<any> {
    return null;
  }
}
