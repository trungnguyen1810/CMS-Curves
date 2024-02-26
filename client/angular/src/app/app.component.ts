import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './core/services/authentication.service';
// import { User } from './core/models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: string;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);       
    }
    
}
