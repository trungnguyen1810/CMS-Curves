import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import {QuanLyCauLacBoService} from './service/quanlycaulacbo.service';
import {ThemMoiCauLacBoComponent} from './child-component/them-moi-cau-lac-bo.component'

@Component({
  selector: 'app-quanlycaulacbo',
  templateUrl: './quanlycaulacbo.component.html',
  styleUrls: ['./quanlycaulacbo.component.css'],
  providers: [DialogService]
})
export class QuanlycaulacboComponent implements OnInit {
  caulacbos:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlycaulacbo : QuanLyCauLacBoService) { }
  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.quanlycaulacbo.GetAll().then((data) => {this.caulacbos= data})
  }

  btnThemMoi(tintuc) {
   
    const modalRef = this.modalService.open(ThemMoiCauLacBoComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {     
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa câu lạc bộ',
          Id:tintuc.Id,
          TenCauLacBo: tintuc.TenCauLacBo,  
          MaCauLacBo: tintuc.MaCauLacBo,  
          SoDienThoai: tintuc.SoDienThoai,  
          Email: tintuc.Email,  
          TinhThanhId: tintuc.TinhThanhId,  
          DiaChi: tintuc.DiaChi,  
          AnhDaiDien: tintuc.AnhDaiDien,  
          SoDienThoaiZalo: tintuc.SoDienThoaiZalo,  
          Idmessenger: tintuc.Idmessenger,  
          ThoiGianHoatDong: tintuc.ThoiGianHoatDong,   
          TinhTrang: tintuc.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới câu lạc bộ',
          Id:0,
          TenCauLacBo: '', 
          MaCauLacBo:'', 
          SoDienThoai: '',  
          Email: '',  
          TinhThanhId: 0,  
          DiaChi: '',  
          AnhDaiDien: '',  
          ThoiGianHoatDong: '',   
          TinhTrang: 0
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlycaulacbo.GetAll().then((data) => {this.caulacbos= data})
      
    );
  }
  
  async deleteTinTuc(tintuc){
    var r = confirm("Bạn có chắc muốn xóa câu lạc bộ này không ?");
    if (r == true) {
      let data =  await this.quanlycaulacbo.XoaCauLacBo(tintuc);
      this.dataxoa = data;
      // console.log(data)
       if (this.dataxoa.errorcode == 0) {
         
          alert('Xóa thành công')
          this.quanlycaulacbo.GetAll().then((data) => {this.caulacbos= data});
       } else {
          alert('Xóa lỗi, có ràng buộc dữ liệu')
        
        return;
    
      }
    }
   
  }

}
