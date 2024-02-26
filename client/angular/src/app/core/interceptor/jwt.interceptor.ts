import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from '../constants/Const';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = (currentUser !=null&&currentUser!=undefined&&currentUser!='');
        const isApiUrl = request.url.startsWith(AppSettings.API_ENDPOINT);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    token:currentUser
                }
            });
            const cloned = request.clone({
                headers: request.headers.set("token",currentUser)
            });

            return next.handle(cloned);
        }else{
            return next.handle(request);
        }
    }
}