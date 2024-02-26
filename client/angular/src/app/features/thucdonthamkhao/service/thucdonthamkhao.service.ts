import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class ThucDonThamKhaoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/getall`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/Add_Edit`,data).subscribe(result => {
                resolve(result);                
            })
        })
    }

    getDonVi(){
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/getDonVi`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    getDanhSachMonAn(){
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/getMonAn`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    getDanhSachMonAnEdit(Ngay,BuaId){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/getMonAnEdit`,{Ngay,BuaId}).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/delete`,{NgayThamKhao:data.NgayThamKhao,BuaId:data.BuaId}).subscribe(result => {
                resolve(result);                
            })
        })
    }
    XemChiTiet(Ngay,BuaId){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/XemChiTiet`,{Ngay:Ngay,BuaId:BuaId}).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }               
            })
        })
    }
    GetDanhSachBuaAnTheoNgay(Ngay){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/GetDanhSachBuaAnTheoNgay`,{Ngay:Ngay}).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }               
            })
        })
    }
    ThemMoiTenBuaAnTheoNgay(Ngay,TenBuaAn){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/ThemMoiTenBuaAnTheoNgay`,{Ngay:Ngay,TenBuaAn:TenBuaAn}).subscribe(result => {
                resolve(result)              
            })
        })
    }
    EditTenBuaAnTheoNgay(TenBuaAn,ThuTuSapXep,Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/EditTenBuaAnTheoNgay`,{TenBuaAn:TenBuaAn,ThuTuSapXep:ThuTuSapXep,Id:Id}).subscribe(result => {
                resolve(result)              
            })
        })
    }
    XoaBuaAnTheoNgay(Id){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/XoaBuaAnTheoNgay`,{Id:Id}).subscribe(result => {
                resolve(result)              
            })
        })
    }
    CopyThucDon(TuNgay,SangNgay){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/thucdonthamkhao/CopyThucDon`,{TuNgay:TuNgay,SangNgay:SangNgay}).subscribe(result => {
                resolve(result)              
            })
        })
    }
    


   




}