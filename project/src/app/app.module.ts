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
import {EthAddressValidatorDirective} from "./app-validators/eth-address-validator.directive";
import {AppApplicantDocumentsComponent} from "./app-applicant-documents/app-applicant-documents.component";

const APP_ROUTES: Routes = [
  {path: '', component: AppHomeComponent},
  // applicant routes
  {path: 'applicant', component: AppApplicantLoginComponent},
  {path: 'applicant/register', component: AppApplicantRegisterComponent},
  {path: 'applicant/:ethAddress/documents', component: AppApplicantDocumentsComponent},
  {path: 'applicant/:ethAddress/applications', component: AppApplicantDocumentsComponent},
  // verifier routes
  {path: 'verifier', component: AppVerifierLoginComponent},
  {path: 'verifier/:ethAddress/documents', component: AppApplicantDocumentsComponent},
  // immigration routes
  {path: 'immigration', component: AppImmigrationLoginComponent},
  {path: 'immigration/:ethAddress/applications', component: AppApplicantDocumentsComponent},
];

const COMPONENTS = [
  AppComponent,
  AppNavbarComponent,
  AppApplicantLoginComponent,
  AppVerifierLoginComponent,
  AppImmigrationLoginComponent,
  AppHomeComponent,
  AppApplicantRegisterComponent,
  AppApplicantDocumentsComponent,
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
