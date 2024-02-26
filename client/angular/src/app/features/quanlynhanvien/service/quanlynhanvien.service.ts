import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyNhanVienService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/user/getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    GetNhomQuyen() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/user/getnhomquyen`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    GetCauLacBo() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/user/getcaulacbo`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/user/Add_Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }
    XoaNhanVien(Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/user/Delete`,{Id:Id}).subscribe(result => {
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

   




}