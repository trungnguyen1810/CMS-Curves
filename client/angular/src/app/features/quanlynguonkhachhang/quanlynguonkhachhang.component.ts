import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { QuanLyKhacHangcService } from '../quanlykhachhang/service/quanlykhachhang.service';
import {QuanLyNguonKhachHangService} from './service/quanlynguonkhachhang.service';
import {ThemMoiNguonKhachHangComponent} from './child-component/them-moi-nguon-khach-hang.component';

@Component({
  selector: 'app-quanlynguonkhachhang',
  templateUrl: './quanlynguonkhachhang.component.html',
  styleUrls: ['./quanlynguonkhachhang.component.css'],
  providers: [DialogService]
})
export class QuanlynguonkhachhangComponent implements OnInit {
  nguonkhachhangs:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly nguonkhachhang : QuanLyNguonKhachHangService) { }
  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.nguonkhachhang.GetAll().then((data) => {this.nguonkhachhangs= data})
  }
  btnThemMoi(nguonkhachhang) {
   
    const modalRef = this.modalService.open(ThemMoiNguonKhachHangComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {     
    }
    if(nguonkhachhang.Id!=0){
        item = {
          Title:'Sửa nguồn khách hàng',
          Id:nguonkhachhang.Id,
          TenNguonKhachHang: nguonkhachhang.TenNguonKhachHang,  
        }
      } else {
        item = {
          Title:'Thêm mới nguồn khách hàng',
          Id:0,
          TenNguonKhachHang: '' 
         
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.nguonkhachhang.GetAll().then((data) => {this.nguonkhachhangs= data})
      
    );
  }
  async delete(nguonkhachhang){

    var r = confirm("Bạn có chắc muốn xóa cẩm năng dinh dưỡng này không ?");
    if (r == true) {
      let data =  await this.nguonkhachhang.Xoa(nguonkhachhang);
    this.dataxoa = data;
    // console.log(data)
     if (this.dataxoa.errorcode == 0) {
       
        alert('Xóa thành công')
        this.nguonkhachhang.GetAll().then((data) => {this.nguonkhachhangs= data});
     } else {
        alert('Xóa lỗi')
      
      return;
  
    }
    }
   
  }

}
