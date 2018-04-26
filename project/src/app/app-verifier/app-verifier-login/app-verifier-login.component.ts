import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AppWeb3VerifierRegistryService} from "../../app-common/app-service/app-web3-verifier-registry.service";

@Component({
  selector: "app-app-verifier",
  templateUrl: "./app-verifier-login.component.html",
  styleUrls: ["./app-verifier-login.component.css"]
})
export class AppVerifierLoginComponent implements OnInit {

  constructor(private router: Router,
              private appWeb3VerifierRegistrySvc: AppWeb3VerifierRegistryService) {
  }

  ngOnInit() {
  }

  onClickSubmit(data) {
    this.appWeb3VerifierRegistrySvc.checkStatus(data.ethAddress)
      .subscribe(allowed => {
        if (allowed) {
          localStorage.setItem("ethAddress", data.ethAddress);
          localStorage.setItem("role", "Verifier");
          this.router.navigateByUrl("/verifier/" + data.ethAddress + "/documents");
        } else {
          alert("ETH Address is not registered verifier.");
        }
      }, error => console.log("Unable to check status of the user", error))
  }
}
