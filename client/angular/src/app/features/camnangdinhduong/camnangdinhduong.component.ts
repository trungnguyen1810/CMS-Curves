import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiCamNangDinhDuongComponent} from './child-component/them-moi-cam-nang-dinh-duong.component';
import {CamNangDinhDuongService} from './service/camnangdinhduong.service';

@Component({
  selector: 'app-camnangdinhduong',
  templateUrl: './camnangdinhduong.component.html',
  styleUrls: ['./camnangdinhduong.component.css'],
  providers: [DialogService]
})
export class CamnangdinhduongComponent implements OnInit {

  camnangs:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly camnangdinhduong : CamNangDinhDuongService) { }
  ref: DynamicDialogRef;
  ngOnInit(): void {
    this.camnangdinhduong.GetAll().then((data) => {this.camnangs= data})
  }

  btnThemMoi(tintuc) {
   
    const modalRef = this.modalService.open(ThemMoiCamNangDinhDuongComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {     
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa cẩm nang dinh dưỡng',
          Id:tintuc.Id,
          TenCamNang: tintuc.TenCamNang,  
          NoiDung: tintuc.NoiDung,  
          AnhDaiDien: tintuc.AnhDaiDien,  
          TinhTrang: tintuc.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới cẩm nang dinh dưỡng',
          Id:0,
          TenCamNang: '',  
          NoiDung: '',  
          AnhDaiDien: '',   
          TinhTrang: 0
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.camnangdinhduong.GetAll().then((data) => {this.camnangs= data})
      
    );
  }
  
  async delete(tintuc){

    var r = confirm("Bạn có chắc muốn xóa cẩm năng dinh dưỡng này không ?");
    if (r == true) {
      let data =  await this.camnangdinhduong.Xoa(tintuc);
    this.dataxoa = data;
    // console.log(data)
     if (this.dataxoa.errorcode == 0) {
       
        alert('Xóa thành công')
        this.camnangdinhduong.GetAll().then((data) => {this.camnangs= data});
     } else {
        alert('Xóa lỗi')
      
      return;
  
    }
    }
   
  }

}
