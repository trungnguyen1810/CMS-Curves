import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class BaoCaoHoiVienService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }
    GetCauLacBo() {
      return new Promise(resolve => {
          this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/getcaulacbo`).subscribe(result => {
              if (result['errorcode'] == 0) {
                  resolve(result.data);
              } else {
                  alert(result.message);
                  resolve([]);
              }
          })
      })
  }

  BaoCao_DanhSachKhachHangDangBaoLuu() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachKhachHangDangBaoLuu`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCao_DanhSachKhachHangHetHan() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachKhachHangHetHan`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
BaoCao_DanhSachKhachHangHuy() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachKhachHangHuy`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCao_DanhSachKhachHangHuy_KhoangTIME(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachKhachHangHuy_KhoangTIME`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachKhachHangChuyenCLB_KhoangTIME`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachHoiVienCoSinhNhat_KhoangTIME`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCao_DanhSachHoiVienSapHetHan_KhoangTime(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachHoiVienSapHetHan_KhoangTime`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
DanhSachVoucher_DaSuDung_KhoangTime(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/DanhSachVoucher_DaSuDung_KhoangTime`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

DanhSachThueTuDo() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/DanhSachThueTuDo`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCaoDanhSachThueTuDo_TheoKhoangTime(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCaoDanhSachThueTuDo_TheoKhoangTime`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCao_DanhSachKhachHangDangBaoLuu_TuNgay_DenNgay`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
BaoCaoDanhSachHoiVien_HenTra(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCaoDanhSachHoiVien_HenTra`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
  DanhSachTangGiamCanNang(body) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/danhsachhoivientanggiamcan`,body).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    BaoCaoHoiVienTangGiamCan(body) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/baocaohoivientanggiamcan`,body).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    DanhSachHoiVienTreHen(body) {
      return new Promise(resolve => {
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/danhsachhoivientrehen`,body).subscribe(result => {
              if (result['errorcode'] == 0) {
                  resolve(result.data);
              } else {
                  alert(result.message);
                  resolve([]);
              }
          })
      })
  }
  BaoCaoHoiVienTreHen(body) {
      return new Promise(resolve => {
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/baocaohoivientrehen`,body).subscribe(result => {
              if (result['errorcode'] == 0) {
                  resolve(result.data);
              } else {
                  alert(result.message);
                  resolve([]);
              }
          })
      })
  }
  DanhSachHoiVienCoLichCanDo(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/danhsachhoiviencolichcando`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
BaoCaoHoiVienCoLichCanDo(body) {
    return new Promise(resolve => {
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/baocaohoiviencolichcando`,body).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

DanhSachBienDongCacChiSo(body) {
  return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/danhsachhoivientrehen`,body).subscribe(result => {
          if (result['errorcode'] == 0) {
              resolve(result.data);
          } else {
              alert(result.message);
              resolve([]);
          }
      })
  })
}
BaoCaoBienDongCacChiSo(body) {
  return new Promise(resolve => {
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/baocaohoivientrehen`,body).subscribe(result => {
          if (result['errorcode'] == 0) {
              resolve(result.data);
          } else {
              alert(result.message);
              resolve([]);
          }
      })
  })
}


BaoCaoKhachHangTreHenTraNo_GoiTap() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCaoKhachHangTreHenTraNo_GoiTap`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}

BaoCaoKhachHangChuaVaCoGoiTap() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCaoKhachHangChuaVaCoGoiTap`).subscribe(result => {
            if (result['errorcode'] == 0) {
                resolve(result.data);
            } else {
                alert(result.message);
                resolve([]);
            }
        })
    })
}
BaoCaoKhachHangTiemNang() {
    return new Promise(resolve => {
        this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/baocaohoivien/BaoCaoKhachHangTiemNang`).subscribe(result => {
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
