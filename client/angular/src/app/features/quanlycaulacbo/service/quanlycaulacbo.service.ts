import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyCauLacBoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/caulacbo/getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }

    GetTinhThanh() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/caulacbo/gettinhthanh`).subscribe(result => {
                console.log(result);
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }

    saveData(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/caulacbo/Add_Edit`,data).subscribe(result => {
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

    XoaCauLacBo(data){
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/caulacbo/delete/`+data.Id).subscribe(result => {
                resolve(result);                
            })
        })
    }




}