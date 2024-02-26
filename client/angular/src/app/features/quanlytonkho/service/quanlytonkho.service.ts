import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyTonKhoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/quanlytonkho_getall`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    GetThongTinSanPham(Id) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/getchitiet`,{Id:Id}).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/Add_Edit`,data).subscribe(result => {
                resolve(result);
            })
        })
    }
    EditAnhChiTiet(Id,AnhChiTiet,STT){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/Edit_AnhChiTiet`,{Id:Id,AnhChiTiet:AnhChiTiet,STT:STT}).subscribe(result => {
                resolve(result);
            })
        })
    }
    delete(Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/xoa`,{Id:Id}).subscribe(result => {
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

    saveSoluong(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/Add_SoLuong`,data).subscribe(result => {
                resolve(result);
            })
        })
    }
    nhanvien_check_admin() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/nhanvien_check_admin`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    console.log(result.data)
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }



}
