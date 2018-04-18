import {inject, TestBed} from '@angular/core/testing';

import {AppWeb3RoleMapperService} from './app-web3-role-mapper.service';

describe('AppWeb3RoleMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppWeb3RoleMapperService]
    });
  });

  it('should be created', inject([AppWeb3RoleMapperService], (service: AppWeb3RoleMapperService) => {
    expect(service).toBeTruthy();
  }));
});
