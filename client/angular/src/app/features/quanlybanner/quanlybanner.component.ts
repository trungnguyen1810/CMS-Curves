import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {ThemMoiBannerComponent} from './child-component/them-moi-banner.component';
import {QuanLyBannerService} from './service/quanlybanner.service'
@Component({
  selector: 'app-quanlybanner',
  templateUrl: './quanlybanner.component.html',
  styleUrls: ['./quanlybanner.component.css'],
  providers: [DialogService]
})
export class QuanlybannerComponent implements OnInit {

  banners:any=[];
  dataxoa:any={};
  constructor(public dialogService: DialogService, private modalService: NgbModal, private readonly quanlybanner : QuanLyBannerService) { }
  ref: DynamicDialogRef;

  ngOnInit(): void {
    this.quanlybanner.GetAll().then((data) => {this.banners= data})
  }

  btnThemMoi(tintuc) {
   
    const modalRef = this.modalService.open(ThemMoiBannerComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    let item = {     
    }
    if(tintuc.Id!=0){
        item = {
          Title:'Sửa banner',
          Id:tintuc.Id, 
          DuongDanAnh: tintuc.DuongDanAnh,  
          NgayCapNhat: tintuc.NgayCapNhat,  
          ThuTuSapXep: tintuc.ThuTuSapXep,
          TinhTrang: tintuc.TinhTrang
        }
      } else {
        item = {
          Title:'Thêm mới banner',
          Id:0,
          DuongDanAnh: '',  
          NgayCapNhat: '',  
          TinhTrang: 0,
          ThuTuSapXep : 1
        }
      }
    
    modalRef.componentInstance.OBJ = item;
    modalRef.componentInstance.CallBack.subscribe(data =>
      this.quanlybanner.GetAll().then((data) => {this.banners= data})
      
    );
  }

  async deleteBanner(banner){
    var r = confirm("Bạn có chắc muốn xóa tỉnh thành này không ?");
    if (r == true) {
      let data =  await this.quanlybanner.XoaBanner(banner);
    this.dataxoa = data;
    // console.log(data)
     if (this.dataxoa.errorcode == 0) {
        alert('Xóa thành công')
        this.quanlybanner.GetAll().then((data) => {this.banners= data});
     } else {
        alert('Xóa lỗi')
      return;
  
    }
    }
    
  }

}
