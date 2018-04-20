import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as RoleMapper from '../../../../build/contracts/RoleMapper.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3RoleMapperService {

  ABI_ROLE_MAPPER = TruffleContract(RoleMapper);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.ABI_ROLE_MAPPER.setProvider(this.appWeb3Svc.currentProvider());
  }

  get(ethAddress): Observable<any[]> {
    return Observable.create(observer => {
      this.ABI_ROLE_MAPPER
        .deployed()
        .then(instance => {
          instance.get(ethAddress, {
            from: ethAddress
          }).then((error, role) => {
            if (!error) {
              observer.next(role)
            } else {
              observer.error(error);
            }
          });
        })
        .catch(error => observer.error(error));
    });
  }
}

