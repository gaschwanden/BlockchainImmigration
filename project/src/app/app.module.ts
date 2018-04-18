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
import {AppWeb3ArtifactService} from "./app-service/app-web3-artifact.service";
import {AppApplicantApplicationsComponent} from "./app-applicant-applications/app-applicant-applications.component";
import {AppWeb3ApplicationService} from "./app-service/app-web3-application.service";
import {AppVerifierDocumentsComponent} from "./app-verifier-documents/app-verifier-documents.component";
import {AppImmigrationApplicationsComponent} from "./app-immigration-applications/app-immigration-applications.component";

const APP_ROUTES: Routes = [
  {path: '', component: AppHomeComponent},
  // applicant routes
  {path: 'applicant', component: AppApplicantLoginComponent},
  {path: 'applicant/register', component: AppApplicantRegisterComponent},
  {path: 'applicant/:ethAddress/documents', component: AppApplicantDocumentsComponent},
  {path: 'applicant/:ethAddress/documents', component: AppApplicantDocumentsComponent},
  {path: 'applicant/:ethAddress/applications', component: AppApplicantApplicationsComponent},
  {path: 'applicant/:ethAddress/:application', component: AppApplicantDocumentsComponent},

  // verifier routes
  {path: 'verifier', component: AppVerifierLoginComponent},
  {path: 'verifier/:ethAddress/documents', component: AppVerifierDocumentsComponent},
  // immigration routes
  {path: 'immigration', component: AppImmigrationLoginComponent},
  {path: 'immigration/:ethAddress/applications', component: AppImmigrationApplicationsComponent},
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
  AppApplicantApplicationsComponent,
  AppVerifierDocumentsComponent,
  AppImmigrationApplicationsComponent,
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
  AppWeb3ArtifactService,
  AppWeb3ApplicationService,
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
