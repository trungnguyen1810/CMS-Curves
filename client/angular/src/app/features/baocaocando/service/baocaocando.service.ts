import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class BaoCaoCanDoService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

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
  DanhSachTangGiamCanNang(body) {
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/danhsachhoivientanggiamcan`,body).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/baocaohoivientanggiamcan`,body).subscribe(result => {
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
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/danhsachhoivientrehen`,body).subscribe(result => {
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
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/baocaohoivientrehen`,body).subscribe(result => {
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
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/danhsachhoiviencolichcando`,body).subscribe(result => {
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
        this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/baocaohoiviencolichcando`,body).subscribe(result => {
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
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/danhsachhoivientrehen`,body).subscribe(result => {
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
      this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/bao-cao-quan-ly-can-do/baocaobiendongcando`,body).subscribe(result => {
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
