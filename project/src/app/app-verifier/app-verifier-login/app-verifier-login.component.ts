import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-verifier',
  templateUrl: './app-verifier-login.component.html',
  styleUrls: ['./app-verifier-login.component.css']
})
export class AppVerifierLoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClickSubmit(data) {
    localStorage.setItem('ethAddress', data.ethAddress);
    this.router.navigateByUrl('/verifier/' + data.ethAddress + '/documents');
  }
}
