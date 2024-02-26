import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class DanhMucDiaBanService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAlldiaban() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/diaban/getall`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/diaban/Add_Edit`,data).subscribe(result => {
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

    XoaDiaBan(data){
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/diaban/delete/`+data.Id).subscribe(result => {
                resolve(result);                
            })
        })
    }




}