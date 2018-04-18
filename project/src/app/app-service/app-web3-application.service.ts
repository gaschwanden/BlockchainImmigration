import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Application from '../../../build/contracts/Application.json';
import * as ApplicationFactory from '../../../build/contracts/ApplicationFactory.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ApplicationService {
  FACTORY = TruffleContract(ApplicationFactory);
  APPLICATION = TruffleContract(Application);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.FACTORY.setProvider(this.appWeb3Svc.currentProvider());
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
        .then(application => {
          observer.next(application);
        })
        .catch(e => {
          console.error("Unable to create applications", e);
          observer.error(e)
        });
    });
  }

  findAll(ethAddress: string): Observable<string[]> {
    return Observable.create(observer => {
      this.FACTORY
        .deployed()
        .then(factory => {
          return factory.findAll({
            from: ethAddress
          });
        })
        .then(applications => {
          console.log("All applications: " + applications);
          if (applications) {
            applications.forEach(application => observer.next(this.APPLICATION.at(application)));
          } else {
            observer.next();
          }
        })
        .catch(e => {
          console.error("Unable to get any applications", e);
          observer.error(e)
        });
    });
  }
}
