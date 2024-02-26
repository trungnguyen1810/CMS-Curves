import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class BaoCaoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    BaoCaoKhachHangDangTap() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocao/khachhangdangtap`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    BaoCaoKhachHangChuaCoGoiTap() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocao/khachhangchuacogoitap`).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    BaoCaoKhachHangHetHan(body) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocao/khachhanghethan`,{TuNgay:body.TuNgay,DenNgay:body.DenNgay}).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    BaoCaoKhachHangMoiDangKyGoiTap(body) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocao/khachhangmoidangkygoitap`,{TuNgay:body.TuNgay,DenNgay:body.DenNgay}).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }

    BaoCaoDanhSachHoiVienThamGiaTapLuyen(body) {
      return new Promise(resolve => {
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/DanhSachHoiVienThamGiaTapLuyen`,body).subscribe(result => {
               if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
          })
      })
    }
    BaoCaoDanhSachHoiVienConHanKhongTap(body) {
      return new Promise(resolve => {
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/DanhSachHoiVienConHanKhongTap`,body).subscribe(result => {
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
