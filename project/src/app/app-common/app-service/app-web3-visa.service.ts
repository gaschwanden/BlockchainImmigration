import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as VisaFactory from '../../../../build/contracts/VisaFactory.json';
import * as Visa from '../../../../build/contracts/Visa.json';
import * as TruffleContract from 'truffle-contract';

declare var window: any;

@Injectable()
export class AppWeb3VisaService {
  FACTORY = TruffleContract(VisaFactory);
  VISA = TruffleContract(Visa);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.FACTORY.setProvider(this.appWeb3Svc.currentProvider());
    this.VISA.setProvider(this.appWeb3Svc.currentProvider());
  }
}

