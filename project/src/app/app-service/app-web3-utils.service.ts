import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

@Injectable()
export class AppWeb3UtilsService {
  constructor(private appWeb2Svc: AppWeb3Service) {
  }

  isAddress(ethAddress: string): boolean {
    return this.appWeb2Svc.web3.utils.isAddress(ethAddress);
  }

}
