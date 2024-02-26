import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyTuDoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/quanlytudo/getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                  resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
  //   GetCauLacBo() {
  //     return new Promise(resolve => {
  //         this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/quanlytudo/getcaulacbo`).subscribe(result => {
  //             if (result['errorcode'] == 0) {
  //                 resolve(result.data.data);
  //             } else {
  //                 alert(result.message);
  //                 resolve([]);
  //             }
  //         })
  //     })
  // }
    saveData(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlytudo/Add_Edit`,data).subscribe(result => {
                resolve(result);
            })
        })
    }
    Xoa(Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlytudo/xoacauhinh`,{Id:Id}).subscribe(result => {
                resolve(result);
            })
        })

    }







}
