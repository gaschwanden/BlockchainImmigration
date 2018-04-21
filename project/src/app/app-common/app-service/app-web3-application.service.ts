import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Application from '../../../../build/contracts/Application.json';
import * as UserApplications from '../../../../build/contracts/UserApplications.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ApplicationService {
  APPLICATION = TruffleContract(Application);
  USER_APPLICATIONS = TruffleContract(UserApplications);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.APPLICATION.setProvider(this.appWeb3Svc.currentProvider());
    this.USER_APPLICATIONS.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.APPLICATION
        .new({
          from: ethAddress
        })
        .then(application => {
          this.USER_APPLICATIONS
            .deployed()
            .then(registry => {
              registry.registerApplication(application.address, {from: ethAddress})
                .then(result => observer.next(application))
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
      this.USER_APPLICATIONS
        .deployed()
        .then(registry => {
          registry.findUserApplications(ethAddress, {from: ethAddress})
            .then(addresses => {
              addresses.forEach(address => observer.next(this.APPLICATION.at(address)));
            })
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }
}
