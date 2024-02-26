import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyMonAnService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        //get món ăn chính
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/monan/getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    GetMonAnPhu() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/monan/getmonanphu`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/monan/Add_Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    getDonVi(){
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/monan/getDonVi`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
   

    Xoa(data){
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/monan/delete/`+data.Id).subscribe(result => {
                resolve(result);                
            })
        })
    }
    XoaNhieuMon(strId){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/monan/deletenhieumonan`,{strId:strId}).subscribe(result => {
                resolve(result);                
            })
        })
    }
    
    Chuyen(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/monan/chuyenmonan`,{Id:data.Id}).subscribe(result => {
                resolve(result);                
            })
        })
    }
    Import(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/monan/import`,{data:data}).subscribe(result => {
                resolve(result);                
            })
        })
    }
   




}