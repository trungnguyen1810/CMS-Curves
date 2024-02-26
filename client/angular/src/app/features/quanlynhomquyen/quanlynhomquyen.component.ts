import { Component, OnInit } from '@angular/core';
import {NhomQuyen} from './model/nhomquyen';
import {ThemmoinhomquyenComponent} from './child-component/themmoinhomquyen.component';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {QuanLyNhomQuyenService} from './service/quanlynhomquyen.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quanlynhomquyen',
  templateUrl: './quanlynhomquyen.component.html',
  styleUrls: ['./quanlynhomquyen.component.css'],
  providers: [DialogService]

})
export class QuanlynhomquyenComponent implements OnInit {
  nhomquyens:any=[];
  constructor(public dialogService: DialogService,private readonly nhomquyenservice :QuanLyNhomQuyenService,private modalService: NgbModal) {}
  ref: DynamicDialogRef;
  ThemMoiNhomQuyen(nhomquyen) { 
    if(nhomquyen.Id>0){
      if(nhomquyen.MaNhomQuyen.toUpperCase()=="ADMIN"){
        alert('Nhóm quyền Admin không được phép sửa');
        return false;
      }
      if (nhomquyen.MaNhomQuyen.toUpperCase() == "DEFAULT") {
        alert('Nhóm quyền Default không được phép sửa');
        return false;
      }
    }
    var title ='Thêm mới nhóm quyền';
    const modalRe = this.modalService.open(ThemmoinhomquyenComponent,{size: 'lg',backdrop:'static'});
    if(nhomquyen.Id!=0){
      title = 'Sửa nhóm quyền';
    }
    var data = {title:title,nhomquyen:nhomquyen};
    modalRe.componentInstance.data = data;   
    modalRe.componentInstance.CallBack.subscribe( data => {
      this.nhomquyenservice.GetAllNhomQuyen().then((data) => { this.nhomquyens= data});
    });
  }

   ngOnInit(): void {
    this.nhomquyenservice.GetAllNhomQuyen().then((data) => { this.nhomquyens= data});
  }
  editNhomQuyen(nhomquyen){
    console.log(nhomquyen)   
  }
  async deleteNhomQuyen(nhomquyen) {
    if (nhomquyen.MaNhomQuyen.toUpperCase() == "ADMIN") {
      alert('Nhóm quyền Admin không được phép xóa');
      return false;
    }   
    if (nhomquyen.MaNhomQuyen.toUpperCase() == "DEFAULT") {
      alert('Nhóm quyền Default không được phép xóa');
      return false;
    }
     
    var r = confirm("Bạn có chắc muốn xóa nhóm quyền hay không ?");
    if (r == true) {
      let data = await this.nhomquyenservice.XoaNhomQuyen(nhomquyen.Id);
      alert(data['message']);
      if (data['errorcode'] == 0) {
        this.nhomquyenservice.GetAllNhomQuyen().then((data) => { this.nhomquyens = data });
      }
    }

  }

}
