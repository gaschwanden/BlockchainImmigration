import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {AppApplicantLoginComponent} from './app-applicant-login/app-applicant-login.component';
import {AppVerifierLoginComponent} from './app-verifier-login/app-verifier-login.component';
import {AppImmigrationLoginComponent} from './app-immigration-login/app-immigration-login.component';
import {AppHomeComponent} from './app-home/app-home.component';
import {AppApplicantRegisterComponent} from './app-applicant-register/app-applicant-register.component';
import {AppWeb3Service} from "./app-service/app-web3.service";
import {AppWeb3UtilsService} from "./app-service/app-web3-utils.service";
import {EthAddressValidatorDirective} from "./app-validators/eth-address-validator.directive";

const APP_ROUTES: Routes = [
  {path: '', component: AppHomeComponent},
  {path: 'applicant', component: AppApplicantLoginComponent},
  {path: 'applicant/register', component: AppApplicantRegisterComponent},

  {path: 'verifier', component: AppVerifierLoginComponent},
  {path: 'immigration', component: AppImmigrationLoginComponent},
];

const COMPONENTS = [
  AppComponent,
  AppNavbarComponent,
  AppApplicantLoginComponent,
  AppVerifierLoginComponent,
  AppImmigrationLoginComponent,
  AppHomeComponent,
  AppApplicantRegisterComponent,
  EthAddressValidatorDirective
];

const IMPORTS = [
  RouterModule.forRoot(
    APP_ROUTES,
    {enableTracing: true} // <-- debugging purposes only
  ),
  FormsModule,
  BrowserModule
];

const PROVIDERS = [
  AppWeb3Service,
  AppWeb3UtilsService,
];

const BOOTSTRAP = [AppComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: IMPORTS,
  providers: PROVIDERS,
  bootstrap: BOOTSTRAP
})
export class AppModule {
}
