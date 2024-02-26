import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyThongBaoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/thongbao/getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    sendnotifi(Id,TieuDe,NoiDung, Type, IdThongBao) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thongbao/SendNotification`,{Id:Id,TieuDe:TieuDe,NoiDung:NoiDung, Type: Type, IdThongBao: IdThongBao}).subscribe(result => {
                resolve(result);
            })
        })
    }
    saveData(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thongbao/Add_Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }
    Xoa(Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thongbao/XoaThongBao`,{Id:Id}).subscribe(result => {
                resolve(result);                
            })
        })
        
    }

    LoadBaiViet(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thongbao/LoadBaiViet`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }
  

   




}