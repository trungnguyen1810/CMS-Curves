import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiNhuongQuyenComponent} from './child-component/them-moi-nhuong-quyen.component';
import {QuanLyNhuongQuyenService} from './service/quanlynhuongquyen.service'

@Component({
  selector: 'app-quanlynhuongquyen',
  templateUrl: './quanlynhuongquyen.component.html',
  styleUrls: ['./quanlynhuongquyen.component.css'],
  providers: [DialogService]
})
export class QuanlynhuongquyenComponent implements OnInit {

  nhuongquyens:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlynhuongquyen : QuanLyNhuongQuyenService) { }
  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.quanlynhuongquyen.GetAll().then((data) => {this.nhuongquyens= data})
  }

  btnThemMoi(tintuc) {
   
    const modalRef = this.modalService.open(ThemMoiNhuongQuyenComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {     
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa cấu hình',
          Id:tintuc.Id, 
          TenNhuongQuyen: tintuc.TenNhuongQuyen,  
          MaNhuongQuyen: tintuc.MaNhuongQuyen,  
          MaCauHinh: tintuc.MaCauHinh,  
          TyLe: tintuc.TyLe,  
          GiaTien: tintuc.GiaTien,  
          AnhDaiDien: tintuc.AnhDaiDien,  
          NoiDung: tintuc.NoiDung,  
          NgayCapNhat: tintuc.NgayCapNhat,  
          SoLuong: tintuc.SoLuong,  
          DonVi: tintuc.DonVi,  
          TinhTrang: tintuc.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới cấu hình',
          Id:0,
          TenNhuongQuyen: '',  
          MaNhuongQuyen: '',
          MaCauHinh: '',
          TyLe: '',
          GiaTien: '',
          AnhDaiDien: '',  
          NoiDung: '',  
          NgayCapNhat: '',  
          SoLuong: 0,  
          DonVi: 1,
          TinhTrang: 0
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlynhuongquyen.GetAll().then((data) => {this.nhuongquyens= data})
      
    );
  }

  async delete(banner){
    var r = confirm("Bạn có chắc muốn xóa cấu hình này không ?");
    if (r == true) {
      let data =  await this.quanlynhuongquyen.Xoa(banner);
      this.dataxoa = data;
      // console.log(data)
      if (this.dataxoa.errorcode == 0) {
          alert('Xóa thành công')
          this.quanlynhuongquyen.GetAll().then((data) => {this.nhuongquyens= data});
      } else {
          alert('Xóa lỗi')
        return;
    
      }
    }
    
  }

}
