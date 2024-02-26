import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyKhachHangTiemNangService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/getall`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/insert`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    updateData(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/update`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    
    Xoa(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/delete`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    GetNguonKhachHang() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/getnguonkhachhang`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }

    DanhSachNhatKyTheoHoiVien(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/DanhSachNhatKyTheoHoiVien`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    ThemNhatKy(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/insertnhatky`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }
    SuaNhatKy(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/updatenhatky`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }
    XoaDiemCham(data){
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/quanlykhachhangtiemnang/delete/`+data.Id).subscribe(result => {
                resolve(result);                
            })
        })
    }
    GetCauLacBo() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/getcaulacbo`).subscribe(result => {
                // console.log(result['errorcode'])
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }


}