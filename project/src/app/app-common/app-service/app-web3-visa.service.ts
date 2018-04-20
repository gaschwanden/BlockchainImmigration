import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";
import * as Visa from '../../../../build/contracts/Visa.json';
import * as TruffleContract from 'truffle-contract';

declare var window: any;

@Injectable()
export class AppWeb3VisaService {
  ABI_VISA = TruffleContract(Visa);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.ABI_VISA.setProvider(this.appWeb3Svc.currentProvider());
  }
}

