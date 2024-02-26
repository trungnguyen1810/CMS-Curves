import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable ,of, throwError} from 'rxjs';

import { AppSettings } from '../constants/Const';
@Injectable({ providedIn: 'root' })
export class CallApiService {
    constructor(private http: HttpClient) {   
    }   

    GetMethod(url:string,) {       
        return new Promise(resolve =>{
             this.http.get<any>(`${AppSettings.API_ENDPOINT}${url}`).subscribe(data => {                
                resolve(data);
            }) 
        })
               
    }
    PostMethod(obj:object,url) {       
        return new Promise(resolve =>{
             this.http.post<any>(`${AppSettings.API_ENDPOINT}${url}`,obj).subscribe(data => {                
                resolve(data);
            }) 
        })
               
    }

    
}