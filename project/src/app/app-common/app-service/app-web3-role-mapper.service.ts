import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as RoleMapper from '../../../../build/contracts/RoleMapper.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3RoleMapperService {

  ROLE_MAPPER = TruffleContract(RoleMapper);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.ROLE_MAPPER.setProvider(this.appWeb3Svc.currentProvider());
  }

  get(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.ROLE_MAPPER
        .deployed()
        .then(factory => {
          return factory.get(ethAddress, {
            from: ethAddress
          });
        })
        .then(role => {
          observer.next(role);
        })
        .catch(e => {
          console.error("Unable to get role artifacts", e);
          observer.error(e)
        });
    });
  }
}

