import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AppSettings } from '../../../core/constants/Const';
@Injectable({ providedIn: 'root' })
export class QuanLyLichSuService {
    private currentUserSubject: BehaviorSubject<string>;
    public currentUser: Observable<string>;
    constructor(private http: HttpClient) {

    }

    GetAll(first,row,TenHoiVien,SoDienThoai,SoThe,ThangNam,NgayTap) {
        //get danh sách lịch sử luyện tập theo câu lạc bộ
        return new Promise(resolve => {
          const data1 = {
            first:first,
            row:row,
            TenHoiVien:TenHoiVien,
            SoDienThoai:SoDienThoai,
            SoThe:SoThe,
            ThangNam:ThangNam,
            NgayTap:NgayTap
          }
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/lichsuluyentap/getall`,data1).subscribe(result => {
                if (result['errorcode'] == 0) {
                    resolve(result.data);
                } else {
                    alert(result.message);
                    resolve([]);
                }
            })
        })
    }
    GetDanhSachHoiVien() {
        //get danh sách lịch sử luyện tập theo câu lạc bộ
        return new Promise(resolve => {
            this.http.get<any>(`${AppSettings.API_ENDPOINT}/admin/lichsuluyentap/gethoivien`).subscribe(result => {
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
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/lichsuluyentap/Add_Edit`,data).subscribe(result => {
                resolve(result);
            })
        })
    }

    QuetMaVach(SoThe){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/lichsuluyentap/getThongTinSoThe`,{SoThe:SoThe}).subscribe(result => {
                resolve(result);
            })
        })
    }


    Xoa(data){
        return new Promise(resolve => {
            this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/lichsuluyentap/delete`,{KhachHangId:data.HoiVienId,Id:data.Id}).subscribe(result => {
                resolve(result);
            })
        })
    }
    XuatBaoCao(body) {
      return new Promise(resolve => {
          this.http.post<any>(`${AppSettings.API_ENDPOINT}/admin/lichsuluyentap/BaoCao`,body).subscribe(result => {
              resolve(result);

          })
      })
    }





}
