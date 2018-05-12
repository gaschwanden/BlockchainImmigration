import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";
import * as Visa from '../../../../build/contracts/Visa.json';
import * as VisaRegistry from '../../../../build/contracts/VisaRegistry.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3VisaService {
  VISA = TruffleContract(Visa);
  VISA_REGISTRY = TruffleContract(VisaRegistry);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.VISA.setProvider(this.appWeb3Svc.currentProvider());
    this.VISA_REGISTRY.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress: string, visaCode: string, visaName: string): Observable<any> {
    let hexVisaCode = this.appWeb3Svc.toHex(visaCode);
    let hexVisaName = this.appWeb3Svc.toHex(visaName);
    return Observable.create(observer => {
      let visaAddress;
      this.VISA
        .new(visaCode, visaName, {from: ethAddress})
        .then(visa => {
          visaAddress = visa.address;
          return this.VISA_REGISTRY.deployed()
        })
        .then(registry => registry.addVisa(visaCode, visaAddress, {from: ethAddress}))
        .then(result => observer.next(result))
        .catch(error => observer.error(error));
    });
  }

  findAll(ethAddress: string): Observable<any> {
    return Observable.create(observer => {
      this.VISA_REGISTRY
        .deployed()
        .then(registry => registry.findAll({from: ethAddress}))
        .then(addresses => addresses.forEach(address => this.VISA.at(observer.next(address))))
        .catch(error => observer.error(error));
    });
  }

  findBy(visaCode: string, ethAddress: string): Observable<any[]> {
    return Observable.create(observer => {
      this.VISA_REGISTRY
        .deployed()
        .then(registry => {
          registry.findBy(visaCode, {from: ethAddress})
            .then(address => {
              observer.next(this.VISA.at(address));
            })
            .catch(error => observer.error(error));
        })
        .catch(error => observer.error(error));
    });
  }
}

