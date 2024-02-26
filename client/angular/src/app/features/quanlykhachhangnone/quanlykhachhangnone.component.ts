import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiKhachHangComponent} from './child-component/them-moi-khach-hangcomponent';
import {DoiMatKhauKhachHangComponent} from './child-component/doi-mat-khau-khach-hangcomponent';
import {ThemTuDoComponent} from './child-component/them-tu-docomponent';
import {ImportKhachHangComponent} from './child-component/import.component';
import {QuanLyKhachHangNoneService} from './service/quanlykhachhangnone.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlykhachhangnone',
  templateUrl: './quanlykhachhangnone.component.html',
  styleUrls: ['./quanlykhachhangnone.component.css'],
  providers: [DialogService]
})
export class QuanlykhachhangnoneComponent implements OnInit {

  khachhangs:any=[];
  dataxoa:any={};
  statuses: any[];
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlykhachhangservice : QuanLyKhachHangNoneService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.statuses = [
      {label: 'Chưa kích hoạt', value: '0'},
      {label: 'Kích hoạt tập', value: '1'},
      // {label: 'Bảo lưu', value: '2'},
      // {label: 'Đã chuyển', value: '3'}     
  ]
    this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data});
  }

  btnThemMoi(tintuc) {
   
    const modalRef = this.modalService.open(ThemMoiKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {   
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa hồ sơ',
          Id:tintuc.Id,
          HoVaTen: tintuc.HoVaTen,  
          SoDienThoai: tintuc.SoDienThoai,  
          Email: tintuc.Email,  
          SoThe: tintuc.SoThe,  
          DiaChi: tintuc.DiaChi,  
          AnhDaiDien: tintuc.AnhDaiDien,  
          AnhBia: tintuc.AnhBia,  
          TinhTrang: tintuc.TinhTrang,
          NgaySinh: tintuc.NgaySinh,
          NgayBatDau: tintuc.NgayBatDau,
          NgayKetThuc: tintuc.NgayKetThuc,
          CauLacBoId: tintuc.CauLacBoId || 0,
          GoiTapId: tintuc.GoiTapId || 0,
          ZaloFb: tintuc.Zalofb,
          NgheNghiep: tintuc.NgheNghiep,
          GhiChu: tintuc.GhiChu,
          LienLacKhanCap: tintuc.LienLacKhanCap,
          TieuSuSucKhoe: tintuc.TieuSuSucKhoe,
          NguonKhachHangId: tintuc.NguonKhachHangId,
          NgayDangKy: tintuc.NgayDangKy,
          TienDatCoc: tintuc.TienDatCoc,
          SoNgayTang: tintuc.SoNgayTang,
          ThuThach: tintuc.ThuThach,
          SucKhoeId: tintuc.SucKhoeId,
          HinhThucThanhToan: tintuc.HinhThucThanhToan
        }
      } else {
        item = {
          Title:'Tạo mới hồ sơ',
          Id:0, 
          HoVaTen: '',  
          SoDienThoai: '',  
          Email: '',  
          SoThe: '',  
          DiaChi: '',  
          AnhDaiDien: '',  
          AnhBia: '',   
          TinhTrang: 0,
          NgaySinh: '',
          NgayBatDau: '',
          NgayKetThuc: '',
          CauLacBoId: 0,
          GoiTapId: 0,
          ZaloFb: '',
          NgheNghiep: '',
          GhiChu: '',
          LienLacKhanCap: '',
          TieuSuSucKhoe: '',
          NguonKhachHangId: 0,
          NgayDangKy: '',
          TienDatCoc: 0,
          SoNgayTang: 0,
          ThuThach:'',
          SucKhoeId:'',
          HinhThucThanhToan : 1
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
  }

  btnImport(tintuc) {
   
    const modalRef = this.modalService.open(ImportKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    
    
    // modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
  }

  changepass(tintuc) {
   
    const modalRef = this.modalService.open(DoiMatKhauKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
          Title:'Thay đổi mật khẩu khách hàng',
          Id:tintuc.Id
        }
     
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      // this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
  }

  themtudo(tintuc) {
   
    const modalRef = this.modalService.open(ThemTuDoComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
          Title:'Thông tin hội viên',
          Id:tintuc.Id,
          HoiVien: tintuc
        }
     
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      // this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
  }
  
  async delete(khachhang){
    var r = confirm("Bạn có chắc muốn xóa khách hàng này không ?");
    if (r == true) {
      let data =  await this.quanlykhachhangservice.Xoa(khachhang);
      this.dataxoa = data;
      console.log(data)
       if (this.dataxoa.errorcode == 0) {
         
          alert('Xóa thành công')
          this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data});
       } else {
          alert('Xóa lỗi')
        
        return;
    
      }
    }
  
  }

}
