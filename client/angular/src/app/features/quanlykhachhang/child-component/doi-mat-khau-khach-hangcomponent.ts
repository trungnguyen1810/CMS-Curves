
import { Component, Input, Output, EventEmitter, OnInit, ViewChild,OnDestroy  } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from 'primeng/dynamicdialog';
import {QuanLyKhacHangcService} from '../service/quanlykhachhang.service';
import $ from "jquery";


@Component({
  selector: 'app-doi-mat-khau-khach-hang',
  templateUrl: './doi-mat-khau-khach-hang.component.html',
  providers: [DialogService]  
})

export class DoiMatKhauKhachHangComponent implements OnInit,OnDestroy  {
  @Input() OBJ;
  @Output('CallBack') CallBack = new EventEmitter<boolean>();
  // NguonTin: string = '';
  Title: string = 'Sửa tin tức';
  MatKhau:string='';
  NhapLaiMatKhau:string='';
  password:boolean=true;
  showImg:boolean=false;
  showImg2:boolean=false;
  loading =false;
  file:any=null;
  file2:any=null;
  ckeConfig: any;
  mycontent: string;
  dataupload:any={};
  datasave:any={};
  
  constructor(public activeModal: NgbActiveModal,private tintucservice :QuanLyKhacHangcService) { 
    
  }
  ngOnDestroy() {
  }

   ngOnInit() {
   
    this.Title = this.OBJ.Title;
 
  };
  


  
 Save() {    

    if(!this.MatKhau.trim()){
      alert('Mật khẩu bắt buộc nhập');return;
    }  
    
    if(!this.NhapLaiMatKhau.trim()){
      alert('Nhập lại mật khẩu bắt buộc nhập');return;
    } 
    
    if(this.NhapLaiMatKhau.trim() != this.MatKhau.trim()){
      alert('Nhập lại mật khẩu không khớp');return;
    }   


   
  
    
    let body = {
      Id: this.OBJ.Id,
      MatKhau: this.MatKhau.trim()
    }   
   
   
      this.SaveBody(body);
  }


  async SaveBody(body){
    let data = await this.tintucservice.ChangePass(body);
    this.loading=false;
    this.datasave = data;
     if (this.datasave.errorcode == 0) {
        alert('Thay đổi mất khẩu thành công')
      this.CallBack.emit(true);
      this.activeModal.close();
     } else {
        alert('Thay đổi mật khẩu lỗi')
      return;

    }
}




  
}
