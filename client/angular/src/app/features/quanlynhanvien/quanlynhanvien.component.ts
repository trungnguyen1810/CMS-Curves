import { Component, OnInit,ViewChild  } from '@angular/core';
import {QuanLyNhanVienService} from './service/quanlynhanvien.service';
import {ThemmoiNhanVienComponent} from './child-component/themmoi.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-quanlynhanvien',
  templateUrl: './quanlynhanvien.component.html',
  styleUrls: ['./quanlynhanvien.component.css']
})
export class QuanlynhanvienComponent implements OnInit {
  nhanviens:any=[];
  statuses: any[];
  @ViewChild('dt') table: Table;
  constructor(private readonly nhanvienservice: QuanLyNhanVienService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetAllMember();
    this.statuses = [
      {label: 'Không hoạt động', value: '0'},
      {label: 'Hoạt động', value: '1'}   
  ]
  }
  async GetAllMember(){
    this.nhanviens = await this.nhanvienservice.GetAll();
  }
  async ThemMoi(nhanvien){
    if(nhanvien.Id>0){
      if(nhanvien.TenDangNhap=="host"){
        alert('Tài khoản này không được phép chỉnh sửa,vui lòng liên hệ quản trị hệ thống!');return false;
      }
    }
    var title ='Thêm mới nhân viên';
    const modalRe = this.modalService.open(ThemmoiNhanVienComponent,{size: 'lg',backdrop:'static'});
    if(nhanvien.Id!=0){
      title = 'Sửa thông tin nhân viên';
    }
    var data = {title:title,nhanvien:nhanvien};
    modalRe.componentInstance.data = data; 
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.GetAllMember();
    });
  }
  async delete(nhanvien){
    if(nhanvien.Id>0){
      if(nhanvien.TenDangNhap=="host"){
        alert('Tài khoản này không được phép xóa,vui lòng liên hệ quản trị hệ thống!');return false;
      }
    }
    var r = confirm("Bạn có chắc muốn xóa nhân viên này không ?");
    if (r == true) {
      let data = await this.nhanvienservice.XoaNhanVien(nhanvien.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.GetAllMember();
       
      }
    }
  }

}
