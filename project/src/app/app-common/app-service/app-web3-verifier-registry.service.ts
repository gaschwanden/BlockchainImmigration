import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as VerifierRegistry from '../../../../build/contracts/VerifierRegistry.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3VerifierRegistryService {
  VERIFIER_REGISTRY = TruffleContract(VerifierRegistry);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.VERIFIER_REGISTRY.setProvider(this.appWeb3Svc.currentProvider());
  }

  checkStatus(ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => {
          return registry.getAdminStatus(ethAddress, {from: ethAddress});
        })
        .then(status => observer.next(status))
        .catch(error => observer.error(error));
    });
  }

  findAll(ethAddress: string): Observable<any> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.findAll({from: ethAddress}))
        .then(addresses => addresses.forEach(address => observer.next(address)))
        .catch(error => observer.error(error));
    });
  }

  addVerifier(verifierAddress: string, ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.addVerifier(verifierAddress, {from: ethAddress}))
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }

  changeStatus(ethAddress: string, active: boolean): Observable<boolean> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.changeStatus(ethAddress, active, {from: ethAddress}))
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }
}
