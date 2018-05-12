import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

declare var window: any;

@Injectable()
export class AppIpfsService {
  uri: string = environment.IPFSProvider;

  add(path: string) {

  }
}

