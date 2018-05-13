import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Verifier from '../../../../build/contracts/Verifier.json';
import * as VerifierRegistry from '../../../../build/contracts/VerifierRegistry.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";
import {VerifierEntity} from "../app-domain/app-verifier";

declare var window: any;

@Injectable()
export class AppWeb3VerifierService {
  VERIFIER_REGISTRY = TruffleContract(VerifierRegistry);
  VERIFIER = TruffleContract(Verifier);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.VERIFIER.setProvider(this.appWeb3Svc.currentProvider());
    this.VERIFIER_REGISTRY.setProvider(this.appWeb3Svc.currentProvider());
  }

  checkStatus(ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      let verifier = this.VERIFIER.at(ethAddress);
      if (verifier) {
        verifier.status()
          .then(status => observer.next(status))
          .catch(error => observer.error(error))
      } else {
        observer.error("Invalid verifier address")
      }
    });
  }

  findOne(ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      observer.next(this.addressToVerifierEntity(ethAddress));
    });
  }

  findAll(ethAddress: string): Observable<any> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.findAll({from: ethAddress}))
        .then(addresses => {
          if (addresses.length > 0) {
            addresses.forEach(address => observer.next(this.addressToVerifierEntity(address)));
          } else {
            observer.complete();
          }
        })
        .catch(error => observer.error(error));
    });
  }

  addVerifier(verifierEntity: VerifierEntity, ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      let verifier;
      this.VERIFIER.new(verifierEntity.name, verifierEntity.address, verifierEntity.docTypes, {from: ethAddress})
        .then(instance => {
          verifier = instance;
          return this.VERIFIER_REGISTRY.deployed();
        })
        .then(registry => registry.addVerifier(verifier.address, {from: ethAddress}))
        .then(result => observer.next(this.toVerifierEntity(verifier)))
        .catch(error => observer.error(error));
    });
  }

  changeStatus(verifierAddress: string, active: boolean, ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      let verifier = this.VERIFIER.at(verifierAddress);
      verifier.setStatus(active, {from: ethAddress})
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }

  private toVerifierEntity(truffleVerifier: any): VerifierEntity {
    let verifier = new VerifierEntity();
    truffleVerifier.name()
      .then(value => verifier.name = this.appWeb3Svc.toString(value))
      .catch(error => console.log("Unable to set name of verifier: " + error));
    truffleVerifier.status()
      .then(value => verifier.status = value)
      .catch(error => console.log("Unable to set status of verifier: " + error));
    truffleVerifier.getDocTypes()
      .then(values => values.forEach(value => verifier.docTypes.push(this.appWeb3Svc.toString(value))))
      .catch(error => console.log("Unable to set doc types of verifier: " + error));
    verifier.address = truffleVerifier.address;
    return verifier;
  }

  private addressToVerifierEntity(address: string): VerifierEntity {
    let truffleVerifier = this.VERIFIER.at(address);
    return this.toVerifierEntity(truffleVerifier);
  }
}
