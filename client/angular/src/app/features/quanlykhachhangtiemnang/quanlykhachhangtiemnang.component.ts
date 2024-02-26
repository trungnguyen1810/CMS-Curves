import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {QuanLyKhachHangTiemNangService} from './service/quanlykhachhangtiemnang.service';
import {ThemMoiKhachHangTiemNangComponent} from './child-component/them-moi-khach-hang-tiem-nang.component';
import {ThemNhatKyComponent} from './child-component/them-nhat-ky.component';

@Component({
  selector: 'app-quanlykhachhangtiemnang',
  templateUrl: './quanlykhachhangtiemnang.component.html',
  styleUrls: ['./quanlykhachhangtiemnang.component.css'],
  providers: [DialogService]
})
export class QuanlykhachhangtiemnangComponent implements OnInit {

  
  khachhangs:any=[];
  dataxoa:any={};
  statuses: any[];
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlykhachhangservice : QuanLyKhachHangTiemNangService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.statuses = [
      {label: 'Chưa tư vấn', value: '0'},
      {label: 'Đã đặt hẹn', value: '1'},   
      {label: 'Đã đặt hẹn nhưng chưa đến', value: '2'},
      {label: 'Không đặt được hẹn', value: '3'},   
      {label: 'Đã liên hệ nhiều lần', value: '4'},
      {label: 'No sale', value: '5'},
      {label: 'Đã là hội viên', value: '6'}
  ]
  this.GetAll();
  }
  async GetAll(){
    this.khachhangs = await this.quanlykhachhangservice.GetAll();
    console.log(this.khachhangs);
  }

  btnThemMoi(tintuc) {
    console.log(tintuc.Id);
    const modalRef = this.modalService.open(ThemMoiKhachHangTiemNangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {   
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa khách hàng',
          DiaChi: tintuc.DiaChi,
          GioiTinh: tintuc.GioiTinh,
          HoVaTen: tintuc.HoVaTen,
          Id: tintuc.Id,
          NgayCapNhat: tintuc.NgayCapNhat,
          NgayTao: tintuc.NgayTao,
          NgheNghiep: tintuc.NgheNghiep,
          NguoiCapNhatId: tintuc.NguoiCapNhatId,
          NguoiTaoId: tintuc.NguoiTaoId,
          NguonKhachHangId: tintuc.NguonKhachHangId,
          STT: tintuc.STT,
          SoDienThoai: tintuc.SoDienThoai,
          TinhTrang: tintuc.TinhTrang,
          ZaloFb: tintuc.ZaloFb,
          CauLacBoId: tintuc.CauLacBoId
        }
      } else {
        item = {
          title:'Thêm mới khách hàng',
          Id:0, 
          DiaChi: "",
          GioiTinh: 0,
          HoVaTen: "",
          NgayCapNhat: "",
          NgayTao: "",
          NgheNghiep: "",
          NguoiCapNhatId: 0,
          NguoiTaoId: 0,
          NguonKhachHangId: 0,
          STT: 0,
          SoDienThoai: "",
          TinhTrang: 0,
          ZaloFb: "",
          CauLacBoId: 0
        }
      }
    modalRef.componentInstance.data = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
    );
  }

  themnhatky(tintuc){
     
    const modalRef = this.modalService.open(ThemNhatKyComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {
          Title:'Thông tin hội viên',
          Id:tintuc.Id
        }
     
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(
      // this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
  }

  btnImport(tintuc) {
   
    
  }

  changepass(tintuc) {
   
    
  }
  
  async delete(khachhang){
    var r = confirm("Bạn có chắc muốn xóa khách hàng này không ?");
    if (r == true) {
      let data =  await this.quanlykhachhangservice.Xoa(khachhang);
      this.dataxoa = data;
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
