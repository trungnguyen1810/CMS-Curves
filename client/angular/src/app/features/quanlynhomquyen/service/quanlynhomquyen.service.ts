import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyNhomQuyenService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAllNhomQuyen() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/nhomquyen/getall`).subscribe(result => {
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
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/nhomquyen/getallmenu`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/nhomquyen/Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }
    XoaNhomQuyen(Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/nhomquyen/XoaNhomQuyen`,{Id:Id}).subscribe(result => {
                resolve(result);                
            })
        })
        
    }




}