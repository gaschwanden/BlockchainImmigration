import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-app-immigration',
  templateUrl: './app-immigration-login.component.html',
  styleUrls: ['./app-immigration-login.component.css']
})
export class AppImmigrationLoginComponent {

  constructor(private router: Router) {
  }

  onClickSubmit(data) {
    localStorage.setItem('ethAddress', data.ethAddress);
    this.router.navigateByUrl('/immigration/' + data.ethAddress + '/applications');
  }

}
