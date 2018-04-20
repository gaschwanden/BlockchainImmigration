import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Application from '../../../../build/contracts/Application.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ApplicationService {
  ABI_APPLICATION = TruffleContract(Application);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.ABI_APPLICATION.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.ABI_APPLICATION.new({
        from: ethAddress,
        data: "Application"
      })
        .then(artifact => {
          observer.next(artifact);
        })
        .catch(e => {
          console.error("Unable to create application", e);
          observer.error(e)
        });
    });
  }

  findAll(ethAddress: string): Observable<string[]> {
    return Observable.create(observer => {
      this.appWeb3Svc.eth()
        .filter({
          fromBlock: 0,
          toBlock: 'latest',
          address: ethAddress,
          topics: ['Application']
        })
        .get((error, result) => {
          if (!error) {
            result.forEach(instance => observer.next(this.ABI_APPLICATION.at(instance)));
          } else {
            observer.error(error);
          }
        });
    });
  }
}
