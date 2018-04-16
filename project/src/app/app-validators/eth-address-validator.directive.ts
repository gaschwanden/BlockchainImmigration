import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";
import {AppWeb3UtilsService} from "../app-service/app-web3-utils.service";

@Directive({
  selector: '[invalidEthAddress]',
  providers: [{provide: NG_VALIDATORS, useExisting: EthAddressValidatorDirective, multi: true}]
})
export class EthAddressValidatorDirective implements Validator {
  constructor(private appWeb3UtilsSvc: AppWeb3UtilsService) {
  }

  validate(control: AbstractControl): { [key: string]: any } {
    console.log("Validating: " + control.value);
    return this.appWeb3UtilsSvc.isAddress(control.value) ?
      {'invalidEthAddress': {value: control.value}} : null;
  }
}
