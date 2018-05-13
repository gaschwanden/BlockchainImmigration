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

  findArtifacts(verifierWalletAddress: string): Observable<any> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.findOne(verifierWalletAddress))
        .then(address => {
          let verifier = this.VERIFIER.at(address);
          return verifier.getArtifacts();
        })
        .then(addresses => {
          if (addresses.length > 0) {
            addresses.forEach(address => observer.next(address));
          } else {
            observer.complete();
          }
        })
        .catch(error => observer.err(error));
    });
  }

  addArtifact(verifierWalletAddr: string, artifactAddress: string): Observable<any> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.findOne(verifierWalletAddr))
        .then(address => {
          let verifier = this.VERIFIER.at(address);
          verifier.addArtifact(artifactAddress);
        })
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }

  checkStatus(ethAddress: string): Observable<boolean> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.findOne(ethAddress))
        .then(address => {
          if (address) {
            this.VERIFIER.at(address).status()
              .then(status => observer._next(status))
              .catch(error => observer.error(error));
          } else {
            observer.complete();
          }
        })
        .catch(error => observer.error(error));
    });
  }

  findVerifierContract(verifierAddress: string): any {
    return this.VERIFIER.at(verifierAddress);
  }

  findOne(ethAddress: string): Observable<VerifierEntity> {
    return Observable.create(observer => {
      this.VERIFIER_REGISTRY
        .deployed()
        .then(registry => registry.findOne(ethAddress))
        .then(address => {
          if (address) {
            observer.next(this.addressToVerifierEntity(address));
          } else {
            observer.complete();
          }
        })
        .catch(error => observer.error(error));
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
      this.VERIFIER.new(verifierEntity.name, verifierEntity.wallet, verifierEntity.docTypes, {from: ethAddress})
        .then(instance => {
          verifier = instance;
          return this.VERIFIER_REGISTRY.deployed();
        })
        .then(registry => registry.addVerifier(verifierEntity.wallet, verifier.address, {from: ethAddress}))
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
    truffleVerifier.wallet()
      .then(value => verifier.wallet = value)
      .catch(error => console.log("Unable to set wallet of verifier: " + error));
    verifier.address = truffleVerifier.address;
    return verifier;
  }

  private addressToVerifierEntity(address: string): VerifierEntity {
    let truffleVerifier = this.VERIFIER.at(address);
    return this.toVerifierEntity(truffleVerifier);
  }
}
