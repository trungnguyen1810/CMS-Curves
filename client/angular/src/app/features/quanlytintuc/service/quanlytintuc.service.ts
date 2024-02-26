import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyTinTucService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAlltintuc() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/tintuc/getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    GetAllMenu(){
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/tintuc/getallmenu`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    saveData(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/tintuc/Add_Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    upload(file){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/tintuc/upload`,file).subscribe(result => {
                resolve(result);                
            })
        })
    }

    XoaTinTuc(data){
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/tintuc/delete/`+data.Id).subscribe(result => {
                resolve(result);                
            })
        })
    }




}