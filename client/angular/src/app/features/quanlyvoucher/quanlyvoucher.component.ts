import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiVoucherComponent} from './child-component/them-moi-voucher.component';
import {ImportVoucherComponent} from './child-component/import.component';
import {QuanLyVoucherService} from './service/quanlyvoucher.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlyvoucher',
  templateUrl: './quanlyvoucher.component.html',
  styleUrls: ['./quanlyvoucher.component.css'],
  providers: [DialogService]
})
export class QuanlyvoucherComponent implements OnInit {

  khachhangs:any=[];
  dataxoa:any={};
  statuses: any[];
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlykhachhangservice : QuanLyVoucherService) { }

  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.statuses = [
      {label: 'Chưa sử dụng', value: '0'},
      {label: 'Đã sử dụng', value: '1'},
      {label: 'Đã hết hạn sử dụng', value: '2'}   
  ]
    this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data});
  }

  btnThemMoi(tintuc) {
   
    const modalRef = this.modalService.open(ThemMoiVoucherComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {   
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa voucher',
          Id:tintuc.Id,
          MaVoucher: tintuc.MaVoucher,  
          NgayHetHan: tintuc.HanSuDung,  
          LoaiMa: tintuc.LoaiMa,  
          SanPhamId: tintuc.SanPhamId|0,  
          TenSanPham: tintuc.TenSanPham,  
          SoLuongNgay: tintuc.SoLuongNgay,  
          SoTien: tintuc.SoTienTang,  
          TinhTrang: tintuc.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới voucher',
          Id:0, 
          MaVoucher: '',  
          SoDienThoai: '',  
          NgayHetHan: '',    
          TinhTrang: 0,
          SanPhamId: 0,
          SoLuongNgay: '',
          SoTien: '',
          TenSanPham: '',
          LoaiMa: 1
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
    );
  }

  btnImport(tintuc) {
   
    const modalRef = this.modalService.open(ImportVoucherComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    
    
    // modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlykhachhangservice.GetAll().then((data) => {this.khachhangs= data})
      
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
          alert(this.dataxoa.message)
        
        return;
    
      }
    }
  
  }

}
