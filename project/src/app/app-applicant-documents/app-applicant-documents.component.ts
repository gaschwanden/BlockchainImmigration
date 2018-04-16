import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-app-applicant-dashboard',
  templateUrl: './app-applicant-documents.component.html',
  styleUrls: ['./app-applicant-documents.component.css']
})
export class AppApplicantDocumentsComponent implements OnInit {
  ethAddress: string;

  constructor() {
    this.ethAddress = localStorage.getItem('ethAddress');
  }

  ngOnInit() {
  }

}
