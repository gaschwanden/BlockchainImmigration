import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Artifact from '../../../../build/contracts/Artifact.json';
import * as ArtifactFactory from '../../../../build/contracts/ArtifactFactory.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ArtifactService {
  FACTORY = TruffleContract(ArtifactFactory);
  ARTIFACT = TruffleContract(Artifact);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.FACTORY.setProvider(this.appWeb3Svc.currentProvider());
    this.ARTIFACT.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.FACTORY
        .deployed()
        .then(factory => {
          return factory.create({
            from: ethAddress
          });
        })
        .then(artifact => {
          observer.next(artifact);
        })
        .catch(e => {
          console.error("Unable to create artifacts", e);
          observer.error(e)
        });
    });
  }

  findAll(ethAddress: string): Observable<string[]> {
    return Observable.create(observer => {
      this.appWeb3Svc
        .eth()
        .filter({
          fromBlock: 0,
          toBlock: 'latest',
          address: ethAddress
        })
        .get((error, transactions) => {
          transactions.forEach(tx =>
            observer.emit(this.appWeb3Svc.eth().getTransactionReceipt(tx.transactionHash)));
        });
    });
  }
}
