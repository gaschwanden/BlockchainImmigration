import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Artifact from '../../../../build/contracts/Artifact.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ArtifactService {
  ARTIFACT = TruffleContract(Artifact);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.ARTIFACT.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.ARTIFACT.new({
        from: ethAddress
      }).then(artifact => observer.next(artifact))
        .catch(error => observer.error(error));
    });
  }

  findAll(ethAddress: string):
    Observable<any[]> {
    return Observable.create(observer => {
      this.appWeb3Svc.eth()
        .filter({
          fromBlock: 0,
          toBlock: 'latest',
          address: ethAddress,
          topics: ['Artifact']
        })
        .get((error, result) => {
          if (!error) {
            result.forEach(instance => observer.next(this.ARTIFACT.at(instance)));
          } else {
            observer.error(error);
          }
        });
    });
  }
}
