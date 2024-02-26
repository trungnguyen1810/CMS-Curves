import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyPhieuThuService {
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
  GetCauLacBo() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/getcaulacbo`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
  GetAllSanPham() {
    return new Promise(resolve => {
      this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/sanpham/getall`).subscribe(result => {
        if (result['errorcode'] == 0) {
          resolve(result.data.data);
        } else {
          alert(result.message);
          resolve([]);
        }
      })
    })
  }
  GetAllKhachHang() {
    return new Promise(resolve => {
      this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/quanlyphieuthu/getkhachhang`).subscribe(result => {
        if (result['errorcode'] == 0) {
          resolve(result.data.data);
        } else {
          alert(result.message);
          resolve([]);
        }
      })
    })
  }
  GetCauHinhTuDo() {
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
  GetGoiTap(khachhangid) {
    return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlyphieuthu/GetGoiTap`, { KhachHangId: khachhangid }).subscribe(result => {
        if (result['errorcode'] == 0) {
          resolve(result.data);
        } else {
          alert(result.message);
          resolve([]);
        }
      })
    })
  }
  saveDataGoiTap(data) {
    return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlyphieuthu/inphieuthugoitap`, data).subscribe(result => {
        resolve(result);
      })
    })
  }
  Xoa(Id) {
    return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/quanlytudo/xoacauhinh`, { Id: Id }).subscribe(result => {
        resolve(result);
      })
    })

  }
  TimKiem(body) {
    return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/timkiemdoanhthu`,body).subscribe(result => {
        if (result['errorcode'] == 0) {
          resolve(result.data);
        } else {
          alert(result.message);
          resolve([]);
        }
      })
    })
  }
  XuatBaoCao(body) {
    return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/xuatbaocaodoanhthu`,body).subscribe(result => {
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
