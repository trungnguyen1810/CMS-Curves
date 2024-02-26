import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable ,of, throwError} from 'rxjs';

import { AppSettings } from '../constants/Const';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

     public get currentUserValue(): string {
         return this.currentUserSubject.value;
    }

    login(username: string, password: string) {       
        return new Promise(resolve =>{
             this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/user/login`, { TenDangNhap:username, MatKhau:password  }).subscribe(data => {
                if(data.errorcode==0){
                    localStorage.setItem('currentUser',data.data.token);
                    this.currentUserSubject.next(data.data.token);
                }
                resolve(data);
            }) 
        })
               
    }
    getDataHeader(){
        return new Promise(resolve =>{
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/user/getdataheader`).subscribe(data => {               
               resolve(data);
           }) 
       })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    
}