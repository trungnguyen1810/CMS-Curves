import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 export class LoginComponent implements OnInit {
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            window.location.href = '/'
            //this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        document.getElementById('header').style.display='none';
        document.getElementById('menu').style.display='none';
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    async onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        var data = await this.authenticationService.login(this.f.username.value, this.f.password.value);
        console.log(data);
        this.loading = false;
        if(data["errorcode"] == 0){
            document.getElementById('header').style.display='block';
            document.getElementById('menu').style.display='block';
            setTimeout(() => {
                window.location.href = this.returnUrl;
            }, 100);
           // this.router.navigate([this.returnUrl]);
        }else{
            this.error = data["message"];
        }
    }
}