import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-app-verifier',
  templateUrl: './app-verifier-login.component.html',
  styleUrls: ['./app-verifier-login.component.css']
})
export class AppVerifierLoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onClickSubmit(data) {
    alert("Entered ETH Address : " + data.invalidEthAddress);
  }
}
