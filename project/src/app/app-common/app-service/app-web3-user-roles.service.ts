import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as UserRoles from '../../../../build/contracts/UserRoles.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3UserRolesService {

  USER_ROLES = TruffleContract(UserRoles);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.USER_ROLES.setProvider(this.appWeb3Svc.currentProvider());
  }

  findRoleFor(ethAddress): Observable<string> {
    return Observable.create(observer => {
      this.USER_ROLES
        .deployed()
        .then(instance => {
          return instance.findUser(ethAddress, {
            from: ethAddress
          });
        })
        .then(role => observer.next(role))
        .catch(error => observer.error(error));
    });
  }

  addRoleFor(ethAddress, role): Observable<boolean> {
    return Observable.create(observer => {
      this.USER_ROLES
        .deployed()
        .then(instance => instance.addRole(ethAddress, role, {
          from: ethAddress
        }))
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }

  isValidRole(ethAddress, role): Observable<boolean> {
    return Observable.create(observer => {
      this.USER_ROLES
        .deployed()
        .then(instance => instance.isValid(ethAddress, role, {
          from: ethAddress
        }))
        .then(isValid => observer.next(isValid))
        .catch(error => observer.error(error));
    });
  }

  removeRoleFor(ethAddress): Observable<boolean> {
    return Observable.create(observer => {
      this.USER_ROLES
        .deployed()
        .then(instance => instance.removeUser(ethAddress, {
          from: ethAddress
        }))
        .then(result => observer.next(true))
        .catch(error => observer.error(error));
    });
  }
}

