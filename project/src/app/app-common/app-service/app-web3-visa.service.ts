import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";
import * as Visa from '../../../../build/contracts/Visa.json';
import * as VisaRegistry from '../../../../build/contracts/VisaRegistry.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";
import {VisaEntity} from "../app-domain/app-visa";

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
    return Observable.create(observer => {
      let visa;
      this.VISA
        .new(visaCode, visaName, {from: ethAddress})
        .then(instance => {
          visa = instance;
          return this.VISA_REGISTRY.deployed()
        })
        .then(registry => registry.addVisa(visaCode, visa.address, {from: ethAddress}))
        .then(result => observer.next(this.toVisaEntity(visa.address)))
        .catch(error => observer.error(error));
    });
  }

  findAll(ethAddress: string): Observable<any> {
    return Observable.create(observer => {
      this.VISA_REGISTRY
        .deployed()
        .then(registry => registry.findAll({from: ethAddress}))
        .then(addresses => addresses.forEach(address => observer.next(this.toVisaEntity(address))))
        .catch(error => observer.error(error));
    });
  }

  private toVisaEntity(address: string): VisaEntity {
    let truffleVisa = this.VISA.at(address);
    let visa = new VisaEntity();
    truffleVisa.visa_name()
      .then(value => visa.name = this.appWeb3Svc.toString(value))
      .catch(error => console.log("Unable to set visa name", error));
    truffleVisa.visa_code()
      .then(value => visa.code = this.appWeb3Svc.toString(value))
      .catch(error => console.log("Unable to set visa code", error));
    visa.address = truffleVisa.address;
    return visa;
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

