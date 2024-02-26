import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyKhachHangNoneService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/getall`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/Add_Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    ChangePass(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/ChangePass`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    loadngayketthuc(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/loadngayketthuc`,data).subscribe(result => {
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

    Xoa(data){
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/delete/`+data.Id).subscribe(result => {
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

    GetGoiTap() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/getdanhsachgoitap`).subscribe(result => {
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

    khachhang_tudo_insert(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachhang_tudo_insert`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    khachhang_baoluu_inser(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachhang_baoluu_inser`,data).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result);
                } else {
                    alert(result.message);
                    resolve([]);
                }               
            })
        })
    }

    khachang_chuyenphongtap_inser(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachang_chuyenphongtap_inser`,data).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result);
                } else {
                    alert(result.message);
                    resolve([]);
                }               
            })
        })
    }

    QuanLyHoiVien_GetSucKhoe() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/QuanLyHoiVien_GetSucKhoe`).subscribe(result => {
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