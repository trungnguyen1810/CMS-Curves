import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiTinhThanhComponent} from './child-component/them-moi-tinh-thanh.component';
import {DanhMucDiaBanService} from './service/danhmucdiaban.service';
@Component({
  selector: 'app-danhmuctinhthanh',
  templateUrl: './danhmuctinhthanh.component.html',
  styleUrls: ['./danhmuctinhthanh.component.css'],
  providers: [DialogService]
})
export class DanhmuctinhthanhComponent implements OnInit {
  diabans:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly danhmucdiabanservice : DanhMucDiaBanService) { }
  ref: DynamicDialogRef;
  
  ngOnInit(): void {
    this.danhmucdiabanservice.GetAlldiaban().then((data) => {this.diabans= data})
  }

  btnThemMoi(diaban) {
   
    const modalRef = this.modalService.open(ThemMoiTinhThanhComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {};
    if(diaban.Id!=0){
        item = {
          Title:'Sửa tỉnh thành',
          Id:diaban.Id,
          TenDiaBan: diaban.TenDiaBan,  
          AnhDaiDien: diaban.AnhDaiDien,  
          TinhTrang: diaban.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới tỉnh thành',
          Id:0,
          TenDiaBan: '', 
          AnhDaiDien: '',  
          TinhTrang: 0
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.danhmucdiabanservice.GetAlldiaban().then((data) => {this.diabans= data})
      
    );
  }
  
  async deleteTinTuc(diaban){
    var r = confirm("Bạn có chắc muốn xóa tỉnh thành này không ?");
    if (r == true) {
      let data =  await this.danhmucdiabanservice.XoaDiaBan(diaban);
      this.dataxoa = data;
       if (this.dataxoa.errorcode == 0) {
         
          alert('Xóa thành công')
          this.danhmucdiabanservice.GetAlldiaban().then((data) => {this.diabans= data});
       } else {
          alert('Xóa lỗi, có ràng buộc dữ liệu')
        
        return;
    
      }
    }
    
  }

}
