import {Injectable} from '@angular/core';
import {AppWeb3Service} from "./app-web3.service";

import * as Artifact from '../../../build/contracts/Artifact.json';
import * as ArtifactFactory from '../../../build/contracts/ArtifactFactory.json';
import * as TruffleContract from 'truffle-contract';
import {Observable} from "rxjs/Observable";

declare var window: any;

@Injectable()
export class AppWeb3ArtifactService {
  FACTORY = TruffleContract(ArtifactFactory);
  ARTIFACT = TruffleContract(Artifact);

  constructor(private appWeb3Svc: AppWeb3Service) {
    console.log("Injecting the provider");
    this.FACTORY.setProvider(this.appWeb3Svc.currentProvider());
  }

  create(ethAddress): Observable<any> {
    return Observable.create(observer => {
      this.FACTORY
        .deployed()
        .then(factory => {
          return factory.create({
            from: ethAddress
          });
        })
        .then(artifact => {
          observer.next(artifact);
        })
        .catch(e => {
          console.error("Unable to create artifacts", e);
          observer.error(e)
        });
    });
  }

  findAll(ethAddress: string): Observable<string[]> {
    return Observable.create(observer => {
      this.FACTORY
        .deployed()
        .then(factory => {
          return factory.findAll({
            from: ethAddress
          });
        })
        .then(artifacts => {
          console.log("Find all artifacts: " + artifacts);
          if (artifacts) {
            artifacts.forEach(artifact => observer.next(this.ARTIFACT.at(artifact)));
          } else {
            observer.next();
          }
        })
        .catch(e => {
          console.error("Unable to get any artifacts", e);
          observer.error(e)
        });
    });
  }
}
