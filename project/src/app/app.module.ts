import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {AppNavbarComponent} from './app-common/app-navbar/app-navbar.component';
import {AppApplicantLoginComponent} from './app-applicant/app-applicant-login/app-applicant-login.component';
import {AppVerifierLoginComponent} from './app-verifier/app-verifier-login/app-verifier-login.component';
import {AppImmigrationLoginComponent} from './app-immigration/app-immigration-login/app-immigration-login.component';
import {AppHomeComponent} from './app-home/app-home.component';
import {AppApplicantRegisterComponent} from './app-applicant/app-applicant-register/app-applicant-register.component';
import {AppWeb3Service} from "./app-common/app-service/app-web3.service";
import {EthAddressValidatorDirective} from "./app-common/app-validators/eth-address-validator.directive";
import {AppApplicantDocumentsComponent} from "./app-applicant/app-applicant-documents/app-applicant-documents.component";
import {AppWeb3ArtifactService} from "./app-common/app-service/app-web3-artifact.service";
import {AppApplicantApplicationsComponent} from "./app-applicant/app-applicant-applications/app-applicant-applications.component";
import {AppWeb3ApplicationService} from "./app-common/app-service/app-web3-application.service";
import {AppVerifierDocumentsComponent} from "./app-verifier/app-verifier-documents/app-verifier-documents.component";
import {AppImmigrationApplicationsComponent} from "./app-immigration/app-immigration-applications/app-immigration-applications.component";
import {AppWeb3UserRolesService} from "./app-common/app-service/app-web3-user-roles.service";
import {AppWeb3VisaService} from "./app-common/app-service/app-web3-visa.service";

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
  AppWeb3UserRolesService,
  AppWeb3VisaService
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
