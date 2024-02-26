import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyKhacHangcService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/getcogoitap`, data).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
            // this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/getcogoitap`).subscribe(result => {
            //     if (result['errorcode'] == 0) {
            //         resolve(result.data.data);
            //     } else {
            //         alert(result.message);
            //         resolve([]);
            //     }
            // })
        })
    }

    saveData(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/Add_Edit_CoGoiTap`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    importData(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/Import`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    ChangePass(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/ChangePass`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    upload(file) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/tintuc/upload`, file).subscribe(result => {
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

    Xoa(data) {
        return new Promise(resolve => {
            this.http.delete<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/delete/` + data.Id).subscribe(result => {
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

    GetCauLacBo_KhongPhanQuyen() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/GetCauLacBo_KhongPhanQuyen`).subscribe(result => {
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

    khachhang_tudo_insert(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachhang_tudo_insert`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    khachhang_baoluu_inser(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachhang_baoluu_inser`, data).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }

    khachang_chuyenphongtap_inser(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachang_chuyenphongtap_inser`, data).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }

    HuyKhachHang_TaoVoucher(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/HuyKhachHang_TaoVoucher`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    ChiTietHuyThanhVien(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/ChiTietHuyThanhVien`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    loadngayketthuc(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/loadngayketthuc`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    DanhSachThueTuDoTheoHoiVien(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/DanhSachThueTuDoTheoHoiVien`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    DanhSachGoiTapHoiVien(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/DanhSachGoiTapHoiVien`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    DanhSachTuDoTheoCLB(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/DanhSachTuDoTheoCLB`, data).subscribe(result => {
                resolve(result);
            })
        })
    }



    DanhSachSanPhamDaMua(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/DanhSachSanPhamDaMua`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    GetDanhSachSanPhamCLB() {
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/DanhSachSanPhamCLB`).subscribe(result => {
                resolve(result);
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
    DanhSachDonHangSanPham(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/DanhSachDonHangSanPhamKhachHang`, data).subscribe(result => {
                resolve(result);
            })
        })
    }
    XoaDonHang(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/sanphamclb/XoaDonHangSanPhamKhachHang`, data).subscribe(result => {
                resolve(result);
            })
        })
    }
    XoaTuDo(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/khachhang_tudo_delete`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    ThemMoiLichSuThanhToanGoiTap(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/ThemMoiLichSuThanhToanGoiTap`, data).subscribe(result => {
                resolve(result);
            })
        })
    }

    DanhSachThanhToanTheoDot_KhachHang(data) {
        return new Promise(resolve => {
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/DanhSachThanhToanTheoDot_KhachHang`, data).subscribe(result => {
            resolve(result);
          })
        })
      }
      XoaThanhToanGoiTap(data) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/khachhang/XoaThanhToanGoiTap`, data).subscribe(result => {
                resolve(result);
            })
        })
    }
}
