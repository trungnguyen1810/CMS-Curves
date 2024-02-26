import { Directive,Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from    '../core/services/authentication.service';
@Directive()
export class BaseComponent implements OnInit {
  currentUser: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

}
