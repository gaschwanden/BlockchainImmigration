import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AppWeb3ApplicantRegistryService} from "../../app-common/app-service/app-web3-applicant-registry.service";

@Component({
  selector: "app-app-applicant",
  templateUrl: "./app-applicant-login.component.html",
  styleUrls: ["./app-applicant-login.component.css"]
})
export class AppApplicantLoginComponent {
  constructor(private router: Router,
              private appWeb3ApplicantRegistrySvc: AppWeb3ApplicantRegistryService) {
  }

  onClickSubmit(data) {
    this.appWeb3ApplicantRegistrySvc.checkStatus(data.ethAddress)
      .subscribe(success => {
          if (success) {
            localStorage.setItem("ethAddress", data.ethAddress);
            localStorage.setItem("role", "Applicant");
            this.router.navigateByUrl("/applicant/" + data.ethAddress + "/documents");
          } else {
            alert("ETH Address is not registered as applicant.");
          }
        },
        error => alert("User is not registered applicant: " + error));
  }

}
