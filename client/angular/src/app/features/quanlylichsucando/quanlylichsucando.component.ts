import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiLichSuCanDoComponent} from './child-component/them-moi-lich-su-can-do.component';
import {ThemMoiComponent} from './child-component/them-moi.component';
import {ChiTietLichSuCanDoComponent} from './child-component/chitiet.component';
import {QuanLyLichSuCanDoService} from './service/quanlylichsucando.service';

@Component({
  selector: 'app-quanlylichsucando',
  templateUrl: './quanlylichsucando.component.html',
  styleUrls: ['./quanlylichsucando.component.css'],
  providers: [DialogService]
})
export class QuanlylichsucandoComponent implements OnInit {

  khachhangs:any=[];
  dataxoa:any={};

  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlylichsucandoservice : QuanLyLichSuCanDoService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.quanlylichsucandoservice.GetAll().then((data) => {this.khachhangs= data});
  }

  async XemChiTiet(lichsu) {
    const modalRe = this.modalService.open(ChiTietLichSuCanDoComponent, { size: 'lg', backdrop: 'static' });
    var data = { lichsu: lichsu };
    modalRe.componentInstance.data = data;
  }

  btnThemMoi(tintuc) {

    const modalRef = this.modalService.open(ThemMoiLichSuCanDoComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa khách hàng',
          Id:tintuc.Id,
          HoVaTen: tintuc.HoVaTen,
          SoDienThoai: tintuc.SoDienThoai,
          Email: tintuc.Email,
          DiaChi: tintuc.DiaChi,
          AnhDaiDien: tintuc.AnhDaiDien,
          AnhBia: tintuc.AnhBia,
          TinhTrang: tintuc.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới khách hàng',
          Id:0,
          HoVaTen: '',
          SoDienThoai: '',
          Email: '',
          DiaChi: '',
          AnhDaiDien: '',
          AnhBia: '',
          TinhTrang: 0
        }
      }

    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlylichsucandoservice.GetAll().then((data) => {this.khachhangs= data})

    );
  }

  ThemMoi(tintuc) {

    const modalRef = this.modalService.open(ThemMoiComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa lịch sử cân đo',
          Id:tintuc.Id,
          SoDienThoai: tintuc.SoDienThoai,
          CanNang: tintuc.CanNang,
          ChieuCao: tintuc.ChieuCao,
          LuongMoCoThe: tintuc.LuongMoCoThe,
          MatDoCo: tintuc.MatDoCo,
          MatDoXuong: tintuc.MatDoXuong,
          BMI: tintuc.BMI,
          DCI: tintuc.DCI,
          TuoiSinhHoc: tintuc.TuoiSinhHoc,
          LuongNuocCoThe: tintuc.LuongNuocCoThe,
          MoNoiTang: tintuc.MoNoiTang,
          Nguc: tintuc.Nguc,
          Eo: tintuc.Eo,
          Bung: tintuc.Bung,
          Mong: tintuc.Mong,
          Dui: tintuc.Dui,
          Tay: tintuc.Tay,
          NgayCanDo : tintuc.NgayTao,
          KhachHangId : tintuc.KhachHangId
        }
      } else {
        item = {
          Title:'Thêm mới lịch sử cân đo',
          Id:0,
          SoDienThoai: '',
          CanNang: '',
          ChieuCao: '',
          LuongMoCoThe: '',
          MatDoCo: '',
          MatDoXuong: '',
          BMI: '',
          DCI: '',
          TuoiSinhHoc: '',
          LuongNuocCoThe: '',
          MoNoiTang: '',
          Nguc: '',
          Eo: '',
          Bung: '',
          Mong: '',
          Dui: '',
          Tay: '',
          NgayCanDo :'',
          KhachHangId:''
        }
      }

    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlylichsucandoservice.GetAll().then((data) => {this.khachhangs= data})

    );
  }

  async delete(khachhang){
    var r = confirm("Bạn có chắc muốn xóa lịch sử cân đo này không ?");
    if (r == true) {
      let data =  await this.quanlylichsucandoservice.Xoa(khachhang);
      this.dataxoa = data;
      console.log(data)
       if (this.dataxoa.errorcode == 0) {

          alert('Xóa thành công')
          this.quanlylichsucandoservice.GetAll().then((data) => {this.khachhangs= data});
       } else {
          alert('Xóa lỗi')

        return;

      }
    }

  }



}
